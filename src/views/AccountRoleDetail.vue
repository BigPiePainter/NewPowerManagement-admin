<script setup lang="ts">
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'
import { ref, reactive } from 'vue'
import { createManager } from '@/apis/manager';
import { ElButton,ElNotification } from 'element-plus'

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [

    { name: '账号管理', path: '' },
    { name: '角色管理', path: '/account-role-managment' },
    { name: '角色详情', path: '/role-detail-managment' }
]




const newManagerData = reactive<{

    account: string
    avatar: string
    managerRoleId: string
    password: string
    phoneNumber: string
    remark: string
}>({
    account: '',
    avatar: '',
    managerRoleId: '',
    password: '',
    phoneNumber: '',
    remark: '',

})
const confirm = () => {

  createManager(newManagerData)
    .then((res:any) => {
        if (res.code == '20000') {
      ElNotification({
        title: '成功',
        message: '新增管理员成功',
        type: 'success'
      })
    } else {

      ElNotification({
        title: '失败',
        message: '请求错误或删除被撤回',
        type: 'error'
      })
    }
    })
    .catch(() => { })
    .finally(() => {
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
                <el-text>*角色名称</el-text> <el-input  class="input-i" v-model="newManagerData.account"></el-input>
            </div>

            
            <div class="input line" style="font-weight:300;">
                <el-text>角色密码</el-text> <el-input  class="input-i" v-model="newManagerData.password"></el-input>
            </div>

            <div class="input line" style="font-weight:300;">
                <el-text>角色电话</el-text> <el-input  class="input-i" v-model="newManagerData.phoneNumber"></el-input>
            </div>
            
            <div class="line input" style="font-weight:300;">
                <el-text class="tag">备注</el-text> <el-input class="input-i" v-model="newManagerData.remark"/>

            </div>
        </div>

        <div>
            <div class="input line">
                <el-text class="input" style="font-size:17px">
                    *权限设置 </el-text>
            </div>

            <div class="line input botpart">

            </div>

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