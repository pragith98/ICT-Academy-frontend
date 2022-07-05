<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn @click="getStudentsNotInFreeCard()" class="blue-grey" dark depressed  v-bind="attrs" v-on="on">new Free Card<v-icon dark right>mdi-plus</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Create Free Card Student</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                
                <div>
                    <v-card-text>These students have <strong>not enrolled</strong> for any <strong>free-card</strong> yet. Here you can see their enrolled classes and change those as free-card classes.</v-card-text>
                    <v-card-title><v-spacer></v-spacer><v-text-field persistent-hint hint="*Use Name OR ID to search for a student" v-model="search" append-icon="mdi-magnify" label="Search Class" single-line ></v-text-field></v-card-title>
                    
                    <v-data-table :headers="headers" :items="students" :search="search">
                        <template v-slot:[`item.actions`]="{ item }">
                            <app-FreeCardClasses :studentDetails='item'></app-FreeCardClasses>
                        
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

        <v-snackbar v-model="addSuccessAlert" :timeout="2000" absolute bottom left color="green">Free Card has been added to the student</v-snackbar>
        <v-snackbar v-model="removeSuccessAlert" :timeout="2000" absolute bottom left color="green">Free Card has been removed from the student</v-snackbar>
        
      </v-card>
      
    </v-dialog>
  </v-row>
</template>



<script>
    import FreeCardClasses from './FreeCardClasses.vue'
    export default {
        components:{
            'app-FreeCardClasses':FreeCardClasses
        },
        props:['studentDetails'],
        data(){
            return{
                
                dialog: false,
                valid:true,
                

                errormsg:null,
                

                addSuccessAlert:false,
                removeSuccessAlert:false,

                


                search: '',
                headers: [
                    { text: 'STUDENT',align: 'start', sortable: false, value:'studentName'},
                    { text: 'ID',align: 'start', sortable: false, value:'studentID'},
                    { text: 'GRADE',align: 'start', sortable: true, value:'grade'},
                    { text: '', sortable: false, value: 'actions',align:'start'},
                ],

                students: [],
                
                

            
            }
            
            
        },
        
        

        methods:{

            getStudentsNotInFreeCard(){
                this.axios.get(this.$apiUrl+"/api/v1.0/EnrollmentManagement/students/notInFreeCard").then(Response=>(
                    this.students=Response.data.data
                ))
            },

        }
    }
</script>



