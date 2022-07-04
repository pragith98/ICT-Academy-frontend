<template>
  <v-row justify="start">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn @click="getAllStudent()" class="primary" small dark depressed  v-bind="attrs" v-on="on">Enroll New Students<v-icon dark right>mdi-link-variant</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Enrollment</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text style="height: 800px;">
            <div>
                <v-card-text>You can add students to <strong>{{classDetails.className}}</strong> class.</v-card-text>
                <v-card-title><v-spacer></v-spacer><v-text-field persistent-hint hint="*Use Name OR ID to search for a student" v-model="search" append-icon="mdi-magnify" label="Search" single-line ></v-text-field></v-card-title>
                
                <template>
                    <v-data-table @input="getSelect($event)"   :headers="headers" :items="students" :search="search" item-key="studentID"  show-select v-model="table">
                    </v-data-table>
                </template>
                
            </div>
            
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  color="grey" outlined depressed @click="dialog=false" >Cancel</v-btn>
            <v-btn  color="primary"  depressed @click="enrollStudent()" :disabled="!selectedStudents">Submit</v-btn>
        </v-card-actions>


        
        
      </v-card>
      
    </v-dialog>
  </v-row>
</template>



<script>
export default {
    props:['classDetails'],
    data(){
        return{
            
            dialog: false,
            valid:true,
            table:[],

            


            search: '',
            headers: [
                { text: 'STUDENT',align: 'start', sortable: false, value:'studentName'},
                { text: 'ID',align: 'start', sortable: false, value:'studentID'},
                { text: 'GRADE',align: 'start', sortable: true, value:'grade'},
                { text: '', sortable: false, value: 'actions',align:'end'},
            ],

            students: [],

            selectedStudents:[],
            
        }
        
        
    },

    created(){
        this.selectedStudents=null
    },
    
    

    methods:{
        getSelect(values) {
            this.selectedStudents = values.map(function(value){ return value.studentID })
        },


        getAllStudent(){
            this.axios.get(this.$apiUrl+"/api/v1.0/EnrollmentManagement/classes/"+this.classDetails.classID+"/notInClass")
            .then(Response=>(
                this.students=Response.data.students
            ))
        },


        enrollStudent(){
            this.axios.post(this.$apiUrl+"/api/v1.0/EnrollmentManagement/classes",{
                studentID:this.selectedStudents,
                classID: this.classDetails.classID

            })
            .then(Response=>{
                if(Response.data.success == true){
                    this.dialog=false
                    this.successAlert()
                    this.getAllStudent()
                    
                    // ---------empty array----------------
                    while(this.table.length>0){
                        this.table.pop()
                    }
                    //console.log(this.table)
                }else{
                    this.failedAlert()
                }
            })
            .catch(error => {
                this.failedAlert()
                console.log(error)
                console.log(this.selectedStudents)
                console.log(this.classDetails.classID)
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


