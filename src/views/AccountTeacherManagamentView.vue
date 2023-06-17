<script setup lang="tsx">


import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'


const router = useRouter()


const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '老师管理', path: '/account-teacher-managament' },
  { name: '老师详情', path: '/teacher-detail-managament' },
]



const items = reactive([
  { name: "用户名", value: "" },
  { name: "姓名", value: "" },
  { name: "手机号", value: "", label: "" },
  { name: "年级", value: "", type: InputType.Select, label: "请选择" },
  { name: "学科", value: "", type: InputType.Select, label: "请选择" },
])


const clickName = (props: any) => {
  console.log(props)
  router.push({ path: 'teacher-detail-managament', query: { id: props.rowData.id } })
}




const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 150
  },
  {
    dataKey: 'teacherName',
    key: 'teacherName',
    title: '姓名',
    width: 200,
    cellRenderer: (cellData: any) => <ElButton link type='primary' onclick={() => clickName(cellData)} class="detailed">{cellData.cellData}</ElButton>,
  },
  {
    dataKey: 'userName',
    key: 'userName',
    title: '用户名',
    width: 200
  },
  {
    dataKey: 'teacherGrade',
    key: 'teacherGrade',
    title: '年级',
    width: 100
  },
  {
    dataKey: 'teacherSubject',
    key: 'teacherSubject',
    title: '学科',
    width: 100
  },
  {
    dataKey: 'teacherCellnumber',
    key: 'teacherCellnumber',
    title: '手机号码',
    width: 200
  },
  {
    dataKey: 'loginTime',
    key: 'loginTime',
    title: '最后登录时间',
    width: 300,
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
            重置密码
          </el-button>
          <el-button link type="primary" onClick={() => console.log(item)}>
            删除
          </el-button>
        </div>
      )
    },
    width: 170,
    fixed: 'right',
    align: 'left'
  }
]

const tableData: object[] = [
  {
    id: '1',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '2',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '3',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '4',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '5',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },

  {
    id: '6',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '7',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '8',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '9',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '10',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '11',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '12',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '13',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '14',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '15',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '16',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '17',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '18',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '19',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '20',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '21',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '22',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '23',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '24',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  },
  {
    id: '25',
    teacherName: 'Aaron',
    userName: 'Aaron191518',
    teacherGrade: '9 year',
    teacherSubject: "数学",
    teacherCellnumber: 18636666666,
    loginTime: "2012-12-22 19:23"
  }

]



console.log(tableData)

const refresh = () => {
  console.log(items)
}




</script>


<template>
  <TablePage class="page-container" :columns="tableColumns" :data="tableData">
    <div class="div-search-bar ">
      <SearchBar :items="items" @change="refresh()"></SearchBar>

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



.detailed {}
</style>
