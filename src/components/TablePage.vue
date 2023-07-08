<script lang="ts" setup>
import { ref, reactive, watch } from 'vue'

type Props = {
  columns: object[]
  data: object[]
  rowHeight?: number
  itemsTotalLength?: Number
}
const props = defineProps<Props>()

const emit = defineEmits(['paginationChange'])

// const totalPage = ref<Number>(400)
const paginationInfo = reactive({
  currentPage:1,
  pageSize: 20,
})
const handleSizeChange = (val: number) => { 
  console.log(`${val} items per page`)
  paginationInfo.pageSize = val
  // console.log(paginationInfo)
  emit('paginationChange', paginationInfo)
}
const handleCurrentChange = (val: number) => { 
  console.log(`current page: ${val}`)
  paginationInfo.currentPage = val
  // console.log(paginationInfo)
  emit('paginationChange', paginationInfo)
}

</script>

<template>
  <div class="page-table-container">
    <slot />
    <div class="page-table-auto-resizer">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2 :columns="columns" :data="data" :width="width" :height="height" :row-height="rowHeight || 39">
          </el-table-v2>
        </template>
      </el-auto-resizer>
    </div>
    <div class="page-table-pagination">
      <el-pagination v-model:current-page="paginationInfo.currentPage" v-model:page-size="paginationInfo.pageSize" :page-sizes="[20, 40, 60]"
        :small="false" layout="total, sizes, prev, pager, next, jumper" :total="props.itemsTotalLength" @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-table-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  >.page-table-auto-resizer {
    width: 100%;
    flex-grow: 1;
    min-height: 0px;
    box-sizing: border-box;

    //border: 1px #f0f2f5 solid;
  }

  >.page-table-pagination {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 15px;
    margin-bottom: 18px;
    margin-right: 30px;
  }
}
</style>
