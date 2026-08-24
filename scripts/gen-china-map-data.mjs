/**
 * 用 Albers 中国标准投影，把 DataV 100000_full（含台湾省、南海诸岛）转成 SVG 路径。
 */
import fs from 'fs'
import rewind from '@mapbox/geojson-rewind'
import { geoPath, geoConicEqualArea } from 'd3-geo'

const raw = JSON.parse(fs.readFileSync('public/data/china-100000-full.json', 'utf8'))

/** 海南只保留主岛，远海岛礁并入南海诸岛缩略图，避免主图被拉扁 */
function cleanHainan(feature) {
  if (feature.properties?.name !== '海南省') return feature
  const polys = feature.geometry.coordinates.filter((poly) => {
    const ring = poly[0]
    const avg = ring.reduce((sum, p) => sum + p[1], 0) / ring.length
    return avg > 17
  })
  return {
    ...feature,
    geometry: { type: 'MultiPolygon', coordinates: polys },
  }
}

const NAME_TO_ID = {
  北京市: 'CNBJ',
  天津市: 'CNTJ',
  河北省: 'CNHE',
  山西省: 'CNSX',
  内蒙古自治区: 'CNNM',
  辽宁省: 'CNLN',
  吉林省: 'CNJL',
  黑龙江省: 'CNHL',
  上海市: 'CNSH',
  江苏省: 'CNJS',
  浙江省: 'CNZJ',
  安徽省: 'CNAH',
  福建省: 'CNFJ',
  江西省: 'CNJX',
  山东省: 'CNSD',
  河南省: 'CNHA',
  湖北省: 'CNHB',
  湖南省: 'CNHN',
  广东省: 'CNGD',
  广西壮族自治区: 'CNGX',
  海南省: 'CNHI',
  重庆市: 'CNCQ',
  四川省: 'CNSC',
  贵州省: 'CNGZ',
  云南省: 'CNYN',
  西藏自治区: 'CNXZ',
  陕西省: 'CNSN',
  甘肃省: 'CNGS',
  青海省: 'CNQH',
  宁夏回族自治区: 'CNNX',
  新疆维吾尔自治区: 'CNXJ',
  台湾省: 'CNTW',
  香港特别行政区: 'CNHK',
  澳门特别行政区: 'CNMO',
}

const mainlandFeatures = raw.features
  .filter((f) => f.properties?.name)
  .map(cleanHainan)

const main = rewind(
  { type: 'FeatureCollection', features: mainlandFeatures },
  true,
)

const WIDTH = 1000
const HEIGHT = 738

const projection = geoConicEqualArea()
  .rotate([-105, 0])
  .center([0, 36])
  .parallels([25, 47])
  .fitExtent(
    [
      [36, 28],
      [964, 680],
    ],
    main,
  )

const path = geoPath(projection)
const locations = []

for (const feature of main.features) {
  const name = feature.properties.name
  const id = NAME_TO_ID[name]
  if (!id) {
    console.warn('unmapped', name)
    continue
  }
  const d = path(feature)
  if (!d) {
    console.warn('empty path', name)
    continue
  }
  const [cx, cy] = path.centroid(feature)
  locations.push({
    id,
    name,
    path: d,
    cx: Number(cx.toFixed(1)),
    cy: Number(cy.toFixed(1)),
  })
}

// 南海诸岛缩略图：九段线 + 海南远海岛礁，右下角放大显示（不铺实心方块）
const southSeaRaw = raw.features.find(
  (f) => String(f.properties?.adcode) === '100000_JD' || f.properties?.adchar === 'JD',
)
const hainanRaw = raw.features.find((f) => f.properties?.name === '海南省')

let southSea = null
if (southSeaRaw) {
  const hainanSouthPolys =
    hainanRaw?.geometry?.type === 'MultiPolygon'
      ? hainanRaw.geometry.coordinates.filter((poly) => {
          const ring = poly[0]
          const avg = ring.reduce((sum, p) => sum + p[1], 0) / ring.length
          return avg <= 17
        })
      : []

  const southSeaFeature = rewind(
    {
      type: 'Feature',
      properties: { name: '南海诸岛' },
      geometry: {
        type: 'MultiPolygon',
        coordinates: [...southSeaRaw.geometry.coordinates, ...hainanSouthPolys],
      },
    },
    true,
  )

  // 更大的右下角视口，保证九段线与岛礁完整可见
  const insetBox = {
    x: 768,
    y: 488,
    w: 220,
    h: 232,
  }
  const insetProjection = geoConicEqualArea()
    .rotate([-114, 0])
    .center([0, 12])
    .parallels([4, 20])
    .fitExtent(
      [
        [insetBox.x + 14, insetBox.y + 10],
        [insetBox.x + insetBox.w - 14, insetBox.y + insetBox.h - 28],
      ],
      southSeaFeature,
    )
  const insetPath = geoPath(insetProjection)
  const d = insetPath(southSeaFeature)
  if (d) {
    southSea = {
      id: 'CNSCS',
      name: '南海诸岛',
      path: d,
      frame: insetBox,
    }
  }
}

const CITY_LONLAT = {
  beijing: [116.4074, 39.9042],
  shanghai: [121.4737, 31.2304],
  hangzhou: [120.1551, 30.2741],
  wuhan: [114.3055, 30.5928],
  ganzhou: [114.935, 25.8452],
  changsha: [112.9388, 28.2282],
  xiamen: [118.0894, 24.4798],
  taiwan: [120.96, 23.7],
  guangzhou: [113.2644, 23.1291],
  shenzhen: [114.0579, 22.5431],
  foshan: [113.122, 23.0288],
  nanning: [108.3669, 22.817],
  kunming: [102.8329, 24.8801],
  haikou: [110.3312, 20.0311],
}

const cities = {}
for (const [id, lonlat] of Object.entries(CITY_LONLAT)) {
  const p = projection(lonlat)
  cities[id] = {
    x: Number(p[0].toFixed(1)),
    y: Number(p[1].toFixed(1)),
  }
}

const out = {
  viewBox: `0 0 ${WIDTH} ${HEIGHT}`,
  width: WIDTH,
  height: HEIGHT,
  locations,
  southSea,
  cities,
  source: 'DataV 100000_full + Albers China (rewind) + SCS inset',
}

const header = ''
fs.writeFileSync('public/data/china-map.json', JSON.stringify(out))
console.log('wrote public/data/china-map.json')
console.log('provinces', locations.length)
console.log('taiwan', locations.find((l) => l.id === 'CNTW')?.name)
console.log('southSea', Boolean(southSea))
console.log('cities', cities)
