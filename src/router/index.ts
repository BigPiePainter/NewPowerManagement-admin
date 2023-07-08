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
import ExamInfoView from '@/views/ExamInfoView.vue'
import ExamDateView from '@/views/ExamDateView.vue'
import BannerView from '@/views/BannerView.vue'
import InfoCenterView from '@/views/InfoCenterView.vue'
import FamilyReportView from '@/views/FamilyReportView.vue'
import StudentReport from '@/views/StudentReport.vue'
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
import AccountStudentDetail from '@/views/AccountStudentDetail.vue'
import AccountRoleDetail from '@/views/AccountRoleDetail.vue'
import CourseDetailView from '@/views/CourseDetailView.vue'
import CourseCreateView from '@/views/CourseCreateView.vue'
import { userInfo } from '@/apis/manager'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: { Unprotected: true }
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
          component: WorkSpaceView,
          meta: { Protected: true }
        },
        {
          path: 'school-management',
          name: 'school-management',
          component: SchoolManagementView,
          meta: { Protected: true }
        },
        {
          path: 'class-management',
          name: 'class-management',
          component: ClassManagementView,
          meta: { Protected: true }
        },
        {
          path: 'class-detail',
          name: 'class-detail',
          component: ClassDetailView,
          meta: { Protected: true }
        },
        {
          path: 'teacher-group-management',
          name: 'teacher-group-management',
          component: TeacherGroupManagementView,
          meta: { Protected: true }
        },
        {
          path: 'teacher-group-detail',
          name: 'teacher-group-detail',
          component: TeacherGroupDetailView,
          meta: { Protected: true }
        },
        {
          path: 'account-role-managment',
          name: 'account-role-managment',
          component: AccountRoleManagmentView,
          meta: { Protected: true }
        },
        {
          path: 'role-detail-managment',
          name: 'role-detail-managment',
          component: AccountRoleDetail,
          meta: { Protected: true }
        },

        {
          path: 'acount-equipment-management',
          name: 'acount-equipment-management',
          component: AccountEquipmentManagementView,
          meta: { Protected: true }
        },
        {
          path: 'account-teacher-managament',
          name: 'account-teacher-managament',
          component: AccountTeacherManagamentView,
          meta: { Protected: true }
        },
        {
          path: 'teacher-detail-managament',
          name: 'teacher-detail-managament',
          component: AccountTeacherDetail,
          meta: { Protected: true }
        },
        {
          path: 'account-student-management',
          name: 'account-student-management',
          component: AccountStudentManagementView,
          meta: { Protected: true }
        },
        {
          path: 'student-detail-management',
          name: 'student-detail-management',
          component: AccountStudentDetail,
          meta: { Protected: true }
        },
        {
          path: 'account-temoorary-student',
          name: 'account-temoorary-student',
          component: AccountTemporaryStudentsView,
          meta: { Protected: true }
        },

        {
          path: 'live-class',
          name: 'live-class',
          component: LiveClassView,
          meta: { Protected: true }
        },
        //课程管理-课程审核
        {
          path: 'course-approval',
          name: 'course-approval',
          component: CourseApprovalView,
          meta: { Protected: true }
        },
        //课程管理-课程管理
        {
          path: 'course-management',
          name: 'course-management',
          component: CourseManagementView,
          meta: { Protected: true }
        },
        {
          path: 'course-create',
          name: 'course-create',
          component: CourseCreateView,
          meta: { Protected: true }
        },
        {
          path: 'course-detail',
          name: 'course-detail',
          component: CourseDetailView,
          meta: { Protected: true }
        },
        //商城管理
        {
          path: 'shop-management',
          name: 'shop-management',
          component: ShopManagementView,
          meta: { Protected: true }
        },
        //新增商品
        {
          path: 'new-product',
          name: 'new-product',
          component: NewProductView,
          meta: { Protected: true }
        },
        {
          path: 'question-bank-management',
          name: 'question-bank-management',
          component: QuestionBankManagementView,
          meta: { Protected: true }
        },
        {
          path: 'points-management',
          name: 'points-management',
          component: PointsManagementView,
          meta: { Protected: true }
        },
        {
          path: 'student-points-management',
          name: 'student-points-management',
          component: StudentPointsView,
          meta: { Protected: true }
        },
        {
          path: 'points-detail',
          name: 'points-detail',
          component: PointsDetailView,
          meta: { Protected: true }
        },

        {
          path: 'order-management',
          name: 'order-management',
          component: OrderManagementView,
          meta: { Protected: true }
        },
        {
          path: 'setting',
          name: 'setting',
          component: SettingView,
          meta: { Protected: true }
        },
        {
          path: 'category-management',
          name: 'category-management',
          component: CategoryManagementView,
          meta: { Protected: true }
        },
        {
          path: 'tag-management',
          name: 'tag-management',
          component: TagManagementView,
          meta: { Protected: true }
        },
        {
          path: 'course-category',
          name: 'course-category',
          component: CourseCategoryView,
          meta: { Protected: true }
        },
        {
          path: 'exam-info',
          name: 'exam-info',
          component: ExamInfoView,
          meta: { Protected: true }
        },
        {
          path: 'exam-date',
          name: 'exam-date',
          component: ExamDateView,
          meta: { Protected: true }
        },
        {
          path: 'banner',
          name: 'banner',
          component: BannerView,
          meta: { Protected: true }
        },
        {
          path: 'info-center',
          name: 'info-center',
          component: InfoCenterView,
          meta: { Protected: true }
        },
        {
          path: 'family-report',
          name: 'family-report',
          component: FamilyReportView,
          meta: { Protected: true }
        },
        {
          path: 'student-report',
          name: 'student-report',
          component: StudentReport,
          meta: { Protected: true }
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

// router.beforeEach((to, from, next) => {
//   if (to.meta.Unprotected) {
//     userInfo()
//       .then((res: any) => {

//         if (res.code == 20000) {

//           next('work-space')

//         }
//         else{next()}
//       })

//       .catch(() => next('/login'))
//   } else next()
// })

router.beforeEach((to, from, next) => {
  console.log(to, from)
  userInfo()
    .then((res: any) => {
      console.log(res)
      if (res.code == 20000) {
        to.meta.Unprotected ? next("/work-space") : next()
      } else {
        to.meta.Unprotected ? next() : next("/login")
      }
    })
    .catch(() => next('/login'))
})

export default router
