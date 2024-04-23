<template>
  <div id="InspectorFix">
    <my-header1 :doc-title="docTitle"></my-header1>
    <div id="DetectionInput">
      <el-form :model="inputBox" :inline="true" class="demo-form-inline" ref="inputBox">
        <el-form-item label="编号" prop="ID">
          <el-input v-model="inputBox.ID" placeholder="请输入编号"></el-input>
        </el-form-item>
        <el-form-item label="名称" prop="name">
          <el-input v-model="inputBox.name" placeholder="请输入介质名称"></el-input>
        </el-form-item>
        <el-form-item label="数量" prop="quantity">
          <el-input-number v-model="inputBox.quantity" :min="0" :max="100"></el-input-number>
        </el-form-item><br>
        <el-form-item label="特征" prop="feature">
          <el-input v-model="inputBox.feature" placeholder="请输入特征"></el-input>
        </el-form-item>
        <el-form-item label="来源" prop="from">
          <el-input v-model="inputBox.from" placeholder="请输入来源"></el-input>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="inputBox.remark" placeholder="请输入备注"></el-input>
        </el-form-item>
        <br>
        <el-form-item>
          <!-- <el-button type="primary" @click="onSubmit('inputBox')">提交</el-button>
          <el-button @click="onReset('inputBox')">重置</el-button> -->
          <el-button type="primary" @click="submit">添加</el-button>
          <!--        <el-button @click="search()">查询</el-button>-->
          <el-button @click="reset('inputBox')"> 重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div id="DetectionList">
      <el-table id="table"
                :data="tableDatas"
                style="width: 100%; margin: 0 auto; " height="300">
        <!-- 表格列表 -->
        <el-table-column label="编号" prop="ID"></el-table-column>
        <el-table-column label="名称" prop="name"></el-table-column>
        <el-table-column label="数量" prop="quantity"></el-table-column>
        <el-table-column label="特征" prop="feature"></el-table-column>
        <el-table-column label="来源" prop="from"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        导出数据
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button type="primary" @click="generate()" >导出</el-button>

    </div>
  </div>
</template>

<script>
import MyHeader1 from "../../components/container/my-header1.vue";
import {export2Word} from "../../../static/utils/Export2Word";
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import {saveAs} from 'file-saver'
import axios from "axios";
import {formatDateTime2} from "../../../static/utils/utilities";


export default {
  name:'InspectorFix',
  components: {MyHeader1},
  data(){
    return{
      inputBox:{
        ID:'',
        name:'',
        quantity:'',
        feature:'',
        from:'',
        remark:''
      },
      tableDatas:[],
      docTitle: "扣押清单",
      username:''
    }
  },
  mounted() {
      this.username = localStorage.getItem('name')
  },
  methods:{
    // 添加
    submit(){
      let data = this.inputBox
        if (!data.name) {
          alert("名称不能为空！")
          return;
        } else if (!data.feature) {
          alert("客户名不能为空！")
          return;
        } else if (!data.from) {
          alert("客户名不能为空！")
          return;
        } else if (!data.remark) {
          alert("时间不能为空！")
          return;
        }
        // 表格新数据
        let newRow = {
          ID:data.ID,
          name: data.name,
          quantity: data.quantity,
          feature: data.feature,
          from: data.from,
          remark: data.remark,
        };
        console.log(newRow)
        this.tableDatas.push(newRow)
        // 清空
        this.$refs['inputBox'].resetFields();
    },
    //重置
    reset(){
      this.$refs['inputBox'].resetFields();
    },
    handleDelete(index, row) {
      this.tableDatas.splice(index,1)
    },
    generate(){
      let that = this.tableDatas


    JSZipUtils.getBinaryContent("/static/侦察人员/扣押清单.docx", function (error, content) {
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
         myArray:that
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
    saveAs(out, "扣押清单.docx");
  })
},
    save(){
      // 合并数组
      let that = this.tableDatas
      let totalStr = ''
      let dateNow = formatDateTime2(new Date())
      console.log("provider"+this.username)
      console.log(that)
      for(let i=0;i<that.length;i++){
        console.log(that[i])
        let obj = that[i]
        for(let key in obj){
          console.log(obj[key])
          totalStr += obj[key] + '|'
        }
      }
      axios.post("http://localhost:3000/api/user/save", {
            params: {
              title: this.docTitle,
              content: totalStr,
              date:dateNow,
              provider:this.username
            }
          }
      ).then(function (res) {
        console.log("saveData:" + res)
        if (res.data.status == 200) {
          console.log(res.data.msg)
        }
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
}
</script>
<style>

</style>

