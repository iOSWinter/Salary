import Vue from 'vue'
import Router from 'vue-router'
import http from '../http/index'
import layer from 'layui-layer'

import TransferAnimation from '../components/lib/TransferAnimation'

import Login from '../components/login/Login'
import Home from '../components/home/Home'
import AddSalary from '../components/home/AddSalary'
import InsuranceRatio from '../components/home/InsuranceRatio'
import Summary from '../components/summary/Summary'
import SummaryFilter from '../components/summary/SummaryFilter'
import Mine from '../components/mine/Mine'
import Ratio from '../components/mine/Ratio'
import Admin from '../components/mine/Admin'

Vue.config.devtools = true;
Vue.use(Router)
Vue.prototype.http = http;
Vue.prototype.layer = layer

let router = new Router({
  routes: [
    {
      path:'/transfer',
      name:'transfer',
      component:TransferAnimation,
      children:[
        {
          path: '/login',
          name: 'loginLink',
          component: Login
        },
        {
          path:'/home',
          name:'homeLink',
          component:Home
        },
        {
          path:'/addsalary',
          name:'addsalaryLink',
          component:AddSalary
        },
        {
          path:'/insuranceratio',
          name:'insuranceratioLink',
          component:InsuranceRatio
        },
        {
          path:'/summary',
          name:'summaryLink',
          component:Summary
        },
        {
          path:'/summaryfilter',
          name:'summaryfilterLink',
          component:SummaryFilter
        },
        {
          path:'/mine',
          name:'mineLink',
          component:Mine
        },
        {
          path:'/ratio',
          name:'ratioLink',
          component:Ratio
        },
        {
          path:'/admin',
          name:'adminLink',
          component:Admin
        }
      ]},
    {path:'*',redirect:'/home'},
  ],
  mode:'history'
});

router.beforeEach((to, from, next)=>{
  if(to.name == 'loginLink'){
    next();
  } else{
    if(localStorage.getItem("SalaryUserToken")){
      next();
    } else {
      localStorage.removeItem("SalaryUserToken");
      next({name:'loginLink'});
    }
  }
});

export default router
