<!--现场提取-->
<template>
  <div id="Inspector5">
    <my-header1 :doc-title="docTitle"></my-header1>
    <el-form :label-position="labelPosition" ref="Inspector5" :model="Inspector5" label-width="98px" style="width: 95%">
      <el-form-item label="提取时间">
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="开始时间" v-model="Inspector5.rowDate1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">至</el-col>
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="结束时间" v-model="Inspector5.rowDate2" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item><br>
      <el-form-item label="地点">
        <el-input v-model="Inspector5.place" placeholder="请输入现场提取地点"></el-input>
      </el-form-item>
      <el-form-item label="指挥人员">
        <el-input v-model="Inspector5.commander" placeholder="请输入指挥人员姓名"></el-input>
        <el-input v-model="Inspector5.iUnit" placeholder="请输入指挥人员单位"></el-input>
      </el-form-item><br>
      <el-form-item label="侦察人员">
        <el-input v-model="Inspector5.Inspectors" placeholder="请输入侦察人员姓名"></el-input>
        <el-input v-model="Inspector5.rUnit" placeholder="请输入侦察人员单位"></el-input>
      </el-form-item><br>
      <el-form-item label="电子数据来源">
        <el-input v-model="Inspector5.from"></el-input>
      </el-form-item>
      <el-form-item label="电子数据持有人（提供人）">
        <el-input v-model="Inspector5.provider"></el-input>
      </el-form-item>
      <el-form-item label="见证人">
        <el-input v-model="Inspector5.witness"></el-input>
      </el-form-item><br>
      <el-form-item label="提取对象">
        <el-input v-model="Inspector5.target"></el-input>
      </el-form-item>
      <br>
      <el-form-item label="事由和目的">
        <el-input  type="textarea"
                   :rows="2"
                   placeholder=""
                   v-model="Inspector5.objective"></el-input>
      </el-form-item><br>

      <el-form-item label="过程、方法及结果">
        <el-input type="textarea"
                  :rows="3"
                  placeholder="" v-model="Inspector5.way"></el-input>
      </el-form-item><br>
      <el-form-item label="备注">
        <el-input type="textarea"
                  :rows="3"
                  placeholder="（注明不能扣押原始存储介质的原因、原始存储介质的存放地点等情况）" v-model="Inspector5.more"></el-input>
      </el-form-item><br>
      <el-form-item>
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

export default {
  name:'Inspector5',
  components: {MyHeader1},
  data(){
    return{
      docTitle: "现场提取笔录",
      Inspector5:{
        rowDate1:'',
        rowDate2:'',
        place: '',
        commander:'',
        cUnit: '',
        Inspectors:'',
        iUnit:'',
        from:'',
        provider:'',
        witness:'',
        target:'',
        objective: '',
        way:'',
        more:''
      },
      labelPosition:"right"
    }
  },
  methods:{
    generate(){
      console.log("转换前"+this.Inspector5)
      //时间格式转换
      this.Inspector5.rowDate1 = formatDateTime(new Date(this.Inspector5.rowDate1))
      this.Inspector5.rowDate2 = formatDateTime(new Date(this.Inspector5.rowDate2))
      console.log("转换后"+this.Inspector5)
      let that = this.Inspector5
      export2Word("侦察人员/现场提取笔录","现场提取笔录",that)
    }
  }
}
</script>

<style>
#Inspector5 {
  background-color: #f7f8f9;

}

</style>
