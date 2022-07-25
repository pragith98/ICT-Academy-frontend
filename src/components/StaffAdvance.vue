<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>

            <!----------------------------- Alerts ---------------------------------->

            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon>Item delete <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Item delete <strong>successful</strong> </v-snackbar>

            <v-snackbar :timeout="3000" v-model="unsuccessAlertPayment" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon>Payment <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlertPayment" color="green"  bottom><v-icon left>mdi-check</v-icon>Payment <strong>successful</strong> </v-snackbar>
            
            <v-snackbar :timeout="3000" v-model="unsuccessAlertUpdate" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon>Payment update <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlertUpdate" color="green"  bottom><v-icon left>mdi-check</v-icon>Payment update <strong>successful</strong> </v-snackbar>
            <!----------------------------- Alerts ---------------------------------->
            

            <template>
                <v-row style="padding:12px">
                    <v-col lg="4" md="6" sm="6" cols="12" max-width="700">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card class="pb-5">
                                
                                <v-row justify="center" class="px-5 pb-1" dense>
                                    
                                    <v-card-title class="blue-grey--text text--darken-2">Pay Advance</v-card-title>

                                    <v-col cols="12" md="12" sm="12">
                                        <v-autocomplete :items="staffs" v-model="staff" :filter="staffFilter" item-text="firstName" item-value="staffID" label="Staff member"  :rules="staffRules"></v-autocomplete>
                                    </v-col>
                                    
                                    <v-col cols="12" md="12" sm="12">
                                        <v-text-field v-model="amount" :rules="amountRules" clearable  label="Amount" prefix="RS."></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="12" sm="12">
                                        <v-textarea v-model="description" :rules="descriptionRules" rows="2"  label="Description"></v-textarea>
                                    </v-col>

                                    <v-col cols="12" md="12" sm="12">
                                        <template>
                                            <div >
                                                <v-menu ref="menud" v-model="dateMenu" :close-on-content-click="true" transition="scale-transition" offset-y min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="date" label="Date" readonly v-bind="attrs" v-on="on" :rules="dateRules"></v-text-field>
                                                    </template>
                                                    <v-date-picker v-model="date" :active-picker.sync="dateActivePicker" :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" min="1950-01-01"></v-date-picker>
                                                </v-menu>
                                            </div>
                                        </template>
                                    </v-col>
                                
                                    
                                
                                </v-row>

                                <v-card-actions class="px-6">
                                    <v-btn depressed color="primary" block :disabled="!valid || !description || !amount || !staff || !date" @click="dialog=true">Pay</v-btn>
                                </v-card-actions>
                                
                            </v-card>
                        </v-form>
                    </v-col>

                    <v-col>
                        <v-card  flat>
                            <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Staff Advance
                                <v-spacer></v-spacer>
                                <v-menu ref="menud" v-model="monthMenu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="month" label="Date"  readonly v-bind="attrs" v-on="on" hint="*Select Month to search for a previous month's Details" persistent-hint  single-line></v-text-field>
                                    </template>
                                    <v-date-picker v-model="month" type="month" @input="monthMenu = false, getStaffAdvance()" ></v-date-picker>
                                </v-menu>
                            </v-card-title>

                            <v-card-title><v-spacer></v-spacer><v-text-field v-model="Search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                            
                            <v-data-table :headers="headers" :items="staffAdvance" :search="Search" :items-per-page="5">
                                <template v-slot:[`item.actions`]="{ item }">
                                    <v-card-actions>
                                        <app-EditPayStaffAdvance :advance="item" @success="updateSuccessAlert($event)" @failed="updateFaileAlert($event)"></app-EditPayStaffAdvance>
                                        <v-spacer></v-spacer>
                                        <app-DeletePayStaffAdvance class="ml-5" :advance="item" @success="deleteAlert($event)" @failed="FaileAlert($event)"></app-DeletePayStaffAdvance>
                                    </v-card-actions>
                                </template>
                            </v-data-table>
                        </v-card>
                    </v-col>
                </v-row>
                
            </template>



            <!----------------------------------- dialog box ------------------------------------------>

            <v-dialog v-model="dialog" persistent max-width="500px">
                <v-card>
                    <v-container class="text-center">
                        <v-card-title>
                            <v-row justify="center">
                                <v-icon size="100" color="orange">mdi-alert-circle-outline</v-icon>
                            </v-row>
                        </v-card-title>
                        <span class="text-h6 text-center"> Confirm Payment</span>
                        <v-card-text>Amount: Rs. {{amount}} <br>Description: {{description}} <br>Date: {{date}} </v-card-text>
                        
                    </v-container>
                    
                    
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey"  outlined @click="dialog = false" >Cancel</v-btn>
                        <v-btn :loading="loading" @click="payAdvance()" color="orange" dark depressed>Confirm</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!----------------------------------- dialog box ------------------------------------------>

            
            
        </v-container>
    </div>
 
    
</template>

<script>
    import EditPayStaffAdvance from './EditPayStaffAdvance.vue'
    import DeletePayStaffAdvance from './DeletePayStaffAdvance.vue'
    export default {
        components:{
            "app-EditPayStaffAdvance":EditPayStaffAdvance,
            "app-DeletePayStaffAdvance":DeletePayStaffAdvance
        },
        data () {
            return {
                dialog:false,
                loading:false,
                valid:true,
                Search: '',
                staff:null,

                dateActivePicker: null,
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                dateMenu: false,

                monthActivePicker: null,
                month: new Date().getFullYear()+"-"+String(new Date().getMonth()+ 1).padStart(2, '0'),
                monthMenu: false,

                amount:'0',
                description:'',

                

                

                headers: [
                    { text: 'ID',align: 'start', sortable: false, value:'advanceID'},
                    { text: 'NAME',align: 'start', sortable: false, value:'staff.staffName'},
                    { text: 'DATE', sortable: false, value: 'date' },
                    { text: 'ADVANCE', sortable: false, value: 'advanceAmount' },
                    { text: 'DESCRIPTION', sortable: false, value: 'description' },
                    { text: 'STAFF', sortable: false, value: 'handledBy.staffName'},
                    { text: '', sortable: false, value: 'actions' },
                ],

                staffs: [],

                staffAdvance: [],

                breadcrumbs: [
                    { text: 'Financial', disabled: false, href: '/Financial' },
                    { text: 'Staff Advance', disabled: true, href: '/Financial/StaffAdvance' }
                ],

                index:0,



                // -----------Validation rules-----------
                descriptionRules: [v=> !!v || 'Description is required', v=> (v && v.length >5)|| 'Description must be greater than 5'],
            
                amountRules: [v=> !!v || 'Amount is required', v => /^\d+$/.test(v) || 'Must be a number'],

                staffRules: [v=> !!v || 'Staff member is required'],

                dateRules: [v=> !!v || 'Join Date is required'],




                successAlert:false,
                unsuccessAlert:false,

                unsuccessAlertUpdate:false,
                successAlertUpdate:false,

                unsuccessAlertPayment:false,
                successAlertPayment:false,

            }
        },

        created(){
            this.getStaffs()
            this.getStaffAdvance()
        },

        methods: {

            getStaffAdvance(){
                this.axios.get(this.$apiUrl+"/api/v1.0/AdvanceManagement/advances",{
                    params:{
                        employeeType: "staff",
                        date: this.month 
                    }

                }).then(Response=>(
                    this.staffAdvance=Response.data.advance.data
                ))
            },

            staffFilter (item, queryText) {
                const textOne = item.firstName.toLowerCase()
                const textTwo = item.staffID.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1

            },

            payAdvance(){
                if(this.$refs.form.validate()){
                    const LogedUser = JSON.parse(localStorage.getItem('user'));
                    this.loading=true
                    if(this.amount !=0){
                        this.axios.post(this.$apiUrl+"/api/v1.0/AdvanceManagement/advances",{
                            description:this.description,
                            advanceAmount:this.amount+".00",
                            date:this.date,
                            employeeID:this.staff,
                            handlerStaffID: LogedUser.employee.employeeID,
                            branchID: LogedUser.employee.branch.branchID,
                        })
                        .then(Response=>{
                            if(Response.data.success == true){
                                this.Reset();
                                this.dialog=false,
                                this.getStaffAdvance()
                                this.successAlertPayment=true
                                this.loading=false
                            }else{
                                this.unsuccessAlertPayment=true
                                this.loading=false
                            }
                        })
                        .catch(error => {
                            this.unsuccessAlertPayment=true
                            console.log(error.data)
                            this.loading=false
                        });
                    }else{
                        this.unsuccessAlertPayment=true
                        this.loading=false
                    }
                }
            },

            Reset() {
                this.$refs.form.reset()
            },

            getStaffs(){
                this.axios.get(this.$apiUrl+"/api/v1.0/StaffManagement/staffs",{
                params:{
                    status: "Active"
                }
                
                }).then(Response=>(
                    this.staffs=Response.data.staff.data,
                    
                    this.staffs.forEach(element => {
                        element.firstName=element.title+" "+element.firstName+" "+element.lastName
                    })
                    
                ))
            },



            // -------------------- alerts --------------------------------
            deleteAlert(success){
                this.successAlert = success;
                this.getStaffAdvance()
            },
            faileAlert(failed){
                this.unsuccessAlert = failed;
            },
            

            updateSuccessAlert(success){
                this.successAlertUpdate = success;
                this.getStaffAdvance()
            },
            updateFaileAlert(failed){
                this.unsuccessAlertUpdate = failed;
            },
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


            
        
        

