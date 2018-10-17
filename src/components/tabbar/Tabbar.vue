<template>
    <div id="tabbar">
        <div>
            <router-link :class="{selected : summarySelected}" to="/summary">
                <i class="fa fa-spinner"></i>
                <p>{{summaryTitle}}</p>
            </router-link>
        </div>
        <div>
            <router-link class="unnormal" v-show="homeShow" :class="{selected : homeSelected}" to="/addSalary">
                <i class="fa fa-plus-square-o"></i>
            </router-link>
            <router-link v-show="!homeShow" :class="{selected : homeSelected}" to="/home?add=true">
                <i class="fa fa-heart-o"></i>
                <p>{{homeTitle}}</p>
            </router-link>
        </div>
        <div>
            <router-link :class="{selected : mineSelected}" to="/mine">
                <i class="fa fa-user-o"></i>
                <p>{{mineTitle}}</p>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            summaryTitle:'汇总',
            homeTitle:'主页',
            mineTitle:'我的'
        }
    },
    props:{
        homeShow:{
            type:Boolean,
            default:false
        },
        summarySelected:{
            type:Boolean,
            default:false
        },
        homeSelected:{
            type:Boolean,
            default:false
        },
        mineSelected:{
            type:Boolean,
            default:false
        },
    }
}
</script>

<style scoped>
    #tabbar{
        width: 100%;
        height: 50px;
        background-color: white;
        position: fixed;
        left: 0;
        bottom: 0;
        border-top: 1px solid #ccc;
    }
    #tabbar>div{
        width:calc(100% / 3);
        float: left;
        /* font-size: 16px; */
        margin: 5px auto;
    }
    #tabbar>div>a{
        display: block;
        width: 100%;
        height: 100%;
        color: #555;
    }
    #tabbar>div>a>i{
        font-size: 20px;
    }
    #tabbar>div>a.unnormal>i:nth-child(1){
        font-size: 30px; 
        margin-top:5px;
    }

    #tabbar>div>.selected{
        color: green;
    }
    a{
        text-decoration: none;
    }
</style>
