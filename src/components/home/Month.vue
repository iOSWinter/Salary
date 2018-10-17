<template>
    <div id="month" :data-id="monthData.id" @click="checkDetail">
        <div>
            <p :class="outStanding">{{monthData.month}}</p>
        </div>
        <div>
            <div>
                <p>{{theoryTitle}}</p>
                <p>{{Number.parseFloat(monthData.theory).toFixed(2)}}</p>
            </div>
            <div>
                <p>{{insuranceTitle}}</p>
                <p>{{Number.parseFloat(monthData.insurance).toFixed(2)}}</p>
            </div>
            <div :class="outStanding">
                <p>{{realTitle}}</p>
                <p>{{Number.parseFloat(monthData.real).toFixed(2)}}</p>
            </div>
            <div>
                <p>{{taxTitle}}</p>
                <p>{{Number.parseFloat(monthData.tax).toFixed(2)}}</p>
            </div>
            <div>
                <p>{{mealTitle}}</p>
                <p>{{Number.parseFloat(monthData.meal).toFixed(2)}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {            
            realTitle:'实发薪资',
            theoryTitle:'应发薪资',
            insuranceTitle:'五险一金',
            taxTitle:'所得税',
            mealTitle:'餐费',
            outStanding:'out-standing'
        }
    },
    props:{
        monthData:{
            type:Object,
            default:{id:'',month:'xxxx年x月',real:0,theory:0,insurance:0,tax:0,meal:0}
        }
    },
    methods:{
        checkDetail(){
            this.$emit("checkDetail",this.monthData.id);
        }
    }
}
</script>

<style scoped>
    #month{
        margin: 10px auto 0 auto;
        background-color: white;
        color: #666;
        font-size: 16px;
    }
    #month>div:nth-child(1){
        text-align: left;
        height: 30px;
        padding-left: 10px;
        border-bottom: 1px solid #ddd;
    }
    #month>div:nth-child(1)>p{
        line-height: 30px;
    }

    .out-standing{
        color: green;
        font-weight: bold;
        font-size: 18px;
    }

    #month>div:nth-last-child(1){
        height: 110px;
    }
    #month>div:nth-last-child(1)>div{
        float: left;
        width: calc(100% / 3);
        height: 50px;
    }
    #month>div:nth-last-child(1)>div>p:nth-child(1){
        padding-top: 10px;
        margin: 0;
    }
</style>
