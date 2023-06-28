<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useRouter } from 'vue-router'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import SearchBar from '@/components/SearchBar.vue'

const breadcrumbStore = useBreadcrumbStore()

const refresh = () => {
  console.log(items)
}

breadcrumbStore.data = [
  { name: '课程管理', path: '' },
  { name: '课程管理', path: '/course-management' }
]

const items = reactive([
  { name: "课程名称", value: "", label: "请输入" },
])

const router = useRouter()


const courseCreat = () => {router.push({path: '/course-management-create'})
}

const couseDetail = () => {router.push({path: '/course-management-detail'})
}

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 150
  },
  {
    dataKey: 'courseName',
    key: 'courseName',
    title: '课程名称',
    width: 200,
    cellRenderer: (cellData: any) => <ElButton link type='primary' onClick={() => couseDetail(cellData)} class="detailed">{cellData.cellData}</ElButton>
  },
  {
    dataKey: 'courseAmount',
    key: 'courseAmount',
    title: '课程大纲数量',
    width: 200
  },
  {
    dataKey: 'courseGrade',
    key: 'courseGrade',
    title: '年级',
    width: 120
  },
  {
    dataKey: 'courseSubject',
    key: 'courseSubject',
    title: '学科',
    width: 120
  },
  {
    dataKey: 'courseTag',
    key: 'courseTag',
    title: '标签',
    width: 120
  },
  {
    dataKey: 'courseCreateTime',
    key: 'courseCreateTime',
    title: '创建时间',
    width: 200
  },
  {
    dataKey: 'courseChangeTime',
    key: 'courseChangeTime',
    title: '最后更新时间',
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

const tableData: object[] = [
  {
    id: '1',
    courseName: 'Aaron191518',
    courseAmount: '12',
    courseGrade: '9年级',
    courseSubject: '数学',
    courseTag:'-',
    courseCreateTime:'2022-11-01 12:20',
    courseChangeTime:'2022-12-31 12:20'

  },
  {
    id: '2',
    courseName: 'Aaron191518',
    courseAmount: '12',
    courseGrade: '9年级',
    courseSubject: '数学',
    courseTag:'-',
    courseCreateTime:'2022-11-01 12:20',
    courseChangeTime:'2022-12-31 12:20'

  },
  {
    id: '3',
    courseName: 'Aaron191518',
    courseAmount: '12',
    courseGrade: '9年级',
    courseSubject: '数学',
    courseTag:'-',
    courseCreateTime:'2022-11-01 12:20',
    courseChangeTime:'2022-12-31 12:20'

  },
  {
    id: '4',
    courseName: 'Aaron191518',
    courseAmount: '12',
    courseGrade: '9年级',
    courseSubject: '数学',
    courseTag:'-',
    courseCreateTime:'2022-11-01 12:20',
    courseChangeTime:'2022-12-31 12:20'

  },
  {
    id: '5',
    courseName: 'Aaron191518',
    courseAmount: '12',
    courseGrade: '9年级',
    courseSubject: '数学',
    courseTag:'-',
    courseCreateTime:'2022-11-01 12:20',
    courseChangeTime:'2022-12-31 12:20'

  },
  {
    id: '6',
    courseName: 'Aaron191518',
    courseAmount: '12',
    courseGrade: '9年级',
    courseSubject: '数学',
    courseTag:'-',
    courseCreateTime:'2022-11-01 12:20',
    courseChangeTime:'2022-12-31 12:20'

  },
  {
    id: '7',
    courseName: 'Aaron191518',
    courseAmount: '12',
    courseGrade: '9年级',
    courseSubject: '数学',
    courseTag:'-',
    courseCreateTime:'2022-11-01 12:20',
    courseChangeTime:'2022-12-31 12:20'

  },
  {
    id: '8',
    courseName: 'Aaron191518',
    courseAmount: '12',
    courseGrade: '9年级',
    courseSubject: '数学',
    courseTag:'-',
    courseCreateTime:'2022-11-01 12:20',
    courseChangeTime:'2022-12-31 12:20'

  },
  {
    id: '9',
    courseName: 'Aaron191518',
    courseAmount: '12',
    courseGrade: '9年级',
    courseSubject: '数学',
    courseTag:'-',
    courseCreateTime:'2022-11-01 12:20',
    courseChangeTime:'2022-12-31 12:20'

  }

]
</script>

<template>

  <TablePage class="page-container" :columns="tableColumns" :data="tableData">
    <div class='div-search-bar'>
      <SearchBar :items="items" @change="refresh()"></SearchBar>
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
