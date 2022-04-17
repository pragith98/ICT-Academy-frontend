<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="primary" dark depressed  v-bind="attrs" v-on="on">Add new Free Card<v-icon dark right>mdi-plus</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue lighten-4 primary--text">Create Free Card Student</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                
                <div>
                    
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search Class" single-line hide-details ></v-text-field></v-card-title>
                    <v-card-text>*Use Name OR ID to search for a student</v-card-text>
                    <v-data-table :headers="headers" :items="students" :search="search">
                        <template v-slot:item="row">
                            <tr>
                                <td>{{row.item.fname}}</td>
                                <td>{{row.item.id}}</td>
                                <td>
                                    <app-FreeCardClasses :studentDetails='row.item'></app-FreeCardClasses>
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
                    { text: 'STUDENT',align: 'start', sortable: false, value:'fname'},
                    { text: 'ID',align: 'start', sortable: false, value:'id'},
                    { text: '', sortable: false, value: 'id',align:'start'},
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

            switchLabel (bool) {
                return bool?'Free Card':'No'
            },

            giveFreeCard(id,bool){
                if(bool == true){
                    this.addSuccessAlert=true
                    console.log(this.studentDetails.id,id,"   1")
                }else{
                    this.removeSuccessAlert=true
                    console.log(this.studentDetails.id,id,"   0")
                }
                
                
            }

            

            
        

            
            
            
            
        
        }
    }
</script>


<style scoped>
    .v-btn-toggle > .v-btn.v-btn--active{
        background-color: red !important;
        color:white !important;
    }
</style>


