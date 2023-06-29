


<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>




<template>


  <div class="login">
    <el-text class="title">锦鲤项目</el-text>
    <div class="account">
      <el-text class="word">账号：</el-text> <el-input />
    </div>
    <div class="account">
    <el-text class="word">密码：</el-text> <el-input /></div>
    <el-button type="primary"><RouterLink to="/work-space">登陆</RouterLink></el-button>
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
  flex-direction: column;
}

.account {
  width: 400px;
  display: flex;
  margin: 8px;
  flex-direction: row;
}


.word{
  display: flex;
  flex-direction: row;
}

.title{
  font-size: 22px;
}
</style>
