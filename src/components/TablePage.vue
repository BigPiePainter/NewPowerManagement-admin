
<script lang="ts" setup>
type Props = {
    columns: object[]
    data: object[]
    options: object[]
    width: number
    height: number
}
const props = defineProps<Props>()

</script>

<template>
    <el-table-v2 :columns="columns" :data="data" :width="700" :height="400">
    </el-table-v2>
</template>
