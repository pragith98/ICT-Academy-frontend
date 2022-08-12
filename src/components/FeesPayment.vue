<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>

            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Student delete <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Student delete <strong>successful</strong> </v-snackbar>
            
            
            <template>
                <v-row>
                    <!-- <v-col lg="4" md="6" sm="6" cols="12" width="300">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card class="pb-5">
                                
                                <v-row justify="center" class="px-5 pb-1" dense>
                                    <v-card-title class="blue-grey--text text--darken-2">Class Fees Payment</v-card-title>
                                    <v-col cols="12" md="12" sm="12">
                                        <v-autocomplete :append-icon="null" :items="students" maxlength="11" v-model="studentID" :filter="studentFilter" item-text="studentID" item-value="studentID" label="Student ID" placeholder="ICTAxxxxxxx"  :rules="studentIdRule" clearable></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-card-actions class="px-6">
                                    <app-PaymentClassList  :valid="valid" :studentID="studentID"></app-PaymentClassList>
                                </v-card-actions>
                                
                            </v-card>
                        </v-form>
                    </v-col> -->

                    <v-col lg="4" md="6" sm="6" cols="12" width="300">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card class="pb-5">
                                
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

                    <v-col lg="8" md="6" sm="6" cols="12" width="600">
                        <v-card width="800" height="190" flat class="px-5 pt-15">
                            <v-row>
                                <v-col lg="6" v-for="cardlist in cardlist" :key="cardlist.name">
                                    <v-card flat  :color=cardlist.color dark class="lighten-2">
                                        <v-row>
                                            <v-col>
                                                <v-responsive class="text-left ml-5">
                                                    <v-icon size="80">{{cardlist.icon}}</v-icon>
                                                </v-responsive>
                                            </v-col>
                                            <v-col class="text-right mr-5">
                                                <div class="display-1 font-weight-black" >{{ cardlist.count }}</div>
                                                <div class="title" >{{ cardlist.name }}</div>
                                            </v-col>
                                        </v-row>
                                    </v-card>
                                </v-col>
                            </v-row>
                            
                        </v-card>
                    </v-col>

                    <v-col lg="12">
                        <v-card flat >
                            <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Payment Details</v-card-title>
                            <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details ></v-text-field></v-card-title>
                            <template>
                                <div>
                                    <v-data-table :headers="headers" :items="paymentDetails" :search="search" :sort-by="['feeID']" :sort-desc="true">
                                        <template v-slot:[`item.actions`]="{ item }">
                                            <v-card-actions>
                                                <app-EnrollStudentsDetails @success="removeSuccessAlert($event)" @failed="removeFaileAlert($event)" :classDetails='item'></app-EnrollStudentsDetails>
                                                <v-spacer></v-spacer>
                                                <app-EnrollStudents @success="enrollSuccessAlert($event)" @failed="enrollFaileAlert($event)" class="ml-5" :classDetails='item'></app-EnrollStudents>
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
            <v-snackbar v-model="paymentUnsuccessAlert" :timeout="3000" absolute bottom color="red"><v-icon left>mdi-alert-outline</v-icon>Payment has been <strong>failed</strong></v-snackbar>
            <!-- --------------------------------------------------------alerts-------------------------------------- -->

            
        </v-container>
    </div>
 
</template>


<script>
    
    // import PaymentClassList from './PaymentClassList.vue'
    import PayAllFee from './PayAllFee.vue'

    export default {
        
        components:{
            // 'app-PaymentClassList':PaymentClassList,
            'app-PayAllFee':PayAllFee
        },

        data () {
            return {

                studentID:null,
                classCount:'',

                valid:true,
                menu:false,

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
                    {name:'STUDENTS', count:"", icon:'mdi-account-group', color:'purple lighten-2'},
                    {name:'CLASSES', count:"", icon:'mdi-google-classroom', color:'blue'},
                    
                ],


                // -----------Validation rules-----------
                studentIdRule: [v=> !!v || 'Student ID is required', v=> /ICTA+\d\d\d\d\d\d\d/.test(v) || 'Invalid student ID', v=> (v && v.length ==11)|| 'Invalid student ID'],
            
                paymentSuccessAlert:false,
                
            
            }
        },

        created(){
            this.getStudents()
            this.getStudentCount();
            this.getClassCount();
            this.getPaymentDetails()
        },

        methods: {

            getPaymentDetails(){
                this.axios.get(this.$apiUrl+"/api/v1.0/FeeManagement/fees",{
                params:{
                    date: "2022"
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


            getStudentCount(){
                this.axios.get(this.$apiUrl+"/api/v1.0/StudentManagement/students",{
                params:{
                    status: "Active"
                }
                
                }).then(Response=>(
                    this.studentCount=Response.data.student.meta.student_count,
                   

                    this.cardlist.forEach(element => {
                        if(element.name=="STUDENTS"){
                            element.count=this.studentCount
                        }
                    })
                ))
            },

            getClassCount(){
                this.axios.get(this.$apiUrl+"/api/v1.0/ClassManagement/classes",{
                params:{
                    status: "Active"
                }
                
                }).then(Response=>(
                    this.classCount=Response.data.class.meta.class_count,

                    this.cardlist.forEach(element => {
                        if(element.name=="CLASSES"){
                            element.count=this.classCount
                        }
                    })
                ))
            },


            // deleteAlert(success){
            //     this.successAlert = success;
            // },
            // faileAlert(failed){
            //     this.unsuccessAlert = failed;
            // },

            paymentAlertSuccess(success){
                this.paymentSuccessAlert = success;
            },
        }
    }
</script>
            





            
        
        

