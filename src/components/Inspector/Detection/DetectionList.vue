<template>
  <div id="DetectionList">
    <el-table id="table"
              :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
              style="width: 100%; margin: 0 auto;" height="300">
      <!-- 表格列表 -->
      <el-table-column label="编号" prop="ID"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="数量" prop="quantity"></el-table-column>
      <el-table-column label="特征" prop="feature"></el-table-column>
      <el-table-column label="来源" prop="from"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
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
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="primary" @click="download()" v-if="isDownShow" id="my-download-btn">导出</el-button>

  </div>
</template>


<script>
export default {
  name:'DetectionList'
}
</script>


<style >

</style>
