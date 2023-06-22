<script setup lang="tsx">


import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'


const router = useRouter()

const newClassData = reactive<{
  className: string,
  teacher: string,
  startDate: string,
  endDate: string,
  major: string,
  grade: string,

}>({

  className: '',
  teacher: '',
  startDate: '',
  endDate: '',
  major: '',
  grade: '',

});

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '老师管理', path: '/account-teacher-managament' },
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
    cellRenderer: (cellData: any) => <ElButton link type='primary' onClick={() => clickName(cellData)} class="detailed">{cellData.cellData}</ElButton>,
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
  }

]



console.log(tableData)

const refresh = () => {
  console.log(items)
}

const showDialog = ref(false)

const createTeacher = () => {
  showDialog.value = true

}

const deleteTeacher = () => {
  showDialog.value = false

}

const conformTeacher = () => {
  showDialog.value = false

}

//<AbcAbc> == <abc-abc>
//

</script>


<template>
  <TablePage class="page-container" :columns="tableColumns" :data="tableData">
    <div class="div-search-bar ">
      <SearchBar :items="items" @change="refresh()"></SearchBar>
      <el-button class="ARMbutton" type="primary" @click="createTeacher">新建老师</el-button>
    </div>
  </TablePage>

  <el-dialog v-model="showDialog" width="370px"  class="new-class-dialog">

    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          *用户名：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.className">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *姓名：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.teacher">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *密码：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.startDate">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          年级：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.endDate">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          学科：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.major">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          手机号码：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newClassData.grade">
        </el-input>
      </div>
    </div>
    <template #header >
      <el-text>新建老师</el-text>

      </template>


    <template #footer>


       <el-button @click='conformTeacher' type="primary">确认</el-button>
      <el-button @click="deleteTeacher">取消</el-button>
    </template>
  </el-dialog>
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



.ARMbutton {
  margin-top: $gap;
}

.header{
height: 50px;
}

.new-class-dialog {
  >.el-dialog__body {

    display: flex;
    align-items: center;
    flex-direction: column;

    >div {
      width: fit-content;

      >.div-input-element {
        display: flex;
        align-items: center;
        justify-content: right;
        margin-bottom: 13px;

        >.dialog-span {
          margin-right: 10px;
        }

        >.dialog-input {
          width: 200px;
        }
      }
    }
  }
}
</style>
