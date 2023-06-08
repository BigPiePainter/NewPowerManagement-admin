<script lang="ts" setup>
import TablePage from '@/components/TablePage.vue'

const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
  Array.from({ length }).map((_, columnIndex) => ({
    ...props,
    key: `${prefix}${columnIndex}`,
    dataKey: `${prefix}${columnIndex}`,
    title: `Column ${columnIndex}`,
    width: 150
  }))

const generateData = (columns: ReturnType<typeof generateColumns>, length = 200, prefix = 'row-') =>
  Array.from({ length }).map((_, rowIndex) => {
    return columns.reduce(
      (rowData, column, columnIndex) => {
        rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
        return rowData
      },
      {
        id: `${prefix}${rowIndex}`,
        parentId: null
      }
    )
  })

const columns = generateColumns(10)
const data = generateData(columns, 10)

console.log('columns', columns)
console.log('data', data)
</script>

<template>
  <div>
    <TablePage :columns="columns" :data="data" class="studetn-table">
      <div>
        123
      </div>
    </TablePage>
  </div>

  <!-- <div>
        
            <TablePage :columns="columns" :data="data" :options="[]" @trigger="() => { }"> </TablePage>
        </div> -->
</template>

<style scoped lang="scss">
.studetn-table {
    
  width: $page-width;
  height: $page-height;
}
</style>
