<template>
  <div id="fetchData1">
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
        <el-button type="primary" @click="generate">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from 'axios';
// import {utils} from '/static/utils/utilities.js'
import 'docxtemplater/build/docxtemplater.js'
import 'pizzip/dist/pizzip.js'
import 'pizzip/dist/pizzip-utils.js'
import 'file-saver'

export default {
    name: 'FetchData1',
    data() {
      return {
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
        var that = this;
        PizZipUtils.getBinaryContent("/static/test.docx", function (error, content) {  //url模板存放的位置
          if (error) {
            throw error
          };
          var zip = new PizZip(content);
          var doc = new window.docxtemplater().loadZip(zip)
          console.log(...that.fetchData1)
          doc.setData({
            ...that.fetchData1   //导入到模板文档的数据对象
          });
          try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render()
          } catch (error) {
            var e = {
              message: error.message,
              name: error.name,
              stack: error.stack,
              properties: error.properties,
            }
            console.log(JSON.stringify({
              error: e
            }));
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
            throw error;
          }
          var out = doc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          }) //Output the document using Data-URI
          saveAs(out, "output.docx")
        })
      },

    }
  }

</script>
