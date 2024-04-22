<template>
  <div id="searchTable">
    <el-table :data="tableList" border style="width: 70%;margin: 0 auto;">
      <el-table-column prop="title" label="文书名称" width="200"></el-table-column>
      <el-table-column prop="provider" label="提交人" width="150"></el-table-column>
      <el-table-column prop="date" label="提交日期" width="180"></el-table-column>

      <el-table-column prop="check" label="审批状态" width="120"></el-table-column>
      <el-table-column  label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name:'searchTable',
  data(){
    return{
      tableList:[]
    }
  },
  methods:{

  }
}
</script>

<style>

</style>
