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
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Attendance Details</v-card-title>
                    <v-card-title>
                        <v-spacer></v-spacer>
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field clearable v-model="search" label="Search"  readonly v-bind="attrs" v-on="on" hint="* Use date to search for previous class attendance" persistent-hint single-line></v-text-field>
                            </template>
                            <v-date-picker v-model="date" @input="menu = false,getAllClasses()" ></v-date-picker>
                        </v-menu>
                    </v-card-title>

                    <template>
                        <div>
                            <v-data-table :headers="headers" :items="classes" :search="search">
                                <template v-slot:[`item.actions`]="{ item }">
                                    <app-ViewAttendaceDetails :classDetails="item" :conductedDate="date"></app-ViewAttendaceDetails>
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
    
    import ViewAttendaceDetails from './ViewAttendanceDetails.vue'

    export default {
        
        components:{
            'app-ViewAttendaceDetails':ViewAttendaceDetails
        },

        data () {
            return {
                activePicker: null,
                date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                menu: false,



                search: '',
                headers: [
                    { text: 'CLASS',align: 'start', sortable: false, value:'className'},
                    { text: 'ABSENT STUDENTS', sortable: false, value:'absentCount'},
                    { text: 'PRESENT STUDENTS', sortable: false, value:'presentCount'},
                    { value: 'actions', sortable: false,align:'start' },
                ],

                classes: [],

                breadcrumbs: [
                    { text: 'Attendance', disabled: false, href: '/Attendance' },
                    { text: 'Attendance Details', disabled: true, href: '/Attendance/AttendanceDetails' }
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
                this.axios.get(this.$apiUrl+"/api/v1.0/AttendanceManagement/attendances",{
                params:{
                    date: this.date
                }
                
                }).then(Response=>(
                    this.classes=Response.data.attendance.data,
                    this.classes.forEach(element=>{
                        var student=element.students
                        var absentCount = 0
                        var presentCount = 0
                        student.forEach(element=>{
                            if(element.attendStatus==1){
                                presentCount += 1
                            }else{
                                absentCount += 1
                            }
                        })
                        element.absentCount=absentCount
                        element.presentCount=presentCount
                        
                    })

                ))
            },



            deleteAlert(success){
                this.successAlert = success;
            },
            faileAlert(failed){
                this.unsuccessAlert = failed;
            },
        }
    }
</script>
            





            
        
        

