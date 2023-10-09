<template>
    <div id="entry">
        <MsgTable></MsgTable>
        <InputBox></InputBox>
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

        }
    },
    methods:{

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