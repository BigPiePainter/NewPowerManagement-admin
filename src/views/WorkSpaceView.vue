<script setup lang="ts">
import { anyTypeAnnotation } from '@babel/types';
import DisplayCard from '../components/DisplayCard.vue'
import { ref, reactive } from 'vue';

const history = reactive([
  { title: "学生账号", amount: 1000000 },
  { title: "老师账号", amount: 200000 },
  { title: "用户积分总额", amount: 12 },
  { title: "老师上传微课数", amount: 13 },
  { title: "班级数量", amount: 13 },
  { title: "教研组数量", amount: 15 },
])

const order = reactive([
  { title: "今日订单收入", amount: 22 },
  { title: "今日订单数量", amount: 22 },
  { title: "7日内订单数量", amount: 22 },
  { title: "7日内订单收入", amount: 22 }
])

</script>

<template>
  <div >

    <div class="view-header" style="margin-top: 33px;">
      <div class="divider"></div>
      历史累计
    </div>

    <el-divider border-style="dashed" class="view-border" />
    <div class="displaycard-container">
      <DisplayCard v-for="item in history" :key="item.title" :title="item.title" :amount="item.amount"> </DisplayCard>
    </div>
    
    <div class="view-header" style="margin-top: 48px;">
      <div class="divider"></div>
      订单累计
    </div>
    <el-divider border-style="dashed" class="view-border"/>
    <div class="displaycard-container">
      <DisplayCard v-for="item in order" :key="item.title" :title="item.title" :amount="item.amount"> </DisplayCard>

    </div>
  </div>
</template>
<style scoped lang="scss">
.displaycard-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: calc(100vw - $sidebar-width - 40px);

}

.view-border {
  margin-bottom: 0px;
  margin-top: 7px;
  margin-left: 25px;
  width: calc(100vw - $sidebar-width - 50px);
  justify-content: flex-start;
}

.view-header {
  font-size: 15px;
  margin-top: 21px;
  margin-left: 24px;

  display: flex;
  flex-direction: row;
  align-items: center;

  >.divider {
    border-left: 4px #404040 solid;
    height: 15px;
    margin-right: 14px;
    align-items: center;
    margin-left:8px ;
  }

}
</style>





