<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn @click="getStudentsEnrolledClasses()" class="orange" small dark depressed  v-bind="attrs" v-on="on">{{task}}</v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Free Cards</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                
                <div>
                    <v-card-text>Free cards of <strong>{{studentDetails.studentName}}</strong>. </v-card-text>
                    <v-card-title><v-spacer></v-spacer><v-text-field persistent-hint hint="*Use Name OR ID to search for a class" v-model="search" append-icon="mdi-magnify" label="Search Class" single-line  ></v-text-field></v-card-title>
                   
                    <v-data-table :headers="headers" :items="classes" :search="search">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-switch color="red" @change="giveFreeCard(item.classID,item.freeCard)" inset v-model="item.freeCard" :label="switchLabel(item.freeCard)"></v-switch>
                                
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

        <v-snackbar v-model="addSuccessAlert" :timeout="3000" absolute bottom left color="green">Free Card has been added to the student</v-snackbar>
        <v-snackbar v-model="removeSuccessAlert" :timeout="3000" absolute bottom left color="green">Free Card has been removed from the student</v-snackbar>
        <v-snackbar v-model="failAlert" :timeout="3000" absolute bottom left color="red">Faild Operation</v-snackbar>
        
      </v-card>
      
    </v-dialog>
  </v-row>
</template>



<script>
export default {
    props:['studentDetails','task'],
    data(){
        return{
            
            dialog: false,
            valid:true,
            buttonName:'',
            

            errormsg:null,
            

            addSuccessAlert:false,
            removeSuccessAlert:false,
            failAlert:false,

            


            search: '',
            headers: [
                { text: 'CLASS',align: 'start', sortable: false, value:'className'},
                { text: 'FREE CARD', sortable: false, value: 'actions',align:'start'},
            ],

            classes: [],
            
            

        
        }
        
        
    },
    
    

    methods:{

        switchLabel (bool) {
            return bool?'Free Card':'No'
        },

        giveFreeCard(classID,bool){
            if(bool == true){

                this.axios.patch(this.$apiUrl+'/api/v1.0/EnrollmentManagement/students/'+this.studentDetails.studentID+'/classes/'+classID+'/freeClass',{
                    paymentStatus: '-1'
                })
                .then(Response=>{
                    if(Response.data.success == true){
                        this.addSuccessAlert=true
                    }else{
                        this.failAlert=true
                        this.getStudentsEnrolledClasses()
                    }
                })
                .catch(error => {
                    this.failAlert=true
                    this.getStudentsEnrolledClasses()
                    console.log(error.data)
                });
                
                
            }else{
                this.axios.patch(this.$apiUrl+'/api/v1.0/EnrollmentManagement/students/'+this.studentDetails.studentID+'/classes/'+classID+'/freeClass',{
                    paymentStatus: '1'
                })
                .then(Response=>{
                    if(Response.data.success == true){
                        this.removeSuccessAlert=true
                    }else{
                        this.failAlert=true
                        this.getStudentsEnrolledClasses()
                    }
                })
                .catch(error => {
                    this.failAlert=true
                    this.getStudentsEnrolledClasses()
                    console.log(error.data)
                });
            }
        },

        getStudentsEnrolledClasses(){
            this.axios.get(this.$apiUrl+"/api/v1.0/EnrollmentManagement/students/"+this.studentDetails.studentID).then(Response=>(
                this.classes=Response.data.enrollment.data[0].classes,
                
                this.classes.forEach(element => {
                    if(element.paymentStatus == 1){
                        element.freecard=false
                    }else if(element.paymentStatus == -1){
                        element.freecard=true
                    }
                })
                
            ))
        },

        

        
       

        
        
        
        
      
    }
}
</script>


<style scoped>
    .v-btn-toggle > .v-btn.v-btn--active{
        background-color: red !important;
        color:white !important;
    }
</style>


