<template>
    <div>
        
        <v-container>
            <!-- <h1 class="title font-weight-black grey--text">CLASSES</h1> -->
            <v-row class="mt-10">
                <v-col cols="12" >
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <v-card max-width="500" flat style="margin: auto">
                            <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Login</v-card-title>
                            
                            <v-col cols="12" >
                                <v-row dense style="padding:12px">
                                    <v-col cols="12" md="12" sm="12" >
                                        <v-text-field v-model="userName" :rules="userNameRules"  label="Username" prepend-inner-icon="mdi-account" icon required></v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="12" sm="12" >
                                        <v-text-field v-model="password" :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'" :rules="passwordRules" :type="show ? 'text' : 'password'" name="input-10-2" hint="At least 8 characters" label="Password" @click:append="show = !show" prepend-inner-icon="mdi-lock" required></v-text-field>
                                    </v-col>
                                </v-row>

                                <v-card-actions>
                                    <v-row>
                                        <v-col cols="12" md="12" sm="12">
                                            <v-btn :loading="loading" :disabled="!valid || !userName || !password" x-large block depressed color="primary" @click="login()">Login</v-btn>
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
                loading:false,
                userName:'',
                password:'',

                token:'',

                userNameRules: [v=> !!v || 'Username is required'],
                passwordRules: [v=> !!v || 'Password is required', v=> (v && v.length >8)|| 'Password must be greater than 8'],
                // rules: {
                //     required: value => !!value || 'Required.',
                //     min: v => v.length >= 8 || 'Min 8 characters',
                //     emailMatch: () => (`The email and password you entered don't match`),
                // },
            }
                
        },
            
        watch:{
            loading(val){
                if(!val) return
                setTimeout(()=>(this.loading=false),3000)
            }
        },

        methods:{
            // login(){
            //     if(this.$refs.form.validate()){
            //         this.loading=true,
            //         console.log("email: "+this.email+", Password: "+this.password)
            //     }
            // },

            //localStorage.setItem('branch', 'BRNCH001') //set localStorage to branch details
            //localStorage.setItem('userID', 'STAFF001') //set localStorage to staff details

            login(){
                if(this.$refs.form.validate()){
                    this.loading=true
                    this.axios.post(this.$apiUrl+"/api/v1.0/UserManagement/users/login",{
                        username:this.userName,
                        password:this.password
                    })
                    .then(Response=>{
                        if(Response.data.success == true){
                            this.loading=false
                            this.token=Response.data._token
                            this.Reset();
                            this.successAlert=true;
                        }else{
                            this.unsuccessAlert=true;
                            this.loading=false
                        }
                    })
                    .catch(error => {
                        this.loading=false
                        this.unsuccessAlert=true;
                        console.log(error.data)
                        
                    });
                }

            },

            Reset() {
                this.$refs.form.reset()
            },
        }
        
    }
</script>
