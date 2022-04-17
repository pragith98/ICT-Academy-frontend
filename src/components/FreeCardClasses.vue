<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="orange" small dark depressed  v-bind="attrs" v-on="on">Classes<v-icon dark right>mdi-google-classroom</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue lighten-4 primary--text">Free Cards of - {{studentDetails.fname}}</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
                
                <div>
                    
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search Class" single-line hide-details ></v-text-field></v-card-title>
                    <v-card-text>*Use Name OR ID to search for a class</v-card-text>
                    <v-data-table :headers="headers" :items="classes" :search="search">
                        <template v-slot:item="row">
                            <tr>
                                <td>{{row.item.name}}</td>
                                <td>{{row.item.id}}</td>
                                <td>
                                    <v-switch color="red" @change="giveFreeCard(row.item.id,row.item.freeCard)" inset v-model="row.item.freeCard" :label="switchLabel(row.item.freeCard)"></v-switch>
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
export default {
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
                { text: 'CLASS',align: 'start', sortable: false, value:'fname'},
                { text: 'ID',align: 'start', sortable: false, value:'id'},
                { text: 'FREE CARD', sortable: false, value: 'id',align:'start'},
            ],

            classes: [
                {name:'Sinhala 8', id:'clz8773', freeCard:true},
                {name:'Maths 8', id:'clz8343', freeCard:false},
                {name:'Science 9', id:'clz8003', freeCard:false},
                {name:'History 6', id:'clz8467', freeCard:true},
                {name:'Sinhala 7', id:'clz4473', freeCard:false},
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


