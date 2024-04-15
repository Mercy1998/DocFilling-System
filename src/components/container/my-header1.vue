<template>
  <div id="doc-title">
    <h3 style="padding-top: 10px;margin-bottom: 10px">{{ docTitle }}</h3>

  </div>

</template>
<script>
export default {
  name:'my-header1',

  props:{
    docTitle:{
      type: String,
      required: true
    }
  },
}
</script>
<style>

</style>
