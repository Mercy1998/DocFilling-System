<!--电子数据提取固定清单-->
<template>
  <div id="Inspector7">
    <my-header1 :doc-title="docTitle"></my-header1>
  </div>
</template>

<script >
import MyHeader1 from "../../components/container/my-header1.vue";

export default {
  name:'Inspector7',
  components: {MyHeader1},
  data(){
    return{
      docTitle: "电子数据提取固定清单"
    }
  }
}
</script>

<style>

</style>

