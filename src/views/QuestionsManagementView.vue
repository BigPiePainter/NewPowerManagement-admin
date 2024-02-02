<script setup lang="tsx">

import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import { useRouter } from 'vue-router'
import { getGrades } from '@/apis/grade'
import { ElNotification } from 'element-plus'
import { getSubjects } from '@/apis/subject'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getGoodQuestion, deleteGoodQuestion, editGoodQuestion } from '@/apis/questionStore'
import RichTextEditor from '@/components/RichTextEditor.vue'
import OptionText from '@/components/OptionText.vue'
import UploadVideo from '@/components/UploadVideo.vue'
import { getMiniLessons } from '@/apis/minilessons'
import { videoToUrl } from '@/apis/videoIdToUrl'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
const router = useRouter()
// const createQuestionDailogShow = ref(false)

const questionCreate = () => { router.push({ path: 'question-create' }) }

const editQuestion = (props: any) => {
  console.log('编辑', props)
  router.push({
    path: 'question-edit',
    query: {
      id: props.id,
      questionPrompt: props.questionPrompt,
      options: props.options,
      answer: props.answer,
      type: props.type,
      gradeId: props.gradeId,
      subjectId: props.subjectId,
      difficultyType: props.difficultyType
    }
  })
}

const author = JSON.parse(localStorage.author)
const allGrades = ref<any>([])
const allSubjects = ref<any>([])
const totalNum = ref('')
const centerDialogVisible = ref(false)
const aim = ref<any>([])
const videoShow = ref(false)
const solutionShow = ref(false)
const editSolutionShow = ref(false)
const solutionPrompt = ref('')
const videoFilePath = ref('')
const questionId = ref('')
const dialogVisible = ref(false)
const dialogTableData = ref<any>([])
const searchBarItems = reactive([
  { name: "微课名称", value: "" },
])
const totalLength = ref<Number>()
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
          <el-text link type="primary" onClick={() => playVideo2(cellData.rowData.videoId)}> {cellData.cellData}</el-text>
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

const url = ref<any>('')
const playVideo2 = (videoId: any) => {
  var args = { videoId: videoId }
  console.log(args)
  videoToUrl(args).then((res: any) => {
    console.log(res)
    url.value = res.playURL
    videoShow.value = true
  })
}
//questionId.value = id
const selectLesson = (cellData: any) => {
  videoToUrl({ videoId: cellData.rowData.videoId })
    .then((res: any) => {
      getVideoPath(res.playURL)
      dialogVisible.value = false
    })
}
const PredeleteQuestion = (id: any) => {
  centerDialogVisible.value = true
  aim.value = id
  console.log(aim)
}

const deleteQuestion = () => {
  deleteGoodQuestion({ id: aim.value })
    .then((res: any) => {
      console.log(aim.value)
      if (res.code != 20000) {
        ElNotification({
          title: '删除失败',
          message: res.msg,
          type: 'error'
        })
      } else {
        ElNotification({
          title: '成功',
          message: '删除成功',
          type: 'success'
        })
        loadData()
      }
    })
    .catch((err) => {
      ElNotification({
        title: '未知错误',
        message: err.msg,
        type: 'error'
      })
    })
}

const loadSubjectsOption = () => {
  getSubjects()
    .then((res) => (allSubjects.value = res.data))
    .catch()
}

const loadGradesOption = () => {
  getGrades()
    .then((res) => (allGrades.value = res.data.map((i: any) => i.subset).flat()))
    .catch()
}

const breadcrumbStore = useBreadcrumbStore()

breadcrumbStore.data = [
  { name: '题库管理', path: '' },
  { name: '好题详情', path: '/question-bank' }
]
const tableData = reactive<any>([])
const loading = ref(true)
const loading2 = ref(true)

const searchQuestionData = reactive<any>({
  difficultyType: '',
  gradeId: '',
  type: '',
  id: '',
  subjectId: '',
  questionPrompt: ''
});

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})

const loadData = () => {
  tableData.length = 0
  loading.value = true

  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    gradeId: searchQuestionData.gradeId,
    difficultyType: searchQuestionData.difficultyType,
    subjectId: searchQuestionData.subjectId,
    type: searchQuestionData.type,
    questionPrompt: searchQuestionData.questionPrompt
  }

  getGoodQuestion(args)
    .then((res) => {
      console.log(args)
      console.log(res)
      totalNum.value = res.data.total
      res.data.records.forEach((item: any) => {
        tableData.push(item)
      });
      console.log(tableData)
    })
    .catch()
    .finally(() => {
      loading.value = false
    })
  tableData.forEach((item: any) => {
    console.log(item)
  })
}
loadData()

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`)
  paginationInfo.pageSize = val
  loadData()
}
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`)
  paginationInfo.currentPage = val
  loadData()
}

const playVideo = (filePath: any, id: any) => {
  questionId.value = id
  videoFilePath.value = filePath
  videoShow.value = true
}
const dialogPaginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})
const pageChange = (val: any) => {
  dialogPaginationInfo.currentPage = val.currentPage
  dialogPaginationInfo.pageSize = val.pageSize
  loadMinilessons()
}
const loadMinilessons = () => {
  loading2.value = true
  var args = {
    pageNum: dialogPaginationInfo.currentPage,
    pageSize: dialogPaginationInfo.pageSize,
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
      loading2.value = false
    })
}

const uploadVideoDialogShow = ref(false)
const uploadVideoClick = (id: any) => {
  questionId.value = id
  console.log('questionId', id)
  uploadVideoDialogShow.value = true
}

const selectLessonDialog = () => {
  loadMinilessons()
  dialogVisible.value = true
}

const uploadVideoClick2 = () => {
  var target = document.getElementById("uploadVideoInput")
  target?.click()
}

const getVideoPath = (filePath: any) => {
  console.log('filePath', filePath)
  var args = {
    id: questionId.value,
    filePath: filePath
  }
  console.log('args', args)
  editGoodQuestion(args)
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '视频上传成功',
          type: 'success'
        })
        loadData()
      } else {
        ElNotification({
          title: '视频上传失败',
          message: res.msg,
          type: 'error'
        })
      }
      videoShow.value = false
      uploadVideoDialogShow.value = false
    })
    .catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'error'
      })
    })
}

const playSolution = (prompt: any, id: any) => {
  console.log('solution', prompt)
  questionId.value = id
  solutionPrompt.value = prompt
  solutionShow.value = true
  // editSolutionShow.value = false
}

const editSolution = () => {
  solutionShow.value = false
  editSolutionShow.value = true
}

const confirmEditSolution = () => {
  var args = {
    id: questionId.value,
    solution: solutionPrompt.value
  }
  console.log('args', args)
  editGoodQuestion(args)
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '图文上传成功',
          type: 'success'
        })
        loadData()
      } else {
        ElNotification({
          title: '图文上传失败',
          message: res.msg,
          type: 'error'
        })
      }
      editSolutionShow.value = false
    })
    .catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'error'
      })
      editSolutionShow.value = false
    })
}

const uploadSolution = (id: any) => {
  solutionPrompt.value = ''
  questionId.value = id
  editSolutionShow.value = true
}

const cancelEditSolution = () => {
  editSolutionShow.value = false
}

const changeSolutionPrompt = (valueHtml: any) => {
  solutionPrompt.value = valueHtml
  console.log('solutionPrompt', solutionPrompt.value)
}

//-------------------------------------------------------

const radio1 = ref('')
const radio2 = ref('')

const diffcultySearch = (val: any) => {
  searchQuestionData.difficultyType = val
  console.log(val)
  loadData()
}

const typeSearch = (val: any) => {
  searchQuestionData.type = val
  console.log(val)
  loadData()
}
</script>

<template>
  <div class="margin">
    <div class="subandgrade">
      <div>
        <el-text style="margin-left: 15px;">科目:</el-text>
        <el-select @click="loadSubjectsOption" style="margin-left:5px" class="select-width" filterable place
          holder="请选择科目" v-model="searchQuestionData.subjectId" @change="loadData">
          <el-option v-for="item in allSubjects" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>

      <div class="margin-left">
        <el-text style="margin-left: 10px;">学习阶段:</el-text>
        <el-select @click="loadGradesOption" style="margin-left:5px" class="select-width" filterable place
          holder="请选择学习阶段" v-model="searchQuestionData.gradeId" @change="loadData">
          <el-option if v-for="item in allGrades" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>

      <div class="margin-left">
        <el-text style="margin-left: 10px;">相关内容:</el-text>
        <el-input style="margin-left:5px" class="select-width" @change="loadData"
          v-model="searchQuestionData.questionPrompt"></el-input>
      </div>
    </div>

    <div class="margin">
      <el-button :disabled="!author.questionsEdit" type="primary" @click="questionCreate()">
        新建好题
      </el-button>
    </div>

    <div class="margin">
      <el-text>难度:</el-text>
      <el-radio-group v-model="radio1" @change="diffcultySearch" style="margin-left: 15px;">
        <el-radio label="">全部</el-radio>
        <el-radio label="1">容易</el-radio>
        <el-radio label="2">较易</el-radio>
        <el-radio label="3">一般</el-radio>
        <el-radio label="4">较难</el-radio>
        <el-radio label="5">困难</el-radio>
      </el-radio-group>
    </div>

    <div class="margin">
      <el-text>题型:</el-text>

      <el-radio-group v-model="radio2" @change="typeSearch" style="margin-left: 15px;">
        <el-radio label="">全部</el-radio>
        <el-radio label="1">单选题</el-radio>
        <el-radio label="2">多选题</el-radio>
        <el-radio label="3">不定项选择题</el-radio>
        <el-radio label="4">判断题</el-radio>
        <el-radio label="5">填空题</el-radio>
        <el-radio label="6">解答题</el-radio>
      </el-radio-group>
    </div>

    <el-scrollbar class="scrollBarHeight">
      <el-card v-for="item in tableData" :key="item.id" style="margin-bottom: 10px">
        <div style="display: flex;">
          <span style="margin-left: 5px;">
            {{ item.difficultyType == 1 ? "容易"
              : item.difficultyType == 2 ? "较易"
                : item.difficultyType == 3 ? "一般"
                  : item.difficultyType == 4 ? "较难"
                    : "困难" }}
          </span>
          <el-divider direction="vertical" />
          <span style="margin-left: 5px;">
            {{ item.type == 1 ? "单选题"
              : item.type == 2 ? "多选题"
                : item.type == 3 ? "不定项选择题"
                  : item.type == 4 ? "判断题"
                    : item.type == 5 ? "填空题"
                      : "解答题" }}
          </span>
          <div style="flex-grow: 1"></div>

          <UploadVideo style="filter:alpha(opacity=0);opacity:0;width: 0;height: 0;pointer-events:none;"
            @change="getVideoPath" />

          <el-button style="width: 95px;" v-if="item.filePath" @click="playVideo(item.filePath, item.id)" type='primary'>
            观看讲解视频
          </el-button>

          <el-button style="width: 95px;" v-if="!item.filePath" :disabled="!author.questionsEdit"
            @click="uploadVideoClick(item.id)" type='primary'>
            上传讲解视频
          </el-button>

          <el-button style="width: 95px;" v-if="item.solution" @click="playSolution(item.solution, item.id)"
            type='primary'>
            查看图文讲解
          </el-button>

          <el-button style="width: 95px;" v-if="!item.solution" :disabled="!author.questionsEdit"
            @click="uploadSolution(item.id)" type='primary'>
            上传图文讲解
          </el-button>

          <el-button :disabled="!author.questionsEdit" @click="editQuestion(item)" type='primary'>
            编辑
          </el-button>

          <el-button :disabled="!author.questionsEdit" @click="PredeleteQuestion(item.id)" type=danger>
            删除
          </el-button>
        </div>

        <RichTextEditor :questionPrompt="item.questionPrompt" :isShow="false" :id="item.id">
        </RichTextEditor>

        <div v-if="item.type == 1 || item.type == 2 || item.type == 3" style="display:flex; flex-direction:row">
          <div style="margin-left:10px;margin-top: 10px;" v-for="items in JSON.parse(item.options)" :key="items.options">
            {{ items.identifier }}: 
            <OptionText :key="2" :questionPrompt="items.description" :isShow="false"></OptionText>
          </div>
        </div>

        <div v-if="item.type == 1 || item.type == 2 || item.type == 3 || item.type == 4" style="display:flex; flex-direction:row; margin-bottom: 10px;margin-top: 10px;">
          <div style="margin-left:10px">
            答案：{{ JSON.parse(item.answer).answers ? JSON.parse(item.answer).answers
              : JSON.parse(item.answer).correct == true ? '正确' : '错误' }}
          </div>
        </div>

        <div v-else-if="item.type == 5" style="display:flex; flex-direction:row; margin-bottom: 10px;margin-top: 10px;">
          答案：<div style="margin-left:10px" v-for="items in JSON.parse(item.answer).answers" :key="items.answer">
            <OptionText :key="2" :questionPrompt="items" :isShow="false"></OptionText>
          </div>
        </div>

        <div v-else-if="item.type == 6" style="display:flex; flex-direction:row; margin-bottom: 10px;margin-top: 10px;">
          答案：<div style="margin-left:10px">
            <OptionText :key="2" :questionPrompt="JSON.parse(item.answer).answers" :isShow="false"></OptionText>
          </div>
        </div>
      </el-card>
      <el-pagination style="margin-left: 15px;margin-top: 10px;margin-bottom: 10px;"
        v-model:current-page="paginationInfo.currentPage" v-model:page-size="paginationInfo.pageSize"
        :page-sizes="[10, 20, 30, 100]" layout="total, sizes, prev, pager, next, jumper" :total=totalNum
        @size-change="handleSizeChange" @current-change="handleCurrentChange" />
    </el-scrollbar>
  </div>

  <el-dialog v-model="centerDialogVisible" title="Warning" width="30%" center>
    <span style="display: flex;  justify-content: center;">
      是否确认删除题目
    </span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="deleteQuestion(), centerDialogVisible = false">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog style="height: 1000px;width: 1650px;" v-model="videoShow">
    <video v-if="videoShow" style="height: 900px;width: 1600px;" :src="videoFilePath" controls autoplay></video>
    <el-button type="primary" link @click="selectLessonDialog">重新选择微课讲解</el-button>
    <span style="margin-left: 10px;margin-right: 10px;">或</span>
    <el-button type="primary" link @click='uploadVideoClick2'>本地重新上传</el-button>
  </el-dialog>

  <el-dialog style="height: 300px;width: 1000px" v-model="solutionShow">
    <el-button type="primary" @click='editSolution'>编辑</el-button>
    <RichTextEditor :questionPrompt="solutionPrompt" v-model="solutionPrompt" :isShow="false">
    </RichTextEditor>
  </el-dialog>

  <el-dialog style="height: 350px;width: 1000px" v-model="editSolutionShow">
    <el-button type="primary" @click='confirmEditSolution'>确认</el-button>
    <el-button type="danger" @click='cancelEditSolution'>取消</el-button>
    <RichTextEditor :questionPrompt="solutionPrompt" v-model="solutionPrompt" @change="changeSolutionPrompt"
      :isShow="true">
    </RichTextEditor>
  </el-dialog>

  <el-dialog style="height: 700px; width: 750px;" v-model="dialogVisible">
    <TablePage style="height: 650px;" :itemsTotalLength="totalLength" :loading="loading2" :columns="tableColumns"
      @paginationChange="pageChange" :data="dialogTableData">
      <div style="margin-top: 0px;margin-bottom: 10px;">
        <SearchBar :items="searchBarItems" @change="loadMinilessons()"></SearchBar>
      </div>
    </TablePage>
  </el-dialog>

  <el-dialog style="height: 100px; width: 250px;" v-model="uploadVideoDialogShow">
    <el-button @click="selectLessonDialog">微课视频</el-button>
    <el-button type="primary" @click='uploadVideoClick2'>本地上传</el-button>
  </el-dialog>
</template>

<style lang="scss" scoped>
.scrollBarHeight {
  height: calc($page-height - 208px);
}

.margin {
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px
}

.row-divider {
  width: 100%;
  border-bottom: 2px #f0f2f5 solid;
  box-sizing: border-box;
  margin: 0;
}

.margin-left {
  margin-left: 25px;
}

.subandgrade {
  display: flex;
  flex-direction: row
}

.select-width {
  width: 90px
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>