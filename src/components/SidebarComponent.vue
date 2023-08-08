<script lang="ts">
import * as PIXI from 'https://cdn.skypack.dev/pixi.js@5.x'
import { KawaseBlurFilter } from 'https://cdn.skypack.dev/@pixi/filter-kawase-blur@3.2.0'
import SimplexNoise from 'https://cdn.skypack.dev/simplex-noise@3.0.0'
import hsl from 'https://cdn.skypack.dev/hsl-to-hex'
import debounce from 'https://cdn.skypack.dev/debounce'
PIXI.utils.skipHello()
console.log('超炫酷无敌动画依赖import加载完毕')
</script>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'
import { reactive } from 'vue';
import { getCurrentInstance } from "vue";
const isIn = getCurrentInstance()?.appContext.config.globalProperties.$isIn
const author = JSON.parse(localStorage.author)
const cslg=()=>{
  console.log(JSON.parse(localStorage.author))
}
 
const items = reactive([
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
        title: '班级管理',
        
      },
      {
        index: '/teacher-group-management',
        title: '教研组管理',
        
      }
    ]
  },
  {
    index: '/account-management',
    title: '账号管理',
    subs: [
      {
        index: '/account-role-managment',
        title: '角色管理',
        
      },
      {
        index: '/acount-equipment-management',
        title: '账号设备管理',
        
      },
      {
        index: '/account-teacher-managament',
        title: '老师管理',
        
      },
      {
        index: '/account-student-management',
        title: '学生管理',
        
      },
      {
        index: '/account-temoorary-student',
        title: '临时学生',
        
      }
    ]
  },
  {
    index: '/live-class',
    title: '实时课堂',
    
  },
  {
    index: '/course-management-group',
    title: '课程管理',
    subs: [
      {
        index: '/course-approval',
        title: '微课审核',
        
      },
      {
        index: '/course-management',
        title: '课程包管理',
        
      }
    ]
  },
  {
    index: '/shop-management',
    title: '商城管理',
    
  },
  {
    index: '',
    title: '题库管理',
    subs: [
      {
        index: '/question-bank-management',
        title: '好题包管理',
        
      },
      {
        index: '/question-bank',
        title: '题库',
        
      }
    ]
  },
  {
    index: '/order-management',
    title: '订单管理',
    
  },
  {
    index: '/student-points-management',
    title: '消费管理',
    subs: [
      {
        index: '/student-points-management',
        title: '学生积分',
        
      },
      {
        index: '/student-tcoin-management',
        title: '学生T币',
        
      }
    ]
  },
  {
    index: '/setting',
    title: '设置',
    subs: [
      {
        index: '/category-management',
        title: '分类管理',
        
      },
      {
        index: '/tag-management',
        title: '标签管理',
        
      },
      {
        index: '/course-category',
        title: '课程类目',
        
      },
      {
        index: '/exam-info',
        title: '考试咨询',
        
      },
      {
        index: '/exam-date',
        title: '考试时间',
        
      },
      {
        index: '/banner',
        title: 'banner',
        
      },
      {
        index: '/info-center',
        title: '消息中心',
        
      },
    ]
  },
])

const route = useRoute()

let PIXIApp: any
onMounted(() => {
  function random(min: number, max: number): number {
    return Math.random() * (max - min) + min
  }

  function map(n: number, start1: number, end1: number, start2: number, end2: number): number {
    return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2
  }

  const simplex = new SimplexNoise()

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
    }

    setColors() {
      this.hue = ~~random(220, 360)
      this.complimentaryHue1 = this.hue + 30
      this.complimentaryHue2 = this.hue + 60
      this.saturation = 95
      this.lightness = 50

      this.baseColor = hsl(this.hue, this.saturation, this.lightness)
      this.complimentaryColor1 = hsl(this.complimentaryHue1, this.saturation, this.lightness)
      this.complimentaryColor2 = hsl(this.complimentaryHue2, this.saturation, this.lightness)
      this.colorChoices = [this.baseColor, this.complimentaryColor1, this.complimentaryColor2]
    }

    randomColor(): string {
      return this.colorChoices[~~random(0, this.colorChoices.length)].replace('#', '0x')
    }
  }

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

    constructor(fill: number | string = 0x000000) {
      this.bounds = this.setBounds()

      this.x = random(this.bounds['x'].min, this.bounds['x'].max)
      this.y = random(this.bounds['y'].min, this.bounds['y'].max)

      this.scale = 1

      this.fill = fill

      this.radius = random(window.innerHeight / 12, window.innerHeight / 12)

      this.xOff = random(0, 1000)
      this.yOff = random(0, 1000)

      //this.inc = 0.002
      this.inc = 0.006

      this.graphics = new PIXI.Graphics()
      this.graphics.alpha = 0.825

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
      const xNoise = simplex.noise2D(this.xOff, this.xOff)
      const yNoise = simplex.noise2D(this.yOff, this.yOff)
      const scaleNoise = simplex.noise2D(this.xOff, this.yOff)

      this.x = map(xNoise, -1, 1, this.bounds['x'].min, this.bounds['x'].max)
      this.y = map(yNoise, -1, 1, this.bounds['y'].min, this.bounds['y'].max)

      //console.log(scaleNoise)
      this.scale = map(scaleNoise, -1, 1, 0.5, 1)
      //console.log('scale', this.scale)

      this.xOff += this.inc
      this.yOff += this.inc
    }

    render() {
      this.graphics.x = this.x
      this.graphics.y = this.y
      this.graphics.scale.set(this.scale)

      this.graphics.clear()

      this.graphics.beginFill(this.fill)
      this.graphics.drawCircle(0, 0, this.radius)
      this.graphics.endFill()
    }
  }

  PIXIApp = new PIXI.Application({
    view: document.querySelector('.sidebar-canvas'),
    resizeTo: document.querySelector('.sidebar'),
    transparent: true
  })

  PIXIApp.stage.filters = [new KawaseBlurFilter(30, 10, true)]

  const colorPalette = new ColorPalette()

  const orbs: Orb[] = []

  for (let i = 0; i < 5; i++) {
    const orb = new Orb(colorPalette.randomColor())
    PIXIApp.stage.addChild(orb.graphics)
    orbs.push(orb)
  }

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
})
console.log('全部结束')

onUnmounted(() => {
  console.log(PIXIApp)
  PIXIApp.stop()
})
</script>

<template>
  <canvas class="sidebar-canvas"></canvas>
  <div v-if="isIn" class="sidebar">
    <div class="sidebar-header" @click="cslg">管理后台</div>
    <el-menu :default-active="route.path" router>
      <template v-for="item in items" :key="item.index">
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.index" class="sidebar-sub-menu">
            <template #title>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs" :key="subItem.title">
              <el-menu-item :disabled="!(subItem.title in author)" :index="subItem.index" class="sidebar-menu-item">
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <app-link :to="item.index">
            <el-menu-item :disabled="!(item.title in author)" :index="item.index" :key="item.index" class="sidebar-menu-item">
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
  position: absolute;
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
  background-color: rgba($sidebar-color, 0.8);

  border-right: 1px #f0f2f5 solid;

  >.sidebar-header {
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

  >.el-menu {
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
