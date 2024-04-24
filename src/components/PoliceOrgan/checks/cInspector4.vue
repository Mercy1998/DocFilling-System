<template>
  <div id="cInspector4">
    <el-descriptions>
      <el-descriptions-item label="申请时间">{{cInspector4.rowDate}}</el-descriptions-item>
      <el-descriptions-item label="申请人">{{ cInspector4.applicant }}</el-descriptions-item>
      <el-descriptions-item label="指派人员">{{ cInspector4.Inspectors }}</el-descriptions-item>
      <el-descriptions-item label="检查时间">{{ cInspector4.rowDate2 }} 至 {{cInspector4.rowDate3 }}</el-descriptions-item>
      <el-descriptions-item label="检查地点">{{cInspector4.rowDate}}</el-descriptions-item>
      <span>指挥人员</span>
      <el-descriptions-item label="姓名">{{ cInspector4.commander }}</el-descriptions-item>
      <el-descriptions-item label="单位">{{ cInspector4.cUnit }}</el-descriptions-item>

      <span>检查人员</span>
      <el-descriptions-item label="姓名">{{ cInspector4.Inspector }}</el-descriptions-item>
      <el-descriptions-item label="单位">{{ cInspector4.iUnit }}</el-descriptions-item>

      <el-descriptions-item label="电子数据来源">{{ cInspector4.from }}</el-descriptions-item>
      <el-descriptions-item label="提取对象">{{ cInspector4.target }}</el-descriptions-item>
      <el-descriptions-item label="事由及检查">{{ cInspector4.objective }}</el-descriptions-item>
      <el-descriptions-item label="过程、方法及结果">{{ cInspector4.way }} </el-descriptions-item>
      <el-descriptions-item label="备注">{{ cInspector4.more }}</el-descriptions-item>

    </el-descriptions>
<!--    <check-btn></check-btn>-->
  </div>
</template>

<script>
import CheckBtn from "./checkBtn.vue";

export default {
  name:'cInspector4',
  components: {CheckBtn},
  props:{
    cInspector4:{
      type:Object,
      default:()=>{}
    },

  }
  // data () {
  //   return {
  //     cInspector4:{
  //
  //     }
  //   };
  // }
}
</script>
<style>

</style>
