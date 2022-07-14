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
            <v-btn  color="primary" @click="dialog = false" depressed>OK</v-btn>
        </v-card-actions>

        <v-snackbar v-model="addSuccessAlert" :timeout="2000" absolute bottom left color="green">Attendance update successful</v-snackbar>
        
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

            errormsg:null,
            

            addSuccessAlert:false,

            


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
        

        // updateAttendance(id,bool){
        //     var attendance
        //     if(bool == true){
        //         attendance=1
        //         this.addSuccessAlert=true
        //         console.log(this.classDetails+" "+id+" "+attendance+" "+this.conductedDate)
        //     }else{
        //         attendance=0
        //         this.addSuccessAlert=true
        //         console.log(this.classDetails+" "+id+" "+attendance+" "+this.conductedDate)
        //     }
            
            
        // },

        // switchLabel (bool) {
        //     return bool?'Present ':'Absent  '
        // },


        
       

        
        
        
        
      
    }
}
</script>


