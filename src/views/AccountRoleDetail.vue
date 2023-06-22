<script setup lang="ts">
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { useRouter } from 'vue-router'

const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [

    { name: '账号管理', path: '' },
    { name: '角色管理', path: '/account-role-managment' },
    { name: '角色详情', path: '/role-detail-managment' }
]
</script>

<template>
    <div class="whole">
        <div>
            <div class="line" >
                <el-text style="font-size:17px;" >基本信息</el-text>
            </div>

            <div class="input line" style="font-weight:600;">
                <el-text>*角色名称</el-text> <el-input class="input-i" />
            </div>

            <div class="line input" style="font-weight:600;">
                <el-text class="tag">备注</el-text> <el-input class="input-i"/>
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

.line{
  margin-top: 15px;
}
.input{
display: flex;
flex-direction: row;
font-size: 22px;

}
.input-i{
  display: flex;
  width: 350px;
  margin-left: $gap;
}

.tag{
  margin-left: 32px;
}
.botpart{
 margin-left: $gap;
 margin-top: $gap;
 display: flex;
 flex-direction: column;
 flex-grow: 1;
 height: 66vh;
 
 background-color: lightgrey;
}
</style>