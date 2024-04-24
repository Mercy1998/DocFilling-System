<template>
  <div id="cInspector5">
    <el-descriptions>
      <el-descriptions-item label="提取时间">{{ cInspector5.rowDate1 }} 至 {{cInspector5.rowDate2 }}</el-descriptions-item>
      <el-descriptions-item label="地点">{{ cInspector5.place }}</el-descriptions-item>

      <h5>指挥人员</h5>
      <el-descriptions-item label="姓名">{{ cInspector5.commander }}</el-descriptions-item>
      <el-descriptions-item label="单位">{{ cInspector5.cUnit }}</el-descriptions-item>

      <h5>侦察人员</h5>
      <el-descriptions-item label="姓名">{{ cInspector5.Inspector }}</el-descriptions-item>
      <el-descriptions-item label="单位">{{ cInspector5.iUnit }}</el-descriptions-item>

      <el-descriptions-item label="电子数据来源">{{ cInspector5.from }}</el-descriptions-item>
      <el-descriptions-item label="电子数据持有人（提供人）">{{ cInspector5.provider }}</el-descriptions-item>
      <el-descriptions-item label="见证人">{{ cInspector5.witness }} </el-descriptions-item>
      <el-descriptions-item label="提取对象">{{ cInspector5.target }}</el-descriptions-item>
      <el-descriptions-item label="事由和目的">{{ cInspector5.objective }}</el-descriptions-item>
      <el-descriptions-item label="事由和目的">{{ cInspector5.way }}</el-descriptions-item>
      <el-descriptions-item label="事由和目的">{{ cInspector5.more }}</el-descriptions-item>

    </el-descriptions>
<!--    <check-btn></check-btn>-->
  </div>
</template>

<script>
import CheckBtn from "./checkBtn.vue";

export default {
  name:'cInspector5',
  components: {CheckBtn},
  props:{
    cInspector5:{
      type:Object,
      default:()=>{}
    },

  }
  // data () {
  //   return {
  //     cInspector5:{
  //
  //     }
  //   };
  // }
}
</script>
<style>

</style>
