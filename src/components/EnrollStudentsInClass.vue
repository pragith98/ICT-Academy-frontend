<template>
  <v-row justify="end" class="px-0 mx-0">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn :disabled="!studentID|| !valid" block width="8px" depressed color="success"   v-bind="attrs" v-on="on">Enroll Now</v-btn>
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
            <v-btn  color="primary"  depressed @click="enrollStudent()">Submit</v-btn>
        </v-card-actions>

        <v-snackbar v-model="addSuccessAlert" :timeout="2000" absolute bottom left color="green">Student has been removed from the class</v-snackbar>
        
      </v-card>
      
    </v-dialog>
  </v-row>
</template>



<script>
export default {
    props:['studentID','valid'],
    data(){
        return{
            
            dialog: false,
            errormsg:null,
            
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
    
    created(){
        this.getAllClasses()
    },

    methods:{

        getAllClasses(){
            this.axios.get(this.$apiUrl+"/api/v1.0/ClassManagement/classes",{
            params:{
                status: "Active"
            }
            
            }).then(Response=>(
                this.classes=Response.data.class.data
            ))
        },

        
        getSelect(values) {
            this.selectedClasses = values.map(function(value){ return value.classID })
        },


        enrollStudent(){
            this.axios.post(this.$apiUrl+"/api/v1.0/EnrollmentManagement/students",{
                studentID:this.studentID,
                classID: this.selectedClasses

            })
            .then(Response=>{
                if(Response.data.success == true){
                    this.dialog=false
                    this.successAlert()
                }else{
                    this.failedAlert()
                }
            })
            .catch(error => {
                this.failedAlert()
                console.log(error)
                
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


