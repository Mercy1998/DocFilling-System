<template>
  <div id="Inspector1">
    <h3>扣押清单</h3>
    <DetectionList :tableData="tableDatas" :isDownShow=isDownShow v-if="tableDatas"></DetectionList>
    <DetectionInput @getFormData="onSubmit" ></DetectionInput>
  </div>
</template>

<script>

import axios from 'axios';
import DetectionInput from "../../components/Inspector/Detection/DetectionInput.vue";
import DetectionList from "../../components/Inspector/Detection/DetectionList.vue";

export default {
  name: "Inspector1",
  components: {
    DetectionInput,
    DetectionList
  },
  data() {
    return {
      isDownShow: false,
      tableDatas: []
    }
  },
  created() {
  },
  methods: {
    onSubmit(data) {
      // this.tableDatas = []
      this.isDownShow = true
      // 时间处理
      // let date = new Date(data.buyTime);
      // let year = date.getFullYear();
      // let month = date.getMonth() + 1;
      // let day = date.getDate();
      //
      // month = (month > 9) ? month : ("0" + month);
      // day = (day < 10) ? ("0" + day) : day;
      //
      // date = year + "/" + month + "/" + day;
      //
      // console.log(date)
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
