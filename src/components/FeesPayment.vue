<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>

        
            
            <template>
                <v-row>

                    <v-col lg="4" md="6" sm="6" cols="12" width="300">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card class="pb-5" height="255">
                                
                                <v-row justify="center" class="px-5 pb-1" dense>
                                    <v-card-title class="blue-grey--text text--darken-2">All Fees Payment</v-card-title>
                                    <v-col cols="12" md="12" sm="12">
                                        <v-autocomplete :append-icon="null" :items="students" maxlength="11" v-model="studentID" :filter="studentFilter" item-text="studentID" item-value="studentID" label="Student ID" placeholder="ICTAxxxxxxx"  :rules="studentIdRule" clearable></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-card-actions class="px-6">
                                    <app-PayAllFee @success="paymentAlertSuccess($event)"  :show="studentID" :studentID="studentID"></app-PayAllFee>
                                </v-card-actions>
                                
                            </v-card>
                        </v-form>
                    </v-col>

                    <v-col lg="8" md="4" sm="4" cols="12" width="600">
                        <v-card flat>
                            <v-card-title class="blue-grey--text text--darken-2">Today Collection</v-card-title>
                            <v-card width="800" height="190" flat class="px-5 pt-2">
                                <v-row>
                                    <v-col lg="4" md="4" sm="4" v-for="cardlist in cardlist" :key="cardlist.name">
                                        <v-card flat  :color=cardlist.color dark class="lighten-2">
                                            <v-row>
                                                <v-col>
                                                    <v-responsive class="text-left ml-5">
                                                        <v-icon size="40">{{cardlist.icon}}</v-icon>
                                                    </v-responsive>
                                                </v-col>
                                            </v-row>
                                            <v-row>
                                                <v-col class="text-right mr-5">
                                                    <div class="display-1 font-weight-black" >{{ cardlist.count }}</div>
                                                    <div class="title" >{{ cardlist.name }}</div>
                                                </v-col>
                                            </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-card>
                        
                    </v-col>

                    <v-col lg="12">
                        <v-card flat >
                            <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Payment Details
                                <v-spacer></v-spacer>
                                <v-menu ref="menud" v-model="monthMenu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="month" label="Date"  readonly v-bind="attrs" v-on="on" hint="*Select Month to search for a previous month's Details" persistent-hint  single-line></v-text-field>
                                    </template>
                                    <v-date-picker v-model="month" type="month" @input="monthMenu = false, getPaymentDetails()" :max="new Date().getFullYear()+'-'+String(new Date().getMonth()+ 1).padStart(2, '0')"></v-date-picker>
                                </v-menu>
                            </v-card-title>
                            <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details ></v-text-field></v-card-title>
                            <template>
                                <div>
                                    <v-data-table :headers="headers" :items="paymentDetails" :search="search" :sort-by="['feeID']" :sort-desc="true">
                                        <template v-slot:[`item.actions`]="{ item }">
                                            <v-card-actions>
                                                <app-EditFeesPayment @success="updateSuccessAlert($event)" @failed="updateFaileAlert($event)" :payment='item'></app-EditFeesPayment>
                                                <v-spacer></v-spacer>
                                                <app-DeletePaymentDetails @success="deleteAlert($event)" @failed="faileAlert($event)" class="ml-5" :payment='item'></app-DeletePaymentDetails>
                                            </v-card-actions>        
                                        </template>
                                    </v-data-table>
                                </div>
                                
                            </template>
                        </v-card>
                    </v-col>

                </v-row>
            </template>

            <!-- --------------------------------------------------------alerts-------------------------------------- -->
            <v-snackbar v-model="paymentSuccessAlert" :timeout="3000" absolute bottom color="green"><v-icon left>mdi-check</v-icon>Payment has been <strong>successfully</strong> </v-snackbar>
            
            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon>Item delete <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Item delete <strong>successful</strong> </v-snackbar>
            
            <v-snackbar :timeout="3000" v-model="unsuccessAlertUpdate" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon>Payment update <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlertUpdate" color="green"  bottom><v-icon left>mdi-check</v-icon>Payment update <strong>successful</strong> </v-snackbar>
            
            <!-- --------------------------------------------------------alerts-------------------------------------- -->

            
        </v-container>
    </div>
 
</template>


<script>
    
    
    import PayAllFee from './PayAllFee.vue'
    import DeletePaymentDetails from './DeletePaymentDetails.vue'
    import EditFeesPayment from './EditFeesPayment.vue'

    export default {
        
        components:{
            'app-PayAllFee':PayAllFee,
            'app-DeletePaymentDetails':DeletePaymentDetails,
            'app-EditFeesPayment':EditFeesPayment
        },

        data () {
            return {

                studentID:null,

                valid:true,
                menu:false,

                monthActivePicker: null,
                month: new Date().getFullYear()+"-"+String(new Date().getMonth()+ 1).padStart(2, '0'),
                monthMenu: false,

                search: '',
                headers: [
                    { text: 'ID',align: 'start', sortable: false, value:'feeID'},
                    { text: 'STUDENT', sortable: false, value: 'studentName' },
                    { text: 'CLASS', sortable: false, value: 'className' },
                    { text: 'AMOUNT(Rs.)',sortable: true, value: 'paidAmount' },
                    { text: 'DATE',sortable: true, value: 'date' },
                    { text: 'STAFF',sortable: true, value: 'handledBy.staffName' },
                    { value: 'actions', sortable: false,align:'start' },
                ],

                paymentDetails: [],

                breadcrumbs: [
                    { text: 'Financial', disabled: false, href: '/Financial' },
                    { text: 'Fees Payment', disabled: true, href: '/Financial/FeesPayment' }
                ],

                

                students:[],
                

                cardlist:[
                    {name:'ARREARS', count:"", icon:'mdi-cash-clock', color:'purple lighten-2'},
                    {name:'COLLECTION', count:"", icon:'mdi-cash-multiple', color:'blue'},
                    {name:'TOTAL', count:"", icon:'mdi-cash-register', color:'red'},
                    
                ],


                // -----------Validation rules-----------
                studentIdRule: [v=> !!v || 'Student ID is required', v=> /ICTA+\d\d\d\d\d\d\d/.test(v) || 'Invalid student ID', v=> (v && v.length ==11)|| 'Invalid student ID'],
            
                paymentSuccessAlert:false,
                successAlert:false,
                unsuccessAlert:false,
                unsuccessAlertUpdate:false,
                successAlertUpdate:false,
                
            
            }
        },

        created(){
            this.getStudents()
            this.getPaymentDetails()
            this.todayCollection()
        },

        methods: {

            todayCollection(){
                this.axios.get(this.$apiUrl+"/api/v1.0/FeeManagement/fees/todayCollection").then(Response=>(

                    this.cardlist.forEach(element => {
                        if(element.name=="ARREARS"){
                            element.count=Response.data.arrears
                        }
                    }),

                    this.cardlist.forEach(element => {
                        if(element.name=="COLLECTION"){
                            element.count=Response.data.collection
                        }
                    }),

                    this.cardlist.forEach(element => {
                        if(element.name=="TOTAL"){
                            element.count=Response.data.total
                        }
                    })
                ))
            },

            getPaymentDetails(){
                this.axios.get(this.$apiUrl+"/api/v1.0/FeeManagement/fees",{
                params:{
                    date: this.month
                }
                
                }).then(Response=>(
                    this.paymentDetails=Response.data.fee.data
                ))
            },

            getStudents(){
                this.axios.get(this.$apiUrl+"/api/v1.0/StudentManagement/students",{
                params:{
                    status: "Active"
                }
                
                }).then(Response=>(
                    this.students=Response.data.student.data
                ))
            },

            studentFilter (item, queryText) {
                const textOne= item.studentID.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1 
            },


            


            deleteAlert(success){
                this.getPaymentDetails();
                this.todayCollection()
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
                this.todayCollection()
                this.successAlertUpdate = success;
                this.getPaymentDetails();
            },
            updateFaileAlert(failed){
                this.unsuccessAlertUpdate = failed;
            },
        }
    }
</script>
            





            
        
        

