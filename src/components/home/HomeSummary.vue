<template>
    <div id="home-summary">
        <div class="real">
            <p>{{Number.parseFloat(summary.real).toFixed(2)}}</p>
            <p>{{realTitle}}</p>
        </div>
        <div>
            <div>
                <p>{{Number.parseFloat(summary.theory).toFixed(2)}}</p>
                <p>{{theoryTitle}}</p>
            </div>
            <div>
                <p>{{Number.parseFloat(summary.avg).toFixed(2)}}</p>
                <p>{{avgTitle}}</p>
            </div>
            <div >
                <p>{{Number.parseFloat(summary.insurance).toFixed(2)}}</p>
                <p>{{insuranceTitle}}</p>
            </div>
            <div>
                <p>{{Number.parseFloat(summary.tax).toFixed(2)}}</p>
                <p>{{taxTitle}}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'home-summary',
    data(){
        return {
            realTitle:'最近12个月实际收入',
            theoryTitle:'应发薪资',
            avgTitle:'月均应发',
            insuranceTitle:'五险一金',
            taxTitle:'所得税'
        }
    },
    props:{
        summary:{
            type:Object,
            default:{real:0,theory:0,avg:0,insurance:0,tax:0}
        }
    }    
}
</script>

<style scoped>
    *{
        margin:0;
        padding: 0;
        font-size: 16px;
    }
    #home-summary{
        width: 100%;
        height: 190px;
        background-color: cadetblue;
        color: sandybrown;
    }
    .real{
        padding-top: 15px;
    }
    .real>p{
        font-weight: bold;
        font-size: 16px;
    }
    .real>p:nth-child(1){
        font-size: 34px;
    }
    
    #home-summary>div>div{
        float: left;
        width:50%;
        margin: 5px auto;
    }
    #home-summary>div:nth-child(2){
        color: white;
    }
    #home-summary>div:nth-child(2)>div:nth-last-child(1),#home-summary>div:nth-child(2)>div:nth-last-child(2){
        color: sandybrown;
    }
</style>

