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
                <v-card flat>
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Past Student Details</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    
                    <v-data-table :headers="headers" :items="students" :search="search">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-card-actions>
                                <app-ViewStudentDetails @success="reCreate($event)" :student='item'></app-ViewStudentDetails>
                                <v-spacer></v-spacer>
                                <app-DeleteStudent class="ml-5" :student='item' @success="deleteAlert($event)" @failed="faileAlert($event)"></app-DeleteStudent>
                            </v-card-actions>
                        </template>
                    </v-data-table>
                </v-card>
            </template>

            
            
        </v-container>
    </div>
 
    
</template>

<script>
    import ViewStudentDetails from './ViewStudentDetails.vue'
    import DeleteStudent from './DeleteStudent.vue'

    export default {
        components:{
            'app-ViewStudentDetails':ViewStudentDetails,
            'app-DeleteStudent':DeleteStudent
        },
        data () {
            return {
                search: '',
                headers: [
                    { text: 'NAME',align: 'start', sortable: false, value:'firstName'},
                    { text: 'GENDER', value:'sex'},
                    { text: 'ADMISSION NO.', sortable: false, value: 'studentID' },
                    { text: 'GRADE', value: 'grade' },
                    { text: 'TELEPHONE NO.', sortable: false, value: 'telNo' },
                    { text: '', sortable: false, value: 'actions' },
                ],

                students: [],

                breadcrumbs: [
                    { text: 'Students', disabled: false, href: '/Students' },
                    { text: 'PastStudentDetails', disabled: true, href: '/Students/PastStudentDetails' }
                ],

                successAlert:false,
                unsuccessAlert:false,
            }
        },
        
        created(){
            this.getAllStudents();
        },

        methods: {

            getAllStudents(){
                this.axios.get(this.$apiUrl+"/api/v1.0/StudentManagement/students",{
                params:{
                    status: "Past"
                }
                
                }).then(Response=>(
                    this.students=Response.data.student.data,

                    this.students.forEach(element => {
                        element.firstName=element.firstName+" "+element.lastName
                    })
                ))
            },

            deleteAlert(success){
                this.getAllStudents();
                this.successAlert = success;
            },
            faileAlert(failed){
                this.unsuccessAlert = failed;
            },

            reCreate(success){
                this.getAllStudents();
                console.log(success)

            },
        }
    }
</script>
            





            
        
        

