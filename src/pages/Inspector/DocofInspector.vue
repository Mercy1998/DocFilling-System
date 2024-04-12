<template>
  <div id="DocofInspector">
    <el-container  class="about-container">
      <el-header>
        <header-right :username="role"></header-right>
      </el-header>

      <el-container>
        <el-aside width="200px">
          <el-menu @select="changeSidebar" :unique-opened="true" :router="true">
            <!--            -->
            <el-submenu index="1">
              <template slot="title"><i class="el-icon-s-home"></i>现场提取</template>
              <el-menu-item-group>
                <!--                <template slot="title">分组一</template>-->
                <el-menu-item index="/Inspector5">现场提取笔录</el-menu-item>
                <el-menu-item index="/Inspector7">电子数据提取固定清单</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="2">
              <template slot="title"><i class="el-icon-share"></i>网络提取</template>
              <el-menu-item-group>
                <el-menu-item index="/Inspector4">网络在线提取笔录</el-menu-item>
                <el-menu-item index="/Inspector7">电子数据提取固定清单</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
              <template slot="title"><i class="el-icon-s-release"></i>扣押介质</template>
              <el-menu-item-group>
                <el-menu-item index="/Inspector1">扣押清单</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
              <template slot="title"><i class="el-icon-s-data"></i>数据检查</template>
              <el-menu-item-group>
                <el-menu-item index="/Inspector2">电子数据检查笔录</el-menu-item>
                <el-menu-item index="/Inspector7">电子数据提取固定清单</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-s-claim"></i>远程勘验</template>
              <el-menu-item-group>
                <el-menu-item index="/Inspector6">远程勘验笔录</el-menu-item>
                <el-menu-item index="/Inspector7">电子数据提取固定清单</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><i class="el-icon-s-check"></i>检验与鉴定</template>
            </el-submenu>
            <el-submenu index="7">
              <template slot="title"><i class="el-icon-s-claim"></i>数据侦察</template>
              <el-menu-item-group>
                <el-menu-item index="/Inspector3">侦查实验笔录</el-menu-item>
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

import headerRight from "../../components/container/header-right.vue";

export default {
  name: "DocofInspector",
  components: {
    headerRight

  },
  data() {
    return {
      role:'侦察人员'
    }
  },
  // mounted() {
  //   this.sidebarItem = this.$route.name;
  // },
  methods: {
    changeSidebar(path) {
      window.sessionStorage.clear()
      this.$router.push('/Login')
    },
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
