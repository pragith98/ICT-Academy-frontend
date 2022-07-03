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
                <v-card flat>
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
            </template>
        </v-container>
    </div>
 
    
</template>

<script>
    import EnrollStudents from './EnrollStudents.vue'
    import EnrollStudentsDetails from './EnrollStudentsDetails.vue'

    export default {
        components:{
            'app-EnrollStudents':EnrollStudents,
            'app-EnrollStudentsDetails':EnrollStudentsDetails
        },
        data () {
            return {
                menu:false,

                search: '',
                headers: [
                    { text: 'CLASSES',align: 'start', sortable: false, value:'className'},
                    { text: 'STUDENT COUNT', sortable: false, value: 'studentCount' },
                    { text: '', sortable: false, value: 'actions'}
                ],

                classes: [],

                breadcrumbs: [
                    { text: 'Classes', disabled: false, href: '/Classes' },
                    { text: 'Enroll Students', disabled: true, href: '/Classes/EnrollDetails' }
                ],

                enrollSuccess:false,
                enrollFaile:false,
                removeSuccess:false,
                removeFaile:false
            }
        },

        created(){
            this.getAllClasses()
        },

        methods: {
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
            





            
        
        

