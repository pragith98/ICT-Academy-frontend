<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="teal" small block dark depressed  v-bind="attrs" v-on="on">Edit<v-icon dark right>mdi-pencil</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Edit Subject Category</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text style="height: 200px;">
            <v-form ref="form" v-model="valid" lazy-validation>
                
                <fieldset class="px-5 pb-3">
                    <legend><v-card-text class="grey--text">Category Details</v-card-text></legend>
                    <v-row justify="center" dense >
                        <v-col cols="12" md="12" sm="12">
                            <v-text-field :rules="categoryRules" label="Category" prepend-icon="mdi-format-align-center" v-model="category"></v-text-field>
                        </v-col>
                    </v-row>
                </fieldset>
                
            </v-form>

        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn   @click="dialog = false, failedAlert()" outlined color="grey">Cancel</v-btn>
            <v-btn :disabled="!valid || !category" color="primary" @click="Save(), successAlert(), dialog = false" depressed>Save
                <v-icon left>mdi-content-save</v-icon>
            </v-btn>
        </v-card-actions>

      </v-card>
      
    </v-dialog>
  </v-row>
</template>



<script>
export default {
    props:['subjecCategory'],
    data(){
        return{
            dialogm1: '',
            dialog: false,

            valid:true,

            category:this.subjecCategory.name,
            

            
            // -----------Validation rules-----------
            categoryRules: [v=> !!v || 'Category is required', v => /^[a-zA-Z_ ]*$/.test(v) || 'Must be text only', v=> (v && v.length >2)|| 'Name must be greater than 2'],


        
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
                console.log(this.category);
                
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