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
        <div class="router-view">
          <router-view />
        </div>
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
      //background-color: #f0f2f5;

      //box-shadow: 3px 3px 15px 1px #dbdbdb inset;
      box-shadow: 3px 3px 5px 1px #e1e2e4 inset;

      > .router-view {
        margin: $page-gap;
        width: $page-width;
        height: $page-height;
        //box-shadow: 0px 0px 15px 1px #dbdbdb;
        box-shadow: 3px 3px 10px 1px #e1e2e4;
        overflow: auto;
        background-color: #ffffff;
        //height: calc(100vh - $header-height - 10px);
      }
    }
  }
}
</style>
