<!--<template>-->
<!--  <div id="Police">-->

<!--  </div>-->
<!--</template>-->

<!--<script>-->

<!--import axios from 'axios';-->

<!--export default {-->
<!--  name: "Police",-->
<!--  components: {-->

<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--    }-->
<!--  },-->
<!--  created() {-->
<!--  },-->
<!--  methods: {}-->
<!--}-->
<!--</script>-->

<!--<style>-->
<!--* {-->
<!--  padding: 0;-->
<!--  margin: 0;-->
<!--  /* 标准盒子 */-->
<!--  box-sizing: border-box;-->
<!--}-->

<!--</style>-->


<template>
  <div id="Police">
    <!-- 此处是你的页面内容 -->
    <button @click="exportToWord">导出Word</button>
  </div>
</template>

<script>
import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
import FileSaver from 'file-saver';

export default {
  name:'Police',
  data(){
    return{

    }
  },
  methods: {
    exportToWord() {
      // 获取需要导出的数据，此处为示例数据
      const data = {
        name: 'John Doe',
        age: 30,
        occupation: 'Developer'
      };

      // 获取Word文档模板内容（可以是一个远程模板文件，或者是在前端定义的模板字符串）
      // 假设这是一个简单的Word文档模板，包含了一些占位符，如{{name}}、{{age}}和{{occupation}}
      const templateContent = `
        <p>姓名：{{name}}</p>
        <p>年龄：{{age}}</p>
        <p>职业：{{occupation}}</p>
      `;

      // 创建docxtemplater实例
      const doc = new Docxtemplater();

      // 将模板内容加载到docxtemplater中
      doc.loadZip(new JSZip(templateContent));

      // 设置数据
      doc.setData(data);

      try {
        // 生成Word文档
        doc.render();
        const generatedDocument = doc.getZip().generate({ type: 'blob' });

        // 导出Word文档
        FileSaver.saveAs(generatedDocument, 'example.docx');
      } catch (error) {
        console.error('导出失败：', error);
      }
    }
  }
};
</script>

<style>
#Police {

  background-color: #f7f8f9;
}
</style>
