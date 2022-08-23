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
                            
                            <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Employee Advance Report
                                <v-spacer></v-spacer>
                                <v-menu ref="menud" v-model="monthMenu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="month" label="Date"  readonly v-bind="attrs" v-on="on" hint="*Select Month to search for a previous month's Details" persistent-hint  single-line></v-text-field>
                                    </template>
                                    <v-date-picker v-model="month" type="month" @input="monthMenu = false, getReports()" :max="new Date().getFullYear()+'-'+String(new Date().getMonth()+ 1).padStart(2, '0')"></v-date-picker>
                                </v-menu>
                            </v-card-title>

                            <v-card-title>
                                <v-select style="width:10px;" :items="employeeTypes" v-model="employeeType" outlined dense class="mr-5"></v-select>
                                
                                <v-autocomplete style="width:10px;"  outlined dense v-if="employeeType=='Teacher'" item-value="teacherID" item-text="teacherID" @change="getReports()" :items="teachers" v-model="employee" :filter="teacherFilter" label="Teacher" :rules="teacherRules"></v-autocomplete>
                                <v-autocomplete style="width:10px;" outlined dense v-else-if="employeeType=='Staff'" item-value="staffID" item-text="staffID" @change="getReports()" :items="staffs" v-model="employee" :filter="staffFilter" label="Staff" :rules="staffRules"></v-autocomplete>
                                
                                <v-spacer></v-spacer>
                                <v-btn @click="generatePDF()" depressed color="primary">PRINT <v-icon right>mdi-printer</v-icon></v-btn>
                            </v-card-title>
                            <v-card-text>
                                
                            </v-card-text>
                            <template>
                                <div class="mt-5">
                                    <v-data-table id="my-table" :headers="headers" :items="reportDetails" :sort-desc="true" :items-per-page=10>
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
    import { jsPDF } from "jspdf";
    import autoTable from 'jspdf-autotable';

    export default {

        data () {
            return {
                
                monthActivePicker: null,
                month: new Date().getFullYear()+"-"+String(new Date().getMonth()+ 1).padStart(2, '0'),
                monthMenu: false,
               
                employeeTypes:["Teacher","Staff"],
                employeeType:'Teacher',

                employeeDetails:[],

                staffs:[],
                employee:'',
                teachers:[],
                

                headers: [
                    { text: 'NO.',align: 'start', sortable: false, value:'no'},
                    { text: 'DESCRIPTION', sortable: false, value: 'description' },
                    { text: 'AMOUNT(Rs.)', sortable: false, value: 'advanceAmount' },
                    { text: 'DATE',sortable: false, value: 'date' },
                ],

                reportDetails: [],
                meta:[],
                branch:[],

                paymentSuccessAlert:false,
                successAlert:false,
                unsuccessAlert:false,
                unsuccessAlertUpdate:false,
                successAlertUpdate:false,


                // -----------Validation rules-----------
                teacherRules: [v=> !!v || 'Teacher ID is required'],
                staffRules: [v=> !!v || 'Staff ID is required'],

            }
        },

        created(){
            
            this.getAllTeachers(),
            this.getAllStaff()
        },

        

        methods: {
            teacherFilter (item, queryText) {
                const textOne = item.teacherID.toLowerCase()
                const searchText = queryText.toLowerCase()
                return textOne.indexOf(searchText) > -1
            },

            getAllTeachers(){
                this.axios.get(this.$apiUrl+"/api/v1.0/TeacherManagement/teachers/",{
                    params:{
                        status:'Active'
                    }
                }).then(Response=>(
                    this.teachers= Response.data.teacher.data
                ))
                
            },

            staffFilter (item, queryText) {
                const textOne = item.staffID.toLowerCase()
                const searchText = queryText.toLowerCase()
                return textOne.indexOf(searchText) > -1
            },

            getAllStaff(){
                this.axios.get(this.$apiUrl+"/api/v1.0/StaffManagement/staffs/",{
                    params:{
                        status:'Active'
                    }
                }).then(Response=>(
                    this.staffs= Response.data.staff.data
                ))
                
            },


            generatePDF(){
                const doc = new jsPDF();

                autoTable(doc, {
                    body: [
                        [
                        {
                            content: 'ICT ACADEMY',
                            styles: {
                            halign: 'left',
                            fontSize: 20,
                            textColor: '#ffffff'
                            }
                        },
                        {
                            content: 'Report',
                            styles: {
                            halign: 'right',
                            fontSize: 20,
                            textColor: '#ffffff'
                            }
                        }
                        ],
                    ],
                    theme: 'plain',
                    styles: {
                        fillColor: '#3366ff'
                    }
                });

                autoTable(doc, {
                    body: [
                        [   
                            {
                                content: 'Date: '+this.meta.date
                                +'\nPrinted by: '+this.meta.printedBy
                                +'\nPrinted date: '+this.meta.printedDate
                                +'\nBranch: '+this.branch.branchName,
                                styles: {
                                halign: 'left'
                                }
                            },
                            {
                                content: 'ICT Academy,'
                                +'\nHakmana - Sri Lanka,'
                                +'\n076 9198533',
                                styles: {
                                halign: 'right'
                                }
                            }
                        ],
                    ],
                    theme: 'plain'
                });


                autoTable(doc, {
                    body: [
                        [
                        {
                            content: 'Payment Receiver:'
                            +'\nName: '+this.employeeDetails.lastName
                            +'\nEmployee Type: '+this.employeeType,
                            styles: {
                            halign: 'left'
                            }
                        },
                        
                        ],
                    ],
                    theme: 'plain'
                });
                
                autoTable(doc, {
                    body: [
                        [
                        {
                            content: 'Advance Details Report - Employee',
                            styles: {
                            halign:'left',
                            fontSize: 14
                            }
                        }
                        ]
                    ],
                    theme: 'plain'
                });

                autoTable(doc, {
                    columns: [
                        { header: 'NO.', dataKey: 'no' },
                        { header: 'DESCRIPTION', dataKey: 'description' },
                        { header: 'AMOUNT(Rs.)', dataKey: 'advanceAmount' },
                        { header: 'DATE', dataKey: 'date' },
                    ],
                    body: this.reportDetails,
                    theme: 'striped',
                    headStyles:{
                        fillColor: '#343a40'
                    }
                });

                autoTable(doc, {
                    body: [
                        [
                        {
                            content: 'Total:',
                            styles: {
                            halign:'right',
                            fontSize: 14
                            }
                        }
                        ],
                        [
                        {
                            content: 'Rs.'+this.meta.total,
                            styles: {
                            halign:'right',
                            fontSize: 20,
                            textColor: '#3366ff'
                            }
                        }
                        ],
                        [
                        {
                            content: 'Date: '+this.meta.date,
                            styles: {
                            halign:'right'
                            }
                        }
                        ]
                    ],
                    theme: 'plain'
                });

                autoTable(doc, {
                    body: [
                        [
                        {
                            content: '--------xx--------',
                            styles: {
                            halign: 'center'
                            }
                        }
                        ]
                    ],
                    theme: "plain"
                });
                doc.autoPrint();
                //return doc.save("Advance Report - "+this.meta.date);
                window.open(doc.output('bloburl'), '_blank');
            },
            
            
            getReports(){
                var no = 1
                this.axios.get(this.$apiUrl+"/api/v1.0/AdvanceReporting/employees/"+this.employee+"/advances",{
                params:{
                    employeeType: this.employeeType,
                    date: this.month
                }
                }).then(Response=>{
                    this.reportDetails=Response.data.advances,
                    this.meta=Response.data.meta,
                    this.branch=Response.data.branch,
                    this.employeeDetails=Response.data,
                    
                    
                    this.reportDetails.forEach(Element=>{
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
            





            
        
        

