<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const items = [
  {
    index: '/main',
    title: '系统首页'
  },
  {
    index: '/work-space',
    title: '工作台'
  },
  {
    index: '/school-management',
    title: '学校管理',
    subs: [
      {
        index: '/class-management',
        title: '班级管理'
      },
      {
        index: '/teacher-group-management',
        title: '教研组管理'
      }
    ]
  },
  {
    index: '/account-management',
    title: '账号管理',
    subs: [
      {
        index: '/account-role-managment',
        title: '角色管理'
      },
      {
        index: '/acount-equipment-management',
        title: '账号设备管理'
      },
      {
        index: '/account-teacher-managament',
        title: '老师管理'
      },
      {
        index: '/account-student-management',
        title: '学生管理'
      },
      {
        index: '/account-temoorary-student',
        title: '临时学生'
      }
    ]
  },
  {
    index: '/live-class',
    title: '实时课堂'
  },
  {
    index: '/course-management-group',
    title: '课程管理',
    subs: [
      {
        index: '/course-approval',
        title: '微课审核'
      },
      {
        index: '/course-management',
        title: '课程管理'
      }
    ]
  },
  {
    index: '/shop-management',
    title: '商城管理'
  },
  {
    index: '/question-bank-management',
    title: '题库管理'
  },
  {
    index: '/points-management',
    title: '积分管理',
    subs: [
      {
        index: '/student-points-management',
        title: '学生积分'
      },
      {
        index: '/points-detail',
        title: '积分明细'
      }
    ]
  },
  {
    index: '/setting',
    title: '设置'
  },
  {
    index: '1',
    title: '展开栏',
    subs: [
      {
        index: '/viewa',
        title: 'A'
      },
      {
        index: '/viewb',
        title: 'B'
      }
    ]
  }
]

const route = useRoute()
</script>

<template>
  <div class="sidebar">
    <div class="sidebar-header">管理后台</div>
    <el-menu :default-active="route.path" router>
      <template v-for="item in items" :key="item.index">
        <template v-if="item.subs">
          <el-sub-menu :index="item.index" :key="item.index" class="sidebar-sub-menu">
            <template #title>
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs" :key="subItem.title">
              <el-menu-item :index="subItem.index" class="sidebar-menu-item">
                {{ subItem.title }}
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <app-link :to="item.index">
            <el-menu-item :index="item.index" :key="item.index" class="sidebar-menu-item">
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
  
  --el-menu-text-color: #ebebeb;
  --el-menu-bg-color: #{$sidebar-color};
  //--el-menu-bg-color: #00000000;
  --el-menu-hover-bg-color: #{$sidebar-hover-color};

  height: 100vh;
  width: $sidebar-width;
  min-width: $sidebar-width;
  max-width: $sidebar-width;

  box-sizing: border-box;
  color: white;
  background-color: $sidebar-color;

  border-right: 1px #f0f2f5 solid;

  > .sidebar-header {
    height: $header-height;

    font-size: 18px;
    display: flex;
    align-items: center;

    padding-left: 20px;

    //border-right: 1px #f0f2f5 solid;
    //border-bottom: 1px #f0f2f5 solid;
    border-bottom: 1px #ffffff10 solid;
    //border-bottom: 3px #2c2c58 solid;
    box-sizing: border-box;
  }

  > .el-menu {
    height: calc(100vh - $header-height);
    scrollbar-gutter: stable;
    border-right: none;
    overflow: auto;

    color: #fff;
  }

  &:hover {
    ::-webkit-scrollbar-thumb {
      background-color: #d7d7d777;
    }
  }

  ::-webkit-scrollbar {
    width: 5px;
    opacity: 0.5;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ffffff1f;
    border: none;
    border-radius: 100px;
  }
}
</style>
