<template>
    <div id="admin">
        <div class="user-admin">{{ title }}</div>
        <div class="new-account" @click="newAccountTitleClick">{{ newAccountTitle }}</div>
        <ul>
            <li class="user-li" v-for="user in users" :key="user.id" :data-id="user.id" @click="editUser">
                <div class="top">
                    <span>{{ user.account }}</span>
                    <span>{{ user.registerTime }}</span>
                </div>
                <div class="bottom">
                    <span>{{ user.nick }}</span>
                    <span>{{ user.lastLoginTime }}</span>
                </div>
            </li>
        </ul>
        <div class="create-cover" @click="hideCover" v-show="createShow">
            <div class="create" @click.stop="">
                <h4>{{ newAccountTitle }}</h4>
                <ul>
                    <li class="create-li">
                        <!-- <span>手机号码</span> -->
                        <input v-model="account" type="text" placeholder="手机号码">
                    </li>
                    <li class="create-li">
                        <!-- <span>密码</span> -->
                        <input v-model="password" type="text" placeholder="密码">
                    </li>
                    <li class="create-li">
                        <!-- <span>昵称</span> -->
                        <input v-model="nick" type="text" placeholder="昵称">
                    </li>
                </ul>
                <div class="btn" @click="createAccount">创建</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            users:[],
            title:'用户管理',
            newAccountTitle:'新增账号',
            createShow:false,
            account:'',
            password:'',
            nick:'职业历程用户'
        }
    },
    methods:{
        newAccountTitleClick(){
            this.createShow = true;
        },
        hideCover(){
            this.createShow = false;
        },
        editUser(e){
            let li = $(e.target).parent().parent();
            li.addClass('selected');
            layer.confirm('请选择操作',{btn:['重置密码','取消']},(index)=>{
                let loading = layer.load();
                this.http.post('resetPassword',{uid:$(li).attr('data-id')})
                .then(res=>{
                    layer.close(index);  
                    li.removeClass('selected');   
                    layer.close(loading);
                    layer.msg(res.data.msg, {time:500});
                })
                .catch(err=>{
                    layer.close(index);  
                    li.removeClass('selected'); 
                    layer.close(loading);
                    layer.msg('网络错误'+err, {time:50000});
                });
            },()=>{
                li.removeClass('selected');
            });
            $(".layui-layer-setwin").remove();
            $(".layui-layer-title").remove();
            $(".layui-layer-content").css("color", "green").css("font-size", "18px");
        },
        createAccount(){
            let index = layer.load();
            this.http.post('register',{account:this.account,password:this.password,nick:this.nick})
            .then(res=>{
                layer.close(index);
                if(res.data.code == 200){
                    layer.msg(res.data.msg, {time:500});
                    this.createShow = false;
                    this.refreshUsers();
                } else{
                    layer.msg(res.data.msg, {time:500});
                }
            })
            .catch(err=>{
                layer.close(index);
                layer.msg('网络错误', {time:500});
            })
        },
        refreshUsers(){
            let index = layer.load();
            this.http.post('GetUsers')
            .then(res=>{
                layer.close(index);
                this.users.length = 0;
                this.users.push(...res.data.data)
            })
            .catch(err=>{
                layer.close(index);
                layer.msg('网络错误' + err, {time:500});
            })
        }
    },
    created(){
        this.refreshUsers();
    }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    #admin{
        width: 100%;  
        height: 100%; 
    }
    .user-admin{
        height: 40px;
        line-height: 40px;
        font-size: 18px;
        background-color: white;
        margin-bottom: 5px;
    }
    .new-account{
        position: absolute;
        top: 0;
        right: 0;
        height: 40px;
        line-height: 40px;
        margin:0 10px;
        padding: 0 10px;
        font-size: 15px;
        /* background-color: dodgerblue; */
    }
    .selected{
        color: white!important;
        background-color: cadetblue!important;
    }
    .user-li{
        margin-bottom: 5px;
        background-color: white;
        height: 50px;
    }
    .user-li>div>span{
        display: inline-block;
        padding: 0 5px;
        height: 25px;
        line-height: 25px;
    }
    .user-li>div>span:nth-child(1){
        width: calc(100% - 150px);
        text-align: left;
        font-size: 16px;
    }
    .user-li>div>span:nth-last-child(1){
        width: 140px;
        text-align: right;
    }

    .create-cover{
        background-color: rgba(225, 225, 225, 0.8);
        height: 100%;
        width: 100%;
        position: absolute;
        left: 0;
        top: 0;
    }
    .create{
        width: 80%;
        position: absolute;
        top: 20%;
        left: 10%;
        background-color: aquamarine;
        padding: 10px;
        border-radius: 8px;
    }
    .create-li{
        height: 40px;
        margin: 10px auto;
        list-style: none;
    }
    /* .create-li>span{
        display: inline-block;
        width:80px;
        text-align: left;        
    } */
    .create-li>input{
        height: 35px;
        border: none;
        padding: 0 5px;
        width: 80%;
    }
    .btn{
        display: inline-block;
        height: 40px;
        margin: 10px auto;
        background-color: darkcyan;
        line-height: 40px;
        color: white;
        font-weight: bold;
        font-size: 16px;
        width:80%;
        letter-spacing: 0.2em;
    }
</style>
