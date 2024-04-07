<!-- 登录框 -->
<template>
    <div class="ms_login" @keydown.enter="submitForm('loginMsg')">
        <el-form :model="loginMsg" :rules="rules" ref="loginMsg" class="form">
            <el-form-item prop="name">
                <el-input type="text" placeholder="请输入账号" v-model="loginMsg.name"/>
            </el-form-item><br />
            <el-form-item prop="pwd">
                <el-input type="password" placeholder="请输入密码" v-model="loginMsg.pwd"/>
            </el-form-item><br />
          <el-form-item label="登录身份" prop="identity">
            <el-select v-model="loginMsg.identity" placeholder="请选择登录角色">
              <el-option
                v-for="item in identities"
                :key="item.label"
                :label="item.value"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('loginMsg')">登陆</el-button>
                <el-button @click="resetForm('loginMsg')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>


<script>
import axios from 'axios';
export default({
    name:'login-box',

    data(){
        // 验证
        var validateAccount = (rule, value, callback) =>
    {
      if (value === "") {
        return callback(new Error("账号不能为空"));
      } else {
        callback();
      }
    };

    var validatePassword = (rule, value, callback) =>
    {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    var validateIdentity = (rule, value, callback) => {
        if (value === "") {
          return callback(new Error("请选择登陆角色"));
        } else {
          callback();
        }
      };
        return{
            loginMsg:{
                name:'',
                pwd:'',
                identity: ''
            },
            rules:{
            name: [
            {
                validator: validateAccount,
                trigger: "blur",
            },
            ],
            pwd: [
            {
                validator: validatePassword,
                trigger: "blur",
            },
            ],
              identity:[{
                validator: validateIdentity,
                trigger:"blur"
              }
              ]
            },
        //   角色
            identities:[{
              value: '民警',
              label: '民警'
            }, {
              value: '侦察人员',
              label: '侦查人员'
            }, {
              value: '公安机关',
              label: '公安机关'
            }]
        }
    },
    methods: {
        submitForm(formName)
        {
            this.$refs[formName].validate((valid) =>
            {
                if(valid){
                    sessionStorage.setItem("identity",this.loginMsg.identity)
                    sessionStorage.setItem("name",this.loginMsg.name)
                    let loginType = sessionStorage.getItem('identity')
                    let loginName = sessionStorage.getItem('name')
                    axios.get("http://localhost:3000/api/user/Login",{
                        params:{
                            name:this.loginMsg.name,
                            pwd:this.loginMsg.pwd,
                            identity:this.loginMsg.identity
                        },
                    })
                    .then((res)=>
                    {
                        console.log(res);
                        if(res.data.state == 1){
                            if(loginType === '公安机关'){
                                this.$router.replace({path:"DocofPoliceOrgan"});
                            }else if(loginType === '民警'){
                                this.$router.replace({path:"/DocofPolice"});
                            }else if (loginType === '侦察人员'){
                              this.$router.replace({path:"/DocofInspector"});
                            }



                            this.$message({
                                message:loginType+"："+loginName+" 登陆成功",
                                type:"success"
                            });
                        }else if (res.data.state !== 1){
                            this.$message({
                                message:"账号或密码错误或身份不符合，请重新输入",
                                type:"error"
                            })
                        }
                        else {
                            this.message.error("登录失败");
                            return false;
                        }
                    })
                }
            });
        },
        resetForm(formName){
            this.$refs[formName].resetFields();
        }

    }

})
</script>

