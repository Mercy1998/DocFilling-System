<template>
    <div id="entry">
        <MsgTable  :tableData="tableDatas"></MsgTable>

        <div class="blank" style="height:20px"></div>
        <InputBox @getFormData="onSubmit"></InputBox>
    </div>
</template>

<script>
import MsgTable from '../components/Entry/MsgTable.vue';
import InputBox from '../components/Entry/InputBox.vue';


export default{
    name:"entry",
    components:{
        MsgTable,
        InputBox
    },
    data(){
        return {
            tableDatas:[]
    }
    },
    methods:{
        onSubmit(data){
            console.log(data.buyTime);
            // 时间处理
            let date = data.buyTime;
            let year = date.getFullYear();
            let month = date.getMonth()+1;
            let day = date.getDate();

            month = (month>9)?month:("0"+month);
            day = (day<10)?("0"+day):day;

            date = year+"-"+month+"-"+day;

            console.log(date)
            // 业务种类
            let types  = data.type1+"-"+data.type2;
            // 中收计算
            let count = 1;
            switch (types){
                case "投资理财中高端客户数":
                    count = count*data.amount*0.03;
                    break;
                
            }

            let newRow = {
                org:data.org,
                cusNum:data.cusNum,
                type:types,
                buyTime:date,
                amount:data.amount,
                staff:data.staff,
                score:count
            };
            console.log(this,newRow)
            this.tableDatas.push(newRow)
            
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

</style>