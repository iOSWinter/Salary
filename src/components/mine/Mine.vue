<template>
    <div id="mine">
        <div class="top">
            <div class="left">
                <img :src="headUrl">
            </div>
            <div class="right">
                <p>{{nick}}</p>
                <p>{{account}}</p>
                <p>{{registerTime}}</p>
            </div>
        </div>
        <div class="option">
            <div>
                <p>{{recordMonthTitle}}</p>
                <p>{{recordMonth}}</p>
            </div>
            <div @click="checkMineScore">
                <p>{{mineScoreTitle}}</p>
                <p>{{mineScore}}</p>
            </div>
            <div @click="setRatio">
                <p>{{ratioTitle}}</p>
                <i class="fa fa-arrow-circle-o-right"></i>
            </div>
            <div @click="checkHelp">
                <p>{{help}}</p>
                <i class="fa fa-arrow-circle-o-right"></i>
            </div>
        </div>

        <div class="logout" @click="logout">{{logoutTitle}}</div>

        <tabbar :homeShow="false" :mineSelected="true"></tabbar>
    </div>
</template>

<script>
import Tabbar from '../tabbar/Tabbar'
import Help from './Help'

export default {
    components:{
        Tabbar
    },
    data(){
        return {
            headUrl:'',
            nick:'昵称',
            account:'登录账号',
            registerTime:'注册时间未知',
            recordMonthTitle:'记录月数',
            recordMonth:0,
            mineScoreTitle:'我的积分',
            mineScore:0,
            ratioTitle:'设置缴费比例',
            help:'使用帮助',
            logoutTitle:'退出登录'
        }
    },
    methods:{
        setRatio(){
            this.$router.push({name:'ratioLink'});
        },
        logout(){
            let index = this.layer.load();
            this.http.post("Logout")
            .then(res => {
                this.layer.close(index);
                this.layer.msg("退出登录成功", {time : 500}, () => {
                    this.http.setToken('');
                    this.$router.replace({name : 'loginLink'});
                });
            })
            .catch(err => {
                this.layer.close(index);
                this.layer.msg("网络错误", {time : 500});
            })
        },

        checkMineScore(){
            let index = this.layer.load();
            this.http.post("GetMineSocre")
            .then(res => {
                this.layer.close(index);
                this.generateMineScoreHtml(res.data);
            })
            .catch(err => {
                this.layer.close(index);
                this.layer.msg("网络错误", {time : 500});
            })
        },

        checkHelp(){

            let index = this.layer.load();
            this.http.post("GetUseHelp")
            .then(res => {
                this.layer.close(index);
                this.generateHelpHtml(res.data);
            })
            .catch(err => {
                this.layer.close(index);
                this.layer.msg("网络错误", {time : 500});
            })
        },

        generateMineScoreHtml(jsonData){
            if (jsonData.code == 200) {
                let content = "<div style='margin-top:-10px;'>";
                for (let i = 0; i < jsonData.data.length; i++){
                    let json = jsonData.data[i];
                    content += "<div style='margin:0 10px;height:50px;border-bottom:1px solid #eee;'><div style='height:49px;display:inline-block;width:80px;vertical-align:middle;'><label style='font-size:20px;color:green;padding-left:3px;height:49px;display:inline-block;line-height:49px;'>" + json.score + "</label></div><div style='display:inline-block;height:39px;text-align:right;padding:5px 0;min-width:150px;max-width:60%;font-size:14px;float:right;'><p style='display:inline-block;line-height:15px;margin:0;color:#aaa;width:100%;'>" + json.time.replace("T", " ").substring(0, 19) + "</p><c style='line-height:15px;height:15px;display:inline-block;color:#aaa;font-size:14px;margin-top:5px;'>" + json.remark + "</c></div></div>";
                }
                content += "</div>";
                console.log(content)
                let openLayer = this.layer.open({
                    type: 1,
                    area: ["80%", "70%"],
                    offset:"5%",
                    title:"我的积分",
                    content: jsonData.data.length <= 0 ? "<div style=text-align:center;>您还没有积分记录</div>" : content
                });
                $(".layui-layer-setwin").remove();
                $(".layui-layer-title").css("color", "green").css("font-size", "18px").css("text-align", "center").css("padding","0");
                $(".layui-layer-shade").click(function () {
                    layer.close(openLayer);
                });
            }
        },

        generateHelpHtml(jsonData){
            let content = "<div style='margin:0 10px 10px 10px;'>";
            for (let i = 0; i < jsonData.data.length;i++){
                let json = jsonData.data[i];
                content += "<div class=helpTitle close=close style='font-size:18px;background-color:#eee;margin-top:15px;height:30px;line-height:30px;padding:0px;'>" + json.title + "</div><div style='display:none;color:#999;letter-spacing:2px;padding:0 10px;'>" + json.content + "</div>";
            }
            content += "</div>";
            let openLayer = this.layer.open({
                type: 1,
                area: ["90%", "80%"],
                offset: "5%",
                title: "使用帮助",
                content: content
            });
            $(".layui-layer-setwin").remove();
            $(".layui-layer-title").css("color", "green").css("font-size", "18px").css("text-align", "center").css("padding", "0");
            $(".layui-layer-shade").click(function () {
                    layer.close(openLayer);
            });
            $(".helpTitle").click(function () {
                if($(this).attr("close") == "close"){
                    // 需要展开
                    $(this).attr("close", "open");
                    $(this).next().css("display","block");
                } else {
                    // 需要折叠
                    $(this).attr("close", "close");
                    $(this).next().css("display", "none");
                }
            });
        }
    },

    created(){
        this.http.post("GetPersonalInfo")
        .then(res => {
            this.nick = res.data.data.nick;
            this.account = res.data.data.account;
            this.registerTime = res.data.data.registerTime;
            this.headUrl = `${'http://www.sichuanzg.com/Salary'}${res.data.data.headUrl}`;
            this.recordMonth = res.data.data.monthCount;
            this.mineScore = res.data.data.totalScore;
        })
        .catch(err => {
            layer.msg('网络错误', {time:500});
        })
    }
}
</script>


<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    #mine{
        background-color: white;
        height: 100%;
        width: 100%;
    }
    .top{
        height: 130px;
        background-color: antiquewhite;
    }
    .left{
        width:100px;
        height: 100px;
        padding: 10px;
        padding-top: 20px;
    }
    .left>img{
        display: block;
        width:80px;
        height: 80px;
        border-radius: 40px;
        border: 1px solid #ccc;
    }
    .top>div{
        float: left;
    }
    .top>div:nth-last-child(1){
        width: calc(100% - 100px);
        padding-top: 20px;
        padding-left: 50px;
    }
    .top>div:nth-last-child(1)>p{
        margin: 5px auto;
        text-align: left;
        color: coral;
        font-size: 16px;
    }

    .option{
        color: darkblue;
        font-size: 16px;
        padding-left: 10px;
    }
    .option>div{
        border-bottom: 1px solid #ccc;
        height: 50px;
    }
    .option>div>p:nth-child(1){
        float: left;
        width: calc(100% - 100px);
        text-align: left;
        line-height: 50px;
    }
    .option>div>i,.option>div>p:nth-last-child(1){
        float: left;
        width: 100px;
        text-align: right;
        padding-right: 10px;
        line-height: 50px;
    }

    .logout{
        background-color: crimson;
        color : white;
        font-size: 18px;
        font-weight: bold;
        height: 40px;
        line-height: 40px;
        position: fixed;
        left: 0;
        bottom: 51px;
        width:100%;
    }
</style>
