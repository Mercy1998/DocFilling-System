<template>
    <div id="entry">
        <MsgTable  :tableData="tableDatas" @addRow="addRow"></MsgTable>

        <div class="blank" style="height:60px"></div>
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
            tableDatas:[
                {
                    org:'122222',
                    cusNum:'',
                    type:'',
                    amount:'',
                    staff:'',
                    buyTime:'',
                    score:''
                },
            ]
    }
    },
    
    methods:{
        // addRow(){
        //     let newRow = {
        //     org:'',
        //     cusNum:'',
        //     type:'12222',
        //     buyTime:'',
        //     amount:'',
        //     staff:'',
        //     score:''
        //   };
        //   this.tableDatas.push(newRow)
        // },
        onSubmit(data){
            let newRow = {
                org:data.org,
                cusNum:data.cusNum,
                type:data.type,
                buyTime:data.buyTime,
                amount:data.amount,
                staff:data.staff,
                score:''
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

body {
  /* 引入字体 */
  font-family: "Poppins", sans-serif;
  /* 溢出隐藏 */
  overflow: hidden;
}

</style>