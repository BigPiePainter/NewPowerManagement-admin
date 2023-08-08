<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useRouter, useRoute } from 'vue-router'
import { getGrades } from '@/apis/grade'
import { getSubjects } from '@/apis/subject'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import SearchBar from '@/components/SearchBar.vue'
import { getGoodQuestions } from '@/apis/questionPackageQuestion'







const allGrades = ref<any>([])
const allSubjects = ref<any>([])

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
const tableData = ref<any>([])
const totalLength = ref<Number>()
const loading = ref(true)



const route = useRoute()
const createQuestionDailogShow = ref(false)

const questionCreate = () => {
  createQuestionDailogShow.value = true;
}



const newQuestionData = reactive<{

  answer: string,
  difficultyType: number,
  filePath: string,
  gradeId: number,
  mimeType: string,
  options: string,
  questionPrompt: string,
  solution: number,
  subjectId: number,
  type: string,

}>({

  answer: '',
  filePath: '',
  difficultyType: 0,
  gradeId: 0,
  mimeType: '',
  options: "",
  questionPrompt: '',
  solution: 0,
  subjectId: 0,
  type: '',


});

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})


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





// const questionCreateconfirm = () => {
//   getGoodQuestionss(newQuestionData).
//     then((res: any) => {
//       if (res.code == '20000') {
//         ElNotification({
//           title: '成功',
//           message: '学生编辑成功',
//           type: 'success'
//         })
//         loadData()
//       } else {
//         ElNotification({
//           title: '编辑失败',
//           message: '请求错误或删除被撤回',
//           type: 'error'
//         })
//       }
//     }).catch()
//   createQuestionDailogShow.value = false;
// }



const loadData = () => {

  loading.value = true
  loadSelectOption()

  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    packageId: route.query.id
  }

  getGoodQuestions(args)
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


loadData()

</script>

<template>

  <el-button @click="console.log(tableData)"></el-button>
  <div class="whole">
    <div class="topPart">
      <div class="topPart1">
        <div>
          <el-image class="image" fit="scale-down" src={{}} className="shop-Preview"
            preview-src-list={{}} preview-teleported />

      </div>
        <div class="topPart1-3">
          <div class="topPart1-3-2">
            <div class="topPart1-3-2"><el-text style="font-size: 20px;">{{}}</el-text></div>
               <div class="topPart1-3-2"><el-text>学习阶段：三年级</el-text></div>
               <div class="topPart1-3-2"><el-text>学科：语文</el-text></div>
               <div class="topPart1-3-2"><el-text>难度：{{tableData.difficultyType}}</el-text></div>
            <div class="topPart1-3-2"><el-text>老师：庄老师</el-text></div>
          </div>
        </div>
       </div>



      <div class="topPart1">
        <div class="topPart1-1"><el-text></el-text></div>
        <div class="topPart2-2"><el-text></el-text></div>
      </div>


      <div class="topPart1">
        <div class="topPart1-1"><el-button type="primary">编辑</el-button> <el-button>下发课程</el-button></div>
      </div>
    </div>
    <el-divider class="row-divider"></el-divider>
    <div>
      <div class="botPart1-1">
        <div class="botPart1-1-1"><el-button type="primary" @click="questionCreate">添加好题</el-button></div>
      </div>
    </div>
    <el-divider class="row-divider"></el-divider>
    <div class="botPart1-2">
    </div>
  </div>

  <!-- <el-dialog v-model="createQuestionDailogShow" width="400px">
    <template #header>
      <el-text>添加好题包</el-text>
    </template>
    <div style="height: 400px">
      <div class="input">
        <div class="input-word">*用户名:</div>
        <ElInput class="input-input" placeholder="请输入" v-model="newQuestionData.account" />
      </div>
      <div class="input">
        <div class="input-word">*姓名:</div>
        <ElInput class="input-input" placeholder="请输入" v-model="newQuestionData.name" />
      </div>

      <div class="input">
        <div class="input-word">*学习阶段:</div>
        <el-select placeholder="请选择" class="input-input" filterable v-model="newQuestionData.gradeId">
          <el-option v-for="item in allGrades" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>

      <div class="input">
        <div class="input-word">题目类型:</div>
        <el-select class="input-input" placeholder="请选择" v-model="newQuestionData.type">
          <el-option v-for="item in allQuestionType" :key="item.id" :label="item.label" :value="item.value" />
        </el-select>
      </div>

      <div class="input">
        <div class="input-word">题目难度:</div>
        <el-select class="input-input" placeholder="请选择" v-model="newQuestionData.difficultyType">
          <el-option v-for="item in allDifficultyType" :key="item.id" :label="item.label" :value="item.value" />
        </el-select>
      </div>

      <div class="input">
        <div class="input-word">密码:</div>
        <ElInput class="input-input" placeholder="6-20位,建议包含数字与字母" v-model="newQuestionData.password" />
      </div>

      <div class="input">
        <div class="input-word">学科:</div>
        <el-select class="input-input" filterable placeholder="请输入" v-model="newQuestionData.subjectId">
          <el-option v-for="item in allSubjects" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>

      <div class="input">
        <div class="input-word">手机号码:</div>
        <ElInput class="input-input" placeholder="请输入" v-model="newQuestionData.phoneNumber" />
      </div>
    </div>
    <template #footer>
      <ElButton @click="createQuestionDailogShow = false">取消</ElButton>

      <ElButton type="primary" @click="questionCreateconfirm">确认</ElButton>
    </template>
  </el-dialog> -->
</template>

<style scoped lang="scss">
$scale: 0.88;
$gap: 15px;


.page-container {

  margin-left: $gap;
  margin-top: 15px;
  height: 430px;
  //margin-right: $gap;
}

.whole {
  display: flex;
  flex-direction: column;
  width: calc($page-width - $gap);
  height: calc($page-height);
}


.topPart {
  display: flex;
  flex-direction: row;
  height: 220px * $scale;
}

.topPart1 {
  display: flex;
  flex-direction: row;
  flex-grow: 1;
}

.topPart1-1 {
  display: flex;
  height: 40px * $scale;
  margin-top: 15px * $scale;
  justify-content: flex-end;

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

.image {
  display: flex;
  flex-direction: row;
  width: 193.6px;
  height: 193.6px;
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
  padding-left: 15px* $scale;

}


.topPart1-3-2 {
  margin: 10px;

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
  margin-left: 18px;

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