<script setup lang="ts">
import { userLogin } from '@/apis/login'
import { ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'
import { getManager } from '@/apis/manager'
import router from '@/router'

const account = ref('')
const password = ref('')
const author = reactive<any>({
  workSpace: true,
  school: false,
  classShow: false,
  classEdit: false,
  teacherGroupShow: false,
  teacherGroupEdit: false,
  account: false,
  managerShow: false,
  managerEdit: false,
  deviceShow: false,
  deviceEdit: false,
  teacherShow: false,
  teacherEdit: false,
  studentShow: false,
  studentEdit: false,
  temoryStudentShow: false,
  temoryStudentEdit: false,
  liveClassShow: false,
  liveClassEdit: false,
  course: false,
  miniLessonShow: false,
  miniLessonEdit: false,
  coursePackageShow: false,
  coursePackageEdit: false,
  shopShow: false,
  shopEdit: false,
  questionBank: false,
  questionPackageShow: false,
  questionPackageEdit: false,
  questionsShow: false,
  questionsEdit: false,
  orderShow: false,
  orderEdit: false,
  market: false,
  pointShow: false,
  pointEdit: false,
  tCoinShow: false,
  tCoinEdit: false,
  setting: false,
  categoryShow: false,
  categoryEdit: false,
  tagShow: false,
  tagEdit: false,
  courseCategoryShow: false,
  courseCategoryEdit: false,
  examInfoShow: false,
  examInfoEdit: false,
  examDateShow: false,
  examDateEdit: false,
  bannerShow: false,
  bannerEdit: false,
  messageShow: false,
  messageEdit: false
})
const enterHome = () => {
  var args = {
    account: account.value,
    pageNum: 1,
    pageSize: 1
  }
  console.log("账号", args.account)
  getManager(args)
    .then((res: any) => {
      console.log("账号", args.account)
      if (res.code == 20000) {
        localStorage.account = res.data.records[0].account
        localStorage.avator = res.data.records[0].avator
        localStorage.remark = res.data.records[0].remark
        var menuList: any = []
        res.data.records[0].menuList.forEach((menu: any) => {
          menuList.push(menu.name)
        })
        console.log(menuList)
        menuList.forEach((menu: any) => {
          author[menu] = true
        })
        localStorage.author = JSON.stringify(author)
        router.push({ path: 'work-space' })
      } else {
        ElNotification({
          title: 'Error',
          message: res.msg,
          type: 'error'
        })
      }
    })
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
    <div class="bg"></div>

    <div class="account">
      <el-input placeholder="请输入" v-model="account">
        <template #prepend>账号</template>
      </el-input>
    </div>

    <div class="account">
      <el-input placeholder="请输入" v-model="password" show-password>
        <template #prepend>密码</template>
      </el-input>
    </div>

    <div class="account">
      <el-button type="primary" @click="login">登陆</el-button>
    </div>
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
  background-color: rgb(243, 245, 247);
}

.bg {
  height: 500px;
  background-image: url(../../public/loginBgTop.png);
  background-repeat: no-repeat;
  background-size: 100% 100%;
  background-position: center top;
  position: absolute;
  padding: 0px;
  width: 100%;
  height: 35%;
  top: 0;
  left: 0;
}

.account {
  white-space: nowrap;
  width: 300px;
  display: flex;
  margin: 12px;
  flex-direction: row;
}

.word {
  white-space: nowrap;
  display: flex;
  flex-direction: row;
  width: 45px;
}

.title {
  font-size: 22px;
  margin: 10px;
}

.el-button {
  margin: 17px;
  width: 300px;
}
</style>
