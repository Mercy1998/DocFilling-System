<template>
  <div id="DocofPolice">
    <el-container  class="about-container">
      <el-header>
        <h1>文书填写系统</h1>
          <el-button type="primary">退出登录</el-button>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu>
            <!--            -->
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-s-home"></i>现场提取</template>
              <el-menu-item-group>
<!--                <template slot="title">分组一</template>-->
                <el-menu-item index="1-1">现场提取笔录</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-share"></i>网络提取</template>
              <el-menu-item-group>
                <el-menu-item index="1-1">网络在线提取笔录</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-s-release"></i>扣押介质</template>
              <el-menu-item-group>
                <el-menu-item index="1-1">扣押清单</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-s-data"></i>数据检查</template>
              <el-menu-item-group>
                <el-menu-item index="1-1">电子数据检查笔录</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-s-claim"></i>远程勘验</template>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-s-check"></i>检验与鉴定</template>
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
  name: "DocofPolice",
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
