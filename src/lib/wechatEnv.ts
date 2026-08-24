import { useEffect, type RefObject } from 'react'

export type PerformanceProfile = 'default' | 'mobile' | 'wechat'

export function isWeChatBrowser() {
  if (typeof navigator === 'undefined') return false
  return /MicroMessenger/i.test(navigator.userAgent)
}

export function isMobileDevice() {
  if (typeof window === 'undefined') return false
  return (
    window.innerWidth < 640 ||
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)
  )
}

export function getPerformanceProfile(): PerformanceProfile {
  if (isWeChatBrowser()) return 'wechat'
  if (isMobileDevice()) return 'mobile'
  return 'default'
}

type WeixinBridge = {
  invoke: (method: string, args: Record<string, unknown>, cb?: () => void) => void
}

declare global {
  interface Window {
    WeixinJSBridge?: WeixinBridge
  }
}

const MARQUEE_VIDEO_SELECTOR = 'video.marquee-video'

/** 微信 X5 内核：同层 H5 内联播放，避免切原生全屏 */
export function applyWeChatVideoAttrs(video: HTMLVideoElement) {
  video.muted = true
  video.defaultMuted = true
  video.playsInline = true
  video.autoplay = true
  video.setAttribute('muted', '')
  video.setAttribute('autoplay', 'autoplay')
  video.setAttribute('playsinline', 'true')
  video.setAttribute('webkit-playsinline', 'true')
  video.setAttribute('x5-playsinline', 'true')
  video.setAttribute('x5-video-player-type', 'h5-page')
  video.setAttribute('x5-video-player-fullscreen', 'false')
  video.setAttribute('x5-video-orientation', 'portrait')
}

function invokeWeixinBridge(callback: () => void) {
  const bridge = window.WeixinJSBridge
  if (bridge) {
    bridge.invoke('getNetworkType', {}, callback)
    return
  }

  document.addEventListener(
    'WeixinJSBridgeReady',
    () => {
      window.WeixinJSBridge?.invoke('getNetworkType', {}, callback)
    },
    { once: true },
  )
}

/**
 * 必须在 touchstart/touchend 等用户手势回调里同步调用，不能包在 setTimeout / Bridge 回调里。
 */
export function playVideoWithUserGesture(video: HTMLVideoElement | null | undefined) {
  if (!video || video.readyState < 1) return false

  applyWeChatVideoAttrs(video)

  try {
    const result = video.play()
    if (result && typeof result.catch === 'function') {
      void result.catch(() => {})
    }
    return true
  } catch {
    return false
  }
}

export function syncPlayMarqueeVideos(selector = MARQUEE_VIDEO_SELECTOR) {
  document.querySelectorAll(selector).forEach((node) => {
    if (node instanceof HTMLVideoElement && node.paused) {
      playVideoWithUserGesture(node)
    }
  })
}

/** 非手势场景下的尽力播放（Bridge + 延迟重试，可能仍被微信拦截） */
export function playWeChatVideo(video: HTMLVideoElement) {
  applyWeChatVideoAttrs(video)

  const tryPlay = () => {
    const result = video.play()
    if (result && typeof result.catch === 'function') {
      void result.catch(() => {})
    }
  }

  if (!isWeChatBrowser()) {
    tryPlay()
    return
  }

  tryPlay()
  invokeWeixinBridge(tryPlay)
  globalThis.setTimeout(tryPlay, 300)
  globalThis.setTimeout(tryPlay, 1200)
}

export function unlockWeChatVideoAutoplay(selector = MARQUEE_VIDEO_SELECTOR) {
  if (!isWeChatBrowser()) return

  document.querySelectorAll(selector).forEach((node) => {
    if (node instanceof HTMLVideoElement) playWeChatVideo(node)
  })
}

let weChatVideoEnvReady = false

/** 页面级：每次触摸同步尝试播放；Bridge 就绪后再尽力 autoplay */
export function initWeChatVideoEnvironment() {
  if (!isWeChatBrowser() || weChatVideoEnvReady) return
  weChatVideoEnvReady = true

  const onTouch = () => {
    syncPlayMarqueeVideos()
  }

  document.addEventListener('touchstart', onTouch, { passive: true, capture: true })
  document.addEventListener('touchend', onTouch, { passive: true, capture: true })

  invokeWeixinBridge(() => unlockWeChatVideoAutoplay())
}

export function useWeChatVideoAttrs(ref: RefObject<HTMLVideoElement | null>) {
  useEffect(() => {
    if (!isWeChatBrowser()) return
    const video = ref.current
    if (video) applyWeChatVideoAttrs(video)
  })
}

export function getWeb3dRenderLimits(profile: PerformanceProfile) {
  switch (profile) {
    case 'wechat':
      return { limitWidth: 854, limitHeight: 480 }
    case 'mobile':
      return { limitWidth: 1024, limitHeight: 576 }
    default:
      return { limitWidth: 1280, limitHeight: 720 }
  }
}

export function scheduleNonBlocking(task: () => void, timeoutMs = 800) {
  if ('requestIdleCallback' in globalThis) {
    globalThis.requestIdleCallback(task, { timeout: timeoutMs })
  } else {
    globalThis.setTimeout(task, 300)
  }
}
