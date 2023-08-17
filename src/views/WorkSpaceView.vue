<script setup lang="ts">
import { getTeachersCount } from '@/apis/teacher'
import { loadTcoins, loadPoint, getStudentAmount } from '@/apis/student'
import DisplayCard from '../components/DisplayCard.vue'
import { ref, reactive } from 'vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import UploadVideo from '@/components/UploadVideo.vue'
import { getClasses } from '@/apis/class'
import { getTeacherGroup } from '@/apis/teacherGroup'

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '工作台' }]


const studentAmount = ref()
const TeacherAmount = ref()
const PointAmount = ref()
const CoinsAmount = ref()
const ClassAmount = ref()
const GroupAmount = ref()
const MinilessonsAmount = ref()











// const reload = () => {
//   if (localStorage.reload == "true") {
//     location.reload()
//     localStorage.reload = "false"
//   }
// }
// reload()
const history = reactive([
  { title: '学生账号', amount: studentAmount },
  { title: '老师账号', amount: TeacherAmount },
  { title: '用户积分总额', amount: PointAmount },
  { title: 'TB总额', amount: CoinsAmount },
  { title: '老师上传微课数', amount: 0 },
  { title: '班级数量', amount: ClassAmount },
  { title: '教研组数量', amount: GroupAmount }
])

const order = reactive([
  { title: '今日订单收入', amount: 0 },
  { title: '今日订单数量', amount: 0 },
  { title: '7日内订单数量', amount: 0 },
  { title: '7日内订单收入', amount: 0 }
])

const loadData = () => {
  getStudentAmount()
    .then((res) => {
      studentAmount.value = res.data
    })
    .catch()
}
loadData()

const loadTeacher = () => {
  getTeachersCount().then((res) => {
    TeacherAmount.value = res.data
  }).catch
}
loadTeacher()


const loadMark = () => {

  loadPoint().then((res) => {
    PointAmount.value = res.data
  }).catch()
}
loadMark()

const LoadCoins = () => {
  loadTcoins().then((res) => {
    CoinsAmount.value = res.data
  }).then()
}
LoadCoins()



const getClassesAmount = () => {
  
  var args = {
    pageNum: 1,
    pageSize: 20
  }
  getClasses(args).then((res) => {
      ClassAmount.value = res.data.total
    })
    .catch(() => { })
    .finally(() => {
    })
}
getClassesAmount()


const getGroupAmount = () => {
  
  var args = {
    pageNum: 1,
    pageSize: 20
  }
  getTeacherGroup(args).then((res) => {
      GroupAmount.value = res.data.total
    })
    .catch(() => { })
    .finally(() => {
    })
}
getGroupAmount()
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
