<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { userLogin, roleInfo } from '@/apis/login'
import { ref, reactive, pushScopeId } from 'vue'
import router from '@/router'
import { ElNotification } from 'element-plus'
import { text } from 'stream/consumers'
import { userAuthor } from '@/apis/manager'

const account = ref('')
const password = ref('')

const pars = reactive({
  account: account.value,
  password: password.value,
  device: {
    deviceId: 'Web',
    deviceModel: 'Web',
    deviceName: 'Web',
    version: 1
  }
})

const enterAccount = () => {
  pars.account = 'nick_young'
  pars.password = '888888'
}

import { getCurrentInstance } from "vue";
const author = getCurrentInstance()?.appContext.config.globalProperties.$author

const enterHome = () => {
  var args = {
    account: pars.account,
    pageNum: 1,
    pageSize: 1
  }
  // localStorage.author = {}
  userAuthor(args)
    .then((res: any) => {
      if (res.code == 20000) {
        localStorage.account = res.data.records[0].account
        localStorage.avator = res.data.records[0].avator
        localStorage.remark = res.data.records[0].remark
        console.log(localStorage)
        var menuObj: any = {}
        var items = res.data.records[0].menuList
        for (const key in items) {
          var menu = items[key].name
          console.log(key, menu)
          author[menu] = "check"
          // localStorage.author[JSON.stringify(menu)] = "check"
          menuObj[menu] = "check"
        }
        // Object.assign(localStorage, { "author": menuObj })
      } else {
        ElNotification({
          title: 'Error',
          message: "权限出现错误",
          type: 'error'
        })
      }
      console.log(author)
      console.log(menuObj)
      console.log(localStorage)
    })
  router.push({ path: 'work-space' })
}

const login = () => {
  userLogin(pars)
    .then((res: any) => {
      console.log("THEN", res)
      if (res.code != 20000) {
        ElNotification({
          title: 'Warning',
          message: res.msg,
          type: 'warning'
        })
        return
      } else if (res.code == 20000) {
        localStorage.token = res.data.token
        localStorage.info = 111
        ElNotification({
          title: 'Success',
          message: '登陆成功',
          type: 'success'
        })
        enterHome()
      }
    })
    .catch((error) => {
      console.log(error)
      ElNotification({
        title: 'Warning',
        message: error.msg,
        type: 'warning'
      })
    })
}
</script>

<template>
  <div class="login">
    <el-text class="title">锦鲤项目</el-text>
    <div class="account">
      <el-text class="word">账号：</el-text> <el-input placeholder="" v-model="pars.account" />
    </div>
    <div class="account">
      <el-text class="word">密码：</el-text>
      <el-input placeholder="" v-model="pars.password" show-password />
    </div>
    <el-button type="primary" @click="login">登陆</el-button>
    <el-button style="margin-top: 10px" type="primary" @click="enterAccount">烦人，立马登录</el-button>
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
