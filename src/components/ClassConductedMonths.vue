<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="primary" small dark depressed  v-bind="attrs" v-on="on">Conducted Months<v-icon dark right>mdi-calendar-range</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Conducted Months</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text style="height: 800px;">
            <v-form ref="form" v-model="valid" lazy-validation>
                
                <div>
                    <v-card-text>Class conducted dates of <strong>{{classDetails.name}}</strong> </v-card-text>
                    
                     <v-card-title>
                        <v-spacer></v-spacer>
                         
                        <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field clearable v-model="search" label="Search"  readonly v-bind="attrs" v-on="on" hint="* Use date to search for a session" persistent-hint single-line></v-text-field>
                            </template>
                            <v-date-picker v-model="search" type="month" @input="menu = false" ></v-date-picker>
                        </v-menu>
                            
                        
                    </v-card-title>
                    



                    <v-data-table :headers="headers" :items="classes" :search="search">
                        <template v-slot:[`item.actions`]="{ item }">
                            <app-PayFeesStudents :classDetails="classDetails" :conductedDate="item.date"></app-PayFeesStudents>
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

        <v-snackbar v-model="addSuccessAlert" :timeout="2000" absolute bottom left color="green">Student has been removed from the class</v-snackbar>
        
      </v-card>
      
    </v-dialog>
  </v-row>
</template>



<script>
    
    import PayFeesStudents from './PayFeesStudents.vue'

    export default {
        props:['classDetails'],
        components:{
            'app-PayFeesStudents':PayFeesStudents,
        },

        data(){
            return{
                
                dialog: false,
                valid:true,


                addSuccessAlert:false,

                activePicker: null,
                date: '',
                menu: false,


                search: '',
                headers: [
                    { text: 'DATE',align: 'start', sortable: false, value:'date'},
                    { text: 'ATTENDANCE COUNT',align: 'start', sortable: false, value:'count', filterable:false},
                    { text: '', sortable: false, value: 'actions',align:'end'},
                ],

                classes: [
                    {date:'2022-01', count:20},
                    {date:'2022-02', count:5},
                    {date:'2022-03', count:14},
                    {date:'2022-04', count:10},
                    {date:'2022-05', count:20},
                    {date:'2022-06', count:12},
                    {date:'2022-07', count:20},
                    {date:'2022-08', count:20},
                    {date:'2022-09', count:20},
                    
                ],
                
                

            
            }
            
            
        },
        
        

        methods:{
            addStudent(studentID,classID){
                this.addSuccessAlert=true
                console.log(studentID+" "+classID)
            }

            

            
        

            
            
            
            
        
        }
    }
</script>


