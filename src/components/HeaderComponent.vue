<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { ArrowRight } from '@element-plus/icons-vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '工作台', path: '/' }]
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
    <div class="user-avatar"></div>
    <el-dropdown class="user-action">
      <span>
        Zack Zhang
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided>Action 5</el-dropdown-item>
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

  > .breadcrumb {
    margin-left: 30px;
  }
  > .space {
    flex-grow: 1;
  }
  > .user-avatar {
    width: 33px;
    height: 33px;
    background-color: rgb(226, 223, 223);
    border-radius: 100%;
  }
  > .user-action {
    margin-right: 20px;
    margin-left: 15px;

    :hover {
      transition: all 0.3s ease;
      color: black;
    }
  }
}
</style>
