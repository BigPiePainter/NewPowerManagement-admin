<script setup lang="ts">
import { useBreadcrumbStore } from '@/stores/breadcrumb'
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '工作台', path: '/work-space' }, { name: '课程审核' }]
</script>

<template><div>课程审核</div></template>
