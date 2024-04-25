<!--饼图-->
<template>
  <div id="check1">
    <div id="search" class="demo-input-suffix">
      <el-input placeholder="请输入内容" prefix-icon="el-icon-search" v-model="check1.input1" style="width: 65%"></el-input>
      <el-button type="primary" @click="search">搜索</el-button>
    </div>
    <checked-table :tableData="check1.tableDatas" v-if="showTable === true" style="margin-top: 20px"></checked-table>
    <graph></graph>


  </div>
</template>

<script>
import axios from "axios";
import {save2DB} from "../../../static/utils/utilities.js";
import Graph from "../../components/PoliceOrgan/graph.vue";
import SearchTable from "../../components/PoliceOrgan/searchTable.vue";
import CheckedTable from "../../components/PoliceOrgan/checkedTable.vue";
export default {
  name:'check1',
  components: {CheckedTable,  Graph},
  data(){
    return{
      check1:{
        //输入内容
        input1:'',
        tableDatas:[]
      },
      showTable:false

    }
  },
  mounted() {
  },
  methods: {
    search(){
      this.check1.tableDatas = []
      this.showTable = true
      let that = this.check1
      const params ={
        content : that.input1
      }
      axios.get('http://localhost:3000/api/user/getSearchTable',{
        params
      } ).then(function (res) {

        that.tableDables = []
        console.log("data:" + res.data)
        for (var i = 0; i < res.data.length; i++) {
          console.log(res.data[i])
          let dataList = res.data[i]
          let newRow = {
            id:dataList[5],
            title:dataList[0],
            provider:dataList[4],
            date:dataList[3],
            checkResult:dataList[2],
            checkTime:dataList[6],
            checker:dataList[7]

          }
          console.log(newRow)
          that.tableDatas.push(newRow)
        }
      }).catch(function (err){
        console.log(err)
      })
    }
  }
}
</script>


<style>
.echart-box{
  width: 800px;
  height: 530px;
  border: 3px solid #f7f8f9;
  margin: 20px auto;
  padding-top: 30px;
  padding-left: 20px;
  background-color: #f7f8f9;
}
</style>
