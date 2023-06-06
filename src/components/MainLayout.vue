<script setup lang="ts">
import HeaderComponent from './HeaderComponent.vue'
import SidebarComponent from './SidebarComponent.vue'
</script>

<template>
  <div class="main">
    <SidebarComponent />
    <div class="page-content">
      <HeaderComponent />
      <div class="content-box">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;

  > .page-content {
    $width: calc(100vw - $sidebar-width);
    width: $width;

    > .content-box {
      width: $width;
      height: calc(100vh - $header-height);
      overflow: auto;

      box-shadow: 3px 3px 15px 1px #dbdbdb inset;
    }
  }
}
</style>
