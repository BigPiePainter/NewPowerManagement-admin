<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { userLogin } from '@/apis/user'
import { ref, reactive } from 'vue'
import { rejects } from 'assert';
import { defineComponent } from 'vue';


const account = ref("")
const password = ref("")


const pars = {
  "account": account.value,
  "password": password.value,
  "device": {
    "deviceId": navigator.userAgent,
    "deviceModel": "Web",
    "deviceName": navigator.userAgent,
    "version": 1
  },
}

const login = () => {
  userLogin(pars).then((res) => {
    console.log('success', res)
  }).catch((err) => {
    console.log(err)
  })
  console.log(2)

}

</script>




<template>
  <div class="login">
    <el-text class="title">锦鲤项目</el-text>
    <div class="account">
      <el-text class="word">账号：</el-text> <el-input v-model="account" />
    </div>
    <div class="account">
      <el-text class="word">密码：</el-text> <el-input v-model="password" />
    </div>
    <el-button type="primary" @click="login">登陆</el-button>
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

  background-color: rgb(82, 50, 156);
}

.account {
  width: 400px;
  display: flex;
  margin: 8px;
  flex-direction: row;
}


.word {
  display: flex;
  flex-direction: row;
  width: 40px;
}

.title {
  font-size: 22px;
  margin: 10px;
}
</style>
