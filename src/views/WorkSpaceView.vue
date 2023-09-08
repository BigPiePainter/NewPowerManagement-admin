<script setup lang="ts">
import { getTeachersCount } from '@/apis/teacher'
import { loadTcoins, loadPoint, getStudentAmount } from '@/apis/student'
import DisplayCard from '../components/DisplayCard.vue'
import { ref, reactive } from 'vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getClasses } from '@/apis/class'
import { getTeacherGroup } from '@/apis/teacherGroup'
import { getMiniLessons } from '@/apis/minilessons'
import { getOrderAmount, getOrderNumber } from '@/apis/order'

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '工作台' }]

const studentAmount = ref()
const TeacherAmount = ref()
const PointAmount = ref()
const CoinsAmount = ref()
const ClassAmount = ref()
const GroupAmount = ref()
const MinilessonsAmount = ref()
const todayIncom = ref()
const todayNumber = ref()
const weekIncom = ref()
const weekNumber = ref()

const history = reactive([
  { title: '学生账号 (未过期有效账号)', amount: studentAmount },
  { title: '老师账号', amount: TeacherAmount },
  { title: '用户积分总额', amount: PointAmount },
  { title: 'TB总额', amount: CoinsAmount },
  { title: '老师上传微课数', amount: MinilessonsAmount },
  { title: '班级数量', amount: ClassAmount },
  { title: '教研组数量', amount: GroupAmount }
])

const order = reactive([
  { title: '今日订单收入', amount: todayIncom },
  { title: '今日订单数量', amount: todayNumber },
  { title: '7日内订单收入', amount: weekIncom },
  { title: '7日内订单数量', amount: weekNumber }
])

const getNowDateTime = () => {
  var date = new Date();
  var nowMonth: any = date.getMonth() + 1;
  var strDate: any = date.getDate();
  var seperator = "-";
  if (nowMonth >= 1 && nowMonth <= 9) {
    nowMonth = "0" + nowMonth;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
  console.log(nowDate)
  return nowDate
}

// const getNow = () => {
//   var date = new Date();
//   var nowMonth: any = date.getMonth() + 1;
//   var strDate: any = date.getDate();
//   var hours = date.getHours(); //获取当前小时
//   var minutes = date.getMinutes(); //获取当前分钟
//   var seconds = date.getSeconds(); //获取当前秒
//   var seperator = "-";
//   if (nowMonth >= 1 && nowMonth <= 9) {
//     nowMonth = "0" + nowMonth;
//   }
//   if (strDate >= 0 && strDate <= 9) {
//     strDate = "0" + strDate;
//   }
//   var nowDate =
//     date.getFullYear()
//     + seperator
//     + nowMonth
//     + seperator
//     + strDate
//     + seperator
//     + hours
//     + seperator
//     + minutes
//     + seperator
//     + seconds
//   console.log(nowDate)
//   return nowDate
// }

const getLastWeekTime = () => {
  var date = new Date();
  var week = new Date(date.getTime() - 144 * 60 * 60 * 1000);
  var weekMonth: any = week.getMonth() + 1;
  var strDate: any = week.getDate();
  var seperator = "-";
  if (weekMonth >= 1 && weekMonth <= 9) {
    weekMonth = "0" + weekMonth;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  var lastWeekDate = date.getFullYear() + seperator + weekMonth + seperator + strDate;
  console.log(lastWeekDate)
  return lastWeekDate
}

const loadData = () => {
  getNowDateTime()
  getLastWeekTime()
  getStudentAmount()
    .then((res: any) => {
      studentAmount.value = res.data
      return getTeachersCount()
    })
    .then((res: any) => {
      TeacherAmount.value = res.data
      return loadPoint()
    })
    .then((res: any) => {
      PointAmount.value = res.data
      return loadTcoins()
    })
    .then((res: any) => {
      CoinsAmount.value = res.data
      return getClasses({ pageNum: 1, pageSize: 1 })
    })
    .then((res: any) => {
      ClassAmount.value = res.data.total
      return getTeacherGroup({ pageNum: 1, pageSize: 1 })
    })
    .then((res: any) => {
      GroupAmount.value = res.data.total
      return getMiniLessons({ pageNum: 1, pageSize: 1 })
    })
    .then((res: any) => {
      MinilessonsAmount.value = res.data.total
      return getOrderNumber({ start: getNowDateTime() + ' 00:00:00', end: getNowDateTime() + ' 23:59:59' })
    })
    .then((res: any) => {
      todayNumber.value = res.data
      return getOrderNumber({ start: getLastWeekTime() + ' 00:00:00', end: getNowDateTime() + ' 23:59:59' })
    })
    .then((res: any) => {
      weekNumber.value = res.data
      return getOrderAmount({ start: getNowDateTime() + ' 00:00:00', end: getNowDateTime() + ' 23:59:59' })
    })
    .then((res: any) => {
      if (res.data == null) {
        todayIncom.value = 0
      } else {
        todayIncom.value = res.data
      }
      return getOrderAmount({ start: getLastWeekTime() + ' 00:00:00', end: getNowDateTime() + ' 23:59:59' })
    })
    .then((res: any) => {
      if (res.data == null) {
        weekIncom.value = 0
      } else {
        weekIncom.value = res.data
      }
    })
    .catch()
}
loadData()
</script>

<template>
  <div class="page">
    <div class="card-container-header partA">
      <div class="divider"></div>
      历史累计
    </div>

    <el-divider border-style="dashed" class="card-container-divider" />
    <div class="card-container">
      <DisplayCard v-for="item in history" :key="item.title" :title="item.title" :amount="item.amount">
      </DisplayCard>
    </div>

    <div class="card-container-header partB">
      <div class="divider"></div>
      订单累计
    </div>
    <el-divider border-style="dashed" class="card-container-divider" />
    <div class="card-container">
      <DisplayCard v-for="item in order" :key="item.title" :title="item.title" :amount="item.amount">
      </DisplayCard>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page {
  >.card-container-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 15px;
    margin-left: 25px;
    &.partA {
      margin-top: 33px;
    }
    &.partB {
      margin-top: 48px;
    }
    >.divider {
      border-left: 4px #404040 solid;
      height: 15px;
      margin-right: 14px;
      margin-left: 8px;
    }
  }
  >.card-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: calc($page-width - 40px);
  }
  >.card-container-divider {
    margin-bottom: 0px;
    margin-top: 7px;
    margin-left: 25px;
    width: calc($page-width - 50px);
    justify-content: flex-start;
  }
}
</style>
