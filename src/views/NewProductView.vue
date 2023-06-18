<script setup lang="ts">
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { ref } from 'vue'
import { ArrowRight } from '@element-plus/icons-vue'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '商城管理', path: '/shop-management' },
  { name: '新建商品', path: '' }
]

const active = ref(0)

const next = () => {
  if (++active.value > 2) active.value = 0
}
</script>

<template>
  <div class="page">
    <el-steps :active="active" align-center finish-status="success" class="steps">
      <el-step title="基本信息" />
      <el-step title="课程信息" />
      <el-step title="价格信息" />
    </el-steps>
    <el-divider></el-divider>
    <transition name="slide-fade" mode="out-in">
      <div class="step-1" v-if="active == 0">
        <div class="image-row">
          <div class="image-row-image"></div>
          <div class="image-row-button">
            <el-button>上传商品封面</el-button>
          </div>
        </div>
        <div class="input-row">
          <div class="input-title">
            <el-text>*商品名称：</el-text>
          </div>
          <div class="input-container">
            <el-input class="input-input" :placeholder="11" />
          </div>
        </div>
        <div class="input-row">
          <div class="input-title">
            <el-text>*分类：</el-text>
          </div>
          <div class="input-container">
            <el-input class="input-input" :placeholder="11" />
            <el-input class="input-input" :placeholder="11" />
            <el-input class="input-input" :placeholder="11" />
            <el-input class="input-input" :placeholder="11" />
          </div>
        </div>
        <div class="input-row">
          <div class="input-title">
            <el-text>标签：</el-text>
          </div>
          <div class="input-container">
            <el-input class="input-input" :placeholder="11" />
          </div>
        </div>
        <div class="next-button-row">
          <el-button class="next-button-row-button" type="text" @click="next"
            >下一步<el-icon class="el-icon--right"><ArrowRight /></el-icon
          ></el-button>
        </div>
      </div>

      <div class="step-2" v-else-if="active == 1">
        第2步

        <div class="next-button-row">
          <el-button class="next-button-row-button" type="text" @click="next">
            下一步<el-icon class="el-icon--right"><ArrowRight /> </el-icon
          ></el-button>
        </div>
      </div>
      <div class="step-2" v-else-if="active == 2">
        第3步

        <div class="next-button-row">
          <el-button class="next-button-row-button" type="text" @click="next">
            下一步<el-icon class="el-icon--right"><ArrowRight /> </el-icon
          ></el-button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped lang="scss">
.page {
  width: $page-width;
  height: $page-height;
  display: flex;
  flex-direction: column;

  > .steps {
    padding-top: 50px;
  }

  .step-1 {
    > .image-row {
      background-color: #ff000022;
      margin-bottom: 20px;
      display: flex;
      align-items: flex-end;

      > .image-row-image {
        margin-left: 20px;
        width: 400px;
        height: calc(400px / 16 * 9);
        background-color: #ff000022;
      }
      > .image-row-button {
        margin-left: 20px;
      }
    }

    > .input-row {
      background-color: #ff000022;
      margin-bottom: 20px;
      min-height: 50px;
      display: flex;
      align-items: center;

      > .input-title {
        min-width: 100px;
        background-color: #ff000022;
        display: flex;
        justify-content: flex-end;
      }

      > .input-container {
        background-color: #00ff0022;
        > .input-input {
          width: 220px;
          margin: 9px;
        }
      }
    }

    > .next-button-row {
      background-color: #00ff0022;
      flex-grow: 1;

      > .next-button-row-button {
        margin-left: 20px;
      }
    }
  }
}
</style>
