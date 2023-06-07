<template>
    <div class="wrap">
      <!-- 动态生成form表单 -->
      <div class="form_wrap">
        <el-form :model="form" ref="formData" :rules="rules">
          <el-row>
            <div
              class="finance_wrap_box_list"
              v-for="(item, index) in form.otherFeesList"
              :key="index"
            >
              <el-row>
                <el-col
                  :span="24"
                  style="
                    height: 40px;
                    display: flex;
                    justify-content: space-between;
                  "
                >
                  <el-form-item
                    :label="'费用' + index"
                    :prop="'otherFeesList.' + index + '.feePrice'"
                    :rules="rules.moreNotifyOjbectName"
                    style="height: 50px; width: 100%"
                    label-width="100px"
                  >
                    <el-input
                      v-model="item.feePrice"
                      @blur="inputFunc($event)"
                      size="small"
                      style="width: 60%"
                      clearable
                      placeholder="请输入"
                    >
                    </el-input>
                  </el-form-item>
                  <div
                    class="remove_btn"
                    @click="removeList(index)"
                    style="line-height: 45px; cursor: pointer"
                  >
                    <i class="el-icon-circle-close"></i>
                  </div>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="24" style="height: 40px; margin-bottom: 20px">
                  <el-form-item
                    label-width="100px"
                    :prop="'otherFeesList.' + index + '.feeDesc'"
                    :rules="rules.moreNotifyOjbectText"
                  >
                    <el-input
                      size="small"
                      v-model="item.feeDesc"
                      clearable
                      maxlength="100"
                      minlength="4"
                      @change="inputFuncFeeDesc($event)"
                      style="width: 95%"
                      placeholder="请输入费用说明 例：差旅费，因老师在异地故提供额外交通费"
                    >
                    </el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </div>
            <el-row>
              <el-col :span="24">
                <div class="add_list" @click="addList()">
                  <i class="el-icon-plus" style="font-weight: bold"></i> 添加
                </div>
              </el-col>
            </el-row>
          </el-row>
        </el-form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        form: {
          otherFeesList: [
            {
              id: "",
              feeDesc: "", //费用说明
              feePrice: "", //费用金额
            },
          ],
        },
        rules: {
          moreNotifyOjbectName: [
            {
              required: true,
              trigger: "blur",
              message: "金额不能为空",
            },
            {
              pattern:
                /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
              message: "请输入正确格式，可保留两位小数",
            },
          ],
        },
      };
    },
  
    methods: {
      addList() {
        this.form.otherFeesList.push({
          id: "",
          feeDesc: "", //费用说明
          feePrice: "", //费用金额
        });
      },
      removeList(index) {
        this.form.otherFeesList.splice(index, 1);
      },
    },
  };
  </script>
  
  <style>
  .form_wrap {
    width: 500px;
    margin: 20px auto;
  }
  .add_list {
    width: 80%;
    border: 1px solid;
    text-align: center;
    font-size: 14px;
    margin: 0 auto;
    cursor: pointer;
    height: 30px;
    line-height: 30px;
  }
  </style>
