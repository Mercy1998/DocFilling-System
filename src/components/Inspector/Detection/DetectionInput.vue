<template>
  <div id="DetectionInput">
    <el-form :model="inputBox" :inline="true" class="demo-form-inline" ref="inputBox">
      <el-form-item label="编号" prop="ID">
        <el-input v-model="inputBox.ID" placeholder="请输入编号"></el-input>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="inputBox.name" placeholder="请输入介质名称"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="quantity">
        <el-input-number v-model="inputBox.quantity" :min="0" :max="100"></el-input-number>
      </el-form-item><br>
      <el-form-item label="特征" prop="feature">
        <el-input v-model="inputBox.feature" placeholder="请输入特征"></el-input>
      </el-form-item>
      <el-form-item label="来源" prop="from">
        <el-input v-model="inputBox.from" placeholder="请输入来源"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="remark">
        <el-input v-model="inputBox.remark" placeholder="请输入备注" size="small"></el-input>
      </el-form-item>
      <br>
      <el-form-item>
        <!-- <el-button type="primary" @click="onSubmit('inputBox')">提交</el-button>
        <el-button @click="onReset('inputBox')">重置</el-button> -->
        <el-button type="primary" @click="onSubmit()">添加</el-button>
<!--        <el-button @click="search()">查询</el-button>-->
        <el-button @click="onReset('inputBox')"> 重置</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
export default {
  name:'DetectionInput',
  data(){
    return{
      inputBox:{
        ID:'',
        name:'',
        quantity:'',
        feature:'',
        from:'',
        remark:''
      }
    }
  },
  methods:{
    onSubmit() {
      //传值
      this.$emit('getFormData', this.inputBox);
      //清空
      this.$refs['inputBox'].resetFields();
    }
  }
}
</script>

<style>

</style>
