<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>

            <!------------------------------------------------- Alerts -------------------------------------------------------->

            <v-snackbar :timeout="3000" v-model="enrollSuccess" color="green"  bottom ><v-icon left>mdi-check</v-icon> Student Enroll has been <strong>Success</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="enrollFaile" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Student Enroll has been <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="removeSuccess" color="green"  bottom ><v-icon left>mdi-check</v-icon> Student Remove from class has been <strong>Success</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="removeFaile" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Student Remove from class has been <strong>failed</strong> </v-snackbar>
            
            <!------------------------------------------------- Alerts -------------------------------------------------------->


            <template>
                <v-row style="padding:12px">
                    <v-col lg="4" md="6" sm="6" cols="12" width="300">
                        <v-form ref="form" v-model="valid" lazy-validation>
                            <v-card class="pb-5">
                                
                                <v-row justify="center" class="px-5 pb-1" dense>
                                    <v-card-title class="blue-grey--text text--darken-2">Individual Enrollment</v-card-title>
                                    <v-col cols="12" md="12" sm="12">
                                        <v-autocomplete :append-icon="null" :items="students" maxlength="11" v-model="studentID" :filter="studentFilter" item-text="studentID" item-value="studentID" label="Student ID" placeholder="ICTAxxxxxxx"  :rules="studentIdRule" clearable></v-autocomplete>
                                    </v-col>
                                </v-row>
                                <v-card-actions class="px-6">
                                    <app-EnrollStudentsInClass :valid="valid" :studentID="studentID" @success="enrollSuccessAlert($event)" @failed="enrollFaileAlert($event)" ></app-EnrollStudentsInClass>
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
                            <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Enroll Details</v-card-title>
                            <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                            <template>
                                <div>
                                    <v-data-table :headers="headers" :items="classes" :search="search">
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
        </v-container>
    </div>
 
    
</template>

<script>
    import EnrollStudents from './EnrollStudents.vue'
    import EnrollStudentsDetails from './EnrollStudentsDetails.vue'
    import EnrollStudentsInClass from './EnrollStudentsInClass.vue'

    export default {
        components:{
            'app-EnrollStudents':EnrollStudents,
            'app-EnrollStudentsDetails':EnrollStudentsDetails,
            'app-EnrollStudentsInClass':EnrollStudentsInClass
        },
        data () {
            return {
                menu:false,
                studentID:'',
                valid:true,
                search: '',

                classCount:'',
                studentCount:'',

                headers: [
                    { text: 'CLASSES',align: 'start', sortable: false, value:'className'},
                    { text: 'STUDENT COUNT', sortable: false, value: 'studentCount' },
                    { text: '', sortable: false, value: 'actions'}
                ],

                classes: [],
                students:[],

                breadcrumbs: [
                    { text: 'Classes', disabled: false, href: '/Classes' },
                    { text: 'Enroll Students', disabled: true, href: '/Classes/EnrollDetails' }
                ],

                enrollSuccess:false,
                enrollFaile:false,
                removeSuccess:false,
                removeFaile:false,


                cardlist:[
                    {name:'STUDENTS', count:"", icon:'mdi-account-group', color:'purple lighten-2'},
                    {name:'CLASSES', count:"", icon:'mdi-google-classroom', color:'blue'},
                    
                ],



                // -----------Validation rules-----------
                studentIdRule: [v=> !!v || 'Student ID is required', v=> /ICTA+\d\d\d\d\d\d\d/.test(v) || 'Invalid student ID', v=> (v && v.length ==11)|| 'Invalid student ID'],
            }
        },

        created(){
            this.getAllClasses()
            this.getStudentCount();
            this.getClassCount();
            this.getStudents()
        },

        methods: {
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


            getAllClasses(){
                this.axios.get(this.$apiUrl+"/api/v1.0/EnrollmentManagement/classes",{
                
                }).then(Response=>(
                    this.classes=Response.data.enrollment.data,
                    
                    this.classes.forEach(element =>{
                        var student=[]
                        student=element.students
                        
                        element.studentCount=student.length
                    })
                ))
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

            
            enrollSuccessAlert(success){
                this.enrollSuccess = success;
                this.getAllClasses()
            },
            
            enrollFaileAlert(failed){
                this.enrollFaile = failed;
            },

            removeSuccessAlert(success){
                this.removeSuccess = success;
                this.getAllClasses()
            },
            
            removeFaileAlert(failed){
                this.removeFaile = failed;
            },
        }
    }
</script>
            





            
        
        

