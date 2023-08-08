<script setup lang="ts">
import { userLogin } from '@/apis/login'
import { ref } from 'vue'
import { ElNotification } from 'element-plus'
import { userAuthor } from '@/apis/manager'
import router from '@/router'

const account = ref('')
const password = ref('')

const enterHome = () => {
  var args = {
    account: account.value,
    pageNum: 1,
    pageSize: 1
  }
  console.log("账号", args.account)
  userAuthor(args)
    .then((res: any) => {
      console.log("账号", args.account)
      if (res.code == 20000) {
        localStorage.account = res.data.records[0].account
        localStorage.avator = res.data.records[0].avator

        // localStorage.remark = res.data.records[0].remark
        console.log(localStorage)
        var author:any = {}
        var items = res.data.records[0].menuList
        for (const key in items) {
          var menu = items[key].name
          console.log(key, menu)
          author[menu] = "check"
        }


        return localStorage.setItem('author', JSON.stringify(author))
      } else {
        ElNotification({
          title: 'Error',
          message: "权限出现错误",
          type: 'error'
        })
      }
      console.log("权限初始化", author)
      console.log(localStorage)
    })
  router.push({ path: 'work-space' })
}

const login = () => {
  var pars = {
    account: account.value,
    password: password.value,
    device: {
      deviceId: 'Web',
      deviceModel: 'Web',
      deviceName: 'Web',
      version: 1
    }
  }
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
        localStorage.clear()
        localStorage.token = res.data.token
        localStorage.id = res.data.id
        localStorage.reload = "true"
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
      <el-text class="word">账号：</el-text> <el-input placeholder="" v-model="account" />
    </div>
    <div class="account">
      <el-text class="word">密码：</el-text>
      <el-input placeholder="" v-model="password" show-password />
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
