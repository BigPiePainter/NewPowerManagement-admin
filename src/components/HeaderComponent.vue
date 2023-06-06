<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
</script>

<template>
  <div class="header">

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
  height: $header-height;
  width: 100%;
  border-bottom: 1px #f0f2f5 solid;
  box-sizing: border-box;

  display: flex;
  justify-content: flex-end;
  align-items: center;

  > .user-avatar{
    width: 33px;
    height: 33px;
    background-color: rgb(226, 223, 223);
    border-radius: 100%;
  }
  > .user-action{
    margin-right: 20px;
    margin-left: 15px;

    :hover{
      transition: all 0.3s ease;
      color: black;
    }
  }
}
</style>
