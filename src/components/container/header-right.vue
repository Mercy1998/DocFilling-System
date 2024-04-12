<!--电子数据提取固定清单-->
<template>
  <div id="header-right">
    <h1>文书填写系统</h1>
    <div id="my-right">
      <span>您的角色：侦察人员</span>
      <el-button type="primary" @click="quit">退出</el-button>
    </div>

  </div>
</template>

<script>
export default {
  name:'header-right',
  data(){
    return{

    }
  },
  methods:{
    quit(){
        this.$confirm('此操作将退出页面, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '退出账号'
          });
          this.$router.replace({path:"/Login"});
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });

    }
  }
}
</script>

<style>
#my-right{
  position: absolute;
  color: black;
  left: 82%;
  top:0;

  height: 50px;
//font-size: 1em;

}
</style>
