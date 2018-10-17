<template>
    <div id="summary">

        <div class="top">
            <router-link to="/summaryfilter">
                <p>{{startDate}}—{{endDate}}</p>
            </router-link>            
        </div>
        <div id="chart"></div>  
        <a class="share" @click="shareImage">分享图片</a>

        <div class="sum">
            <div>
                <p>个人收入</p>
                <p>{{income.toFixed(2)}}</p>
            </div>
            <div>
                <p>个人缴费</p>
                <p>{{outcome.toFixed(2)}}</p>
            </div>
            <div>
                <p>公司成本</p>
                <p>{{companyOutcome.toFixed(2)}}</p>
            </div>
        </div>

        <tabbar :homeShow="false" :summarySelected="true"></tabbar>
    </div>
</template>

<script>
import echarts from 'echarts'
import Tabbar from '../tabbar/Tabbar'
import macarons from '../../../static/lib/echart/macarons'

let chart;

export default {
    components:{
        Tabbar
    },
    data(){
        return{
            xValues:[],
            values:[],
            income:0,
            outcome:0,
            companyOutcome:0,
            items:["theorySalary","mealCost","retirement","medical","unemployment","birth","industrialInjury","bigMedical","houseFund","tax","theorySalaryC","retirementC","medicalC","unemploymentC","birthC","industrialInjuryC","bigMedicalC","houseFundC"],
            startDate:'2017年1月',
            endDate:'2018年9月',
            myChart:''
        }
    },
    mounted(){
        let index = this.layer.load();
        let items = localStorage.getItem("searchItems");
        this.http.post("GetTotalSummary",{startDate:this.startDate,endDate:this.endDate,items:items ? JSON.parse(items) : this.items})
        .then(res => {
            this.layer.close(index);
            this.xValues = res.data.data.keys;
            this.values = res.data.data.innerData;
            this.income = res.data.data.totalIncome;
            this.outcome = res.data.data.totalOutcome;
            this.companyOutcome = res.data.data.totalCompanyOutcome;
            this.drawLineByData();
        })
        .catch(err => {            
            this.layer.close(index);
            this.layer.msg("网络错误");
        })
        this.drawLine();
    },
    methods: {
        drawLine(){
            let myChart = echarts.init(document.getElementById('chart'), 'macarons');
            myChart.optionNoImage = null;
            myChart.option = null;
            this.myChart = myChart;
        },
        shareImage(){
            let that = this;
            let index = layer.confirm("请选择是否显示金额保存图片？", { btn: ["显示", "隐藏"] }, function () {
                let image = that.myChart.getDataURL();
                that.saveImageSuccess(image);
            }, function () {
                that.myChart.setOption(that.myChart.optionNoImage);
                let image = that.myChart.getDataURL();
                that.saveImageSuccess(image);
                that.myChart.setOption(that.myChart.option);
            });
            $(".layui-layer-title").remove();
            $(".layui-layer-setwin").remove();
            $(".layui-layer-content").css("font-size","18px").css("padding-right","5px");
            $(".layui-layer-shade").click(function () {
                layer.close(index);
            });            
        },
        saveImageSuccess(img){
                
            layer.msg("图片生成成功！", { time: 600 }, function () {

                var previewImg = layer.open({
                    type: 1,
                    title:"长按保存图片",
                    content:"<img style='width:300px;height:250px;' src='"+ img +"'/>"
                });
                $(".layui-layer-setwin").remove();
                $(".layui-layer-content").css("margin", "0").css("padding", "0");
                $(".layui-layer-shade").click(function () {
                    layer.close(previewImg);
                });
            });
        },
        drawLineByData(){

            let option = {
                tooltip : {
                    trigger: 'axis'
                },
                color: ["#32cd32", "#da70d6", "#ff7f50"],
                xAxis : [
                    {
                        boundaryGap: true,
                        data : this.xValues
                    }
                ],
                grid: {
                    x: 55
                },
                yAxis : {
                    axisLabel: {
                        show: true,
                    }
                },
                series : [
                    {
                        symbol: 'none',
                        type:'line',
                        data:this.values.income
                    },
                    {
                        symbol: 'none',
                        type:'line',
                        data:this.values.outcome
                    },
                    {
                        symbol: 'none',
                        type:'line',
                        data:this.values.companyOutcome
                    }
                ]
            };
            this.myChart.optionNoImage = {
                tooltip: {
                    trigger: 'axis'
                },
                color: ["#32cd32", "#da70d6", "#ff7f50"],
                xAxis: {
                    boundaryGap: true,
                    data: this.xValues
                },
                grid: {
                    x: 55
                },
                yAxis: {
                    axisLabel: { show: false }
                },
                series: [
                    {
                        symbol: 'none',
                        type:'line',
                        data:this.values.income
                    },
                    {
                        symbol: 'none',
                        type:'line',
                        data:this.values.outcome
                    },
                    {
                        symbol: 'none',
                        type:'line',
                        data:this.values.companyOutcome
                    }
                ]
            };
            this.myChart.option = option;
            this.myChart.setOption(option);
        }
    }
  }
</script>


<style scoped>
    *{
        margin:0;
        padding: 0;
    }
    #summary{
        width:100%;
        height: 100%;
        background-color: white;
    }
    .top{
        height: 50px;
        background-color: cadetblue;
    }
    .top>a{
        color: white;
        font-weight: bold;
    }
    .top p{
        display: inline-block;
        line-height: 50px;
        font-size: 18px;
        margin: 0 5px;
    }
    .share{
        color: #7b68ee;
        font-weight: bold;
        font-size: 18px;
        position: absolute;
        right: 20px;
        top:65px;
        text-decoration: none;
    }
    .share:hover{
        cursor: pointer;
    }
    #chart{
        width: 100%;
        height: 280px;
        margin: 0 auto;
    }

    .sum>div{
        float: left;
        width:calc(100%/3);
        font-size: 18px;
    }
    .sum>div>p:nth-child(1){
        font-size: 18px;
        font-weight: bold;
    }
    .sum>div>p:nth-child(2){
        font-size: 15px;
    }
    .sum>div:nth-child(1)>p{
        color: #32cd32;
    }
    .sum>div:nth-child(2)>p{
        color: #da70d6;
    }
    .sum>div:nth-child(3)>p{
        color: #ff7f50;
    }

</style>
