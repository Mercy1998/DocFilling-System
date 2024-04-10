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


  </div>
</template>


<script>
import {export2Word} from "../../../../static/utils/Export2Word";
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
    }
  },
  methods:{
    generate() {
      let that = this.tableData
      export2Word("test2","test2",...that)
    },
  }
}
</script>


<style >

</style>
