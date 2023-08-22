<script setup lang="tsx">
import { ref, reactive, } from 'vue'
import { ElButton } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getExamInfor, deleteExamInfor, createExamInfor } from '@/apis/examinfo'
import { ElNotification } from 'element-plus'

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置', path: '' }, { name: '考试咨询' }]

const loading = ref(true)

const tableData = ref<any>([])

const totalLength = ref<Number>()

const examInfoDialogShow = ref(false)
const examInfoContent = ref('')
const clickNew = () => {
  examInfoContent.value = ''
  examInfoDialogShow.value = true
}
const confirm = () => {
  createExamInfor({ content: examInfoContent.value })
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '创建成功',
          type: 'success'
        })
      } else {
        ElNotification({
          title: '创建失败',
          message: res.msg,
          type: 'error'
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
      examInfoDialogShow.value = false
      loadData()
    })
}

const deleteExamInfo = (item: any) => {
  deleteExamInfor({ id: item.rowData.id })
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '删除成功',
          type: 'success'
        })
      } else {
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
      loadData()
    })
}

const tableColumns = reactive<any>([
  {
    dataKey: 'content',
    key: 'content',
    title: '资讯内容',
    width: 500
  },
  {
    dataKey: 'createdAt',
    key: 'createdAt',
    title: '资讯时间',
    width: 500
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <>
          {/* <el-button link type="primary" onClick={() => console.log(item)}>
            编辑
          </el-button> */}
          <el-button link type="danger" onClick={() => deleteExamInfo(item)}>
            删除
          </el-button>
        </>
      )
    },
    width: 150,
    fixed: 'right',
    align: 'center',
    height: 500
  }
])

const loadData = () => {
  loading.value = true
  getExamInfor()
    .then((res) => {
      tableData.value = res.data
      totalLength.value = res.data.length
    })
    .catch(() => { })
    .finally(() => {
      loading.value = false
    })
}
loadData()
</script>

<template>
  <TablePage :loading="loading" class="info-table" :columns="tableColumns" :data="tableData">
    <div>
      <el-button @click="clickNew" class="new-info-button" type="primary">新增</el-button>
    </div>
  </TablePage>

  <el-dialog width="400px" v-model="examInfoDialogShow">
    <div style="white-space:nowrap;">
      <span>
        *资讯内容：
      </span>
      <el-input style="max-width: 250px;" v-model="examInfoContent" placeholder="请输入"></el-input>
    </div>
    <template #header>
      <el-text>创建考试咨询</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confirm()">确定</el-button>
      <el-button @click="examInfoDialogShow = false">
        取消
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
$gap: 15px;

.info-table {
  width: calc($page-width - $gap);
  height: calc($page-height - $gap);
  margin-left: $gap;
  margin-top: $gap;

  .new-info-button {
    margin-left: $gap;
    margin-bottom: $gap;
  }
}
</style>
