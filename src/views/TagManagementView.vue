<script setup lang="tsx">
import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置' }, { name: '分类管理' }]

const tagMenu: any = ['语文', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史']
const major: any = ['语文', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史']
</script>

<template>
  <div class="sup-card">
    <div class="card-left">

      <div class="card-title-bar">
        <el-text>标签菜单</el-text>
        <div style="flex-grow: 1;"></div>
        <el-button type="primary">添加</el-button>
      </div>
      <div class="test">
        <el-scrollbar class="scrollbar">
          <div class="card-body" v-for="key in tagMenu" :key="key">
            <el-button link type="primary">{{ key }}</el-button>
            <div style="flex-grow: 1;"></div>
            <el-button link type="primary">删除</el-button>
          </div>
        </el-scrollbar>
      </div>


    </div>

    <div class="card-right">

      <div class="card-title-bar">
        <el-text>新标签：</el-text>
        <el-input></el-input>
        <div style="flex-grow: 1;"></div>
        <el-button type="primary">添加</el-button>
      </div>

      <div class="card-body">
        <el-tag class="tag-item" closable v-for="item in major" :key="item">{{ item }}</el-tag>
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
    width: calc(($page-width - $page-gap) / 5);
    margin-right: $page-gap;
    box-shadow: 0px 0px 10px 1px #e1e2e4;
    flex-grow: 1;

    >.card-title-bar {
      margin: 10px;
      display: flex;
    }

    >.test {
      height: calc($page-height - 55px);
      width: calc(($page-width - $page-gap) / 4 - 45px);
      margin: 10px;

      >.scrollbar {
        .card-body {
          width: calc(($page-width - $page-gap) / 4 - 60px);
          display: flex;
          margin-bottom: 10px;
        }
      }
    }


  }

  >.card-right {
    width: calc(($page-width - $page-gap) / 4 * 3);
    box-shadow: 0px 0px 10px 1px #e1e2e4;
    flex-grow: 1;

    >.card-title-bar {
      margin: 10px;
      display: flex;

      >.el-input {
        width: 500px
      }

      >.el-button {
        margin-right: 20px
      }
    }

    >.card-body {
      margin: 20px;

      >.tag-item {
        line-height: 2;
        margin-bottom: 20px;
        margin-right: 20px;
      }
    }
  }
}</style>