<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'

import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '实时课程', path: '' }]

const items = reactive([
  { name: '姓名', value: '' },
  { name: '手机', value: '' }
])

const tableColumns = [
  {
    dataKey: 'liveClassName',
    key: 'liveClassName',
    title: '课堂名称',
    width: 120
  },
  {
    dataKey: 'classTeacherName',
    key: 'classTeacherName',
    title: '课程老师',
    width: 120
  },
  {
    dataKey: 'classStartTime',
    key: 'classStartTime',
    title: '课程开始时间',
    width: 120
  },
  {
    dataKey: 'liveClassPeroid',
    key: 'liveClassPeroid',
    title: '课程时长',
    width: 100
  },
  {
    dataKey: 'acceptedStudents',
    key: 'acceptedStudents',
    title: '接受学生',
    width: 100
  },
  {
    dataKey: 'liveClassUrl',
    key: 'liveClassUrl',
    title: '课程地址',
    width: 500
  },
  {
    key: 'option',
    title: '操作',

    cellRenderer: () => (
      <>
        <el-button link type="primary" class="">
          编辑
        </el-button>
        <el-button link type="primary" class="">
          关闭
        </el-button>
        <el-button link type="danger" class="">
          删除
        </el-button>
      </>
    ),

    width: 180,
    fixed: 'right',
    align: 'left'
  }
]

let fakeData = {
  liveClassName: '数学提高课',
  classTeacherName: '陈毅',
  acceptedStudents: '大黄哥,李阳哥,张清宇,王绿原,张家豪',
  liveClassPeroid: '2.',
  classStartTime: '2019-8-17 20:08',
  liveClassUrl: 'https:/tencentMeeting.com/363872ec012b142f4baasasassa16fb0.html'
}

const tableData: object[] = []

for (let index = 0; index < 100; index++) {
  let data = { ...fakeData }
  data.liveClassPeroid += index
  tableData.push(data)
}

console.log(tableData)

const refresh = () => {
  console.log(items)
}
</script>

<template>
  <TablePage class="page-container" :columns="tableColumns" :data="tableData">
    <div class="div-search-bar">
      <SearchBar :items="items" @change="refresh()"></SearchBar>
    </div>
    <div>
      <el-button class="new-live-class-button" type="primary">新建课堂</el-button>
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
  > .div-search-bar {
    margin: $gap;
  }

  .new-live-class-button {
    margin-bottom: $gap;
    margin-left: $gap;
  }
}
</style>
