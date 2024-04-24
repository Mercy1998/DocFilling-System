<template>
  <div id="cInspector7">
    <el-descriptions>
      <el-descriptions-item label="案由">{{cInspector7.reason}}</el-descriptions-item>
      <el-descriptions-item label="提取固定时间">{{ cInspector7.rowDate1 }} 至 {{cInspector7.rowDate2 }}</el-descriptions-item>
      <el-descriptions-item label="电子数据">{{ cInspector7.data }}</el-descriptions-item>
      <el-descriptions-item label="来源">{{ cInspector7.from }}</el-descriptions-item>
      <el-descriptions-item label="文件格式">{{cInspector7.form}}</el-descriptions-item>
      <el-descriptions-item label="完整性校验值">{{ cInspector7.checksums }}</el-descriptions-item>
      <el-descriptions-item label="备注">{{ cInspector7.more }}</el-descriptions-item>

    </el-descriptions>
<!--    <check-btn></check-btn>-->
  </div>
</template>

<script>
import CheckBtn from "./checkBtn.vue";

export default {
  name:'cInspector7',
  components: {CheckBtn},
  props:{
    cInspector7:{
      type:Object,
      default:()=>{}
    },

  }
  // data () {
  //   return {
  //     cInspector7:{
  //
  //     }
  //   };
  // }
}
</script>
<style>

</style>
