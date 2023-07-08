<script setup lang="tsx">
import { cancelEquipments, getEquipments } from '@/apis/clientDevice'
import { ref, reactive } from 'vue'
import { ElButton, popconfirmEmits } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'

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

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: '设备信息ID',
    width: 200
  },

  {
    dataKey: 'studentName',
    key: 'studentName',
    title: '姓名',
    width: 100
  },

  {
    dataKey: 'userName',
    key: 'userName',
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
    dataKey: 'eqipmentModel',
    key: 'eqipmentModel',
    title: '设备型号',
    width: 150
  },

  {
    dataKey: 'systemModel',
    key: 'systemModel',
    title: '系统版本号',
    width: 150
  },

  {
    dataKey: 'tiedTime',
    key: 'tiedTime',
    title: '绑定时间',
    width: 200
  },

  {
    dataKey: 'loginTime',
    key: 'loginTime',
    title: '最后登录时间',
    width: 200
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (cellData: any) => (
      <el-button  link type="primary" onClick={() =>  {cancelEquip (cellData.rowData.id) }}>
        解绑
      </el-button>
    ),
    width: 60,
    fixed: 'right', 
    align: 'center'
  }
]


const cancelEquip = (id: number) => {
  cancelEquipments({ id }).then(() => {
  }).catch
}



const tableData = reactive<any>([])

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20,
})

const dataCompute = (items: any) => {
  tableData.length = 0
  items.data.records.forEach((item: any) => {
    var dataSample = {
      id: item.id,
      studentName: item.name,
      userName: item.account,
      phoneNumber: item.phoneNumber,
      eqipmentModel: item.deviceModel,
      systemModel: item.version,
      tiedTime: item.boundAt,
      loginTime: item.lastLoginTime,
    }
    tableData.push(dataSample)
  });
  console.log(tableData)
}

const totalLength = ref<Number>()

const refresh = () => {
  console.log(searchBarItems)
  loadData(paginationInfo)
}

const loadData = (prop: any) => {
  var args = {
    pageNum: prop.currentPage,
    pageSize: prop.pageSize,
    name: searchBarItems[0].value,
    account: searchBarItems[1].value,
    phoneNumber: searchBarItems[2].value,
    deviceModel: searchBarItems[3].value
  }
  console.log(args)
  getEquipments(args)
    .then((res) => {
      dataCompute(res)
      totalLength.value = res.data.records.length
    })
    .catch()
}
loadData(paginationInfo)

const confirmEvent = () => {
  console.log('confirm!')
}
const cancelEvent = () => {
  console.log('cancel!')
}


</script>






<template>

  <TablePage class="page-container" :msg="totalLength" @paginationChange="loadData" :columns="tableColumns"
    :data="tableData">
    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" @change="refresh"></SearchBar>
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
