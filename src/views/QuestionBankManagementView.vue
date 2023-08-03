<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { useRouter } from 'vue-router'
import { getGrades } from '@/apis/grade'
import { getSubjects } from '@/apis/subject'
import { InputType } from '@/type'
import { getCourseQuestionPackage } from '@/apis/coursequestionpackage'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '好题包管理', path: '' }]




const loading = ref(true)

const clickDetail = (props: { rowData: { id: string }})=>{

  router.push({ path: 'question-detail', query: { id: props.rowData.id }});

}

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 120
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '好题名称',
    width: 200,
    cellRenderer: ( cellData: any ) => (
      <ElButton link type="primary" onClick={() => clickDetail(cellData)}>
        {cellData.cellData}
      </ElButton>
    )
  },
  {
    dataKey: 'questionAmount',
    key: 'questionAmount',
    title: '好题数量',
    width: 150
  },
  {
    dataKey: 'gradeName',
    key: 'gradeName',
    title: '学习阶段',
    width: 100
  },
  {
    dataKey: 'subjectName',
    key: 'subjectName',
    title: '学科',
    width: 100
  },
  {
    dataKey: 'teacherName',
    key: 'teacherName',
    title: '老师名',
    width: 100
  },
  {
    dataKey: 'questionDifficulty',
    key: 'questionDifficulty',
    title: '难度',
    width: 100
  },
  {
    dataKey: 'description',
    key: 'description',
    title: '详情描述',
    width: 100
  },
  {
    dataKey: 'createdAt',
    key: 'createdAt',
    title: '创建时间',
    width: 200
  },
  {
    dataKey: 'updatedAt',
    key: 'updatedAt',
    title: '创建时间',
    width: 200
  },
  {
    key: 'option',
    title: '操作',

    cellRenderer: () => (

      <>
        <el-button link type="primary" class="">
          下发
        </el-button>
        <el-button link type="primary" class="">
          编辑
        </el-button>
        <el-button link type="primary" class="">
          删除
        </el-button>
      </>

    ),

    width: 180,
    fixed: 'right',
    align: 'left'
  }
]

const allGrades = ref<any>([])
const allSubjects = ref<any>([])
  const router = useRouter()

const clickCreate = () => {
  router.push({ path: 'question-package-create'});
}

const loadSelectOption = () => {
  getGrades()
    .then((res) => (allGrades.value = res.data.map((i: any) => i.subset).flat()))
    .catch()

  getSubjects()
    .then((res) => (allSubjects.value = res.data))
    .catch()
}

loadSelectOption()

const searchBarItems = reactive([
  {
    name: '年级',
    value: '',
    type: InputType.Select,
    label: '请选择',
    single: true,
    options: allGrades
  },
  {
    name: '学科',
    value: '',
    type: InputType.Select,
    label: '请选择',
    options: allSubjects
  },
  { name: '难度',
   value: '' },

  { name: '好题名称',
   value: '' }
])


const tableData = ref<any>([])
const totalLength = ref<Number>()

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20

})

const loadData = () => {
  loading.value = true

  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    gradeId: searchBarItems[0].value[0],
    subjectId: searchBarItems[1].value[0],
    difficultyLevel: searchBarItems[2].value,
    name: searchBarItems[3].value,
    type: 2,

  }
  console.log(args)
  getCourseQuestionPackage(args)
    .then((res) => {
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
  <TablePage :loading="loading" class="table-page" :columns="tableColumns" :searchBarItemsTotalLength="totalLength"
    @paginationChange="loadData" :data="tableData" style="margin-left: 15px;">

    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" @change="loadData()"></SearchBar>
    </div>

    <div>
      <el-button class="new-button" style="margin-bottom: 15px; margin-left: 15px;" type="primary" @click="clickCreate">新建好题包</el-button>
    </div>
    
  </TablePage>
</template>

<style scoped lang="scss">
$gap: 15px;

.page-container {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;
  //margin-right: $gap;

  .new-button {
    margin-left: $gap;
    margin-bottom: $gap;
  }
}

.div-search-bar {
  margin: $gap;
}
</style>
