<!-- 信息录入 -->
<template>
    <div id="input-box">
        <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="机构名称">
            <el-select v-model="value" placeholder="请选择机构名称">
                <el-option
                v-for="item in orgs"
                :key="item.label"
                :label="item.value"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="客户号">
            <el-input v-model="input1" placeholder="输入客户号"></el-input>
        </el-form-item>
        <el-form-item  label="业务种类">
            <el-select v-model="value2" placeholder="请选择业务种类">
                <el-option
                v-for="item in types"
                :key="item.label"
                :label="item.value"
                :value="item.value">
                </el-option>
            </el-select>
        </el-form-item>
        <br>
        <el-form-item label="营销人员">
            <el-input v-model="input2" placeholder="输入营销人员姓名"></el-input>
        </el-form-item>
        <el-form-item label="金额/克数">
            <el-input v-model="input3" placeholder="输入金额(万)或克数(g)"></el-input>
        </el-form-item>
        <el-form-item label="购买日期">
            <el-date-picker v-model="date1" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <br>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">提交</el-button>
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
            date1:'',
            input1:'',
            input2:'',
            input3:'',
            types:[
                {"value":"投资理财中高端客户数","label":"t1"},
                {"value":"客户晋升","label":"t2"},
                {"value":"积存金(g)","label":"t3"},
                {"value":"中银中短债(万)","label":"t4"},
                {"value":"新发和二发基金","label":"t5"},
                {"value":"对私保险-折期交(万)","label":"t6"}
            ],
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
            value:'',
            value2:''
        }
    },
    created() {
        // this.getBanks();
    },
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
        onSubmit(){

        },
        onReset() {
            
        }
    }
}
</script>