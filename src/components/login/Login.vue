<template>
    <div id="login">
        <form class="login-form" @submit.prevent="loginBtnClick">
            <h3>登录使用</h3>
            <input class="form-control center-block" name="account" type="text" v-bind:placeholder="accountHolder" v-model="account" @keyup="inputValueChange" />
            <input class="form-control center-block" name="password" type="password" v-bind:placeholder="passwordHolder" v-model="password" @keyup="inputValueChange" />
            <input class="form-control center-block btn btn-success" type="submit" value="登录" />
            <p>{{errMsg}}</p>
            <i @click="registerAccount">没有账号,去注册</i>
            <i @click="forgetPassword">忘记密码</i>
        </form>
    </div>
</template>

<script>
export default {
    data(){
        return {
            accountHolder:'手机号码',
            passwordHolder:'登录密码',
            errMsg:'',
            account:'',
            password:''
        }
    },
    methods:{
        inputValueChange(){
            this.errMsg = '';
        },
        registerAccount(){
            layer.alert("请发送手机号码至微信公众号,等待客服回复");
            $(".layui-layer-title").remove();
            $(".layui-layer-setwin").remove();
        },
        forgetPassword(){
            layer.msg("暂未开放",{time:500});
            // $(".layui-layer-title").remove();
            // $(".layui-layer-setwin").remove();
        },
        loginBtnClick(){
            if(this.account.length <= 0){
                this.errMsg = '手机号码不能为空';
                return;
            }
            let reg = /^1[3,4,5,6,7,8,9]\d{9}$/;
            if(!reg.test(this.account)){
                this.errMsg = '手机号码格式不正确';
                return;
            }
            if(this.password.length <= 0){
                this.errMsg = '登录密码不能为空';
                return;
            }
            this.errMsg = '';
            let that = this;
            let index = this.layer.load();
            this.http.post( `Login`,{account:this.account,password:this.password})
            .then(res=>{
                this.layer.close(index);
                if(res.data.code != 200){
                    this.errMsg = res.data.msg;
                } else {
                    that.http.setToken(res.data.token);
                    this.layer.msg(res.data.msg,{time:600},()=>{
                        // 执行路由跳转
                        this.$router.push({name:'homeLink'});
                    });
                }
            })
            .catch(err => {    
                this.layer.close(index);
                this.errMsg = "网络错误";
            });
        }
    }
}
</script>


<style scoped>
    #login{
        background-color: #ddd;
        height: 100%;
        width: 100%;
    }
    .login-form{
        position: absolute;
        top:20%;
        left: 7.5%;
        background-color: cadetblue;
        width: 85%;
        height: 320px;
        border-radius: 5px;
        padding: 20px 0 0 0;
        font-size: 20px;
    }
    .login-form>h3{
        color: white;
        font-weight: bold;
        margin-top: 0;
    }
    .login-form>input{
        width:80%;
        margin: 15px auto;
        height: 40px;
        border: none;
        font-size: 16px;
    }
    .login-form>input[type="submit"]{
        font-size: 18px;
        font-weight: bold;
    }
    .login-form>p{
        color:blueviolet;
        font-size: 14px;
        font-weight: normal;
    }
    .login-form>i{
        display: block;
        margin-bottom: 10px;
        font-size: 16px;
    }
    .login-form>i:nth-last-child(2){
        color: brown;
    }
    .login-form>i:nth-last-child(1){
        color: white;
    }
    
</style>
