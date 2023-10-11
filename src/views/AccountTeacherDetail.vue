<script setup lang="ts">
import DisplayVideoCard from '../components/DisplayVideoCard.vue'
import { ref, reactive } from 'vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getTeacherCourse } from '@/apis/teacherCourses'
import { getGroupsByTeacher } from '@/apis/teacherGroup'
import { videoToUrl } from '@/apis/videoIdToUrl'
import { useRoute } from 'vue-router'
import { getMiniLessons } from '@/apis/minilessons'
import { getClasses } from '@/apis/class'

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '老师管理', path: '/account-teacher-managament' },
  { name: '老师详情', path: '/teacher-detail-managament' },
]

const loading = ref(true)
const video = reactive<any>([])
const route = useRoute()
console.log(route.query.id)
const dialogShow = ref(false)
const paginationInfoCourse = reactive({
  currentPage: 1,
  pageSize: 20
})
const paginationInfoMiniLesson = reactive({
  currentPage: 1,
  pageSize: 20,
  teacherCourseId: ''
})
const courseData = reactive<any>([])
const totalNum2 = ref('')
const groupInfo = reactive<any>([])
const groupNum = ref<number>()
const classInfo = reactive<any>([])
const classNum = ref<number>()
const loadTeacherData = () => {
  courseData.length = 0
  loading.value = true
  var args = {
    pageNum: paginationInfoCourse.currentPage,
    pageSize: paginationInfoCourse.pageSize,
    teacherId: route.query.id
  }
  getTeacherCourse(args)
    .then((res) => {
      console.log(res)
      totalNum2.value = res.data.total
      res.data.records.forEach((course: any) => {
        var item = {
          id: course.id,
          picture: course.cover,
          title: course.name,
          time: course.createdAt
        }
        courseData.push(item)
      })
      return getGroupsByTeacher({ teacherId: route.query.id })
    })
    .then((res: any) => {
      res.data.forEach((item: any) => {
        groupInfo.push(item)
      })
      groupNum.value = res.data.length
      return getClasses({ pageNum: 1, pageSize: 1, teacherId: route.query.id })
    })
    .then((res: any) => {
      classNum.value = res.data.total
      return getClasses({ pageNum: 1, pageSize: classNum.value, teacherId: route.query.id })
    })
    .then((res: any) => {
      res.data.records.forEach((item: any) => {
        classInfo.push(item)
      })
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
      console.log(classInfo, groupInfo)
    })
}
loadTeacherData()

const totalNum = ref('')
const loadDialogData = (teacherCourseId: any) => {
  video.length = 0
  loading.value = true
  paginationInfoMiniLesson.teacherCourseId = teacherCourseId
  var args = {
    pageNum: paginationInfoMiniLesson.currentPage,
    pageSize: paginationInfoMiniLesson.pageSize,
    teacherCourseId: paginationInfoMiniLesson.teacherCourseId
  }
  getMiniLessons(args)
    .then((res: any) => {
      console.log(res)
      totalNum.value = res.data.total
      res.data.records.forEach((item: any) => {
        video.push({
          id: item.id,
          videoId: item.videoId,
          title: item.name,
          picture: item.cover,
          time: item.updatedAt,
          videoduration: item.videoDuration
        })
      })
      dialogShow.value = true
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}

const videoShow = ref(false)
const url = ref<any>('')
const playVideo = (videoId: any) => {
  var args = { videoId: videoId }
  console.log(args)
  videoToUrl(args).then((res: any) => {
    console.log(res)
    url.value = res.playURL
    videoShow.value = true
  })
}
const classData = ref<any>([])

const getClassData = () => {

  var args = {
    pageNum: paginationInfoMiniLesson.currentPage,
    pageSize: paginationInfoMiniLesson.pageSize,
    teacherId: route.query.id
  }
  getClasses(args).then((res) => {
    totalNum.value = res.data.total
    res.data.records.forEach((item: any) => {
      classData.value.push({
        name: item.name,
      })
    })
  })
    .catch()
}
getClassData()

const classCount = ref<any>([])

const getClassCount = () => {
  var args = {
    pageNum: 1,
    pageSize: 1,
    teacherId: route.query.id
  }
  getClasses(args).then((res) => {
    classCount.value = res.data.total
  })
    .catch()
}
getClassCount()

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  paginationInfoMiniLesson.pageSize = val
  loadDialogData(paginationInfoMiniLesson.teacherCourseId)
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  paginationInfoMiniLesson.currentPage = val
  loadDialogData(paginationInfoMiniLesson.teacherCourseId)
}

const handleSizeChange2 = (val: number) => {
  console.log(`${val} items per page`)
  paginationInfoCourse.pageSize = val
  loadTeacherData()
}
const handleCurrentChange2 = (val: number) => {
  console.log(`current page: ${val}`)
  paginationInfoCourse.currentPage = val
  loadTeacherData()
}

</script>

<template>
  <div class="whole">
    <div class="topPart">
      <div class="topPart1">
        <div class="topPart1-1">
          <div class="top-Part1-1-1"><el-text>老师信息</el-text></div>
        </div>
        <div class="topPart1-2">
          <div class="top-Part1-2-1">{{ route.query.name }}</div>
          <div class="top-Part1-2-2">
            <div><el-text>学习阶段:{{ route.query.gradeName }}</el-text></div>
            <div><el-text>课程类目:{{ route.query.subjectName }}</el-text></div>
            <div><el-text>备注:{{ route.query.remark }}</el-text></div>
          </div>
        </div>
        <div class="topPart1-3">
          <div class="topPart1-3-2">
            <el-text>最后登录: {{ route.query.lastLoginTime }}</el-text>
            <div style="width: 20px;"></div>
            <el-text>创建时间: {{ route.query.createdAt }}</el-text>
          </div>
        </div>
      </div>

      <el-divider direction="vertical" class="divider-height" />

      <div class="topPart1">
        <div class="topPart1-1"><el-text>E-mail:{{ route.query.email }}</el-text></div>
        <div class="topPart2-2"><el-text>电话:{{ route.query.phoneNumber }}</el-text></div>
      </div>

      <el-divider direction="vertical" class="divider-height" />
      <div class="topPart1">
        <div class="topPart1-1">
          <el-text style="width: 110px;">所在教研组数量:</el-text>
          <el-text>{{ groupNum }}</el-text>
        </div>
        <div class="topPart2-2">
          <el-text style="width: 110px;">所带班级数量:</el-text>
          <el-text>{{ classNum }}</el-text>
        </div>
      </div>
    </div>
    <el-divider class="row-divider"></el-divider>

    <div class="collapse">
      <div class="sup-node">
        <el-text class="sup-title">所在教研组</el-text>
        <div class="group-list">
          <el-text class="group-name" v-for="item in groupInfo" :key="item">{{ item.groupName }}</el-text>
        </div>
      </div>
      <div style="width: 10px;background-color: #f0f2f5;"></div>
      <div class="sup-node">
        <el-text class="sup-title">所带班级</el-text>
        <div class="group-list">
          <el-text class="group-name" v-for="item in classInfo" :key="item">{{ item.name }}</el-text>
        </div>
      </div>
    </div>

    <el-divider class="row-divider"></el-divider>

    <div class="botPart1-2">
      <div @click="loadDialogData(item.id)" v-for="item in courseData" :key="item.id">
        <DisplayVideoCard :picture="item.picture" :title="item.title" :time="item.time"></DisplayVideoCard>
      </div>
    </div>

    <el-pagination style="margin-left: 15px;margin-top: 10px;margin-bottom: 10px;"
      v-model:current-page="paginationInfoCourse.currentPage" v-model:page-size="paginationInfoCourse.pageSize"
      :page-sizes="[10, 20, 30, 100]" layout="total, sizes, prev, pager, next, jumper" :total=totalNum2
      @size-change="handleSizeChange2" @current-change="handleCurrentChange2" />

    <el-dialog v-model="dialogShow">
      <div class="botPart1-2">
        <div @click="playVideo(item.videoId)" v-for="item in video" :key="item.id">
          <DisplayVideoCard :picture="item.picture" :title="item.title" :time="item.time"
            :videoduration="item.videoduration"></DisplayVideoCard>
        </div>

      </div>
      <template #footer>
        <el-pagination v-model:current-page="paginationInfoMiniLesson.currentPage"
          v-model:page-size="paginationInfoMiniLesson.pageSize" :page-sizes="[10, 20, 30, 100]"
          layout="total, sizes, prev, pager, next, jumper" :total=totalNum @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </template>
    </el-dialog>

    <el-dialog style="height: 1000px;width: 1650px;" v-model="videoShow">
      <video v-if="videoShow" style="height: 900px;width: 1600px;" :src="url" controls autoplay></video>
    </el-dialog>

  </div>
</template>

<style scoped lang="scss">
$scale: 0.88;

.collapse {
  height: 100px;
  display: flex;
  flex-direction: row;

  .sup-node {
    width: 50%;
    flex-direction: column;

    .sup-title {
      margin-left: 15px;
      margin-right: 15px;
      margin-top: 10px;
    }

    .group-list {
      margin-left: 25px;
      margin-right: 15px;
      margin-top: 10px;

      .group-name {
        margin-right: 10px;
        margin-bottom: 10px;
      }
    }
  }
}

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
  flex-direction: row;
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
  display: flex;
  flex-direction: row;
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