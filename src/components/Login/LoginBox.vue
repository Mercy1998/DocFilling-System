<!-- 登录框 -->
<template>
    <div class="ms_login" @keydown.enter="submitForm('loginMsg')">
        <el-form :model="loginMsg" :rules="rules" ref="loginMsg" class="form">
            <el-form-item prop="name">
                <el-input type="text" placeholder="Username" class="name" v-model="loginMsg.name"/>
            </el-form-item><br />
            <el-form-item prop="pwd">
                <el-input type="password" placeholder="Password" class="pwd" v-model="loginMsg.pwd"/>
            </el-form-item><br />
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

        return{
            loginMsg:{
                name:'',
                pwd:''
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

            }
        }
    },
    methods: {
        submitForm(formName)
        {
            this.$refs[formName].validate((valid) =>
            {
                if(valid){
                    sessionStorage.setItem("name",this.loginMsg.name)
                    let loginName = sessionStorage.getItem('name')
                    axios.get("http://localhost:3000/api/user/login",{
                        params:{
                            name:this.loginMsg.name,
                            pwd:this.loginMsg.pwd,
                        },
                    })
                    .then((res)=>
                    {
                        console.log(res);
                        if(res.data.state == 1){
                            if(loginName === 'hzuser'){
                                this.$router.replace({path:"/Entry"});
                            }else if(loginName === 'admin'){
                                this.$router.replace({path:"/Admin"});
                            }

                            

                            this.$message({
                                message:loginName+"登陆成功",
                                type:"success"
                            });
                        }else if (res.data.state !== 1){
                            this.$message({
                                message:"账号或密码错误，请重新输入",
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
    //     sendLoginMsg(){
    //        if(!this.loginMsg.name){
    //             alert('用户名不能为空');
    //             return;
    //        }else if(!this.loginMsg.pwd){
    //              alert('密码不能为空');
    //             return;
    //        }
    //          let data = {
    //                name:this.loginMsg.name,
    //                password:this.loginMsg.pwd,
    //            }
    //         axios.post('http://localhost:3000/api/user/check',{
    //             name:data.name
    //         })
    //      login(qs.stringify(data)).then(res=>{
    //            console.log(res);
    //            if(res.status == 200){
    //                 this.loginMsg.phone = ''
    //                 this.loginMsg.pwd = ''
    //                 this.$message({
    //                     showClose: true,
    //                     message: '登录成功！',
    //                     type: 'success',
    //                 });
    //                 this.$store.dispatch('setAdminInfo',res)
    //                 this.$router.push('/entry')
    //            }else{

    //                 this.loginMsg.phone = ''
    //                 this.loginMsg.pwd = ''

    //                 this.$message({
    //                     showClose: true,
    //                     message: '登录失败！',
    //                     type: 'error',
    //                 });
    //            }
    //        },err=>{
    //            console.log(err.message);
    //             this.loginMsg.phone = ''
    //             this.loginMsg.pwd = ''
    //             this.loginloading = false
    //              this.$message({
    //                     showClose: true,
    //                     message: '登录失败！',
    //                     type: 'error',
    //                 });
    //        })
    //    },
    }

})
</script>

