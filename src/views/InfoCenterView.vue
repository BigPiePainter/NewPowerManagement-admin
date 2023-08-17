<script setup lang="tsx">
import RichTextEditor from '@/components/RichTextEditor.vue';
import { getMessages, createMessage } from '@/apis/message';
import { ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'
import { ElButton } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import SearchBar from '@/components/SearchBar.vue'
import { InputType } from '@/type'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getAllTeachers } from '@/apis/teacher'
import { getAllStudents } from '@/apis/student'
import { userInfo } from '@/apis/manager';

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置', path: '' }, { name: '消息中心' }]

const loading = ref(true)
const totalLength = ref<Number>()
const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})
const receiverType = reactive([
  { id: '1', name: '学生' },
  { id: '2', name: '老师' },
  { id: '3', name: '后台' },
])
const searchBarItems = reactive([
  { name: '发送者', value: '' },
  { name: '标题', value: '' },
  {
    name: '接收者类型',
    value: '',
    type: InputType.Select,
    label: '请选择',
    options: receiverType,
    string: true
  }
])

const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 50
  },
  {
    dataKey: 'title',
    key: 'title',
    title: '标题',
    width: 250
  },
  {
    dataKey: 'content',
    key: 'content',
    title: '内容',
    width: 450
  },
  {
    dataKey: 'type',
    key: 'type',
    title: '接收者类型',
    cellRenderer: (item: any) => {
      return (
        <>
          <span>{item.rowData.type == 1 ? '学生' : '老师'}</span>
        </>
      )
    },
    width: 90
  },
  {
    dataKey: 'receiverList',
    key: 'receiverList',
    title: '接收对象',
    cellRenderer: (item: any) => {
      return (
        <>
          <ElButton type="primary" onClick={() => receiverListDialog(item.rowData)}>查看接收对象</ElButton>
        </>
      )
    },
    width: 140
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      return (
        <>
          <el-button link type="danger" onClick={() => console.log(item)}>
            删除
          </el-button>
        </>
      )
    },
    width: 50,
    fixed: 'right',
    align: 'center',
  }
]

const recieverListTableData = reactive<any>([])
const receiverListDialogShow = ref(false)
const recieverListDialogColumn = reactive([
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 150
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '姓名',
    cellRenderer: (item: any) => {
      if (item.rowData.isRead) {
        return (
          <>
            <span>{item.rowData.name + ' '}<el-tag>已读</el-tag></span>
          </>
        )
      } else {
        return (
          <>
            <span>{item.rowData.name + ' '}<el-tag type="danger">未读</el-tag></span>
          </>
        )
      }
    },
    width: 350,
    align: 'center'
  },
])

const readNum = ref<number>(0)
const unReadNum = ref<number>(0)
const receiverListDialog = (data: any) => {
  recieverListTableData.length = 0
  readNum.value = 0
  unReadNum.value = 0
  data.receiverList.forEach((item: any) => {
    if (item.isRead == true) {
      readNum.value = readNum.value + 1
      console.log(1)
    } else {
      unReadNum.value = unReadNum.value + 1
      console.log(2)
    }
    console.log(3)
    recieverListTableData.push(item)
  })
  console.log(recieverListTableData)
  console.log(readNum)
  console.log(unReadNum)
  receiverListDialogShow.value = true
}

const tableData = reactive([])

const allTeachers = reactive([])
const allStudents = reactive([])
const userId = ref<any>('')
const sendMsgDialogShow = ref(false)
const sendMsg = () => {
  recieverTypeDialog.value = false
  userInfo()
    .then((res: any) => {
      userId.value = res.data.id
      return getAllStudents()
    })
    .then((res: any) => {
      allStudents.length = 0
      res.data.forEach((item: any) => {
        allStudents.push(item)
      })
      return getAllTeachers()
    })
    .then((res: any) => {
      allTeachers.length = 0
      res.data.forEach((item: any) => {
        allTeachers.push(item)
      })
    })
  sendMsgDialogShow.value = true
}

// const msgContent = reactive({ title: '', recievers: '', richText: '' })
// const confirmSendMsg = () => {
//   console.log(msgContent)
//   msgContent.title = ''
//   msgContent.recievers = ''
//   msgContent.richText = ''
// }

const cancelSendMsg = () => {
  sendMsgDialogShow.value = false
}

const dataCompute = (data: any) => {
  console.log(data)
  data.data.records.forEach((item: any) => {
    var sampleData = {
      id: item.id,
      senderId: item.senderId,
      type: item.type,
      title: item.title,
      content: item.content,
      receiverList: []
    }
    item.receiverList.forEach((i: any) => {
      if (item.readList.indexOf(i) != -1) {
        sampleData.receiverList.push({ id: i.id, name: i.name, isRead: true })
      } else {
        sampleData.receiverList.push({ id: i.id, name: i.name, isRead: false })
      }
    })
    tableData.push(sampleData)
  })
  console.log(tableData)
}

const loadData = () => {
  loading.value = true
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
    title: '',
    type: '',
    content: ''
  }
  getMessages(args)
    .then((res) => {
      totalLength.value = res.total
      dataCompute(res)
    })
    .catch()
    .finally(() => {
      loading.value = false
    })
}
loadData()

const recieverTypeDialog = ref(false)
const msgCtx = ref('')
const receiverIds = ref('')
const receiverIdArr = ref<any>([])
const title = ref('')
const type = ref<number>()
const change = (val: any) => {
  msgCtx.value = val
}

const createMsg = () => {
  receiverIds.value = ''
  receiverIdArr.value.forEach((item: any) => {
    receiverIds.value = receiverIds.value + item + ','
  })
  var args = {
    content: msgCtx.value,
    receiverIds: receiverIds.value,
    senderId: userId.value,
    title: title.value,
    type: type.value,
  }
  createMessage(args)
    .then((res: any) => {
      if (res.code != 20000) {
        ElNotification({
          title: 'Warning',
          message: res.msg,
          type: 'warning'
        })
      } else {
        ElNotification({
          title: '发送成功',
          type: 'success'
        })
      }
    })
}
</script>

<template>
  <TablePage class="msg-table" :loading="loading" :itemsTotalLength="totalLength" @paginationChange="loadData"
    :columns="tableColumns" :data="tableData">
    <div class="div-search-bar">
      <SearchBar :items="searchBarItems" @change="loadData"></SearchBar>
    </div>
    <div>
      <el-button @click="recieverTypeDialog = true" style="margin-top: 15px;" class="new-msg-button"
        type="primary">发消息</el-button>
    </div>
  </TablePage>

  <el-dialog class="send-msg-dialog" width="1000px" v-model="sendMsgDialogShow">
    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          *消息标题：
        </span>
        <el-input class="dialog-input" placeholder="输入消息标题" v-model="title">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *接收对象：
        </span>
        <div v-if="type == 1">
          <el-select filterable multiple class="dialog-input" placeholder="请选择消息接收对象" v-model="receiverIdArr">
            <el-option v-for="item in allStudent" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </div>
        <div v-else-if="type == 2">
          <el-select filterable multiple class="dialog-input" placeholder="请选择消息接收对象" v-model="receiverIdArr">
            <el-option v-for="item in allTeachers" :key="item.id" :label="item.name" :value="item.id" />
          </el-select>
        </div>
      </div>
      <div>
        <span class="dialog-span">
          *消息内容：
        </span>
        <RichTextEditor :isShow="true" @change="change"></RichTextEditor>
        <!-- <el-input class="dialog-input" placeholder="请输入" v-model="msgContent.richText">
        </el-input> -->
      </div>
    </div>
    <template #header>
      <el-text>发消息</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="createMsg()">确定</el-button>
      <el-button @click="cancelSendMsg()">
        取消
      </el-button>
    </template>
  </el-dialog>

  <el-dialog width="640px" v-model="receiverListDialogShow">
    <el-table-v2 :header-height="0" :columns="recieverListDialogColumn" :data="recieverListTableData" :width="610"
      :height="550" />
    <template #header>
      <el-text>接收者 已读{{ readNum }}人 未读{{ unReadNum }}人</el-text>
    </template>
    <template #footer>
      <el-button @click="receiverListDialogShow.value = false">
        关闭
      </el-button>
    </template>
  </el-dialog>

  <el-dialog style="align:center" width="200px" v-model="recieverTypeDialog">
    <div style="display:flex">
      <el-button type="primary" @click="{ type = 2; sendMsg() }">老师</el-button>
      <el-button type="primary" @click="{ type = 1; sendMsg() }">学生</el-button>
    </div>
    <template #header>
      <el-text>选择消息接收对象</el-text>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
$gap: 15px;

.msg-table {
  width: calc($page-width - $gap);
  height: $page-height;
  margin-left: $gap;
  margin-top: $gap;

  .new-msg-button {
    margin-left: $gap;
    margin-bottom: $gap;
  }
}
</style>

<style lang="scss">
.send-msg-dialog {
  >.el-dialog__body {

    display: flex;
    align-items: center;
    flex-direction: column;

    >div {
      width: fit-content;

      >.div-input-element {
        display: flex;
        align-items: center;
        justify-content: left;
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
