<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn @click="getAllCategories(),getSubject()" class="teal" small block dark depressed  v-bind="attrs" v-on="on">Edit<v-icon dark right>mdi-pencil</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Edit Subject</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text style="height: 800px;">
            <v-form ref="form" v-model="valid" lazy-validation>
                
                <fieldset class="px-5 pb-3" :hidden="hideTable">
                    <legend><v-card-text class="grey--text">Subject Details</v-card-text></legend>
                    <v-row justify="center" dense >
                            <v-col cols="12" md="6" sm="6">
                                <v-text-field disabled :rules="subjectRules" label="Subject" prepend-icon="mdi-format-align-center" v-model="subject"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="6" sm="6">
                                <v-select :items="medium" v-model="getMedium" :rules="mediumRules" label="Medium" prepend-icon="mdi-web" required></v-select>
                            </v-col>
                    </v-row>
                </fieldset>
                <fieldset class="px-5 pb-3">
                    <legend><v-card-text class="grey--text">Category Details</v-card-text></legend>

                    
                    <div :hidden="hideTable">
                        <v-card-text class="grey--text">Select <strong>category</strong> from below menu</v-card-text>
                        <v-col cols="12" md="12" sm="12">
                            <v-card-text>
                                <v-autocomplete prepend-icon="mdi-candy-outline" :items="categories" v-model="category" :filter="categoryFilter" item-text='categoryName' item-value="categoryID" label="Category"  :rules="categoryRules"></v-autocomplete>
                            </v-card-text>
                        </v-col>
                       
                        
                        <v-card color="grey lighten-3" flat >
                            <v-card-text>
                                If you won't find the <strong>Category</strong>, please create new <strong>Category</strong>,
                            </v-card-text>
                            <v-col class="text-center my-3">
                                <v-btn color="primary" depressed @click="hideTable= !hideTable, hideActions= !hideActions" outlined>create a new category</v-btn>
                            </v-col>
                        </v-card>
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
                                <v-btn outlined color="grey" class="ml-2" @click="hideTable = !hideTable, hideActions= !hideActions">Cancel</v-btn>
                            </v-col>
                        </v-row>
                    </div>
                    
                    
                </fieldset>
            </v-form>
            
          

        </v-card-text>
        <v-divider></v-divider>



        <div :hidden="hideActions">
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn   @click="dialog = false, Reset ()" outlined color="grey">Cancel</v-btn>
                <v-btn :loading="loading" :disabled="!valid || !subject || !getMedium || !category" color="primary" @click="updateSubject()" depressed>Save
                    <v-icon left>mdi-content-save</v-icon>
                </v-btn>
            </v-card-actions>
        </div>
        

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
    props:["subjectDetails"],
    data(){
        return{

            sortBy: 'categoryID',
            sortDesc: true,
            loading:false,
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
            hideActions:false,

            multiLine: true,


            search: '',
            headers: [
                { text: 'Category',align: 'start', sortable: false, value:'categoryName'},
                { text: '', sortable: false, value: 'actions',align:'right'},
            ],

            categories: [],
            
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
        getSubject(){
            this.axios.get(this.$apiUrl+"/api/v1.0/SubjectManagement/subjects/"+this.subjectDetails.subjectID)
            .then(Response=>{
                
                this.category=Response.data.subject.data[0].category.categoryID;
                this.categoryName=Response.data.subject.data[0].category.categoryName;
                this.getMedium=Response.data.subject.data[0].medium;
                this.splitSubjectName(Response.data.subject.data[0].subjectName)
                
            })
        },

        splitSubjectName(subjectName){
            const str=subjectName;
            const first=str.split(' (').shift();
            this.subject=first;
        },

        categoryFilter (item, queryText) {
            const textOne = item.categoryName.toLowerCase()
            const textTwo = item.categoryID.toLowerCase()
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
        },


        updateSubject(){
            if(this.$refs.form.validate()){
                this.loading=true
                this.axios.patch(this.$apiUrl+'/api/v1.0/SubjectManagement/subjects/'+this.subjectDetails.subjectID,{
                    subjectName: this.subject+" ("+this.getMedium+")",
                    medium: this.getMedium,
                    categoryID: this.category
                })
                .then(Response=>{
                    
                    if(Response.data.success == true){
                        this.dialog = false
                        this.successAlert()
                        this.loading=false
                    }else{

                        this.failedAlert()
                    }
                })
                .catch(error => {
                    this.failedAlert()
                    console.log(error.data)
                    this.loading=false
                });

            }

        },

        getAllCategories(){
            this.axios.get(this.$apiUrl+"/api/v1.0/CategoryManagement/categories").then(Response=>(this.categories= Response.data.category.data) )
        },

        createCategory(){
            var rule=/^[a-zA-Z\s.]+$/;
            if(!rule.test(this.newCategory)){
                this.errormsg="Must be text only"
            }else if(this.newCategory.length<4){
                this.errormsg="Name must be greater than 3"
            }else{
                this.errormsg=null
                

                
                this.axios.post(this.$apiUrl+"/api/v1.0/CategoryManagement/categories",{
                    categoryName: this.newCategory
                })
                .then(Response=>{
                    if(Response.data.success == true){
                        this.newCategory=null
                        this.categoryCreated=true
                        this.hideTable=false
                        this.hideActions=false

                        this.getAllCategories()
                    }else{
                        console.log('error in category creation');
                    }
                }) 
                
            }
        },

        Reset () {
            this.$refs.form.reset()
            window.scrollTo(0, 0)
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