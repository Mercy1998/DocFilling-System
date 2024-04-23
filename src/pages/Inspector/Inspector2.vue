<!--电子数据检查笔录-->
<template>
  <div id="Inspector2">
    <my-header1 :doc-title="docTitle"></my-header1>
    <el-form :label-position="labelPosition" ref="Inspector2" :model="Inspector2" label-width="98px" style="width: 95%">
      <el-form-item label="申请时间">
        <el-date-picker type="datetime" placeholder="选择日期" v-model="Inspector2.rowDate" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="申请人">
        <el-input v-model="Inspector2.applicant" placeholder="请输入申请人姓名"></el-input>
      </el-form-item>
      <el-form-item label="指派人员">
        <el-input v-model="Inspector2.Inspectors" placeholder="请输入姓名"></el-input>
      </el-form-item><br>
      <el-form-item label="检查时间">
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="开始时间" v-model="Inspector2.rowDate2" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="结束时间" v-model="Inspector2.rowDate3" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="检查地点">
        <el-input v-model="Inspector2.place"></el-input>
      </el-form-item><br>

      <h5>指挥人员</h5>
      <el-form-item label="姓名">
        <el-input v-model="Inspector2.commander"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="Inspector2.cUnit"></el-input>
      </el-form-item>
      <el-form-item label="职业">
        <el-input v-model="Inspector2.cDuty"></el-input>
      </el-form-item><br>
      <h5>检查人员</h5>
      <el-form-item label="姓名">
        <el-input v-model="Inspector2.Inspector"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="Inspector2.iUnit"></el-input>
      </el-form-item>
      <el-form-item label="职业">
        <el-input v-model="Inspector2.iDuty"></el-input>
      </el-form-item><br>

      <el-form-item label="检查对象">
        <el-input v-model="Inspector2.Target"></el-input>
      </el-form-item><br>

      <el-form-item label="检查目的">
        <el-input  type="textarea"
                   :rows="2"
                   placeholder=""
                   v-model="Inspector2.objective"></el-input>
      </el-form-item><br>


      <el-form-item label="检查对象封存、固定状况">
        <el-input type="textarea"
                  :rows="3"
                  placeholder="" v-model="Inspector2.situation"></el-input>
      </el-form-item><br>
      <el-form-item label="检查过程、
       方法">
        <el-input type="textarea"
                  :rows="3"
                  placeholder="" v-model="Inspector2.way"></el-input>
      </el-form-item><br>
      <el-form-item label="检查结果">
        <el-input type="textarea"
                  :rows="3"
                  placeholder="" v-model="Inspector2.result"></el-input>
      </el-form-item><br>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="primary" @click="generate">导出</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>


import {export2Word} from "../../../static/utils/Export2Word.js";
import {formatDateTime} from "../../../static/utils/utilities.js"
import {save2DB} from "../../../static/utils/utilities.js";
import MyHeader1 from "../../components/container/my-header1.vue";
export default {
  name: "Inspector2",
  components: {
    MyHeader1
  },
  data() {
    return {
      Inspector2:{
        rowDate:'', //20{Year}年{Month}月{Date}日{Hour}时{minute}分
        applicant:'',
        Inspectors:'',
        rowDate2:'',
        rowDate3:'',
        place:'',
        commander:'',
        cUnit:'',
        cDuty:'',
        iUnit:'',
        iDuty:'',
        Target:'',
        objective:'',
        situation:'',
        way:'',
        result:''
  },
      labelPosition:'right',
      docTitle: "电子数据检查笔录",
      username:''
    }
  },

  mounted() {
    this.username = localStorage.getItem('name')
  },
  methods: {
      generate() {
          console.log("转换前"+this.Inspector2)
          //时间格式转换
          this.Inspector2.rowDate = formatDateTime(new Date(this.Inspector2.rowDate))
          this.Inspector2.rowDate2 = formatDateTime(new Date(this.Inspector2.rowDate2))
          this.Inspector2.rowDate3 = formatDateTime(new Date(this.Inspector2.rowDate3))
          console.log("转换后"+this.Inspector2)
          let that = this.Inspector2
          export2Word("侦察人员/电子数据检查笔录","电子数据检查笔录",that)
      },
    save(){

        save2DB(this.docTitle,this.Inspector2,this.username)
    }

  }
}
</script>

<style>

#Inspector2 {
  background-color: #f7f8f9;

}

</style>
