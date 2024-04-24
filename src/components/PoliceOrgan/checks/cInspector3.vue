<template>
  <div id="cInspector3">
    <el-descriptions>
      <el-descriptions-item label="侦察时间">{{cInspector3.rowDate1}} 至 {{cInspector3.rowDate2 }}</el-descriptions-item>
      <el-descriptions-item label="侦察地点">{{ cInspector3.place }}</el-descriptions-item>
      <span>侦察人员</span>
      <el-descriptions-item label="姓名">{{ cInspector3.Investigators }}</el-descriptions-item>
      <el-descriptions-item label="单位">{{ cInspector3.iUnit }}</el-descriptions-item>
      <span>记录人员</span>
      <el-descriptions-item label="姓名">{{ cInspector3.recorder }}</el-descriptions-item>
      <el-descriptions-item label="单位">{{ cInspector3.rUnit }}</el-descriptions-item>

      <el-descriptions-item label="持有人（提供人）">{{ cInspector3.provider }}</el-descriptions-item>
      <el-descriptions-item label="对象">{{ cInspector3.target }}</el-descriptions-item>
      <el-descriptions-item label="见证人">{{ cInspector3.witness }} </el-descriptions-item>
      <el-descriptions-item label="其他在场人员">{{ cInspector3.others }}</el-descriptions-item>
      <el-descriptions-item label="事由和目的">{{ cInspector3.objective }}</el-descriptions-item>
      <el-descriptions-item label="检查过程、方法及结果">{{ cInspector3.way }}</el-descriptions-item>
      <el-descriptions-item label="备注">{{ cInspector3.more }}</el-descriptions-item>

    </el-descriptions>
<!--    <check-btn></check-btn>-->
  </div>
</template>

<script>
import CheckBtn from "./checkBtn.vue";

export default {
  name:'cInspector3',
  components: {CheckBtn},
  props:{
    cInspector3:{
      type:Object,
      default:()=>{}
    },

  }
  // data () {
  //   return {
  //     cInspector3:{
  //
  //     }
  //   };
  // }
}
</script>
<style>

</style>
