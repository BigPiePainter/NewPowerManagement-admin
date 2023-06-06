<script setup lang="ts">
import DisplayCard from '../components/DisplayCard.vue'
import { ref, reactive } from 'vue';


var data = [1, 2, 3]

var data2 = {
  name: "zhang",
  age: 16,
}

//[] 是变量索引
//.  是字符串索引








</script>

<template>
  <div>

    <DisplayCard v-for="i in 10" :key="i" title="a" :amount="100"> </DisplayCard>


    <el-row :gutter="18">
      <el-col :span="5">
        <el-card shadow="always"> Always </el-card>
      </el-col>
      <el-col :span="5">
        <el-card shadow="hover"> Hover </el-card>
      </el-col>
      <el-col :span="5">
        <el-card shadow="never"> Never </el-card>
      </el-col>
      <el-col :span="5">
        <el-card shadow="never"> Never </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="18">
      <el-col :span="5">
        <el-card shadow="always"> Always </el-card>
      </el-col>
      <el-col :span="5">
        <el-card shadow="hover"> Hover </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<style>
.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
  margin-left: 1vw;
  margin-right: 1vw;
}
</style>