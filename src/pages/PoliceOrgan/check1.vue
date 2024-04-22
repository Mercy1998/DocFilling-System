<!--饼图-->
<template>
  <div id="check1">
    <div id="search" class="demo-input-suffix">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="input1" style="width: 65%"></el-input>
      <el-button type="primary">搜索</el-button>
    </div>
    <graph></graph>
    <search-table></search-table>

  </div>
</template>

<script>
import axios from "axios";
import {save2DB} from "../../../static/utils/utilities.js";
import Graph from "../../components/PoliceOrgan/graph.vue";
import SearchTable from "../../components/PoliceOrgan/searchTable.vue";
export default {
  name:'check1',
  components: {SearchTable, Graph},
  data(){
    return{
      check1:{

      }

    }
  },
  mounted() {
  },
  methods: {

  }
}
</script>


<style>
.echart-box{
  width: 800px;
  height: 600px;
  border: 3px solid #f7f8f9;
  margin: 20px auto;
  padding-top: 30px;
  padding-left: 20px;
  background-color: #f7f8f9;
}
</style>
