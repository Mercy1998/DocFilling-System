<template>
  <div id="DocofPoliceOrgan">
    <el-container  class="about-container">
      <el-header>
        <h1>文书填写系统</h1>
        <h5>您的角色：公安机关</h5>
        <el-button type="primary">退出登录</el-button>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu>
            <!--            -->
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-s-home"></i>调取数据</template>
              <el-menu-item-group>
                <!--                <template slot="title">分组一</template>-->
                <el-menu-item index="1-1">办案协作函</el-menu-item>
                <el-menu-item index="1-2">调取证据通知书</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: "DocofPoliceOrgan",
  components: {

  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {}
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  /* 标准盒子 */
  box-sizing: border-box;
}

.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: left;
  line-height: 60px;
}

.el-aside {
  background-color: #D3DCE6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.about-container{
  height: 100vh;
}
</style>
