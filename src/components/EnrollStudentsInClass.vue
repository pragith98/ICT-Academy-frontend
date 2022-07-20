<template>
  <v-row justify="end" class="px-0 mx-0">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn :disabled="!studentID|| !valid" @click="selectedClasses=null, getAllClasses()" block width="8px" depressed color="success"   v-bind="attrs" v-on="on">Enroll Now</v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Enrollment</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text style="height: 800px;">
            <div>
                <v-card-text>Select class/classes from below table</v-card-text>
                <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search Class" single-line ></v-text-field></v-card-title>
                <template>
                    <v-data-table @input="getSelect($event)"   :headers="headers" :items="classes" :search="search" item-key="classID"  show-select>
                    </v-data-table>
                </template>
            </div>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  color="grey" outlined depressed @click="dialog=false">Cancel</v-btn>
            <v-btn :loading="loading"  color="primary" :disabled="!selectedClasses || selectedClasses==''"  depressed @click="enrollStudent()">Enroll</v-btn>
        </v-card-actions>

        
        <!-- ---------------------------alerts ---------------------------------------->

        <v-snackbar v-model="addSuccessAlert" :timeout="2000" absolute bottom left color="green">Student has been removed from the class</v-snackbar>
        
        <v-snackbar v-model="errorMsgAlert" :multi-line="true" :timeout="0">
            {{errorMsgBody}}
            <template v-slot:action="{ attrs }">
                <v-btn color="red" text v-bind="attrs" @click="errorMsgAlert = false">Close</v-btn>
            </template>
        </v-snackbar>

        <!-- ---------------------------alerts ---------------------------------------->
        
      </v-card>
      
    </v-dialog>
  </v-row>
</template>



<script>
export default {
    props:['studentID','valid'],
    data(){
        return{
            loading:false,
            dialog: false,
            errormsg:null,
            errorMsgAlert:false,
            errorMsgBody:'',
            addSuccessAlert:false,
            

            search: '',
            headers: [
                { text: 'CLASS',align: 'start', sortable: false, value:'className'},
                { text: 'TEACHER', sortable: false, value: 'teacher.teacherName' },
                { text: 'GRADE',sortable: true, value: 'grade', width:'15%'},
                
            ],

            classes: [],
            selectedClasses:''
            
        }
        
        
    },
    
    
    methods:{

        getAllClasses(){
            this.axios.get(this.$apiUrl+"/api/v1.0/EnrollmentManagement/students/"+this.studentID+"/notInStudent").then(Response=>(
                this.classes=Response.data.classes
                //console.log(Response.data.classes)
            ))
        },

        
        getSelect(values) {
            this.selectedClasses = values.map(function(value){ return value.classID })
        },


        enrollStudent(){
            this.loading=true
            this.axios.post(this.$apiUrl+"/api/v1.0/EnrollmentManagement/students",{
                studentID:this.studentID,
                classID: this.selectedClasses

            })
            .then(Response=>{
                if(Response.data.success == true){
                    this.dialog=false
                    this.successAlert()
                    this.loading=false
                }else{
                    this.failedAlert()
                }
            })
            .catch(error => {
                this.errorMsgBody=error.response.data.message
                this.errorMsgAlert=true
                this.failedAlert()
                console.log(error)
                this.loading=false
                
            });
            
        },


        successAlert(){
            this.$emit('success',true)
        },

        failedAlert(){
            this.$emit('failed',true)
        }
        
        
        
      
    }
}
</script>


