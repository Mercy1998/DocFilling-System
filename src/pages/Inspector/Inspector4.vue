<!--网络提取-->
<template>
  <div id="Inspector4">
    <my-header1 :doc-title="docTitle"></my-header1>
    <el-form :label-position="labelPosition" ref="Inspector4" :model="Inspector4" label-width="98px" style="width: 95%">
      <el-form-item label="申请时间">
        <el-date-picker type="datetime" placeholder="选择日期" v-model="Inspector4.rowDate" style="width: 100%;"></el-date-picker>
      </el-form-item>
      <el-form-item label="申请人">
        <el-input v-model="Inspector4.applicant" placeholder="请输入申请人姓名"></el-input>
      </el-form-item>
      <el-form-item label="指派人员">
        <el-input v-model="Inspector4.Inspectors" placeholder="请输入姓名"></el-input>
      </el-form-item><br>
      <el-form-item label="检查时间">
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="开始时间" v-model="Inspector4.rowDate2" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="结束时间" v-model="Inspector4.rowDate3" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="检查地点">
        <el-input v-model="Inspector4.place"></el-input>
      </el-form-item><br>

      <h5>指挥人员</h5>
      <el-form-item label="姓名">
        <el-input v-model="Inspector4.commander"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="Inspector4.cUnit"></el-input>
      </el-form-item><br>

      <h5>检查人员</h5>
      <el-form-item label="姓名">
        <el-input v-model="Inspector4.Inspectors"></el-input>
      </el-form-item>
      <el-form-item label="单位">
        <el-input v-model="Inspector4.iUnit"></el-input>
      </el-form-item><br>

      <el-form-item label="电子数据来源">
        <el-input v-model="Inspector4.from"></el-input>
      </el-form-item>
      <el-form-item label="提取对象">
        <el-input v-model="Inspector4.from"></el-input>
      </el-form-item>
      <br>

      <el-form-item label="事由及检查">
        <el-input  type="textarea"
                   :rows="2"
                   placeholder=""
                   v-model="Inspector4.objective"></el-input>
      </el-form-item><br>
      <el-form-item label="过程、
       方法及结果">
        <el-input type="textarea"
                  :rows="3"
                  placeholder="" v-model="Inspector4.way"></el-input>
      </el-form-item><br>
      <el-form-item label="检查结果">
        <el-input type="textarea"
                  :rows="3"
                  placeholder="（注明不能扣押原始存储介质的原因等情况）" v-model="Inspector4.more"></el-input>
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
import MyHeader1 from "../../components/container/my-header1.vue";
import {save2DB} from "../../../static/utils/utilities.js";
export default {
  name: "Inspector4",
  components: {
    MyHeader1
  },
  data() {
    return {
      docTitle: "网络在线提取笔录",
      Inspector4:{
        rowDate:'', //20{Year}年{Month}月{Date}日{Hour}时{minute}分
        applicant:'',
        Inspectors:'',
        rowDate2:'',
        rowDate3:'',
        place:'',
        commander:'',
        cUnit:'',
        iUnit:'',
        from:'',
        Target:'',
        objective:'',
        way:'',
        more:''
      },
      labelPosition:'right',
      username:''
    }
  },
  mounted() {
    this.username = localStorage.getItem('name')
  },
  methods: {
    generate() {
      console.log("转换前"+this.Inspector4)
      //时间格式转换
      this.Inspector4.rowDate = formatDateTime(new Date(this.Inspector4.rowDate))
      this.Inspector4.rowDate2 = formatDateTime(new Date(this.Inspector4.rowDate2))
      this.Inspector4.rowDate3 = formatDateTime(new Date(this.Inspector4.rowDate3))
      console.log("转换后"+this.Inspector4)
      let that = this.Inspector4
      export2Word("侦察人员/网络在线提取笔录","网络在线提取笔录",that)
    },
    save(){
      save2DB(this.docTitle,this.Inspector4,this.username)
    }

  }
}
</script>

<style>

#Inspector4 {
  background-color: #f7f8f9;

}

</style>
