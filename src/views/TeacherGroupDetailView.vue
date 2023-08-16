<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { useRoute } from 'vue-router'
import { ElCheckbox } from 'element-plus'
import { getTeacherGroupTeachers, addTeacherTogroup, deleteTeacherFromGroup } from '@/apis/teacherGroup'
import { getTeachers } from '@/apis/teacher'
import type { CheckboxValueType } from 'element-plus'


import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
  { name: '学校管理', path: '' },
  { name: '教研组管理', path: '/teacher-group-management' },
  { name: '教研组详情', path: '/teacher-group-detail' }
]

const route = useRoute()
const loading = ref(true)
const searchBarItems = reactive([
  { name: "姓名/用户名", value: "", },
])

const dialogSearchBarItems = reactive([
  { name: "用户名", value: "", },
  { name: "姓名", value: "", },
  { name: "电话", value: "", },
])

const dialogTableColumns = reactive<any>([
  {
    key: 'selection',
    width: 50,
    cellRenderer: (item: any) => {
      const onChange = (value: CheckboxValueType) => item.rowData.checked = value
      return <ElCheckbox modelValue={item.rowData.checked} onChange={onChange} />
    },
    headerCellRenderer: () => {
      const onChange = (value: CheckboxValueType) => {
        dialogTableData.value.forEach((i: any) => i.checked = value);
      }
      return <ElCheckbox onChange={onChange} modelValue={dialogTableData.value.every((i: any) => i.checked)} indeterminate={!dialogTableData.value.every((i: any) => i.checked) && dialogTableData.value.some((i: any) => i.checked)} />
    },
    checked: false,
  },
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 200
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '教师姓名',
    width: 200
  },
  {
    dataKey: 'account',
    key: 'account',
    title: '用户名',
    width: 200
  },
  {
    dataKey: 'subjectName',
    key: 'subjectName',
    title: '学科',
    width: 200
  },
])

const dialogTableData = ref<any>([])

const tableColumns = reactive<any>([
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 150
  },
  {
    dataKey: 'teacherName',
    key: 'teacherName',
    title: '教师姓名',
    width: 200
  },
  {
    dataKey: 'account',
    key: 'account',
    title: '用户名',
    width: 200
  },
  {
    dataKey: 'subjectName',
    key: 'subjectName',
    title: '学科',
    width: 200
  },
  {
    dataKey: 'createdAt',
    key: 'createdAt',
    title: '加入时间',
    width: 200
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <div>
          <el-popconfirm
            hide-after={0}
            width="170"
            title={`移除${item.rowData.id}`}
            onConfirm={() => preDeleteStu(item)}
            v-slots={{
              reference: () => (
                <el-button link type="primary">
                  移除
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


const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})

const dialogPaginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})

const totalLength = ref<Number>()
const dialogTotalLength = ref<Number>()

const loadDialogData = () => {
  loading.value = true
  var args = {
    pageNum: dialogPaginationInfo.currentPage,
    pageSize: dialogPaginationInfo.pageSize,
    account: dialogSearchBarItems[0].value,
    name: dialogSearchBarItems[1].value,
    phoneNumber: dialogSearchBarItems[2].value,
  }
  getTeachers(args)
    .then((res) => {
      console.log(dialogSearchBarItems)
      console.log(res)
      dialogTableData.value = res.data.records
      dialogTotalLength.value = res.data.records.length
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}

const loadData = () => {
  loading.value = true

  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    groupId: route.query.id,
    name: dialogSearchBarItems[0].value,
    phoneNumber: dialogSearchBarItems[0].value,
    account: dialogSearchBarItems[0].value,
  }
  getTeacherGroupTeachers(args)
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

console.log(route.query.id)
const tableData = ref<any>([])

const addTeacherDialogShow = ref(false);

const addTeacher = () => {
  loadDialogData()
  addTeacherDialogShow.value = true;
}

const newTeaData = ref<any>([])

const preDeleteStu = (item: any) => {
  tableData.value.forEach((i: any) => {
    if (i.id == item.rowData.id) {
      tableData.value.splice(tableData.value.indexOf(i), 1)
    }
    return
  })
  var note: any = ElNotification({
    title: '点击撤回',
    message: `撤回移除老师 ${item.rowData.teacherName}`,
    duration: 5000,
    onClick: () => {
      calcelDeleteTea(item)
      note.close()
    },
    onClose: () => deleteCS(item),
    type: 'warning'
  })
}

const deleteCS = (item: any) => {
  setTimeout(console.log, 0)
  deleteTeacherFromGroup({ id: item.rowData.id })
    .then((res: any) => {
      console.log(item.rowData.id)
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: item.rowData.id + '老师删除成功',
          type: 'success'
        })
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
        message: '老师未成功删除',
        type: 'error'
      })
    })
}

const calcelDeleteTea = (item: any) => {
  item.rowData.id = null
}

const confirmNewTeacher = () => {
  newTeaData.value = dialogTableData.value.filter((item: any) => item.checked)
  let data = newTeaData.value.map((item: any) => item.id)
  console.log(data)

  addTeacherTogroup({
    groupId: route.query.id,
    teacherIdArr: data
  }).then((res: any) => {
    if (res.code == '20000') {
      ElNotification({
        title: '成功',
        message: '添加老师成功',
        type: 'success'
      })
      addTeacherDialogShow.value = false
    } else {
      ElNotification({
        title: '失败',
        message: '添加老师失败',
        type: 'warning'
      })
    }

    loadData()
  }).catch
}

const cancelNewTeacher = () => {
  addTeacherDialogShow.value = false;
  dialogTableData.value.forEach((i: any) => i.checked = false);
}

</script>

<template>
  <div class="div-teacher-group-detail">
    <div class="card-left">

      <div class="div-card-left-title">
        <el-text style=";">
          基本信息
        </el-text>
      </div>

      <div class="div-card-left-detail">
        <div class="detail-info">
          <el-text class="el-text-detail">
            教研组名称：{{ route.query.name }}
          </el-text>
          <el-text class="el-text-detail">
            组长：{{ route.query.teacherName }}
          </el-text>
        </div>
      </div>
    </div>

    <div class="card-right">
      <TablePage :loading="loading" class="table-page" :columns="tableColumns" :itemsTotalLength="totalLength"
        @paginationChange="loadData" :data="tableData">
        <div class="div-search-bar">

          <SearchBar :items="searchBarItems" @change="loadData()"></SearchBar>

          <div style="flex-grow: 1"></div>

          <el-button class="search-bar-button" type="primary" @click="addTeacher()">添加成员</el-button>
        </div>
      </TablePage>
    </div>

  </div>

  <el-dialog class="teacher-group-detail-dialog" width="900px" v-model="addTeacherDialogShow">
    <TablePage class="dialog-table-page" @paginationChange="loadDialogData" :columns="dialogTableColumns"
      :itemsTotalLength="dialogTotalLength" :data="dialogTableData">
      <SearchBar class="dialog-search-bar" :items="dialogSearchBarItems" @change="loadDialogData()"></SearchBar>
    </TablePage>

    <template #header>
      <el-text>添加老师</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confirmNewTeacher()">确定</el-button>
      <el-button @click="cancelNewTeacher()">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
.div-teacher-group-detail {
  $card-left-width: 350px;
  height: $page-height;
  display: flex;

  >.card-left {
    width: $card-left-width;
    min-width: $card-left-width;
    max-width: $card-left-width;
    box-shadow: 0px 0px 10px 1px #e1e2e4;
    margin-right: $page-gap;

    >.div-card-left-title {
      margin-top: 20px;
      margin-left: 20px;
    }

    >.div-card-left-detail {
      margin-left: 20px;

      >.detail-info {
        display: flex;
        flex-direction: column;
        margin-top: 15px;
        justify-content: left;
      }

      >.detail-date {
        display: flex;
        flex-direction: column;
        margin-top: 25px;
      }

      >.detail-info>.el-text-detail,
      .detail-date>.el-text-detail {
        margin-top: 15px;
        align-self: flex-start;
      }


    }
  }

  >.card-right {
    width: calc($page-width - $card-left-width - $page-gap);
    box-shadow: 0px 0px 10px 1px #e1e2e4;
    padding-left: 20px;
    flex-grow: 1;

    >.table-page {
      height: $page-height;
      width: calc($page-width - $card-left-width - $page-gap - 20px);
    }
  }
}

.div-search-bar {
  display: flex;
  margin-top: 15px;
  margin-bottom: 15px;
  margin-right: 15px;

  >.search-bar-button {
    max-width: 70px;
    margin-left: 12px;
  }
}
</style>

<style lang="scss">
.el-dialog__footer {
  border-top: 1px solid $element-header-color;
  height: 50px;
}

.dialog-table-page {
  margin-bottom: 0;

  .dialog-search-bar {
    margin-right: 10px;
    margin-left: 10px;
    margin-bottom: 10px;
  }
}

.teacher-group-detail-dialog {
  >.el-dialog__body {
    height: 500px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding-bottom: 0;
    padding-left: 10px;
    padding-right: 5px;
    padding-top: 10px;

    >div {
      width: fit-content;
    }
  }
}
</style>
