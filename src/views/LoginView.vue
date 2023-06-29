<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>




<template>
  <div class="login">
    <div style="width:">
     <el-text>账号：</el-text> <el-input/>
     <el-text>密码：</el-text> <el-input/>
    </div>
    <RouterLink to="/work-space">登陆！！</RouterLink>
  </div>
</template>

<style scoped lang="scss">
.login {
  width: 100vw;
  height: 100vh;
  font-size: 20vmin;

  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
