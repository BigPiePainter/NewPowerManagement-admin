<script lang="ts">
import * as PIXI from 'https://cdn.skypack.dev/pixi.js@5.x'
import { KawaseBlurFilter } from 'https://cdn.skypack.dev/@pixi/filter-kawase-blur@3.2.0'
import SimplexNoise from 'https://cdn.skypack.dev/simplex-noise@3.0.0'
import hsl from 'https://cdn.skypack.dev/hsl-to-hex'
import debounce from 'https://cdn.skypack.dev/debounce'
console.log('超炫酷无敌动画依赖import加载完毕')
</script>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

const items = [
  {
    index: '/main',
    title: '系统首页'
  },
  {
    index: '/work-space',
    title: '工作台'
  },
  {
    index: '/school-management',
    title: '学校管理',
    subs: [
      {
        index: '/class-management',
        title: '班级管理'
      },
      {
        index: '/teacher-group-management',
        title: '教研组管理'
      }
    ]
  },
  {
    index: '/account-management',
    title: '账号管理',
    subs: [
      {
        index: '/account-role-managment',
        title: '角色管理'
      },
      {
        index: '/acount-equipment-management',
        title: '账号设备管理'
      },
      {
        index: '/account-teacher-managament',
        title: '老师管理'
      },
      {
        index: '/account-student-management',
        title: '学生管理'
      },
      {
        index: '/account-temoorary-student',
        title: '临时学生'
      }
    ]
  },
  {
    index: '/live-class',
    title: '实时课堂'
  },
  {
    index: '/course-management-group',
    title: '课程管理',
    subs: [
      {
        index: '/course-approval',
        title: '微课审核'
      },
      {
        index: '/course-management',
        title: '课程管理'
      }
    ]
  },
  {
    index: '/shop-management',
    title: '商城管理'
  },
  {
    index: '/question-bank-management',
    title: '题库管理'
  },
  {
    index: '/points-management',
    title: '积分管理',
    subs: [
      {
        index: '/student-points-management',
        title: '学生积分'
      },
      {
        index: '/points-detail',
        title: '积分明细'
      }
    ]
  },
  {
    index: '/setting',
    title: '设置'
  },
  {
    index: '1',
    title: '展开栏',
    subs: [
      {
        index: '/viewa',
        title: 'A'
      },
      {
        index: '/viewb',
        title: 'B'
      }
    ]
  }
]

const route = useRoute()

let PIXIApp: any
onMounted(() => {
  function random(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }

  // map a number from 1 range to another
  function map(n: number, start1: number, end1: number, start2: number, end2: number): number {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2
  }

  // Create a new simplex noise instance
  const simplex = new SimplexNoise()

  // ColorPalette class
  class ColorPalette {
    hue: number = 0
    complimentaryHue1: number = 0
    complimentaryHue2: number = 0
    saturation: number = 0
    lightness: number = 0
    baseColor: string = ''
    complimentaryColor1: string = ''
    complimentaryColor2: string = ''
    colorChoices: string[] = []

    constructor() {
      this.setColors()
      this.setCustomProperties()
    }

    setColors() {
      // pick a random hue somewhere between 220 and 360
      this.hue = ~~random(220, 360)
      this.complimentaryHue1 = this.hue + 30
      this.complimentaryHue2 = this.hue + 60
      // define a fixed saturation and lightness
      this.saturation = 95
      this.lightness = 50

      // define a base color
      this.baseColor = hsl(this.hue, this.saturation, this.lightness)
      // define a complimentary color, 30 degress away from the base
      this.complimentaryColor1 = hsl(this.complimentaryHue1, this.saturation, this.lightness)
      // define a second complimentary color, 60 degrees away from the base
      this.complimentaryColor2 = hsl(this.complimentaryHue2, this.saturation, this.lightness)

      // store the color choices in an array so that a random one can be picked later
      this.colorChoices = [this.baseColor, this.complimentaryColor1, this.complimentaryColor2]
    }

    randomColor(): string {
      // pick a random color
      return this.colorChoices[~~random(0, this.colorChoices.length)].replace('#', '0x')
    }

    setCustomProperties() {
      // set CSS custom properties so that the colors defined here can be used throughout the UI
      document.documentElement.style.setProperty('--hue', `${this.hue}`)
      document.documentElement.style.setProperty(
        '--hue-complimentary1',
        `${this.complimentaryHue1}`
      )
      document.documentElement.style.setProperty(
        '--hue-complimentary2',
        `${this.complimentaryHue2}`
      )
    }
  }

  // Orb class
  class Orb {
    bounds: { x: { min: number; max: number }; y: { min: number; max: number } }
    x: number
    y: number
    scale: number
    fill: number | string
    radius: number
    xOff: number
    yOff: number
    inc: number
    graphics: any

    // Pixi takes hex colors as hexidecimal literals (0x rather than a string with '#')
    constructor(fill: number | string = 0x000000) {
      // bounds = the area an orb is "allowed" to move within
      this.bounds = this.setBounds()
      // initialise the orb's { x, y } values to a random point within it's bounds
      this.x = random(this.bounds['x'].min, this.bounds['x'].max)
      this.y = random(this.bounds['y'].min, this.bounds['y'].max)

      // how large the orb is vs it's original radius (this will modulate over time)
      this.scale = 1

      // what color is the orb?
      this.fill = fill

      // the original radius of the orb, set relative to window height
      this.radius = random(window.innerHeight / 12, window.innerHeight / 12)

      // starting points in "time" for the noise/self similar random values
      this.xOff = random(0, 1000)
      this.yOff = random(0, 1000)
      // how quickly the noise/self similar random values step through time
      //this.inc = 0.002
      this.inc = 0.006

      // PIXI.Graphics is used to draw 2d primitives (in this case a circle) to the canvas
      this.graphics = new PIXI.Graphics()
      this.graphics.alpha = 0.825

      // 250ms after the last window resize event, recalculate orb positions.
      window.addEventListener(
        'resize',
        debounce(() => {
          this.bounds = this.setBounds()
        }, 250)
      )
    }

    setBounds() {
      return {
        x: {
          min: 0,
          max: 185
        },
        y: {
          min: 0,
          max: window.innerHeight
        }
      }
    }

    update() {
      // self similar "psuedo-random" or noise values at a given point in "time"
      const xNoise = simplex.noise2D(this.xOff, this.xOff)
      const yNoise = simplex.noise2D(this.yOff, this.yOff)
      const scaleNoise = simplex.noise2D(this.xOff, this.yOff)

      // map the xNoise/yNoise values (between -1 and 1) to a point within the orb's bounds
      this.x = map(xNoise, -1, 1, this.bounds['x'].min, this.bounds['x'].max)
      this.y = map(yNoise, -1, 1, this.bounds['y'].min, this.bounds['y'].max)
      // map scaleNoise (between -1 and 1) to a scale value somewhere between half of the orb's original size, and 100% of it's original size
      //console.log(scaleNoise)
      this.scale = map(scaleNoise, -1, 1, 0.5, 1)
      //console.log('scale', this.scale)

      // step through "time"
      this.xOff += this.inc
      this.yOff += this.inc
    }

    render() {
      // update the PIXI.Graphics position and scale values
      this.graphics.x = this.x
      this.graphics.y = this.y
      this.graphics.scale.set(this.scale)

      // clear anything currently drawn to graphics
      this.graphics.clear()

      // tell graphics to fill any shapes drawn after this with the orb's fill color
      this.graphics.beginFill(this.fill)
      // draw a circle at { 0, 0 } with it's size set by this.radius
      this.graphics.drawCircle(0, 0, this.radius)
      // let graphics know we won't be filling in any more shapes
      this.graphics.endFill()
    }
  }

  // Create PixiJS app
  PIXIApp = new PIXI.Application({
    // render to <canvas class="orb-canvas"></canvas>
    view: document.querySelector('.sidebar-canvas'),
    // auto adjust size to fit the current window
    resizeTo: document.querySelector('.sidebar'),
    // transparent background, we will be creating a gradient background later using CSS
    transparent: true
  })

  PIXIApp.stage.filters = [new KawaseBlurFilter(30, 10, true)]

  // Create colour palette
  const colorPalette = new ColorPalette()

  // Create orbs
  const orbs: Orb[] = []

  for (let i = 0; i < 5; i++) {
    const orb = new Orb(colorPalette.randomColor())
    PIXIApp.stage.addChild(orb.graphics)
    orbs.push(orb)
  }

  // Animate!
  let count = 0
  PIXIApp.ticker.add(() => {
    //console.log('ticker')
    if (count++ != 6) return
    count = 0
    //console.log('run')
    orbs.forEach((orb) => {
      orb.update()
      orb.render()
    })
  })

  document.querySelector('.overlay__btn--colors')?.addEventListener('click', () => {
    colorPalette.setColors()
    colorPalette.setCustomProperties()

    orbs.forEach((orb) => {
      orb.fill = colorPalette.randomColor()
    })
  })
})
console.log('全部结束')

onUnmounted(() => {
  console.log(PIXIApp)
  PIXIApp.stop()
})
</script>

<template>
  <canvas class="sidebar-canvas"></canvas>
  <div class="sidebar">
    <div class="sidebar-header">管理后台</div>
    <el-menu :default-active="route.path" router>
      <template v-for="item in items" :key="item.index">
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.index" class="sidebar-sub-menu">
            <template #title>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs" :key="subItem.title">
              <el-menu-item :index="subItem.index" class="sidebar-menu-item">
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <app-link :to="item.index">
            <el-menu-item :index="item.index" :key="item.index" class="sidebar-menu-item">
              <template #title>{{ item.title }}</template>
            </el-menu-item>
          </app-link>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<style scoped lang="scss">
.sidebar-canvas {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: $sidebar-width;
  z-index: -1;
  background-color: $sidebar-color;
}
.sidebar {
  --el-menu-text-color: #ebebeb;
  --el-menu-bg-color: #00000000;
  //--el-menu-bg-color: #00000000;
  --el-menu-hover-bg-color: #{$sidebar-hover-color};

  height: 100vh;
  width: $sidebar-width;
  min-width: $sidebar-width;
  max-width: $sidebar-width;

  box-sizing: border-box;
  color: white;
  background-color: rgba($sidebar-color, 0.75);

  border-right: 1px #f0f2f5 solid;

  > .sidebar-header {
    height: $header-height;

    font-size: 18px;
    display: flex;
    align-items: center;

    padding-left: 20px;

    //border-right: 1px #f0f2f5 solid;
    //border-bottom: 1px #f0f2f5 solid;
    border-bottom: 1px #ffffff10 solid;
    //border-bottom: 3px #2c2c58 solid;
    box-sizing: border-box;
  }

  > .el-menu {
    height: calc(100vh - $header-height);
    scrollbar-gutter: stable;
    border-right: none;
    overflow: auto;

    color: #fff;
  }

  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: #d7d7d777;
    }
  }

  ::-webkit-scrollbar {
    width: 5px;
    opacity: 0.5;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ffffff1f;
    border: none;
    border-radius: 100px;
  }
}
</style>
