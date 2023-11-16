<template>
  <div id="admin-msg">
    <el-table id="table"
              :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%; margin: 0 auto;" height="230">
      <!-- 表格列表 -->
      <el-table-column label="机构名称" prop="org"></el-table-column>
      <el-table-column label="客户号" prop="cusNum"></el-table-column>
      <el-table-column label="业务种类" prop="type"></el-table-column>
      <el-table-column label="金额(万)或户数" prop="amount"></el-table-column>
      <el-table-column label="营销人员姓名" prop="staff"></el-table-column>
      <el-table-column label="购买时间" prop="buyTime"></el-table-column>
      <el-table-column label="中收" prop="score"></el-table-column>
      <!-- 导出数据 -->
      <el-table-column
        align="right">
        <!--        <template slot="header" slot-scope="scope">-->
        <!--          <el-button type="primary" @click="downloadAll()" id="my-button">导出所有记录</el-button>-->
        <!--        </template>-->
        <!--        </el-table-column> -->
        <!-- 操作按钮 -->
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="download()" v-if="isDownShow" id="my-download-btn">导出数据</el-button>

  </div>
</template>

<script>
import axios from 'axios';
import {exportToExcel} from 'D:/phpstudy_pro/WWW/VuePros/mydemo/static/utils/Export2Excel.js'

export default {
  name: "admin-msg",
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
  data() {
    return {
      search:''
    }
  },
  methods: {
    // 编辑/删除
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      this.tableData.splice(index,1);
      axios.post("http://localhost:3000/api/user/deleteCount",{
        params: {
          value: row.type
        }
      }).then((res)=>{
          console.log(res.data.message)
      }).catch((err)=>{

      })
      console.log("11111:"+row.type)
      console.log(index, row);
    },
    download() {
      // exportToExcel(表格id选择器, 导出文件名称);
      exportToExcel('#table', '中收');
    },

  },
}
</script>

<style>
.el-table thead {
  color: #303133 !important;
  text-align: center;
}

.el-table .el-table__cell {
  text-align: center;
  padding: 10px 0;
  font-size: 12px;
}


.el-table_1_column_1 .el-table__cell {
  height: 20px;
}

#my-download-btn {
  margin-top: 5px;
  height: 32px;
  font-size: 12px;
}
</style>
