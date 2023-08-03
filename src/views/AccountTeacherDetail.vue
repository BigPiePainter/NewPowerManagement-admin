<script setup lang="ts">
import DisplayVideoCard from '../components/DisplayVideoCard.vue'
import { ref, reactive } from 'vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getTeacherCourse } from '@/apis/teacherCourses'
import { useRoute } from 'vue-router'
import SearchBar from '@/components/SearchBar.vue'
import { getMiniLessons } from '@/apis/minilessons'
import { getTeacherGroup } from '@/apis/teacherGroup'
import type { CheckboxValueType } from 'element-plus'
import { ElCheckbox } from 'element-plus'

const newTeacherGroupDialogShow = ref(false);
const loading = ref(true)
const input = ref('')
const video = reactive<any>([])
const route = useRoute()
const addTeacherDialogShow = ref(false);
console.log(route.query.id)


const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})

const dialogSearchBarItems = reactive([
  { name: "名称", value: "", },
  { name: "标签", value: "", },
  { name: "上传者", value: ""  },
])

const totalLength = ref<Number>()
const teacherCourseid = ref<any>([])
const tableData = ref<any>([])
const CourseData = ref<any>([])

const loadTeacherData = () => {
  loading.value = true

  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    teacherId: route.query.id
  }
  getTeacherCourse(args)
    .then((res) => {
      console.log(res)
      tableData.value = res.data.records
      totalLength.value = res.data.records.length
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}


loadTeacherData()

const loadData = () => {
  loading.value = true
  tableData.value.id = teacherCourseid.value
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    teacherCourseId: teacherCourseid.value
  }
  getMiniLessons(args)
    .then((res) => {
      console.log(tableData.value)
      res.data.records.forEach((item: any) => {
        video.push({
          title: item.name,
          picture: item.cover,
          time: item.updatedAt,
          videoduration: item.videoDuration
        })
      })
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })



}



const loadDialogData = () => {
  loading.value = true

  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    teacherCourseId: teacherCourseid.value
  }
  getMiniLessons(args)
    .then((res) => {
      console.log(tableData.value)
      res.data.records.forEach((item: any) => {
        video.push({
          title: item.name,
          picture: item.cover,
          time: item.updatedAt,
          videoduration: item.videoDuration
        })
      })
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })

}
loadData()

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '老师管理', path: '/account-teacher-managament' },
  { name: '老师详情', path: '/teacher-detail-managament' },
]



</script>

<template>
  <div class="whole">
    <div class="topPart">
      <div class="topPart1">
        <div class="topPart1-1">
          <div class="top-Part1-1-1"><el-text>老师信息</el-text></div>
        </div>
        <div class="topPart1-2">
          <div class="top-Part1-2-1">Aaron</div>
          <div class="top-Part1-2-2">
            <div><el-text>学习阶段:初一</el-text></div>
            <div><el-text>学科:语文</el-text></div>
            <div><el-text>电话:15536996997</el-text></div>
          </div>
        </div>
<el-button @click="console.log(tableData)"></el-button>
        <div class="topPart1-3">
          <div><el-text>创建时间:2022-2-13 13:00</el-text></div>
          <div class="topPart1-3-2"><el-text>最后登录:2023-6-5 12:00</el-text></div>
        </div>
      </div>

      <el-divider direction="vertical" class="divider-height" />

      <div class="topPart1">
        <div class="topPart1-1"><el-text>所带班级：</el-text></div>
        <div class="topPart2-2"><el-text>学习阶段</el-text></div>
      </div>

      <el-divider direction="vertical" class="divider-height" />
      <div class="topPart1">
        <div class="topPart1-1"><el-text>所在教研组</el-text></div>
        <div class="topPart2-2"><el-text>庄老师教研组</el-text></div>
      </div>
    </div>
    <el-divider class="row-divider"></el-divider>
    <div>
      <div class="botPart1-1">
        <div class="botPart1-1-1"><el-text>月度统计</el-text></div>
        <div class="botPart1-1-2"> <el-input v-model="input" placeholder="2023-07" /></div>
        <div class="botPart1-1-3"><el-text>共23个微课</el-text></div>
      </div>
    </div>
    <div class="botPart1-2">
  </div>



  <el-dialog class="teacher-group-detail-dialog" width="900px" v-model="addTeacherDialogShow">
    <TablePage class="dialog-table-page" :columns="dialogTableColumns" :data="dialogTableData">
      <SearchBar class="dialog-search-bar" :items="dialogSearchBarItems" @change="loadDialogData()"></SearchBar>
    </TablePage>

    <template #header>
      <el-text>添加老师</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confirmNewTeacher()">确定</el-button>
      <el-button @click="cancelNewTeacher()">
        取消
      </el-button>
    </template>
  </el-dialog>

    </div>

</template>

<style scoped lang="scss">
$scale: 0.88;

.whole {
  display: flex;
  flex-direction: column;
}

.topPart {
  display: flex;
  flex-direction: row;
  height: 220px * $scale;
}

.topPart1 {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.topPart1-1 {
  display: flex;
  height: 40px * $scale;
  margin-top: 15px * $scale;
  margin-left: 15px;
}

.topPart2-2 {
  display: flex;
  margin-top: 10px * $scale;

  margin-left: 15px;
}

.top-Part1-2-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;

}

.row-divider {
  width: 100%;
  border-bottom: 7px #f0f2f5 solid;
  box-sizing: border-box;
  margin: 0;
}

.top-Part1-2-2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.top-Part1-1-1 {
  display: flex;

}

.topPart1-2 {
  display: flex;
  flex-direction: row;
  height: 80px * $scale;
}

.topPart1-3 {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 15px;

}


.topPart1-3-2 {
  margin-top: 20px * $scale;

}

.botPart1-1 {
  display: flex;
  flex-direction: row;
  height: 50px * $scale;
  align-content: center;
}

.botPart1-1-1 {
  display: flex;
  flex-direction: row;
  width: 80px * $scale;
  align-items: center;
  justify-content: center;
  padding-left: 5px * $scale;

}

.botPart1-1-2 {
  display: flex;
  flex-direction: row;
  width: 160px * $scale;
  align-items: center;
  justify-content: center;

}

.botPart1-1-3 {
  display: flex;
  flex-direction: row;
  margin-left: 120px * $scale;
  width: 160px * $scale;
  align-items: center;
  justify-content: center;
}


.botPart1-2 {
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  flex-wrap: wrap;
  margin-top: -10px * $scale;
}

.divider-height {
  height: 88%;
  align-self: center;
  border-left: 3px #f0f2f5 solid;
  box-sizing: border-box;
}
</style>