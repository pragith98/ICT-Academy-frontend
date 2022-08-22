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
                            <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Trashed Teacher Advance
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
                                                <app-RestoreTeacherAdvanceTrashed @success="updateSuccessAlert($event)" @failed="updateFaileAlert($event)" :payment='item'></app-RestoreTeacherAdvanceTrashed>
                                                <v-spacer></v-spacer>
                                                <app-DeleteTeacherAdvanceTrashed @success="deleteAlert($event)" @failed="faileAlert($event)" class="ml-5" :payment='item'></app-DeleteTeacherAdvanceTrashed>
                                            </v-card-actions>        
                                        </template>
                                    </v-data-table>
                                </div>
                                
                            </template>
                        </v-card>
                    </v-col>
                </v-row>
                
            </template>
        </v-container>
    </div>
 
    
</template>

<script>

    import DeleteTeacherAdvanceTrashed from './DeleteTeacherAdvanceTrashed.vue'
    import RestoreTeacherAdvanceTrashed from './RestoreTeacherAdvanceTrashed.vue'

    export default {
        components:{
            'app-DeleteTeacherAdvanceTrashed':DeleteTeacherAdvanceTrashed,
            'app-RestoreTeacherAdvanceTrashed':RestoreTeacherAdvanceTrashed
        },
        data () {
            return {
                monthActivePicker: null,
                month: new Date().getFullYear()+"-"+String(new Date().getMonth()+ 1).padStart(2, '0'),
                monthMenu: false,
                search: '',
                
                headers: [
                    { text: 'ID',align: 'start', sortable: false, value:'advanceID'},
                    { text: 'TEACHER', sortable: false, value: 'teacher.teacherName' },
                    { text: 'DESCRIPTION', sortable: false, value: 'description' },
                    { text: 'AMOUNT(Rs.)',sortable: true, value: 'advanceAmount' },
                    { text: 'DELETED AT',sortable: true, value: 'deleted_at' },
                    { text: 'STAFF',sortable: true, value: 'handledBy.staffName' },
                    { value: 'actions', sortable: false,align:'start' },
                ],

                paymentDetails: [],


                paymentSuccessAlert:false,
                successAlert:false,
                unsuccessAlert:false,
                unsuccessAlertUpdate:false,
                successAlertUpdate:false,

            }
        },

        created(){
            this.getPaymentDetails()
        },


        methods: {
            
            getPaymentDetails(){
                this.axios.get(this.$apiUrl+"/api/v1.0/AdvanceManagement/advances/trashed",{
                params:{
                    employeeType:'teacher',
                    date: this.month
                }
                
                }).then(Response=>(
                    this.paymentDetails=Response.data.advance.data
                ))
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
            





            
        
        

