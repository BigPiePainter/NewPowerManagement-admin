<script lang="ts" setup>
type Props = {
  columns: object[]
  data: object[]
}
const props = defineProps<Props>()
</script>

<template>
  <div class="page-table-container">
    <slot />
    <div class="page-table-auto-resizer">
      <el-auto-resizer>
        <template #default="{ height, width }">
          <el-table-v2 :columns="columns" :data="data" :width="width" :height="height">
          </el-table-v2>
        </template>
      </el-auto-resizer>
    </div>
    <div class="page-table-pagination">
      <el-pagination
        :current-page="4"
        :page-size="100"
        :page-sizes="[100, 200, 300, 400]"
        :small="false"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="() => {}"
        @current-change="() => {}"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-table-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  > .page-table-auto-resizer {
    width: 100%;
    flex-grow: 1;
    min-height: 0px;
    box-sizing: border-box;
  }

  > .page-table-pagination {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin-top: 15px;
    margin-bottom: 18px;
    margin-right: 30px;
  }
}
</style>
