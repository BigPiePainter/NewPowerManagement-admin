<script setup lang="tsx">
import { ref, reactive } from 'vue'
import type { ElButton } from 'element-plus'
import { ElNotification } from 'element-plus'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import TablePage from '@/components/TablePage.vue'
import { getMiniLessons, editMiniLessons, deleteMiniLessons } from '@/apis/minilessons'
import { videoToUrl } from '@/apis/videoIdToUrl'

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '课程管理' }, { name: '微课审核' }]
const author = JSON.parse(localStorage.author)
const activeName = ref('pending')
const totalLength1 = ref<Number>()
const totalLength2 = ref<Number>()
const totalLength3 = ref<Number>()
const auditStatus = ref<Number>(1)
const warningDialogshow = ref(false)

const loading1 = ref(false)
const loading2 = ref(false)
const loading3 = ref(false)
const paginationInfo1 = reactive({
  currentPage: 1,
  pageSize: 20
})
const paginationInfo2 = reactive({
  currentPage: 1,
  pageSize: 20
})
const paginationInfo3 = reactive({
  currentPage: 1,
  pageSize: 20
})

const videoShow = ref(false)
const url = ref<any>('')
const playVideo = (videoId: any) => {
  var args = { videoId: videoId }
  console.log(args)
  videoToUrl(args).then((res: any) => {
    console.log(res)
    url.value = res.playURL
    videoShow.value = true
  })
}

const editDialogShow = ref(false);

const editCourseData = reactive<any>({
  id: '',
  name: ''
});

const changeTrial = (item: any) => {
  var args = {
    id: item.rowData.id,
    isTrial: item.rowData.isTrial
  }
  console.log(args)
  editMiniLessons(args)
    .then((res: any) => {
      if (res.code != 20000) {
        ElNotification({
          title: '编辑失败',
          message: res.msg,
          type: 'error'
        })
      } else {
        ElNotification({
          title: '成功',
          message: '编辑成功',
          type: 'success'
        })
      }
    })
    .catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'error'
      })
    })
    .finally(() => {
      if (auditStatus.value == 1) {
        loadPendingData()
      } else if (auditStatus.value == 3) {
        loadApprovalData()
      } else if (auditStatus.value == 4) {
        loadRejctData()
      }
    })
}

const changeTrialDuration = (item: any) => {
  var args = {
    id: item.rowData.id,
    trialDuration: item.rowData.trialDuration
  }
  console.log(args)
  if (item.cellData > item.rowData.videoDuration) {
    ElNotification({
      title: '编辑失败',
      message: '试看时长不可大于总时长',
      type: 'error'
    })
  } else {
    editMiniLessons(args)
      .then((res: any) => {
        if (res.code != 20000) {
          ElNotification({
            title: '编辑失败',
            message: res.msg,
            type: 'error'
          })
        } else {
          ElNotification({
            title: '成功',
            message: '编辑成功',
            type: 'success'
          })
        }
      }).catch((res: any) => {
        ElNotification({
          title: '未知错误',
          message: res.msg,
          type: 'error'
        })
      }).finally(() => {
        if (auditStatus.value == 1) {
          loadPendingData()
        } else if (auditStatus.value == 3) {
          loadApprovalData()
        } else if (auditStatus.value == 4) {
          loadRejctData()
        }
      })
  }
}

const tableColumnsPending = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 180
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '标题',
    cellRenderer: (cellData: any) => {
      return (
        <div>
          <el-button link type="primary" onClick={() => playVideo(cellData.rowData.videoId)}> {cellData.cellData}</el-button>
        </div>
      )
    },
    width: 200
  },
  {
    dataKey: 'teacherName',
    key: 'teacherName',
    title: '上传者',
    align: 'center',
    width: 100
  },
  {
    dataKey: 'isTrial',
    key: 'isTrial',
    title: '是否支持试看',
    align: 'center',
    width: 100,
    cellRenderer: (cellData: any) => {
      return (
        <div>
          <el-switch
            disabled={!author.miniLessonEdit}
            v-model={cellData.rowData.isTrial}
            active-value={1}
            inactive-value={2}
            onChange={() => changeTrial(cellData)}
            inline-prompt
            active-text="是"
            inactive-text="否"
          />
        </div>
      )
    }
  },
  {
    dataKey: 'trialDuration',
    key: 'trialDuration',
    title: '试看时长(秒)',
    align: 'center',
    width: 200,
    cellRenderer: (cellData: any) => {
      const slots = {
        append: () =>
          <el-button disabled={cellData.rowData.isTrial == 2 && !author.miniLessonEdit ? true : false} onClick={() => changeTrialDuration(cellData)}>设置</el-button>
      }
      return (
        <div>
          <el-input disabled={cellData.rowData.isTrial == 2 && !author.miniLessonEdit ? true : false} style='width:120px' v-model={cellData.rowData.trialDuration} type='number' step={1} min={0} max={cellData.rowData.videoDuration} v-slots={slots}>
          </el-input>
        </div>
      )
    }
  },
  {
    dataKey: 'videoDuration',
    key: 'videoDuration',
    title: '时长(秒)',
    align: 'center',
    cellRenderer: (cellData: any) => {
      return (
        <span>{cellData.cellData}</span>
      )
    },
    width: 100
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (cellData: any) => {
      if (auditStatus.value == 1) {
        return (
          <>
            <el-button disabled={!author.miniLessonEdit} link type="primary" onClick={() => pass(cellData)}>
              通过
            </el-button>
            <el-button disabled={!author.miniLessonEdit} link type="primary" onClick={() => reject(cellData)}>
              拒绝
            </el-button>
            <el-button disabled={!author.miniLessonEdit} link type="primary" onClick={() => edit(cellData)}>
              编辑
            </el-button>
            <el-button disabled={!author.miniLessonEdit} link type="danger" onClick={() => warningDialog(cellData)}>
              删除
            </el-button>
          </>
        )
      } else if (auditStatus.value == 3) {
        return (
          <>
            <el-button disabled={!author.miniLessonEdit} link type="primary" onClick={() => reject(cellData)}>
              拒绝
            </el-button>
            <el-button disabled={!author.miniLessonEdit} link type="primary" onClick={() => edit(cellData)}>
              编辑
            </el-button>
            <el-button disabled={!author.miniLessonEdit} link type="danger" onClick={() => warningDialog(cellData)}>
              删除
            </el-button>
          </>
        )
      } else if (auditStatus.value == 4) {
        return (
          <>
            <el-button disabled={!author.miniLessonEdit} link type="primary" onClick={() => pass(cellData)}>
              通过
            </el-button>
            <el-button disabled={!author.miniLessonEdit} link type="primary" onClick={() => edit(cellData)}>
              编辑
            </el-button>
            <el-button disabled={!author.miniLessonEdit} link type="danger" onClick={() => warningDialog(cellData)}>
              删除
            </el-button>
          </>
        )
      }
    },
    width: 200,
    fixed: 'right',
  }
]

const pass = (item: any) => {
  editMiniLessons({ id: item.rowData.id, auditStatus: 3, })
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '审核通过',
          type: 'success'
        })
      } else {
        ElNotification({
          title: '状态更改失败',
          message: res.msg,
          type: 'error'
        })
      }
    }).catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'error'
      })
    }).finally(() => {
      if (auditStatus.value == 1) {
        loadPendingData()
      } else if (auditStatus.value == 3) {
        loadApprovalData()
      } else if (auditStatus.value == 4) {
        loadRejctData()
      }
    })
}

const reject = (item: any) => {
  editMiniLessons({ id: item.rowData.id, auditStatus: 4, })
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '已拒绝',
          type: 'success'
        })
      } else {
        ElNotification({
          title: '状态更改失败',
          message: res.msg,
          type: 'error'
        })
      }
    }).catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'error'
      })
    }).finally(() => {
      if (auditStatus.value == 1) {
        loadPendingData()
      } else if (auditStatus.value == 3) {
        loadApprovalData()
      } else if (auditStatus.value == 4) {
        loadRejctData()
      }
    })
}

const edit = (props: any) => {
  editCourseData.id = props.rowData.id;
  editCourseData.name = props.rowData.name;
  console.log(props)
  editDialogShow.value = true;
}

const confirmEditDialog = () => {
  editMiniLessons(editCourseData).then((res: any) => {
    if (res.code == 20000) {
      ElNotification({
        title: '成功',
        message: '已成功编辑',
        type: 'success'
      })
      editDialogShow.value = false;
    } else {
      ElNotification({
        title: '编辑失败',
        message: res.msg,
        type: 'warning'
      })
    }
  }).catch((res: any) => {
    ElNotification({
      title: '未知错误',
      message: res.msg,
      type: 'error'
    })
  }).finally(() => {
    if (auditStatus.value == 1) {
      loadPendingData()
    } else if (auditStatus.value == 3) {
      loadApprovalData()
    } else if (auditStatus.value == 4) {
      loadRejctData()
    }
  })
}

const cancelEditDialog = () => {
  editDialogShow.value = false;
}

const tableDataPending = ref<any>([])

const tableDataApproved = ref<any>([])

const tableDataRejected = ref<any>([])
const pageChange1 = (val: any) => {
  paginationInfo1.currentPage = val.currentPage
  paginationInfo1.pageSize = val.pageSize
  loadPendingData()
}
const pageChange2 = (val: any) => {
  paginationInfo2.currentPage = val.currentPage
  paginationInfo2.pageSize = val.pageSize
  loadApprovalData()
}
const pageChange3 = (val: any) => {
  paginationInfo3.currentPage = val.currentPage
  paginationInfo3.pageSize = val.pageSize
  loadRejctData()
}
const loadPendingData = () => {
  loading1.value = true
  var args = {
    pageNum: paginationInfo1.currentPage,
    pageSize: paginationInfo1.pageSize,
    auditStatus: 1
  }
  getMiniLessons(args)
    .then((res) => {
      tableDataPending.value = res.data.records
      totalLength1.value = res.data.total
    })
    .catch(() => { })
    .finally(() => {
      loading1.value = false
    })
}
loadPendingData()

const loadApprovalData = () => {
  loading2.value = true
  var args = {
    pageNum: paginationInfo2.currentPage,
    pageSize: paginationInfo2.pageSize,
    auditStatus: 3,
  }
  getMiniLessons(args)
    .then((res) => {
      tableDataApproved.value = res.data.records
      totalLength2.value = res.data.total
    })
    .catch(() => { })
    .finally(() => {
      loading2.value = false
    })
}

const loadRejctData = () => {
  loading3.value = true
  var args = {
    pageNum: paginationInfo3.currentPage,
    pageSize: paginationInfo3.pageSize,
    auditStatus: 4,
  }
  getMiniLessons(args)
    .then((res) => {
      tableDataRejected.value = res.data.records,
        totalLength3.value = res.data.total
    })
    .catch(() => { })
    .finally(() => {
      loading3.value = false
    })
}

const deleteItemid = ref<any>()

const warningDialog = (cellData2: any) => {
  console.log(cellData2)
  warningDialogshow.value = true
  deleteItemid.value = cellData2
  console.log(deleteItemid.value)
}

const ConfirmdeleteMiniLesson = () => {
  deleteMiniLessons({ id: deleteItemid.value.rowData.id })
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '已删除',
          type: 'success'
        })
      }
      else {
        ElNotification({
          title: '删除失败',
          message: res.msg,
          type: 'error'
        })
      }
    }).catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'error'
      })
    }).finally(() => {
      warningDialogshow.value = false
      if (auditStatus.value == 1) {
        loadPendingData()
      } else if (auditStatus.value == 3) {
        loadApprovalData()
      } else if (auditStatus.value == 4) {
        loadRejctData()
      }
    })
}

const handleClick = (tab: any) => {
  if (tab.props.name == 'pending') {
    auditStatus.value = 1
    loadPendingData()
  }
  else if (tab.props.name == 'approved') {
    auditStatus.value = 3
    loadApprovalData()
  }
  else if (tab.props.name == 'rejected') {
    auditStatus.value = 4
    loadRejctData()
  }
}
</script>

<template>
  <div class="">
    <el-tabs v-model="activeName" class="tabs-page" @tab-click="handleClick">
      <el-tab-pane label="待审核" name="pending">
        <TablePage :loading="loading1" class="tabs-page-table" :itemsTotalLength="totalLength1"
          @paginationChange="pageChange1" :columns="tableColumnsPending" :data="tableDataPending"></TablePage>
      </el-tab-pane>
      <el-tab-pane label="已通过" name="approved">
        <TablePage :loading="loading2" class="tabs-page-table" :itemsTotalLength="totalLength2"
          @paginationChange="pageChange2" :columns="tableColumnsPending" :data="tableDataApproved"></TablePage>
      </el-tab-pane>
      <el-tab-pane label="未通过" name="rejected">
        <TablePage :loading="loading3" class="tabs-page-table" :itemsTotalLength="totalLength3"
          @paginationChange="pageChange3" :columns="tableColumnsPending" :data="tableDataRejected"></TablePage>
      </el-tab-pane>
    </el-tabs>
  </div>

  <el-dialog class="new-class-dialog" width="370px" v-model="editDialogShow">
    <div class="div-input-element">
      <span class="dialog-span">
        <el-text disabled class="dialog-input" v-model="editCourseData.id">
        </el-text>
      </span>
    </div>

    <div class="div-input-element">
      <span class="dialog-span">
        课程名称：
      </span>
      <el-input filterable class="dialog-input" style="width: 220px;" v-model="editCourseData.name">
      </el-input>
    </div>

    <template #header>
      <el-text>更改微课名称</el-text>
    </template>

    <template #footer>
      <el-button type="primary" @click="confirmEditDialog()">确定</el-button>
      <el-button @click="cancelEditDialog()">
        取消
      </el-button>
    </template>
  </el-dialog>

  <el-dialog v-model="warningDialogshow" title="Warning" width="30%" center>
    <el-text disabled style="display: flex;align-items: center;justify-content: center;">
      是否确认删除课程
    </el-text>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="warningDialogshow = false">取消</el-button>
        <el-button type="primary" @click="ConfirmdeleteMiniLesson">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>

  <el-dialog style="height: 1000px;width: 1650px;" v-model="videoShow">
    <video v-if="videoShow" style="height: 900px;width: 1600px;" :src="url" controls autoplay></video>
  </el-dialog>
</template>

<style scoped lang="scss">
$gap: 15px;

.tabs-page {
  padding-left: 30px;
  padding-top: 10px;
  height: $page-height;
  box-sizing: border-box;

  .tabs-page-table {
    height: calc($page-height - 54px - 10px);
  }
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

.ARMbutton {
  margin-top: $gap;
}

.header {
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
        margin: 10px;

        >.dialog-span {
          margin-right: 10px;
          margin: 10px
        }

        >.dialog-input {
          width: 100px;
          margin: 10px;
        }
      }
    }
  }
}
</style>
