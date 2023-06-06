<script setup lang="ts">

</script>

<template>
<div>
  <el-row :gutter="18" justify="center">
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

  <el-row :gutter="18" justify="center">
    <el-col :span="5">
      <el-card shadow="always"> Always </el-card>
    </el-col>
    <el-col :span="5">
      <el-card shadow="hover"> Hover </el-card>
    </el-col>
    <el-col :span="5">

    </el-col>
    <el-col :span="5">

    </el-col>
  </el-row>
</div>
</template>
<style>
.el-row {
  margin-top: 2vw;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  margin-left: 1vw;
  margin-right: 1vw;
}
</style>