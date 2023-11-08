<!-- 信息录入 -->
<template>
    <div id="admin-input">
        <el-form :model="inputBox" :inline="true" class="demo-form-inline" ref="inputBox" >
            <el-form-item label="机构名称" prop="org">
                <el-select v-model="inputBox.org" placeholder="请选择机构名称">
                    <el-option
                    v-for="item in inputBox.orgs"
                    :key="item.label"
                    :label="item.value"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="客户号" prop="cusNum">
                <el-input v-model="inputBox.cusNum" placeholder="输入客户号"></el-input>
            </el-form-item>
            <br>
            <!-- 二级联动 -->
            <el-form-item  label="业务种类" prop="type1">
                <el-select v-model="inputBox.type1" placeholder="请选择业务种类" @change="change">
                    <el-option
                    v-for="item in inputBox.types"
                    :key="item.label"
                    :label="item.value"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item  label="业务种类2" prop="type2"  v-if="isShowSelect">
                <el-select v-model="inputBox.type2" placeholder="请选择业务种类">
                    <el-option
                    v-for="item in inputBox.type2s"
                    :key="item.label"
                    :label="item.value"
                    :value="item.value">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="业务名称" prop="typeNum" v-if="isShowInput">
                <el-input v-model="inputBox.type2" placeholder="输入业务名称"></el-input>
            </el-form-item> 
            <el-form-item label="金额/户数" prop="amount">
                <el-input v-model="inputBox.amount" placeholder="输入金额(万)或户数"></el-input>
            </el-form-item>
            <br>
            <el-form-item label="营销人员" prop="staff">
                <el-input v-model="inputBox.staff" placeholder="输入营销人员姓名"></el-input>
            </el-form-item>
            <el-form-item label="购买日期" prop="buyTime">
                <el-date-picker v-model="inputBox.buyTime" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
            <br>
            <el-form-item>
                <!-- <el-button type="primary" @click="onSubmit('inputBox')">提交</el-button>
                <el-button @click="onReset('inputBox')">重置</el-button> -->
                <el-button type="primary" @click="onSubmit()">添加</el-button>
                <el-button @click="search()">查询</el-button>
                <el-button @click="onReset('inputBox')">重置</el-button>
                <!-- <el-button @click="getScore">计算得分</el-button> -->
            </el-form-item>
        </el-form>

           
    </div>
</template>


<script>
import axios from 'axios';
import { getDefaultFlags } from 'mysql/lib/ConnectionConfig';

export default{
    name:'admin-input',

    data() {
        // 验证
        var validateOrg = (rule, value, callback) =>
        {
            if (value === "") {
                return callback(new Error("请选择机构"));
            } else {
                callback();
            }
        };
        var validateCusNum = (rule, value, callback) =>
        {
            if (value === "") {
                return callback(new Error("请输入客户号"));
            } else {
                callback();
            }
        };
        var validateType1 = (rule, value, callback) =>
        {
            if (value === "") {
                return callback(new Error("请选择业务种类"));
            } else {
                callback();
            }
        };
        var validateAmount = (rule, value, callback) =>
        {
            if (value === "") {
                return callback(new Error("请输入金额或户数"));
            } else {
                callback();
            }
        };
        var validateStaff = (rule, value, callback) =>
        {
            if (value === "") {
                return callback(new Error("请输入营销人员姓名"));
            } else {
                callback();
            }
        };
        var validateBuyTime = (rule, value, callback) =>
        {
            if (value === "") {
                return callback(new Error("请选择购买时间"));
            } else {
                callback();
            }
        };

        //数据
        return{
            inputBox:{
                buyTime:'',
                cusNum:'',
                staff:'',
                amount:'',
                org:'',
                type1:'',    //大类
                type2:'',    //小类
                // 大类列表
                types:[
                    {"value":"投资理财中高端客户数","label":"t1","count":1},
                    {"value":"临界客户晋升","label":"t2","count":1},
                    {"value":"积存金","label":"t3","count":0.02},
                    {"value":"甄选1号基金","label":"t5","count":1},
                    {"value":"甄选系列理财","label":"t6","count":0.03},
                    {"value":"对私保险-期交","label":"t7","count":1},
                    {"value":"熊猫金币","label":"t8","count":1},
                    {"value":"其他产品","label":"t9","count":0},
                ],
                // 二级分类列表
                allTypes:{
                    "甄选1号基金":[
                    {"value":"华夏安泰对冲（008856）","label":"z1","count":0.015},
                    {"value":"博时上证科创100","label":"z2","count":0.008},
                    ],
                    "对私保险-期交":[
                    {"value":"中银尊享人生二号终身寿险3年","label":"d1","count":0.072},
                    {"value":"中银尊享人生二号终身寿险5年","label":"d2","count":0.108},
                    {"value":"中银尊享人生二号终身寿险10年","label":"d3","count":0.18},
                    {"value":"中银尊享人生二号终身寿险15年","label":"d4","count":0.18},
                    {"value":"中银尊享人生二号终身寿险20年","label":"d5","count":0.18},
                    {"value":"鑫悦金典终身寿险（荣耀版）3年","label":"d6","count":0.09},
                    {"value":"鑫悦金典终身寿险（荣耀版）5年","label":"d7","count":0.14},
                    {"value":"鑫悦金典终身寿险（荣耀版）6年","label":"d8","count":0.14},
                    {"value":"鑫悦金典终身寿险（荣耀版）10年","label":"d9","count":0.18},
                    {"value":"财富一生终身护理保险（D款）3年","label":"d10","count":0.09},
                    {"value":"财富一生终身护理保险（D款）5年","label":"d11","count":0.14},
                    {"value":"财富一生终身护理保险（D款）10年","label":"d12","count":0.18},
                    {"value":"财富一生终身护理保险（D款）15年","label":"d13","count":0.18},
                    {"value":"财富一生终身护理保险（D款）20年","label":"d14","count":0.18},
                    {"value":"臻鑫传家终身寿3年","label":"d15","count":0.081},
                    {"value":"臻鑫传家终身寿5年","label":"d16","count":0.126},
                    {"value":"臻鑫传家终身寿10年","label":"d17","count":0.162},
                    {"value":"永享福终身寿3年","label":"d18","count":0.09},
                    {"value":"永享福终身寿5年","label":"d19","count":0.14},
                    {"value":"永享福终身寿6年","label":"d20","count":0.14},
                    {"value":"永享福终身寿10年","label":"d21","count":0.18},
                    ],
                    "熊猫金币":[
                    {"value":"满分评级版","label":"x1","count":0.08},
                    {"value":"首发认证版","label":"x2","count":0.036},
                    {"value":"普通认证封装","label":"x3","count":0.03},
                    {"value":"普通套装（未封装）","label":"x4","count":0.025},
                    {"value":"30克金币智能卡*3枚","label":"x5","count":0.04},
                    {"value":"3克金*10枚","label":"x6","count":0.06}
                    ]
                },
                type2s:[],
                orgs:[
                    {"value":"城东支行","label":"b1"},
                    {"value":"南街支行","label":"b2"},
                    {"value":"开发区支行","label":"b3"},
                    {"value":"练市支行","label":"b4"},
                    {"value":"南太湖新区支行","label":"b5"},
                    {"value":"金陵北路支行","label":"b6"},
                    {"value":"南浔营业部","label":"b7"},
                    {"value":"双林支行","label":"b8"},
                    {"value":"昌硕绿色支行","label":"b9"},
                    {"value":"吴兴支行","label":"b10"},
                    {"value":"城中支行","label":"b11"},
                    {"value":"德清营业部","label":"b12"},
                    {"value":"城东支行","label":"b13"},
                    {"value":"南街支行","label":"b14"},
                    {"value":"开发区支行","label":"b15"},
                    {"value":"练市支行","label":"b16"},
                    {"value":"南太湖新区支行","label":"b17"},
                    {"value":"金陵北路支行","label":"b18"},
                    {"value":"南浔营业部","label":"b19"},
                    {"value":"双林支行","label":"b20"},
                    {"value":"市行营业部","label":"b21"},
                    {"value":"安吉营业部","label":"b22"},
                    {"value":"凤凰路支行","label":"b23"},
                    {"value":"爱山支行","label":"b24"},
                    {"value":"长兴营业部","label":"b25"},
                    {"value":"绿城广场支行","label":"b26"},
                    {"value":"长兴开发区支行","label":"b27"},
                    {"value":"织里支行","label":"b28"},
                    {"value":"东部新城支行","label":"b29"},
                    {"value":"乾元支行","label":"b30"},
                    {"value":"新市支行","label":"b31"},
                    {"value":"人瑞路支行","label":"b32"},
                    {"value":"龙之梦支行","label":"b33"}
                ],
                score:''
            },
            //控制业务分类
            isShowSelect:false,
            isShowInput:false,
            //验证规则
            // rules:{
            //     org:[
            //         {
            //             validator: validateOrg,
            //             trigger: "blur",
            //         },
            //     ],
            //     cusNum:[
            //         {
            //             validator: validateCusNum,
            //             trigger: "blur",
            //         }
            //     ],
            //     buyTime:[ {
            //             validator: validateBuyTime,
            //             trigger: "blur",
            //         }
            //     ],
            //     staff:[ {
            //             validator: validateStaff,
            //             trigger: "blur",
            //         }
            //     ],
            //     amount:[ {
            //             validator: validateAmount,
            //             trigger: "blur",
            //         }
            //     ],
            //     type1:[ {
            //             validator: validateType1,
            //             trigger: "blur",
            //         }
            //     ],    //大类
            // }

        }
    },
    // mounted(){
    //     let today = new date()
    //     var year = today.getFullYear();//获取年份
    //     var month = today.getMonth() + 1;//获取月份
    //     var day = today.getDate();//获取日期
    //     this.inputBox.writeTime = year + "-" + month + "-" + day;
    // },
    methods: {
        // 根据大类改变小类
        change(){
            console.log("clicked")
            this.inputBox.type2 = ""
            console.log(this.inputBox.type1)
            for(const k in this.inputBox.types){
                if(this.inputBox.type1 === "对私保险-期交" || this.inputBox.type1 === "熊猫金币"|| this.inputBox.type1 === "甄选1号基金"){
                    this.isShowSelect = true
                    this.isShowInput = false
                    if(this.inputBox.type1 === this.inputBox.types[k].value){
                        this.inputBox.type2s = this.inputBox.allTypes[this.inputBox.type1]
                        console.log(this.inputBox.type2s)
                        break;
                    }
                }else if(this.inputBox.type1 === "其他产品" ){
                    this.isShowInput = true
                    this.isShowSelect = false
                }else{
                    this.isShowSelect = false
                    this.isShowInput = false
                }
                // 核心代码  
            }

        },
        //得分计算
        // getScore() {
            
        // },
        onSubmit(){
            //得分计算
            let score = 1
            let flag = 0
            for(const k in this.inputBox.types){
                if(this.inputBox.type1 === this.inputBox.types[k].value){
                    if(this.inputBox.type1 === "对私保险-期交" || this.inputBox.type1 === "熊猫金币"|| this.inputBox.type1 === "甄选1号基金"){
                        this.inputBox.type2s = this.inputBox.allTypes[this.inputBox.type1]
                        for(const i in this.inputBox.type2s){
                            if(this.inputBox.type2 === this.inputBox.type2s[i].value){
                                flag = 1
                                console.log(this.inputBox.type2s[i])
                                this.inputBox.score = (this.inputBox.amount*10000) * (this.inputBox.type2s[i].count*1000000)/10000000000
                                console.log(score)
                                break;
                     }   
                        }
                        if(flag === 1)
                            break;
                    }  
                    else{
                        console.log(this.inputBox.types[k])
                        this.inputBox.score = (this.inputBox.amount*10000) *( this.inputBox.types[k].count*1000000)/10000000000
                        console.log(score)
                        break;
                    }
                      
                    }
            }
            // for(item in this.inputBox)
            //传值
            this.$emit('getFormData',this.inputBox);
            //清空
            this.$refs['inputBox'].resetFields();
            this.inputBox.score = ""
            this.isShowInput = false
            this.isShowSelect = false
  
            // console.log(this.inputBox.writeTime);
                },
        // 查询
        search(){
            this.$emit('getSearchData',this.inputBox);
            //清空
            this.$refs['inputBox'].resetFields();
            this.isShowInput = false
            this.isShowSelect = false
        },
        onReset(formName) {
            this.$refs[formName].resetFields();
            console.log('clear');
            this.inputBox.score = ""
            this.isShowInput = false
            this.isShowSelect = false
        }
    }
}
</script>

<style>
.el-form-item__label{
    color: #000;
}
.el-input__placeholder {
    color: #606266;

}
.el-input__inner {
    border:1px solid #606266 ;
    color: #303133 ;
}

.el-select-dropdown__item {
    color:#232427;
}
</style>