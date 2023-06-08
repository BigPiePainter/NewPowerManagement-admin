<script setup lang="tsx">
import { ref, reactive } from 'vue'
import {
    ElButton,
    TableV2FixedDir,
} from 'element-plus'
const slotHeader = [
    {
        dataKey: 'id',
        key: 'id',
        title: '22',
        width: 150
    },
    {
        dataKey: 'studentName',
        key: 'studentName',
        title: '学生姓名',
        width: 200
    },
    {
        dataKey: 'userName',
        key: 'userName',
        title: '用户名',
        width: 200
    },
    {
        key: 'option',
        title: '操作',
        cellRenderer: () => (
            <>
                <el-button link type="primary">
                    移除
                </el-button>
            </>
        ),
        width: 150,
        fixed: 'right',
        align: 'center',
    },
]
const tableColumns = [
    {
        dataKey: 'id',
        key: 'id',
        title: 'ID',
        width: 150
    },
    {
        dataKey: 'studentName',
        key: 'studentName',
        title: '学生姓名',
        width: 200
    },
    {
        dataKey: 'userName',
        key: 'userName',
        title: '用户名',
        width: 200
    },
    {
        key: 'option',
        title: '操作',
        cellRenderer: () => (
            <>
                <el-button link type="primary">
                    移除
                </el-button>
            </>
        ),
        width: 150,
        fixed: 'right',
        align: 'center',
    },
]

const tableData: object[] = [{ id: '1456', studentName: 'Nick', userName: 'Nick191518' }];

const fakeData = { id: '123456', studentName: 'Nick', userName: 'Nick191518' };

const generateData = (data: object[], fakeItem: object) => {
    for (let i = 0; i < 1000; i++) {
        data.push(fakeItem)
    }
};
generateData(tableData, fakeData)
console.log(tableData)

</script>

<template>
    <div class="div-class-detail">
        <el-card class="card-left">

        </el-card>
        <el-card class="card-right">
            <div class="div-search-bar">
                <el-text class="search-title">姓名/用户名</el-text>
                <el-input class="search-input" placeholder="请输入"></el-input>
                <el-button class="search-bar-button" type="primary">搜索</el-button>

                <div style="flex-grow: 1;"></div>

                <el-button class="search-bar-button" type="primary">添加成员</el-button>
            </div>
            <div class="div-table">
                <el-divider style="margin-bottom: 0;" />
                <div class="div-table-2">
                    <el-divider class="table-border" direction="vertical" />
                    <el-auto-resizer>
                        <template #default="{ height, width }">
                            <el-table-v2 class="class-detail-table" :columns="tableColumns" :data="tableData"
                                :height="height" :width="width">
                                <template #header-cell="scope">
                                    <el-button v-if="scope.column.key == 'option'" @click="console.log(scope)">{{ scope.column.title }}</el-button>
                                    <span v-else>{{ scope.column.title }}</span>
                                </template>
                            </el-table-v2>
                        </template>
                    </el-auto-resizer>
                    <el-divider class="table-border" direction="vertical" />
                </div>
                <el-divider style="margin-top: 0;" />
            </div>
        </el-card>
    </div>
</template>

<style scoped lang="scss">
.div-class-detail {
    height: $page-height;
    flex-grow: 1;
    display: flex;
}

.card-left {
    width: calc($page-width * 0.25);
    margin-right: 10px;
}

.card-right {
    width: calc($page-width * 0.75);
}

.div-search-bar {
    display: flex;

    >.search-title {
        margin-right: 8px;
        white-space: nowrap;
    }

    >.search-input {
        max-width: 200px;
        max-height: 30px;
        margin-right: 12px;
    }

    >.search-bar-button {
        max-width: 70px;
        max-height: 30px;
    }
}

.div-table {
    margin-top: 15px;

    >.div-table-2 {
        height: calc($page-height - 100px);
        display: flex;

        >.table-border {
            height: calc($page-height - 100px);
            margin-left: 0;
            margin-left: 0;
        }

        >.class-detail-table {}
    }

}
</style>