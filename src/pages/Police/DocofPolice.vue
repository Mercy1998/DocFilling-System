<template>
  <div id="Police">
<!--    标题-->
    <h3>* * * 公安局</h3>
    <h2>办案协作函</h2>
    <h3>（存 根）</h3>
    <p>x公( )协字[ ]号</p>
<!--    表单-->
    <FetchData1></FetchData1>
  </div>
</template>

<script>

import axios from 'axios';
import FetchData1 from "../../components/Police/FetchData1.vue";
export default {
  name: "DocofPolice",
  components: {
    FetchData1
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {}
}

</script>

<style>
* {
  padding: 0;
  margin: 0 auto;
  /* 标准盒子 */
  box-sizing: border-box;
}
#Police {
  background-color: #f7f8f9;
}

</style>

