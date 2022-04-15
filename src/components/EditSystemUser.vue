<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="teal" dark depressed  v-bind="attrs" v-on="on">Edit<v-icon dark right>mdi-pencil</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue lighten-4 primary--text">Edit system user</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text >
            
            <v-row justify="center" dense align="center">
                <v-col cols="12">
                    <fieldset class="px-5 pb-3">
                        <legend><v-card-text class="grey--text">Account Password</v-card-text></legend>
                        <v-row>
                            <v-col cols="12" md="12" sm="12" >
                                <v-btn color="primary" outlined @click="resetPassword()">Reset Password</v-btn>
                            </v-col>
                        </v-row>
                        
                        
                    </fieldset>
                </v-col>
                <v-col cols="12">
                    <fieldset class="px-5 pb-3">
                        <legend><v-card-text class="grey--text">Account Status</v-card-text></legend>  
                        <v-row>
                            <v-col cols="12" md="6" sm="6" >
                                <v-select :items="status" :rules="statusRules" label="Status" prepend-icon="mdi-shield-account" v-model="getStatus" ></v-select>
                            
                            </v-col>
                            <v-col cols="12" md="6" sm="6" align-self="center">
                                <v-btn color="primary" outlined @click="changeStatus()">Ok</v-btn>
                            </v-col>
                        </v-row>  
                        
                    </fieldset>
                </v-col>
                
                
            </v-row>
                

        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <div>
                <v-btn color="primary" @click="dialog = false" depressed>Ok</v-btn>
            </div>
        </v-card-actions>

        <v-snackbar v-model="statusUpdateSuccessAlert" :timeout="2000" absolute bottom left color="green">Account status has been updated</v-snackbar>
        <v-snackbar v-model="passwordResetSuccessAlert" :timeout="2000" absolute bottom left color="green">Password reset successful</v-snackbar>

      </v-card>
      
    </v-dialog>
  </v-row>
</template>



<script>
import { loadScript } from "vue-plugin-load-script";

export default {
    props:['staff'],
    data(){
        return{
            dialog: false,

            getStatus:'Active',
            
            // -----------Validation rules-----------
            statusRules: [v=> !!v || 'Status is required'],

            
            // -----------dropdown list-----------
            status:['Active','Deactive'],



            statusUpdateSuccessAlert:false,
            passwordResetSuccessAlert:false
        
        }
        
        
    },
    

    methods:{
        resetPassword(){
            console.log(this.staff.staffID);
            this.sendPassword("lakshanugc@gmail.com",this.genPassword());
            this.passwordResetSuccessAlert=true
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
                    Username : "lakshanj1ace@gmail.com",
                    Password : "nymefuphawvotnst",
                    To : emailAddress,
                    From : "lakshanj1ace@gmail.com",
                    Subject : "Password Reset",
                    Body : `Hello ${this.staff.fname},<br>You got a new message from <b>ICT Academy</b>.<br><br>Your account password reset successfully. Please use the given password to log into the system. <br><br><b>User name:</b> ${emailAddress}<br><b>Password:</b> ${password}<br><br><i>Please change the password as soon as you log in to the system.</i><br><br>Best wishes,<br>ICT Academy - Hakmana<br>076 9198533`
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
        failedAlert(){
            this.$emit('failed',true)
        }

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