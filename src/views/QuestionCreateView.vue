<script setup lang="tsx">
import { ref, reactive, watch } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import { getGrades } from '@/apis/grade'
import { getSubjects } from '@/apis/subject'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import RichTextEditor from '@/components/RichTextEditor.vue'
import SolutionTextEditor from '@/components/SolutionTextEditor.vue'
import UploadVideo from '@/components/UploadVideo.vue'
import { createGoodQuestion } from '@/apis/questionStore'
import { videoToUrl } from '@/apis/videoIdToUrl'
import { getMiniLessons } from '@/apis/minilessons'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'

const allGrades = ref<any>([])
const allSubjects = ref<any>([])
const JSONoption = ref<any>([])
const JSONanswer = ref<any>([])
const centerDialogVisible = ref(false)
const searchBarItems = reactive([
  { name: "微课名称", value: "" },
])

const loadSelectOption = () => {
  getSubjects()
    .then((res) => (allSubjects.value = res.data))
    .catch()

  getGrades()
    .then((res) => (allGrades.value = res.data.map((i: any) => i.subset).flat()))
    .catch()
}

const breadcrumbStore = useBreadcrumbStore()

breadcrumbStore.data = [
  { name: '题库管理', path: '' },
  { name: '好题详情', path: '/question-detail' }
]

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

const loading = ref(false)
const lessonName = ref('')
const totalLength = ref<Number>()
const dialogTableData = ref<any>([])
const dialogVisible = ref(false)
const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})
const pageChange = (val: any) => {
  paginationInfo.currentPage = val.currentPage
  paginationInfo.pageSize = val.pageSize
  loadMinilessons()
}
const loadMinilessons = () => {
  loading.value = true
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    auditStatus: 3,
    name: searchBarItems[0].value
  }
  getMiniLessons(args)
    .then((res) => {
      dialogTableData.value = res.data.records
      totalLength.value = res.data.total
    })
    .catch()
    .finally(() => {
      loading.value = false
    })
}

const selectLessonDialog = () => {
  loadMinilessons()
  dialogVisible.value = true
}

const selectLesson = (cellData: any) => {
  console.log(cellData)
  videoToUrl({ videoId: cellData.rowData.videoId })
    .then((res: any) => {
      newQuestionData.filePath = res.playURL
      lessonName.value = cellData.rowData.name
      if (document.getElementById('uploadVideoInput')) {
        var obj = document.getElementById('uploadVideoInput') as HTMLInputElement;
        obj.value = ''
      }
      dialogVisible.value = false
    })
}

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 180
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '标题',
    cellRenderer: (cellData: any) => {
      return (
        <div>
          <el-text link type="primary" onClick={() => playVideo(cellData.rowData.videoId)}> {cellData.cellData}</el-text>
        </div>
      )
    },
    width: 200
  },
  {
    dataKey: 'teacherName',
    key: 'teacherName',
    title: '上传者',
    align: 'center',
    width: 100
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (cellData: any) => {
      return (
        <>
          <el-button link type="primary" onClick={() => selectLesson(cellData)}>
            选择
          </el-button>
        </>
      )
    },
    width: 60,
    fixed: 'right',
  }
]

const newQuestionData = reactive<{
  difficultyType: string,
  gradeId: string,
  type: string,
  id: string,
  subjectId: string,
  questionPrompt: string,
  option: string,
  answer: string,
  solution: string,
  filePath: string
}>({
  difficultyType: '',
  gradeId: '',
  type: '',
  id: '',
  subjectId: '',
  questionPrompt: '',
  option: '',
  answer: '',
  solution: '',
  filePath: ''
});

const allQuestionType = [
  {
    id: '1',
    value: '1',
    label: '单选题 ',
  },
  {
    id: '2',
    value: '2',
    label: '多选题 ',
  },
  {
    id: '3',
    value: '3',
    label: '不定项选择题',
  },
  {
    id: '4',
    value: '4',
    label: '判断题 ',
  },
  {
    id: '5',
    value: '5',
    label: '填空题',
  },
  {
    id: '6',
    value: '6',
    label: '解答题',
  },
]

const allDifficultyType = [
  {
    id: '1',
    value: '1',
    label: '容易  ',
  },
  {
    id: '2',
    value: '2',
    label: '较易 ',
  },
  {
    id: '3',
    value: '3',
    label: '一般',
  },
  {
    id: '4',
    value: '4',
    label: '较难 ',
  },
  {
    id: '5',
    value: '5',
    label: '困难',
  }
]

loadSelectOption()

const trueFlase = [
  {
    id: 1, label: '正确'
  },
  {
    id: 2, label: '错误'
  }
]

const newSMultipleChoiceQuestion = reactive<any>({
  A: '',
  B: ''
})

const questionData = ref<any>([])

const newAnswer = ref<any>([])
const fillBlankQuestionAnswer = reactive<any>({ a: '' })
const count = ref<number>(0)
const giveData = () => {
  var newSMultipleChoice = reactive<any>([])
  Object.keys(newSMultipleChoiceQuestion).forEach((key: any) => {
    newSMultipleChoice.push({
      identifier: key, value: key, description: newSMultipleChoiceQuestion[key]
    })
  })
  questionData.value = newSMultipleChoice
  console.log(questionData.value)
}

const addBlank = () => {
  if (Object.keys(fillBlankQuestionAnswer).length == 1) {
    Object.assign(fillBlankQuestionAnswer, { b: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 2) {
    Object.assign(fillBlankQuestionAnswer, { c: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 3) {
    Object.assign(fillBlankQuestionAnswer, { d: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 4) {
    Object.assign(fillBlankQuestionAnswer, { e: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 5) {
    Object.assign(fillBlankQuestionAnswer, { f: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 6) {
    Object.assign(fillBlankQuestionAnswer, { g: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 7) {
    Object.assign(fillBlankQuestionAnswer, { h: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 8) {
    Object.assign(fillBlankQuestionAnswer, { i: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 9) {
    Object.assign(fillBlankQuestionAnswer, { j: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 10) {
    Object.assign(fillBlankQuestionAnswer, { k: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 11) {
    Object.assign(fillBlankQuestionAnswer, { l: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 12) {
    Object.assign(fillBlankQuestionAnswer, { m: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 13) {
    Object.assign(fillBlankQuestionAnswer, { n: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 14) {
    Object.assign(fillBlankQuestionAnswer, { o: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 15) {
    Object.assign(fillBlankQuestionAnswer, { p: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 16) {
    Object.assign(fillBlankQuestionAnswer, { q: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 17) {
    Object.assign(fillBlankQuestionAnswer, { r: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 18) {
    Object.assign(fillBlankQuestionAnswer, { s: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 19) {
    Object.assign(fillBlankQuestionAnswer, { t: '' })
    console.log(fillBlankQuestionAnswer)
    return
  }
}

const minBlank = () => {
  if (Object.keys(fillBlankQuestionAnswer).length == 20) {
    delete fillBlankQuestionAnswer.t
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 19) {
    delete fillBlankQuestionAnswer.s
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 18) {
    delete fillBlankQuestionAnswer.r
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 17) {
    delete fillBlankQuestionAnswer.q
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 16) {
    delete fillBlankQuestionAnswer.p
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 15) {
    delete fillBlankQuestionAnswer.o
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 14) {
    delete fillBlankQuestionAnswer.n
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 13) {
    delete fillBlankQuestionAnswer.m
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 12) {
    delete fillBlankQuestionAnswer.l
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 11) {
    delete fillBlankQuestionAnswer.k
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 10) {
    delete fillBlankQuestionAnswer.j
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 9) {
    delete fillBlankQuestionAnswer.i
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 8) {
    delete fillBlankQuestionAnswer.h
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 7) {
    delete fillBlankQuestionAnswer.g
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 6) {
    delete fillBlankQuestionAnswer.f
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 5) {
    delete fillBlankQuestionAnswer.e
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 4) {
    delete fillBlankQuestionAnswer.d
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 3) {
    delete fillBlankQuestionAnswer.c
    console.log(fillBlankQuestionAnswer)
    return
  }
  if (Object.keys(fillBlankQuestionAnswer).length == 2) {
    delete fillBlankQuestionAnswer.b
    console.log(fillBlankQuestionAnswer)
    return
  }
}


const addOption = () => {
  if (Object.keys(newSMultipleChoiceQuestion).length == 2) {
    Object.assign(newSMultipleChoiceQuestion, { C: '' })
    console.log(newSMultipleChoiceQuestion)
    return
  }
  if (Object.keys(newSMultipleChoiceQuestion).length == 3) {
    Object.assign(newSMultipleChoiceQuestion, { D: '' })
    console.log(newSMultipleChoiceQuestion)
    return
  }
  if (Object.keys(newSMultipleChoiceQuestion).length == 4) {
    Object.assign(newSMultipleChoiceQuestion, { E: '' })
    console.log(newSMultipleChoiceQuestion)
    return
  }
  if (Object.keys(newSMultipleChoiceQuestion).length == 5) {
    Object.assign(newSMultipleChoiceQuestion, { F: '' })
    console.log(newSMultipleChoiceQuestion)
    return
  }
  if (Object.keys(newSMultipleChoiceQuestion).length == 6) {
    Object.assign(newSMultipleChoiceQuestion, { G: '' })
    console.log(newSMultipleChoiceQuestion)
    return
  }
  if (Object.keys(newSMultipleChoiceQuestion).length == 7) {
    Object.assign(newSMultipleChoiceQuestion, { H: '' })
    console.log(newSMultipleChoiceQuestion)
    return
  }
}

const minOption = () => {
  if (Object.keys(newSMultipleChoiceQuestion).length == 3) {
    delete newSMultipleChoiceQuestion.C
    console.log(newSMultipleChoiceQuestion)
    return
  }
  if (Object.keys(newSMultipleChoiceQuestion).length == 4) {
    delete newSMultipleChoiceQuestion.D
    console.log(newSMultipleChoiceQuestion)
    return
  }
  if (Object.keys(newSMultipleChoiceQuestion).length == 5) {
    delete newSMultipleChoiceQuestion.E
    console.log(newSMultipleChoiceQuestion)
    return
  }
  if (Object.keys(newSMultipleChoiceQuestion).length == 6) {
    delete newSMultipleChoiceQuestion.F
    console.log(newSMultipleChoiceQuestion)
    return
  }
  if (Object.keys(newSMultipleChoiceQuestion).length == 7) {
    delete newSMultipleChoiceQuestion.G
    console.log(newSMultipleChoiceQuestion)
    return
  }
  if (Object.keys(newSMultipleChoiceQuestion).length == 8) {
    delete newSMultipleChoiceQuestion.H
    console.log(newSMultipleChoiceQuestion)
    return
  }
}

watch(() => newSMultipleChoiceQuestion, (val: any) => {
  giveData()
  count.value = 0
  questionData.value.forEach((item: any) => {
    if (item.value != '')
      count.value = count.value + 1
  })
  console.log('count', count.value)
  console.log('newSMultipleChoiceQuestion', val)
  console.log('questionData', questionData.value)
},
  { deep: true, immediate: true }
)

watch(() => fillBlankQuestionAnswer, (val: any) => {
  newAnswer.value.length = 0
  Object.keys(fillBlankQuestionAnswer).forEach((item: any) => {
    newAnswer.value.push(fillBlankQuestionAnswer[item])
  })
  console.log('fillBlankQuestionAnswer', val)
},
  { deep: true, immediate: true }
)

const confirmCreate = () => {
  var args: any = {
    questionPrompt: newQuestionData.questionPrompt,
    gradeId: newQuestionData.gradeId,
    difficultyType: newQuestionData.difficultyType,
    subjectId: newQuestionData.subjectId,
    type: newQuestionData.type,
    options: JSONoption.value,
    answer: JSONanswer.value,
    solution: newQuestionData.solution,
    filePath: newQuestionData.filePath
  }
  console.log('args', args)
  if (args.solution == '<p><br></p>') {
    delete args.solution
  }
  createGoodQuestion(args)
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '成功',
          message: '题目新建成功',
          type: 'success'
        })
        // newQuestionData.difficultyType = ''
        // newQuestionData.gradeId = ''
        // newQuestionData.type = ''
        // newQuestionData.id = ''
        // newQuestionData.subjectId = ''
        // newQuestionData.questionPrompt = ''
        // newQuestionData.option = ''
        // newQuestionData.answer = ''
        // newAnswer.value = []
        // location.reload()
        centerDialogVisible.value = false
      } else {
        ElNotification({
          title: '新建失败',
          message: res.msg,
          type: 'error'
        })
        centerDialogVisible.value = false
      }
    }).catch()
}

const create = () => {
  centerDialogVisible.value = true
}

const dataTransform = () => {
  var args = {
    answers: [newAnswer.value.identifier],
    correct: null
  }
  JSONoption.value = JSON.stringify(questionData.value)
  JSONanswer.value = JSON.stringify(args)
  console.log(JSONoption)
  console.log(JSONanswer)
}

const changeQuestionPrompt = (valueHtml: any) => {
  console.log('valueHtml', valueHtml)
  newQuestionData.questionPrompt = valueHtml
}

const changeSolution = (solutionHtml: any) => {
  console.log('solutionHtml', solutionHtml)
  newQuestionData.solution = solutionHtml
}

const getVideoPath = (path: any) => {
  lessonName.value = ''
  console.log('讲解视频', path)
  newQuestionData.filePath = path
}

const dataTransformMu = () => {
  var args = {
    answers: newAnswer.value.map((item: any) => item.identifier),
    correct: null
  }
  JSONoption.value = JSON.stringify(questionData.value)
  JSONanswer.value = JSON.stringify(args)
  console.log(JSONoption)
  console.log(JSONanswer)
}

const dataTransformMBo = () => {
  var args = {
    answers: newAnswer.value,
    correct: null
  }
  JSONoption.value = JSON.stringify(questionData.value)
  JSONanswer.value = JSON.stringify(args)
  console.log(JSONoption)
  console.log(JSONanswer)
}

const dataTransformBlank = () => {
  Object.keys(fillBlankQuestionAnswer).forEach((item: any) => {
    newAnswer.value.push(fillBlankQuestionAnswer[item])
  })
  var args = {
    answers: newAnswer.value,
    correct: null
  }
  JSONoption.value = JSON.stringify(questionData.value)
  JSONanswer.value = JSON.stringify(args)
  console.log(JSONoption)
  console.log(JSONanswer)
}

const dataTransformCorrect = () => {
  var args = {
    answers: null,
    correct: newAnswer.value == '正确' ? true : false
  }
  JSONoption.value = JSON.stringify(questionData.value)
  JSONanswer.value = JSON.stringify(args)
  console.log(JSONoption)
  console.log(JSONanswer)
}

watch(() => newAnswer, (val: any) => {
  console.log('newAnswer', val)
  if (newQuestionData.type == '1') {
    dataTransform()
    console.log(JSONoption)
    console.log(JSONanswer)
  } else if (newQuestionData.type == '2' || newQuestionData.type == '3') {
    dataTransformMu()
    console.log(JSONoption)
    console.log(JSONanswer)
  } else if (newQuestionData.type == '5' || newQuestionData.type == '6') {
    dataTransformMBo()
    console.log(JSONoption)
    console.log(JSONanswer)
  } else if (newQuestionData.type == '4') {
    dataTransformCorrect()
    console.log(JSONoption)
    console.log(JSONanswer)
  }
},
  { deep: true, immediate: true }
)
</script>

<template>
  <div class="margin">
    <div style="height: 20px;"></div>
    <div class="subandgrade">
      <div>
        <el-text style="margin-left: 15px;">科目:</el-text>
        <el-select style="margin-left:5px" class="select-width" filterable place holder="请选择科目"
          v-model="newQuestionData.subjectId">
          <el-option v-for="item in allSubjects" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
      <div class="margin-left">
        <el-text style="margin-left: 5px;">学习阶段:</el-text>
        <el-select style="margin-left:5px" class="select-width" filterable place holder="请选择学习阶段"
          v-model="newQuestionData.gradeId">
          <el-option if v-for="item in allGrades" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
    </div>
    <div class="subandgrade" style="margin-top: 10px;">
      <div>
        <el-text style="margin-left: 15px;">难度:</el-text>
        <el-select style="margin-left:5px" class="select-width" filterable place holder="请选择科目"
          v-model="newQuestionData.difficultyType">
          <el-option v-for="item in allDifficultyType" :key="item.id" :label="item.label" :value="item.id" />
        </el-select>
      </div>
    </div>
    <div class="subandgrade">
      <div style="margin-left: 15px; margin-top: 10px;">
        <el-text>题型:</el-text>
        <el-select style="margin-left:5px" filterable place holder="请选择题型" v-model="newQuestionData.type">
          <el-option if v-for="item in allQuestionType" :key="item.id" :label="item.label" :value="item.id" />
        </el-select>
      </div>
    </div>
    <el-divider content-position="left">编辑题干</el-divider>

    <div style="padding-top: 0px;">
      <RichTextEditor :key="1" :questionPrompt="newQuestionData.questionPrompt" :isShow="true"
        @change="changeQuestionPrompt" v-model="newQuestionData.questionPrompt">
      </RichTextEditor>
    </div>
    <el-divider content-position="left" v-if="newQuestionData.type == '1'
      || newQuestionData.type == '2'
      || newQuestionData.type == '3'
      || newQuestionData.type == '4'
      || newQuestionData.type == '5'
      || newQuestionData.type == '6'">
      编辑答案
    </el-divider>

    <div style="width: 300px;" v-if="newQuestionData.type == '1'">
      <el-text>请输入单选题目选项</el-text>
      <diV>
        <div v-for="(description, option) in newSMultipleChoiceQuestion" :key="option"
          style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span style="margin-right: 5px;">{{ option
          }}</span><el-input style="height: 27px;" v-model="newSMultipleChoiceQuestion[option]"></el-input>
        </div>
        <div style="display: flex;margin-top: 10px;margin-bottom: 25px;margin-left: 15px;">
          <el-button @click="addOption">增加选项</el-button>
          <el-button @click="minOption">减少选项</el-button>
        </div>
      </diV>
      <div v-if="count >= 2">
        <div style="display: flex; margin-top: 10px;">
          <div style="margin-right: 5px;margin-top: 2px;">答案：</div>
          <el-select style="height: 27px;width: 246px;" placeholder="正确选项" v-model="newAnswer">
            <el-option v-for="item in questionData" :key="item.identifier" :label="item.identifier" :value="item" />
          </el-select>
        </div>
      </div>
    </div>

    <div style="width: 300px;" v-if="newQuestionData.type == '2'">
      <el-text>请输入多选题目选项</el-text>
      <diV>
        <div v-for="(description, option) in newSMultipleChoiceQuestion" :key="option"
          style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span style="margin-right: 5px;">{{ option
          }}</span><el-input style="height: 27px;" v-model="newSMultipleChoiceQuestion[option]"></el-input>
        </div>
        <!-- <div style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span
                                                      style="margin-right: 5px;">B:</span><el-input style="height: 27px;"
                                                      v-model="newSMultipleChoiceQuestion.B"></el-input></div>
                                              <div style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span
                                                      style="margin-right: 5px;">C:</span><el-input style="height: 27px;"
                                                      v-model="newSMultipleChoiceQuestion.C"></el-input></div>
                                              <div style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span
                                                      style="margin-right: 5px;">D:</span><el-input style="height: 27px;"
                                                      v-model="newSMultipleChoiceQuestion.D"></el-input></div> -->
        <div style="display: flex;margin-top: 10px;margin-bottom: 25px;margin-left: 15px;">
          <el-button @click="addOption">增加选项</el-button>
          <el-button @click="minOption">减少选项</el-button>
        </div>
      </diV>
      <div v-if="count >= 2">
        <div style="display: flex; margin-top: 10px;">
          <div style="margin-right: 5px;margin-top: 2px;">答案：</div>
          <el-select multiple style="height: 27px;width: 246px;" placeholder="正确选项" v-model="newAnswer">
            <el-option v-for="item in questionData" :key="item.identifier" :label="item.identifier" :value="item" />
          </el-select>
        </div>
      </div>
    </div>

    <div style="width: 300px;" v-if="newQuestionData.type == '3'">
      <el-text>请输入不定项选择选项</el-text>
      <diV>
        <div v-for="(description, option) in newSMultipleChoiceQuestion" :key="option"
          style="display: flex;margin-top: 10px;margin-bottom: 5px;"><span style="margin-right: 5px;">{{ option
          }}</span><el-input style="height: 27px;" v-model="newSMultipleChoiceQuestion[option]"></el-input>
        </div>
        <div style="display: flex;margin-top: 10px;margin-bottom: 25px;margin-left: 15px;">
          <el-button @click="addOption">增加选项</el-button>
          <el-button @click="minOption">减少选项</el-button>
        </div>
      </diV>
      <div v-if="count >= 2">
        <div style="display: flex; margin-top: 10px;">
          <div style="margin-right: 5px;margin-top: 2px;">答案：</div>
          <el-select multiple style="height: 27px;width: 246px;" placeholder="正确选项" v-model="newAnswer">
            <el-option v-for="item in questionData" :key="item.identifier" :label="item.identifier" :value="item" />
          </el-select>
        </div>
      </div>
    </div>

    <div style="width: 300px;" v-if="newQuestionData.type == '4'">
      <el-text>请输入判断题答案</el-text>
      <div style="margin-top: 20px;margin-bottom:10px">答案：</div>
      <el-select placeholder="正确选项" v-model="newAnswer">
        <el-option v-for="item in trueFlase" :key="item" :label="item.label" :value="item.label" />
      </el-select>
    </div>

    <div style="width: 300px;" v-if="newQuestionData.type == '5'">
      <diV>
        <div style="margin-bottom:10px">答案：</div>
        <!-- <el-input placeholder="请输入答案" v-model="newAnswer">
        </el-input> -->
        <div style="margin-top: 10px" v-for="(val, option) in fillBlankQuestionAnswer" :key="option">
          <el-input style="height: 27px;" v-model="fillBlankQuestionAnswer[option]"></el-input>
        </div>
        <div style="display: flex;margin-top: 10px;margin-bottom: 25px;margin-left: 15px;">
          <el-button @click="addBlank">增加</el-button>
          <el-button @click="minBlank">减少</el-button>
        </div>
      </diV>
    </div>

    <div style="width: 300px;" v-if="newQuestionData.type == '6'">
      <div style="margin-top: 20px;margin-bottom:10px">答案：</div>
      <el-input placeholder="请输入答案" v-model="newAnswer">
      </el-input>
    </div>

    <el-divider content-position="left">图文讲解</el-divider>

    <div style="padding-top: 0px;">
      <SolutionTextEditor :key="2" :questionSolution="newQuestionData.solution" :isShow="true" @change="changeSolution"
        v-model="newQuestionData.solution">
      </SolutionTextEditor>
    </div>

    <el-divider content-position="left">视频讲解</el-divider>

    <div style="padding-top: 0px;display: flex;">
      <el-button type="primary" link @click="selectLessonDialog">选择微课讲解</el-button>
      <span style="margin-left: 10px;margin-right: 10px;">或</span>
      <UploadVideo @change="getVideoPath"></UploadVideo>
    </div>
    <div style="padding-top: 0px;display: flex;">
      <el-text style="margin-top: 10px;">{{ lessonName }}</el-text>
    </div>

    <el-button type="primary" style="margin:20px" @click="create">
      创建
    </el-button>
  </div>

  <el-dialog style="height: 1000px;width: 1650px;" v-model="videoShow">
    <video v-if="videoShow" style="height: 900px;width: 1600px;" :src="url" controls autoplay></video>
  </el-dialog>

  <el-dialog style="height: 700px; width: 750px;" v-model="dialogVisible">
    <TablePage style="height: 650px;" :itemsTotalLength="totalLength" :loading="loading" :columns="tableColumns"
      @paginationChange="pageChange" :data="dialogTableData">
      <div style="margin-top: 0px;margin-bottom: 10px;">
        <SearchBar :items="searchBarItems" @change="loadMinilessons()"></SearchBar>
      </div>
    </TablePage>
  </el-dialog>

  <el-dialog v-model="centerDialogVisible" title="待确认" width="30%" align-center>
    <span>是否确认新建好题</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmCreate">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped>
.margin {
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px
}

.margin-left {
  margin-left: 25px
}


.subandgrade {
  display: flex;
  flex-direction: row
}

.select-width {
  width: 100px
}
</style>