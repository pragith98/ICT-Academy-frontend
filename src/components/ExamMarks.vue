<template>
  <v-row justify="start">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn @click="getAllStudent(),getAttendance()"  class="primary" small dark depressed  v-bind="attrs" v-on="on">Marks sheet<v-icon dark right>mdi-file-document-edit</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Marks sheet
            <v-spacer></v-spacer>
            <app-AddOneStudentToMarkList v-if="!isEditing" @success="StudentAddSuccessAlert($event)" @failed="StudentAddFaileAlert($event)" class="mr-2" :examDetails="examDetails"></app-AddOneStudentToMarkList>
            <v-btn depressed color="blue-grey" dark @click="isEditing = !isEditing" v-if="!isEditing"> Edit
                <v-icon right>mdi-account-edit</v-icon>
            </v-btn>  
        </v-card-title>
        
        <v-divider></v-divider>
        <v-card-text style="height: 800px;">
            <div>
                <v-card-text>This is marks sheet of <strong>{{examDetails.exam}}</strong> exam. These marks are out of  <v-chip small><strong>{{totalMark}}</strong></v-chip>. If the student is absent, please mark it as <strong>Ab</strong></v-card-text>
                
                <v-card flat color="grey lighten-3" v-if="!isEditing">
                    <v-row>
                        <v-col>
                            <v-card-text>Present student count : <v-chip outlined small color="blue">{{presentCount}}</v-chip></v-card-text>
                            <v-card-text>Absent student count : <v-chip  color="red" small outlined >{{absentCount}}</v-chip></v-card-text>
                        </v-col>
                        <v-divider vertical></v-divider>
                        <v-col>
                            <v-card-text>
                                <v-select @change="filterStudents()" :items="selection" label="Filter students" v-model="filtering"></v-select>
                                <v-text-field clearable label="Marks onward from:" v-show="showHighMark"  :rules="numberRules && [markLimit]"  @change="getHighMarksStudent()" maxlength="3" v-model="highMark" dense ></v-text-field>
                            </v-card-text>
                            
                        </v-col>
                        
                    </v-row>
                    
                </v-card>


                <v-card-title><v-spacer></v-spacer><v-text-field persistent-hint hint="*Use Name OR ID to search for a student" v-model="search" append-icon="mdi-magnify" label="Search" single-line ></v-text-field></v-card-title>
                <template>
                    <v-data-table  :headers="headers" :items="students" :search="search" item-key="studentID">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-card-actions>
                                <v-text-field :readonly="!isEditing" :rules="[markLimit]"  @change="markStudentMarks(item.studentID,item.mark)" maxlength="3"  class="centered-input" style="width:70px" v-model="item.mark" dense ></v-text-field>
                                
                            </v-card-actions>
                        </template>
                        
                    </v-data-table>
                </template>
                
            </div>
            
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn   @click="cancelEdit(),getAllStudent(),getAttendance()" outlined color="grey" v-if="isEditing" :disabled="btnDisabled">Cancel</v-btn>
            <v-btn  color="primary" v-if="isEditing" @click="cancelEdit(),getAllStudent(),getAttendance()"  depressed :disabled="btnDisabled">Ok</v-btn>
            <v-btn  color="primary" v-if="!isEditing"  depressed @click="dialog=false" :disabled="btnDisabled">Ok</v-btn>
        </v-card-actions>

        <!-- ------------------------------alerts---------------------------- -->
        <v-snackbar v-model="successfulAlert" :timeout="2000" absolute bottom left color="green">Marks has been updated</v-snackbar>
        <v-snackbar :timeout="3000" v-model="unSuccessfulAlert" color="red"  absolute bottom left ><v-icon left>mdi-alert-outline</v-icon>Update failed </v-snackbar>
        <v-snackbar v-model="addStudentSuccessful" :timeout="3000" absolute bottom color="green"><v-icon left>mdi-check</v-icon>Add student <strong>successfully</strong> </v-snackbar>
        <v-snackbar v-model="addStudentUnsuccessful" :timeout="3000" absolute bottom color="red"><v-icon left>mdi-alert-outline</v-icon>Add student <strong>failed</strong>. Please check STUDENT ID</v-snackbar>
        <!-- ------------------------------alerts---------------------------- -->
        
      </v-card>
      
    </v-dialog>
  </v-row>
</template>



<script>

import AddOneStudentToMarkList from './AddOneStudentToMarkList.vue'

export default {
    components:{
        'app-AddOneStudentToMarkList':AddOneStudentToMarkList,
    },
    props:['examDetails'],
    data(){
        return{
            dialog: false,
            valid:true,
            isEditing: null,
            btnDisabled:false,
            filtering:'',
            presentCount:'',
            absentCount:'',
            totalMark:'',
            markValid:false,

            highMark:'',
            showHighMark:false,

            search: '',
            headers: [
                { text: 'STUDENT',align: 'start', sortable: false, value:'studentName'},
                { text: 'ID',align: 'start', sortable: false, value:'studentID'},
                { text: 'MARK', sortable: true, value: 'actions',align:'center'},
            ],

            students: [],
            marks:[],

            successfulAlert:false,
            unSuccessfulAlert:false,
            addStudentUnsuccessful:false,
            addStudentSuccessful:false,


            // -----------Validation rules-----------
            numberRules: [ v => /^\d+$/.test(v) || 'Must be numbers only'],
            textRules: [ v => /^[Ab]{2}$/.test(v) || 'If Absent enter <strong>Ab</strong>'],

            
            // -----------------dropdown------------------
            selection:['All students','Absent students']
        }
        
        
    },

    
   

    methods:{

        filterStudents(){
            if(this.filtering=='Absent students'){
                this.showHighMark=false
                this.getAbsentStudent()
            }else if(this.filtering=='All students'){
                this.showHighMark=false
                this.getAllStudent()
            }else if(this.filtering=='High marks'){
                this.showHighMark=true
            }
        },

        getAbsentStudent(){
            this.axios.get(this.$apiUrl+"/api/v1.0/MarkManagement/exams/"+this.examDetails.examID+'/absent')
            .then(Response=>(
                this.students=Response.data.mark.students
            ))
        },

        getHighMarksStudent(){
            if(this.markValid==true){
                console.log(this.highMark)
                this.axios.get(this.$apiUrl+"/api/v1.0/MarkManagement/exams/"+this.examDetails.examID+"/marksAbove",{
                    params:{
                        mark: this.highMark
                    }
                })
                .then(Response=>(
                    console.log(Response.data.mark.students),
                    this.students=Response.data.mark.students
                    
                ))
            }
        },



        getAttendance(){
            this.axios.get(this.$apiUrl+"/api/v1.0/MarkManagement/exams/"+this.examDetails.examID+"/attendCount")
            .then(Response=>(
                this.presentCount=Response.data.present_count,
                this.absentCount=Response.data.absent_count
            ))
        },


        markLimit (value) {
            if(value !='Ab'){
                if(value <= this.totalMark){
                    this.markValid=true
                    return true
                }else{
                    this.markValid=false
                    return "Invalid mark"
                }
            }else {
                this.markValid=true
                return true
            }
        },
  

        getAllStudent(){
            this.axios.get(this.$apiUrl+"/api/v1.0/MarkManagement/exams/"+this.examDetails.examID)
            .then(Response=>(
                this.students=Response.data.mark.students,
                this.students.forEach(elements=>{
                    elements.showEdit=false
                }),

                this.totalMark=Response.data.mark.totalMark
            ))
            

        },


        markStudentMarks(studentID,mark){
            if(this.markValid==true){
                this.btnDisabled=true
                this.axios.patch(this.$apiUrl+"/api/v1.0/MarkManagement/students/"+studentID+"/exams/"+this.examDetails.examID,{
                    mark:mark
                })
                .then(Response=>{
                    if(Response.data.success == true){
                        this.successfulAlert=true
                        this.btnDisabled=false
                    }else{
                        this.unSuccessfulAlert=true
                        this.btnDisabled=false
                    }
                })
                .catch(error => {
                    this.btnDisabled=false
                    this.unSuccessfulAlert=true
                    console.log(error)
                    
                })
            }
        },  

        cancelEdit(){
            this.isEditing = !this.isEditing;
            
        },

        StudentAddSuccessAlert(success){
            this.getAllStudent()
            this.getAttendance()
            this.addStudentSuccessful = success;
        },
        
        StudentAddFaileAlert(failed){
            this.addStudentUnsuccessful = failed;
        },
        
      
    }
}
</script>

<style scoped>
    .centered-input >>> input {
        text-align: center
    }
</style>
