<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn @click="getExam()" class="primary" dark small block  depressed  v-bind="attrs" v-on="on">view<v-icon dark right>mdi-account</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Exam - {{examDetails.exam}}
            <v-spacer></v-spacer>
            <v-btn depressed color="blue-grey" dark @click="isEditing = !isEditing" v-if="!isEditing"> Edit
                <v-icon right>mdi-account-edit</v-icon>
            </v-btn>  
        </v-card-title>
        
        <v-divider></v-divider>
        <v-card-text >
            <v-form ref="form" v-model="valid" lazy-validation  :readonly="!isEditing">
                <v-row style="padding:12px">
                    <v-col>
                        <fieldset class="px-5 mb-3">
                            <legend><v-card-text class="grey--text">Exam Details</v-card-text></legend>
                            <v-row dense>
                            
                                <v-col cols="12" md="12" sm="12">
                                    <v-text-field v-model="examName" label="Exam Name" prepend-icon="mdi-file-document-edit" :rules="nameRules" required ></v-text-field>
                                </v-col>
                                
                                <v-col cols="12" md="6" sm="6">
                                    <v-text-field v-model="totalMark" placeholder="eg: 100" :rules="markRules" label="Total Mark" prepend-icon="mdi-flag-triangle" required maxlength="3" ></v-text-field>
                                </v-col>
                                
                                <v-col cols="12" md="6" sm="6">
                                    <template>
                                        <div>
                                            <v-menu :disabled="!isEditing" ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                                <template v-slot:activator="{ on, attrs }">
                                                    <v-text-field v-model="date" label="Conducting Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :rules="dateRules"></v-text-field>
                                                </template>
                                                <v-date-picker @input="menu = false" v-model="date" :active-picker.sync="activePicker"  :min="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" ></v-date-picker>
                                            </v-menu>
                                        </div>
                                    </template>
                                </v-col>

                            </v-row>
                        </fieldset>

                        <fieldset class="px-5">
                            <legend><v-card-text class="grey--text">Subject Details</v-card-text></legend>
                            <v-row dense>

                                <v-col cols="12" md="6" sm="6">
                                    <v-text-field disabled v-model="category.categoryName" prepend-icon="mdi-candy-outline"></v-text-field>
                                </v-col>

                                <v-col cols="12" md="6" sm="6">
                                    <v-text-field disabled v-model="subject.subjectName" prepend-icon="mdi-format-align-center"></v-text-field>
                                </v-col>

                            </v-row>
                        </fieldset>

                        <fieldset class="px-5 mb-3">
                            <legend><v-card-text class="grey--text">Class Details</v-card-text></legend>
                            <v-row dense>
                            
                                <v-col cols="12" md="12" sm="12">
                                    <v-text-field disabled v-model="classs.className" prepend-icon="mdi-home-variant"></v-text-field>
                                </v-col>
                                
                            </v-row>
                        </fieldset>
                    </v-col>
                </v-row>
            </v-form>
            
          

        </v-card-text>
        <v-divider></v-divider>




        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn   @click="dialog = false" color="primary" v-if="!isEditing" depressed>OK</v-btn>
            <v-btn   @click="cancelEdit(),getExam()" outlined color="grey" v-if="isEditing">Cancel</v-btn>
            <v-btn @click="updateExam()" :loading="loading" :disabled="!valid" depressed v-if="isEditing" color="primary">Save
                <v-icon left>mdi-content-save</v-icon>
            </v-btn>
        </v-card-actions>

         <!-- ---------------------------alerts -------------------------------------------->
        <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left color="green">Exam details has been updated</v-snackbar>
        <v-snackbar :timeout="3000" v-model="hasNotSaved" color="red"  absolute bottom left ><v-icon left>mdi-alert-outline</v-icon>Update failed </v-snackbar>
         <!-- ---------------------------alerts -------------------------------------------->

      </v-card>
    </v-dialog>
  </v-row>
</template>



<script>

export default {
    props:['examDetails'],
    data(){
        return{
            valid:true,
            dialog:false,
            loading:false,
            examName:'',
            totalMark:'',
    

            activePicker: null,
            date: null,
            menu: false,

            category:[{
                categoryID:null, categoryName:null
            }],

            subject:[{
                subjectID:null, subjectName:null,medium:null
            }],

            classs:[{
                classID:null, className:null
            }],


            breadcrumbs: [
                { text: 'Exams', disabled: false, href: '/Exams' },
                { text: 'CreateExams', disabled: true, href: '/Exams/CreateExams' }
            ],


            isEditing: null,
            hasSaved: false,
            hasNotSaved:false,


            // -----------Validation rules-----------

            markRules: [v=> !!v || 'Total mark is required', v => /^\d+$/.test(v) || 'Must be a number', v=> (v !=0)|| 'must be greater than 0'],

            nameRules: [v=> !!v || 'Class name is required', v=> (v && v.length >3)|| 'Name must be greater than 3'],

            subjectRules: [v=> !!v || 'This field is required'],

            dateRules: [v=> !!v || 'Conducted date is required'],

        

        
        }
        
        
    },

    

    methods:{  

        getExam(){
            this.axios.get(this.$apiUrl+"/api/v1.0/ExamManagement/exams/"+this.examDetails.examID)
            .then(Response=>{
                this.date=Response.data.exam.data[0].date,
                this.totalMark=Response.data.exam.data[0].totalMark,
                this.examName=Response.data.exam.data[0].exam,
                this.category=Response.data.exam.data[0].category,
                this.subject=Response.data.exam.data[0].subject,     
                this.classs=Response.data.exam.data[0].class
               
            })
        },

        updateExam(){
            if(this.$refs.form.validate()){
                const LogedUser = JSON.parse(localStorage.getItem('user'));
                this.loading=true
                this.axios.patch(this.$apiUrl+'/api/v1.0/ExamManagement/exams/'+this.examDetails.examID,{
                    exam:this.examName,
                    totalMark:this.totalMark,
                    date:this.date,
                    classID:this.classs.classID,
                    subjectID:this.subject.subjectID,
                    categoryID:this.category.categoryID,
                    branchID: LogedUser.employee.branch.branchID,

                })
                .then(Response=>{
                    if(Response.data.success == true){
                        this.hasSaved = true;
                        this.isEditing = !this.isEditing;
                        this.reCreate()
                        this.loading=false
                    }else{
                        this.hasSaved = false;
                    }
                }).catch(error => {
                    this.loading=false
                    console.log(error.data)
                    this.hasNotSaved=true
                });
                
            }  
        },


        

       

        
        
        
        cancelEdit(){
            this.isEditing = !this.isEditing;
            
        },

        reCreate(){
            this.$emit('success',true)
        },
        
      
    }
}
</script>


<style scoped>
    .v-application .justify-end {
        justify-content: center !important;
    }

    fieldset{
        border-color: rgb(225, 225, 225);
        border-style: solid;
        border:0.1;
        border-style: solid;
    }
</style>