<template>
  <div id="cInspector6">
    <el-descriptions>
      <el-descriptions-item label="申请时间">{{cInspector6.rowDate}}</el-descriptions-item>
      <el-descriptions-item label="申请人">{{ cInspector6.applicant }}</el-descriptions-item>
      <el-descriptions-item label="指派人员">{{ cInspector6.Inspectors }}</el-descriptions-item>
      <el-descriptions-item label="检查时间">{{ cInspector6.rowDate2 }} 至 {{cInspector6.rowDate3 }}</el-descriptions-item>
      <el-descriptions-item label="检查地点">{{cInspector6.rowDate}}</el-descriptions-item>
      <span>指挥人员</span>
      <el-descriptions-item label="姓名">{{ cInspector6.commander }}</el-descriptions-item>
      <el-descriptions-item label="单位">{{ cInspector6.cUnit }}</el-descriptions-item>

      <span>检查人员</span>
      <el-descriptions-item label="姓名">{{ cInspector6.Inspector }}</el-descriptions-item>
      <el-descriptions-item label="单位">{{ cInspector6.iUnit }}</el-descriptions-item>

      <el-descriptions-item label="见证人">{{ cInspector6.witness }}</el-descriptions-item>
      <el-descriptions-item label="远程勘验对象">{{ cInspector6.target }}</el-descriptions-item>
      <el-descriptions-item label="事由及目的">{{ cInspector6.objective }} </el-descriptions-item>
      <el-descriptions-item label="过程、方法及结果">{{ cInspector6.way }}</el-descriptions-item>

    </el-descriptions>
<!--    <check-btn></check-btn>-->
  </div>
</template>

<script>
import CheckBtn from "./checkBtn.vue";

export default {
  name:'cInspector6',
  components: {CheckBtn},
  props:{
    cInspector6:{
      type:Object,
      default:()=>{}
    },

  }
  // data () {
  //   return {
  //     cInspector6:{
  //
  //     }
  //   };
  // }
}
</script>
<style>

</style>
