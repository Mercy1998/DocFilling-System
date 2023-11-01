<!-- 信息录入 -->
<template>
    <div id="input-box">
        <el-form :model="inputBox" :inline="true" class="demo-form-inline" ref="inputBox" :rule="rules">
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
            <el-form-item label="名称" prop="typeNum" v-if="isShowInput">
                <el-input v-model="inputBox.cusNum" placeholder="输入业务名称"></el-input>
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
            <el-form-item prop="writeTime">
                <el-input v-model="inputBox.writeTime" type="hidden"></el-input>
            </el-form-item>
            <el-form-item>
                <!-- <el-button type="primary" @click="onSubmit('inputBox')">提交</el-button>
                <el-button @click="onReset('inputBox')">重置</el-button> -->
                <el-button type="primary" @click="onSubmit">提交</el-button>
                <el-button @click="onReset('inputBox')">重置</el-button>
            </el-form-item>
        </el-form>

           
    </div>
</template>


<script>
import axios from 'axios';
import { getDefaultFlags } from 'mysql/lib/ConnectionConfig';

export default{
    name:'input-box',

    data() {
        return{
            rules:[],
            inputBox:{
                buyTime:'',
                cusNum:'',
                staff:'',
                amount:'',
                org:'',
                type1:'',
                type2:'',
                types:[
                    {"value":"投资理财中高端客户数","label":"t1"},
                    {"value":"临界客户晋升","label":"t2"},
                    {"value":"积存金","label":"t3"},
                    {"value":"同业存单","label":"t4"},
                    {"value":"甄选系列理财","label":"t5"},
                    {"value":"对私保险-期交","label":"t6"},
                    {"value":"熊猫金币","label":"t7"},
                    {"value":"其他产品","label":"t8"},
                ],
                allTypes:{
                    "对私保险-期交":[
                    {"value":"投资理财中高端客户数","label":"a1"},
                    {"value":"客户晋升","label":"a2"},
                    {"value":"积存金(g)","label":"a3"},
                    ],
                    "熊猫金币":[
                    {"value":"中银中短债(万)","label":"a4"},
                    {"value":"新发和二发基金","label":"a5"},
                    {"value":"对私保险-折期交(万)","label":"a6"}
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
                isShowSelect:false,
                isShowInput:false
            },
            
        }
    },
    rules:{
        cusNum:[
            {required:true,message:'请输入机构名称',trigger:'blur'}
        ]

    },
    // mounted(){
    //     let today = new date()
    //     var year = today.getFullYear();//获取年份
    //     var month = today.getMonth() + 1;//获取月份
    //     var day = today.getDate();//获取日期
    //     this.inputBox.writeTime = year + "-" + month + "-" + day;
    // },
    methods: {
        // getBanks(){
        //     axios.get('static/banks.json').then(response =>{
        //         console.log(response.data);
        //         let datas = response.data;
        //         console.log(datas)
        //         this.orgs =datas.data;
        //         console.log(this.orgs)
        //     },response => {
        //         console.log("error")
        //     });
        // },
        change(){
            console.log("clicked")
            this.inputBox.type2 = ""

            console.log(this.inputBox.type1)
            for(const k in this.inputBox.types){
                if(this.inputBox.type1 === "对私保险-期交" || this.inputBox.type1 === "熊猫金币"){
                    this.isShowSelect = true
                    if(this.inputBox.type1 === this.inputBox.types[k].value){
                        this.inputBox.type2s = this.inputBox.allTypes[this.inputBox.type1]
                        console.log(this.inputBox.type2s)
                        break;
                    }
                }else if(this.inputBox.type1 === "其他产品" ){
                    this.isShowInput = true

                }else{
                    this.isShowSelect = false
                    this.isShowInput = false
                }
                // 核心代码
                    
            }

        },
        onSubmit(){
            this.$emit('getFormData',this.inputBox);
            this.$refs['inputBox'].resetFields();
            console.log(this.inputBox.writeTime);
                },
        onReset(formName) {
            this.$refs[formName].resetFields();
            console.log('clear');
        }
    }
}
</script>