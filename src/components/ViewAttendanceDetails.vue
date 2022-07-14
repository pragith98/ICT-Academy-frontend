<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
            <template v-slot:activator="{ on, attrs }">
                <v-btn @click="getStudents()" color="primary" small dark depressed v-bind="attrs" v-on="on">Students<v-icon dark right>mdi-account-group</v-icon></v-btn>
            </template>
            <v-card max-width="700" flat>
                <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Student Attendance</v-card-title>
                
                <v-divider></v-divider>
                <v-card-text style="height: 800px;">
                    <v-form ref="form" v-model="valid" lazy-validation>
                        
                        <div>
                            <v-card-text>Attendance Details of <strong>{{classDetails.className}}</strong> on <strong>{{conductedDate}}</strong>  </v-card-text>
                            <v-card-title><v-spacer></v-spacer><v-text-field persistent-hint hint="* Use Name OR ID to search for a student" v-model="search" append-icon="mdi-magnify" label="Search" single-line ></v-text-field></v-card-title>
                            
                            <v-data-table :headers="headers" :items="students" :search="search">
                                <template v-slot:[`item.actions`]="{ item }">
                                    <v-card-actions>
                                        <v-switch color="blue" @change="markAttendance(item.studentID,item.attendance)" inset v-model="item.attendance" :label="switchLabel(item.attendance)" class="mr-3"></v-switch>
                                    </v-card-actions>
                                </template>
                            </v-data-table>
                        </div>
                    </v-form>
                </v-card-text>
                <v-divider></v-divider>




                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn  color="primary" @click="dialog = false, reCreate()" depressed>OK</v-btn>
                </v-card-actions>

                <!-- --------------------------------------------------------alerts-------------------------------------- -->
                <v-snackbar v-model="addSuccessAlert" :timeout="3000" absolute bottom color="green"><v-icon left>mdi-check</v-icon>Attendance has been marked <strong>successfully</strong> </v-snackbar>
                <v-snackbar v-model="removeSuccessAlert" :timeout="3000" absolute bottom color="green"><v-icon left>mdi-check</v-icon>Attendance has been removed <strong>successfully</strong> </v-snackbar>
                <v-snackbar v-model="failAlert" :timeout="3000" absolute bottom color="red"><v-icon left>mdi-alert-outline</v-icon>Operation is <strong>failed</strong></v-snackbar>
                <!-- --------------------------------------------------------alerts-------------------------------------- -->
                
            </v-card>
        
        </v-dialog>
    </v-row>
</template>



<script>
export default {
    props:['classDetails', 'conductedDate'],
    data(){
        return{
            
            dialog: false,
            valid:true,

            
            

            addSuccessAlert:false,
            removeSuccessAlert:false,
            failAlert:false,

            


            search: '',
            headers: [
                { text: 'STUDENT',align: 'start', sortable: false, value:'studentName'},
                { text: 'ID', sortable: false, value: 'studentID' },
                { text: "MARKED TIME", value: 'time', sortable: false,align:'start' },
                { text: "ATTENDANCE", value: 'actions', sortable: false,align:'start' },
                
            ],

            students: [],
            
        }
        
        
    },
    
    

    methods:{

        show(id){
            console.log(id)
        },

        switchLabel (bool) {
            return bool?'Present ':'Absent  '
        },

        getStudents(){
            this.axios.get(this.$apiUrl+"/api/v1.0/AttendanceManagement/attendances/classes/"+this.classDetails.classID,{
                params:{
                    date: this.conductedDate
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

        markAttendance(studentID,bool){
            if(bool == true){

                this.axios.patch(this.$apiUrl+'/api/v1.0/AttendanceManagement/attendances/students/'+studentID,{
                    classID: this.classDetails.classID,
                    date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    attendStatus:'1'

                })
                .then(Response=>{
                    if(Response.data.success == true){
                        this.axios.patch(this.$apiUrl+"/api/v1.0/EnrollmentManagement/classes/"+this.classDetails.classID+"/students/"+studentID+"/daily").then(Response=>(
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
                    classID: this.classDetails.classID,
                    date:(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                    attendStatus:'0'

                })
                .then(Response=>{
                    if(Response.data.success == true){
                        this.axios.patch(this.$apiUrl+"/api/v1.0/EnrollmentManagement/classes/"+this.classDetails.classID+"/students/"+studentID+"/dailyDecrement").then(Response=>(
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


        reCreate(){
            this.$emit('success',true)
        }
         
        
      
    }
}
</script>


