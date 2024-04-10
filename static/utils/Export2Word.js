// import 'docxtemplater/build/docxtemplater.js'
// import 'pizzip/dist/pizzip.js'
// import 'pizzip/dist/pizzip-utils.js'
// import 'file-saver'
// import PizZipUtils from "pizzip/utils";
// import PizZip from "pizzip";
import Docxtemplater from 'docxtemplater'
import PizZip from 'pizzip'
import JSZipUtils from 'jszip-utils'
import {saveAs} from 'file-saver'

// function loadFile(url, callback) {
//   PizZipUtils.getBinaryContent(url, callback);
// }
export const export2Word = (iname,outname,wordData) =>{
  // var that = this;
    console.log(wordData)
    let docxsrc = '/static/'+iname+'.docx';
    let docxname = outname+'.docx';
    JSZipUtils.getBinaryContent(docxsrc, function(error, content) {
        // docxsrc是模板。我们在导出的时候，会根据此模板来导出对应的数据
        // 抛出异常
        if (error) {
            throw error;
        }

        // 创建一个PizZip实例，内容为模板的内容
        const zip = new PizZip(content);
        // 创建并加载docx templater实例对象
        const doc = new Docxtemplater().loadZip(zip);
        // 设置模板变量的值
        doc.setData(
            wordData
        );

        try {
            // 用模板变量的值替换所有模板变量
            doc.render();
        } catch (error) {
            // 抛出异常
            let e = {
                message: error.message,
                name: error.name,
                stack: error.stack,
                properties: error.properties
            };
            console.log(JSON.stringify({ error: e }));
            throw error;
        }

        // 生成一个代表Docxtemplater对象的zip文件（不是一个真实的文件，而是在内存中的表示）
        let out = doc.getZip().generate({
            type: "blob",
            mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        // 将目标文件对象保存为目标类型的文件，并命名
        saveAs(out, docxname);
  })
}
