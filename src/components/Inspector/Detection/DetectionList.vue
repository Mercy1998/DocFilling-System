<template>
  <div id="DetectionList">
    <el-table id="table"
              :data="tableData"
              style="width: 100%; margin: 0 auto;" height="300">
      <!-- 表格列表 -->
      <el-table-column label="编号" prop="ID"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="数量" prop="quantity"></el-table-column>
      <el-table-column label="特征" prop="feature"></el-table-column>
      <el-table-column label="来源" prop="from"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
      <!-- 导出数据 -->
<!--      <el-table-column-->
<!--        align="right">-->
        <!--        <template slot="header" slot-scope="scope">-->
        <!--          <el-button type="primary" @click="downloadAll()" id="my-button">导出所有记录</el-button>-->
        <!--        </template>-->
        <!--        </el-table-column> -->
        <!-- 操作按钮 -->
<!--        <template slot-scope="scope">-->
<!--          <el-button-->
<!--            size="mini"-->
<!--            type="danger"-->
<!--            @click="handleDelete(scope.$index, scope.row)">删除-->
<!--          </el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
    </el-table>
    <el-button type="primary" @click="generate" v-if="isDownShow" id="my-download-btn">导出</el-button>

  </div>
</template>


<script>
import 'docxtemplater/build/docxtemplater.js'
import 'pizzip/dist/pizzip.js'
import 'pizzip/dist/pizzip-utils.js'
import 'file-saver'
export default {
  name:'DetectionList',
  props: {
    tableData: {
      type: Array,
      default: () => []
    },
    isDownShow: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      tableDatas:this.tableData
    }
  },
  methods:{
    generate() {
      console.log(this.tableDatas)
      let tableData = this.tableDatas
      PizZipUtils.getBinaryContent("/static/test2.docx", function (error, content) {  //url模板存放的位置
        if (error) {
          throw error
        };
        var zip = new PizZip(content);
        var doc = new window.docxtemplater().loadZip(zip)
        console.log(tableData)
        doc.setData({
          ...tableData //导入到模板文档的数据对象
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


<style >

</style>
