<!-- 信息录入 -->
<template>
  <div id="admin-input">
    <el-form :model="inputBox" :inline="true" class="demo-form-inline" ref="inputBox">
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
      <el-form-item label="营销人员" prop="staff">
        <el-input v-model="inputBox.staff" placeholder="输入营销人员姓名"></el-input>
      </el-form-item>
      <!-- 二级联动 -->
      <el-form-item label="业务种类1" prop="type1">
        <el-select v-model="inputBox.type1" placeholder="请选择业务种类" @change="change">
          <el-option
            v-for="item in inputBox.types"
            :key="item.label"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="业务种类2" prop="type2">
        <el-select v-model="inputBox.type2" placeholder="请选择业务种类">
          <el-option
            v-for="item in inputBox.type2s"
            :key="item.label"
            :label="item.value"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
<!--      <el-form-item label="业务名称" prop="typeNum" v-if="isShowInput">-->
<!--        <el-input v-model="inputBox.type2" placeholder="输入业务名称"></el-input>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="金额/户数" prop="amount">-->
<!--        <el-input v-model="inputBox.amount" placeholder="输入金额(万)或户数"></el-input>-->
<!--      </el-form-item>-->

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
import {getDefaultFlags} from 'mysql/lib/ConnectionConfig';

export default {
  name: 'admin-input',
  data() {
    // 验证
    var validateOrg = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请选择机构"));
      } else {
        callback();
      }
    };
    var validateCusNum = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入客户号"));
      } else {
        callback();
      }
    };
    var validateType1 = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请选择业务种类"));
      } else {
        callback();
      }
    };
    var validateAmount = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入金额或户数"));
      } else {
        callback();
      }
    };
    var validateStaff = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请输入营销人员姓名"));
      } else {
        callback();
      }
    };
    var validateBuyTime = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("请选择购买时间"));
      } else {
        callback();
      }
    };

    //数据
    return {
      inputBox: {
        buyTime: '',
        cusNum: '',
        staff: '',
        amount: '',
        org: '',
        type1: '',    //大类
        type2: '',    //小类
        // 动态获取
        // 大类列表
        types: [],
        // 二级分类列表
        allTypes: {},
        type2s: [],
        //
        orgs: [],

        //得分
        score: '',
        rowTypes: {}
      },
      //控制业务分类
      isShowSelect: false,
      isShowInput: false,
      // 所以条目
      allArray: []
    }
  },
  //加载
  created() {
    this.getValue1s()
    this.getValue2s()
    this.getOrgs()
  },
  methods: {
    // 根据大类改变小类内容
    change() {
      console.log("clicked")
      this.inputBox.type2 = ""
      this.inputBox.type2s = []
      console.log(this.inputBox.type1)
      for (const k in this.inputBox.types) {
        //判断主键是否相同
        if (this.inputBox.type1 === this.inputBox.types[k].value) {
          //判断type2s 是否为空
          for (const s in this.inputBox.allTypes[this.inputBox.type1]) {
            if (this.inputBox.allTypes[this.inputBox.type1][s].value !== null) {
              this.inputBox.type2s.push(this.inputBox.allTypes[this.inputBox.type1][s])
            }
          }
          console.log(this.inputBox.type2s)
          console.log("length:" + this.inputBox.type2s.length)
          if(this.inputBox.type2s.length !== 0) {
            this.isShowSelect = true
          } else {
            this.isShowSelect = false
          }
        }
      }
    },
    onSubmit() {
      this.inputBox.score = ""
      //得分计算
      console.log("type1: " + this.inputBox.type1)
      console.log("type1: " + this.inputBox.type2)
      let value = this.inputBox.type1 + this.inputBox.type2
      for (var i = 0; i < this.allArray.length; i++) {
        if (value === this.allArray[i][4]) {
          this.inputBox.score = (this.inputBox.amount * 10000) * (this.allArray[i][3] * 10000) / 100000000
          break
        }
      }
      //传值
      this.$emit('getFormData', this.inputBox);
      //清空
      this.$refs['inputBox'].resetFields();
      console.log(this.inputBox.score)

      this.isShowInput = false
    },
    // 查询
    search() {
      this.$emit('getSearchData', this.inputBox);
      //清空
      this.$refs['inputBox'].resetFields();
      this.isShowInput = false
      this.isShowSelect = false
    },
    //重置
    onReset(formName) {
      this.$refs[formName].resetFields();
      console.log('clear');
      this.inputBox.score = ""
      this.isShowInput = false
      this.isShowSelect = false
    },
    //获取大类
    getValue1s() {
      axios.get("http://localhost:3000/api/user/getValue1", {}).then((res) => {
        this.inputBox.types = []
        console.log(res.data)
        var type1s = res.data
        for (var i = 0; i < type1s.length; i++) {
          let newType = {
            value: type1s[i][1],
            label: type1s[i][0]
          }
          this.inputBox.types.push(newType)
        }
      })
    },
    //获取所有数据
    getValue2s() {
      axios.get("http://localhost:3000/api/user/getValue2", {}).then((res) => {
        console.log(res.data)
        this.inputBox.allTypes = {}
        this.allArray = res.data
        for (var i = 0; i < this.inputBox.types.length; i++) {
          let key = this.inputBox.types[i].value
          let value = []
          for (var j = 0; j < res.data.length; j++) {
            if (res.data[j][1] === key) {
              let newRow = {
                value: res.data[j][2],
                label: "s" + res.data[j][0],
                count: res.data[j][3]
              }
              value.push(newRow)
            } else {
              continue
            }
          }
          //不同的key值要用中括号分开
          this.inputBox.allTypes[key] = value
          console.log(this.inputBox.allTypes)
        }
        console.log(this.inputBox.allTypes)
        console.log(this.allArray)
      })
    },
    //获取机构
    getOrgs(){
      axios.get("http://localhost:3000/api/user/getOrgs",{

      }).then((res)=>{
        this.inputBox.orgs = []
        for(var i=0;i<res.data.length;i++){
          let newRow = {
            value:res.data[i],
            label:"b"+i
          }
          this.inputBox.orgs.push(newRow)
        }
        console.log(this.inputBox.orgs)
      })
    }
  }
}
</script>

<style>
.el-form-item__label {
  color: #000;
  font-size: 12px;
}

.el-input__placeholder {
  color: #606266;

}

.el-input__inner {
  border: 1px solid #606266;
  color: #303133;
  font-size: 12px;
}

.el-select-dropdown__item {
  color: #232427;
}
</style>
