<script setup lang="tsx">
import { getCustomerService, createCustomerService, editCustomerService, deleteCustomerService } from '@/apis/customerService'
import { ref, reactive } from 'vue'
import { ElButton, ElNotification } from 'element-plus'
import TablePage from '@/components/TablePage.vue'
import { useBreadcrumbStore } from '@/stores/breadcrumb'
import { upload } from '@/apis/upload';

const author = JSON.parse(localStorage.author)
const breadcrumbStore = useBreadcrumbStore()
breadcrumbStore.data = [{ name: '设置', path: '' }, { name: 'customer-service' }]
const loading = ref(true)
const tableColumns = [
  {
    dataKey: 'id',
    key: 'id',
    title: 'ID',
    width: 80
  },
  {
    dataKey: 'concatImageUrl',
    key: 'concatImageUrl',
    title: '客服二维码',
    width: 150,
    outerHeight: 150,
    cellRenderer: (item: any) => (
      <el-image
        fit="scale-down"
        src={item.rowData.concatImageUrl}
        //onClick={()=>console.log(item)}
        className="shop-Preview"
        preview-src-list={[item.rowData.concatImageUrl]}
        preview-teleported
      />
    )
  },
  {
    dataKey: 'name',
    key: 'name',
    title: '客服名称',
    width: 300
  },
  {
    key: 'option',
    title: '操作',
    cellRenderer: (item: any) => {
      const deleteSlot = {
        reference: () => <el-button disabled={!author.customerServiceEdit} link type="danger">删除</el-button>
      }
      return (
        <>
          <el-button disabled={!author.customerServiceEdit} link type="primary" onClick={() => customerServiceEdit(item)}>
            编辑
          </el-button>

          <el-popconfirm hide-after={0} width='170' title={`删除客服 ${item.rowData.name}`} onConfirm={() => customerServiceDelete(item)} v-slots={deleteSlot} />
        </>
      )
    },
    width: 100,
    fixed: 'right',
    align: 'center',
    height: 500
  }
]
const tableData: object[] = reactive([])

const customerServiceName = ref('')
const newCustomerServiceDialogShow = ref(false)
const editCustomerServiceDialogShow = ref(false)
const serviceId = ref('')
const showImgSrc = ref<string>('')

const newCustomerService = () => {
  newCustomerServiceDialogShow.value = true
  customerServiceName.value = ''
  showImgSrc.value = ''
}

const confirmNewCustomerService = () => {
  var args = {
    name: customerServiceName.value,
    concatImageUrl: showImgSrc.value
  }
  createCustomerService(args)
    .then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: '二维码已上传',
          type: 'success',
        })
        newCustomerServiceDialogShow.value = false
        loadData()
      } else {
        ElNotification({
          title: '上传失败',
          message: res.msg,
          type: 'error',
        })
      }
    })
    .catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'warning'
      })
    })
}

const cancelNewCustomerService = () => {
  newCustomerServiceDialogShow.value = false
}

const customerServiceEdit = (item: any) => {
  console.log(item.rowData)
  customerServiceName.value = item.rowData.name
  showImgSrc.value = item.rowData.concatImageUrl
  serviceId.value = item.rowData.id
  editCustomerServiceDialogShow.value = true
}

const confirmEditCustomerService = () => {
  var args = {
    id: serviceId.value,
    name: customerServiceName.value,
    concatImageUrl: showImgSrc.value
  }
  editCustomerService(args)
    .then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: '修改成功',
          type: 'success',
        })
        editCustomerServiceDialogShow.value = false
        loadData()
      } else {
        ElNotification({
          title: '上传失败',
          message: res.msg,
          type: 'error',
        })
      }
    })
    .catch((res: any) => {
      ElNotification({
        title: '未知错误',
        message: res.msg,
        type: 'warning'
      })
    })
}

const cancelEditCustomerService = () => {
  editCustomerServiceDialogShow.value = false
}

const customerServiceDelete = (item: any) => {
  var args = {
    id: item.rowData.id
  }
  deleteCustomerService(args)
    .then((res: any) => {
      if (res.code == '20000') {
        ElNotification({
          title: '成功',
          message: `客服 ${item.rowData.name} 已删除`,
          type: 'success',
        })
      } else {
        ElNotification({
          title: '删除失败',
          type: 'error',
        })
      }
      loadData()
    })
    .catch()
}

const bgc = ref('#e2e5ec')
const mouseEnter = () => {
  bgc.value = '#BEC2CB'
}
const mouseLeave = () => {
  bgc.value = '#e2e5ec'
}
const handleFileChange = (e: Event) => {
  const currentTarget = e.target as HTMLInputElement;
  //图片上传到服务器返回url
  //url在res.data.url
  if (currentTarget.files) {
    console.log(currentTarget.files[0])
    var imageSize = currentTarget.files[0].size
    var formData = new FormData()
    formData.append('file', currentTarget.files[0])
    console.log(formData)
    if (imageSize < 1048576) {
      upload(formData)
        .then((res: any) => {
          if (res.code != 20000) {
            ElNotification({
              title: '封面上传失败',
              message: res.msg,
              type: 'error'
            })
          } else {
            showImgSrc.value = res.data.url
          }
        })
        .catch()
    } else {
      console.log("too big")
      ElNotification({
        title: '图片不能大于1MB',
        type: 'error'
      })
    }
  }
}

const dataCompute = (data: any) => {
  tableData.length = 0
  data.data.records.forEach((item: any) => {
    tableData.push(item)
  });
}

const loadData = () => {
  loading.value = true
  getCustomerService()
    .then((res) => {
      dataCompute(res)
    })
    .catch()
    .finally(() => {
      loading.value = false
    })
}
loadData()

</script>

<template>
  <div>
    <TablePage class="banner-table" :loading="loading" :columns="tableColumns" :data="tableData" :row-height="59">
      <div>
        <el-button :disabled='!author.customerServiceEdit' @click="newCustomerService" class="new-banner-button"
          type="primary">新增</el-button>
      </div>
    </TablePage>

    <el-dialog class="new-class-dialog" width="370px" v-model="newCustomerServiceDialogShow">
      <div>

        <div class="upload-file-area" @mouseenter="mouseEnter" @mouseleave="mouseLeave" @dragenter="mouseEnter"
          @dragleave="mouseLeave">
          <img class="show-img" id="show_img" :src="showImgSrc" />
          <div class="upload-file-area-text">
            <el-text>点击此处或拖拽上传二维码图片</el-text>
            <el-text>图片不大于1MB</el-text>
            <el-text>只接受 *.png *.jpg *.jpeg</el-text>
          </div>

          <input class="upload-file-input" type="file" accept="image/png, image/jpeg, image/jpg"
            @change="handleFileChange" />
        </div>

        <div class="div-input-element">
          <span class="dialog-span">
            <el-text style="color:#ff0000">*</el-text>
            客服名称:
          </span>
          <el-input class="dialog-input" v-model="customerServiceName">
          </el-input>
        </div>
      </div>
      <template #header>
        <el-text>新建客服</el-text>
      </template>
      <template #footer>
        <el-button type="primary" @click="confirmNewCustomerService">确定</el-button>
        <el-button @click="cancelNewCustomerService">
          取消
        </el-button>
      </template>
    </el-dialog>

    <el-dialog class="new-class-dialog" width="370px" v-model="editCustomerServiceDialogShow">
      <div>

        <div class="upload-file-area" @mouseenter="mouseEnter" @mouseleave="mouseLeave" @dragenter="mouseEnter"
          @dragleave="mouseLeave">
          <img class="show-img" id="show_img" :src="showImgSrc" />
          <div class="upload-file-area-text">
            <el-text>点击此处或拖拽上传二维码图片</el-text>
            <el-text>图片不大于1MB</el-text>
            <el-text>只接受 *.png *.jpg *.jpeg</el-text>
          </div>

          <input class="upload-file-input" type="file" accept="image/png, image/jpeg, image/jpg"
            @change="handleFileChange" />
        </div>

        <div class="div-input-element">
          <span class="dialog-span">
            <el-text style="color:#ff0000">*</el-text>
            客服名称:
          </span>
          <el-input class="dialog-input" v-model="customerServiceName">
          </el-input>
        </div>
      </div>
      <template #header>
        <el-text>编辑</el-text>
      </template>
      <template #footer>
        <el-button type="primary" @click="confirmEditCustomerService">确定</el-button>
        <el-button @click="cancelEditCustomerService">
          取消
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
$gap: 15px;

.upload-file-area {
  // text-align: center;
  width: 300px;
  min-height: 200px;
  //height: 300px;
  background-color: v-bind(bgc);
  margin-bottom: 15px;
  //border-radius: 5px;
  position: relative;
  display: flex;
  align-items: center;

  // &:hover{
  //   background-color: green;
  // }
  >.show-img {
    //height: 300px;
    width: 300px;
    height: auto;
    //border-radius: 5px;
    pointer-events: none;
    //position: absolute;
    //top: 80px;
    z-index: 3;
  }

  >.upload-file-area-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
  }

  >.upload-file-input {
    position: absolute;
    opacity: 0;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
  }
}

.banner-table {
  width: calc($page-width - $gap);
  height: calc($page-height - $gap);
  margin-left: $gap;
  margin-top: $gap;

  .new-banner-button {
    margin-left: $gap;
    margin-bottom: $gap;
  }
}

.displaypic {
  width: 100px;
  height: 100px;
}

.el-image {
  width: 59px;
}

.div-input-element {
  display: flex;
  align-items: center;
  justify-content: right;
  margin-bottom: 13px;

  >.dialog-span {
    margin-right: 10px;
  }

  >.dialog-input {
    width: 200px;
  }
}
</style>
