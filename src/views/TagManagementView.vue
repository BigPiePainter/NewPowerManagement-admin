<script setup lang="tsx">
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getLabels, createLabel, deleteLabel } from '@/apis/label'
import { ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置' }, { name: '标签管理' }]

const author = JSON.parse(localStorage.author)
const labelData = reactive<any>([])
const supLabels = reactive<any>([])
const subLabels = reactive<any>([])
const supLabelId = ref()
const changeSupLabelId = (id: any) => {
  supLabelId.value = id
}

const loadData = () => {
  getLabels().then((res: any) => {
    labelData.length = 0
    res.data.forEach((item: any) => {
      labelData.push(item)
    })
    dataCompute(labelData)
  }).catch
}

const dataCompute = (props: any) => {
  supLabels.length = 0
  subLabels.length = 0
  props.forEach((label: any) => {
    if (label.level == 1) {
      supLabels.push(label)
    } else if (label.level == 2) {
      subLabels.push(label)
    }
  })
}

const loadDataCreate = () => {
  getLabels().then((res: any) => {
    labelData.length = 0
    res.data.forEach((item: any) => {
      labelData.push(item)
    })
    dataComputeCreate(labelData)
  }).catch
}
loadDataCreate()

const dataComputeCreate = (props: any) => {
  supLabels.length = 0
  subLabels.length = 0
  props.forEach((label: any) => {
    if (label.level == 1) {
      supLabels.push(label)
    } else if (label.level == 2) {
      subLabels.push(label)
    }
  })
  supLabelId.value = supLabels[0].id
  console.log(supLabelId)
}

const createLabelInfo = reactive<any>({
  parentId: '',
  level: '',
  name: ''
})
const addSupLabel = () => {
  createLabelInfo.parentId = 1
  createLabelInfo.level = 1
  createLabelInfo.name = ''
  createDialogShow.value = true
}
const addSubLabel = () => {
  createLabelInfo.parentId = supLabelId
  createLabelInfo.level = 2
  createLabelInfo.name = ''
  createDialogShow.value = true
}

const confrimCreateNew = () => {
  console.log(createLabelInfo)
  createLabel(createLabelInfo).then((res: any) => {
    if (res.code == 20000) {
      console.log('添加成功')
      ElNotification({
        title: '成功',
        message: '标签添加成功',
        type: 'success'
      })
      loadData()
      createDialogShow.value = false
    } else {
      ElNotification({
        title: '添加失败',
        message: res.msg,
        type: 'error'
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

const createDialogShow = ref(false)

const deleteLab = (item: any) => {
  deleteLabel(item).then((res: any) => {
    if (res.code == 20000) {
      console.log('删除成功')
      ElNotification({
        title: '成功',
        message: '标签删除成功',
        type: 'success'
      })
      loadData()
    } else {
      ElNotification({
        title: '删除失败',
        message: res.msg,
        type: 'error'
      })
    }
    loadData()
    createDialogShow.value = false
  }).catch()
}
</script>

<template>
  <div class="sup-card">
    <div class="card-left">

      <div class="card-title-bar">
        <el-text>一级标签菜单</el-text>
        <div style="flex-grow: 1;"></div>
        <el-button :disabled="!author.tagEdit" type="primary" @click="addSupLabel">添加</el-button>
      </div>
      <div class="test">
        <el-scrollbar class="scrollbar">
          <div class="card-body" v-for="item in supLabels" :key="item.name">
            <el-button color="#e2e5ec" style="flex-grow: 1;" v-if="item.id == supLabelId ? true : false"
              @click="changeSupLabelId(item.id)">{{
                item.name
              }}</el-button>
            <el-button style="flex-grow: 1;" v-if="item.id == supLabelId ? false : true" text
              @click="changeSupLabelId(item.id)">{{
                item.name
              }}</el-button>
            <div style="flex-grow: 1;"></div>
            <el-button :disabled="!author.tagEdit" link type="danger" @click="deleteLab(item.id)">删除</el-button>
          </div>
        </el-scrollbar>
      </div>
    </div>

    <div class="card-right">

      <div class="card-title-bar">
        <el-text>二级标签菜单</el-text>
        <div style="flex-grow: 1;"></div>
        <el-button :disabled="!author.tagEdit" type="primary" @click="addSubLabel">添加</el-button>
      </div>

      <div class="card-body">
        <div class="tag-item" v-for="item in subLabels" :key="item.id">
          <el-tag closable @close="deleteLab(item.id)" v-if="item.parentId == supLabelId">{{
            item.name }}</el-tag>
        </div>
      </div>
    </div>
  </div>

  <el-dialog width="370px" v-model="createDialogShow">
    <div class="div-input-element" style="margin-top: 10px;">
      <el-text style="color: #ff0000;">
        *
      </el-text>
      <el-text style="width: 70px;">
        标签名称：
      </el-text>
      <div>
        <el-input style="margin-left: 10px;" v-model="createLabelInfo.name">
        </el-input>
      </div>
    </div>
    <template #header>
      <el-text>添加标签</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confrimCreateNew()">确定</el-button>
      <el-button @click="createDialogShow = false">
        取消
      </el-button>
    </template>

  </el-dialog>
</template>

<style scoped lang="scss">
.div-input-element {
  display: flex;
  flex-direction: row;
}

.sup-card {
  $gap: 15px;
  height: $page-height;
  display: flex;

  >.card-left {
    width: calc(($page-width - $page-gap) / 5);
    margin-right: $page-gap;
    box-shadow: 0px 0px 10px 1px #e1e2e4;
    flex-grow: 1;

    >.card-title-bar {
      margin: 10px;
      display: flex;
    }

    >.test {
      height: calc($page-height - 55px);
      width: calc(($page-width - $page-gap) / 4 - 45px);
      margin: 10px;

      >.scrollbar {
        .card-body {
          width: calc(($page-width - $page-gap) / 4 - 60px);
          display: flex;
          margin-bottom: 10px;
        }
      }
    }
  }

  >.card-right {
    width: calc(($page-width - $page-gap) / 4 * 3);
    box-shadow: 0px 0px 10px 1px #e1e2e4;
    flex-grow: 1;

    >.card-title-bar {
      margin: 10px;
      display: flex;

      >.el-input {
        width: 500px
      }

      >.el-button {
        margin-right: 20px
      }
    }

    >.card-body {
      margin: 10px;
      display: flex;

      >.tag-item {
        line-height: 2;
        margin-bottom: 3px;
        margin-right: 5px;
      }
    }
  }
}
</style>