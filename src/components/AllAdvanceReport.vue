<template>
    <div>

        
        <v-container>

            <!----------------------------- Alerts ---------------------------------->

            <v-snackbar v-model="paymentSuccessAlert" :timeout="3000" absolute bottom color="green"><v-icon left>mdi-check</v-icon>Payment has been <strong>successfully</strong> </v-snackbar>
            
            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon>Item delete <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Item delete <strong>successful</strong> </v-snackbar>
            
            <v-snackbar :timeout="3000" v-model="unsuccessAlertUpdate" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon>Payment restore <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlertUpdate" color="green"  bottom><v-icon left>mdi-check</v-icon>Payment restore <strong>successful</strong> </v-snackbar>

            <!----------------------------- Alerts ---------------------------------->
            

            <template>
                <v-row>
                    <v-col>
                        
                         
                        <v-card flat >
                            
                            <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">All Advance Report
                                <v-spacer></v-spacer>
                                <v-menu ref="menud" v-model="monthMenu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="month" label="Date"  readonly v-bind="attrs" v-on="on" hint="*Select Month to search for a previous month's Details" persistent-hint  single-line></v-text-field>
                                    </template>
                                    <v-date-picker v-model="month" type="month" @input="monthMenu = false, getReports()" :max="new Date().getFullYear()+'-'+String(new Date().getMonth()+ 1).padStart(2, '0')"></v-date-picker>
                                </v-menu>
                            </v-card-title>

                            <v-card-title>
                                <v-spacer></v-spacer><v-btn depressed color="primary">Download</v-btn>
                            </v-card-title>
                            
                            <template>
                                <div class="mt-5">
                                    <v-data-table :headers="headers" :items="reportDetails" :sort-desc="true" :items-per-page=10>
                                    </v-data-table>
                                </div>
                            </template>
                            <v-divider></v-divider>
                            <v-row>
                                
                                <v-col lg="12" md="12" sm="12" cols="12" class="text-right">
                                    <v-card-text>
                                        Total: <strong>Rs.{{meta.total}}</strong> <br>
                                        Date: <strong>{{meta.date}}</strong> <br>
                                    </v-card-text>
                                </v-col>
                                
                            </v-row>
                        </v-card>
                    </v-col>
                </v-row>
                
            </template>
        </v-container>
    </div>
 
    
</template>

<script>


    export default {

        data () {
            return {
                monthActivePicker: null,
                month: new Date().getFullYear()+"-"+String(new Date().getMonth()+ 1).padStart(2, '0'),
                monthMenu: false,
               
                
                headers: [
                    { text: 'NO.',align: 'start', sortable: false, value:'no'},
                    { text: 'DESCRIPTION', sortable: false, value: 'description' },
                    { text: 'AMOUNT(Rs.)', sortable: false, value: 'advanceAmount' },
                    { text: 'DATE',sortable: false, value: 'date' },
                    { text: 'PAYMENT RECEIVER',sortable: false,align: 'end', value: 'employee' },
                ],

                reportDetails: [],
                meta:[],

                paymentSuccessAlert:false,
                successAlert:false,
                unsuccessAlert:false,
                unsuccessAlertUpdate:false,
                successAlertUpdate:false,

            }
        },

        created(){
            this.getReports()
        },


        methods: {
            
            getReports(){
                var no = 1
                this.axios.get(this.$apiUrl+"/api/v1.0/AdvanceReporting/advances",{
                params:{
                    date: this.month
                }
                }).then(Response=>{
                    this.reportDetails=Response.data.advances,
                    this.meta=Response.data.meta,
                    
                    this.reportDetails.forEach(Element=>{
                        if(Element.teacher){
                            Element.employee = Element.teacher.teacherName
                        }else if(Element.staff){
                            Element.employee = Element.staff.staffName
                        }
                        Element.no = no++
                    })
                })
            },

            deleteAlert(success){
                this.getPaymentDetails();
                this.successAlert = success;
            },
            faileAlert(failed){
                this.unsuccessAlert = failed;
            },

            paymentAlertSuccess(success){
                this.todayCollection()
                this.getPaymentDetails();
                this.paymentSuccessAlert = success;
            },

            updateSuccessAlert(success){
                this.successAlertUpdate = success;
                this.getPaymentDetails();
            },
            updateFaileAlert(failed){
                this.unsuccessAlertUpdate = failed;
            },

            
        }
    }
</script>
            





            
        
        

