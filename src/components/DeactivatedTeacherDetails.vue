<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>

            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Teacher delete <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Teacher delete <strong>successful</strong> </v-snackbar>
            
          

            <template>
                <v-card flat>
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Teacher Details</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    
                    <v-data-table :headers="headers" :items="teachers" :search="search">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-card-actions>
                                <app-ViewTeacherDetails @success="reCreate($event)" :teacher='item'></app-ViewTeacherDetails>
                                <v-spacer></v-spacer>
                                <app-DeleteTeacher class="ml-5" :teacher='item' @success="deleteAlert($event)" @failed="faileAlert($event)"></app-DeleteTeacher>
                            </v-card-actions> 
                        </template>
                    </v-data-table>
                </v-card>
            </template>

            
            
        </v-container>
    </div>
 
    
</template>

<script>
    import ViewTeacherDetails from './ViewTeacherDetails.vue'
    import DeleteTeacher from './DeleteTeacher.vue'

    export default {
        components:{
            'app-ViewTeacherDetails':ViewTeacherDetails,
            'app-DeleteTeacher':DeleteTeacher
        },
        data () {
            return {
                search: '',
                headers: [
                    { text: 'NAME',align: 'start', sortable: false, value:'firstName'},
                    { text: 'TELEPHONE NO.', sortable: false, value: 'telNo' },
                    { text: 'EMAIL', sortable: false, value: 'email' },
                    { text: '', sortable: false, value: 'actions' },
                ],

                teachers:[],

                breadcrumbs: [
                    { text: 'Teachers', disabled: false, href: '/Teachers' },
                    { text: 'TeacherDetails', disabled: true, href: '/Teachers/TeacherDetails' }
                ],

                successAlert:false,
                unsuccessAlert:false,
            }
        },

        created(){
            this.getTeachers()
        },

        methods: {
            deleteAlert(success){
                this.getTeachers();
                this.successAlert = success;
            },

            faileAlert(failed){
                this.unsuccessAlert = failed;
            },

            getTeachers(){
                this.axios.get(this.$apiUrl+"/api/v1.0/TeacherManagement/teachers",{
                params:{
                    status: "Deactivate"
                }
                
                }).then(Response=>(
                    this.teachers=Response.data.teacher.data,
                    
                    this.teachers.forEach(element => {
                        element.firstName=element.title+" "+element.firstName+" "+element.lastName
                    })
                    
                ))
            },

            reCreate(success){
                this.getTeachers();
                console.log(success)

            },
        }
    }
</script>
            





            
        
        

