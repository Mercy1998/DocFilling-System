<!--未审批-->
<template>
  <div id="check2">
  <my-header1 doc-title="待审批文书"></my-header1>
    <search-table :table-data="check2.NotChecked"></search-table>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import MyHeader1 from "../../components/container/my-header1.vue";
import SearchTable from "../../components/PoliceOrgan/searchTable.vue";
import check2 from "./check2.vue";
import axios from "axios";

export default ({
  name:'check2',
  components: {SearchTable, MyHeader1},
  mounted() {
    this.showNotChecked()
  },
  data(){
    return{
      check2:{
        NotChecked:[]
      }
    }
  },
  methods:{
    showNotChecked(){
      var that = this.check2
      axios.get('http://localhost:3000/api/user/getNotChecked', ).then(function (res) {

        that.NotChecked = []
        console.log("data:" + res.data)
        for (var i = 0; i < res.data.length; i++) {
          console.log(res.data[i])
          let dataList = res.data[i]
          if(dataList[2]==='否'){
            dataList[2]='未审批'
          }
          let newRow = {
            title:dataList[0],
            provider:dataList[4],
            date:dataList[3],
            check:dataList[2]
          }
          console.log(newRow)
          that.NotChecked.push(newRow)
        }
      }).catch(function (err){
        console.log(err)
      })
    }
    }
})
</script>
<style>

</style>
