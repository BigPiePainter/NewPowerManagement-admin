<script setup lang="tsx">
import RichTextEditor from '@/components/RichTextEditor.vue';
import { getMessages } from '@/apis/message';
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import SearchBar from '@/components/SearchBar.vue'
import { InputType } from '@/type'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
const router = useRouter()
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置', path: '' }, { name: '消息中心' }]

const loading = ref(true)
const totalLength = ref<Number>()
const paginationInfo = reactive({
  currentPage: 1,
  pageSize: 20
})
const receiverType = reactive([
  {id:'1', name:'学生'},
  {id:'2', name:'老师'},
  {id:'3', name:'后台'},
])
const searchBarItems = reactive([
  { name: '发送者', value: '' },
  { name: '标题', value: '' },
  {
    name: '接收者类型',
    value: '',
    type: InputType.Select,
    label: '请选择',
    options: receiverType
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
    width: 550
  },
  {
    dataKey: 'read',
    key: 'read',
    title: '已读',
    width: 50
  },
  {
    dataKey: 'unread',
    key: 'unread',
    title: '未读',
    width: 50
  },
  {
    dataKey: 'type',
    key: 'type',
    title: '接收者类型',
    width: 100
  },
  {
    dataKey: 'reciver',
    key: 'reciver',
    title: '接收对象',
    width: 80
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

const tableData: object[] = []

const sendMsgDialogShow = ref(false)
const sendMsg = () => {
  sendMsgDialogShow.value = true
}

const msgContent = reactive({ title: '', recievers: '', richText: '' })
const confirmSendMsg = () => {
  console.log(msgContent)
  msgContent.title = ''
  msgContent.recievers = ''
  msgContent.richText = ''
}

const cancelSendMsg = () => {
  sendMsgDialogShow.value = false
  msgContent.title = ''
  msgContent.recievers = ''
  msgContent.richText = ''
}

const dataCompute = (data: any) => {
  console.log(data)
}

const loadData = () => {
  loading.value = true
  var args = {
    pageNum: paginationInfo.currentPage,
    pageSize: paginationInfo.pageSize,
  }
  getMessages(args)
    .then((res) => {
      totalLength.value = res.data.records.totalLength
      dataCompute(res)
    })
    .catch()
    .finally(() => {
      loading.value = false
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
      <el-button @click="sendMsg" class="new-msg-button" type="primary">发消息</el-button>
    </div>
  </TablePage>

  <el-dialog class="send-msg-dialog" width="1000px" v-model="sendMsgDialogShow">
    <div>
      <div class="div-input-element">
        <span class="dialog-span">
          *消息标题：
        </span>
        <el-input class="dialog-input" placeholder="输入消息标题" v-model="msgContent.title">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *接收对象：
        </span>
        <el-input class="dialog-input" placeholder="请选择消息接收对象" v-model="msgContent.recievers">
        </el-input>
      </div>
      <div>
        <span class="dialog-span">
          *消息内容：
        </span>
        <RichTextEditor></RichTextEditor>
        <!-- <el-input class="dialog-input" placeholder="请输入" v-model="msgContent.richText">
        </el-input> -->
      </div>
    </div>
    <template #header>
      <el-text>发消息</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confirmSendMsg()">确定</el-button>
      <el-button @click="cancelSendMsg()">
        取消
      </el-button>
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
