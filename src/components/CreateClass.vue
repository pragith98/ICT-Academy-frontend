<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>

            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Staff delete <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Staff delete <strong>successful</strong> </v-snackbar>
            
            
 

            <template>
                <v-card flat>
                    <v-card-title class="heading-1 blue lighten-4 primary--text">Create Class</v-card-title>
                    
                    <v-stepper v-model="e1" flat>
                        <v-stepper-header>
                            <v-stepper-step :complete="e1 > 1" step="1">
                                Insert Class Details
                            </v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step :complete="e1 > 2" step="2">
                                Select Teacher
                            </v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step :complete="e1 > 3" step="3">
                                Select Subject
                            </v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step step="4">
                                Finish
                            </v-stepper-step>
                        </v-stepper-header>
                        
                        <v-stepper-items>
                            <v-stepper-content step="1">
                                <v-card color="grey" class="mb-12" height="200px" flat></v-card>
                                <v-btn color="primary" @click="e1=2">Continue</v-btn>
                                <v-btn text>Cancel</v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="2">
                                <v-card color="grey" class="mb-12" height="200px" flat></v-card>
                                <v-btn color="primary" @click="e1=3">Continue</v-btn>
                                <v-btn text>Cancel</v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="3">
                                <v-card color="grey" class="mb-12" height="200px" flat></v-card>
                                <v-btn color="primary" @click="e1=4">Continue</v-btn>
                                <v-btn text>Cancel</v-btn>
                            </v-stepper-content>

                            <v-stepper-content step="4">
                                <v-card color="grey" class="mb-12" height="200px" flat></v-card>
                                <v-btn color="primary" @click="e1=1">Continue</v-btn>
                                <v-btn text>Cancel</v-btn>
                            </v-stepper-content>
                        </v-stepper-items>
                        

                       
                    </v-stepper>

                </v-card>
            </template>

            
            
        </v-container>
    </div>
 
    
</template>

<script>
    

    export default {
        components:{
            
        },
        data () {
            return {
                e1: 1,

                breadcrumbs: [
                    { text: 'Classes', disabled: false, href: '/Classes' },
                    { text: 'CreateClass', disabled: true, href: '/Class/CreateClass' }
                ],

                successAlert:false,
                unsuccessAlert:false,
            }
        },

        methods: {
            deleteAlert(success){
                this.successAlert = success;
            },
            faileAlert(failed){
                this.unsuccessAlert = failed;
            },
        }
    }
</script>
            





            
        
        

