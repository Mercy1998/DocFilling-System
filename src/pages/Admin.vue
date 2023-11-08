<template>
    <div id="admin">

        <el-button type="primary" @click="downloadAll()" id="my-button">导出所有记录</el-button>
        <AdminInput @getFormData="onSubmit" @getSearchData="search"></AdminInput>

        <AdminMsg  :tableData="tableDatas" :isDownShow=isDownShow v-if="tableDatas"></AdminMsg>

    </div>
</template>

<script>
import AdminInput from '../components/Admin/AdminInput.vue';
import AdminMsg from '../components/Admin/AdminMsg.vue';
import axios from 'axios';


export default{
    name:"admin",
    components:{
        AdminInput,
        AdminMsg
    },
    data(){
        return {

            isDownShow:false,
            tableDatas:[]
        
    }
    },
    created(){
    },
    methods:{
        downloadAll(){
          axios.get('http://localhost:3000/api/user/MsgTable',{
          }).then(function(res){
            alert("下载成功！")
            console.log(res)
          }).catch(function(err){
            console.log(err)
          })
        },
        onSubmit(data){
            this.tableDatas = []
            this.isDownShow = false
            console.log(data.buyTime);
            // 时间处理
            let date = new Date(data.buyTime);
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let day = date.getDate();

            month = (month>9) ? month : ("0" + month);
            day = (day < 10) ? ("0" + day) : day;

            date = year + "/" + month + "/" + day;

            console.log(date)
            // 业务种类
            var types = ""
            if(data.type2 === "")
            {
               types = data.type1
            }else{
               types  = data.type1+"-"+data.type2;
            }
            // 中收计算
            // let count = 
            if(!data.org){
                alert("机构名不能为空！")
                return;
            }else if(!data.cusNum){
                alert("客户名不能为空！")
                return;
            }else if(!types){
                alert("客户名不能为空！")
                return;
            }else if(!date){
                alert("时间不能为空！")
                return;
            }else if(!data.amount){
                alert("金额或户数不能为空！")
                return;
            }else if(!data.staff){
                alert("营销人员姓名不能为空！")
                return;
            }
            // 表格新数据
            let newRow = {
                org:data.org,
                cusNum:data.cusNum,
                type:types,
                buyTime:date,
                amount:data.amount,
                staff:data.staff,
                score:data.score
            };
            axios.post("http://localhost:3000/api/user/entry",{
                params:{
                    org:data.org,
                    cusNum:data.cusNum,
                    type:types,
                    buyTime:date,
                    amount:data.amount,
                    staff:data.staff,
                    score:data.score
                }
            }
                    ).then(function(res){
                        console.log("entry:"+res)
                        if(res.data.status == 200){
                            console.log(res.data.msg)
                        }
                    }).catch(function(err){
                        console.log(err)
                    })

            
           
            console.log(newRow)
            this.tableDatas.push(newRow)
            
        },
        search(data){
            console.log("search:"+data)
            this.tableDatas = []
            this.isDownShow = true
            let date = new Date(data.buyTime);
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let day = date.getDate();

            month = (month>9) ? month : ("0" + month);
            day = (day < 10) ? ("0" + day) : day;

            date = year + "/" + month + "/" + day;

            console.log(date)
            // 业务种类
            var types = ""
            if(data.type2 === "")
            {
               types = data.type1
            }else{
               types  = data.type1+"-"+data.type2;
            }
            console.log(data.org+data.cusNum+types)
            const params = {
                org:data.org,
                cusNum:data.cusNum,
                type:types,
                buyTime:date,
                amount:data.amount,
                staff:data.staff,
            }
            axios.get("http://localhost:3000/api/user/search",{
                params}
                ).then((res)=>{
                        this.tableDatas = []
                        console.log("data:"+res.data)
                        for(var i=0;i<res.data.length;i++){
                            console.log(res.data[i])
                            var newRow = {
                                org:res.data[i][0],
                                cusNum:res.data[i][1],
                                type:res.data[i][2],
                                buyTime:res.data[i][5],
                                amount:res.data[i][3],
                                staff:res.data[i][4],
                                score:res.data[i][6]
                            };
                            // console.log(newRow)
                            this.tableDatas.push(newRow)
                        }
                    }).catch(function(err){
                        console.log(err)
                    })

        }
    }
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
  /* 标准盒子 */
  box-sizing: border-box;
}
html {
    width: 80%;
    margin:0 auto;
}
body {
  /* 引入字体 */
  font-family: "Poppins", sans-serif;
}

#admin {
    margin-top: 10px;
}

#my-button {
  width:300px;
  font-size:14px;
  padding: 15px 40px;
  margin-bottom: 15px;
}
</style>