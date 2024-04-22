<!--数据侦察-->
<template>
  <div id="Inspector3">
    <my-header1 :doc-title="docTitle"></my-header1>
    <el-form :label-position="labelPosition" ref="Inspector3" :model="Inspector3" label-width="98px" style="width: 95%">
      <el-form-item label="侦察时间">
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="开始时间" v-model="Inspector3.rowDate1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">至</el-col>
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="结束时间" v-model="Inspector3.rowDate2" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item><br>
      <el-form-item label="地点">
        <el-input v-model="Inspector3.place" placeholder="请输入侦察地点"></el-input>
      </el-form-item>
      <el-form-item label="侦察人员">
        <el-input v-model="Inspector3.Investigators" placeholder="请输入侦察人员姓名"></el-input>
        <el-input v-model="Inspector3.iUnit" placeholder="请输入侦察人员单位"></el-input>
      </el-form-item><br>
      <el-form-item label="记录人员">
        <el-input v-model="Inspector3.recorder" placeholder="请输入记录人员姓名"></el-input>
        <el-input v-model="Inspector3.rUnit" placeholder="请输入记录人员单位"></el-input>
      </el-form-item><br>
      <el-form-item label="持有人（提供人）">
        <el-input v-model="Inspector3.provider"></el-input>
      </el-form-item>
      <el-form-item label="对象">
        <el-input v-model="Inspector3.target"></el-input>
      </el-form-item>
      <el-form-item label="见证人">
        <el-input v-model="Inspector3.witness"></el-input>
      </el-form-item><br>
      <el-form-item label="其他在场人员">
        <el-input v-model="Inspector3.others"></el-input>
      </el-form-item>
<br>
      <el-form-item label="事由和目的">
        <el-input  type="textarea"
                   :rows="2"
                   placeholder=""
                   v-model="Inspector3.objective"></el-input>
      </el-form-item><br>

      <el-form-item label="过程、方法及结果">
        <el-input type="textarea"
                  :rows="3"
                  placeholder="" v-model="Inspector3.way"></el-input>
      </el-form-item><br>
      <el-form-item label="备注">
        <el-input type="textarea"
                  :rows="3"
                  placeholder="" v-model="Inspector3.more"></el-input>
      </el-form-item><br>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
        <el-button type="primary" @click="generate">导出</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script >
import MyHeader1 from "../../components/container/my-header1.vue";
import {formatDateTime} from "../../../static/utils/utilities";
import {export2Word} from "../../../static/utils/Export2Word";
import {save2DB} from "../../../static/utils/utilities.js";

export default {
  name:'Inspector3',
  components: {MyHeader1},
  data(){
    return{
      docTitle: "侦查实验笔录",
      Inspector3:{
        rowDate1:'',
        rowDate2:'',
        Investigators:'',
        iUnit: '',
        recorder:'',
        rUnit:'',
        provider:'',
        target:'',
        witness:'',
        others:'',
        objective: '',
        place: '',
        way:'',
        more:''
      },
      labelPosition:"right"
    }
  },
  methods:{
    generate(){
      console.log("转换前"+this.Inspector3)
      //时间格式转换
      this.Inspector3.rowDate1 = formatDateTime(new Date(this.Inspector3.rowDate1))
      this.Inspector3.rowDate2 = formatDateTime(new Date(this.Inspector3.rowDate2))
      console.log("转换后"+this.Inspector3)
      let that = this.Inspector3
      export2Word("侦察人员/侦察实验笔录","侦察实验笔录",that)
    },
    save() {
      save2DB(this.docTitle,this.Inspector3)
    }
  }
}
</script>

<style>
#Inspector3 {
  background-color: #f7f8f9;

}

</style>
