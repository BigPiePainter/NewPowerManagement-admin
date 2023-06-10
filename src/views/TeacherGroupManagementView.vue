<script setup lang="tsx">
import { ref, reactive } from 'vue';
import { ElButton } from 'element-plus'
import SearchBar from '../components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '学校管理', path: '' },
  { name: '教研组管理', path: '/teacher-group-management' }
]

const items = reactive([
  { name: "教研组名称", value: "" },
  { name: "教研组组长", value: "" },
])

const tableData = reactive<object[]>([{
  id: '123456',
  teacherGroupName: '数学组',
  groupLeader: '庄老师',
  memberNum: '9',
  createDate: '2021-12-02',
}, {
  id: '54321',
  teacherGroupName: '语文组',
  groupLeader: '庄老师',
  memberNum: '9',
  createDate: '2021-12-02',
}, {
  id: '666345',
  teacherGroupName: '英语组',
  groupLeader: '庄老师',
  memberNum: '9',
  createDate: '2021-12-02',
}])

const fakeData = reactive([{
  id: '12345',
  teacherGroupName: '英语组',
  groupLeader: '庄老师',
  memberNum: '9',
  createDate: '2021-12-02',
}])

const pushData = () => {
  for (let i = 0; i < 100; i++) {
    tableData.push(fakeData[0])
  }
  console.log(tableData)
}
pushData()

const tableColumns = reactive<any[]>([
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 150
  }, {
    dataKey: 'teacherGroupName',
    key: 'teacherGroupName',
    title: '教研组名称',
    cellRenderer: (item: any) => {
      return (
        <div>
          <ElButton link type='primary' onClick={() => clickDetail(item)}>{item.rowData.teacherGroupName}</ElButton>
        </div>
      )
    },
    width: 150
  }, {
    dataKey: 'groupLeader',
    key: 'groupLeader',
    title: '教研组组长',
    width: 150
  }, {
    dataKey: 'memberNum',
    key: 'memberNum',
    title: '成员人数',
    width: 150
  }, {
    dataKey: 'createDate',
    key: 'createDate',
    title: '创建时间',
    width: 150
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <div>
          <ElButton link type='primary' onClick={() => editTeacherGroup(item)}>编辑</ElButton>
          <ElButton link type='primary' onClick={() => deleteTeacherGroup(item)}>删除</ElButton>
        </div>
      )
    },
    width: 150,
    fixed: 'right',
    align: 'center'
  }
])
//将教研组id传参到教研组详情页面，用于获取this.教研组
const clickDetail = (props: {rowData:{id:string}}) => {
  console.log(props.rowData.id)
  router.push({ path: 'teacher-group-detail', query: { id: props.rowData.id } })
}
const editTeacherGroup = (props: object) => {
  console.log(props)
}
const deleteTeacherGroup = (props: object) => {
  console.log(props)
}

const refresh = () => {
  console.log(items)
}
</script>

<template>
  <div class="div-teacher-group-management">
    <TablePage class="table-page" :columns="tableColumns" :data="tableData">
      <div class="div-search-bar">
        <SearchBar :items="items" @change="refresh()" />
      </div>
      <div class="table-div">
        <el-button class="new-teacher-group-button">新建教研组</el-button>
      </div>
    </TablePage>
  </div>
</template>

<style scoped lang="scss">
$gap : 15px;

.div-search-bar {
  margin: $gap;
}

.div-teacher-group-management {
  height: $page-height;
  flex-grow: 1;
}

.table-page {
  width: calc($page-width - $gap);
  margin-left: $gap;
}

.new-teacher-group-button {
  margin-left: $gap;
  margin-bottom: $gap;
}
</style>