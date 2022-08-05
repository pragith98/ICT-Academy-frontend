<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable max-width="450" persistent>
        <template v-slot:activator="{ on, attrs }">
           <v-btn @click="getClasses()"  :disabled="show<=0" width="200" block class="teal" depressed  v-bind="attrs" v-on="on" color="white--text">Pay<v-icon dark right>mdi-cash-multiple</v-icon></v-btn>
        </template>
        <v-card max-width="450" flat >
            <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Payment</v-card-title>
            
            <v-divider></v-divider>
            <v-card-text >
                <v-form ref="form" v-model="valid" lazy-validation>
                    <div>
                        <v-card-text>This is <strong>student name</strong>'s payment details. You can mark payment for <strong>Arrears/Today fee</strong>. And also you can <strong>change values</strong> before payment.</v-card-text>
                        <template>
                            <div>
                                <div class="pa-5">
                                    <legend> Payment Details </legend>
                                    <v-data-table v-model="table" @input="getSelect($event),getSelectStatus($event)" :headers="headers" :items="payments" show-select item-key="no" dense hide-default-footer>
                                        <template v-slot:[`item.classFee`]="{ item }" >
                                            <v-text-field :rules="amountRules" class="centered-input" suffix=".00"  style="width:70px" v-model="item.fee" dense></v-text-field>
                                        </template>
                                    </v-data-table>
                                </div>
                                <v-divider></v-divider>
                                <v-row class="mt-3">
                                    <v-col class="text-right">
                                        <v-card-text class="text-h6">Amount (Rs.)</v-card-text>
                                    </v-col>
                                    <v-col>
                                        <v-text-field readonly class="centered-input text-h5" v-model="amount" style="width:150px" outlined ></v-text-field>
                                    </v-col>
                                </v-row>
                            </div>
                            
                        </template>
                        
                    </div>
                </v-form>
               
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="grey" @click="dialog = false" outlined>Cancel</v-btn>
                <v-btn :loading="loading"  color="primary" @click="payNow()" depressed width="150" :disabled="!valid || selectedPayments=='' || !selectedPayments">Pay now</v-btn>
            </v-card-actions>
        
        </v-card>
      
    </v-dialog>
  </v-row>
</template>



<script>
    import { loadScript } from "vue-plugin-load-script";
    export default {
        props:['show','studentID'],
        data(){
            return{
                //----------logged User details-----------
                logedUser : JSON.parse(localStorage.getItem('user')),
                //----------logged User details-----------


                loading:false,
                dialog: false,
                valid:true,
                classFee:'',
                amount:0+'.00',

                paySuccessAlert:false,
                
                studentEmail:'',

                table:[],
                headers: [
                    { text: 'DESCRIPTION',align: 'start', sortable: false, value:'description'},
                    { text: 'FEE (Rs.)', sortable: false, value: 'classFee',width:'40%'},
                ],

                payments:[],

                selectedPayments:[],
                selectedPaymentStatus:[],

                amounts:[],

                classes:[],




                // -----------Validation rules-----------
                amountRules: [v=> !!v || 'Amount is required', v => /^\d{0,8}(\.\d{1,4})?$/.test(v) ||'Numbers only' ],
            
            } 
        },
        
        

        methods:{
            getClasses(){
                var studentID = this.studentID
                this.axios.get(this.$apiUrl+"/api/v1.0/EnrollmentManagement/students/"+studentID).then(Response=>{
                    this.classes=Response.data.enrollment.data[0].classes
                })
            },

            getSelect(values) {
                this.selectedPayments = values.map(function(value){ return parseInt(value.fee) })
                this.amount= this.selectedPayments.reduce((a,b)=>a+b,0)+'.00'
            },

            getSelectStatus(values) {
                this.selectedPaymentStatus = values.map(function(value){ return parseInt(value.no) })
            },

            getFees(){
                // ---------empty array----------------
                while(this.payments.length>0){
                    this.payments.pop()
                }
                while(this.selectedPayments.length>0){
                    this.selectedPayments.pop()
                }
                while(this.selectedPaymentStatus.length>0){
                    this.selectedPaymentStatus.pop()
                }
                while(this.table.length>0){
                    this.table.pop()
                }

                const classFeeWithDoubleZero = (this.classDetails.classFee).split('.')

                this.classFee = classFeeWithDoubleZero[0]
                var paymentStatus=this.student.paymentStatus
                var payment
                var i=1
                if(paymentStatus>1){
                    var arrears= paymentStatus-1
                    for(i; i <= arrears; i++){
                        payment={no:i, description:"Arrears",fee:this.classFee}
                        this.payments.push(payment)
                    }
                }

                if(paymentStatus>0){
                    payment={no:i, description:"Today fee",fee:this.classFee}
                    this.payments.push(payment)
                }
                
            },

            payNow(){
                console.log(this.selectedPaymentStatus.length)
                this.loading=true
                this.axios.patch(this.$apiUrl+'/api/v1.0/EnrollmentManagement/students/'+this.student.studentID+'/classes/'+this.classDetails.classID+'/daily',{
                    decrement: this.selectedPaymentStatus.length

                })
                .then(Response=>{
                    if(Response.data.success == true){
                        //------call fee manage function------
                        this.feeManage()
                        
                    }else{
                        this.failedAlert()
                    }
                })
                .catch(error => {
                    this.failedAlert()
                    console.log(error.data)
                    this.loading=false
                });
            },

            successAlert(){
                this.$emit('success',true)
            },

            failedAlert(){
                this.$emit('failed',true)
            },


            feeManage(){
                this.selectedPayments.forEach(Element => {
                    var amounts = {paidAmount:Element+".00"}
                    this.amounts.push(amounts)
                })

                this.axios.post(this.$apiUrl+"/api/v1.0/FeeManagement/students/"+this.student.studentID+"/classes/"+this.classDetails.classID+"/fees",{
                    amounts:this.amounts,
                    date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    handlerStaffID: this.logedUser.employee.employeeID,
                    branchID: this.logedUser.employee.branch.branchID,
                    paymentStatus: this.selectedPaymentStatus.length


                })
                .then(Response=>{
                    
                    if(Response.data.success == true){
                        //call get student function
                        this.getStudent(this.student.studentID)
                        this.loading=false
                        this.successAlert()
                        this.dialog=false
                    }else{
                        this.failedAlert()
                    }
                })
                .catch(error => {
                    this.failedAlert()
                    console.log(error.data)
                    this.loading=false
                    
                });
                   
            },



            getStudent(studentID){
                this.axios.get(this.$apiUrl+"/api/v1.0/StudentManagement/students/"+studentID).then(Response=>{
                    this.studentEmail=Response.data.student.data[0].email

                    //call send recept function
                    this.sendReceipt()
                })
            },

            sendReceipt(){
                loadScript("https://smtpjs.com/v3/smtp.js")
                .then(() => {
                    window.Email && window.Email.send({
                        Host : "smtp.gmail.com",
                        Username : this.$emailAddress,
                        Password : this.$emailPassword,
                        To : this.studentEmail,
                        From : this.$emailAddress,
                        Subject : "Payment Receipt",
                        Body : 
                        `Hello,<br>
                        You got a new message from <b>ICT Academy</b>.<br><br>

                        Your payment for ${this.classDetails.className} class was successful. on ${(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)} <br><br><b>
                        Student ID: ${this.student.studentID}<br>
                        Student Name: ${this.student.studentName}<br><br>

                        Amount: Rs.${(this.selectedPaymentStatus.length)*this.classFee}

                        <i>If any doubt please contact the class immediately</i><br><br>
                        
                        Best wishes,<br>
                        ICT Academy - Hakmana<br>
                        ${this.$tpNo}`

                    }).then(
                        message => console.log(message)
                    );
                }).catch(() => {
                    // Failed to fetch script
                });
            },
        },

        created(){
            //this.getFees()
            
        }

        
    }
</script>


<style scoped>
   

    .centered-input >>> input {
      text-align: center
    }
  
   fieldset{
        border-color: rgb(225, 225, 225);
        border-style: solid;
        border:0.1;
        border-style: solid;
    }


</style>