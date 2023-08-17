<script setup lang="tsx">
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { ref, reactive } from 'vue'
import { getGrades, createGrades, deleteGrades } from '@/apis/grade'
import { getSubjects } from '@/apis/subject';
import { ElNotification } from 'element-plus'
import { createSubject, deleteSubject } from '@/apis/subject'



const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置' }, { name: '分类管理' }]


const allTheGrades = ref<any>([])
const allGrades = ref<any[]>([])
const createSubjectDialogShow = ref(false)



const newSubjectdata = reactive<{

name: string

}>({
name: ''
});

const loadGrade = () => {
  getGrades().then((res: any) => {
    allGrades.value = res.data
    console.log(res)
  }).catch()
}

getGrades()
  .then((res) => (allTheGrades.value = res.data.map((i: any) => i.subset).flat()))
  .catch()

const loadData = () => {
  loadGrade()
  getGrades()

}

loadData()


const newGradedata = reactive<{

  level: string,
  name: string,
  parentId: string,

}>({
  level: '',
  name: '',
  parentId: ''
});

const createDialogShow = ref(false)

const createNew = () => {
  createDialogShow.value = true
}

const confrimCreateNew = () => {
  loadData()
  createGrades(newGradedata).then((res: any) => {
    if (res.code == 20000) {
      ElNotification({
        title: '成功',
        message: '已成功创建',
        type: 'success'
      })
      createDialogShow.value = false
      loadData()
    }
    else {
      ElNotification({
        title: '失败',
        message: '创建失败',
        type: 'warning'
      })
    }
  }).catch()
}

const major = ref<any[]>([])




const deletDialogShow = ref(false)

getSubjects().then((res) =>
  major.value = res.data).catch()



console.log(major.value)
const allLevel = [
  {
    id: 2,
    name: '子级学习阶段'
  }
]




const deleteGradeData = reactive<{
  id: string,
}>({
  id: '',
});

const deleteSubjectdata = reactive<{
  id: string,
}>({
  id: '',
});




const confrimDeleteSub = () => {
  deleteSubject(deleteSubjectdata).then((res: any) => {
    if (res.code == 20000) {
      ElNotification({
        title: '成功',
        message: '已成功删除',
        type: 'success'
      })
      deletSubDialogShow.value = false
      getSubjects().then((res) =>
  major.value = res.data).catch()

    }

    else {
      ElNotification({
        title: '失败',
        message: '删除失败',
        type: 'warning'
      })
      loadData()
    }

  })
    .catch()
}

const confrimDelete = () => {
  deleteGrades(deleteGradeData).then((res: any) => {
    if (res.code == 20000) {
      ElNotification({
        title: '成功',
        message: '已成功删除',
        type: 'success'
      })
      deletDialogShow.value = false
      loadData()
    }

    else {
      ElNotification({
        title: '失败',
        message: '删除失败',
        type: 'warning'
      })
      loadData()
    }

  })
    .catch()
}


const deleteGrade = () => {
  loadData()
  deletDialogShow.value = true
}



const confrimCreateSub = () => {
  createSubject(newSubjectdata).then((res: any) => {
    if (res.code == 20000) {
      ElNotification({
        title: '成功',
        message: '已成功创建',
        type: 'success'
      })
      createDialogShow.value = false
      getSubjects().then((res) =>
  major.value = res.data).catch()
    }
    else {
      ElNotification({
        title: '失败',
        message: '创建失败',
        type: 'warning'
      })
    }

  }).catch()
}





const deletSubDialogShow = ref(false)





</script>

<template>
  <div class="sup-card">
    <div class="card-left">
      <div class="card-title-bar">
        <el-text class="card-title-text">学习阶段</el-text>
        <div style="flex-grow: 1;"></div>

        <el-button type="primary" @Click="createNew">新增阶段</el-button>
        <el-button type="primary" @Click="deleteGrade">删除阶段</el-button>
      </div>





      <div v-for="(value, key) in allGrades" :key="key" class="subtitle">
        <div>{{ value.name }}</div>


        <div v-for="(innervalue, innerKey) in value.subset" :key="innerKey" class="subtitle">
          <div>{{ innervalue.name }}</div>
        </div>
      </div>
    </div>


    <div class="card-right">

      <div class="card-title-bar">
        <el-text class="card-title-text">学科大全</el-text>
        <div style="flex-grow: 1;"></div>
        <el-button type="primary" @click="createSubjectDialogShow = true">新增学科</el-button>
        <el-button type="primary" @click="deletSubDialogShow = true">删除学科</el-button>
      </div>
      
      <div class="card-body">
        <div class="div-major-items">

          <el-text class="major-item" v-for=" item  in  major " :key="item.id">{{ item.name }}</el-text>
        </div>

      </div>

    </div>
  </div>





  <el-dialog class="new-class-dialog" width="370px" v-model="createSubjectDialogShow">
    <div class="div-input-element">
    </div>



    <div class="div-input-element" style="margin-top: 10px;">
      <el-text style="color: #fa1010;">
        学科名称：
      </el-text>
      <div>
        <el-input class="dialog-input" v-model="newSubjectdata.name" @change="console.log(newSubjectdata.name)" style="width: 256px;">
        </el-input>
      </div>
    </div>


    <template #header>
      <el-text>添加学科</el-text>
    </template>

    <template #footer>
      <el-button type="primary" @click="confrimCreateSub()">确定</el-button>
      <el-button @click="createDialogShow = false">
        取消
      </el-button>
    </template>

  </el-dialog>
















  <el-dialog class="new-class-dialog" width="370px" v-model="createDialogShow">
    <div class="div-input-element">
    </div>

    <div class="div-input-element" style="margin-top: 10px;">
      <el-text>
        阶段层级：
      </el-text>
      <div>
        <el-select placeholder="只允许添加初中与高中的子集" class="dialog-input" v-model="newGradedata.level" style="width: 256px;">
          <el-option v-for="item in allLevel" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>

      </div>

    </div>


    <div class="div-input-element" style="margin-top: 10px;">
      <el-text style="color: #fa1010;">
        阶段名称：
      </el-text>
      <div>
        <el-input class="dialog-input" v-model="newGradedata.name" style="width: 256px;">
        </el-input>
      </div>
    </div>


    <div class="div-input-element" style="margin-top: 10px;">
      <el-text style="color: #fa1010;">
        父级阶段：
      </el-text>
      <div>
        <el-select type="datetime" placeholder="请选择" style="width:256px" v-model="newGradedata.parentId">
          <el-option v-for="item in allGrades" :key="item.id" :label="item.name" :value="item.id" />
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
















  <el-dialog class="new-class-dialog" width="370px" v-model="deletDialogShow">
    <div class="div-input-element">
    </div>

    <div class="div-input-element" style="margin-top: 10px;">
      <el-text>
        要删除的学习阶段：
      </el-text>
      <div>
        <el-select placeholder="例：初中为父级，初一为子级别" class="dialog-input" v-model="deleteGradeData.id" style="width: 256px;">
          <el-option v-for="item in allTheGrades" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>

      </div>

    </div>

    <template #header>
      <el-text>删除学习阶段</el-text>
    </template>

    <template #footer>
      <el-button type="primary" @click="confrimDelete()">确定</el-button>
      <el-button @click="createDialogShow = false">
        取消
      </el-button>
    </template>

  </el-dialog>




























  <el-dialog class="new-class-dialog" width="370px" v-model="deletSubDialogShow">
    <div class="div-input-element">
    </div>

    <div class="div-input-element" style="margin-top: 10px;">
      <el-text>
        要删除的学科：
      </el-text>
      <div>
        <el-select placeholder="请选择" class="dialog-input" v-model="deleteSubjectdata.id" style="width: 256px;">
          <el-option v-for="item in major" :key="item.id" :label="item.name" :value="item.id" />
        </el-select>

      </div>

    </div>

    <template #header>
      <el-text>删除科目</el-text>
    </template>

    <template #footer>
      <el-button type="primary" @click="confrimDeleteSub()">确定</el-button>
      <el-button @click="deletSubDialogShow = false">
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
    width: calc(($page-width - $page-gap) / 2);
    margin-right: $page-gap;
    box-shadow: 0px 0px 10px 1px #e1e2e4;
    flex-grow: 1;

    >.card-title-bar {
      margin: 20px;
      display: flex;
    }

    >.card-body {
      margin: 20px;

      >.sub-title {
        width: calc(($page-width - $page-gap) / 2 - 40px);
        display: flex;
      }

      >.div-category-items {
        margin-top: 10px;

        >.category-item {
          line-height: 2;
          white-space: nowrap;
          margin-right: 20px;
        }
      }
    }
  }

  .subtitle {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: $gap;

    >.subtitle-word {
      margin: 10px;


    }
  }

  >.card-right {
    width: calc(($page-width - $page-gap) / 2);
    box-shadow: 0px 0px 10px 1px #e1e2e4;
    flex-grow: 1;

    >.card-title-bar {
      margin: 20px;
      display: flex;
    }

    >.card-body {
      margin: 20px;

      >.div-major-items {

        >.major-item {
          line-height: 2;
          white-space: nowrap;
          margin-right: 20px;

        }
      }
    }
  }
}
</style>