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
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Exam Marks</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    <template>
                        <div>
                            <v-data-table :headers="headers" :items="exams" :search="search">
                                <template v-slot:[`item.actions`]="{ item }">
                                    <v-card-actions>
                                        <app-ExamMarks @success="reCreate($event)"  :examDetails='item'></app-ExamMarks>
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
    
    import ExamMarks from './ExamMarks.vue'

    export default {
        components:{
            'app-ExamMarks':ExamMarks,
        },
        data () {
            return {
                menu:false,

                search: '',
                headers: [
                    { text: 'EXAM',align: 'start', sortable: false, value:'exam'},
                    { text: 'CLASS', sortable: false, value: 'class.className' },
                    { text: 'GRADE',sortable: true, value: 'class.grade', width:'8%'},
                    { text: 'BRANCH', sortable: false, value: 'branchID.branchName' },
                    { text: '', sortable: false, value: 'actions' , align:'end'},
                ],

                exams:[],
                examsForClass: [],
                classes:[],

                breadcrumbs: [
                    { text: 'Exams', disabled: false, href: '/Exams' },
                    { text: 'Exam Marks', disabled: true, href: '/Exams/ExamDetails' }
                ],

                
                
            }
        },

        created(){
            this.getAllExams()
        },

        methods: {

            getAllExams(){
                const LogedUser = JSON.parse(localStorage.getItem('user'));
                this.axios.get(this.$apiUrl+"/api/v1.0/TeacherManagement/teachers/"+LogedUser.employee.employeeID+"/classes").then(Response=>(
                    this.classes=Response.data.teacher.classes,

                    this.classes.forEach(element => {
                        if((element.exams).length>0){
                            element.exams.forEach(element=>{
                                this.exams.push(element)
                            })
                        }
                        
                    })
  
                ))
            },


           
        }
    }
</script>
            





            
        
        

