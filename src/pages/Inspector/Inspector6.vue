<!--远程勘验-->
<template>
  <div id="Inspector6">
    <my-header1 :doc-title="docTitle"></my-header1>
    <el-form :label-position="labelPosition" ref="Inspector6" :model="Inspector6" label-width="98px" style="width: 95%">
      <el-form-item label="申请时间">
        <el-date-picker type="datetime" placeholder="选择日期" v-model="Inspector6.rowDate" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="申请人">
        <el-input v-model="Inspector6.applicant" placeholder="请输入申请人姓名"></el-input>
      </el-form-item>
      <el-form-item label="指派人员">
        <el-input v-model="Inspector6.Inspectors" placeholder="请输入姓名"></el-input>
      </el-form-item><br>
      <el-form-item label="检查时间">
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="开始时间" v-model="Inspector6.rowDate2" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="结束时间" v-model="Inspector6.rowDate3" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="检查地点">
        <el-input v-model="Inspector6.place"></el-input>
      </el-form-item><br>

      <h5>指挥人员</h5>
      <el-form-item label="姓名">
        <el-input v-model="Inspector6.commander"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="Inspector6.cUnit"></el-input>
      </el-form-item><br>
      <h5>检查人员</h5>
      <el-form-item label="姓名">
        <el-input v-model="Inspector6.Inspectors"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="Inspector6.iUnit"></el-input>
      </el-form-item><br>
      <el-form-item label="见证人">
        <el-input v-model="Inspector6.witness"></el-input>
      </el-form-item>
      <el-form-item label="远程勘验对象">
        <el-input v-model="Inspector6.target"></el-input>
      </el-form-item><br>

      <el-form-item label="事由及目的">
        <el-input  type="textarea"
                   :rows="2"
                   placeholder=""
                   v-model="Inspector6.objective"></el-input>
      </el-form-item><br>
      <el-form-item label="过程、方法及结果">
        <el-input type="textarea"
                  :rows="3"
                  placeholder="" v-model="Inspector6.way"></el-input>
      </el-form-item><br>
      <el-form-item>
        <el-button type="primary" @click="generate">导出</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>


import {export2Word} from "../../../static/utils/Export2Word.js";
import {formatDateTime} from "../../../static/utils/utilities.js"
import MyHeader1 from "../../components/container/my-header1.vue";
export default {
  name: "Inspector6",
  components: {
    MyHeader1
  },
  data() {
    return {
      Inspector6:{
        rowDate:'', //20{Year}年{Month}月{Date}日{Hour}时{minute}分
        applicant:'',
        rowDate2:'',
        rowDate3:'',
        place:'',
        commander:'',
        cUnit:'',
        Inspectors:'',
        iUnit:'',
        target:'',
        objective:'',
        way:''
      },
      labelPosition:'right',
      docTitle: "远程勘验笔录"
    }
  },
  created() {
  },
  methods: {
    generate() {
      console.log("转换前"+this.Inspector6)
      //时间格式转换
      this.Inspector6.rowDate = formatDateTime(new Date(this.Inspector6.rowDate))
      this.Inspector6.rowDate2 = formatDateTime(new Date(this.Inspector6.rowDate2))
      this.Inspector6.rowDate3 = formatDateTime(new Date(this.Inspector6.rowDate3))
      console.log("转换后"+this.Inspector6)
      let that = this.Inspector6
      export2Word("侦察人员/远程勘验笔录","远程勘验笔录",that)
    },

  }
}
</script>

<style>

#Inspector6 {
  background-color: #f7f8f9;

}
h5{
  padding-bottom: 5px;
}

</style>
