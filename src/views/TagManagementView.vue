<script setup lang="tsx">
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { getLabels, createLabel, deleteLabel } from '@/apis/label'
import { ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'










const breadcrumbStore = useBreadcrumbStore()














const newLabelData = reactive<{

level: string,
name: string,
parentId: string,

}>({
level: '',
name: '',
parentId: ''
});


const labelData = reactive<any>([])



breadcrumbStore.data = [{ name: '设置' }, { name: '分类管理' }]


const loadData = () => {
  getLabels().then((res:any) => {
  labelData.length=0
    res.data.forEach((item:any)=>{
      labelData.push(item)
    })
  }).catch
}
loadData()



const allLevel = [

  {
    id: '1',
    name: '父级',
    value: 1
  },
  {
    id: '2',
    name: '子级',
    value: 2
  }
]



const confrimCreateNew = () => {
console.log(newLabelData)
  createLabel(newLabelData).then((res:any)=>{
    if(newLabelData.level=='1'){
      newLabelData.parentId=='1'
    }
    if (res.code == 20000) {
      console.log('添加成功')
      ElNotification({
          title: '成功',
          message: '标签新建成功',
          type: 'success'
        })
        loadData()
      } else {
        ElNotification({
          title: '添加失败',
          message: '添加失败'+res.msg,
          type: 'error'
        })
      }
      loadData()
      createDialogShow.value=false

  }).catch()
}


const createDialogShow = ref(false)












const deleteLab = (item: any) => {
  deleteLabel(item).then((res:any)=>{
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
          message: '删除失败'+res.msg,
          type: 'error'
        })
      }
      loadData()
      createDialogShow.value=false

  }).catch()
}




</script>

<template>
  <div class="sup-card">
    <div class="card-left">

      <div class="card-title-bar">
        <el-text>标签菜单</el-text>
        <div style="flex-grow: 1;"></div>
        <el-button type="primary">添加</el-button>
      </div>
      <div class="test">
        <el-scrollbar class="scrollbar">
          <div class="card-body" v-for="item in labelData" :key="item.name">
            <el-button link type="primary">{{ item.name }}</el-button>
            <div style="flex-grow: 1;"></div>
            <el-button link type="primary" @click="deleteLab(item.id)">删除</el-button>
          </div>
        </el-scrollbar>
      </div>
    </div>

    <div class="card-right">

      <div class="card-title-bar">
        <el-text>新标签：</el-text>
        <div style="flex-grow: 1;"></div>
        <el-button type="primary" @click="createDialogShow = true">添加</el-button>
      </div>

      <div class="card-body">
        <el-tag class="tag-item" v-for="item in labelData" :key="item.name">{{ item.name }}</el-tag>
      </div>

    </div>








  </div>



  <el-dialog class="new-class-dialog" width="370px" v-model="createDialogShow">
    <div class="div-input-element">
    </div>

    <div class="div-input-element" style="margin-top: 10px;">
      <el-text>
        层级：
      </el-text>
      <div>
        <el-select placeholder="例：初中为父级，初一为子级别" class="dialog-input" v-model="newLabelData.level" style="width: 256px;">
          <el-option v-for="item in allLevel" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>

      </div>

    </div>


    <div class="div-input-element" style="margin-top: 10px;">
      <el-text>
        标签名称：
      </el-text>
      <div>
        <el-input class="dialog-input" v-model="newLabelData.name" style="width: 256px;">
        </el-input>
      </div>
    </div>


    <div class="div-input-element" style="margin-top: 10px;"  v-if="newLabelData.level=='2'">
      <el-text>
        父级标签：
      </el-text>
      <div>
        <el-select type="datetime" placeholder="请选择" style="width:256px" v-model="newLabelData.parentId">
          <el-option v-for="item in labelData" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>
      </div>

    </div>

    <template #header>
      <el-text>添加学习阶段</el-text>
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
      margin: 20px;

      >.tag-item {
        line-height: 2;
        margin-bottom: 20px;
        margin-right: 20px;
      }
    }
  }
}
</style>