<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable max-width="500px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn  class="blue-grey" dark depressed  v-bind="attrs" v-on="on">Add student<v-icon dark right>mdi-plus</v-icon></v-btn>
        </template>
        <v-card max-width="500" flat>
        <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Add student</v-card-title>
        <v-divider></v-divider>
        <v-card-text class="mt-2">
            Add individual student to the <strong>{{examDetails.exam}}</strong> marks list.
        </v-card-text>
        <v-card-text >
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-row justify="center" dense align="center">            
                    <v-col cols="12" md="12" sm="12">
                        <v-text-field  label="Student ID" placeholder="ICTAxxxxxxx"  :rules="studentIdRule" maxlength="11" v-model="studentID" clearable></v-text-field>
                    </v-col>
                </v-row>
            </v-form>    

        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn   @click="dialog = false" outlined color="grey">Cancel</v-btn>
            <v-btn :loading="loading" color="primary" @click="addToList()" :disabled="!valid || studentID==''"  depressed>Add to Attendance</v-btn>
        </v-card-actions>

      </v-card>

        <!-- --------------------------------------------------------alerts-------------------------------------- -->
        <v-snackbar v-model="addStudentUnsuccessful" :timeout="3000" absolute bottom color="red"><v-icon left>mdi-alert-outline</v-icon>Add student <strong>failed</strong>. Please check STUDENT ID</v-snackbar>
        <!-- --------------------------------------------------------alerts-------------------------------------- -->
    </v-dialog>


    
  
  
  
  </v-row>
  
</template>



<script>




export default {
    props:['examDetails'],
    data(){
        return{
            dialog: false,
            studentID:'',
            loading:false,
            valid:true,
            
            // -----------Validation rules-----------
            studentIdRule: [v=> !!v || 'Student ID is required', v=> /ICTA+\d\d\d\d\d\d\d/.test(v) || 'Invalid student ID', v=> (v && v.length ==11)|| 'Invalid student ID'],

            addStudentUnsuccessful:false
        
        }
        
        
    },
    

    methods:{
        
        addToList(){
            if(this.$refs.form.validate()){
                this.loading=true
                this.axios.post(this.$apiUrl+"/api/v1.0/MarkManagement/students",{
                    studentID: this.studentID,
                    examID:this.examDetails.examID
                
                }).then(Response=>{
                    if(Response.data.success == true){
                        this.dialog = false
                        this.successAlert();
                        this.loading=false
                        this.Reset();
                    }else{
                        //this.failedAlert();
                        this.addStudentUnsuccessful=true
                    }
                })
                .catch(error => {
                    this.loading=false
                    //this.failedAlert()
                    this.addStudentUnsuccessful=true
                    console.log(error.data)
                    
                });
            }
        },

        Reset () {
            this.$refs.form.reset()
        },

        

        
        

        successAlert(){
                this.$emit('success',true)
        },
        failedAlert(){
            this.$emit('failed',true)
        }

    },

    

}
</script>


<style scoped>
    fieldset{
        border-color: rgb(225, 225, 225);
        border-style: solid;
        border:0.1;
        border-style: solid;
    }

    .theme--light.v-btn.v-btn--disabled.v-btn--has-bg.toggle {
        background-color: teal !important;
        color:white !important;
    }

</style>