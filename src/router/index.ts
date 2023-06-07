import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import WorkSpaceView from '@/views/WorkSpaceView.vue'
import SchoolManagementView from '@/views/SchoolManagementView.vue'
import ClassManagementView from '@/views/ClassManagementView.vue'
import TeacherGroupManagementView from '@/views/TeacherGroupManagementView.vue'
import AccountRoleManagmentView from '@/views/AccountRoleManagmentView.vue'
import LiveClassView from '@/views/LiveClassView.vue'
import CourseApprovalView from '@/views/CourseApprovalView.vue'
import AccountEquipmentManagementView from '@/views/AccountEquipmentManagementView.vue'
import CourseManagementView from '@/views/CourseManagementView.vue'
import ShopManagementView from '@/views/ShopManagementView.vue'
import QuestionBankManagementView from '@/views/QuestionBankManagementView.vue'
import PointsManagementView from '@/views/PointsManagementView.vue'
import OrderManagementView from '@/views/OrderManagementView.vue'
import SettingView from '@/views/SettingView.vue'
import AccountStudentManagementView from '@/views/AccountStudentManagementView.vue'
import AccountTeacherManagamentView from '@/views/AccountTeacherManagamentView.vue'
import AccountTemporaryStudentsView from '@/views/AccountTemporaryStudentsView.vue'
import MainLayout from '@/components/MainLayout.vue'

import ViewA from '@/views/ViewA.vue'
import ViewB from '@/views/ViewB.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/',
      redirect: 'login',
      name: 'home',
      component: MainLayout,
      children: [
        {
          path: 'main',
          name: 'main',
          component: HomeView
        },
        {
          path: 'work-space',
          name: 'work-space',
          component: WorkSpaceView
        },
        {
          path: 'school-management',
          name: 'school-management',
          component: SchoolManagementView
        },
        {
          path: 'class-management',
          name: 'class-management',
          component: ClassManagementView
        },
        {
          path: 'teacher-group-management',
          name: 'teacher-group-management',
          component: TeacherGroupManagementView
        },
        {
          path: 'account-role-managment',
          name: 'account-role-managment',
          component: AccountRoleManagmentView
        },
        {
          path: 'acount-equipment-management',
          name: 'acount-equipment-management',
          component: AccountEquipmentManagementView
        },
        {
          path: 'account-teacher-managament',
          name: 'account-teacher-managament',
          component: AccountTeacherManagamentView
        },
        {
          path: 'account-student-management',
          name: 'account-student-management',
          component: AccountStudentManagementView
        },
        {
          path: 'account-temoorary-student',
          name: 'account-temoorary-student',
          component: AccountTemporaryStudentsView
        },
        

        {
          path: 'live-class',
          name: 'live-class',
          component: LiveClassView
        },
        //课程管理-课程审核
        {
          path: 'course-approval',
          name: 'course-approval',
          component: CourseApprovalView
        },
        //课程管理-课程管理
        {
          path: 'course-management',
          name: 'course-management',
          component: CourseManagementView
        },
        {
          path: 'shop-management',
          name: 'shop-management',
          component: ShopManagementView
        },
        {
          path: 'question-bank-management',
          name: 'question-bank-management',
          component: QuestionBankManagementView
        },
        {
          path: 'points-management',
          name: 'points-management',
          component: PointsManagementView
        },
        {
          path: 'order-management',
          name: 'order-management',
          component: OrderManagementView
        },
        {
          path: 'setting',
          name: 'setting',
          component: SettingView
        },
        {
          path: 'viewa',
          name: 'viewa',
          component: ViewA
        },
        {
          path: 'viewb',
          name: 'viewb',
          component: ViewB
        },
        {
          path: '*',
          name: 'Error',
          component: HomeView
        }
      ]
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('@/views/AboutView.vue')
    // }
  ]
})

export default router
