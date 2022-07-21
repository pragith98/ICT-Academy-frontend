<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn :disabled="!studentID|| !valid" @click="getClasses()"   width="8px"  block class="primary" depressed  v-bind="attrs" v-on="on">Show classes</v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Classes</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text style="height: 800px;">
            <div>
                <v-card-text>This is the list of <strong>{{student.studentName}}</strong>'s enrolled classes. Now, You can pay for those classes.</v-card-text>
                <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line ></v-text-field></v-card-title>
                
                <template>
                    <v-data-table :headers="headers" :items="classes" :search="search" >
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-card-actions>
                                <v-badge bordered :content="item.paymentStatus" :value="item.paymentStatus>1" color="error">
                                    <app-PayDailyFee @success="paymentSuccessAlert($event)" @failed="paymentFaileAlert($event)" :show="item.paymentStatus" :student="item" :classDetails="item" class="ml-2"></app-PayDailyFee>
                                </v-badge>
                            </v-card-actions>
                        </template>
                    </v-data-table>
                </template>
                
            </div>
            
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn  color="primary"  depressed  @click="dialog=false">OK</v-btn>
        </v-card-actions>

        <!-- --------------------------------------------------------alerts-------------------------------------- -->
        <v-snackbar v-model="successAlert" :timeout="3000" absolute bottom color="green"><v-icon left>mdi-check</v-icon>Payment has been <strong>successfully</strong> </v-snackbar>
        <v-snackbar v-model="unsuccessAlert" :timeout="3000" absolute bottom color="red"><v-icon left>mdi-alert-outline</v-icon>Payment has been <strong>failed</strong></v-snackbar>
        <!-- --------------------------------------------------------alerts-------------------------------------- -->
        
      </v-card>
      
    </v-dialog>
  </v-row>
</template>



<script>
import PayDailyFee from './PayDailyFee.vue'

export default {
    props:['studentID','valid','openDialog'],

    components:{
        'app-PayDailyFee':PayDailyFee
    },

    data(){
        return{
            
            dialog: this.openDialog,
            search: '',
            
            headers: [
                { text: 'CLASS',align: 'start', sortable: false, value:'className'},
                { text: '', sortable: false, value: 'actions',align:'end'},
            ],

            classes: [],
            student:[],

            successAlert:false,
            unsuccessAlert:false,
            
        }
        
        
    },

   

    methods:{

        getClasses(){
            this.axios.get(this.$apiUrl+"/api/v1.0/EnrollmentManagement/students/"+this.studentID).then(Response=>{
                this.student=Response.data.enrollment.data[0],
                //console.log(Response.data.enrollment.data[0].classes)
                this.classes=Response.data.enrollment.data[0].classes,

                this.classes.forEach(element => {
                    if(element.paymentStatus == '0'){
                        element.paymentStatusText=false
                    }else if(element.paymentStatus == '1'){
                        element.paymentStatusText=true
                    }
                })

                this.classes.forEach(element => {
                    element.studentID = this.student.studentID,
                    element.studentName = this.student.studentName
                })
                //console.log(this.classes)
            })
        },


        paymentSuccessAlert(success){
            this.getClasses()
            this.successAlert = success;

        },
        paymentFaileAlert(failed){
            this.unsuccessAlert = failed;
        },
       

        
        
        
        
      
    }
}
</script>


