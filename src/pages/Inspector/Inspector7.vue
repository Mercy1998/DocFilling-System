<!--电子数据提取固定清单-->
<template>
  <div id="Inspector7">
    <my-header1 :doc-title="docTitle"></my-header1>
    <el-form :label-position="labelPosition" ref="Inspector7" :model="Inspector7" label-width="98px" style="width: 95%">
      <el-form-item label="案由">
        <el-input type="textarea"
                  :rows="3"
                  placeholder="" v-model="Inspector7.reason"></el-input>
      </el-form-item><br>
      <el-form-item label="提取固定时间">
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="开始时间" v-model="Inspector7.rowDate1" style="width: 100%;"></el-date-picker>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-date-picker type="datetime" placeholder="结束时间" v-model="Inspector7.rowDate2" style="width: 100%;"></el-date-picker>
        </el-col>
      </el-form-item>
      <el-form-item label="电子数据">
        <el-input v-model="Inspector7.data" placeholder="请选择电子数据"></el-input>
      </el-form-item>
      <el-form-item label="来源">
        <el-input v-model="Inspector7.from" placeholder="请电子电子数据来源"></el-input>
      </el-form-item>
      <el-form-item label="申请人">
        <el-input v-model="Inspector7.form" placeholder="请输入文件格式，如.zip"></el-input>
      </el-form-item>
      <el-form-item label="完整性校验值">
        <el-input v-model="Inspector7.checksums" placeholder="请输入完整性校验值"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input v-model="Inspector7.more" placeholder="请填写备注"></el-input>
      </el-form-item>
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
import JSZipUtils from "jszip-utils";
import PizZip from "pizzip";
import Docxtemplater from "docxtemplater";

export default {
  name:'Inspector7',
  components: {MyHeader1},
  data(){
    return{
      docTitle: "电子数据提取固定清单",
      Inspector7:{
        reason:'',
        rowDate1:'',
        rowDate2:'',
        data:'',
        from:'',
        form:'',
        checksums:'',
        more:''
      },
      tableData:[],
      labelPosition:'right'
    }
  },
  methods:{
    generate(){
      // 时间转化
      this.Inspector7.rowDate1 = formatDateTime(new Date(this.Inspector7.rowDate1))
      this.Inspector7.rowDate2 = formatDateTime(new Date(this.Inspector7.rowDate2))
      //传参到表格
      let data = this.Inspector7;
      let newRow = {
        data:data.data,
        from1: data.from,
        form: data.form,
        checksums: data.checksums,
        more: data.more
      };
      console.log(newRow)
      this.tableData.push(newRow)
      let that = this
      JSZipUtils.getBinaryContent("/static/电子数据提取固定清单.docx", function (error, content) {
        // docxsrc是模板。我们在导出的时候，会根据此模板来导出对应的数据
        // 抛出异常
        if (error) {
          throw error;
        }

        // 创建一个PizZip实例，内容为模板的内容
        const zip = new PizZip(content);
        // 创建并加载docx templater实例对象
        const doc = new Docxtemplater().loadZip(zip);
        // 设置模板变量的值
        // console.log(...that.tableDatas)
        //   注意写法
        doc.setData({
              data,
              dataList:that.tableData
            }

        );

        try {
          // 用模板变量的值替换所有模板变量
          doc.render();
        } catch (error) {
          // 抛出异常
          let e = {
            message: error.message,
            name: error.name,
            stack: error.stack,
            properties: error.properties
          };
          console.log(JSON.stringify({error: e}));
          throw error;
        }

        // 生成一个代表Docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        let out = doc.getZip().generate({
          type: "blob",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, "电子数据提取固定清单.docx");
      })


      //导出

    }
  }
}
</script>

<style>

</style>

