<script setup lang="tsx">
import { ref, reactive } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import TablePage from '@/components/TablePage.vue'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '课程管理' }, { name: '微课审核' }]

const activeName = ref('pending')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const tableColumnsPending = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 200
  },
  {
    dataKey: 'title',
    key: 'title',
    title: '标题',
    width: 200
  },
  {
    dataKey: 'uploadUser',
    key: 'uploadUser',
    title: '上传者',
    width: 200
  },
  {
    dataKey: 'tag',
    key: 'tag',
    title: '标签',
    width: 200
  },
  {
    dataKey: 'uploadTime',
    key: 'uploadTime',
    title: '上传时间',
    width: 200
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: () => (
      <>
        <el-button link type="primary" class="">
          通过
        </el-button>
        <el-button link type="primary" class="">
          拒绝
        </el-button>
        <el-button link type="primary" class="">
          编辑
        </el-button>
        <el-button link type="danger" class="">
          删除
        </el-button>
      </>
    ),
    width: 200,
    fixed: 'right',
    align: 'left'
  }
]

const tableColumnsApproved = [...tableColumnsPending]
let options: any = { ...tableColumnsApproved.pop() }
options.cellRenderer = () => (
  <>
    <el-button link type="primary" class="">
      编辑
    </el-button>
    <el-button link type="danger" class="">
      删除
    </el-button>
  </>
)
options.width = 100
tableColumnsApproved.push(options)

const tableColumnsRejected = [...tableColumnsPending]
options = { ...tableColumnsRejected.pop() }
options.cellRenderer = () => (
  <>
    <el-button link type="primary" class="">
      编辑
    </el-button>
    <el-button link type="danger" class="">
      删除
    </el-button>
  </>
)
options.width = 100
tableColumnsRejected.push(options)

//const tableColumnsPending

let fakeData = {
  id: '1',
  title: '完形填空突破1',
  uploadUser: '张清宇',
  tag: '-',
  uploadTime: '2011-9-19 18:23'
}

const tableDataPending: object[] = []

for (let index = 0; index < 10; index++) {
  let data = { ...fakeData }
  data.id += index
  tableDataPending.push(data)
}

const tableDataApproved: object[] = []

for (let index = 50; index < 100; index++) {
  let data = { ...fakeData }
  data.id += index
  tableDataApproved.push(data)
}

const tableDataRejected: object[] = []

for (let index = 100; index < 200; index++) {
  let data = { ...fakeData }
  data.id += index
  tableDataRejected.push(data)
}
</script>

<template>
  <div class="">
    <el-tabs v-model="activeName" class="tabs-page" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="pending">
        <TablePage
          class="tabs-page-table"
          :columns="tableColumnsPending"
          :data="tableDataPending"
        ></TablePage>
      </el-tab-pane>
      <el-tab-pane label="已通过" name="approved"
        ><TablePage
          class="tabs-page-table"
          :columns="tableColumnsApproved"
          :data="tableDataApproved"
        ></TablePage
      ></el-tab-pane>
      <el-tab-pane label="未通过" name="rejected"
        ><TablePage
          class="tabs-page-table"
          :columns="tableColumnsRejected"
          :data="tableDataRejected"
        ></TablePage
      ></el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.tabs-page {
  padding-left: 30px;
  padding-top: 10px;
  height: $page-height;
  box-sizing: border-box;

  .tabs-page-table {
    height: calc($page-height - 54px - 10px);
  }
}
</style>
