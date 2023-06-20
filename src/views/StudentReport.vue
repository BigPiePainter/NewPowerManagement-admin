<script setup lang="tsx">
import { ref, reactive } from 'vue'
import { ElButton } from 'element-plus'
import SearchBar from '@/components/SearchBar.vue'
import TablePage from '@/components/TablePage.vue'
import { InputType } from '@/type'
import { useRoute } from 'vue-router'
import { ElCheckbox } from 'element-plus'
import type { CheckboxValueType } from 'element-plus'

import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [
    { name: '设置', path: '' },
    { name: '家长报告', path: '/family-report' },
    { name: '发送报告' }
]

const route = useRoute()
console.log(route.query.id)

const searchBarItems = reactive([
    { name: "班级", value: "", type: InputType.Select, label: "请选择" },
])

const tableColumns = reactive<any>([
    {
        key: 'selection',
        width: 50,
        cellRenderer: (item: any) => {
            const onChange = (value: CheckboxValueType) => item.rowData.checked = value
            return <ElCheckbox modelValue={item.rowData.checked} onChange={onChange} />
        },
        headerCellRenderer: () => {
            const onChange = (value: CheckboxValueType) => {
                tableData.forEach((i: any) => i.checked = value);
            }
            return <ElCheckbox onChange={onChange} modelValue={tableData.every((i: any) => i.checked)} indeterminate={!tableData.every((i: any) => i.checked) && tableData.some((i: any) => i.checked)} />
        },
        checked: false,
    },
    {
        dataKey: 'studentID',
        key: 'studentID',
        title: '学生ID',
        width: 150
    },
    {
        dataKey: 'studentName',
        key: 'studentName',
        title: '学生姓名',
        width: 150
    },
    {
        dataKey: 'score',
        key: 'score',
        title: '分数',
        width: 70
    },
    {
        key: 'option',
        title: '操作',
        cellRenderer: (item: any) => {
            return (
                <>
                    <el-button link type="primary" onClick={() => sendReport(item)}>
                        发送学习报告
                    </el-button>
                </>
            )
        },
        width: 150,
        fixed: 'right',
        align: 'center',
        height: 500
    }
])

const tableData = reactive<any>([
    {
        checked: false,
        studentID: '145336',
        studentName: '王刷等',
        score: '95'
    },
    {
        checked: false,
        studentID: '145456',
        studentName: '庄俄语',
        score: '46'
    },
    {
        checked: false,
        studentID: '674536',
        studentName: '梁国服',
        score: '89'
    },
    {
        checked: false,
        studentID: '864366',
        studentName: 'jack',
        score: '70'
    },
    {
        checked: false,
        studentID: '561456',
        studentName: 'Mical',
        score: '60'
    },
])

const sendReport = (props: any) => {
    console.log(props.rowData)
}

const sendAll = () => {
    let selectedRows = tableData.filter((item: any) => item.checked)
    console.log(selectedRows)
    tableData.forEach((i: any) => i.checked = false);
}

const refresh = () => {
    console.log(searchBarItems)
}
</script>

<template>
    <TablePage class="send-report-table-page" :columns="tableColumns" :data="tableData">
        <div class="send-report-search-bar">
            <SearchBar :items="searchBarItems" @change="refresh"></SearchBar>
        </div>
        <div class="new-class-button">
            <el-button type="primary" @click="sendAll">批量发送</el-button>
        </div>
    </TablePage>
</template>

<style lang="scss" scoped>
$gap: 15px;

.send-report-table-page {
    width: calc($page-width - $gap);
    margin-left: $gap;

    >.send-report-search-bar {
        margin: $gap;
    }

    >.new-class-button {
        margin-left: $gap;
        margin-bottom: $gap;
    }
}
</style>