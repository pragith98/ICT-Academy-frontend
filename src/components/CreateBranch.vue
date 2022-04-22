<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>

            <!----------------------------- Alerts ---------------------------------->

            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Branch create <strong>failed</strong> </v-snackbar>
            
            <v-snackbar v-model="successAlert" :multi-line="multiLine">
                Branch Create successfully. Now you can add students, teachers and classes.
                <template v-slot:action="{ attrs }">
                    <v-btn color="red" text v-bind="attrs" @click="successAlert = false">Close</v-btn>
                </template>
            </v-snackbar>

            
            <!----------------------------- Alerts ---------------------------------->
 
            <v-form ref="form" v-model="valid" lazy-validation>

            
                <v-card flat max-width="750px" style="margin: auto">
                    <v-card-title class="heading-1 blue lighten-4 primary--text">Create Branch</v-card-title>
                    
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



                            <v-card-actions class="justify-end mt-2">
                                <v-spacer></v-spacer>
                                <v-btn   @click="Reset" outlined color="grey">Cancel</v-btn>
                                <v-btn :disabled="!valid || !tp || !address || !halls" color="primary"  depressed @click="createBranch()">Create</v-btn>
                            </v-card-actions>
                        </v-col>
                        
                        

                        
                    </v-row>
                    
                    
                </v-card>
            

            </v-form>
            
            
        </v-container>
    </div>
 
    
</template>

<script>
    
    

    export default {
        components:{
            
        },
        data () {
            return {

                valid:true,
                
                branchName:'',
                tp:'',
                address:'',
                halls:'',
                multiLine:true,

                breadcrumbs: [
                    { text: 'Branches', disabled: false, href: '/Branches' },
                    { text: 'Create Branch', disabled: true, href: '/Branches/CreateBranch' }
                ],


                // -----------Validation rules-----------
                nameRules: [v=> !!v || 'Name is required', v => /^[a-zA-Z_ ]*$/.test(v) || 'Must be text only', v=> (v && v.length >3)|| 'Name must be greater than 3'],
                tpRules: [v=> !!v || 'Telephone no. is required', v => /^\d+$/.test(v) || 'Must be a number', v=> (v && v.length ==10)|| 'Telephone no. must be 10'],
                addressRules: [v=> !!v || 'Address is required', v=> (v && v.length >5)|| 'Address must be greater than 5'],
                hallRules: [v=> !!v || 'Hall is required', v => /^\d+$/.test(v) || 'Must be a number'],

                

                successAlert:false,
                unsuccessAlert:false,

                
            }
        },

        methods: {
            

            Reset() {
                this.$refs.form.reset()
            },

            scrollToTop() {
                window.scrollTo(0, 0);
            },


            createBranch(){
                if(this.$refs.form.validate()){
                    this.successAlert=true
                    console.log(this.halls)
                    this.Reset()
                }

            },



        


        }
    }
</script>
            



<style scoped>
    .v-application .justify-end {
        justify-content: center !important;
    }
</style>

            
        
        

