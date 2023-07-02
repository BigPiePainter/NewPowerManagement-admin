<script lang="ts">
interface searchElement {
  name: string
  value: any
  label?: string
  type?: InputType
  options?: any
}
</script>

<script setup lang="ts">
import { InputType } from '@/type'
import { Search, Refresh } from '@element-plus/icons-vue'

const emit = defineEmits(['change'])

const props = defineProps<{
  items: searchElement[],
}>()

console.log(props.items)

const clickSearch = (): void => {
  emit('change', props.items)
}

const defaultLabel = () => {
  props.items.forEach(item => {
    if (!item.label) {
      item.label = "请输入"
    }
  });
}
defaultLabel()

const clickRefresh = (): void => {
  props.items.forEach((item) => {
    console.log(item)
    item.value = ''
  })
  emit('change', props.items)
}
</script>

<template>
  <div class="search-bar-element">
    <div class="search-element" v-for="item in items" :key="item.name">
      <el-text class="search-title">{{ item.name }}</el-text>
      <el-select v-if="item.type == InputType.Select" class="search-input" :placeholder="item.label" v-model="item.value">
        <el-option v-for="option in item.options" :key="option.id" :label="option.name" :value="option.id" />
      </el-select>
      <el-input v-else class="search-input" :placeholder="item.label" v-model="item.value" />
    </div>

    <div style="flex-grow: 1"></div>

    <el-button @click="clickSearch" class="button" :icon="Search" type="primary">搜索</el-button>
    <el-button @click="clickRefresh" class="button" :icon="Refresh">重置</el-button>
  </div>
</template>

<style scoped lang="scss">
.search-bar-element {
  display: flex;

  >.search-element {
    display: flex;
    align-items: center;

    >.search-title {
      margin-right: 8px;
      white-space: nowrap;
    }

    >.search-input {
      max-width: 300px;
      margin-right: 12px;
    }
  }

  >.button {}
}
</style>
