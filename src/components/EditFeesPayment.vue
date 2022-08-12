<template>
  <v-row >
    <v-dialog v-model="dialog" scrollable max-width="500px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn small @click="getPaymentDetails()" class="teal" dark depressed  v-bind="attrs" v-on="on">Edit<v-icon dark right>mdi-pencil</v-icon></v-btn>
        </template>

        <v-form ref="form" v-model="valid" lazy-validation>
            <v-card max-width="700" flat>
                <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Edit Fees Payment</v-card-title>
                
                <v-divider></v-divider>
                
                <v-card-text >

                    <v-col cols="12" md="12" sm="12">
                        <v-card-text>Student: <strong>{{paymentDetails.studentName}}</strong><br>
                        Class: <strong>{{paymentDetails.className}}</strong><br>
                        Date: <strong>{{paymentDetails.date}}</strong></v-card-text>
                    </v-col>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-col cols="12" md="12" sm="12">
                            <v-text-field v-model="amount" :rules="amountRules" clearable  label="Amount" prefix="RS."></v-text-field>
                        </v-col>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>




                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn   @click="dialog=false" outlined color="grey" >Cancel</v-btn>
                    <v-btn :loading="loading" :disabled="!valid || !amount" color="primary" @click="updatePayment()" depressed >Save
                        <v-icon left>mdi-content-save</v-icon>
                    </v-btn>
                </v-card-actions>

                
            </v-card>
        </v-form>
    </v-dialog>
  </v-row>
</template>



<script>
    
    export default {
        props:['payment'],
        
        data () {
            return {
                dialog:false,
                loading:false,
                valid:true,

                paymentDetails:[],
                
                amount:'',




                // -----------Validation rules-----------
                amountRules: [v=> !!v || 'Amount is required', v => /^\d+$/.test(v) || 'Must be a number'],

            }
        },


        methods: {
            getPaymentDetails(){
                var fullAmount
                var amount
                this.axios.get(this.$apiUrl+"/api/v1.0/FeeManagement/fees/"+this.payment.feeID).then(Response=>{
                    this.paymentDetails=Response.data.fee,
                    
                    fullAmount = (Response.data.fee.paidAmount).split('.'),
                    amount=fullAmount[0],
                    this.amount=amount
                })
                
            },


            updatePayment(){
                if(this.$refs.form.validate()){
                    const LogedUser = JSON.parse(localStorage.getItem('user'));
                    this.loading=true
                    this.axios.patch(this.$apiUrl+'/api/v1.0/FeeManagement/fees/'+this.payment.feeID,{
                        studentID:this.paymentDetails.studentID,
                        paidAmount:this.amount+".00",
                        classID:this.paymentDetails.classID,
                        paidStatus:this.paymentDetails.paidStatus,
                        date:this.paymentDetails.date,
                        handlerStaffID: LogedUser.employee.employeeID,
                        branchID: LogedUser.employee.branch.branchID,
                    })
                    .then(Response=>{
                        if(Response.data.success == true){
                            this.successAlert(),
                            this.dialog=false
                            this.loading=false
                        }else{
                            this.failedAlert()
                        }
                    })
                    .catch(error => {
                        this.failedAlert(),
                        console.log(error.data)
                        this.loading=false
                    });
                }
                
            },

            Reset() {
                this.$refs.form.reset()
            },


            successAlert(){
                this.$emit('success',true)
            },

            failedAlert(){
                this.$emit('failed',true)
            }



            
           
        }
    }
</script>
            


<style scoped>
 fieldset{
    border-color: rgb(225, 225, 225);
    border-style: solid;
    border:0.1;
    border-style: solid;
 }

</style>