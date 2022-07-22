<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
        <v-container>

            

            <template>
                <v-card flat>
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Mark Attendance
                        <app-AddOneStudentToAttendanceVue @success="StudentAddSuccessAlert($event)" @failed="StudentAddFaileAlert($event)" class="mr-2" :classID="classID"></app-AddOneStudentToAttendanceVue>
                    </v-card-title>
                    <v-card-text class="mt-2">
                        Mark <strong>Attendance</strong> & <strong>Daily Payments</strong> of <strong>{{classDetails.className}}</strong>
                    </v-card-text>
                    <v-card class="pl-10 pr-10" flat>
                        <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                        <template>
                            <v-card flat>
                                <v-data-table :headers="headers" :items="students" :search="search">
                                    <template v-slot:[`item.actions`]="{ item }">
                                        <v-card-actions>
                                            <v-switch color="blue" @change="markAttendance(item.studentID,item.attendance)" inset v-model="item.attendance" :label="switchLabel(item.attendance)" class="mr-3"></v-switch>
                                            <v-spacer></v-spacer>
                                            <v-badge bordered :content="item.paymentStatus" :value="item.paymentStatus>1" color="error">
                                                <app-PayDailyFee @success="paymentSuccessAlert($event)" @failed="paymentFaileAlert($event)" :show="item.paymentStatus" :student="item" :classDetails="classDetails" class="ml-2"></app-PayDailyFee>
                                            </v-badge>
                                        </v-card-actions>
                                    </template>
                                </v-data-table>
                            </v-card>
                            
                        </template>
                    </v-card>


                    


                </v-card>
            </template>
                <!-- --------------------------------------------------------alerts-------------------------------------- -->
                <v-snackbar v-model="addSuccessAlert" :timeout="3000" absolute bottom color="green"><v-icon left>mdi-check</v-icon>Attendance has been marked <strong>successfully</strong> </v-snackbar>
                <v-snackbar v-model="removeSuccessAlert" :timeout="3000" absolute bottom color="green"><v-icon left>mdi-check</v-icon>Attendance has been removed <strong>successfully</strong> </v-snackbar>
                <v-snackbar v-model="failAlert" :timeout="3000" absolute bottom color="red"><v-icon left>mdi-alert-outline</v-icon>Operation is <strong>failed</strong></v-snackbar>
                <v-snackbar v-model="successAlert" :timeout="3000" absolute bottom color="green"><v-icon left>mdi-check</v-icon>Payment has been <strong>successfully</strong> </v-snackbar>
                <v-snackbar v-model="unsuccessAlert" :timeout="3000" absolute bottom color="red"><v-icon left>mdi-alert-outline</v-icon>Payment has been <strong>failed</strong></v-snackbar>
                
                <v-snackbar v-model="addStudentSuccessful" :timeout="3000" absolute bottom color="green"><v-icon left>mdi-check</v-icon>Add student <strong>successfully</strong> </v-snackbar>
                <v-snackbar v-model="addStudentUnsuccessful" :timeout="3000" absolute bottom color="red"><v-icon left>mdi-alert-outline</v-icon>Add student <strong>failed</strong>. Please check STUDENT ID</v-snackbar>
                <!-- --------------------------------------------------------alerts-------------------------------------- -->

        </v-container>
    </div>
 
    
</template>

<script>
    import PayDailyFee from './PayDailyFee.vue'
    import AddOneStudentToAttendanceVue from './AddOneStudentToAttendance.vue'

    export default {

        components:{
            'app-PayDailyFee':PayDailyFee,
            'app-AddOneStudentToAttendanceVue':AddOneStudentToAttendanceVue
        },
        data () {
            return {
                classID:this.$route.params.id,

                todayDate:'',

                search: '',
                headers: [
                    { text: 'STUDENT',align: 'start', sortable: false, value:'studentName'},
                    { text: 'ID', sortable: false, value: 'studentID' },
                    { text: "MARKED TIME", value: 'time', sortable: false,align:'start' },
                    { text: "ATTENDANCE", value: 'actions', sortable: false,align:'start' },
                    
                ],


                
                students: [],

                classDetails:[],

                addSuccessAlert:false,
                removeSuccessAlert:false,
                failAlert:false,
                successAlert:false,
                unsuccessAlert:false,

                addStudentUnsuccessful:false,
                addStudentSuccessful:false,

                breadcrumbs: [
                    { text: 'Attendance', disabled: false, href: '/Attendance' },
                    { text: 'Today Classes', disabled: false, href: '/Attendance/TodayClasses' },
                    { text: 'Mark Attendance', disabled: true, href: '' }
                ],
            }
        },

        created(){
            this.getTodayDate()
            this.getClassDetails()
            this.getStudents()
            
        },

        methods:{
            show(id){
                console.log(id)
            },

            switchLabel (bool) {
                return bool?'Present ':'Absent  '
            },

            markAttendance(studentID,bool){
                if(bool == true){

                    this.axios.patch(this.$apiUrl+'/api/v1.0/AttendanceManagement/attendances/students/'+studentID,{
                        classID: this.classID,
                        date:this.todayDate,
                        attendStatus:'1'

                    })
                    .then(Response=>{
                        if(Response.data.success == true){
                            this.axios.patch(this.$apiUrl+"/api/v1.0/EnrollmentManagement/classes/"+this.classID+"/students/"+studentID+"/daily").then(Response=>(
                                console.log(Response.data.success),
                                this.addSuccessAlert=true,
                                this.getStudents()
                            ) )

                            
                        }else{
                           this.failAlert=true
                            this.getStudents()
                        }
                    })
                    .catch(error => {
                        this.failAlert=true
                        this.getStudents()
                        console.log(error.data)
                    });
                    
                    
                }else{
                    this.axios.patch(this.$apiUrl+'/api/v1.0/AttendanceManagement/attendances/students/'+studentID,{
                        classID: this.classID,
                        date:this.todayDate,
                        attendStatus:'0'

                    })
                    .then(Response=>{
                        if(Response.data.success == true){
                            this.axios.patch(this.$apiUrl+"/api/v1.0/EnrollmentManagement/classes/"+this.classID+"/students/"+studentID+"/dailyDecrement").then(Response=>(
                            console.log(Response.data.success),
                            this.removeSuccessAlert=true,
                            this.getStudents()
                        ))

                        }else{
                            this.failAlert=true
                            this.getStudents()
                        }
                    })
                    .catch(error => {
                        this.failAlert=true
                        this.getStudents()
                        console.log(error.data)
                    });
                }
            },


            getClassDetails(){
                this.axios.get(this.$apiUrl+"/api/v1.0/ClassManagement/classes/"+this.classID)
                .then(Response=>{
                    this.classDetails=Response.data.class.data[0]
                })
            },

            getStudents(){
                this.axios.get(this.$apiUrl+"/api/v1.0/AttendanceManagement/attendances/classes/"+this.classID,{
                    params:{
                        date: this.todayDate
                    }
                }).then(Response=>{
                    this.students=Response.data.attendance.data[0].students

                    this.students.forEach(element => {
                        if(element.attendStatus == '0'){
                            element.attendance=false
                        }else if(element.attendStatus == '1'){
                            element.attendance=true
                        }
                    })
                })
            },

            getTodayDate(){
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var yyyy = today.getFullYear();
                this.todayDate = yyyy + '-' + mm + '-' + dd;
            },

            showPaymentStatus(status){
                console.log(status)
            },


            paymentSuccessAlert(success){
                this.getStudents()
                this.successAlert = success;
            },

            paymentFaileAlert(failed){
                this.unsuccessAlert = failed;
            },

            StudentAddSuccessAlert(success){
                this.getStudents()
                this.addStudentSuccessful = success;
            },
            
            StudentAddFaileAlert(failed){
                this.addStudentUnsuccessful = failed;
            },
        }
    }
</script>




            
        
        

