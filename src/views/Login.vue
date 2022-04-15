<template>
    <div>
        
        <v-container>
            <h1 class="title font-weight-black grey--text">CLASSES</h1>
            <v-row>
                <v-col cols="12" >
                    <v-card max-width="500" flat style="margin: auto">
                        <v-card-title class="heading-1 blue lighten-4 primary--text">Login</v-card-title>
                        
                        <v-col cols="12" >
                            <v-row dense style="padding:12px">
                                <v-col cols="12" md="12" sm="12" >
                                    <v-text-field   label="Username/ Email" prepend-inner-icon="mdi-account" icon required></v-text-field>
                                </v-col>
                                <v-col cols="12" md="12" sm="12" >
                                    <v-text-field :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required, rules.emailMatch]" :type="show ? 'text' : 'password'" name="input-10-2" hint="At least 8 characters" label="Password" @click:append="show = !show" prepend-inner-icon="mdi-lock" required></v-text-field>
                                </v-col>
                            </v-row>

                            <v-card-actions>
                                <v-row>
                                    <v-col cols="12" md="12" sm="12">
                                        <v-btn x-large block depressed color="primary">Login</v-btn>
                                    </v-col>
                                    <v-col cols="12" md="12" sm="12">
                                        <v-btn text block depressed color="primary">Forgot Password?</v-btn><br>
                                    </v-col>
                                    
                                    
                                        
                                        <!-- <v-btn block depressed color="primary"></v-btn> -->
                                        <!-- <div>
                                            <v-card-text>forgot password?</v-card-text>
                                        </div> -->
                                    
                                </v-row>
                                
                                
                            </v-card-actions>
                        </v-col>

                        
                    </v-card>
                    
                    
                </v-col>

            </v-row>

        </v-container>
    </div>
</template>



<script>

    export default{

        data(){
            return{
                show:false,
                password:'password',
                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailMatch: () => (`The email and password you entered don't match`),
                },
            }
                
        },
            
        
    }
</script>
