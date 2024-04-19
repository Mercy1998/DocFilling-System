<!--扣押介质  改为Inspector1_1.vue -->
<template>
  <div id="Inspector1">
    <my-header1 :doc-title="docTitle"></my-header1>
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
import MyHeader1 from "../../components/container/my-header1.vue";

export default {
  name: "Inspector1",
  components: {
    MyHeader1,
    DetectionInput,
    DetectionList
  },
  data() {
    return {
      tableDatas: [],
      docTitle: "扣押清单"
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

#Inspector1 {
  background-color: #f7f8f9;
}

</style>
