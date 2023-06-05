<script setup lang="ts">
import HeaderComponent from './HeaderComponent.vue'
import SidebarComponent from './SidebarComponent.vue'
</script>

<template>
    <div class="main">
        <SidebarComponent />
        <div class="page-content">
            <HeaderComponent />
            <router-view class="content-box" />
        </div>
    </div>
</template>

<style scoped lang="scss">
.main {
    background-color: rgb(107, 95, 95);
    display: flex;


    >.page-content {
        $width: calc(100vw - $sidebar-width);
        width: $width;

        >.content-box {
            width: $width;
            height: calc(100vh - $header-height);
        }
    }
}
</style>
