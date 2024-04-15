<template>
  <div id="DocofPolice">
    <el-container  class="about-container">
      <el-header>
        <header-right :username="role"></header-right>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu @select="changeSidebar" :unique-opened="true" :router="true">
            <!--            -->
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-s-home"></i>调取数据</template>
              <el-menu-item-group>
<!--                <template slot="title">分组一</template>-->
                <el-menu-item index="/Police1">办案协作涵</el-menu-item>
                <el-menu-item index="/Police2">调取电子数据通知书</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

import axios from 'axios';
import headerRight from "../../components/container/header-right.vue";
export default {
  name: "DocofPolice",
  components: {
    headerRight
  },
  data() {
    return {
      role:'民警'
    }
  },
  created() {
  },
  methods: {
    changeSidebar(path) {
      console.log(path)
      this.$router.push(path)
    }
  }
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
