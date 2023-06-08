
<script lang="ts" setup>
import TablePage from '@/components/TablePage.vue'





const generateColumns = (length = 10, prefix = 'column-', props?: any) =>
    Array.from({ length }).map((_, columnIndex) => ({
        ...props,
        key: `${prefix}${columnIndex}`,
        dataKey: `${prefix}${columnIndex}`,
        title: `Column ${columnIndex}`,
        width: 150,
    }))

const generateData = (
    columns: ReturnType<typeof generateColumns>,
    length = 200,
    prefix = 'row-'
) =>
    Array.from({ length }).map((_, rowIndex) => {
        return columns.reduce(
            (rowData, column, columnIndex) => {
                rowData[column.dataKey] = `Row ${rowIndex} - Col ${columnIndex}`
                return rowData
            },
            {
                id: `${prefix}${rowIndex}`,
                parentId: null,
            }
        )
    })

const columns = generateColumns(10)
const data = generateData(columns, 200)

console.log("columns", columns)
console.log("data", data)


</script>

<template>
    <el-table-v2 :columns="columns" :data="data" :width="700" :height="700" ></el-table-v2>
    <el-button link type="primary" size="small">关闭</el-button>



    <!-- <div>
        
            <TablePage :columns="columns" :data="data" :options="[]" @trigger="() => { }"> </TablePage>
        </div> -->
</template>
  