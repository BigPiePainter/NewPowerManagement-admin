<script setup lang="tsx">
import { cancelEquipments, getEquipments } from '@/apis/clientDevice'
import { ref, reactive } from 'vue'
import { ElPopconfirm, ElNotification } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'

import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '账号设备管理', path: '/acount-equipment-management' }
]

const searchBarItems = reactive([
  { name: '姓名', value: '' },
  { name: '用户名', value: '' },
  { name: '手机号', value: '' },
  { name: '设备型号', value: '' }
])
const author = JSON.parse(localStorage.author)
const loading = ref(true)
const tableData = ref<any>([])
const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})
const pageChange = (val: any) => {
  paginationInfo.currentPage = val.currentPage
  paginationInfo.pageSize = val.pageSize
  loadData()
}
const totalLength = ref<Number>()

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: '设备信息ID',
    width: 200
  },

  {
    dataKey: 'name',
    key: 'name',
    title: '姓名',
    width: 100
  },

  {
    dataKey: 'account',
    key: 'account',
    title: '用户名',
    width: 150
  },
  {
    dataKey: 'phoneNumber',
    key: 'phoneNumber',
    title: '手机号',
    width: 200
  },

  {
    dataKey: 'deviceModel',
    key: 'deviceModel',
    title: '设备型号',
    width: 150
  },

  {
    dataKey: 'version',
    key: 'version',
    title: '系统版本号',
    width: 150
  },

  {
    dataKey: 'boundAt',
    key: 'boundAt',
    title: '绑定时间',
    width: 200
  },

  {
    dataKey: 'lastLoginTime',
    key: 'lastLoginTime',
    title: '最后登录时间',
    width: 200
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (cellData: any) => {
      const slots = {
        reference: () => (
          <el-button disabled={!author.deviceEdit} link type="primary">
            解绑
          </el-button>
        )
      }
      return (
        <ElPopconfirm
          title="是否解绑此设备？"
          v-slots={slots}
          onConfirm={() => cancelEquip(cellData.rowData.id)}
        ></ElPopconfirm>
      )
    },
    width: 60,
    fixed: 'right',
    align: 'center'
  }
]

//------------解绑设备---------------------
const cancelEquip = (id: number) => {
  cancelEquipments({ id }).then(() => {
    ElNotification({
      title: '成功',
      message: '已成功解绑',
      type: 'success'
    })
    loadData()
  }).catch
}

//--------------获取设备数据------------------
const loadData = () => {
  loading.value = true
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    name: searchBarItems[0].value,
    account: searchBarItems[1].value,
    phoneNumber: searchBarItems[2].value,
    deviceModel: searchBarItems[3].value
  }
  getEquipments(args)
    .then((res) => {
      tableData.value = res.data.records
      totalLength.value = res.data.total
    })
    .catch(() => {
      ElNotification({
        title: '未知错误',
        message: '页面未成功加载',
        type: 'error'
      })
    })
    .finally(() => {
      loading.value = false
    })
}
loadData()

</script>

<template>
  <TablePage :loading="loading" class="page-container" :itemsTotalLength="totalLength" @paginationChange="pageChange"
    :columns="tableColumns" :data="tableData">
    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" @change="loadData"></SearchBar>
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
}

.div-search-bar {
  margin: $gap;
}
</style>
