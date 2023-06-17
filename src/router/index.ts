import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import WorkSpaceView from '@/views/WorkSpaceView.vue'
import SchoolManagementView from '@/views/SchoolManagementView.vue'
import ClassManagementView from '@/views/ClassManagementView.vue'
import ClassDetailView from '@/views/ClassDetailView.vue'
import TeacherGroupManagementView from '@/views/TeacherGroupManagementView.vue'
import TeacherGroupDetailView from '@/views/TeacherGroupDetailView.vue'
import AccountRoleManagmentView from '@/views/AccountRoleManagmentView.vue'
import LiveClassView from '@/views/LiveClassView.vue'
import CourseApprovalView from '@/views/CourseApprovalView.vue'
import AccountEquipmentManagementView from '@/views/AccountEquipmentManagementView.vue'
import CourseManagementView from '@/views/CourseManagementView.vue'
import ShopManagementView from '@/views/ShopManagementView.vue'
import NewProductView from '@/views/NewProductView.vue'
import QuestionBankManagementView from '@/views/QuestionBankManagementView.vue'
import PointsManagementView from '@/views/PointsManagementView.vue'
import OrderManagementView from '@/views/OrderManagementView.vue'
import SettingView from '@/views/SettingView.vue'
import CategoryManagementView from '@/views/CategoryManagementView.vue'
import TagManagementView from '@/views/TagManagementView.vue'
import CourseCategoryView from '@/views/CourseCategoryView.vue'
import AccountStudentManagementView from '@/views/AccountStudentManagementView.vue'
import AccountTeacherManagamentView from '@/views/AccountTeacherManagamentView.vue'
import AccountTemporaryStudentsView from '@/views/AccountTemporaryStudentsView.vue'
import MainLayout from '@/components/MainLayout.vue'
import PointsDetailView from '@/views/PointsDetailView.vue'
import StudentPointsView from '@/views//StudentPointsView.vue'
import ErrorView from '@/views/ErrorView.vue'
import AccountTeacherDetail from '@/views/AccountTeacherDetail.vue'

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
          path: 'class-detail',
          name: 'class-detail',
          component: ClassDetailView
        },
        {
          path: 'teacher-group-management',
          name: 'teacher-group-management',
          component: TeacherGroupManagementView
        },
        {
          path: 'teacher-group-detail',
          name: 'teacher-group-detail',
          component: TeacherGroupDetailView
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
          path: 'teacher-detail-managament',
          name: 'teacher-detail-managament',
          component: AccountTeacherDetail
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
        //商城管理
        {
          path: 'shop-management',
          name: 'shop-management',
          component: ShopManagementView
        },
        //新增商品
        {
          path: 'new-product',
          name: 'new-product',
          component: NewProductView
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
          path: 'student-points-management',
          name: 'student-points-management',
          component: StudentPointsView
        },
        {
          path: 'points-detail',
          name: 'points-detail',
          component: PointsDetailView
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
          path: 'category-management',
          name: 'category-management',
          component: CategoryManagementView
        },
        {
          path: 'tag-management',
          name: 'tag-management',
          component: TagManagementView
        },
        {
          path: 'course-category',
          name: 'course-category',
          component: CourseCategoryView
        }
      ]
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/404'
    },
    {
      path: '/404',
      name: 'Error',
      component: ErrorView
    }
    // {
    //   path: '/about',
    //   name: 'about',
    //   component: () => import('@/views/AboutView.vue')
    // }
  ]
})

export default router
