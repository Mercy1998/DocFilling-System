<template>
  <div id="my-menu"  style="background-color: #545C64;height: 500px">
    <el-row>
      <el-col :span="12">
      <h5 id="my-title">个金理财金理计分</h5>
      <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
        <el-menu-item index="1">
          <i class="el-icon-menu"></i>
          <span slot="title">查询</span>
        </el-menu-item>
        <el-menu-item index="2">
          <i class="el-icon-menu"></i>
          <span slot="title">添加</span>
        </el-menu-item>
        <el-menu-item index="3">
          <i class="el-icon-menu"></i>
          <span slot="title">设置</span>
        </el-menu-item>
      </el-menu>
    </el-col>
    </el-row>
  </div>
</template>

<script>
//TODO：菜单栏
  export default {
    name:'my-menu',
    data(){
      return {

      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  .el-menu-item {
    width: 180px;
    //padding-left: 0px;
    //padding-right: 0px;
  }
  #my-title{
    width: 180px;
    height:50px;
    text-align: center;
    color: #ffffff;
    line-height: 50px;
  }
</style>
