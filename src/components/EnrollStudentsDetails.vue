<template>
  <v-row justify="start">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn @click="getAllStudent(),selectedStudents=null" class="orange" small dark depressed  v-bind="attrs" v-on="on">Students of Class<v-icon dark right>mdi-account-group</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Students List</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text style="height: 800px;">
            <div>
                <v-card-text>This is students of <strong>{{classDetails.className}}</strong> class. If you want you can remove students from this class.</v-card-text>
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
            <v-btn  color="primary"  depressed @click="removeStudent()" :disabled="!selectedStudents">Submit</v-btn>
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
                { text: 'ENROLLED DATE',align: 'start', sortable: true, value:'enrolledDate'},
                { text: '', sortable: false, value: 'actions',align:'end'},
            ],

            students: [],

            selectedStudents:[],
            
        }
        
        
    },
    

    
    

    methods:{
        getSelect(values) {
            this.selectedStudents = values.map(function(value){ return value.studentID })
        },


        getAllStudent(){
            this.axios.get(this.$apiUrl+"/api/v1.0/EnrollmentManagement/classes/"+this.classDetails.classID)
            .then(Response=>(
                this.students=Response.data.enrollment.data[0].students
            ))
        },


        removeStudent(){
            this.axios.delete(this.$apiUrl+"/api/v1.0/EnrollmentManagement/classes/"+this.classDetails.classID,{
                data: {
                    studentID:this.selectedStudents
                }

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

                }else{
                    this.failedAlert()
                }
            })
            .catch(error => {
                this.failedAlert()
                console.log(error)
                console.log(this.selectedStudents)
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


