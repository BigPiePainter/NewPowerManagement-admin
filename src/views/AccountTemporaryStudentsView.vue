<script setup lang="tsx">
import { getStudent } from '@/apis/studentManagement'
import { getGrades } from '@/apis/getGrades'
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'

import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '临时学生管理', path: '/account-temoorary-student' },
]

const selectOptionGrades = reactive<any>([])
const searchBarItems = reactive([
  { name: "姓名", value: "" },
  { name: "手机号", value: "", label: "" },
])

const tableColumns = reactive([
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 200
  },
  {
    dataKey: 'studentName',
    key: 'studentName',
    title: '姓名',
    width: 200
  },
  {
    dataKey: 'phoneNumber',
    key: 'phoneNumber',
    title: '手机号',
    width: 200
  },
  {
    dataKey: 'school',
    key: 'school',
    title: '学校',
    width: 200
  },
  {
    dataKey: 'loginTime',
    key: 'loginTime',
    title: '最后登陆时间',
    width: 200,
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <div>
          <el-button link type="primary" onClick={() => console.log(item)}>
            编辑
          </el-button>
          <el-button link type="primary" onClick={() => console.log(item)}>
            转为正式学生
          </el-button>
          <el-button link type="primary" onClick={() => console.log(item)}>
            重置密码
          </el-button>
          <el-button link type="danger" onClick={() => console.log(item)}>
            删除
          </el-button>
        </div>
      )
    },
    width: 300,
    fixed: 'right',
    align: 'left'
  }
])

// let fakeData = {
//   id: '1',
//   studentName: 'Aaron',
//   school: '上虞中学',
//   phoneNumber: '155799928891',
//   loginTime: '2023-9-19 18:23'
// }

const tableData = reactive<any>([])

// for (let index = 0; index < 100; index++) {
//   let data = { ...fakeData }
//   data.id += index
//   tableData.push(data)
// }
const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20,
  type: 2 //临时学生type为2
})

const dataCompute = (items: any) => {
  tableData.length = 0
  items.data.records.forEach((item: any) => {
    var dataSample = {
      id: item.id,
      studentName: item.name,
      phoneNumber: item.phoneNumber,
      school: item.school,
      loginTime: item.lastLoginTime
    }
    tableData.push(dataSample)
  });
  console.log(tableData)
}

const totalLength = ref<Number>()

const loadSelectOption = () => {
  getGrades()
    .then((res) => {
      selectOptionGrades.length = 0
      res.data.forEach((item: any) => {
        // var dataSample = {
        //   id: it                                                                                                                                                                                                     em.id,
        //   level: item.level,
        //   name: item.name                                                                           
        // }
        // selectOptionGrades.push(dataSample)

        item.subset.forEach((item: any) => {
          var dataSample = {
            id: item.id,
            level: item.level,
            name: item.name
          }
          selectOptionGrades.push(dataSample)
        })
      })
      console.log(selectOptionGrades)
    })
    .catch()
}
loadSelectOption()

const loadData = (prop: any) => {
  paginationInfo.currentPage = prop.currentPage
  paginationInfo.pageSize = prop.pageSize
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    name: searchBarItems[0].value,
    phoneNumber: searchBarItems[1].value,
  }

  getStudent(args).then((res) => {

    dataCompute(res)
    totalLength.value = res.data.records.length
  })
    .catch()
}
loadData(paginationInfo)

console.log(tableData)

const refresh = () => {
  console.log(searchBarItems)
  loadData(paginationInfo)
}
</script>

<template>
  <TablePage class="page-container" :msg="totalLength" @paginationChange="loadData" :columns="tableColumns" :data="tableData">
    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" @change="refresh" :selectOptions="selectOptionGrades"></SearchBar>
    </div>
  </TablePage>
</template>

<style scoped lang="scss">
$gap: 15px;

.page-container {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;
}

.div-search-bar {
  margin: $gap;
}
</style>
