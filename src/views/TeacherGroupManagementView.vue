<script setup lang="tsx">
import { ref, reactive } from 'vue';
import { ElButton, ElNotification } from 'element-plus'
import SearchBar from '../components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { useRouter } from 'vue-router'
import { editTeacherGroups, getTeacherGroup, createTeacherGroup, deleteTeacherGroups } from '@/apis/teacherGroup'
import { getAllTeachers } from '@/apis/teacher'
const router = useRouter()

import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { InputType } from '@/type';
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '学校管理', path: '' },
  { name: '教研组管理', path: '/teacher-group-management' }
]

const allTeacher = ref<any>([])

getAllTeachers().then((res) => {
  allTeacher.value = res.data
})


const searchBarItems = reactive([
  { name: "教研组名称", value: "" },
  { name: "教研组长", type: InputType.Select, value: "", options: allTeacher },
])

const loading = ref(true)

const newTeacherGroupDialogShow = ref(false);

const newTeacherGroupData = reactive<any>(
  {
    leaderId: '',
    name: ''
  });

const creatNewTeacherGroup = () => {
  newTeacherGroupData.leaderId = ''
  newTeacherGroupData.name = ''
  newTeacherGroupDialogShow.value = true;
}

const tableData = ref<any>([])

const tableColumns = reactive<any[]>([
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 150
  }, {
    dataKey: 'name',
    key: 'name',
    title: '教研组名称',
    cellRenderer: (item: any) => {
      return (
        <div>
          <ElButton link type='primary' onClick={() => clickDetail(item)}>{item.rowData.name}</ElButton>
        </div>
      )
    },
    width: 150
  }, {
    dataKey: 'teacherName',
    key: 'teacherName',
    title: '教研组长',
    width: 150
  }, {
    dataKey: 'memberNum',
    key: 'memberNum',
    title: '成员人数',
    width: 150
  }, {
    dataKey: 'createdAt',
    key: 'createdAt',
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
          <el-popconfirm
            hide-after={0}
            width="170"
            title={`删除教研组${item.rowData.name}`}
            onConfirm={() => preDeleteTea(item)}
            v-slots={{
              reference: () => (
                <el-button link type="danger">
                  删除
                </el-button>
              )
            }}
          />
        </div>
      )
    },
    width: 150,
    fixed: 'right',
    align: 'center'
  }
])
//将教研组id传参到教研组详情页面，用于获取this.教研组
const clickDetail = (props: any) => {
  console.log(props.rowData)
  router.push({
    path: 'teacher-group-detail',
    query: {
      id: props.rowData.id,
      name: props.rowData.name,
      teacherName: props.rowData.teacherName,
    }
  })
}

const editTeacherGroupDialogShow = ref(false);
const editTeacherGroupData = reactive<any>({ leaderId: '', id: '', name: '' });
const editTeacherGroup = (props: any) => {
  console.log(props)
  editTeacherGroupDialogShow.value = true;
  editTeacherGroupData.name = props.rowData.teacherGroupName
  editTeacherGroupData.leaderId = props.rowData.groupLeader
  editTeacherGroupData.id = props.rowData.id
}
const preDeleteTea = (item: any) => {
  tableData.value.forEach((i: any) => {
    if (i.id == item.rowData.id) {
      tableData.value.splice(tableData.value.indexOf(i), 1)
    }
    return
  })
  var note: any = ElNotification({
    title: '点击撤回',
    message: `撤回删除教研组 ${item.rowData.name}`,
    duration: 5000,
    onClick: () => {
      calcelDeleteTea(item)
      note.close()
    },
    onClose: () => { deleteTea(item), console.log(item.rowData.id) },
    type: 'warning'

  })
}

const deleteTea = (item: any) => {
  setTimeout(console.log, 0)
  deleteTeacherGroups({ id: item.rowData.id })
    .then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: item.rowData.name + '教研组删除成功',
          type: 'success'
        })
        loadData()
      } else {
        ElNotification({
          title: '删除失败',
          message: '请求错误或删除被撤回',
          type: 'error'
        })
      }
      loadData()
    })
    .catch(() => {
      ElNotification({
        title: '未知错误',
        message: '教研组未成功删除',
        type: 'error'
      })
    })
}

const calcelDeleteTea = (item: any) => {
  item.rowData.id = null
}

const deleteTeacherGroupDialogShow = ref(false);
const deleteTeacherGroupData = reactive<{ teacherGroupName: string }>({ teacherGroupName: '' });

const confirmEditDialog = () => {
  editTeacherGroups(editTeacherGroupData)
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '成功',
          message: '已成功修改',
          type: 'success',
        })
        loadData()
        editTeacherGroupDialogShow.value = false;
      }
      else {
        ElNotification({
          title: '失败',
          message: '修改失败',
          type: 'warning',
        })
      }
    })
    .catch
  editTeacherGroupDialogShow.value = false;
  console.log(editTeacherGroupData)
}
const cancelEditDialog = () => {
  editTeacherGroupDialogShow.value = false;
}
const confirmDeleteDialog = () => {
  console.log(deleteTeacherGroupData)
  deleteTeacherGroupDialogShow.value = false;
}
const cancelDeleteDialog = () => {
  deleteTeacherGroupDialogShow.value = false;
}

const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})
const totalLength = ref<Number>()

const loadData = () => {
  loading.value = true
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    name: searchBarItems[0].value,
    leaderId: searchBarItems[1].value[0]
  }
  getTeacherGroup(args)
    .then((res) => {
      tableData.value = res.data.records
      totalLength.value = res.data.records.length
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })

}
loadData()

const confirmNewTeacherGroup = () => {
  createTeacherGroup(newTeacherGroupData)
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '成功',
          message: '已成功创建',
          type: 'success',
        })
        loadData()
        newTeacherGroupDialogShow.value = false
      } else {
        ElNotification({
          title: 'Warning',
          message: res.msg,
          type: 'warning'
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

const cancelNewTeacherGroup = () => {
  newTeacherGroupDialogShow.value = false
}
</script>

<template>
  <div class="div-teacher-group-management">
    <TablePage :loading="loading" class="table-page" :columns="tableColumns" :data="tableData"
      :itemsTotalLength="totalLength" @paginationChange="loadData">
      <div class="div-search-bar">
        <SearchBar :items="searchBarItems" @change="loadData()" />
      </div>
      <div class="table-div">
        <el-button class="new-teacher-group-button" type="primary" @click="creatNewTeacherGroup()">新建教研组</el-button>
      </div>
    </TablePage>
  </div>

  <el-dialog class="teacher-group-dialog" width="370px" v-model="newTeacherGroupDialogShow">
    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          <el-text style="color:#ff0000">*</el-text>
          教研组名称：
        </span>
        <el-input class="dialog-input" placeholder="请输入" v-model="newTeacherGroupData.name">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          <el-text style="color:#ff0000">*</el-text>
          教研组长：
        </span>
        <el-select class="dialog-input" placeholder="请输入" v-model="newTeacherGroupData.leaderId">
          <el-option v-for="item in allTeacher" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
    </div>
    <template #header>
      <el-text>新建教研组</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confirmNewTeacherGroup()">确定</el-button>
      <el-button @click="cancelNewTeacherGroup()">
        取消
      </el-button>
    </template>
  </el-dialog>

  <el-dialog class="teacher-group-dialog" width="370px" v-model="editTeacherGroupDialogShow">
    <div>

      <div class="div-input-element">
        <span class="dialog-span">
          教研组名称：
        </span>
        <el-input class="dialog-input" v-model="editTeacherGroupData.name">
        </el-input>
      </div>

      <div class="div-input-element">
        <span class="dialog-span">
          教研组组长：
        </span>
        <el-select class="dialog-input" v-model="editTeacherGroupData.leaderId">
          <el-option v-for="item in allTeacher" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>
    </div>
    <template #header>
      <el-text>编辑教研组</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confirmEditDialog()">确定</el-button>
      <el-button @click="cancelEditDialog()">
        取消
      </el-button>
    </template>
  </el-dialog>

  <el-dialog class="teacher-group-dialog" width="370px" v-model="deleteTeacherGroupDialogShow">
    <template #header>
      <el-text>确定删除教研组</el-text>
    </template>
    <span>
      {{ deleteTeacherGroupData.teacherGroupName }}
    </span>
    <template #footer>
      <el-button type="danger" @click="confirmDeleteDialog()">确定</el-button>
      <el-button @click="cancelDeleteDialog()">
        取消
      </el-button>
    </template>
  </el-dialog>
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

<style lang="scss">
.el-dialog__footer {
  border-top: 1px solid $element-header-color
}

.teacher-group-dialog {
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