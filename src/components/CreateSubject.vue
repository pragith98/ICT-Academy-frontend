<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="primary" dark  depressed  v-bind="attrs" v-on="on">Add New Subject<v-icon dark right>mdi-plus</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue lighten-4 primary--text">Create Subject</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text style="height: 800px;">
            <v-form ref="form" v-model="valid" lazy-validation>
                
                <fieldset class="px-5 pb-3" :hidden="hideTable">
                    <legend><v-card-text class="grey--text">Subject Details</v-card-text></legend>
                    <v-row justify="center" dense >
                            <v-col cols="12" md="6" sm="6">
                                <v-text-field :rules="subjectRules" label="Subject" prepend-icon="mdi-format-align-center" v-model="subject"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6" sm="6">
                                <v-select :items="medium" v-model="getMedium" :rules="mediumRules" label="Medium" prepend-icon="mdi-web" required></v-select>
                            </v-col>
                    </v-row>
                </fieldset>
                <fieldset class="px-5 pb-3">
                    <legend><v-card-text class="grey--text">Category Details</v-card-text></legend>

                    
                    <div :hidden="hideTable">
                        <v-col cols="12" md="12" sm="12">
                            <v-text-field :rules="categoryRules" label="Category" prepend-icon="mdi-candy-outline" v-model="categoryName" readonly hint="Add category from below table"></v-text-field>
                            <v-card-text class="grey--text">
                                * Add category from below table
                            </v-card-text>
                        </v-col>
                        <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search Category" single-line hide-details></v-text-field></v-card-title>
                        <v-data-table :headers="headers" :items="categories" :search="search" :items-per-page="5">
                            <template v-slot:item="row">
                                <tr>
                                    <td>{{row.item.name}}</td>
                                    <td>
                                        <v-btn @click="category=row.item.id, categoryName=row.item.name" depressed color="primary" outlined>Add</v-btn>
                                    </td>
                                </tr>
                            </template>
                        </v-data-table>
                        <v-divider></v-divider>
                        <v-row>
                            <v-card-text class="grey--text">
                                * If you won't find the category from the table, 
                            </v-card-text>
                            <v-col class="text-center my-3">
                                <v-btn color="primary" depressed @click="hideTable= !hideTable" outlined>create a new category</v-btn>
                            </v-col>
                        </v-row>
                    </div>
                    
                    
                    
                    
                    <div :hidden="!hideTable">
                        <v-card-text class="grey--text">
                            * Create new Category
                        </v-card-text>
                        <v-row>
                            <v-col cols="12" md="6" sm="6">
                                <v-text-field label="New Category" prepend-icon="mdi-candy-outline" v-model="newCategory" :error-messages="errormsg"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="6" align-self="center">
                                <v-btn depressed color="primary" outlined @click="createCategory()">Create Category</v-btn>
                                <v-btn outlined color="grey" class="ml-2" @click="hideTable = !hideTable">Cancel</v-btn>
                            </v-col>
                        </v-row>
                    </div>
                    
                    
                </fieldset>
            </v-form>
            
          

        </v-card-text>
        <v-divider></v-divider>




        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn   @click="dialog = false, failedAlert()" outlined color="grey">Cancel</v-btn>
            <v-btn :disabled="!valid || !subject || !getMedium || !categoryName" color="primary" @click="Save(), successAlert(), dialog = false" depressed>Create</v-btn>
        </v-card-actions>

        <v-snackbar v-model="categoryCreated" :multi-line="multiLine">
            Category Create successfully. Now you can add it from the table.
            <template v-slot:action="{ attrs }">
                <v-btn color="red" text v-bind="attrs" @click="categoryCreated = false">Close</v-btn>
            </template>
        </v-snackbar>
        
      </v-card>
      
    </v-dialog>
  </v-row>
</template>



<script>
export default {
    
    data(){
        return{
            dialogm1: '',
            dialog: false,

            valid:true,

            subject:'',
            getMedium:'Sinhala',
            category:'',
            categoryName:'',
            newCategory:'',

            errormsg:null,
            categoryCreated:false,

            hideTable:false,

            multiLine: true,


            search: '',
            headers: [
                { text: 'Category',align: 'start', sortable: false, value:'name'},
                { text: '', sortable: false, value: 'id',align:'right'},
            ],

            categories: [
                {name:'Ordinary Level',id:'cat001'},
                {name:'Advanced Level',id:'cat002'},
                {name:'Scholarship',id:'cat003'},
                {name:'Professional',id:'cat004'}
            ],
            
            // -----------Validation rules-----------
            subjectRules: [v=> !!v || 'Subject is required', v => /^[a-zA-Z_ ]*$/.test(v) || 'Must be text only', v=> (v && v.length >2)|| 'Name must be greater than 2'],

            mediumRules: [v=> !!v || 'Medium is required'],

            categoryRules: [v=> !!v || 'Category is required'],


            // -----------dropdown list-----------
            medium:['Sinhala', 'English', 'Tamil']

        
        }
        
        
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      }
    },

    methods:{
        Save(){
            if(this.$refs.form.validate()){
                console.log('fname:'+this.fname+' lname:'+this.lname+' tp:'+this.tp+' email:'+this.email+' address:'+this.address+' bday:'+this.date+' gender:'+this.getGender);
                
            }  
        },

        createCategory(){
            var rule=/^[a-zA-Z_ ]*$/;
            if(!rule.test(this.newCategory)){
                this.errormsg="Must be text only"
            }else if(this.newCategory.length<3){
                this.errormsg="Name must be greater than 2"
            }else{
                this.errormsg=null
                console.log(this.newCategory)
                this.categoryCreated=true
                this.hideTable=false
            }
        },

        successAlert(){
                this.$emit('success',true)
        },
        failedAlert(){
            this.$emit('failed',true)
        }

       

        
        
        
        
      
    }
}
</script>


<style scoped>
    fieldset{
        border-color: rgb(225, 225, 225);
        border-style: solid;
        border:0.1;
        border-style: solid;
    }

</style>