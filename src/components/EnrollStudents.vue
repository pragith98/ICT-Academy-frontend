<template>
  <v-row justify="start">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="primary" small dark depressed  v-bind="attrs" v-on="on">Enroll Students<v-icon dark right>mdi-link-variant</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue lighten-4 primary--text">Class - {{classDetails.name}}</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text style="height: 800px;">
            <v-form ref="form" v-model="valid" lazy-validation>
                
                <div>
                    
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search Students" single-line hide-details ></v-text-field></v-card-title>
                    <v-card-text>*Use Name OR ID to search for a student</v-card-text>
                    <v-data-table :headers="headers" :items="students" :search="search">
                        <template v-slot:item="row">
                            <tr>
                                <td>{{row.item.fname}} {{row.item.lname}}</td>
                                <td>{{row.item.id}}</td>
                                <td>
                                    <v-btn @click="addStudent(row.item.id,classDetails.id)"  depressed color="primary" outlined>Add to Class</v-btn>
                                </td>
                            </tr>
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

        <v-snackbar v-model="addSuccessAlert" :timeout="2000" absolute bottom left color="green">Student has been added to the class</v-snackbar>
        
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

            errormsg:null,
            

            addSuccessAlert:false,

            


            search: '',
            headers: [
                { text: 'Student',align: 'start', sortable: false, value:'fname'},
                { text: 'ID',align: 'start', sortable: false, value:'id'},
                { text: '', sortable: false, value: 'id',align:'end'},
            ],

            students: [
                {fname:'Saman', lname:'Herath', id:'2021'},
                {fname:'Dasun', lname:'Rathnayake', id:'2028'},
                {fname:'Kasun', lname:'Bandara', id:'2035'},
                {fname:'Maheshi', lname:'Ranathunga', id:'2077'},
                {fname:'Saman', lname:'Herath', id:'2021'},
                {fname:'Dasun', lname:'Rathnayake', id:'2028'},
                {fname:'Kasun', lname:'Bandara', id:'2035'},
                {fname:'Maheshi', lname:'Ranathunga', id:'2077'},
                {fname:'Saman', lname:'Herath', id:'2021'},
                {fname:'Dasun', lname:'Rathnayake', id:'2028'},
                {fname:'Kasun', lname:'Bandara', id:'2035'},
                {fname:'Maheshi', lname:'Ranathunga', id:'2077'},
                {fname:'Saman', lname:'Herath', id:'2021'},
                {fname:'Dasun', lname:'Rathnayake', id:'2028'},
                {fname:'Kasun', lname:'Bandara', id:'2035'},
                {fname:'Maheshi', lname:'Ranathunga', id:'2077'},
                {fname:'Saman', lname:'Herath', id:'2021'},
                {fname:'Dasun', lname:'Rathnayake', id:'2028'},
                {fname:'Kasun', lname:'Bandara', id:'2035'},
                {fname:'Maheshi', lname:'Ranathunga', id:'2077'},
                
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


