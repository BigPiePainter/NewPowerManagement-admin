<script setup lang="ts">
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { ref, reactive } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import { getAllMenu, createRole } from '@/apis/role'

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [

    { name: '账号管理', path: '' },
    { name: '角色管理', path: '/account-role-managment' },
    { name: '角色详情', path: '/role-detail-managment' }
]
const author = ref<any>([])
const menus = reactive<any>([])
const loadData = () => {
    menus.length = 0
    getAllMenu().then((res: any) => {
        console.log(res)
        res.data.forEach((item: any) => {
            menus.push(item)
        })
        console.log(menus)
    })
}
loadData()

const newManagerData = reactive<{
    roleName: string
    remark: string
}>({
    roleName: '',
    remark: '',

})
const confirm = () => {
    var ids = ''
    menus.forEach((item: any) => {
        ids = ids + item.id + ','
    })
    var args = {
        creatorId: localStorage.id,
        menuIds: ids,
        enable: '1',
        remark: newManagerData.remark,
        roleName: newManagerData.roleName
    }

    createRole(args)
        .then((res: any) => {
            if (res.code == '20000') {
                ElNotification({
                    title: '成功',
                    message: '新增角色成功',
                    type: 'success'
                })
            } else {
                ElNotification({
                    title: '失败',
                    message: res.msg,
                    type: 'error'
                })
            }
        })
        .catch(() => { })
        .finally(() => {
            menus.length = 0
            newManagerData.remark = ''
            newManagerData.roleName = ''
        })
}
</script>

<template>
    <div class="whole">
        <div>

            <div class="line">
                <el-text style="font-size:17px;">基本信息</el-text>
                <el-button type="primary" style="float:right;" @click="confirm">确认生成</el-button>
            </div>
            <div class="input line" style="font-weight:600;">
                <el-text>*角色名称</el-text> <el-input class="input-i" v-model="newManagerData.roleName"></el-input>
            </div>
            <div class="line input">
                <el-text class="input" style="font-size:17px; margin-right: 10px;">备注</el-text> <el-input class="input-i"
                    v-model="newManagerData.remark" />

            </div>
        </div>

        <div>
            <div class="input line">
                <el-text class="input" style="font-size:17px; margin-right: 10px;">
                    *权限设置 </el-text>
                <el-select style="width: 240px" filterable multiple placeholder="请选择" v-model="author">
                    <el-option v-for="item in menus" :key="item.id" :label="item.name" :value="item.id" />
                </el-select>
            </div>
            <!-- <div class="line input botpart">
            </div> -->
        </div>
    </div>
</template>

<style scoped lang="scss">
$gap: 15px;

.whole {
    margin-left: $gap;
    margin-top: $gap;
}

.line {
    margin-top: 15px;
}

.input {
    display: flex;
    flex-direction: row;
    font-size: 22px;

}

.input-i {
    display: flex;
    width: 350px;
    margin-left: $gap;
}

.tag {
    margin-left: 32px;
}

.botpart {
    margin-left: $gap;
    margin-top: $gap;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    height: 66vh;

    background-color: lightgrey;
}
</style>