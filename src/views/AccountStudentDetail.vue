<script setup lang="ts">
import { getStudentCouse } from '@/apis/studentCourse'
import DisplayQuestionCard from '@/components/DisplayQuestionCard.vue'
import QuestionDisplayCard from '@/components/QuestionDisplayCard.vue'
import { ref, reactive } from 'vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import type { TabsPaneContext } from 'element-plus'
import { useRoute } from 'vue-router'
import { getStudentQuestions } from '@/apis/studentQuestion'
import { getStudentHomework } from '@/apis/studentHomework'
import HomeworkQuestionDisplayCard from '@/components/HomeworkQuestionDisplayCard.vue'

const breadcrumbStore = useBreadcrumbStore()

const route = useRoute()
const activeName = ref('first')
const studentData = ref<any>([])
const questionPackage = reactive<any>({})
const lessons = reactive<any>([])
const homeWork = reactive<any>([])
const loading = ref(true)

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '学生管理', path: '/account-student-managament' },
  { name: '学生详情', path: '/student-detail-managament' },
]

//-------------------加载学生数据--------------
const loadData = () => {
  loading.value = true

  var args = {
    studentId: route.query.id
  }

  getStudentCouse(args)
    .then((res) => {
      res.data.forEach((item: any) => {
        lessons.push({
          title: item.miniLessonName,
          picture: '',
          tag: '好题',
          time: item.watchedTime,
          classfiction: '普通课',
          time2: item.miniLessonDuration
        })
      })

        (studentData.value = res.data[0])
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })

  getStudentQuestions(args)
    .then((res) => {
      console.log(res)
      res.data.forEach((item: any) => {
        if (item.difficultyLevel == 0) {
          item.difficultyLevel = '※'
        }

        if (item.questionPackageId in questionPackage) {
          questionPackage[item.questionPackageId].push(item)
        } else {
          questionPackage[item.questionPackageId] = [];
          // {id:[]}
          questionPackage[item.questionPackageId].push(item)
        }
      })

    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })

  getStudentHomework(args)
    .then((res) => {
      console.log(res)
      res.data.forEach((item: any) => {
        console.log(item)
        if (item.isFinished == 0) {
          homeWork.push({
            homeworkName: item.homeworkName,
            teacherName: item.teacherName,
            isFinished: '未完成'
          })
        } else {
          homeWork.push({
            homeworkName: item.homeworkName,
            teacherName: item.teacherName,
            isFinished: '已完成'
          })
        }
      })
    })
    .catch(() => { })
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

  <div class="downpart">
    <div>
      <el-tabs v-model="activeName" class="tabs-page" @tab-click="handleClick" type="card">

        <el-tab-pane label="课程" name="courses">
          <div class="botPart1-2">
            <DisplayQuestionCard class="postion" v-for="item in lessons" :key="item.title" :title="item.title"
              :picture="item.picture" :tag="item.tag" :classfiction="item.classfiction" :time="item.time"
              :time2="item.time2">
            </DisplayQuestionCard>
          </div>

        </el-tab-pane>
        <el-tab-pane label="好题演练" name="questions">
          <div class="botPart1-2">
            <QuestionDisplayCard v-for="(key, val) in questionPackage" :key="val"
              :questionName="key[0].coursesQuestionPackageName" :questionCount="(key.length - 1)"
              :questionFinished="key[0][0]" :difficultyLevel="(key[0].difficultyLevel)">
            </QuestionDisplayCard>
          </div>
        </el-tab-pane>

        <el-tab-pane label="作业巩固" name="homework">
          <div class="botPart1-2">
            <HomeworkQuestionDisplayCard v-for="item in homeWork" :key="item.title" :homeworkName="item.homeworkName"
              :teacherName="item.teacherName" :isFinished="item.isFinished">
            </HomeworkQuestionDisplayCard>
          </div>
        </el-tab-pane>

      </el-tabs>
    </div>
  </div>
</template>

<style scoped lang="scss">
$scale: 0.88;

.downpart {}

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