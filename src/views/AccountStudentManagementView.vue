<script setup lang="tsx">
import { getGrades } from '@/apis/grade'
import { getSubjects } from '@/apis/subject'
import { ref, reactive } from 'vue'
import { ElButton, ElInput, ElNotification } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import { InputType } from '@/type'
import TablePage from '@/components/TablePage.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
import { getStudent, restStudentPsw, deleteStudent } from '@/apis/student'
import { createStudent, editStudent } from '@/apis/student'
const router = useRouter()

//-----------------跳转传参-----------------------
const clickDetail = (props: any) => {
  console.log(props)
  router.push({
    path: 'student-detail-management',
    query: {
      id: props.rowData.id,
      name: props.rowData.name,
      account: props.rowData.account,
      phoneNumber: props.rowData.phoneNumber,
      phoneNumberOfParent: props.rowData.phoneNumberOfParent,
      gradeName: props.rowData.gradeName,
      createdAt: props.rowData.createdAt,
      expiration: props.rowData.expiration
    }
  })
}

const breadcrumbStore = useBreadcrumbStore()
const createDialogShow = ref(false);
const editStudentDialogShow = ref(false);

breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '学生管理', path: '/account-student-management' }
]

const loading = ref(true)

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 60
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '姓名',
    width: 80,
    cellRenderer: (cellData: any) => (
      <ElButton link type="primary" onClick={() => clickDetail(cellData)}>
        {cellData.cellData}
      </ElButton>
    )
  },
  {
    dataKey: 'account',
    key: 'account',
    title: '用户名',
    width: 170
  },
  {
    dataKey: 'expiration',
    key: 'expiration',
    title: '有效期',
    width: 140
  },
  {
    dataKey: 'gradeName',
    key: 'gradeName',
    title: '年级',
    width: 70
  },
  {
    dataKey: 'phoneNumber',
    key: 'phoneNumber',
    title: '手机号码',
    width: 200
  },
  {
    dataKey: 'sexName',
    key: 'sexName',
    title: '性别',
    width: 70
  },
  {
    dataKey: 'phoneNumberOfParent',
    key: 'phoneNumberOfParent',
    title: '家长手机号码',
    width: 180
  },
  {
    dataKey: 'remark',
    key: 'remark',
    title: '备注',
    width: 120
  },
  {
    dataKey: 'createdAt',
    key: 'createdAt',
    title: '创建时间',
    width: 200
  },

  {
    dataKey: 'lastLoginTime',
    key: 'lastLoginTime',
    title: '最后登陆时间',
    width: 200
  },

  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {

      const resetPswSlot = {
        reference: () => <el-button link type="primary">重置密码</el-button>
      }

      const deleteSlot = {
        reference: () => <el-button link type="danger">删除</el-button>
      }

      return (
        <div>
          <el-button link type="primary" onClick={() => editstudent(item)}>
            编辑
          </el-button>

          <el-popconfirm hide-after={0} width='170' title={`重置${item.rowData.name}密码`} onConfirm={() => restPsw(item)} v-slots={resetPswSlot} />

          <el-popconfirm hide-after={0} width='170' title={`删除学生${item.rowData.name}`} onConfirm={() => preDeleteStu(item)} v-slots={deleteSlot} />
        </div >
      )
    },
    width: 170,
    fixed: 'right',
    align: 'left'
  }
]

const tableData = ref<object[]>([])

const newStudentData = reactive<any>({
  account: '',
  name: '',
  expiration: '',
  password: '',
  phoneNumber: '',
  sex: '',
  phoneNumberOfParent: '',
  remark: '',
});

const allGrades = ref<any>([])
const allSubjects = ref<any>([])

const restPsw = (item: any) => {
  var args = { id: item.rowData.id }
  restStudentPsw(args)
    .then((res: any) => {
      if (res.msg == 'success') {
        ElNotification({
          title: '重置成功',
          message: item.rowData.name + ' 密码已重置为 666666',
          type: 'success',
        })
      } else {
        ElNotification({
          title: '重置失败',
          type: 'error',
        })
      }
    })
    .catch(() => {
      ElNotification({
        title: '未知错误',
        type: 'error',
      })
    })
}

const preDeleteStu = (item: any) => {
  tableData.value.forEach((i: any) => {
    if (i.id == item.rowData.id) {
      tableData.value.splice(tableData.value.indexOf(i), 1)
    }
    return
  })
  var note: any = ElNotification({
    title: '点击撤回',
    message: `撤回删除学生 ${item.rowData.name}`,
    duration: 5000,
    onClick: () => { calcelDeleteStu(item), note.close() },
    onClose: () => deleteStu(item),
    type: 'warning',
  })
}

const calcelDeleteStu = (item: any) => {
  item.rowData.id = null
}

const deleteStu = (item: any) => {
  setTimeout(console.log, 0)
  deleteStudent({ id: item.rowData.id })
    .then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: item.rowData.name + '学生删除成功',
          type: 'success',
        })
      } else {
        ElNotification({
          title: '删除失败',
          message: '请求错误或删除被撤回',
          type: 'error',
        })
      }
      loadData()
    })
    .catch(() => {
      ElNotification({
        title: '未知错误',
        message: "学生未成功删除",
        type: 'error',
      })
    })
}

const conformCreate = () => {
  createStudent(newStudentData).then((res: any) => {
    if (res.code == 20000) {
      ElNotification({
        title: '成功',
        message: '已成功创建',
        type: 'success',
      })
      createDialogShow.value = false
      loadData()
    }
    else {
      ElNotification({
        title: 'Warning',
        message: res.msg,
        type: 'warning',
      })
    }
  })
    .catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'warning'
      })
    })
}

const cancel = () => {
  createDialogShow.value = false
}

const selectOptionGrades = reactive<any>([])
const searchBarItems = reactive([
  { name: '用户名', value: '' },
  { name: '姓名', value: '' },
  { name: '手机号', value: '', label: '' },
  { name: '学习阶段', value: '', type: InputType.Select, label: '请选择', options: selectOptionGrades }
])

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20,
  type: 1
})

const pageChange = (val: any) => {
  console.log(val)
  paginationInfo.currentPage = val.currentPage
  paginationInfo.pageSize = val.pageSize
  loadData()
}

const dataCompute = (items: any) => {
  items.forEach((i: any) => {
    i.sexName = i.sex == 1 ? '男' : '女'
  })
  tableData.value = items
}

const totalLength = ref<Number>()

const loadData = () => {
  loading.value = true
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    type: paginationInfo.type,
    account: searchBarItems[2].value,
    name: searchBarItems[0].value,
    phoneNumber: searchBarItems[1].value,
    gradeIds: searchBarItems[3].value
  }
  getStudent(args)
    .then((res) => {
      dataCompute(res.data.records)
      loading.value = false
      totalLength.value = res.data.total
      return getSubjects()
    })
    .then((res) => {
      allSubjects.value = res.data
      return getGrades()
    }).then((res) => (
      allGrades.value = res.data.map((i: any) => i.subset).flat()
    ))
    .catch()
}
loadData()

const loadSelectOption = () => {
  getGrades()
    .then((res) => {
      console.log(res)
      selectOptionGrades.length = 0
      res.data.forEach((item: any) => {
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
    .catch(() => {
      ElNotification({
        title: '未知错误',
        message: "搜索框选项未成功加载",
        type: 'error',
      })
    })
}
loadSelectOption()


const allGender = [
  {
    id: '1',
    value: '1',
    label: '男',
  },
  {
    id: '2',
    value: '2',
    label: '女',
  },
]

const editStudentData = reactive<{

  id: string,
  remark: string,
  gradeId: string,
  expiration: string
}>({
  id: '',
  remark: '',
  gradeId: '',
  expiration: ''
});
const editstudent =
  (props: { rowData: { id: string, gradeId: string, expiration: string, remark: string } }) => {
    editStudentData.id = props.rowData.id;
    editStudentData.expiration = props.rowData.expiration;
    editStudentData.gradeId = props.rowData.gradeId;
    editStudentData.remark = props.rowData.remark;

    console.log(props)
    editStudentDialogShow.value = true;
  }

const confirmEditDialog = () => {
  editStudent(editStudentData).
    then((res: any) => {
      console.log(editStudentData)
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: '学生编辑成功',
          type: 'success'
        })
      } else {
        ElNotification({
          title: '编辑失败',
          message: res.msg,
          type: 'error'
        })
      }
      loadData()
    }).catch()
  editStudentDialogShow.value = false;
}

const createStudents = () => {
  newStudentData.account = ''
  newStudentData.name = ''
  newStudentData.expiration = ''
  newStudentData.password = ''
  newStudentData.phoneNumber = ''
  newStudentData.sex = ''
  newStudentData.phoneNumberOfParent = ''
  newStudentData.remark = ''
  createDialogShow.value = true;
}

const cancelEditDialog = () => {
  editStudentDialogShow.value = false;
}
</script>

<template>
  <el-dialog v-model="createDialogShow" width="400px">
    <template #header>
      <el-text>新建学生</el-text>
    </template>
    <div style="height: 350px;margin-left: 20px;">
      <div class="input">
        <div class="input-word"><el-text style="color:#ff0000">*</el-text>用户名:</div>
        <ElInput class="input-input" placeholder="请输入" v-model="newStudentData.account" />
      </div>
      <div class="input">
        <div class="input-word"><el-text style="color:#ff0000">*</el-text>姓名:</div>
        <ElInput class="input-input" placeholder="请输入" v-model="newStudentData.name" />
      </div>
      <div class="input">
        <div class="input-word">性别:</div>
        <el-select class="input-input" placeholder="请输入" v-model="newStudentData.sex">
          <el-option v-for="item in allGender" :key="item.id" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="input">
        <div class="input-word"><el-text style="color:#ff0000">*</el-text>到期时间:</div>
        <el-date-picker type="datetime" placeholder="请选择" style="width:200px" v-model="newStudentData.expiration"
          value-format="YYYY-MM-DD HH:MM:00" />
      </div>

      <div class="input">
        <div class="input-word"><el-text style="color:#ff0000">*</el-text>密码:</div>
        <ElInput class="input-input" placeholder="6-20位,建议包含数字与字母" v-model="newStudentData.password" />
      </div>

      <div class="input">
        <div class="input-word"><el-text style="color:#ff0000">*</el-text>手机号码:</div>
        <ElInput class="input-input" placeholder="请输入" v-model="newStudentData.phoneNumber" />
      </div>

      <div class="input">
        <div class="input-word"><el-text style="color:#ff0000">*</el-text>父母手机号:</div>
        <ElInput class="input-input" placeholder="请输入" v-model="newStudentData.phoneNumberOfParent" />
      </div>

      <div class="input">
        <div class="input-word">备注:</div>
        <ElInput class="input-input" placeholder="请输入" v-model="newStudentData.remark" />
      </div>
    </div>
    <template #footer>
      <ElButton @click="cancel">取消</ElButton>

      <ElButton type="primary" @click="conformCreate">确认</ElButton>
    </template>
  </el-dialog>

  <TablePage :loading="loading" class="page-container" :itemsTotalLength="totalLength" @paginationChange="pageChange"
    :columns="tableColumns" :data="tableData">
    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" @change="loadData"></SearchBar>
      <el-button class="ARMbutton" type="primary" @click="createStudents">新建学生</el-button>
    </div>
  </TablePage>

  <el-dialog class="new-class-dialog" width="370px" v-model="editStudentDialogShow">
    <div class="div-input-element">
    </div>
    <div class="div-input-element" style="margin-top: 10px;">
      <el-text style="margin-left: 10px;">
        阶段：
      </el-text>
      <div>
        <el-select class="dialog-input" v-model="editStudentData.gradeId" style="width: 256px;">
          <el-option v-for="item in allGrades" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
    </div>
    <div class="div-input-element" style="margin-top: 10px;">
      <el-text style="margin-left: 10px;">
        备注：
      </el-text>
      <div>
        <el-input class="dialog-input" v-model="editStudentData.remark" style="width: 256px;">
        </el-input>
      </div>
    </div>
    <div class="div-input-element" style="margin-top: 10px;">
      <el-text style="margin-left: 10px;">
        期限：
      </el-text>
      <div>
        <el-date-picker type="datetime" placeholder="请选择" style="width:256px" v-model="editStudentData.expiration"
          value-format="YYYY-MM-DD HH:MM:00" />
      </div>
    </div>
    <template #header>
      <el-text>编辑学生</el-text>
    </template>

    <template #footer>
      <el-button type="primary" @click="confirmEditDialog()">确定</el-button>
      <el-button @click="cancelEditDialog()">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
$gap: 15px;

.ARMbutton {
  margin-top: $gap;
}

.page-container {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;
  //margin-right: $gap;
}

.div-search-bar {
  margin: $gap;
}

.input {
  display: flex;
  flex-direction: row;
  width: 320px;
  margin-bottom: 10px;
}

.input-word {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 80px;
  padding-right: 10px;
}

.input-input {
  display: flex;
  justify-content: flex-start;
  width: 200px;
  height: 32px;
}


.dialog-span {
  margin-right: 10px;
  margin: 10px
}
</style>