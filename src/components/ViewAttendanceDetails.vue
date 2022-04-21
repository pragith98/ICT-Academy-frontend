<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" small dark depressed outlined v-bind="attrs" v-on="on">Students<v-icon dark right>mdi-account-group</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue lighten-4 primary--text">Student Attendance</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text style="height: 800px;">
            <v-form ref="form" v-model="valid" lazy-validation>
                
                <div>
                    <v-card-text>Attendance Details of <strong>{{className}}</strong> on <strong>{{conductedDate}}</strong>  </v-card-text>
                    <v-card-title><v-spacer></v-spacer><v-text-field persistent-hint hint="* Use Name OR ID to search for a student" v-model="search" append-icon="mdi-magnify" label="Search" single-line ></v-text-field></v-card-title>
                    
                    <v-data-table :headers="headers" :items="students" :search="search">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-card-actions>
                                <v-switch color="blue" @change="updateAttendance(item.id,item.attendance)" inset v-model="item.attendance" :label="switchLabel(item.attendance)" class="mr-3"></v-switch>
                            </v-card-actions>
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

        <v-snackbar v-model="addSuccessAlert" :timeout="2000" absolute bottom left color="green">Attendance update successful</v-snackbar>
        
      </v-card>
      
    </v-dialog>
  </v-row>
</template>



<script>
export default {
    props:['classDetails', 'conductedDate','className'],
    data(){
        return{
            
            dialog: false,
            valid:true,

            errormsg:null,
            

            addSuccessAlert:false,

            


            search: '',
            headers: [
                { text: 'Student',align: 'start', sortable: false, value:'fname'},
                { text: 'ID',align: 'start', sortable: false, value:'id'},
                { text: '', sortable: false, value: 'actions',align:'end'},
            ],

            students: [
                {fname:'Saman', lname:'Herath', id:'2025', attendance:true},
                {fname:'Dasun', lname:'Rathnayake', id:'2028', attendance:true},
                {fname:'Kasun', lname:'Bandara', id:'2035', attendance:false},
                {fname:'Maheshi', lname:'Ranathunga', id:'2077', attendance:true},
                {fname:'Saman', lname:'Herath', id:'2043', attendance:false},
                {fname:'Dasun', lname:'Rathnayake', id:'2022', attendance:false},
                {fname:'Kasun', lname:'Bandara', id:'2038', attendance:true},
                {fname:'Maheshi', lname:'Ranathunga', id:'3477', attendance:true},
                {fname:'Saman', lname:'Herath', id:'2020', attendance:true},
                {fname:'Dasun', lname:'Rathnayake', id:'2078', attendance:true},
                {fname:'Kasun', lname:'Bandara', id:'2026', attendance:true},
                {fname:'Maheshi', lname:'Ranathunga', id:'2099', attendance:false},
                {fname:'Saman', lname:'Herath', id:'2001', attendance:false},
                {fname:'Dasun', lname:'Rathnayake', id:'2528', attendance:true},
                {fname:'Kasun', lname:'Bandara', id:'5035', attendance:true},
                {fname:'Maheshi', lname:'Ranathunga', id:'2448', attendance:true},
                {fname:'Saman', lname:'Herath', id:'2021', attendance:true},
                {fname:'Dasun', lname:'Rathnayake', id:'9328', attendance:true},
                {fname:'Kasun', lname:'Bandara', id:'2082', attendance:true},
                {fname:'Maheshi', lname:'Ranathunga', id:'2117', attendance:true},
                
            ],
            
            

        
        }
        
        
    },
    
    

    methods:{
        

        updateAttendance(id,bool){
            var attendance
            if(bool == true){
                attendance=1
                this.addSuccessAlert=true
                console.log(this.classDetails+" "+id+" "+attendance+" "+this.conductedDate)
            }else{
                attendance=0
                this.addSuccessAlert=true
                console.log(this.classDetails+" "+id+" "+attendance+" "+this.conductedDate)
            }
            
            
        },

        switchLabel (bool) {
            return bool?'Present ':'Absent  '
        },


        
       

        
        
        
        
      
    }
}
</script>


