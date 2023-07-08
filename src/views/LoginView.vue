<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { userLogin } from '@/apis/login'
import { ref, reactive, pushScopeId } from 'vue'
import { rejects } from 'assert';
import router from '@/router';
import { ElNotification } from 'element-plus'
import { text } from 'stream/consumers'
import { userInfo } from '@/apis/manager';



const account = ref("")
const password = ref("")


const pars = reactive({
  "account": account.value,
  "password": password.value,
  "device": {
    "deviceId": "Web",
    "deviceModel": "Web",
    "deviceName": "Web",
    "version": 1
  },
})



const enterAccount = () => {
  pars.account = "15824136350"
  pars.password = "482c811da5d5b4bc6d497ffa98491e38"
}


const enterHome = () => {
  router.push({ path: 'work-space' })

}

const login = () => {
  userLogin(pars).then((res) => {
    if (res.data.code == 20000) {
      {
        ElNotification({
          title: 'Warning',
          message: '登入信息错误',
          type: 'warning',
        })
        return;
      }
    }
    else {
      localStorage.token = res.data.token
      {
        ElNotification({
          title: 'Success',
          message: '登陆成功',
          type: 'success',
        })
      }
      enterHome()
    }
  }

  ).catch(() => {
  {
        ElNotification({
          title: 'Warning',
          message: '网络不佳',
          type: 'warning',
        })
  }
  
  }
  )
}
</script>




<template>
  <div class="login">
    <el-text class="title">锦鲤项目</el-text>
    <div class="account">
      <el-text class="word">账号：</el-text> <el-input placeholder="" v-model='pars.account' />
    </div>
    <div class="account">
      <el-text class="word">密码：</el-text> <el-input placeholder="" v-model='pars.password' show-password />
    </div>
    <el-button type="primary" @click="login">登陆</el-button>
    <el-button style="margin-top: 10px;" type="primary" @click="enterAccount">烦人，立马登录</el-button>




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
@/apis/login@/apis/login