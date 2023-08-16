<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import RichTextEditor from '@/components/RichTextEditor.vue'
import { getGoodQuestions, removeQuestionFromPack } from '@/apis/questionPackageQuestion'

const router = useRouter()
const totalNum = ref('')

const deleteQuestion = (id: any) => {
  var args = {
    id: id
  }
  removeQuestionFromPack(args).then((res: any) => {
    if (res.code != 20000) {
      ElNotification({
        title: '未知错误',
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
  }).catch((err) => {
    ElNotification({
      title: '未知错误',
      message: err.msg,
      type: 'error'
    })
  })
}

const breadcrumbStore = useBreadcrumbStore()

breadcrumbStore.data = [
  { name: '题库管理', path: '' },
  { name: '好题详情', path: '/question-bank' }
]
const tableData = reactive<any>([])
const loading = ref(true)

const route = useRoute()
const createQuestionDailogShow = ref(false)

const questionCreate = (id: any) => {
  router.push({
    path: 'put-question-into-pack',
    query: { id: id }
  });
}

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
    packageId: route.query.id
  }

  getGoodQuestions(args)
    .then((res) => {
      console.log(res)
      totalNum.value = res.data.total
      res.data.records.forEach((item: any) => {
        tableData.push(item)
      })
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
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

</script>

<template>
  <div class="whole">
    <div class="topPart">
      <div class="topPart1">
        <div>
          <el-image class="image" fit="scale-down" :src="route.query.cover" className="shop-Preview" preview-src-list={{}}
            preview-teleported />

        </div>
        <div class="topPart1-3">
          <div class="topPart1-3-2">
            <div class="topPart1-3-2"><el-text style="font-size: 20px;">{{}}</el-text></div>
            <div class="topPart1-3-2"><el-text>学习阶段：{{ route.query.gradeName }}</el-text></div>
            <div class="topPart1-3-2"><el-text>学科：{{ route.query.subjectName }}</el-text></div>
            <div class="topPart1-3-2"><el-text>难度：
                {{
                  route.query.difficultyLevel as any == 1 ? "容易"
                  : route.query.difficultyLevel as any == 2 ? "较易"
                    : route.query.difficultyLevel as any == 3 ? "一般"
                      : route.query.difficultyLevel as any == 4 ? "较难"
                        : "困难"
                }}</el-text></div>
            <div class="topPart1-3-2"><el-text>老师：{{ route.query.teacherName }}</el-text></div>
          </div>
        </div>
      </div>



      <div class="topPart1">
        <div class="topPart1-1"><el-text></el-text></div>
        <div class="topPart2-2"><el-text></el-text></div>
      </div>

<!-- 
      <div class="topPart1">
        <div class="topPart1-1"><el-button type="primary">编辑</el-button> <el-button>下发课程</el-button></div>
      </div> -->
    </div>
    <el-divider class="row-divider"></el-divider>
    <div>
      <div class="botPart1-1">
        <div class="botPart1-1-1"><el-button type="primary" @click="questionCreate(route.query.id)">添加好题</el-button></div>
      </div>
    </div>
    <el-divider class="row-divider"></el-divider>

    <div>
      <el-scrollbar height="1000px">

        <el-card v-for="item in tableData" :key="item.id" style="margin-bottom: 10px;">
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
            <el-button @click="deleteQuestion(item.id)" type=primary>移除</el-button>
          </div>


          <RichTextEditor :questionPrompt="item.questionPrompt" :isShow="false" :id="item.id">
          </RichTextEditor>

          <div style="display:flex; flex-direction:row">
            <div style="margin-left:10px;margin-top: 10px;" v-for="items in JSON.parse(item.options)"
              :key="items.options">
              {{ items.identifier }}: {{ items.value }}</div>
          </div>

          <div style="display:flex; flex-direction:row; margin-bottom: 10px;margin-top: 10px;">
            <div style="margin-left:10px">
              答案：{{ JSON.parse(item.answer).answers }}</div>
          </div>
        </el-card>
        <el-pagination style="margin-left: 15px;margin-top: 10px;margin-bottom: 10px;"
          v-model:current-page="paginationInfo.currentPage" v-model:page-size="paginationInfo.pageSize"
          :page-sizes="[10, 20, 30, 100]" layout="total, sizes, prev, pager, next, jumper" :total=totalNum
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </el-scrollbar>
    </div>
  </div>


  <el-dialog v-model="createQuestionDailogShow" width="400px">
    <template #header>
      <el-text>添加好题</el-text>

    </template>

    <template #footer>
      <ElButton @click="createQuestionDailogShow = false">取消</ElButton>

      <ElButton type="primary">确认</ElButton>
    </template>
  </el-dialog>
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