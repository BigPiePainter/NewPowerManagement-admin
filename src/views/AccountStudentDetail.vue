<script setup lang="ts">
import CourseCard from '@/components/CourseCard.vue'
import { ref, reactive } from 'vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import type { TabsPaneContext } from 'element-plus'
import { useRoute } from 'vue-router'
import { getStudentHomework } from '@/apis/studentHomework'
import { getStudentPackages } from '@/apis/studentCourseQuestionPackages'
import HomeworkQuestionDisplayCard from '@/components/HomeworkQuestionDisplayCard.vue'

const breadcrumbStore = useBreadcrumbStore()

const route = useRoute()
const activeName = ref('courses')
const loading = ref(true)
const coursePackages = reactive<any>([])
const questionPackages = reactive<any>([])
const homework = reactive<any>([])

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '学生管理', path: '/account-student-managament' },
  { name: '学生详情', path: '/student-detail-managament' },
]

const clickHomework = (item: any) => {
  console.log('Homework', item)
}

//-------------------加载学生数据--------------
const loadData = () => {
  coursePackages.length = 0
  questionPackages.length = 0
  homework.length = 0
  loading.value = true
  var courseArgs = {
    studentId: route.query.id,
    type: 1
  }
  var questionArgs = {
    studentId: route.query.id,
    type: 2
  }
  var homeworkArgs = {
    studentId: route.query.id
  }
  getStudentPackages(courseArgs)
    .then((res) => {
      res.data.forEach((item: any) => {
        coursePackages.push(item)
      })
      return getStudentPackages(questionArgs)
    })
    .then((res) => {
      res.data.forEach((item: any) => {
        questionPackages.push(item)
      })
      return getStudentHomework(homeworkArgs)
    })
    .then((res) => {
      res.data.forEach((item: any) => {
        homework.push(item)
      })
    })
    .catch()
    .finally(() => {
      loading.value = false
    })
}
loadData()
</script>

<template>
  <div class="whole">
    <div class="topPart">
      <div class="topPart1">
        <div class="topPart1-1">
          <div class="top-Part1-1-1"><el-text>学生信息</el-text></div>
        </div>
        <div class="topPart1-2">
          <div class="top-Part1-2-1">{{ route.query.name }}</div>
          <div class="top-Part1-2-2">
            <div><el-text>学生id:{{ route.query.id }}</el-text></div>
            <div><el-text>学习阶段:{{ route.query.gradeName }}</el-text></div>
            <div><el-text>电话:{{ route.query.phoneNumber }}</el-text></div>
          </div>
        </div>

        <div class="topPart1-3">
          <div><el-text>账号：{{ route.query.account }}</el-text></div>
          <div class="topPart1-3-2"><el-text>到期时间:{{ route.query.expiration }}</el-text></div>
        </div>
      </div>

      <el-divider direction="vertical" class="divider-height" />

      <div class="topPart1--1">
        <div class="topPart1-1"><el-text>家长电话:{{ route.query.phoneNumberOfParent }}</el-text></div>
        <div class="topPart2-2"><el-text>创建时间：{{ route.query.createdAt }}</el-text></div>
      </div>
      <el-divider direction="vertical" class="divider-height" />
      <div>
      </div>
    </div>
  </div>

  <el-divider class="row-divider"></el-divider>

  <div>
    <div>
      <el-tabs v-model="activeName" class="tabs-page" @tab-click="handleClick" type="card">

        <el-tab-pane :label="'课程(' + coursePackages.length + ')'" name="courses">
          <div class="botPart1-2">
            <CourseCard v-for=" item  in  coursePackages " :key="item.coursesQuestionPackageId"
              :picture="item.packageCover" :title="item.packageName" :difficultyLevel="item.packageDifficultyLevel"
              :valid="item.valid" :grade="item.gradeName" :subject="item.subjectName" :label="item.labelName"
              :orderId="item.orderId" :studentId="item.studentId" :type="item.type" :packageId="item.coursesQuestionPackageId" @reload="loadData()">
            </CourseCard>
          </div>

        </el-tab-pane>
        <el-tab-pane :label="'好题演练(' + questionPackages.length + ')'" name="questions">
          <div class="botPart1-2">
            <CourseCard v-for=" item  in  questionPackages " :key="item.coursesQuestionPackageId"
              :picture="item.packageCover" :title="item.packageName" :difficultyLevel="item.packageDifficultyLevel"
              :valid="item.valid" :grade="item.gradeName" :subject="item.subjectName" :label="item.labelName"
              :orderId="item.orderId" :studentId="item.studentId" :type="item.type" :packageId="item.coursesQuestionPackageId"  @reload="loadData()">
            </CourseCard>
          </div>
        </el-tab-pane>

        <el-tab-pane :label="'作业巩固(' + homework.length + ')'" name="homework">
          <div class="botPart1-2">
            <HomeworkQuestionDisplayCard v-for=" item  in  homework " :key="item.title" :homeworkName="item.homeworkName"
              :teacherName="item.teacherName" :isFinished="item.isFinished" :subjectName="item.subjectName"
              @click="clickHomework(item)">
            </HomeworkQuestionDisplayCard>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
$scale: 0.88;

.course-card {
  display: flex;
  flex-direction: column;
  align-items: center;
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
  width: 33.333%;
}

.topPart1--1 {
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

.playbar {
  position: absolute;
  height: 4px;
  width: 80%;
  left: 0px;
  top: 0px;
  background-color: rgb(213, 10, 10);
}

.postion {
  position: relative;
}
</style>