<template>
  <div id="DocofPoliceOrgan">
    <el-container  class="about-container">
      <el-header>
        <header-right :username="role"></header-right>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu @select="changeSidebar" :unique-opened="true" :router="true" :default-active="$route.path">
            <!--            -->
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-s-data"></i>统计</template>
              <el-menu-item-group>
                <!--                <template slot="title">分组一</template>-->
                <el-menu-item index="/check1">数量统计</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-s-claim"></i>审批</template>
              <el-menu-item-group>
                <!--                <template slot="title">分组一</template>-->
                <el-menu-item index="/check2">未审批</el-menu-item>
                <el-menu-item index="/check3">已审批</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-s-home"></i>冻结数据</template>
              <el-menu-item-group>
                <!--                <template slot="title">分组一</template>-->
                <el-menu-item index="/PoliceOrgan1" style="height: 60px;line-height: 25px">协助,冻结解除冻结<br>电子数据通知书</el-menu-item>
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
  name: "DocofPoliceOrgan",
  components: {
    headerRight

  },
  data() {
    return {
      // 用户角色
      role:'公安机关'
    }
  },
  mounted() {
    this.$route.path="/check1"
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
