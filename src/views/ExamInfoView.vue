<script setup lang="tsx">
import { ref, reactive, } from 'vue'
import { ElButton } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
import { getExamInfor } from '@/apis/examinfo'
const router = useRouter()
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置', path: '' }, { name: '考试咨询' }]

const loading = ref(true)


const tableData = ref<any>([])

const totalLength = ref<Number>()

const tableColumns = [
  {
    dataKey: 'content',
    key: 'content',
    title: '资讯内容',
    width: 500
  },
  {
    dataKey: 'createdAt',
    key: 'createdAt',
    title: '资讯时间',
    width: 500
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <>
          <el-button link type="primary" onClick={() => console.log(item)}>
            编辑
          </el-button>
          <el-button link type="danger" onClick={() => console.log(item)}>
            删除
          </el-button>
        </>
      )
    },
    width: 150,
    fixed: 'right',
    align: 'center',
    height: 500
  }
]


const loadData = () => {
  loading.value = true

  getExamInfor()
    .then((res) => {
      tableData.value = res.data
      totalLength.value = res.data.length
    })
    .catch(() => {})
    .finally(() => {
      loading.value = false
    })
}


loadData()




</script>

<template>
  <TablePage :loading="loading" class="info-table" :itemsTotalLength="totalLength" @paginationChange="loadData"
    :columns="tableColumns" :data="tableData">
    <div>
      <el-button @click="router.push({ path: 'new-product' })" class="new-info-button" type="primary">新增</el-button>
    </div>
  </TablePage>
</template>

<style lang="scss" scoped>
$gap: 15px;

.info-table {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;
  margin-top: $gap;

  .new-info-button {
    margin-left: $gap;
    margin-bottom: $gap;
  }
}
</style>
