<template>
  <div id="cInspector1">
    <el-table :data="cInspector1">
      <el-table-column label="编号" prop="ID"></el-table-column>
      <el-table-column label="名称" prop="name"></el-table-column>
      <el-table-column label="数量" prop="quantity"></el-table-column>
      <el-table-column label="特征" prop="feature"></el-table-column>
      <el-table-column label="来源" prop="from"></el-table-column>
      <el-table-column label="备注" prop="remark"></el-table-column>
    </el-table>
<!--    <check-btn></check-btn>-->
  </div>
</template>

<script>
import CheckBtn from "./checkBtn.vue";

export default {
  name: 'cInspector1',
  components: {CheckBtn},
  props: {
    cInspector1: {
      type: Array,
      default: () => []
    },

  }
}
</script>
<style>

</style>
