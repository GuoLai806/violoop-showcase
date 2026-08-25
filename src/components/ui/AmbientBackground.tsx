import { useEffect, useRef } from 'react'

const vertexShader = `#version 300 es
void main() {
  vec2 p = vec2((gl_VertexID << 1) & 2, gl_VertexID & 2);
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`

const fragmentShader = `#version 300 es
precision highp float;

out vec4 outColor;
uniform vec2 uResolution;
uniform float uTime;
uniform vec3 uRipple;

#define TAU 6.28318530718

float caustic(vec2 uv) {
  float t = uTime * 0.26 + 23.0;
  vec2 p = mod(uv * TAU, TAU) - 250.0;
  vec2 i = p;
  float c = 1.0;
  float intensity = 0.0045;

  for (int n = 0; n < 5; n++) {
    float tt = t * (1.0 - 3.5 / float(n + 1));
    i = p + vec2(
      cos(tt - i.x) + sin(tt + i.y),
      sin(tt - i.y) + cos(tt + i.x)
    );
    c += 1.0 / length(vec2(
      p.x / (sin(i.x + tt) / intensity),
      p.y / (cos(i.y + tt) / intensity)
    ));
  }

  c /= 5.0;
  c = 1.17 - pow(c, 1.4);
  return pow(abs(c), 8.0);
}

float laser(vec2 p, float angle, float offset, float width) {
  float cs = cos(angle);
  float sn = sin(angle);
  vec2 q = mat2(cs, -sn, sn, cs) * p;
  float beam = exp(-abs(q.y - offset) / width);
  float taper = smoothstep(1.2, 0.06, abs(q.x));
  return beam * taper;
}

void main() {
  vec2 frag = gl_FragCoord.xy;
  vec2 uv = frag / uResolution;
  uv.x *= uResolution.x / uResolution.y;
  vec2 p = (frag - 0.5 * uResolution) / uResolution.y;

  vec2 ripplePoint = (uRipple.xy - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
  float distanceToRipple = length(p - ripplePoint);
  float wave = sin(distanceToRipple * 25.0 - uRipple.z * 8.0)
    * exp(-distanceToRipple * 3.8)
    * exp(-uRipple.z * 1.35);
  uv += normalize(p - ripplePoint + 0.0001) * wave * 0.28;

  float primary = caustic(uv * 1.5);
  float secondary = caustic((uv + vec2(0.17, -0.11)) * 0.92) * 0.42;
  float network = primary + secondary;

  vec3 deep = vec3(0.002, 0.014, 0.013);
  vec3 teal = vec3(0.018, 0.20, 0.18);
  vec3 color = mix(deep, teal, smoothstep(1.15, 0.05, length(p)) * 0.42);
  color += vec3(0.05, 0.55, 0.48) * network;
  color += vec3(0.35, 0.96, 0.86) * pow(primary, 1.8) * 0.46;

  float scanA = laser(p, -0.34, sin(uTime * 0.18) * 0.44, 0.006);
  float scanB = laser(p, 0.58, cos(uTime * 0.13 + 1.7) * 0.52, 0.004);
  float scanGlow = laser(p, -0.34, sin(uTime * 0.18) * 0.44, 0.04);
  color += vec3(0.08, 0.72, 0.65) * scanGlow * 0.055;
  color += vec3(0.42, 1.0, 0.90) * scanA * 0.48;
  color += vec3(0.04, 0.48, 0.43) * scanB * 0.26;

  float vignette = 0.45 + 0.55 * smoothstep(1.35, 0.08, length(p));
  color *= vignette;
  color = color / (color + 0.82);
  float grain = fract(sin(dot(frag, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
  color += grain * 0.012;

  outColor = vec4(pow(max(color, 0.0), vec3(0.88)), 1.0);
}`

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  if (!shader) throw new Error('Unable to create shader')
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? 'Shader compilation failed'
    gl.deleteShader(shader)
    throw new Error(message)
  }
  return shader
}

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: false,
      powerPreference: 'high-performance',
    })
    if (!gl) return

    let program: WebGLProgram | null = null
    let vertex: WebGLShader | null = null
    let fragment: WebGLShader | null = null
    let animationFrame = 0
    let lastFrame = 0
    let ripple: [number, number, number] = [0.5, 0.5, 999]
    const startedAt = performance.now()

    try {
      vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShader)
      fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShader)
      program = gl.createProgram()
      if (!program) throw new Error('Unable to create WebGL program')
      gl.attachShader(program, vertex)
      gl.attachShader(program, fragment)
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) ?? 'WebGL program linking failed')
      }
    } catch (error) {
      console.warn('Ambient WebGL background disabled:', error)
      return
    }

    gl.useProgram(program)
    gl.bindVertexArray(gl.createVertexArray())
    const resolutionLocation = gl.getUniformLocation(program, 'uResolution')
    const timeLocation = gl.getUniformLocation(program, 'uTime')
    const rippleLocation = gl.getUniformLocation(program, 'uRipple')

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.15 : 1.6)
      const width = Math.max(1, Math.floor(canvas.clientWidth * pixelRatio))
      const height = Math.max(1, Math.floor(canvas.clientHeight * pixelRatio))
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width
        canvas.height = height
        gl.viewport(0, 0, width, height)
      }
    }

    let lastPointerUpdate = 0
    const followPointer = (event: PointerEvent) => {
      const now = performance.now()
      if (event.type === 'pointermove' && now - lastPointerUpdate < 28) return
      lastPointerUpdate = now
      ripple = [event.clientX / window.innerWidth, 1 - event.clientY / window.innerHeight, 0]
    }

    const draw = (now: number) => {
      if (document.hidden) {
        animationFrame = window.requestAnimationFrame(draw)
        return
      }

      const frameInterval = reducedMotion ? 1000 / 12 : 1000 / 60
      if (now - lastFrame >= frameInterval) {
        lastFrame = now
        resize()
        ripple[2] += frameInterval / 1000
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height)
        gl.uniform1f(timeLocation, (now - startedAt) / 1000)
        gl.uniform3f(rippleLocation, ripple[0], ripple[1], ripple[2])
        gl.drawArrays(gl.TRIANGLES, 0, 3)
      }
      animationFrame = window.requestAnimationFrame(draw)
    }

    window.addEventListener('resize', resize, { passive: true })
    window.addEventListener('pointermove', followPointer, { passive: true })
    window.addEventListener('pointerdown', followPointer, { passive: true })
    resize()
    animationFrame = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', followPointer)
      window.removeEventListener('pointerdown', followPointer)
      if (program) gl.deleteProgram(program)
      if (vertex) gl.deleteShader(vertex)
      if (fragment) gl.deleteShader(fragment)
    }
  }, [])

  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-background__sticky">
        <canvas ref={canvasRef} className="ambient-background__canvas" />
        <div className="ambient-background__veil" />
        <div className="ambient-background__grid" />
      </div>
    </div>
  )
}
