<template>
  <div id="DocofInspector">
    <el-container>
      <el-header>文书填写系统</el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu>
<!--            -->
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>现场提取</template>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-message"></i>网络提取</template>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-message"></i>导航三</template>
            </el-submenu>
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-message"></i>导航四</template>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-message"></i>导航五</template>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-message"></i>导航六</template>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import axios from 'axios';

export default {
  name: "DocofInspector",
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
  height: 500px;
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
</style>
