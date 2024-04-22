<!--调取电子数据通知书-->
<template>
  <div id="Police2">
    <!--    标题-->
    <h3>* * * 公安局</h3>
<!--    <h2>调取证据通知书</h2>-->
    <!--    <h3>（存 根）</h3>-->
    <!--    <h5>x公( {{No1}})协字[ {{No2}}]号</h5>-->
    <my-header1 :doc-title="docTitle"></my-header1>
    <h5>x公( )调证字[ ]号</h5>
    <!--    表单-->
    <el-form :label-position="labelPosition" :inline="true" class="demo-form-inline" ref="fPolice2" :model="Police2" label-width="90px">
      <el-form-item label="案件名称">
        <el-input v-model="Police2.name"></el-input>
      </el-form-item>
      <el-form-item label="案件编号">
        <el-input v-model="Police2.ID"></el-input>
      </el-form-item><br>
      <el-form-item label="证据持有人">
        <el-input v-model="Police2.holder"></el-input>
      </el-form-item>

      <el-form-item label="住址">
        <el-input v-model="Police2.address"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="调取证据">
        <el-input v-model="Police2.evidence"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="批准人">
        <el-input v-model="Police2.approver"></el-input>
      </el-form-item>
      <el-form-item label="批准时间">
        <el-date-picker type="date" placeholder="选择日期" v-model="Police2.approveDate" style="width: 100%;"></el-date-picker>
      </el-form-item><br>
      <el-form-item label="办案人">
        <el-input v-model="Police2.pHand"></el-input>
      </el-form-item>
      <el-form-item label="办案单位">
        <el-input v-model="Police2.uHand"></el-input>
      </el-form-item><br>

      <el-form-item label="填发时间">
        <el-date-picker type="date" placeholder="选择日期" v-model="Police2.fillingDate" style="width: 100%;"></el-date-picker>
      </el-form-item>

      <el-form-item label="填发人">
        <el-input v-model="Police2.fillingPer"></el-input>
      </el-form-item><br>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="primary" @click="generate">导出</el-button>
<!--        <el-button type="success" @click="next">下一步</el-button>-->
        <el-button type="danger" @click="clearAll">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import axios from 'axios';

import {export2Word} from "../../../static/utils/Export2Word";
import MyHeader1 from "../../components/container/my-header1.vue";
import {save2DB} from "../../../static/utils/utilities.js";
export default {
  name: "Police2",
  components: {MyHeader1},
  // components: {
  //   Police2
  // },
  data() {
    return {
      // No:{
      //     No1:'',
      //     No2:''
      // },
      docTitle:"调取证据通知书",
      Police2: {
        name: '',
        ID: '',
        holder: '',
        address: '',
        approver: '',
        approveDate: '',
        evidence:'',
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
      console.log(this.Police2)
    },
    // 导出word
    generate() {
      let that = this.Police2
      export2Word("民警/调取电子数据通知书","调取证据通知书",that)
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
        this.Police2 = []
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });
    },
    save(){
      save2DB(this.docTitle,this.Police2)
    }

  }
}

</script>

<style>
#Police2 {
  padding: 0;
  margin: 0;
  background-color: #f7f8f9;
}

</style>

