<script setup lang="tsx">
import { getManager, eidtManagerAuthor } from '@/apis/manager'
import { reactive, watch } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import { useRoute } from 'vue-router'

//------------------variable----------------------
const author1 = JSON.parse(localStorage.author)
const route = useRoute()
const author = reactive<any>({
  workSpace: { able: true, id: 1 },
  school: { able: false, id: 2 },
  classShow: { able: false, id: 3 },
  classEdit: { able: false, id: 4 },
  teacherGroupShow: { able: false, id: 5 },
  teacherGroupEdit: { able: false, id: 6 },
  account: { able: false, id: 7 },
  managerShow: { able: false, id: 8 },
  managerEdit: { able: false, id: 9 },
  deviceShow: { able: false, id: 10 },
  deviceEdit: { able: false, id: 11 },
  teacherShow: { able: false, id: 12 },
  teacherEdit: { able: false, id: 13 },
  studentShow: { able: false, id: 14 },
  studentEdit: { able: false, id: 15 },
  temoryStudentShow: { able: false, id: 16 },
  temoryStudentEdit: { able: false, id: 17 },
  liveClassShow: { able: false, id: 18 },
  liveClassEdit: { able: false, id: 19 },
  course: { able: false, id: 20 },
  miniLessonShow: { able: false, id: 21 },
  miniLessonEdit: { able: false, id: 22 },
  coursePackageShow: { able: false, id: 23 },
  coursePackageEdit: { able: false, id: 24 },
  shopShow: { able: false, id: 25 },
  shopEdit: { able: false, id: 26 },
  questionBank: { able: false, id: 27 },
  questionPackageShow: { able: false, id: 28 },
  questionPackageEdit: { able: false, id: 29 },
  questionsShow: { able: false, id: 30 },
  questionsEdit: { able: false, id: 31 },
  orderShow: { able: false, id: 32 },
  orderEdit: { able: false, id: 33 },
  market: { able: false, id: 34 },
  pointShow: { able: false, id: 35 },
  pointEdit: { able: false, id: 36 },
  tCoinShow: { able: false, id: 37 },
  tCoinEdit: { able: false, id: 38 },
  setting: { able: false, id: 39 },
  categoryShow: { able: false, id: 40 },
  categoryEdit: { able: false, id: 41 },
  tagShow: { able: false, id: 42 },
  tagEdit: { able: false, id: 43 },
  courseCategoryShow: { able: false, id: 44 },
  courseCategoryEdit: { able: false, id: 45 },
  examInfoShow: { able: false, id: 46 },
  examInfoEdit: { able: false, id: 47 },
  examDateShow: { able: false, id: 48 },
  examDateEdit: { able: false, id: 49 },
  bannerShow: { able: false, id: 50 },
  bannerEdit: { able: false, id: 51 },
  messageShow: { able: false, id: 52 },
  messageEdit: { able: false, id: 53 },
  homeworkShow: { able: false, id: 54 },
  homeworkShare: { able: false, id: 55 },
})

//------------------created-----------------------
const loadData = () => {
  var args = {
    account: route.query.account
  }
  console.log("账号", args.account)
  getManager(args)
    .then((res: any) => {
      console.log("账号", args.account)
      if (res.code == 20000) {
        var menuList: any = []
        res.data.records[0].menuList.forEach((menu: any) => {
          menuList.push(menu.name)
        })
        menuList.forEach((menu: any) => {
          author[menu].able = true
        })
        console.log(author)
      } else {
        ElNotification({
          title: 'Error',
          message: res.msg,
          type: 'error'
        })
      }
    })
}
loadData()

//-------------------methods-------------------------
const confirmAuthor = () => {
  var menuIds = ''
  Object.keys(author).forEach((key: any) => {
    if (author[key].able == true)
      menuIds = menuIds + String(author[key].id) + ','
  })
  eidtManagerAuthor({
    id: route.query.id,
    menuIds: menuIds
  }).then((res: any) => {
    if (res.code == 20000) {
      ElNotification({
        title: '权限设置成功',
        type: 'success'
      })
      loadData()
    } else {
      ElNotification({
        title: '权限设置失败',
        message: res.msg,
        type: 'error'
      })
    }
  }).catch((res: any) => {
    ElNotification({
      title: '未知错误',
      message: res.msg,
      type: 'error'
    })
  })
}

//-------------------watched-------------------------
watch(() => author, (val: any) => {
  console.log(val)
},
  { deep: true, immediate: true }
)
</script>

<template>
  <div class="page-body">
    <div class="page-body-left">
      <div class="left-content">
        <div class="left-title">
          <div style="margin-top: 5px;">编辑管理员权限</div>
          <div style="flex-grow: 1;"></div>
          <el-button :disabled="!author1.managerEdit" style="margin-right: 10px;" type="primary"
            @click="confirmAuthor">确认权限</el-button>
        </div>
        <div class="manager-info">
          <div class="manager-info-row">
            <span>账号：</span>
            <span>{{ route.query.account }}</span>
          </div>
          <div class="manager-info-row">
            <span>手机号：</span>
            <span>{{ route.query.phoneNumber }}</span>
          </div>
          <div class="manager-info-row">
            <span>备注：</span>
            <span>{{ route.query.remark }}</span>
          </div>
        </div>
      </div>
    </div>
    <el-collapse class="page-body-right">
      <el-collapse-item title="学校管理" class="sup-node">
        <div class="mid-node">
          <div class="sub-node">
            <div class="sub-node-span">
              <span>班级管理</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.classShow.able" label="查看班级" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.classEdit.able" label="创建/编辑班级" size="large" />
            </div>
          </div>
          <div class="sub-node">
            <div class="sub-node-span">
              <span>教研组管理</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.teacherGroupShow.able" label="查看教研组" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.teacherGroupEdit.able" label="创建/编辑教研组" size="large" />
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="账号管理" class="sup-node">
        <div class="mid-node">
          <div class="sub-node">
            <div class="sub-node-span">
              <span>管理员管理</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.managerShow.able" label="查看管理员" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.managerEdit.able" label="创建/操作管理员" size="large" />
            </div>
          </div>
          <div class="sub-node">
            <div class="sub-node-span">
              <span>账号-设备管理</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.deviceShow.able" label="查看设备信息" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.deviceEdit.able" label="设备解绑" size="large" />
            </div>
          </div>
          <div class="sub-node">
            <div class="sub-node-span">
              <span>老师管理</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.teacherShow.able" label="查看老师" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.teacherEdit.able" label="创建/操作老师" size="large" />
            </div>
          </div>
          <div class="sub-node">
            <div class="sub-node-span">
              <span>学生管理</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.studentShow.able" label="查看学生" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.studentEdit.able" label="创建/操作学生" size="large" />
            </div>
          </div>
          <div class="sub-node">
            <div class="sub-node-span">
              <span>临时学生管理</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.temoryStudentShow.able" label="查看临时学生" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.temoryStudentEdit.able" label="编辑/转正临时学生" size="large" />
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="实时课堂" class="sup-node">
        <div class="mid-node">
          <div class="sub-node">
            <div class="sub-node-check">
              <el-checkbox v-model="author.liveClassShow.able" label="查看实时课堂" size="large" />
            </div>
            <div class="sub-node-check" style="margin-left: 15px;">
              <el-checkbox v-model="author.liveClassEdit.able" label="创建实时课堂" size="large" />
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="课程管理" class="sup-node">
        <div class="mid-node">
          <div class="sub-node">
            <div class="sub-node-span">
              <span>微课管理</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.miniLessonShow.able" label="查看微课" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.miniLessonEdit.able" label="审核/操作微课" size="large" />
            </div>
          </div>
          <div class="sub-node">
            <div class="sub-node-span">
              <span>课程包管理</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.coursePackageShow.able" label="查看课程包" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.coursePackageEdit.able" label="创建/操作课程包" size="large" />
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="商城管理" class="sup-node">
        <div class="mid-node">
          <div class="sub-node">
            <div class="sub-node-check">
              <el-checkbox v-model="author.shopShow.able" label="查看商品" size="large" />
            </div>
            <div class="sub-node-check" style="margin-left: 15px;">
              <el-checkbox v-model="author.shopEdit.able" label="创建/操作商品" size="large" />
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="题库管理" class="sup-node">
        <div class="mid-node">
          <div class="sub-node">
            <div class="sub-node-span">
              <span>好题包管理</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.questionPackageShow.able" label="查看好题包" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.questionPackageEdit.able" label="创建/操作好题包" size="large" />
            </div>
          </div>
          <div class="sub-node">
            <div class="sub-node-span">
              <span>题库管理</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.questionsShow.able" label="查看题库" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.questionsEdit.able" label="创建/删除题目" size="large" />
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="订单管理" class="sup-node">
        <div class="mid-node">
          <div class="sub-node">
            <div class="sub-node-check">
              <el-checkbox v-model="author.orderShow.able" label="查看订单" size="large" />
            </div>
            <div class="sub-node-check" style="margin-left: 15px;">
              <el-checkbox v-model="author.orderEdit.able" label="退课" size="large" />
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="消费管理" class="sup-node">
        <div class="mid-node">
          <div class="sub-node">
            <div class="sub-node-span">
              <span>学生积分管理</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.pointShow.able" label="查看积分" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.pointEdit.able" label="变更积分" size="large" />
            </div>
          </div>
          <div class="sub-node">
            <div class="sub-node-span">
              <span>学生T币管理</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.tCoinShow.able" label="查看T币" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.tCoinEdit.able" label="变更T币" size="large" />
            </div>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="设置" class="sup-node">
        <div class="mid-node">
          <div class="sub-node">
            <div class="sub-node-span">
              <span>作业情况分享</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.homeworkShow.able" label="查看作业" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.homeworkShare.able" label="分享作业给家长" size="large" />
            </div>
          </div>
          <div class="sub-node">
            <div class="sub-node-span">
              <span>分类管理</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.categoryShow.able" label="查看分类" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.categoryEdit.able" label="创建/删除分类" size="large" />
            </div>
          </div>
          <div class="sub-node">
            <div class="sub-node-span">
              <span>标签管理</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.tagShow.able" label="查看标签" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.tagEdit.able" label="创建/删除标签" size="large" />
            </div>
          </div>
          <div class="sub-node">
            <div class="sub-node-span">
              <span>课程类目</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.courseCategoryShow.able" label="查看 icon" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.courseCategoryEdit.able" label="创建/删除 icon" size="large" />
            </div>
          </div>
          <div class="sub-node">
            <div class="sub-node-span">
              <span>考试资讯</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.examInfoShow.able" label="查看考试资讯" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.examInfoEdit.able" label="创建/删除考试资讯" size="large" />
            </div>
          </div>
          <div class="sub-node">
            <div class="sub-node-span">
              <span>考试时间</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.examDateShow.able" label="查看考试时间" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.examDateEdit.able" label="编辑考试时间" size="large" />
            </div>
          </div>
          <div class="sub-node">
            <div class="sub-node-span">
              <span>banner</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.bannerShow.able" label="查看 banner" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.bannerEdit.able" label="创建/删除 banner" size="large" />
            </div>
          </div>
          <div class="sub-node">
            <div class="sub-node-span">
              <span>消息中心</span>
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.messageShow.able" label="查看消息" size="large" />
            </div>
            <div class="sub-node-check">
              <el-checkbox v-model="author.messageEdit.able" label="创建/删除消息" size="large" />
            </div>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style lang="scss" scoped>
.page-body {
  width: calc($page-width - 500px);
  min-height: calc($page-height - 15px);
  display: flex;
  flex-direction: row;
  margin-left: 15px;
  margin-top: 10px;

  .page-body-left {
    width: 400px;
    border: 1px solid var(--el-border-color);
    border-radius: 0;

    .left-content {
      margin-top: 10px;
      margin-left: 10px;

      .left-title {
        flex-direction: row;
        display: flex;
      }

      .manager-info {
        margin-left: 5px;
        flex-direction: column;

        .manager-info-row {
          flex-direction: row;
          display: flex;
          margin-top: 10px;
        }
      }
    }
  }

  .page-body-right {
    flex-direction: column;
    margin-left: 15px;
    width: 800px;
    border: 1px solid var(--el-border-color);
    border-radius: 0;

    .sup-node {
      flex-direction: column;
      margin-left: 15px;

      .mid-node {
        flex-direction: column;
        margin-left: 15px;

        .sub-node {
          flex-direction: row;
          margin-left: 15px;
          display: flex;

          .sub-node-span {
            width: 100px;
            margin-top: 8px;
          }

          .sub-node-check {
            width: 120px;
            margin-top: 0px;
          }
        }
      }
    }
  }
}
</style>
