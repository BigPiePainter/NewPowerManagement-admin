<script setup lang="tsx">
import { ref, reactive, } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
import { getProduct } from '@/apis/product'

import { getGrades } from '@/apis/grade'
import { getSubjects } from '@/apis/subject'





const router = useRouter()


const clickDetail = (props: { rowData: { id: string } }) => {
  console.log(props);
  router.push({ path: 'product-detail', query: { id: props.rowData.id } });
}


const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '商城管理', path: '' }]
const allGrades = ref<any>([])
const allSubjects = ref<any>([])
const loading = ref(true)






const allstatus = [
  {
    id: '1',
    value: 1,
    name: '已上架',
  },
  {
    id: '2',
    value: 2,
    name: '未上架',
  },
]

const allversion = [
  {
    id: '1',
    value: '1',
    name: '课程/好题A',
  },
  {
    id: '2',
    value: '2',
    name: '课程/好题B',
  },
  {
    id: '3',
    value: '3',
    name: '课程/好题C',
  },
  {
    id: '4',
    value: '4',
    name: '课程/好题D',
  },
]

const loadSelectOption = () => {
  getGrades()
    .then((res) => (allGrades.value = res.data.map((i: any) => i.subset).flat()))
    .catch()

  getSubjects()
    .then((res) => (allSubjects.value = res.data))
    .catch()
}

const allType: any = [
  {
    id: '1',
    value: 1,
    name: '课程',
  },
  {
    id: '2',
    value: 2,
    name: '好题',
  },
]

const searchBarItems = reactive([
  { name: '商品名称', value: '' },
  { name: '类型', value: '', type: InputType.Select, options: allType, },
  { name: '状态', value: '', type: InputType.Select, options: allstatus },
  { name: '阶段', value: '', type: InputType.Select, options: allGrades },
  { name: '学科', value: '', type: InputType.Select, options: allSubjects },
  { name: '版本', value: '', type: InputType.Select, options: allversion },
])

const url = '/1.jpg'






const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 50
  },
  {
    dataKey: 'cover',
    key: 'cover',
    title: '海报',
    width: 100,
    cellRenderer: (item: any) => (
      <el-image
        fit="scale-down"
        src={item.rowData.cover}
        //onClick={()=>console.log(item)}
        className="shop-Preview"
        preview-src-list={[item.rowData.cover]}
        preview-teleported
      />
    )
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '名称',
    width: 120,
    cellRenderer: (cellData: any) => (
      <ElButton link type="primary" onClick={() => clickDetail(cellData)}>
        {cellData.cellData}
      </ElButton>
    )

  },
  {
    dataKey: 'grade_name',
    key: 'grade_name',
    title: '学习阶段',
    width: 80
  },
  {
    dataKey: 'subjectName',
    key: 'subjectName',
    title: '学科',
    width: 50
  },
  {
    dataKey: 'androidPoint',
    key: 'androidPoint',
    title: '安卓积分',
    width: 50
  },
  {
    dataKey: 'androidPrice',
    key: 'androidPrice',
    title: '安卓售价',
    width: 50
  },
  {
    dataKey: 'iosPoint',
    key: 'iosPoint',
    title: 'ios积分',
    width: 80
  },
  {
    dataKey: 'categoryName',
    key: 'categoryName',
    title: '课程分类',
    width: 80
  },
  {
    dataKey: 'version',
    key: 'version',
    title: '版本',
    width: 60,
    cellRenderer: (cellData: any) => (
      <span>
        {cellData.cellData == 1 ? "课程/好题A" : cellData.cellData == 2 ? "课程/好题B" : cellData.cellData == 3 ? "课程/好题C" : "课程/好题D"}
      </span>)
  },
  {
    dataKey: 'versionType',
    key: 'versionType',
    title: '版本类型',
    width: 80,
    cellRenderer: (cellData: any) => (
      <span>
        {cellData.cellData == 1 ? "基础版" : cellData.cellData == 2 ? "培优版" : "创新版"}
      </span>)
  },
  {
    dataKey: 'salesQuantity',
    key: 'salesQuantity',
    title: '已售',
    width: 60
  },
  {
    dataKey: 'status',
    key: 'status',
    title: '状态',
    Fwidth: 50,
    cellRenderer: (cellData: any) => (
      <span>
        {cellData.cellData == 1 ? "已上架" : "未上架"}
      </span>
    )
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <>
          <el-button link type="primary" onClick={() => console.log(item)}>
            赠送商品
          </el-button>
          <el-button link type="primary" onClick={() => console.log(item)}>
            编辑
          </el-button>
          <el-button link type="primary" onClick={() => console.log(item)}>
            添加为热门商品
          </el-button>
          <el-button link type="primary" onClick={() => console.log(item)}>
            上架/下架
          </el-button>
          <el-button link type="danger" onClick={() => console.log(item)}>
            删除
          </el-button>
        </>
      )
    },
    width: 370,
    fixed: 'right',
    align: 'center',
    height: 500
  }
]

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20,
})

const totalLength = ref<Number>()
const tableData = ref<any>([])

const loadData = () => {
  loading.value = true
  loadSelectOption()

  var args = {


    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,

    name: searchBarItems[0].value,
    type: searchBarItems[1].value[0],
    status: searchBarItems[2].value[0],
    gradeId: searchBarItems[3].value[0],
    subjectId: searchBarItems[4].value[0],
    version: searchBarItems[5].value[0]


  }


  getProduct(args)

    .then((res) => {
      console.log(args)
      tableData.value = res.data.records
      totalLength.value = res.data.records.length
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })


}

loadData()

console.log(tableData)


</script>

<template>
  <TablePage :loading="loading" class="page-container" :itemsTotalLength="totalLength" @paginationChange="loadData"
    :columns="tableColumns" :data="tableData" :row-height="59">
    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" @change="loadData()"></SearchBar>
    </div>
    <div>
      <el-button @click="router.push({ path: 'new-product' })" class="new-poster-button" type="primary">新建商品</el-button>
    </div>
  </TablePage>
</template>

<style lang="scss" scop>
$gap: 15px;

.page-container {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;

  .div-search-bar {
    margin: $gap;
  }

  .new-poster-button {
    margin-left: $gap;
    margin-bottom: $gap;
  }

  .displaypic {
    width: 100px;
    height: 100px;
  }

  .el-image {
    width: 59px;
  }
}
</style>
