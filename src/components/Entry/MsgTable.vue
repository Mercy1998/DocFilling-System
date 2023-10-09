<template>
    <el-table
      :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <!-- 表格列表 -->
      <el-table-column label="机构名称" prop="org"></el-table-column>
      <el-table-column label="客户号" prop="cusNum"></el-table-column>
      <el-table-column label="业务种类" prop="type"></el-table-column>
      <el-table-column label="金额(万)或克数(g)" prop="amount"></el-table-column>
      <el-table-column label="营销人员姓名" prop="staff"></el-table-column>
      <el-table-column label="购买时间" prop="buyTime"></el-table-column>
      <el-table-column label="得分" prop="score"></el-table-column>
      <!-- 搜索框 -->
      <el-table-column
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <!-- 操作按钮 -->
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
  </template>
  
  <script>
    export default {
      data() {
        return {
          tableData: [],
          search: ''
        }
      },
      methods: {
        handleEdit(index, row) {
          console.log(index, row);
        },
        handleDelete(index, row) {
          console.log(index, row);
        }
      },
    }
  </script>