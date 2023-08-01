<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useRouter } from 'vue-router'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import SearchBar from '@/components/SearchBar.vue'
import { getCourseQuestionPackage } from '@/apis/coursequestionpackage'


const breadcrumbStore = useBreadcrumbStore()

breadcrumbStore.data = [
  { name: '课程管理', path: '' },
  { name: '课程管理', path: '/course-management' }
]
const tableData = ref<any>([])
const totalLength = ref<Number>()
const loading = ref(true)
const searchBarItems = reactive([
  { name: "课程名称", value: "", label: "请输入" },
])


const router = useRouter()


const courseCreat = (props: any) => {router.push({path: 'course-create', query: { id: props.rowData.id }})
}


const couseDetail = (props: any) => {
  console.log(props)
  router.push({ path: 'course-detail', query: { id: props.rowData.id } })
}

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 150
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '课程名称',
    width: 200,
    cellRenderer: (cellData: any) => <ElButton link type='primary' onClick={() => couseDetail(cellData)} class="detailed">{cellData.cellData}</ElButton>
  },
  {
    dataKey: 'teacherId',
    key: 'teacherId',
    title: '封面',
    width: 200
  },
  {
    dataKey: 'createdAt',
    key: 'createdAt',
    title: '创建时间',
    width: 200
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <div>
          <el-button link type="primary" onClick={() => console.log(item)}>
            下发
          </el-button>
          <el-button link type="primary" onClick={() => console.log(item)}>
            编辑
          </el-button>
          <el-button link type="danger" onClick={() => console.log(item)}>
            删除
          </el-button>
        </div>
        )},
    width: 150,
    fixed: 'right',
    align: 'left'
  }
]

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})

const loadData = () => {
  loading.value = true
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    name: searchBarItems[0].value
  }
  getCourseQuestionPackage(args)
    .then((res) => {
      console.log(res)
      tableData.value = res.data.records
      totalLength.value = res.data.records.length
    })
    .catch(() => {})
    .finally(() => {
    loading.value = false
    })


}


loadData()

</script>

<template>
<TablePage
    :loading="loading" 
    class="page-container"
    :itemsTotalLength="totalLength"
    @paginationChange="loadData"
    :columns="tableColumns"
    :data="tableData"
  >
    <div class='div-search-bar'>
      <SearchBar :items="searchBarItems" @change="loadData"></SearchBar>
      <el-button class="ARMbutton" type="primary" @click="courseCreat">新建课程</el-button>
    </div>
  </TablePage>
</template>

<style scoped lang="scss">
$gap: 15px;

.page-container {
  width: calc($page-width - $gap);
  height: calc($page-height);
  margin-left: $gap;
  //margin-right: $gap;
}

.ARMbutton {
  margin-top: $gap;
}
</style>
