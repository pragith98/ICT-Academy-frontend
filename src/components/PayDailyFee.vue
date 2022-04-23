<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
           <v-btn block class="teal" dark depressed  v-bind="attrs" v-on="on">Pay<v-icon dark right>mdi-cash-multiple</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat >
            <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Payment</v-card-title>
            
            <v-divider></v-divider>
            <v-card-text >
                <v-form ref="form" v-model="valid" lazy-validation >
                    <fieldset class="px-15 py-5 my-3">
                        <legend>Payment Details</legend>
                        <v-simple-table dense>
                            <thead>
                                <tr>
                                    <th class="text-left" colspan="2">
                                        <h2>Class Fee</h2>
                                    </th>
                                    <th class="text-right">
                                        <h2>Rs. {{classFee}}.00</h2> 
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <h3>Day Count</h3>
                                    </td>
                                    <td class="text-right">
                                        <h3>{{dayCount}} x</h3>
                                    </td>
                                    <td class="text-right">
                                        <h3>Rs. {{total}}.00</h3>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <h2>Total</h2>
                                    </td>
                                    <td class="text-right">
                                        <h2></h2>
                                    </td>
                                    <td class="text-right">
                                        <v-divider></v-divider>
                                        <h2>Rs. {{total}}.00</h2>
                                    </td>
                                </tr>
                            </tbody>
                        </v-simple-table>
                    </fieldset>
                    
                    <fieldset class="pa-15">
                        <legend>Pay</legend>
                        <v-row>
                            <v-col>
                                <v-text-field :rules="amountRules" label="Amount (Rs.)" v-model="getTotal"></v-text-field>
                            </v-col>
                            <v-col align-self="center">
                                <v-btn block outlined color="primary" @click="markPaid(getTotal)" :disabled="!valid || !getTotal">Paid</v-btn>
                            </v-col>
                        </v-row>
                    </fieldset>
                </v-form>
            </v-card-text>
            <v-divider></v-divider>




            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn  color="primary" @click="dialog = false" depressed>OK</v-btn>
            </v-card-actions>

            <v-snackbar v-model="paySuccessAlert" :timeout="2000" absolute bottom left color="green">Payment Successful</v-snackbar>
        
        </v-card>
      
    </v-dialog>
  </v-row>
</template>



<script>
    
    export default {
        props:['classID','studentID'],
        data(){
            return{
                
                dialog: false,
                valid:true,

                errormsg:null,
                

                paySuccessAlert:false,
                
                dayCount:null,
                classFee:null,
                total:null,
                
                getTotal:null,




                // -----------Validation rules-----------
                amountRules: [v=> !!v || 'Amount is required', v => /^\d{0,8}(\.\d{1,4})?$/.test(v) ||'Numbers only' ],
            
            } 
        },
        
        

        methods:{
            markPaid(amount){
                if(this.$refs.form.validate()){
                    this.paySuccessAlert=true
                    console.log(this.studentID+" "+this.classID+" "+amount)
                }
                
            }
        },

        created(){
            this.dayCount=2
            this.classFee=350
            this.total=this.dayCount*this.classFee
            this.getTotal=this.total



        }

        
    }
</script>


<style scoped>
    .theme--light.v-data-table > .v-data-table__wrapper > table > thead > tr:last-child > th {
        border-bottom: none;
    }

    .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > td:not(.v-data-table__mobile-row), .theme--light.v-data-table > .v-data-table__wrapper > table > tbody > tr:not(:last-child) > th:not(.v-data-table__mobile-row) {
        border-bottom: none;
    }

    fieldset{
        border-color: rgb(225, 225, 225);
        border-style: solid;
        border:0.1;
        border-style: solid;
    }

    tbody tr:hover{
        background-color: transparent !important;
    }

    

    
    @media only screen and (min-width: 768px) {


        .v-btn:not(.v-btn--round).v-size--default{
            width: 200px !important;
        }
    }
  

</style>