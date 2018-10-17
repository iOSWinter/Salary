<template>
    <div id="summary-filter">
            <div class="byYear"><input type="checkbox" name="byYear" @click="byYearClick"><p>按自然年汇总</p></div>
            <div class="date">
                <p>日期范围</p>
                <input name="startDate" @click="showLaydate">至<input name="endDate" @click="showLaydate">
            </div>
            <div class="items">
                <div><p>个人收入类别</p></div>                
                <label name="theorySalary" @click="clickLabel" readonly="readonly">应发薪资</label>
                <label name="realSalary" @click="clickLabel">实发薪资</label>
                <label name="increase" @click="clickLabel">加项</label>
                <label name="reward" @click="clickLabel">奖金</label>
            </div>
            <div class="items">
                <div><p>个人缴费类别</p><input @change="checkAll" type="checkbox"></div>
                <label name="mealCost" @click="clickLabel">餐费</label>
                <label name="retirement" @click="clickLabel">养老保险</label>
                <label name="medical" @click="clickLabel">医疗保险</label>
                <label name="unemployment" @click="clickLabel">失业保险</label>
                <label name="birth" @click="clickLabel">生育保险</label>
                <label name="industrialInjury" @click="clickLabel">工伤保险</label>
                <label name="bigMedical" @click="clickLabel">大病医疗</label>
                <label name="houseFund" @click="clickLabel">住房公积金</label>
                <label name="tax" @click="clickLabel">个人所得税</label>
            </div>
            <div class="items">
                <div><p>公司成本类别</p><input type="checkbox" @change="checkAll"></div>
                <label name="theorySalaryC" @click="clickLabel">应发薪资</label>
                <label name="retirementC" @click="clickLabel">养老保险</label>
                <label name="medicalC" @click="clickLabel">医疗保险</label>
                <label name="unemploymentC" @click="clickLabel">失业保险</label>
                <label name="birthC" @click="clickLabel">生育保险</label>
                <label name="industrialInjuryC" @click="clickLabel">工伤保险</label>
                <label name="bigMedicalC" @click="clickLabel">大病医疗</label>
                <label name="houseFundC" @click="clickLabel">住房公积金</label>
            </div>
            <div class="bottom">
                <a @click="goBack">取消</a>
                <a @click="confirm">确定</a>
            </div>

            <tabbar :homeShow="false" :summarySelected="true"></tabbar>

        </div>
</template>

<script>
import laydate from '../../../static/lib/laydate/laydate'
import Tabbar from '../tabbar/Tabbar'

export default {
    components:{
        Tabbar
    },
    data(){
        return {
            items:[]
        }
    },
    methods:{
        showLaydate(){
            laydate.render({
                elem: 'input[name="startDate"]',
                // type: 'month',
                // format: 'yyyy年M月',
                // value: this.startDate,
                // btns: ['clear', 'confirm']
            });
        },
        clickLabel(e){
            let target = e.target;
            let name = target.getAttribute("name");
            let index = this.items.indexOf(name);
            if(index >= 0){
                this.items.splice(index, 1);
                target.setAttribute("class","");
            } else {
                this.items.push(name)
                target.setAttribute("class","checked");
            }
        },
        checkAll(e){
            let target = e.target;
            let children = target.parentNode.parentNode.children;
            for(let i = 0; i < children.length; i++){
                let child = children[i];
                if(child.tagName != "LABEL"){
                    continue;
                }
                let index = this.items.indexOf(child.getAttribute("name"));
                if(target.checked){
                    if(index < 0){
                        child.setAttribute("class", "checked");
                        this.items.push(child.getAttribute("name"));
                    }
                } else {
                    if(index >= 0){
                        child.setAttribute("class", "");
                        this.items.splice(index, 1);
                    }
                }
            }
        },
        goBack(){
            this.$router.go(-1);
        },
        confirm(){
            if(this.items.length <= 0){
                this.layer.msg("没有选择筛选项", {time : 1000});
                return;
            }
            localStorage.setItem("searchItems",JSON.stringify(this.items));
            this.$router.push({name:'summaryLink'});
        },
        byYearClick(e){
            let name = e.target.getAttribute("name");
            let index = this.items.indexOf(name);
            if(index >= 0){
                this.items.splice(index, 1);
            } else {
                this.items.push(name)
            }
        },
        checkAllStatus(){
            let divs = $(".items input[type='checkbox']").parent().parent();
            for(let i = 0; i < divs.length; i++){
                let item = divs[i];
                let labels = $(item).children("label");
                let checkedLabels = $(item).children("label.checked");
                if(labels.length == checkedLabels.length){
                    $(item).children("div").children("input").prop("checked",true);
                }
            }
        }
    },
    mounted(){
        let items = localStorage.getItem("searchItems");
        if(!items){
            items = ["theorySalary","mealCost","retirement","medical","unemployment","birth","industrialInjury","bigMedical","houseFund","tax","theorySalaryC","retirementC","medicalC","unemploymentC","birthC","industrialInjuryC","bigMedicalC","houseFundC"];
        } else {
            items = JSON.parse(items);
        }
        for(let i = 0; i < items.length; i++)
        {
            let item = items[i];
            if(item == 'byYear'){
                $("input[name='byYear']").prop("checked",true);
            } else {
                $("label[name='"+ item +"']").addClass("checked");
            }
        }
        this.items.push(...items);       
        this.checkAllStatus(); 
    }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    #summary-filter{
        background-color: cadetblue;  
        margin-bottom: 40px;
    }
    #summary-filter>.byYear{
        position: absolute;
        top:0;
        right: 0;
        width: 180px;
        text-align: right;
        padding: 5px 10px 0 0;
    }
    #summary-filter>.byYear>input{
        width:20px;
        vertical-align: middle;
    }
    #summary-filter>.byYear>input,#summary-filter>.byYear>p{
        display: inline-block;
        font-size: 16px;
    }
    #summary-filter>.date,#summary-filter>.byYear,#summary-filter>.items{
        padding: 0 10px;
        color: white;
        font-size: 18px;
    }
    #summary-filter>div>p{
        text-align: left;
        padding: 10px 0;
        font-weight: bold;
    }
    #summary-filter>div>input{
        width:40%;
        margin: 0 10px;
        border-radius: 5px;
        border: none;
        height: 30px;
        outline: none;
        padding: 0 5px;
    }
    #summary-filter>.items{
        text-align: left;
    }
    #summary-filter>.items:nth-last-child(3){
        margin-bottom: 100px;
    }
    #summary-filter>.items>div>p{
        margin: 5px 10px 5px 0;
        font-size: 18px;
        font-weight: bold;
        display: inline-block;
        vertical-align: bottom;
    }
    #summary-filter>.items>div>input{
        width: 20px;
        height: 20px;
        font-size: 18px;
    }
    #summary-filter>.items>label{
        background-color: #bbb;
        width: calc((100% - 40px)/3);
        font-size: 15px;
        text-align: center;
        margin: 5px;
        border-radius: 5px;
        height: 30px;
        line-height: 30px;
    }
    #summary-filter>.items>.checked{
        background-color: green;
    }

    #summary-filter>.bottom{
        position: fixed;
        left: 0;
        bottom: 50px;
        height: 40px;
        background-color: #ccc;
        width: 100%;
    }
    #summary-filter>.bottom>a{
        line-height: 40px;
        display: inline-block;
        width: 48%;
        color: green;
        text-decoration: none;
        font-size: 17px;
    }
    #summary-filter>.bottom>a:nth-child(1){
        border-right: 1px solid white;
    }
</style>
