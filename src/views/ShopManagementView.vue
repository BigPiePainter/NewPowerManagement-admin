<script setup lang="ts">
import { ref, reactive } from 'vue';

// type Props = {
//   items: any
// }
const items = reactive([{ name: "test", value: "" },{ name: "test", value: "" },{ name: "test", value: "" },{ name: "test", value: "" },{ name: "test", value: "" }])
// const props = defineProps<Props>()

</script>

<template>
  <div class="b flex">
    <div class="flex" v-for="item in items" :key="item.name">
      <span>{{ item.name }}</span>
      <el-input class="grid-content" v-model="item.value" />
    </div>

    <div style="flex-grow: 1"></div>

    <el-button>搜索</el-button>
    <el-button class="a">重置</el-button>
  </div>
</template>

<style scoped lang="scss"></style>

<style>
.a {
  margin-right: 20px;
}

.b {
  margin-top: 15px;
  margin-left: 15px;
}

.flex{
  display: flex;
}

.grid-content {
  max-width: 300px;
  max-height: 30px;
}
</style>