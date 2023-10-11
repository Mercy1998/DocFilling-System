
import { saveAs } from 'file-saver'
import * as XLSX from 'xlsx'
import * as XLSXStyle from "xlsx-style";


function datenum(v, date1904) {
    if (date1904) v += 1462;
    var epoch = Date.parse(v);
    return (epoch - new Date(Date.UTC(1899, 11, 30))) / (24 * 60 * 60 * 1000);
}
 
function sheet_from_array_of_arrays(data, opts) {
    var ws = {};
    var range = {
        s: {
            c: 10000000,
            r: 10000000
        },
        e: {
            c: 0,
            r: 0
        }
    };
    for (var R = 0; R != data.length; ++R) {
        for (var C = 0; C != data[R].length; ++C) {
            if (range.s.r > R) range.s.r = R;
            if (range.s.c > C) range.s.c = C;
            if (range.e.r < R) range.e.r = R;
            if (range.e.c < C) range.e.c = C;
            var cell = {
                v: data[R][C]
            };
            if (cell.v == null) continue;
            var cell_ref = XLSX.utils.encode_cell({
                c: C,
                r: R
            });
 
            if (typeof cell.v === 'number') cell.t = 'n';
            else if (typeof cell.v === 'boolean') cell.t = 'b';
            else if (cell.v instanceof Date) {
                cell.t = 'n';
                cell.z = XLSX.SSF._table[14];
                cell.v = datenum(cell.v);
            }
            else cell.t = 's';
            ws[cell_ref] = cell;
        }
    }
    if (range.s.c < 10000000) ws['!ref'] = XLSX.utils.encode_range(range);
    return ws;
}
 
function Workbook() {
    if (!(this instanceof Workbook)) return new Workbook();
    this.SheetNames = [];
    this.Sheets = {};
}
 
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
 


// 根据dom导出表格
export function exportToExcel(idSelector, fileName, titleNum = 1) {
    // 设置导出的内容是否只做解析，不进行格式转换     false：要解析， true:不解析
    const xlsxParam = { raw: true }
    let table = document.querySelector(idSelector).cloneNode(true);
 
    // 因为element-ui的表格的fixed属性导致多出一个table，会下载重复内容，这里删除掉
    if (table.querySelector('.el-table__fixed-right'))
        table.removeChild(table.querySelector('.el-table__fixed-right'));
    if (table.querySelector('.el-table__fixed'))
        table.removeChild(table.querySelector('.el-table__fixed'));
 
    const wb = XLSX.utils.table_to_book(table, xlsxParam)
    let range = XLSX.utils.decode_range(wb.Sheets['Sheet1']['!ref']);
    let cWidth = [];
    for (let C = range.s.c; C < range.e.c; ++C) {   //SHEET列
        let len = 100; //默认列宽
        let len_max = 400; //最大列宽
        for (let R = range.s.r; R <= range.e.r; ++R) {  //SHEET行
            let cell = { c: C, r: R };                    //二维 列行确定一个单元格
            let cell_ref = XLSX.utils.encode_cell(cell);  //单元格 A1、A2
            if (wb.Sheets['Sheet1'][cell_ref]) {
                // if (R == 0){
                if (R < titleNum) {
                    wb.Sheets['Sheet1'][cell_ref].s = {  //设置第一行单元格的样式 style
                        alignment: {
                            horizontal: 'center',
                            vertical: 'center',
                        },
                    };
                } else {
                    wb.Sheets['Sheet1'][cell_ref].s = {
                        alignment: {
                            horizontal: 'center',
                            vertical: 'center',
                        },
                    };
                }
                //动态自适应：计算列宽
                let va = JSON.parse(JSON.stringify(wb.Sheets['Sheet1'][cell_ref].v));
                var card1 = JSON.parse(JSON.stringify(va)).match(/[\u4e00-\u9fa5]/g); //匹配中文
                var card11 = "";
                if (card1) {
                    card11 = card1.join("")
                }
                var card2 = JSON.parse(JSON.stringify(va)).replace(/([^\u0000-\u00FF])/g, "");  //剔除中文
                let st = 0;
                if (card11) {
                    // st += card11.length * 16  //中文字节码长度
                    st += card11.length * 20  //中文字节码长度
                }
                if (card2) {
                    // st += card2.length * 8  //非中文字节码长度
                    st += card2.length * 10  //非中文字节码长度
                }
                if (st > len) {
                    len = st;
                }
            }
        }
        if (len > len_max) {//最大宽度
            len = len_max;
        }
 
        cWidth.push({ 'wpx': len });     //列宽
    }
    wb.Sheets['Sheet1']['!cols'] = cWidth
    const wbout = XLSXStyle.write(wb, { bookType: 'xlsx', bookSST: false, type: 'binary' })
    try {
        saveAs(new Blob([s2ab(wbout)], { type: '' }), `${fileName}.xlsx`)
    } catch (e) {
        if (typeof console !== 'undefined') {
            console.log(e, wbout)
        }
    }
    return wbout
}