<template>
    
    <div id="login">
        <h3>登陆</h3>
        <LoginBox>
        </LoginBox>
        <img>
    </div>
</template>


<script>
import LoginBox from '../components/Login/LoginBox.vue';

export default({
    name:'login',
    components:{LoginBox},
    data(){
        return{
        }
    }
})
</script>

<style>
#login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 400px;
    margin: -280px 0 0 -190px;
    padding: 40px;
    border-radius: 22px;
    background: hsl(204, 20%, 95%);
    box-shadow: #619bbe 0px 0px 15px;
    opacity: 0.7;
  }
  h3 {
    margin-bottom: 20px;
  }

  

</style>