<script setup lang="ts">
import { ref, reactive } from 'vue';
import SearchBar from '../components/SearchBar.vue'
// import { defineEmits } from 'vue'

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
    <SearchBar :items="items" @change="refresh()" />
  </div>
</template>

<style scoped lang="scss"></style>

<style></style>