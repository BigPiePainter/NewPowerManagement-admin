<script lang="ts">
interface searchElement {
  name: string
  value: string
  type?: InputType
}
</script>
<script setup lang="ts">
import { Search, Refresh } from '@element-plus/icons-vue'

const emit = defineEmits(['change'])

const props = defineProps<{
  items: searchElement[]
}>()

const clickSearch = () => {
  //传递给父组件
  emit('change', props.items)
}

const clickRefresh = () => {
  props.items.forEach((item) => {
    console.log(item)
    item.value = ''
    emit('change', props.items)
  })
}

const select = InputType.Select
</script>

<template>
  <div class="search-bar">
    <div class="search-element" v-for="item in items" :key="item.name">
      <el-text class="search-title">{{ item.name }}</el-text>
      <el-select
        v-if="item.type === select"
        class="search-input"
        placeholder="请输入"
        v-model="item.value"
      />
      <el-input v-else class="search-input" placeholder="请输入" v-model="item.value" />
    </div>

    <div style="flex-grow: 1"></div>

    <el-button @click="clickSearch" class="button" :icon="Search">搜索</el-button>
    <el-button @click="clickRefresh" class="button" :icon="Refresh">重置</el-button>
  </div>
</template>

<style scoped lang="scss">
.search-bar {
  display: flex;

  > .search-element {
    display: flex;
    align-items: center;

    > .search-title {
      margin-right: 8px;
      white-space: nowrap;
    }

    > .search-input {
      max-width: 300px;
      max-height: 30px;
      margin-right: 12px;
    }
  }

  > .button {
    margin-top: 1px;
    max-height: 30px;
  }
}
</style>
