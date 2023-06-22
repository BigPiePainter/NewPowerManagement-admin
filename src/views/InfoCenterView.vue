<script setup lang="tsx">
import RichTextEditor from '@/components/RichTextEditor.vue';
import { ref, reactive, } from 'vue'
import { ElButton } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
const router = useRouter()
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置', path: '' }, { name: '消息中心' }]


const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: '序号',
    width: 60
  },
  {
    dataKey: 'title',
    key: 'title',
    title: '标题',
    width: 300
  },
  {
    dataKey: 'context',
    key: 'context',
    title: '内容',
    width: 800
  },
  {
    dataKey: 'reciver',
    key: 'reciver',
    title: '接收对象',
    width: 100
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
    width: 70,
    fixed: 'right',
    align: 'center',
  }
]

let fakeData = {
  id: '1',
  title: '超级提高题',
  context: '超级打折超级打折超级打折超级打折超级打折超级打折',
  reciver: 'nick,mike'
}

const tableData: object[] = []

for (let index = 0; index < 2; index++) {
  let data = { ...fakeData }
  data.id += index
  tableData.push(data)
}

console.log(tableData)

const sendMsgDialogShow = ref(false)
const sendMsg = () => {
  sendMsgDialogShow.value = true
}

const msgContext = reactive({ title: '', recievers: '', richText: '' })
const confirmSendMsg = () => {
  console.log(msgContext)
  msgContext.title = ''
  msgContext.recievers = ''
  msgContext.richText = ''
}

const cancelSendMsg = () => {
  sendMsgDialogShow.value = false
  msgContext.title = ''
  msgContext.recievers = ''
  msgContext.richText = ''
}
</script>

<template>
  <TablePage class="msg-table" :columns="tableColumns" :data="tableData">
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
        <el-input class="dialog-input" placeholder="输入消息标题" v-model="msgContext.title">
        </el-input>
      </div>
      <div class="div-input-element">
        <span class="dialog-span">
          *接收对象：
        </span>
        <el-input class="dialog-input" placeholder="请选择消息接收对象" v-model="msgContext.recievers">
        </el-input>
      </div>
      <div>
        <span class="dialog-span">
          *消息内容：
        </span>
        <RichTextEditor></RichTextEditor>
        <!-- <el-input class="dialog-input" placeholder="请输入" v-model="msgContext.richText">
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
