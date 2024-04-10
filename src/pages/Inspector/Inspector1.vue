<!--扣押介质-->
<template>
  <div id="Inspector1">
    <h3 style="padding-top: 10px;margin-bottom: 10px">扣押清单</h3>
      <DetectionInput @getFormData="onSubmit" ></DetectionInput>
      <DetectionList :tableData="tableDatas"></DetectionList>
      <el-button type="primary" @click="generate" >导出</el-button>
  </div>
</template>

<script>

import axios from 'axios';
import DetectionInput from "../../components/Inspector/Detection/DetectionInput.vue";
import DetectionList from "../../components/Inspector/Detection/DetectionList.vue";
import {export2Word} from "../../../static/utils/Export2Word";

export default {
  name: "Inspector1",
  components: {
    DetectionInput,
    DetectionList
  },
  data() {
    return {
      tableDatas: []
    }
  },
  created() {
  },
  methods: {
    onSubmit(data) {
      if (!data.name) {
        alert("名称不能为空！")
        return;
      } else if (!data.feature) {
        alert("客户名不能为空！")
        return;
      } else if (!data.from) {
        alert("客户名不能为空！")
        return;
      } else if (!data.remark) {
        alert("时间不能为空！")
        return;
      }
      // 表格新数据
      let newRow = {
        ID:data.ID,
        name: data.name,
        quantity: data.quantity,
        feature: data.feature,
        from: data.from,
        remark: data.remark,
      };
      console.log(newRow)
      this.tableDatas.push(newRow)
    },
      generate() {
          console.log(this.tableDatas)
          let that = this.tableDatas
          export2Word("/侦察人员/扣押清单","扣押清单",...that)
      },
  }
}
</script>

<style>
* {
  padding: 0;
  margin: 0 auto;
  /* 标准盒子 */
  box-sizing: border-box;
}
#Inspector1 {
  background-color: #f7f8f9;
}

</style>
