<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { FullScreen } from '@element-plus/icons-vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import screenfull from 'screenfull'
import { useRouter } from 'vue-router'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '工作台', path: '/' }]
const router = useRouter()
import { getCurrentInstance } from "vue";
const author = getCurrentInstance()?.appContext.config.globalProperties.$author

const fullScreen = () => {
  if (screenfull.isEnabled) {
    screenfull.request()
  }
}

const name = localStorage.account

const quit = () => {
  Object.keys(author).forEach((i)=>{
    delete author[i]
  })
  console.log(author)
  localStorage.clear()
  router.push({ path: 'login'})
}

</script>

<template>
  <div class="header">
    <el-breadcrumb :separator-icon="ArrowRight" class="breadcrumb">
      <template v-for="item in breadcrumbStore.data" :key="item">
        <el-breadcrumb-item v-if="item.path" :to="{ path: item.path }">{{
          item.name
        }}</el-breadcrumb-item>
        <el-breadcrumb-item v-else>{{ item.name }}</el-breadcrumb-item>
      </template>

      <!-- <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">夜夜夜夜</a></el-breadcrumb-item>
      <el-breadcrumb-item>是否独立空间范围</el-breadcrumb-item>
      <el-breadcrumb-item>我分析</el-breadcrumb-item> -->
    </el-breadcrumb>
    <div class="space"></div>
    <div class="full-screen">
      <el-icon @click="fullScreen" class="full-screen-icon">
        <FullScreen />
      </el-icon>
    </div>
    <!-- <div class="user-avatar"></div> -->
    <el-dropdown class="user-action">
      <span>
        {{name}}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <!-- <el-dropdown-item>阿巴阿巴</el-dropdown-item>
          <el-dropdown-item>阿巴巴</el-dropdown-item>
          <el-dropdown-item>阿巴巴巴</el-dropdown-item> -->
          <el-dropdown-item divided @click="quit">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss">
.header {
  display: flex;
  align-items: center;

  height: $header-height;
  width: 100%;
  border-bottom: 1px #f0f2f5 solid;
  box-sizing: border-box;

  >.breadcrumb {
    margin-left: 30px;
  }

  >.space {
    flex-grow: 1;
  }

  >.full-screen {
    width: 60px;
    display: flex;
    justify-content: center;
    align-items: center;

    >.full-screen-icon {
      transition: all 0.5s ease;

      &:hover {
        font-size: 150%;
      }
    }
  }

  >.user-avatar {
    width: 33px;
    height: 33px;
    background-color: rgb(226, 223, 223);
    border-radius: 100%;
  }

  >.user-action {
    margin-right: 20px;
    margin-left: 15px;

    :hover {
      transition: all 0.3s ease;
      color: black;
    }
  }
}</style>
