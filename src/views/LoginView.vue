<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { userLogin } from '@/apis/user'
import { ref, reactive, pushScopeId } from 'vue'
import { rejects } from 'assert';
import router from '@/router';
import { ElMessage } from 'element-plus'



const account = ref("")
const password = ref("")


const pars = reactive({
  "account": account.value,
  "password": password.value,
  "device": {
    "deviceId":  "Web",
    "deviceModel": "Web",
    "deviceName": "Web",
    "version": 1
  },
})

const enterHome=()=>{
  router.push({ path: 'work-space'})
}


const alert = ref(false)


const login = () => {
  
  userLogin(pars).then((res) => {
    if (res.data.code == 20000) ElMessage.success()
    else{
      enterHome()
      }
    }
  ).catch((err) => {
    console.log(err)
  })
  console.log(2)

}

const open1 = () => {
  ElMessage('this is a message.')
}
const open2 = () => {
  ElMessage({
    message: '登陆成功',
    type: 'success',
  })
}
const open3 = () => {
  ElMessage({
    message: '登陆失败',
    type: 'warning',
  })
}


</script>




<template>
    <ElMessage v-model="open2"></ElMessage>
  <ElMessage v-model="open3"></ElMessage>
  <div class="login">
    <el-text class="title">锦鲤项目</el-text>
    <div class="account">
      <el-text class="word">账号：</el-text> <el-input v-model='pars.account' />
    </div>
    <div class="account">
      <el-text class="word">密码：</el-text> <el-input v-model='pars.password' />
    </div>
    <el-button type="primary" @click="login">登陆</el-button>
    <el-button style="margin-top: 10px;" type="primary" @click="enterHome">烦人，立马登录</el-button>




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
