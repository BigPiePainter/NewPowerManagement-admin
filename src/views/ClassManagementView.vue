<script setup lang="ts">
import { ref, reactive } from 'vue';
import SearchBar from '../components/SearchBar.vue'

const items = reactive([
  { name: "班级名称", value: "" },
  { name: "负责老师", value: "" },
  { name: "年级", value: "" },
  { name: "学科", value: "" },
])

const refresh = () => {
  console.log(items)
}
</script>

<template>
  <div>
    <div>
      <SearchBar class="search-bar" :items="items" @change="refresh()" />
    </div>
    <div>
      <el-button class="new-class-button">新建班级</el-button>

    </div>
  </div>
</template>

<style scoped lang="scss">
.search-bar {
  margin-top: 15px;
  margin-left: 15px;
  margin-right: 15px;
}
.new-class-button{
  margin-top: 15px;
  margin-left: 15px;
  max-height: 30px;
}
</style>