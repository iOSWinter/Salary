<template>
    <div id="add-salary">
        <div class="add">
            <h4>{{add?"新增":"修改"}}记录</h4>
            <div class="item">
                <p>发薪月份</p>
                <input name="SM_YearMonth" type="text" placeholder="请输入发薪年月" v-model="month">
            </div>
        </div>

        <div class="personal">
            <p>个人情况</p>
            <div class="item">
                <p>基本薪资</p>
                <input @change="calcInsurance" v-model="base" min="0" name="SM_Base" type="number" placeholder="请输入基本薪资">
            </div>
            <div class="item">
                <p>加项</p>
                <input @change="calcTax" v-model="increase" min="0" name="SM_Increase" type="number" placeholder="请输入薪资增加项">
            </div>
            <div class="item">
                <p>减项</p>
                <input @change="calcTax" v-model="reduce" min="0" name="SM_Reduce" type="number" placeholder="请输入薪资扣除项">
            </div>
            <div class="item">
                <p>奖金</p>
                <input @change="calcTax" v-model="reward" min="0" name="SM_Reward" type="number" placeholder="请输入奖金金额">
            </div>
            <div class="item">
                <p>餐费</p>
                <input @change="calcReal" v-model="meal" min="0" name="SM_MealCost" type="number" placeholder="请输入餐费费用">
            </div>
            <div class="item">
                <p>养老保险</p>
                <input @change="calcTax" v-model="retirement" min="0" name="IC_Retirement" type="number">
            </div>
            <div class="item">
                <p>医疗保险</p>
                <input @change="calcTax" v-model="medical" min="0" name="IC_Medical" type="number">
            </div>
            <div class="item">
                <p>失业保险</p>
                <input @change="calcTax" v-model="unemployment" min="0" name="IC_Unemployment" type="number">
            </div>
            <div class="item">
                <p>生育保险</p>
                <input @change="calcTax" v-model="birth" min="0" name="IC_Birth" type="number">
            </div>
            <div class="item">
                <p>工伤保险</p>
                <input @change="calcTax" v-model="industrialInjury" min="0" name="IC_IndustrialInjury" type="number">
            </div>
            <div class="item">
                <p>大病医疗</p>
                <input @change="calcTax" v-model="bigMedical" min="0" name="IC_BigMedical" type="number">
            </div>
            <div class="item">
                <p>住房公积金</p>
                <input @change="calcTax" v-model="houseFund" min="0" name="IC_HouseFund" type="number">
            </div>
        </div>

        <div class="company">
            <p>公司情况</p>
            <div class="item">
                <p>公司名称</p><textarea v-model="companyName" placeholder="请输入公司名称" name="SM_CompanyName"></textarea>
            </div>
            <div class="item">
                <p>养老保险</p>
                <input v-model="retirementC" min="0" name="IC_RetirementC" type="number">
            </div>
            <div class="item">
                <p>医疗保险</p>
                <input v-model="medicalC" min="0" name="IC_MedicalC" type="number">
            </div>
            <div class="item">
                <p>失业保险</p>
                <input v-model="unemploymentC" min="0" name="IC_UnemploymentC" type="number">
            </div>
            <div class="item">
                <p>生育保险</p>
                <input v-model="birthC" min="0" name="IC_BirthC" type="number">
            </div>
            <div class="item">
                <p>工伤保险</p>
                <input v-model="industrialInjuryC" min="0" name="IC_IndustrialInjuryC" type="number">
            </div>
            <div class="item">
                <p>大病医疗</p>
                <input v-model="bigMedicalC" min="0" name="IC_BigMedicalC" type="number">
            </div>
            <div class="item">
                <p>住房公积金</p>
                <input v-model="houseFundC" min="0" name="IC_HouseFundC" type="number">
            </div>
        </div>

        <div class="summary">
            <p>综合情况</p>
            <div class="item">
                <p>个人所得税</p>
                <input v-model="tax" min="0" name="SM_PersonalTax" type="number">
            </div>
            <div class="item">
                <p>应发薪资</p>
                <input v-model="theory" name="SM_TheorySalary" disabled="disabled" type="number">
            </div>
            <div class="item">
                <p>实发薪资</p>
                <input v-model="real" name="SM_RealSalary" disabled="disabled" type="number">
            </div>
        </div>

        <div class="bottom"><a @click="submitClick">提交</a></div>
    
        <tabbar :homeShow="false" :homeSelected="true"></tabbar>
    </div>
</template>

<script>
import Tabbar from '../tabbar/Tabbar' 
export default {
    components:{
        Tabbar
    },
    data(){
        return {
            setting:"设置",
            add:true,
            id:'',
            month:'2018年9月',
            base:0,
            increase:0,
            reduce:0,
            reward:0,
            meal:0,
            retirement:0,
            medical:0,
            unemployment:0,
            birth:0,
            industrialInjury:0,
            bigMedical:0,
            houseFund:0,
            companyName:'',
            retirementC:0,
            medicalC:0,
            unemploymentC:0,
            birthC:0,
            industrialInjuryC:0,
            bigMedicalC:0,
            houseFundC:0,
            tax:0,
            theory:0,
            real:0,
            ratio:{
                retirementBase:0,
                medicalBase:0,
                unemploymentBase:0,
                birthBase:0,
                industrialInjuryBase:0,
                bigMedicalBase:0,
                houseFundBase:0,
                retirement:0,
                medical:0,
                unemployment:0,
                birth:0,
                industrialInjury:0,
                bigMedical:0,
                houseFund:0,
                retirementC:0,
                medicalC:0,
                unemploymentC:0,
                birthC:0,
                industrialInjuryC:0,
                bigMedicalC:0,
                houseFundC:0,
            }
        }
    },
    methods:{
        calcInsurance(){
            this.retirement = (this.base < this.ratio.retirementBase ? this.ratio.retirementBase : this.base) * this.ratio.retirement;
            this.medical = (this.base < this.ratio.medicalBase ? this.ratio.medicalBase : this.base) * this.ratio.medical;
            this.unemployment = (this.base < this.ratio.unemploymentBase ? this.ratio.unemploymentBase : this.base) * this.ratio.unemployment;
            this.birth = (this.base < this.ratio.birthBase ? this.ratio.birthBase : this.base) * this.ratio.birth;
            this.industrialInjury = (this.base < this.ratio.industrialInjuryBase ? this.ratio.industrialInjuryBase : this.base) * this.ratio.industrialInjury;
            this.bigMedical = (this.base < this.ratio.bigMedicalBase ? this.ratio.bigMedicalBase : this.base) * this.ratio.bigMedical;
            this.houseFund = (this.base < this.ratio.houseFundBase ? this.ratio.houseFundBase : this.base) * this.ratio.houseFund;


            this.retirementC = (this.base < this.ratio.retirementBase ? this.ratio.retirementBase : this.base) * this.ratio.retirementC;
            this.medicalC = (this.base < this.ratio.medicalBase ? this.ratio.medicalBase : this.base) * this.ratio.medicalC;
            this.unemploymentC = (this.base < this.ratio.unemploymentBase ? this.ratio.unemploymentBase : this.base) * this.ratio.unemploymentC;
            this.birthC = (this.base < this.ratio.birthBase ? this.ratio.birthBase : this.base) * this.ratio.birthC;
            this.industrialInjuryC = (this.base < this.ratio.industrialInjuryBase ? this.ratio.industrialInjuryBase : this.base) * this.ratio.industrialInjuryC;
            this.bigMedicalC = (this.base < this.ratio.bigMedicalBase ? this.ratio.bigMedicalBase : this.base) * this.ratio.bigMedicalC;
            this.houseFundC = (this.base < this.ratio.houseFundBase ? this.ratio.houseFundBase : this.base) * this.ratio.houseFundC;

            this.calcTax();
        },
        calcTax(){

            this.base = Number.isNaN(Number.parseFloat(this.base)) ? 0 : Number.parseFloat(this.base);
            this.increase = Number.isNaN(Number.parseFloat(this.increase)) ? 0 : Number.parseFloat(this.increase);
            this.reduce = Number.isNaN(Number.parseFloat(this.reduce)) ? 0 : Number.parseFloat(this.reduce);
            this.reward = Number.isNaN(Number.parseFloat(this.reward)) ? 0 : Number.parseFloat(this.reward);
            
            Number.isNaN(Number.parseFloat(this.retirement)) ? 0 : Number.parseFloat(this.retirement);
            this.medical = Number.isNaN(Number.parseFloat(this.medical)) ? 0 : Number.parseFloat(this.medical);
            this.unemployment = Number.isNaN(Number.parseFloat(this.unemployment)) ? 0 : Number.parseFloat(this.unemployment);
            this.birth = Number.isNaN(Number.parseFloat(this.birth)) ? 0 : Number.parseFloat(this.birth);
            this.industrialInjury = Number.isNaN(Number.parseFloat(this.industrialInjury)) ? 0 : Number.parseFloat(this.industrialInjury);
            this.bigMedical = Number.isNaN(Number.parseFloat(this.bigMedical)) ? 0 : Number.parseFloat(this.bigMedical);
            this.houseFund = Number.isNaN(Number.parseFloat(this.houseFund)) ? 0 : Number.parseFloat(this.houseFund);

            this.theory = this.base + this.increase - this.reduce + this.reward;
            let temp = this.theory - (this.retirement + this.medical + this.unemployment + this.birth + this.industrialInjury + this.bigMedical + this.houseFund);
            if(this.month > '2018年8月'){
                let waiting = temp - 5000;
                let tax;
                if(waiting > 80000){
                    tax = waiting * 0.45 - 15160;
                } else if(waiting > 55000){
                    tax = waiting * 0.35 - 7160;
                } else if(waiting > 35000){
                    tax = waiting * 0.30 - 4410;
                } else if(waiting > 25000){
                    tax = waiting * 0.25 - 2660;
                } else if(waiting > 12000){
                    tax = waiting * 0.20 - 1410;
                } else if(waiting > 3000){
                    tax = waiting * 0.10 - 210;
                } else if(waiting > 0){
                    tax = waiting * 0.03;
                } else {
                    tax = 0;
                }
                this.tax = tax;
            } else {
                let waiting = temp - 3500;
                let tax;
                if(waiting > 80000){
                    tax = waiting * 0.45 - 13505;
                } else if(waiting > 55000){
                    tax = waiting * 0.35 - 5505;
                } else if(waiting > 35000){
                    tax = waiting * 0.30 - 2755;
                } else if(waiting > 9000){
                    tax = waiting * 0.25 - 1005;
                } else if(waiting > 4500){
                    tax = waiting * 0.20 - 555;
                } else if(waiting > 1500){
                    tax = waiting * 0.10 - 105;
                } else if(waiting > 0){
                    tax = waiting * 0.03;
                } else {
                    tax = 0;
                }
                this.tax = tax;
            }
            this.calcReal();
        },
        calcReal(e){
            
            let temp = this.theory - (this.retirement + this.medical + this.unemployment + this.birth + this.industrialInjury + this.bigMedical + this.houseFund);
            this.real = temp - this.tax - this.meal;            
        },
        submitClick(){
            if(this.month == ''){
                this.layer.msg("发薪年月为空",{time:1000});
                return;
            }
            let index = this.layer.load();
            this.http.post("AddSalaryRecord",{
                SM_Id:this.id,
                SM_YearMonth:this.month,
                SM_Increase:this.increase,
                SM_Reduce:this.reduce,
                SM_Reward:this.reward,
                SM_MealCost:this.meal,
                IC_Retirement:this.retirement,
                IC_Medical:this.medical,
                IC_Unemployment:this.unemployment,
                IC_Birth:this.birth,
                IC_IndustrialInjury:this.industrialInjury,
                IC_BigMedical:this.bigMedical,
                IC_HouseFund:this.houseFund,
                SM_CompanyName:this.companyName,
                IC_RetirementC:this.retirementC,
                IC_MedicalC:this.medicalC,
                IC_UnemploymentC:this.unemploymentC,
                IC_BirthC:this.birthC,
                IC_IndustrialInjuryC:this.industrialInjuryC,
                IC_BigMedicalC:this.bigMedicalC,
                IC_HouseFundC:this.houseFundC,
                SM_PersonalTax:this.tax,
                SM_TheorySalary:this.theory,
                SM_RealSalary:this.real
            })
            .then(res => {
                this.layer.close(index);
                this.layer.msg(res.data.msg,{time:600})
                this.$router.push({name:'homeLink'});
            })
            .catch(err => {
                this.layer.close(index);
                this.layer.msg("网络错误",{time:600});
            })
        },
        getRatio(){
            this.http.post("GetInsuranceRatio")
            .then(res => {
                this.ratio.retirement = res.data.data.retirement / 100;
                this.ratio.medical = res.data.data.medical / 100;
                this.ratio.unemployment = res.data.data.unemployment / 100;
                this.ratio.birth = res.data.data.birth / 100;
                this.ratio.industrialInjury = res.data.data.industrialInjury / 100;
                this.ratio.bigMedical = res.data.data.bigMedical / 100;
                this.ratio.houseFund = res.data.data.houseFund / 100;
                this.ratio.retirementC = res.data.data.retirementC / 100;
                this.ratio.medicalC = res.data.data.medicalC / 100;
                this.ratio.unemploymentC = res.data.data.unemploymentC / 100;
                this.ratio.birthC = res.data.data.birthC / 100;
                this.ratio.industrialInjuryC = res.data.data.industrialInjuryC / 100;
                this.ratio.bigMedicalC = res.data.data.bigMedicalC / 100;
                this.ratio.houseFundC = res.data.data.houseFundC / 100;
                this.ratio.retirementBase = res.data.data.retirementBase;
                this.ratio.medicalBase = res.data.data.medicalBase;
                this.ratio.unemploymentBase = res.data.data.unemploymentBase;
                this.ratio.birthBase = res.data.data.birthBase;
                this.ratio.industrialInjuryBase = res.data.data.industrialInjuryBase;
                this.ratio.bigMedicalBase = res.data.data.bigMedicalBase;
                this.ratio.houseFundBase = res.data.data.houseFundBase;
            })
            .catch(err => {
                this.layer.msg("网络错误",{time:600});
            });
        }
    },
    created(){
        if(this.$route.params.add != undefined){
            this.add = this.$route.params.add;
        }
        if(this.$route.params.id != undefined){
            this.id = this.$route.params.id;
            let index = this.layer.load();
            this.http.post("GetMonthDetail",{id:this.id})
            .then(res => {
                this.layer.close(index);
                this.month = res.data.data.month;
                this.base = res.data.data.baseSalary;
                this.increase = res.data.data.increase;
                this.reduce = res.data.data.reduce;
                this.reward = res.data.data.reward;
                this.meal = res.data.data.meal;
                this.retirement = res.data.data.retirement;
                this.medical = res.data.data.medical;
                this.unemployment = res.data.data.unemployment;
                this.birth = res.data.data.birth;
                this.industrialInjury = res.data.data.industrialInjury;
                this.bigMedical = res.data.data.bigMedical;
                this.houseFund = res.data.data.houseFund;
                this.companyName = res.data.data.company;
                this.retirementC = res.data.data.retirementC;
                this.medicalC = res.data.data.medicalC;
                this.unemploymentC = res.data.data.unemploymentC;
                this.birthC = res.data.data.birthC;
                this.industrialInjuryC = res.data.data.industrialInjuryC;
                this.bigMedicalC = res.data.data.bigMedicalC;
                this.houseFundC = res.data.data.houseFundC;
                this.tax = res.data.data.tax;
                this.theory = res.data.data.theory;
                this.real = res.data.data.real;

            })
            .catch(err => {            
                this.layer.close(index);
                this.layer.msg("网络错误",{time:600});
            })
        }
        this.getRatio();
    }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    #add-salary{
        width: 100%;
        background-color: cadetblue;
    }
    
    .add>h4{
        color: white;
        margin: 20px auto;
    }
    .item>p,.item>input,.item>textarea{
        color: white;
        display: inline-block;
        height: 30px;
        font-size: 16px;
        line-height: 30px;
    }
    .item{
        margin: 10px auto;
    }
    .item>p{
        color: #ddd;
        text-align: left;
        width: 100px;
        padding-left: 5px;
        vertical-align: top;
    }
    .item>input,.item>textarea{
        border: none;
        width: calc(100% - 120px);
        border-radius: 5px;
        color: #555;
        padding: 0 5px;
        height: 30px;
    }

    .personal>p,.company>p,.summary>p{
        text-align: left;
        font-size: 17px;
        color: white;
        padding-left: 15px;
        font-weight: bold;
    }

    .bottom{
        margin-top: 10px;
        height: 60px;
        margin-bottom: 50px;
    }
    .bottom>a{
        text-decoration: none;
        display: inline-block;
        width:calc(100% - 30px);
        line-height: 40px;
        background-color: green;
        color: white;
        font-size: 20px;
        border-radius: 5px;
    }
    input[name="SM_TheorySalary"]{
        color: green;
        font-weight: bold;
        background-color: cadetblue;
    }
    input[name="SM_RealSalary"]{
        color: orchid;
        font-weight: bold;
        background-color: cadetblue;
    }
</style>
