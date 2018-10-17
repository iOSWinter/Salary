<template>
    <div id="home">
        <home-summary :summary="summary"></home-summary>
        <month v-for="item in monthList" :key="item.month" :monthData="item" @checkDetail="checkSalaryDetail"></month>
        <div class="load-more" @click="getMonthList">{{loadMoreText}}</div>
        <tabbar :homeShow="true" :homeSelected="true"></tabbar>
    </div>
</template>


<script>

import HomeSummary from './HomeSummary'
import Month from './Month'
import Tabbar from '../tabbar/Tabbar'
import axios from 'axios'

export default {
    components:{
        HomeSummary,
        Month,
        Tabbar
    },
    data(){
        return{
            summary:{real:0,theory:0,avg:0,insurance:0,tax:0},
            monthList:[],
            lastMonth:'',
            loadMoreText:'加载更多'
        }
    },
    methods:{
        getSalarySummary(){
            this.http.post("GetSalarySummary")
            .then(res=>{
                this.summary.real = res.data.data.real;
                this.summary.theory = res.data.data.theory;
                this.summary.avg = res.data.data.avg;
                this.summary.insurance = res.data.data.insurance;
                this.summary.tax = res.data.data.tax;
            })
            .catch(err =>{
                layer.msg("获取汇总失败",{time:600});
            })
        },
        getMonthList(){

            if(this.loadMoreText == '无更多数据'){
                return;
            }
            let index = layer.load();
            this.loadMoreText = '正在加载...';
            this.http.post("GetMonthList",{startDate:this.lastMonth})
            .then(res => {
                layer.close(index);
                if(res.data.data.length > 0){
                    if(this.monthList.length > 0){
                        layer.msg(res.data.msg, {time:500});
                    }
                    this.monthList.push(...res.data.data);
                } else {
                    layer.msg("无更多数据", {time:500});
                    this.loadMoreText = '无更多数据';
                }
                if(this.monthList.length > 0){
                    this.lastMonth = this.monthList[this.monthList.length - 1].month;
                }
            })
            .catch(err => {
                layer.close(index);
                layer.msg("获取列表失败",{time:600});
            })
            .finally(() => {
                if(this.loadMoreText != '无更多数据'){
                    this.loadMoreText = '加载更多';
                }
            })
        },
        checkSalaryDetail(id){
            let loadIndex = this.layer.load();
            this.http.post("GetMonthDetail",{id:id})
            .then(res => {
                this.layer.close(loadIndex);
                this.showDetail(res.data.data,id);

            })
            .catch(err => {
                this.layer.close(loadIndex);
                this.layer.msg("网络错误",{time:600});
            });
        },
        deleteRecord(month,id) {
            let that = this;
            this.layer.confirm("确定删除<br/><span style=color:red;font-size:20px;>" + month + "</span><br/>的薪资记录？", function () {
                let loading = that.layer.load();
                that.http.post("DeleteMonthSalary",{id:id})
                .then(res => {
                    // that.layer.close(loading);
                    that.layer.closeAll();
                    that.layer.msg(res.data.msg,{time:1000});
                    // that.$router.replace({name:'homeLink'});
                    that.getSalarySummary();
                    let index = -1;
                    for (let i = 0; i < that.monthList.length; i++) {
                        let month = that.monthList[i];
                        if(month.id == id){
                            index = i;
                            break;
                        }
                    }
                    if(index >= 0){
                        that.monthList.splice(index,1);
                    }
                })
                .catch(err => {
                    that.layer.close(loading);
                    that.layer.msg("网络错误", {time:600});
                    $('.layui-layer-content').css("color", "red").css("font-weight", "bold");
                })
            });
            $($(".layui-layer-title")[1]).remove();
            $(".layui-layer-setwin").remove();
        },
        showDetail(jsonSalary,id){
            let that = this;
            let index = this.layer.open({
                type: 1,
                offset:'20px',
                title: jsonSalary.month + " 记录详情",
                area: ['90%', '80%'],
                content: "<div style='margin:0 40px' id=" + id + "><i class='fa fa-edit' style=color:green;font-size:30px;></i><i class='fa fa-trash-o' style=color:gray;font-size:30px;float:right;></i></div><div class=titleDiv><p>个人情况</p></div><div class=itemDiv><label>月基本薪资</label><p>" + (parseFloat(jsonSalary.baseSalary)).toFixed(2) + "</p></div><div class=itemDiv><label>加项</label><p>" + jsonSalary.increase.toFixed(2) + "</p></div><div class=itemDiv><label>减项</label><p>" + jsonSalary.reduce.toFixed(2) + "</p></div><div class=itemDiv><label>奖金</label><p>" + jsonSalary.reward.toFixed(2) + "</p></div><div class=itemDiv><label>餐费</label><p>" + jsonSalary.meal.toFixed(2) + "</p></div><div class=itemDiv><label>养老保险</label><p>" + jsonSalary.retirement.toFixed(2) + "</p></div><div class=itemDiv><label>医疗保险</label><p>" + jsonSalary.medical.toFixed(2) + "</p></div><div class=itemDiv><label>失业保险</label><p>" + jsonSalary.unemployment.toFixed(2) + "</p></div><div class=itemDiv><label>生育保险</label><p>" + jsonSalary.birth.toFixed(2) + "</p></div><div class=itemDiv><label>工伤保险</label><p>" + jsonSalary.industrialInjury.toFixed(2) + "</p></div><div class=itemDiv><label>大病医疗</label><p>" + jsonSalary.bigMedical.toFixed(2) + "</p></div><div class=itemDiv><label>五险合计</label><p>" + (jsonSalary.personalInsuranceTotal).toFixed(2) + "</p></div><div class=itemDiv><label>住房公积金</label><p>" + jsonSalary.houseFund.toFixed(2) + "</p></div><div class=itemDiv><label>五险一金合计</label><p>" + jsonSalary.personalTotal.toFixed(2) + "</p></div>" + "<div class=titleDiv><p>公司情况</p></div><div class=itemDiv><label>公司名称</label><p name=company>" + jsonSalary.company + "</p></div><div class=itemDiv><label>养老保险</label><p>" + jsonSalary.retirementC.toFixed(2) + "</p></div><div class=itemDiv><label>医疗保险</label><p>" + jsonSalary.medicalC.toFixed(2) + "</p></div><div class=itemDiv><label>失业保险</label><p>" + jsonSalary.unemploymentC.toFixed(2) + "</p></div><div class=itemDiv><label>生育保险</label><p>" + jsonSalary.birthC.toFixed(2) + "</p></div><div class=itemDiv><label>工伤保险</label><p>" + jsonSalary.industrialInjuryC.toFixed(2) + "</p></div><div class=itemDiv><label>大病医疗</label><p>" + jsonSalary.bigMedicalC.toFixed(2) + "</p></div><div class=itemDiv><label>五险合计</label><p>" + (jsonSalary.companyInsuranceTotal).toFixed(2) + "</p></div><div class=itemDiv><label>住房公积金</label><p>" + jsonSalary.houseFundC.toFixed(2) + "</p></div><div class=itemDiv><label>五险一金合计</label><p>" + jsonSalary.companyTotal.toFixed(2) + "</p></div>" + "<div class=titleDiv><p>综合情况</p></div><div class=itemDiv><label>个人所得税</label><p>" + jsonSalary.tax.toFixed(2) + "</p></div><div class=itemDiv><label>五险合计</label><p>" + (jsonSalary.personalInsuranceTotal + jsonSalary.companyInsuranceTotal).toFixed(2) + "</p></div><div class=itemDiv><label>公积金合计</label><p>" + (jsonSalary.houseFund + jsonSalary.houseFundC).toFixed(2) + "</p></div><div class=itemDiv><label>五险一金合计</label><p>" + (jsonSalary.companyTotal + jsonSalary.personalTotal).toFixed(2) + "</p></div><div class=itemDiv><label>应发薪资</label><p>" + (parseFloat(jsonSalary.theory)).toFixed(2) + "</p></div><div class=itemDiv><label>实发薪资</label><p>" + (parseFloat(jsonSalary.real)).toFixed(2) + "</p></div>"
            });
            $(".layui-layer-title").css("color", "green").css("font-weight", "bold").css("padding", "0").css("text-align", "center").css("font-size", "16px");
            $(".layui-layer-setwin").remove();
            $(".layui-layer-shade").click(function () {
                layer.close(index);
            });
            $("p[name=company]").click(function () {
                layer.msg(jsonSalary.company);
            });
            $($($(".layui-layer-content").children()[0]).children("i")[0]).click(function () {
                // 编辑
                that.layer.closeAll();
                that.$router.push({name:'addsalaryLink',params:{add : false,id : id}});
            });
            $($($(".layui-layer-content").children()[0]).children("i")[1]).click((() => {
                // 删除
                this.deleteRecord(jsonSalary.month,id);
            }));
            $(".layui-layer-title").css("font-size","18px");
        }
    },

    created(){
        this.getSalarySummary();
        this.getMonthList();
    }
}
</script>

<style scoped>
    #home{
        width: 100%;
        background-color: #eee;
    }
    .load-more{
        height: 40px;
        color: #aaa;
        line-height: 40px;
        margin-bottom: 50px;
    }

</style>
