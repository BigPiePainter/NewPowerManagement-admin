<script setup lang="tsx">
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { ref, reactive } from 'vue'
import { getGrades, createGrades, deleteGrades } from '@/apis/grade'
import { getSubjects, deleteSubject, createSubject } from '@/apis/subject';
import { ElNotification } from 'element-plus'

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置' }, { name: '分类管理' }]

const author = JSON.parse(localStorage.author)
const allGrades = ref<any[]>([])
const allSubjects = reactive<any>([])
const createSubjectDialogShow = ref(false)
const createUpperGradeDialogShow = ref(false)
const createSubGradeDialogShow = ref(false)
const newSubjectdata = reactive<any>({
  name: ''
});
const newGradedata = reactive<any>({
  level: '',
  name: '',
  parentId: ''
});

//-----------------created-----------------------
const loadData = () => {
  allSubjects.length = 0
  getGrades().then((res: any) => {
    allGrades.value = res.data
    return getSubjects()
  })
    .then((res: any) => {
      res.data.forEach((item: any) => {
        allSubjects.push(item)
      })
    })
    .catch()
}
loadData()

//---------------创建父级学习阶段--------------------
const createNewUpperGrade = () => {
  newGradedata.name = ''
  createUpperGradeDialogShow.value = true
}
const confrimCreateNewUpperGrade = () => {
  var args = {
    level: 1,
    name: newGradedata.name,
    parentId: 0
  }
  createGrades(args)
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '创建成功',
          type: 'success'
        })
        createUpperGradeDialogShow.value = false
      }
      else {
        ElNotification({
          title: '失败',
          message: res.msg,
          type: 'warning'
        })
      }
    }).catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'warning'
      })
    })
    .finally(() => {
      loadData()
    })
}

//---------------创建子级学习阶段--------------------
const createNewSubGrade = (id: any) => {
  newGradedata.name = ''
  newGradedata.parentId = id
  createSubGradeDialogShow.value = true
}
const confrimCreateNewSubGrade = () => {
  var args = {
    level: 2,
    name: newGradedata.name,
    parentId: newGradedata.parentId
  }
  createGrades(args)
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '创建成功',
          type: 'success'
        })
        createSubGradeDialogShow.value = false
      }
      else {
        ElNotification({
          title: '失败',
          message: res.msg,
          type: 'warning'
        })
      }
    }).catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'warning'
      })
    })
    .finally(() => {
      loadData()
    })
}

//------------------删除学习阶段----------------------
const deleteGrade = (id: any) => {
  deleteGrades({ id: id })
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
    .finally(() => {
      loadData()
    })
}

//----------------------创建科目-----------------------
const createNewSubject = () => {
  newSubjectdata.name = ''
  createSubjectDialogShow.value = true
}
const confrimCreateSub = () => {
  createSubject(newSubjectdata)
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '创建成功',
          type: 'success'
        })
        createSubjectDialogShow.value = false
      }
      else {
        ElNotification({
          title: '创建失败',
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
    .finally(() => {
      loadData()
    })
}

//---------------------删除科目----------------------
const deleteSubjects = (id: any) => {
  deleteSubject({ id: id })
    .then((res: any) => {
      if (res.code == 20000) {
        ElNotification({
          title: '删除成功',
          type: 'success'
        })
        createSubjectDialogShow.value = false
      }
      else {
        ElNotification({
          title: '删除失败',
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
    .finally(() => {
      loadData()
    })
}
</script>

<template>
  <div class="sup-card">
    <!---------------------- 学习阶段 --------------------->
    <div class="card-left">
      <div class="card-title-bar">
        <el-text class="card-title-text">学习阶段</el-text>
        <div style="flex-grow: 1;"></div>
        <el-button :disabled="!author.categoryEdit" type="primary" link @Click="createNewUpperGrade">新增阶段</el-button>
      </div>

      <div v-for="(value, key) in allGrades" :key="key" class="subtitle">

        <div style="margin-left: 10px;">
          <el-text>{{ value.name }}</el-text>
          <el-button :disabled="!author.categoryEdit" type="primary" link style="margin-left: 10px;" @Click="deleteGrade(value.id)">删除阶段</el-button>
        </div>

        <div style="margin-left: 15px; margin-top: 10px;">
          <el-tag style="margin-right: 15px;" v-for="(innervalue, innerKey) in value.subset" :key="innerKey" closable
            @close="deleteGrade(innervalue.id)">{{
              innervalue.name }}</el-tag>
          <el-button :disabled="!author.categoryEdit" type="primary" link @click="createNewSubGrade(value.id)">新增</el-button>
        </div>

      </div>
    </div>

    <!------------------------- 课程类目 ------------------------>
    <div class="card-right">
      <div class="card-title-bar">
        <el-text class="card-title-text">课程类目</el-text>
      </div>

      <div class="card-body">
        <div class="div-major-items" style="margin-left: 10px;">
          <el-tag style="margin-bottom: 10px;" class="major-item" v-for="item in allSubjects" :key="item.id" closable
            @close="deleteSubjects(item.id)">{{
              item.name }}</el-tag>
          <el-button :disabled="!author.categoryEdit" type="primary" link @click="createNewSubject">新增</el-button>
        </div>
      </div>
    </div>
  </div>

  <el-dialog class="new-class-dialog" width="370px" v-model="createSubjectDialogShow">
    <div style="margin-top: 10px;white-space:nowrap;">
      <el-text>
        科目名称：
      </el-text>
      <el-input v-model="newSubjectdata.name" style="width: 200px;">
      </el-input>
    </div>
    <template #header>
      <el-text>添加课程类目</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confrimCreateSub()">确定</el-button>
      <el-button @click="createSubjectDialogShow = false">
        取消
      </el-button>
    </template>
  </el-dialog>

  <el-dialog class="new-class-dialog" width="370px" v-model="createUpperGradeDialogShow">
    <div style="margin-top: 10px;white-space:nowrap;">
      <el-text>
        阶段名称：
      </el-text>
      <el-input v-model="newGradedata.name" style="width: 200px;">
      </el-input>
    </div>
    <template #header>
      <el-text>添加父级学习阶段</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confrimCreateNewUpperGrade()">确定</el-button>
      <el-button @click="createUpperGradeDialogShow = false">
        取消
      </el-button>
    </template>
  </el-dialog>

  <el-dialog class="new-class-dialog" width="370px" v-model="createSubGradeDialogShow">
    <div style="margin-top: 10px;white-space:nowrap;">
      <el-text>
        阶段名称：
      </el-text>
      <el-input v-model="newGradedata.name" style="width: 200px;">
      </el-input>
    </div>
    <template #header>
      <el-text>添加子级学习阶段</el-text>
    </template>
    <template #footer>
      <el-button type="primary" @click="confrimCreateNewSubGrade()">确定</el-button>
      <el-button @click="createSubGradeDialogShow = false">
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
    flex-direction: column;
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