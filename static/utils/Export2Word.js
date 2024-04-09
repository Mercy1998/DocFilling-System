import Docxtemplater from 'docxtemplater';
import JSZip from 'jszip';
import JSZipUtils from 'jszip-utils';
import { saveAs } from 'file-saver'

function loadFile(url, callback) {
  PizZipUtils.getBinaryContent(url, callback);
}
export function generate(url,data) {
  // var that = this;
  this.loadFile(url, function (error, content) {  //url模板存放的位置
    if (error) {
      throw error
    };
    var zip = new PizZip(content);
    var doc = new window.ocxtemplater().loadZip(zip)
    console.log(data)
    doc.setData({
      ...data   //导入到模板文档的数据对象
    });
    try {
      // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
      doc.render()
    } catch (error) {
      var e = {
        message: error.message,
        name: error.name,
        stack: error.stack,
        properties: error.properties,
      }
      console.log(JSON.stringify({
        error: e
      }));
      // The error thrown here contains additional information when logged with JSON.stringify (it contains a property object).
      throw error;
    }
    var out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }) //Output the document using Data-URI
    saveAs(out, "output.docx")
  })
}
