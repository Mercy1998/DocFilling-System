<template>
  <div id="searchTable">
    <el-table :data="tableData" border style="width: 70%;margin: 0 auto;">
      <el-table-column prop="id" label="编号" width="80"></el-table-column>
      <el-table-column prop="title" label="文书名称" width="180"></el-table-column>
      <el-table-column prop="provider" label="提交人" width="150"></el-table-column>
      <el-table-column prop="date" label="提交时间" width="160"></el-table-column>
      <el-table-column prop="check" label="审批状态" width="120"></el-table-column>
      <el-table-column  label="操作" width="120">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" >审批</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-drawer :title="docTitle" :visible.sync="drawerVisible"  size= 80% :before-close="handleClose">
      <c-inspector1 :c-inspector1="cInspector_table" v-if="flag===1"></c-inspector1>
      <c-inspector2 :c-inspector2="cInspector_form" v-else-if="flag===2"></c-inspector2>
      <c-inspector3 :c-inspector3="cInspector_form" v-else-if="flag===3"></c-inspector3>
      <c-inspector4 :c-inspector4="cInspector_form" v-else-if="flag===4"></c-inspector4>
      <c-inspector5 :c-inspector5="cInspector_form" v-else-if="flag===5"></c-inspector5>
      <c-inspector6 :c-inspector6="cInspector_form" v-else-if="flag===6"></c-inspector6>
      <c-inspector7 :c-inspector7="cInspector_form" v-else-if="flag===7"></c-inspector7>
      <div style="margin-top: 20px">
        <el-button type="primary" @click="agree">同意</el-button>
        <el-button type="danger" @click="reject">不同意</el-button>
        <el-button @click="back">返回</el-button>
      </div>

    </el-drawer>
  </div>
</template>

<script>
import CInspector1 from "./checks/cInspector1.vue";
import CInspector2 from "./checks/cInspector2.vue";
import CInspector3 from "./checks/cInspector3.vue";
import CInspector4 from "./checks/cInspector4.vue";
import CInspector5 from "./checks/cInspector5.vue";
import CInspector6 from "./checks/cInspector6.vue";
import CInspector7 from "./checks/cInspector7.vue";
import CheckBtn from "./checks/checkBtn.vue";
import axios from "axios";
import {formatDateTime, mergeForm, mergeTable} from "../../../static/utils/utilities";

export default {
  name:'searchTable',
  components: {
    CheckBtn,
    CInspector3,
    CInspector1,
    CInspector2,
    CInspector4,
    CInspector5,
    CInspector6,
    CInspector7
  },
  props: {
    tableData: {
      type: Array,
      default: () => []
    }
  },
  data(){
    return{
     drawerVisible : false,
      flag:0,
      cInspector_form:{
      },
      cInspector_table:[] ,
      docTitle:''
    }
  },
  methods:{
    handleClick(row){
      this.drawerVisible = true;
      console.log(row.title)
      this.docTitle=row.title
      const params = {
        id:row.id,
        provider:row.provider,
        title:row.title
      }

      // 判断抽屉内容
      if(row.title === '扣押清单'){
        //表格数据
        axios.get('http://localhost:3000/api/user/getContent',{
          params
        }).then( (res)=> {
          console.log("data:" + res.data)
          let table = []
          let objStr = res.data
          console.log("objStr"+objStr)
          let arr1 = objStr.split('|')
          console.log(arr1)

          for(let i=0;i<arr1.length-1;i+=6){
            let newRow = {
              ID:arr1[i],
              name: arr1[i+1],
              quantity: arr1[i+2],
              feature: arr1[i+3],
              from: arr1[i+4],
              remark: arr1[i+5],
            };
            table.push(newRow)
          }
          this.cInspector_table = table
          console.log("this.cInspector_table"+JSON.stringify(this.cInspector_table))
      })

        this.flag =1
      }
      else{
        axios.get('http://localhost:3000/api/user/getContent',{
          params
        }).then( (res)=> {
          console.log("data:" + res.data)
          let form={}
          let objStr = res.data
          console.log("objStr"+objStr)
          let arr1 = objStr.split('|')
          console.log(arr1)
          for (let i = 0; i < arr1.length - 1; i++) {
            let arr2 = arr1[i].split(':')
            console.log(arr2)
            let key = arr2[0]
            form[key] = arr2[1]

          }
          this.cInspector_form = form
          console.log("this.cInspector_form" + JSON.stringify(this.cInspector_form))
        })
        if(row.title === '电子数据检查笔录') {
          this.flag = 2
        }
        else if(row.title === '侦查实验笔录')
          this.flag =3
        else if(row.title === '网络在线提取笔录')
          this.flag =4
        else if(row.title === '现场提取笔录'){
          this.flag =5
        }
        else if(row.title === '远程勘验笔录')
          this.flag =6
        else if(row.title === '电子数据提取固定清单')
          this.flag =7
        else
          this.flag=0
      }

    },
    //返回
    back(){
      this.$confirm('确认关闭？')
        .then(_ => {
          this.drawerVisible=false
        })
        .catch(_ => {});
    },
    //同意
    agree(){
      let content = ''
      console.log(JSON.stringify(this.cInspector_table))
      console.log(JSON.stringify(this.cInspector_form))

      //通过JSON.stringfy判断是否为空
      if(JSON.stringify(this.cInspector_form) === '{}')
          content = mergeTable(this.cInspector_table)
      else
          content = mergeForm(this.cInspector_form)
      console.log("content"+content)
      let checkTime = formatDateTime(new Date())
      let checkResult = '同意'
      let checker = localStorage.getItem('name')
      this.$confirm('确定同意么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '审批成功!'
        });
        axios.post('http://localhost:3000/api/user/changeChecked',{
          params:{
            checkTime:checkTime,
            checkResult:checkResult,
            checker:checker,
            content:content
          }
        }).then((res)=>{
          console.log("changeData:" + res)
          if (res.data.status === 200) {
            console.log(res.data.msg)
          }
        }).catch(function (err){
          console.log(err)
        })
        this.drawerVisible=false
        this.cInspector_table = []
        this.cInspector_form ={}
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    },
    //不同意
    reject(){
      let content = ''
      if(JSON.stringify(this.cInspector_form) === '{}')
        content = mergeTable(this.cInspector_table)
      else
        content = mergeForm(this.cInspector_form)
      console.log("content"+content)
      let checkTime = formatDateTime(new Date())
      let checkResult = '不同意'
      let checker = localStorage.getItem('name')
      this.$confirm('确定不同意么?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '审批成功!'
        });
        axios.post('http://localhost:3000/api/user/changeChecked',{
          params:{
            checkTime:checkTime,
            checkResult:checkResult,
            checker:checker,
            content:content
          }
        }).then((res)=>{
          console.log("changeData:" + res)
          if (res.data.status === 200) {
            console.log(res.data.msg)
          }
        }).catch(function (err){
          console.log(err)
        })
        this.drawerVisible=false
        this.cInspector_table = []
        this.cInspector_form ={}
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        });
      });

    },
    handleClose(done){
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },

    }

}
</script>

<style>

</style>
