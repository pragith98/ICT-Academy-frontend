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
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Class Details</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    <template>
                        <div>
                            <v-data-table :headers="headers" :items="classes" :search="search">
                                <template v-slot:[`item.actions`]="{ item }">
                                    <v-card-actions>
                                        <app-EditClass :classDetails='item'></app-EditClass>
                                        <v-spacer></v-spacer>
                                        <app-DeleteClass class="ml-1" :classDetails='item' @success="deleteAlert($event)" @failed="faileAlert($event)"></app-DeleteClass>
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
    import EditClass from '../components/EditClass.vue'
    import DeleteClass from '../components/DeleteClass.vue'

    export default {
        components:{
            'app-EditClass':EditClass,
            'app-DeleteClass':DeleteClass
        },
        data () {
            return {
                menu:false,

                search: '',
                headers: [
                    { text: 'NAME',align: 'start', sortable: false, value:'className'},
                    { text: 'TEACHER', sortable: false, value: 'teacher.teacherName' },
                    { text: 'GRADE',sortable: true, value: 'grade', width:'8%'},
                    { text: 'SUBJECT', sortable: false, value: 'subject.subjectName' },
                    { text: 'FEE', sortable: false, value: 'classFee', filterable:false},
                    { text: 'TIME', sortable: true, value: 'time' },
                    { text: 'LOCATION', sortable: false, value: 'room' },
                    { text: 'DAY', sortable: true, value: 'day' },
                    { text: '', sortable: false, value: 'actions' , align:'end'},
                ],

                classes: [],

                breadcrumbs: [
                    { text: 'Classes', disabled: false, href: '/Classes' },
                    { text: 'ClassDetails', disabled: true, href: '/Classes/ClassDetails' }
                ],

                successAlert:false,
                unsuccessAlert:false,
            }
        },

        created(){
            this.getAllClasses()
        },

        methods: {

            getAllClasses(){
                this.axios.get(this.$apiUrl+"/api/v1.0/ClassManagement/classes",{
                params:{
                    status: "Active"
                }
                
                }).then(Response=>(
                    this.classes=Response.data.class.data,

                    this.classes.forEach(element => {
                        element.time=element.startTime+"-"+element.endTime
                    })
                ))
            },


            deleteAlert(success){
                this.getAllClasses()
                this.successAlert = success;
            },
            faileAlert(failed){
                this.unsuccessAlert = failed;
            },
        }
    }
</script>
            





            
        
        

