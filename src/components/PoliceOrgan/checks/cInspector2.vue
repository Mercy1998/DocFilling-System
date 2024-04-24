<template>
  <div id="cInspector2">
    <el-descriptions>
      <el-descriptions-item label="申请时间">{{cInspector2.rowDate}}</el-descriptions-item>
      <el-descriptions-item label="申请人">{{ cInspector2.applicant }}</el-descriptions-item>
      <el-descriptions-item label="指派人员">{{ cInspector2.Inspectors }}</el-descriptions-item>
      <el-descriptions-item label="检查时间">{{ cInspector2.rowDate2 }} 至 {{cInspector2.rowDate3 }}</el-descriptions-item>
      <el-descriptions-item label="检查地点">{{cInspector2.rowDate}}</el-descriptions-item>
      <h5>指挥人员</h5>
      <el-descriptions-item label="姓名">{{ cInspector2.commander }}</el-descriptions-item>
      <el-descriptions-item label="单位">{{ cInspector2.cUnit }}</el-descriptions-item>
      <el-descriptions-item label="职业">{{ cInspector2.cDuty }} </el-descriptions-item>
      <h5>检查人员</h5>
      <el-descriptions-item label="姓名">{{ cInspector2.Inspector }}</el-descriptions-item>
      <el-descriptions-item label="单位">{{ cInspector2.iUnit }}</el-descriptions-item>
      <el-descriptions-item label="职业">{{ cInspector2.iDuty }} </el-descriptions-item>
      <el-descriptions-item label="检查对象">{{ cInspector2.target }}</el-descriptions-item>
      <el-descriptions-item label="检查目的">{{ cInspector2.objective }}</el-descriptions-item>
      <el-descriptions-item label="检查对象封存、固定情况">{{ cInspector2.situation }} </el-descriptions-item>
      <el-descriptions-item label="检查过程、方法">{{ cInspector2.way }}</el-descriptions-item>
      <el-descriptions-item label="检查结果">{{ cInspector2.result }}</el-descriptions-item>

    </el-descriptions>
<!--      <check-btn></check-btn>-->
  </div>
</template>

<script>
import CheckBtn from "./checkBtn.vue";

export default {
  name:'cInspector2',
  components: {CheckBtn},
  props:{
    cInspector2:{
      type:Object,
      default:()=>{}
    },

  }
  // data () {
  //   return {
  //     cInspector2:{
  //
  //     }
  //   };
  // }
}
</script>
<style>

</style>
