<script setup lang="ts">

import { computed } from 'vue';
import { useRoute } from 'vue-router';


const items = [
    {
        index: '/main',
        title: '系统首页',
    },
    {
        index: '/work-space',
        title: '工作台',
    },
    {
        index: '/school-management',
        title: '学校管理',
        subs: [
            {
                index: '/class-management',
                title: '班级管理',
            },
            {
                index: '/teacher-group-management',
                title: '教研组管理',
            },
        ],
    },
    {
        index: '/account-management',
        title: '账号管理',
    },
    {
        index: '/live-class',
        title: '实时课堂',
    },
    {
        index: '/course-management',
        title: '课程管理',
    },
    {
        index: '/shop-management',
        title: '商城管理',
    },
    {
        index: '/question-bank-management',
        title: '题库管理',
    },
    {
        index: '/points-management',
        title: '积分管理',
    },
    {
        index: '/order-management',
        title: '订单管理',
    },
    {
        index: '/setting',
        title: '设置',
    },
    {
        index: '1',
        title: '展开栏',
        subs: [
            {
                index: '/viewa',
                title: 'A',
            },
            {
                index: '/viewb',
                title: 'B',
            },
        ],
    },
];

const route = useRoute();
</script>

<template>
    <div class="sidebar">
        <h5>Default colors</h5>
        <el-menu :default-active="route.path" router class="el-menu-vertical-demo">
            <template v-for="item in items" :key="item.index">
                <template v-if="item.subs">
                    <el-sub-menu :index="item.index" :key="item.index">
                        <template #title>
                            <span>{{ item.title }}</span>
                        </template>
                        <template v-for="subItem in item.subs" :key="subItem.title">
                            <el-menu-item :index="subItem.index">
                                {{ subItem.title }}
                            </el-menu-item>
                        </template>
                    </el-sub-menu>
                </template>
                <template v-else>
                    <app-link :to="item.index">
                        <el-menu-item :index="item.index" :key="item.index">
                            <template #title>{{ item.title }}</template>
                        </el-menu-item>
                    </app-link>
                </template>
            </template>
        </el-menu>
    </div>
</template>



<style scoped lang="scss">
.sidebar {
    height: 100vh;
    width: $sidebar-width;

    box-sizing: border-box;

    background-color: green;
}
</style>