<script setup lang="ts">
import DisplayQuestionCard from '@/components/DisplayQuestionCard.vue'
import { ref, reactive } from 'vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import type { TabsPaneContext } from 'element-plus'
import HomeworkQuestionDisplayCard from '@/components/HomeworkQuestionDisplayCard.vue'


const input = ref('')
const breadcrumbStore = useBreadcrumbStore()

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const activeName = ref('first')



breadcrumbStore.data = [
  { name: '账号管理', path: '' },
  { name: '学生管理', path: '/account-student-managament' },
  { name: '学生详情', path: '/student-detail-managament' },
]


const lessons = reactive([
  { title: '第一讲 九年级物理超级提高课', picture: 'question', tag: '好题', time: 1000, classfiction: '普通课',time2: 2000 },
  { title: '第一讲 九年级物理超级提高课', picture: 'question', tag: '好题', time: 1666, classfiction: 'AI课',time2: 2000 },
  { title: '第一讲 九年级物理超级提高课', picture: 'question', tag: '好题', time: 2000, classfiction: 'AI课',time2: 2000 },
  { title: '第一讲 九年级物理超级提高课', picture: 'question', tag: '好题', time: 1234, classfiction: 'AI课',time2: 2000 },
  { title: '第一讲 九年级物理超级提高课', picture: 'question', tag: '好题', time: 1888, classfiction: 'AI课',time2: 2000 },
])

const question = reactive([
  { title: '高考模拟题，小试牛刀', title2: '已做11题/共22题', title3:'★★★' },
  { title: '中考模拟题，小试牛刀', title2: '已做11题/共22题', title3:'★★★' },
  { title: '中考模拟题，小试牛刀', title2: '已做11题/共22题', title3:'★★★' },
  { title: '中考模拟题，小试牛刀', title2: '已做11题/共22题', title3:'★★★' },
  { title: '中考模拟题，小试牛刀', title2: '已做11题/共22题', title3:'★★★' },
])

const homeWork = reactive([
  { title: '作业-5月24日', title2: '老师：小陈老师', title3:'已做/未作' },
  { title: '作业-5月24日', title2: '老师：小陈老师', title3:'已做/未作' },
])
// question.forEach((i) => {
//     i.convertedTime = convert(i.time)
// })

// for (let index = 0; index < question.values.length; index++) {
//   const element = (question.new.time);

  
// }

</script>

<template>
  <div class="whole">
    <div class="topPart">
      <div class="topPart1">
        <div class="topPart1-1">
          <div class="top-Part1-1-1"><el-text>老师信息</el-text></div>
        </div>
        <div class="topPart1-2">
          <div class="top-Part1-2-1">张家豪</div>
          <div class="top-Part1-2-2">
            <div><el-text>年级:20年级</el-text></div>
            <div><el-text>学科:语文</el-text></div>
            <div><el-text>电话:15536996997</el-text></div>
          </div>
        </div>

        <div class="topPart1-3">
          <div><el-text>创建时间:2022-2-13 13:00</el-text></div>
          <div class="topPart1-3-2"><el-text>最后登录:2023-6-5 12:00</el-text></div>
        </div>
      </div>

      <el-divider direction="vertical" class="divider-height" />

      <div class="topPart1--1">
        <div class="topPart1-1"><el-text>所在班级(1)</el-text></div>
        <div class="topPart2-2"><el-text>三年级二班</el-text></div>
      </div>
      <el-divider direction="vertical" class="divider-height" />
      <div>
      </div>
    </div>

   

    </div>



 <el-divider class="row-divider"></el-divider>




    <div class="downpart">

<div>
      <el-tabs  v-model="activeName" class="tabs-page" @tab-click="handleClick" type="card">

      <el-tab-pane label="课程" name="courses">
        <div class="botPart1-2">
      <DisplayQuestionCard class="postion" v-for="item in lessons" :key="item.title" :title="item.title" :picture="item.picture"
        :tag="item.tag" :classfiction="item.classfiction" :time="item.time" :time2="item.time2">     
      </DisplayQuestionCard>  
      </div>
   
    </el-tab-pane>
      <el-tab-pane label="好题演练" name="questions">
        <div class="botPart1-2">
        <HomeworkQuestionDisplayCard
    v-for="item in question" :key="item.title" :title="item.title" :title2="item.title2" :title3="item.title3">
    </HomeworkQuestionDisplayCard>
    </div>
      </el-tab-pane>
      
      <el-tab-pane label="作业巩固" name="homework"> 
        <div class="botPart1-2">
        <HomeworkQuestionDisplayCard
    v-for="item in homeWork" :key="item.title" :title="item.title" :title2="item.title2" :title3="item.title3">
    </HomeworkQuestionDisplayCard>
    </div>
      </el-tab-pane>

    </el-tabs>



    
    </div>
</div>

</template>

<style scoped lang="scss">
$scale: 0.88;

.downpart{

}
.whole {
  display: flex;
  flex-direction: column;
  
}

.topPart {
  display: flex;
  flex-direction: row;
  height: 220px * $scale;
}

.topPart1 {
  display: flex;
  flex-direction: column;
  width: 33.333%;
}

.topPart1--1 {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}


.topPart1-1 {
  display: flex;
  height: 40px * $scale;
  margin-top: 15px * $scale;
  margin-left: 15px;
}

.topPart2-2 {
  display: flex;
  margin-top: 10px * $scale;
  margin-left: 15px;
}

.top-Part1-2-1 {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60%;

}

.row-divider {
  width: 100%;
  border-bottom: 7px #f0f2f5 solid;
  box-sizing: border-box;
  margin: 0;
}

.top-Part1-2-2 {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.top-Part1-1-1 {
  display: flex;

}

.topPart1-2 {
  display: flex;
  flex-direction: row;
  height: 80px * $scale;
}

.topPart1-3 {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 15px;

}


.topPart1-3-2 {
  margin-top: 20px * $scale;

}

.botPart1-1 {
  display: flex;
  flex-direction: row;
  height: 50px * $scale;
  align-content: center;
}

.botPart1-1-1 {
  display: flex;
  flex-direction: row;
  width: 80px * $scale;
  align-items: center;
  justify-content: center;
  padding-left: 5px * $scale;

}

.botPart1-1-2 {
  display: flex;
  flex-direction: row;
  width: 160px * $scale;
  align-items: center;
  justify-content: center;

}

.botPart1-1-3 {
  display: flex;
  flex-direction: row;
  margin-left: 120px * $scale;
  width: 160px * $scale;
  align-items: center;
  justify-content: center;
}


.botPart1-2 {
  display: flex;
  flex-direction: row;
  overflow-y: auto;
  flex-wrap: wrap;
  margin-top: -10px * $scale;
}

.divider-height {
  height: 88%;
  align-self: center;
  border-left: 3px #f0f2f5 solid;
  box-sizing: border-box;
}

.playbar{
  position: absolute;
    height: 4px;
    width: 80%;
    left: 0px;
    top: 0px;
    background-color: rgb(213, 10, 10);
}
.postion{
  position: relative;
}
</style>