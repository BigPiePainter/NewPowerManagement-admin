<script setup lang="tsx">
import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置' }, { name: '分类管理' }]

const studyState = { 高中:['高一','高二', '高三'], 初中:['初一','初二', '初三'] }
</script>

<template>
  <div class="sup-card">
    <div class="card-left">

      <div class="card-title-bar">
        <el-text class="card-title-text">学习阶段</el-text>
        <div style="flex-grow: 1;"></div>
        <el-text link type="primary">新增一级</el-text>
      </div>

      <div v-for="item in Object.keys(studyState)" :key="item">
      <el-text>{{ item }}</el-text>  
      </div>
    </div>
    <div class="card-right">
      <div class="card-title-bar">
        <el-text class="card-title-text">学科分类</el-text>
        <div style="flex-grow: 1;"></div>
        <el-text style="margin-right: 20px;" link type="primary">设置</el-text>
        <el-text link type="primary">新增</el-text>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.sup-card {
  $gap: 15px;
  height: $page-height;
  display: flex;

  >.card-left {
    width: calc(($page-width - $page-gap) / 2);
    margin-right: $page-gap;
    box-shadow: 0px 0px 10px 1px #e1e2e4;
    flex-grow: 1;

    >.card-title-bar {
      margin: 20px;
      display: flex;
    }
  }

  >.card-right {
    width: calc(($page-width - $page-gap) / 2);
    box-shadow: 0px 0px 10px 1px #e1e2e4;
    flex-grow: 1;

    >.card-title-bar {
      margin: 20px;
      display: flex;
    }
  }
}
</style>