<script setup lang="tsx">
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { ref, reactive } from 'vue'
import { getGrades } from '@/apis/getGrades'




const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置' }, { name: '分类管理' }]



const mainState = reactive<any>([])
const studyState = reactive<any>([])
const middleState = reactive<any>([])
const heighState = reactive<any>([])

const loadSelectOption = () => {

  getGrades()
    .then((res) => {
      res.data.forEach((item: any) => {
        console.log(res)
        mainState.push(item.name)
        console.log(mainState)

        item.subset.forEach((item: any) => {
          studyState.push(item.name)
        })
      })
      console.log(studyState)
    })
    .catch()
}
loadSelectOption()


const middleGrade = () => {
  studyState.forEach((item: any) => {
    for (let i = 0; i < studyState.length; i++)
      if (item.name == '初')
      heighState.push(item.name)
      
    
  });
}

const heigrade = () => {
  studyState.forEach((item: any) => {
    for (let i = 0; i < studyState.length; i++)
      if (item.name == '高')
      middleState.push(item.name)
      
    
  });
}


middleGrade()

heigrade()




const major: any = ['语文', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史', '数学', '英语', '历史']
</script>

<template>
  <div class="sup-card">
    <div class="card-left">

      <div class="card-title-bar">
        <el-text class="card-title-text">学习阶段</el-text>
        <div style="flex-grow: 1;"></div>
        <el-text link type="primary">新增一级</el-text>
      </div>

      <div v-for="supTitle in mainState" :key="supTitle" class="subtitle">
        <div>{{ supTitle }}</div>

        <div class="subtitle">
          <div v-for="subTitle in studyState" :key="subTitle" class="subtitle">
            <div class='subtitle-word'>
              <div>{{ subTitle }}</div>
            </div>
          </div>
          <el-button link type="primary" class="">添加</el-button>
        </div>
      </div>
      <div class="sub-title">
        <div style="flex-grow: 1;">
        </div>
      </div>
    </div>


    <div class="card-right">

      <div class="card-title-bar">
        <el-text class="card-title-text">学科分类</el-text>
        <div style="flex-grow: 1;"></div>
        <el-text style="margin-right: 20px;" link type="primary">设置</el-text>
        <el-text link type="primary">新增</el-text>
      </div>

      <div class="card-body">
        <div class="div-major-items">
          <el-text class="major-item" v-for="item in major" :key="item">{{ item }}</el-text>
        </div>

      </div>

    </div>
  </div>
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
}</style>