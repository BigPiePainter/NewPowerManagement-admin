<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/lib/locale/lang/zh-cn'

console.log('后端网址', import.meta.env.VITE_API_URL)
</script>

<template>
  <el-config-provider :locale="zhCn">
    <router-view />
  </el-config-provider>
</template>

<style lang="scss">
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      'base': $primary-color
    )
  )
);
@use 'element-plus/theme-chalk/src/index.scss' as *;

:root {

}
</style>
