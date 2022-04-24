<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn small class="teal" dark depressed  v-bind="attrs" v-on="on">Edit<v-icon dark right>mdi-pencil</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Edit Branch</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text style="height: 200px;">
            <v-form ref="form" v-model="valid" lazy-validation>
                
                <v-row style="padding:12px">
                    <v-col>
                        <v-row dense>
                            <v-col cols="12" md="6" sm="6">
                                <v-text-field :rules="nameRules" v-model="branchName" label="Branch Name" prepend-icon="mdi-sitemap" required ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="6">
                                <v-text-field maxlength="10" :rules="tpRules" v-model="tp"  label="Telephone No." prepend-icon="mdi-phone-classic" required ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="6">
                                <v-text-field :rules="addressRules" v-model="address"  label="Address" prepend-icon="mdi-map-marker" required ></v-text-field>
                            </v-col>
                            <v-col cols="12" md="6" sm="6">
                                <v-slider :rules="hallRules" class="mt-xl-5 mt-lg-5" prepend-icon="mdi-home-group" label="Hall Count" v-model="halls" thumb-label="always" min="1" max="10" ticks="always" tick-size="4"></v-slider>
                            </v-col>
                        </v-row>



                        
                    </v-col>
                </v-row>
                
            </v-form>

        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn   @click="dialog = false, failedAlert()" outlined color="grey">Cancel</v-btn>
            <v-btn :disabled="!valid || !tp || !address || !halls" color="primary" @click="updateBranch(), successAlert(), dialog = false" depressed>Save
                <v-icon left>mdi-content-save</v-icon>
            </v-btn>
        </v-card-actions>

      </v-card>
      
    </v-dialog>
  </v-row>
</template>



<script>
    export default {
        components:{
            
        },
        data () {
            return {

                dialog: false,

                valid:true,
                
                branchName:'',
                tp:'',
                address:'',
                halls:'',
                multiLine:true,



                // -----------Validation rules-----------
                nameRules: [v=> !!v || 'Name is required', v => /^[a-zA-Z_ ]*$/.test(v) || 'Must be text only', v=> (v && v.length >3)|| 'Name must be greater than 3'],
                tpRules: [v=> !!v || 'Telephone no. is required', v => /^\d+$/.test(v) || 'Must be a number', v=> (v && v.length ==10)|| 'Telephone no. must be 10'],
                addressRules: [v=> !!v || 'Address is required', v=> (v && v.length >5)|| 'Address must be greater than 5'],
                hallRules: [v=> !!v || 'Hall is required', v => /^\d+$/.test(v) || 'Must be a number'],

                

                // successAlert:false,
                // unsuccessAlert:false,

                
            }
        },

        methods: {
            

            Reset() {
                this.$refs.form.reset()
            },

            scrollToTop() {
                window.scrollTo(0, 0);
            },


            updateBranch(){
                if(this.$refs.form.validate()){
                    
                    console.log(this.halls)
                    this.Reset()
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
    .v-application .justify-end {
        justify-content: center !important;
    }
</style>