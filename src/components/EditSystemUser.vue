<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn @click="getUsers()" class="teal" small block dark depressed  v-bind="attrs" v-on="on">Edit<v-icon dark right>mdi-pencil</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Edit system user</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text >
            
            <v-row justify="center" dense align="center">
                <v-col cols="12">
                    <fieldset class="px-5 pb-3">
                        <legend><v-card-text class="grey--text">Account Password</v-card-text></legend>
                        <v-row>
                            <v-col cols="12" md="12" sm="12" >
                                <v-btn color="primary" :loading="loading" outlined @click="resetPassword()">Reset Password</v-btn>
                            </v-col>
                        </v-row>
                        
                        
                    </fieldset>
                </v-col>
                <v-col cols="12">
                    <fieldset class="px-5 pb-3">
                        <legend><v-card-text class="grey--text">Account Status</v-card-text></legend>  
                        <v-row>
                            <v-col cols="12" md="6" sm="6" >
                                <v-select :items="role" :rules="roleRules" label="Role" prepend-icon="mdi-shield-account" v-model="getRole"></v-select>
                            </v-col>

                            <v-col cols="12" md="6" sm="6">
                                <v-switch color="red" @change="deactivateUser()"  inset v-model="status" label="Mark as a Deactivated User"></v-switch>
                            </v-col>
                        </v-row>  
                        
                    </fieldset>
                </v-col>
                
                
            </v-row>
                

        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn   @click="dialog = false" outlined color="grey">Cancel</v-btn>
            <v-btn :loading="loading" :disabled="!getRole || !showStatus" color="primary" @click="updateUser()" depressed>Save
                <v-icon left>mdi-content-save</v-icon>
            </v-btn>
        </v-card-actions>

        <!----------------------- alerts -------------------------------------->
        <v-snackbar v-model="statusUpdateUnsuccessAlert" :timeout="3000" absolute bottom left color="red">Account update failed</v-snackbar>
        <v-snackbar v-model="passwordResetUnsuccessAlert" :timeout="3000" absolute bottom left color="red">Password reset Unsuccessful</v-snackbar>
        <v-snackbar v-model="passwordResetSuccessAlert" :timeout="3000" absolute bottom left color="green">Password reset Successful</v-snackbar>
        <!----------------------- alerts -------------------------------------->

      </v-card>

      
    </v-dialog>
  </v-row>
</template>



<script>
import { loadScript } from "vue-plugin-load-script";

export default {
    props:['users'],
    data(){
        return{
            loading:false,
            dialog: false,
            getRole:'',
            status:null,
            showStatus:'',
            userPassword:'',

            
            
            // -----------Validation rules-----------
            roleRules: [v=> !!v || 'Role is required'],

            
            // -----------dropdown list-----------
            role:['Standard','Administrator','Guess'],

            passwordResetSuccessAlert:false,
            statusUpdateUnsuccessAlert:false,
            passwordResetUnsuccessAlert:false
        
        }
        
        
    },
    

    methods:{

        getUsers(){
            this.axios.patch(this.$apiUrl+"/api/v1.0/UserManagement/users/"+this.users.userID).then(Response=>{

                if(Response.data.user.status=="Active"){
                    this.status=false;
                    this.showStatus="Active"
                }else{
                    this.status=true;
                    this.showStatus="Deactivate"
                }
                this.getRole=Response.data.user.privilege
            })
        },

        updateUser(){
            this.loading=true
            this.axios.patch(this.$apiUrl+'/api/v1.0/UserManagement/users/'+this.users.userID,{
                privilege:this.getRole,
                status:this.showStatus,
            })
            .then(Response=>{
                if(Response.data.success == true){
                    this.loading=false
                    this.successAlert()
                    this.dialog=false
                }else{
                    this.loading=false
                    this.statusUpdateUnsuccessAlert=true
                }
            }).catch(error => {
                this.loading=false
                this.statusUpdateUnsuccessAlert=true
                console.log(error.data)
            });
        },

        deactivateUser(){
            if(this.status == false){
                this.showStatus = "Active"
            }else if(this.status == true){
                this.showStatus = "Deactivate"
            }
        },


        resetPassword(){
            this.loading=true
            this.userPassword=this.genPassword()
            this.axios.patch(this.$apiUrl+'/api/v1.0/UserManagement/users/'+this.users.userID+'/restPassword',{
                password:this.userPassword,
                password_confirmation:this.userPassword
                
            })
            .then(Response=>{
                if(Response.data.success == true){
                    this.loading=false
                    this.passwordResetSuccessAlert=true
                    this.dialog=false

                    //------------send email-----------------
                    this.sendPassword(this.users.employee.email,this.userPassword)
                    console.log(this.userPassword)
                }else{
                    this.loading=false
                    this.passwordResetUnsuccessAlert=true
                }
            }).catch(error => {
                this.loading=false
                this.passwordResetUnsuccessAlert=true
                console.log(error.data)
            });
        },
        

        genPassword() {
            var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            var passwordLength = 12;
            var password = ""; 
            for (var i = 0; i <= passwordLength; i++) {
                var randomNumber = Math.floor(Math.random() * chars.length);
                password += chars.substring(randomNumber, randomNumber +1);
            }
            return password
        },

        sendPassword(emailAddress,password){
            loadScript("https://smtpjs.com/v3/smtp.js")
            .then(() => {
                window.Email && window.Email.send({
                    Host : "smtp.gmail.com",
                    Username : this.$emailAddress,
                    Password : this.$emailPassword,
                    To : emailAddress,
                    From : this.$emailAddress,
                    Subject : "Password Reset",
                    Body : `Hello!,<br>You got a new message from <b>ICT Academy</b>.<br><br>Your account password reset successfully. Please use the given password to log into the system. <br><br><b>User name:</b> ${emailAddress}<br><b>Password:</b> ${password}<br><br><i>Please change the password as soon as you log in to the system.</i><br><br>Best wishes,<br>ICT Academy - Hakmana<br>${this.$tpNo}`
                }).then(
                    message => console.log(message)
                );
            }).catch(() => {
                // Failed to fetch script
            });
        },


        changeStatus(){
            this.statusUpdateSuccessAlert=true
        },

        successAlert(){
            this.$emit('success',true)
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

    .theme--light.v-btn.v-btn--disabled.v-btn--has-bg.toggle {
        background-color: #0000FF !important;
        color:white !important;
    }

</style>