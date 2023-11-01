<template>
  <div id="msgTable" style="padding: 0 auto;">
    <el-table id="table"
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%; height: 250px; margin: 0 auto;">
      <!-- 表格列表 -->
      <el-table-column label="机构名称" prop="org"></el-table-column>
      <el-table-column label="客户号" prop="cusNum"></el-table-column>
      <el-table-column label="业务种类" prop="type"></el-table-column>
      <el-table-column label="金额(万)或户数" prop="amount"></el-table-column>
      <el-table-column label="营销人员姓名" prop="staff"></el-table-column>
      <el-table-column label="购买时间" prop="buyTime"></el-table-column>
      <el-table-column label="中收" prop="score"></el-table-column>
      <!-- 搜索框 -->  
      <el-table-column
        align="right">
        <!-- <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template> -->
        <!-- 操作按钮 -->
       <template slot-scope="scope">
          <!-- <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button> -->
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="download()">导出数据</el-button>
    <el-button @click="save()">保存数据</el-button>
  </div>
  </template>
  
  <script>
    import { exportToExcel } from 'D:/phpstudy_pro/WWW/VuePros/mydemo/static/utils/Export2Excel.js'

    export default {
      name:"msg-table",
      props:{
        tableData:{
          type:Array,
          default:()=>[]
        }
      },
      data() {
        return {
          search: ''
        }
      },
      methods: {
        // 编辑/删除
        // handleEdit(index, row) {
        //   console.log(index, row);
        // },
        handleDelete(index, row) {
          this.tableData.splice(index,1);
          console.log(index, row);
        },
        download() {
      // exportToExcel(表格id选择器, 导出文件名称);
          exportToExcel('#table', '计分');
        },
        save(){
          
        }
      },
    }
  </script>