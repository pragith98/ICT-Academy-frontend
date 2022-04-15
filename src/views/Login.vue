<template>
    <div>
        
        <v-container>
            <!-- <h1 class="title font-weight-black grey--text">CLASSES</h1> -->
            <v-row class="mt-10">
                <v-col cols="12" >
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-card max-width="500" flat style="margin: auto">
                            <v-progress-linear :active="loading" :indeterminate="loading" absolute color="blue accent-4"></v-progress-linear>
                            <v-card-title class="heading-1 blue lighten-4 primary--text">Login</v-card-title>
                            
                            <v-col cols="12" >
                                <v-row dense style="padding:12px">
                                    <v-col cols="12" md="12" sm="12" >
                                        <v-text-field v-model="email" :rules="[rules.required]"  label="Username/ Email" prepend-inner-icon="mdi-account" icon required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12" sm="12" >
                                        <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="[rules.required]" :type="show ? 'text' : 'password'" name="input-10-2" hint="At least 8 characters" label="Password" @click:append="show = !show" prepend-inner-icon="mdi-lock" required></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-card-actions>
                                    <v-row>
                                        <v-col cols="12" md="12" sm="12">
                                            <v-btn :disabled="!valid || !email || !password" x-large block depressed color="primary" @click="login()">Login</v-btn>
                                        </v-col>
                                        <v-col cols="12" md="12" sm="12">
                                            <v-btn text block depressed color="primary" to="/ForgotPassword">Forgot Password?</v-btn><br>
                                        </v-col>
                                        
                                    </v-row>
                                    
                                    
                                </v-card-actions>
                            </v-col>

                            
                        </v-card>
                    </v-form>
                    
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
                valid:true,

                email:'',
                password:'',

                loading:false,

                rules: {
                    required: value => !!value || 'Required.',
                    min: v => v.length >= 8 || 'Min 8 characters',
                    emailMatch: () => (`The email and password you entered don't match`),
                },
            }
                
        },
            
        watch:{
            loading(val){
                if(!val) return
                setTimeout(()=>(this.loading=false),3000)
            }
        },

        methods:{
            login(){
                if(this.$refs.form.validate()){
                    this.loading=true,
                    console.log("email: "+this.email+", Password: "+this.password)
                }
            }
        }
        
    }
</script>
