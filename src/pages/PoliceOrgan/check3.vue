<!--已审批-->

<template>
  <div id="check2">
    <my-header1 doc-title="已审批文书"></my-header1>
    <checked-table :table-data="check3.hasChecked"></checked-table>
  </div>
</template>

<script>

import {defineComponent} from "vue";
import MyHeader1 from "../../components/container/my-header1.vue";
import CheckedTable from "../../components/PoliceOrgan/checkedTable.vue";
import axios from "axios";

export default ({
  name:'check3',
  components: {CheckedTable, MyHeader1},
  mounted() {
    this.showHasChecked()
  },
  data(){
    return{
      check3:{
        hasChecked:[]
      }
    }
  },
  methods:{
    showHasChecked(){
      var that = this.check3
      axios.get('http://localhost:3000/api/user/getChecked', ).then(function (res) {

        that.hasChecked = []
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
          that.hasChecked.push(newRow)
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

