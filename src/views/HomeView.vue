<template>
  <el-container style="min-height: 100vh">
    <el-aside :width="sideWidth + 'px'"
              style="background-color: rgb(238, 241, 246); box-shadow: 2px 0 6px rgb(0 21 41 / 35%);">
      <el-menu :collapse="isCollapse" :collapse-transition="false"
               :default-openeds="['1', '3']"
               active-text-color="#ffd04b"
               background-color="rgb(48, 65, 86)"
               style="min-height: 100%; overflow-x: hidden"
               text-color="#fff"
      >
        <div style="height: 60px; line-height: 60px; text-align: center">
          <img alt="" src="../assets/logo.png" style="width: 20px; position: relative; top: 5px; margin-right: 5px">
          <b v-show="logoTextShow" style="color: white">后台管理系统</b>
        </div>
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-message"></i>
            <span slot="title">导航一</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="1-1">选项1</el-menu-item>
            <el-menu-item index="1-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="1-4">
            <template slot="title">选项4</template>
            <el-menu-item index="1-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-setting"></i>
            <span slot="title">导航三</span>
          </template>
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>

      <el-header style="font-size: 12px; border-bottom: 1px solid #ccc; line-height: 60px; display: flex">
        <div style="flex: 1; font-size: 20px">
          <span :class="collapseBtnClass" style="cursor: pointer" @click="collapse"></span>
        </div>
        <el-dropdown style="width: 70px; cursor: pointer">
          <span>王小虎</span><i class="el-icon-arrow-down" style="margin-left: 5px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人信息</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-header>

      <el-main>
        <div style="margin-bottom: 30px">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div style="margin: 10px 0">
          <el-input v-model="userName" placeholder="请输入用户名" style="width: 200px"
                    suffix-icon="el-icon-search"></el-input>
          <el-input v-model="nickName" class="ml-5" placeholder="请输入昵称" style="width: 200px"
                    suffix-icon="el-icon-search"></el-input>
          <el-button class="ml-5" type="primary" v-on:click="search">搜索</el-button>
          <el-button class="ml-5" type="warning" v-on:click="reset">重置</el-button>
        </div>
        <div style="margin: 10px 0">
          <el-button type="primary" @click="dialogVisible = true">新增 <i class="el-icon-circle-plus-outline"></i>
          </el-button>
          <el-button type="danger">批量删除 <i class="el-icon-document-delete"></i></el-button>
          <el-button type="primary">导入 <i class="el-icon-upload2"></i></el-button>
          <el-button type="primary">导出 <i class="el-icon-download"></i></el-button>
        </div>
        <el-table :data="tableData" border stripe>
          <el-table-column label="id" prop="id" width="45px"/>
          <el-table-column label="用户名" prop="userName"/>
          <el-table-column label="昵称" prop="nickName"/>
          <el-table-column label="密码" prop="passWord"/>
          <el-table-column label="邮箱" prop="email"/>
          <el-table-column label="地址" prop="address"/>
          <el-table-column label="电话号码" prop="phoneNumber"/>
          <el-table-column v-slot="scope" label="操作">
            <el-button type="danger" v-on:click="deleteConfirm(scope.row.id)">删除</el-button>
            <el-button type="primary">编辑</el-button>
          </el-table-column>
        </el-table>
        <div style="padding: 10px 0">
          <el-pagination
              :current-page="currentPage"
              :page-size="pageSize"
              :total="total"
              layout="total, sizes, prev, pager, next, jumper"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange">
          </el-pagination>
        </div>

        <el-dialog :visible.sync="dialogVisible" title="用户信息" width="30%">
          <el-form>
            <el-form-item>
              <el-input v-model="form.userName" autocomplete="off">
                <template slot="prepend">用户名</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.nickName" autocomplete="off">
                <template slot="prepend">昵称</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.passWord" autocomplete="off">
                <template slot="prepend">密码</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.email" autocomplete="off">
                <template slot="prepend">邮箱</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.address" autocomplete="off">
                <template slot="prepend">地址</template>
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="form.phoneNumber" autocomplete="off">
                <template slot="prepend">电话号码</template>
              </el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false" v-on:click="createUser">确 定</el-button>
          </div>
        </el-dialog>

      </el-main>

    </el-container>
  </el-container>
</template>

<script>

import request from "@/utils/request";

export default {
  name: 'Home',
  data() {
    return {
      userName: '',
      nickName: '',
      tableData: [],
      collapseBtnClass: 'el-icon-s-fold',
      isCollapse: false,
      sideWidth: 200,
      logoTextShow: true,
      currentPage: 1,
      pageSize: 10,
      total: 10,
      dialogVisible: false,
      formLabelWidth: '80px',
      form: {
        userName: '',
        nickName: '',
        passWord: '',
        email: '',
        address: '',
        phoneNumber: ''
      },
    }
  },
  created() {
    this.getUserInfo(this.currentPage, this.pageSize);
  },
  methods: {
    //获取用户信息
    getUserInfo: function (currentNum, pageSize) {
      request.get("user/index", {
        params: {
          currentNum: currentNum,
          pageSize: pageSize,
          userName: this.userName,
          nickName: this.nickName
        }
      }).then(res => {
        if (res.data.userInfo.length === 0) {
          this.$message({
            message: "没有找到此人",
            type: 'error'
          })
        } else {
          this.total = res.data.total
          this.tableData = res.data.userInfo
        }
      })
    },

    //删除弹窗
    deleteConfirm: function (id) {
      this.$confirm("此操作将删除一条数据，是否继续", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "error"
      }).then(() => {
        this.delUser(id)
      }).catch(() => {
        this.$message({
          message: "已取消删除",
          type: "info"
        })
      })
    },

    //删除操作
    delUser: function (id) {
      request.delete("user/delete", {
        params: {
          id: id
        }
      }).then(res => {
        if (res.code === 200) {
          this.$message({
            message: "成功删除",
            type: "success"
          });
          this.getUserInfo(this.currentPage, this.pageSize)
        } else {
          this.$message({
            message: res.msg,
            type: "error"
          })
        }
      })
    },

    //收缩按钮
    collapse: function () {  // 点击收缩按钮触发
      this.isCollapse = !this.isCollapse
      if (this.isCollapse) {  // 收缩
        this.sideWidth = 64
        this.collapseBtnClass = 'el-icon-s-unfold'
        this.logoTextShow = false
      } else {   // 展开
        this.sideWidth = 200
        this.collapseBtnClass = 'el-icon-s-fold'
        this.logoTextShow = true
      }
    },

    //页面大小变化
    handleSizeChange(pageSize) {
      this.userName = ''
      this.nickName = ''
      this.pageSize = pageSize
      this.getUserInfo(this.currentPage, this.pageSize)
    },

    //搜索
    search: function () {
      if (this.userName !== '' || this.nickName !== '') {
        this.getUserInfo(1, 9999)
      }
    },

    //重置
    reset: function () {
      this.userName = ''
      this.nickName = ''
      this.getUserInfo(this.currentPage, this.pageSize)
    },

    //当前页面变化
    handleCurrentChange(currentNum) {
      this.userName = ''
      this.nickName = ''
      this.currentPage = currentNum
      this.getUserInfo(this.currentPage, this.pageSize)
    }
  }
}
</script>
