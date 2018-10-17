<template>
    <div id="ratio">
        <h4>{{setting}}缴费比例</h4>

        <div class="item">
            <p>缴费项目</p>
            <p>个人缴费</p>
            <p>单位缴费</p>
            <p>缴费基数</p>
        </div>
        <div class="item">
            <p>养老保险(%)</p>
            <input v-model="retirement" type="number" name="" min="0" placeholder="请输入">
            <input v-model="retirementC" type="number" name="" min="0" placeholder="请输入">
            <input v-model="retirementBase" type="number" name="" min="0" placeholder="请输入">
        </div>
        <div class="item">
            <p>医疗保险(%)</p>
            <input v-model="medical" type="number" name="" min="0" placeholder="请输入">
            <input v-model="medicalC" type="number" name="" min="0" placeholder="请输入">
            <input v-model="medicalBase" type="number" name="" min="0" placeholder="请输入">
        </div>
        <div class="item">
            <p>失业保险(%)</p>
            <input v-model="unemployment" type="number" name="" min="0" placeholder="请输入">
            <input v-model="unemploymentC" type="number" name="" min="0" placeholder="请输入">
            <input v-model="unemploymentBase" type="number" name="" min="0" placeholder="请输入">
        </div>
        <div class="item">
            <p>生育保险(%)</p>
            <input v-model="birth" type="number" name="" min="0" placeholder="请输入">
            <input v-model="birthC" type="number" name="" min="0" placeholder="请输入">
            <input v-model="birthBase" type="number" name="" min="0" placeholder="请输入">
        </div>
        <div class="item">
            <p>工伤保险(%)</p>
            <input v-model="industrialInjury" type="number" name="" min="0" placeholder="请输入">
            <input v-model="industrialInjuryC" type="number" name="" min="0" placeholder="请输入">
            <input v-model="industrialInjuryBase" type="number" name="" min="0" placeholder="请输入">
        </div>
        <div class="item">
            <p>大病医疗(%)</p>
            <input v-model="bigMedical" type="number" name="" min="0" placeholder="请输入">
            <input v-model="bigMedicalC" type="number" name="" min="0" placeholder="请输入">
            <input v-model="bigMedicalBase" type="number" name="" min="0" placeholder="请输入">
        </div>
        <div class="item">
            <p>住房公积(%)</p>
            <input v-model="houseFund" type="number" name="" min="0" placeholder="请输入">
            <input v-model="houseFundC" type="number" name="" min="0" placeholder="请输入">
            <input v-model="houseFundBase" type="number" name="" min="0" placeholder="请输入">
        </div>

        <div class="bottom">
            <a @click="submitClick">提交</a>
        </div>
        
        <tabbar :homeShow="false" :mineSelected="true"></tabbar>
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
            setting:'设置',
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
            retirementBase:0,
            medicalBase:0,
            unemploymentBase:0,
            birthBase:0,
            industrialInjuryBase:0,
            bigMedicalBase:0,
            houseFundBase:0,
        }
    },
    methods:{
        submitClick(){
            let index = this.layer.load();
            this.http.post("UpdateInsuranceRatio",{
                IR_Retirement:this.retirement,
                IR_Medical:this.medical,
                IR_Unemployment:this.unemployment,
                IR_Birth:this.birth,
                IR_IndustrialInjury:this.industrialInjury,
                IR_BigMedical:this.bigMedical,
                IR_HouseFund:this.houseFund,
                IR_RetirementC:this.retirementC,
                IR_MedicalC:this.medicalC,
                IR_UnemploymentC:this.unemploymentC,
                IR_BirthC:this.birthC,
                IR_IndustrialInjuryC:this.industrialInjuryC,
                IR_BigMedicalC:this.bigMedicalC,
                IR_HouseFundC:this.houseFundC,
                IR_RetirementBase:this.retirementBase,
                IR_MedicalBase:this.medicalBase,
                IR_UnemploymentBase:this.unemploymentBase,
                IR_BirthBase:this.birthBase,
                IR_IndustrialInjuryBase:this.industrialInjuryBase,
                IR_BigMedicalBase:this.bigMedicalBase,
                IR_HouseFundBase:this.houseFundBase
            })
            .then(res => {
                this.layer.close(index);
                this.layer.msg(res.data.msg,{time:600},()=>{

                    this.$router.push({name:'mineLink'});
                });
            })
            .catch(err => {
                this.layer.close(index);
                this.layer.msg("网络错误",{time:600});
            })
        }
    },
    created(){
        let index = this.layer.load();
        this.http.post("GetInsuranceRatio")
        .then(res => {
            this.layer.close(index);
            this.retirement = res.data.data.retirement;
            this.medical = res.data.data.medical;
            this.unemployment = res.data.data.unemployment;
            this.birth = res.data.data.birth;
            this.industrialInjury = res.data.data.industrialInjury;
            this.bigMedical = res.data.data.bigMedical;
            this.houseFund = res.data.data.houseFund;
            this.retirementC = res.data.data.retirementC;
            this.medicalC = res.data.data.medicalC;
            this.unemploymentC = res.data.data.unemploymentC;
            this.birthC = res.data.data.birthC;
            this.industrialInjuryC = res.data.data.industrialInjuryC;
            this.bigMedicalC = res.data.data.bigMedicalC;
            this.houseFundC = res.data.data.houseFundC;
            this.retirementBase = res.data.data.retirementBase;
            this.medicalBase = res.data.data.medicalBase;
            this.unemploymentBase = res.data.data.unemploymentBase;
            this.birthBase = res.data.data.birthBase;
            this.industrialInjuryBase = res.data.data.industrialInjuryBase;
            this.bigMedicalBase = res.data.data.bigMedicalBase;
            this.houseFundBase = res.data.data.houseFundBase;
        })
        .catch(err => {
            this.layer.close(index);
            this.layer.msg("网络错误",{time:600});
        });
    }
}
</script>

<style scoped>
    *{
        margin: 0;
        padding: 0;
    }
    #ratio{
        width: 100%;
        min-height: 100%;
        background-color: cadetblue;
    }
    h4{
        color: white;
        text-align: center;
        margin: 10px auto;
        letter-spacing: 5px;
    }

    .item{
        color: white;
    }
    .item>p,.item>input{
        float: left;
    }
    .item>p:nth-child(1){
        width:80px;
        margin: 10px 3px;
        height: 25px;
        line-height: 25px;
    }
    .item>p:nth-child(2),.item>p:nth-child(3),.item>p:nth-child(4),.item>input{
        width:calc((100% - 105px) / 3);
        margin: 10px 3px;
        border-radius: 5px;
        border: none;
        height: 25px;
        line-height: 25px;
        padding-left: 3px;
    }
    .item>input{
        color: #555;
    }
    
    .bottom{
        clear: both;
        height: 60px;
        margin-bottom: 50px;
    }
    .bottom>a{
        text-decoration: none;
        margin-top: 10px;
        display: inline-block;
        width: 90%;
        background: green;
        height: 40px;
        line-height: 40px;
        color: white;
        font-size: 20px;
        border-radius: 5px;
    }

</style>
