<template>
    <v-row justify="end">
        <v-dialog v-model="dialog" max-width="700px" persistent>
            <template v-slot:activator="{ on, attrs }">
                
                <v-btn block depressed color="blue-grey" dark v-bind="attrs" v-on="on">Manage Profile</v-btn>
                
            </template>
            
            
                <v-card flat>
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Profile</v-card-title>
                    <v-divider></v-divider>
                       
                        <v-card-text > 

                            <v-responsive class="text-center">
                                <v-avatar  size="150" class="mb-2">
                                    <v-icon size="150" v-if="!imageUrl">mdi-account-circle</v-icon>
                                    <img :src="imageUrl" v-if="imageUrl">
                                </v-avatar> <br>
                                <v-btn @click="onPickFile" depressed class="white grey--text">
                                    <v-icon left>mdi-camera</v-icon>
                                    <span>upload image</span>
                                </v-btn>
                            </v-responsive>


                            <input type="file" v-show="false" ref="fileInput" accept="image/*" @change="onFilePicked">
                        
                        
                            <v-col cols="12" md="12" sm="6">
                                <v-card-subtitle>Email: samanthabandara@gmail.com</v-card-subtitle>
                            </v-col>

                            <fieldset class="px-5 pb-3 mb-2">
                                <legend> Username Change </legend>
                                <v-row justify="center">
                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="userName" :rules="usernameRules" label="Username" prepend-icon="mdi-account"  required ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6" align-self="center" class="text-right">
                                        <v-btn :loading2="loading2" outlined color="primary" @click="changeUsername()" >Change Username</v-btn>
                                    </v-col>
                                </v-row>
                                
                            </fieldset>

                            <fieldset class="px-5 pb-3">
                                <legend> Password Change </legend>
                                <v-form ref="form" v-model="valid" lazy-validation>
                                    <v-row justify="center">
                                        <v-col cols="12" md="6" sm="6">
                                            <v-text-field v-model="password1" :rules="password1Rules" label="Password" prepend-icon="mdi-lock" required ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6" sm="6" >
                                            <v-text-field v-model="password2" :error-messages="errormsg" :rules="password2Rules" label="Confirm Password" prepend-icon="mdi-lock" required ></v-text-field>
                                        </v-col>

                                        <v-col cols="12" md="6" sm="6">
                                            <!-- for empty space -->
                                        </v-col>

                                        <v-col cols="12" md="6" sm="6" class="text-right">
                                            <v-btn :loading="loading" outlined color="primary" @click="changePassword()" >Change Password</v-btn>
                                        </v-col>

                                        
                                    </v-row>
                                </v-form>
                            </fieldset>
                            
                        </v-card-text>     
                            
                        
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" depressed @click="dialog=false">OK</v-btn>
                    </v-card-actions>

                    <v-snackbar v-model="passwordUpdateSuccessfulAlert" :timeout="4000" absolute bottom left color="green">Password has been changed</v-snackbar>
                    <v-snackbar v-model="passwordUpdateFailfulAlert" :timeout="4000" absolute bottom left color="red">Password change failed</v-snackbar>
                    <v-snackbar v-model="usernameUpdateSuccessfulAlert" :timeout="4000" absolute bottom left color="green">Username has been changed</v-snackbar>
                    <v-snackbar v-model="usernameUpdateFailfulAlert" :timeout="4000" absolute bottom left color="red">Username change failed</v-snackbar>
                </v-card>
            
            

            
        </v-dialog>
    </v-row>
</template>



<script>
    export default {
        
        data(){
            return{

                //----------logged User details-----------
                logedUser : JSON.parse(localStorage.getItem('user')),
                //----------logged User details-----------


                imageUrl:'',
                image:null,
                dialog:false,
                loading:false,
                loading2:false,
                valid:true,
                
                password1:'',
                password2:'',
                email:'',
                userName:'',

                errormsg:"",

                

                passwordUpdateSuccessfulAlert:false,
                passwordUpdateFailfulAlert:false,
                usernameUpdateSuccessfulAlert:false,
                usernameUpdateFailfulAlert:false,
                
                

                // -----------Validation rules-----------
                password1Rules: [v=> !!v || 'Password is required', v => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(v) || 'At least one upper case, At least one lower case English letter, At least one digit, At least one special character, Minimum eight in length', v=> (v && v.length >7)|| 'Name must be greater than 8'],
                password2Rules: [v=> !!v || 'Password is required'],
                usernameRules: [v=> !!v || 'Username is required'],
            }
        
        
        },

   

        methods:{
            

            changePassword(){
                if(this.$refs.form.validate()){
                    
                    if(this.password1 != this.password2){
                        this.errormsg="Password does not match"
                    }else{
                        console.log(this.password1)
                        console.log(this.password2)

                        this.errormsg=""

                        this.loading=true
                        this.axios.patch(this.$apiUrl+'/api/v1.0/UserManagement/users/'+this.logedUser.userID+'/restPassword',{
                            password:this.password1,
                            password_confirmation:this.password2
                            
                        })
                        .then(Response=>{
                            if(Response.data.success == true){
                                this.loading=false
                                this.passwordUpdateSuccessfulAlert=true
                                this.Reset()
                            }else{
                                this.loading=false
                                this.passwordUpdateFailfulAlert=true
                            }
                        }).catch(error => {
                            this.loading=false
                            this.passwordUpdateFailfulAlert=true
                            console.log(error.data)
                        });
                    }
                }
            },


            changeUsername(){
                
                this.loading2=true
                this.axios.patch(this.$apiUrl+'/api/v1.0/UserManagement/users/'+this.logedUser.userID+'/username',{
                    username: this.userName,
                })
                .then(Response=>{
                    if(Response.data.success == true){
                        this.loading2=false
                        this.usernameUpdateSuccessfulAlert=true
                        this.Reset()
                    }else{
                        this.loading2=false
                        this.usernameUpdateFailfulAlert=true
                    }
                }).catch(error => {
                    this.loading2=false
                    this.usernameUpdateFailfulAlert=true
                    console.log(error.data)
                });
                    
            },



            Reset () {
                this.$refs.form.reset()
            },


            onPickFile(){
                this.$refs.fileInput.click();
            },

            onFilePicked(event){
                const files = event.target.files
                let filename = files[0].name
                if(filename.lastIndexOf('.')<=0){
                return alert('please add a valid file!!!')
                }
                const fileReader = new FileReader()
                fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
                })
                fileReader.readAsDataURL(files[0])
                this.image = files[0]
            },
            

           
            
            
        
        },

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