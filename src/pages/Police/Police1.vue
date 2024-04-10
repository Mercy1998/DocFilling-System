<template>
  <div id="Police1">
    <!--    标题-->
    <h3>* * * 公安局</h3>
    <h2>办案协作函</h2>
<!--    <h3>（存 根）</h3>-->
<!--    <h5>x公( {{No1}})协字[ {{No2}}]号</h5>-->
      <h5>x公( )协字[ ]号</h5>
    <!--    表单-->
    <el-form :label-position="labelPosition" :inline="true" class="demo-form-inline" ref="fetchData1" :model="fetchData1" label-width="90px">
      <el-form-item label="案件名称">
        <el-input v-model="fetchData1.name"></el-input>
      </el-form-item>
      <el-form-item label="案件编号">
        <el-input v-model="fetchData1.ID"></el-input>
      </el-form-item><br>
      <el-form-item label="犯罪嫌疑人">
        <el-radio-group v-model="fetchData1.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item label="出生日期">
        <el-date-picker type="date" placeholder="选择日期" v-model="fetchData1.birth" style="width: 100%;"></el-date-picker>
      </el-form-item><br>

      <el-form-item label="住址">
        <el-input v-model="fetchData1.address"></el-input>
      </el-form-item>

      <el-form-item label="单位及职业">
        <el-input v-model="fetchData1.job"></el-input>
      </el-form-item><br>

      <el-form-item label="协作单位">
        <el-input v-model="fetchData1.coUnit"></el-input>
      </el-form-item>

      <el-form-item label="协作事项">
        <el-input v-model="fetchData1.coEvent"></el-input>
      </el-form-item><br>

      <el-form-item label="批准人">
        <el-input v-model="fetchData1.approver"></el-input>
      </el-form-item>

      <el-form-item label="批准时间">
        <el-date-picker type="date" placeholder="选择日期" v-model="fetchData1.approveDate" style="width: 100%;"></el-date-picker>
      </el-form-item><br>

      <el-form-item label="办案人">
        <el-input v-model="fetchData1.pHand"></el-input>
      </el-form-item>

      <el-form-item label="办案单位">
        <el-input v-model="fetchData1.uHand"></el-input>
      </el-form-item><br>

      <el-form-item label="填发时间">
        <el-date-picker type="date" placeholder="选择日期" v-model="fetchData1.fillingDate" style="width: 100%;"></el-date-picker>
      </el-form-item>

      <el-form-item label="填发人">
        <el-input v-model="fetchData1.fillingPer"></el-input>
      </el-form-item><br>
      <el-form-item>
        <el-button type="primary" @click="generate">导出</el-button>
        <el-button type="success" @click="next">下一步</el-button>
        <el-button type="danger" @click="clearAll">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import axios from 'axios';
import FetchData1 from "../../components/Police/FetchData1.vue";
import 'docxtemplater/build/docxtemplater.js'
import 'pizzip/dist/pizzip.js'
import 'pizzip/dist/pizzip-utils.js'
import 'file-saver'
import {export2Word} from "../../../static/utils/Export2Word";
export default {
  name: "Police1",
  // components: {
  //   FetchData1
  // },
  data() {
    return {
      // No:{
      //     No1:'',
      //     No2:''
      // },
      fetchData1: {
        name: '',
        ID: '',
        gender: '',
        birth: '',
        address: '',
        job: '',
        coUnit: '',
        coEvent: '',
        approver: '',
        approveDate: '',
        pHand: '',
        uHand: '',
        fillingDate: '',
        fillingPer: ''
      },
      labelPosition: 'right',
    }
  },
  methods: {
    onSubmit() {
      console.log('submit!');
      console.log(this.fetchData1)
    },
    // 导出word
    generate() {
      let that = this.fetchData1
      export2Word("民警/办案协作函","办案协作函",that)
    },
    next(){},
    clearAll(){
      this.$confirm('此操作将清空内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '清空成功!'
        });
        this.fetchData1 = []
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
* {
  padding: 0;
  margin: 0 auto;
  /* 标准盒子 */
  box-sizing: border-box;
}
#Police1 {
  background-color: #f7f8f9;
}

</style>

