<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="blue-grey" dark depressed  v-bind="attrs" v-on="on">Add new user<v-icon dark right>mdi-plus</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Create new system user</v-card-title>
        
        <v-divider></v-divider>
        <v-card-text >
            
            <v-row justify="center" dense align="center">
                <v-col cols="12" md="12" sm="12" class="text-center">
                    <v-btn-toggle v-model="toggle_exclusive" mandatory class="mt-5">
                        <v-btn  @click="staffShow = !staffShow, teacherShow = !teacherShow" :disabled="staffShow && !teacherShow" class="toggle">Staff</v-btn>
                        <v-btn  @click="teacherShow = !teacherShow, staffShow = !staffShow" :disabled="teacherShow && !staffShow" class="toggle">Teachers</v-btn>
                    </v-btn-toggle>
                </v-col>
                    
                
                
                <v-col cols="12" md="6" sm="6" :hidden="!staffShow">
                    <v-card-text>
                        <v-autocomplete :items="staffMembers" v-model="staffMember" :filter="staffFilter" item-text="name" item-value="staffID" label="Staff Member" prepend-icon="mdi-account" :rules="staffRules"></v-autocomplete>
                    </v-card-text>
                </v-col>
                <v-col cols="12" md="12" sm="12" :hidden="!teacherShow">
                    <v-card-text>
                        <v-autocomplete  :items="teachers" v-model="teacher" :filter="teacherFilter" item-text="name" item-value="teacherID" label="Teacher" prepend-icon="mdi-account" :rules="staffRules"></v-autocomplete>
                    </v-card-text>
                </v-col>
                <v-col cols="12" md="6" sm="6" :hidden="!staffShow">
                    <v-select :items="role" :rules="roleRules" label="Role" prepend-icon="mdi-shield-account" v-model="getRole"></v-select>
                </v-col>
                <v-card-text>
                    *Use Name OR ID to search for a person
                </v-card-text>
            </v-row>
                

        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn   @click="dialog = false, failedAlert()" outlined color="grey" class="mr-2">Cancel</v-btn>
            <div :hidden="!staffShow">
                <v-btn :loading="loading"  :disabled="!staffMember || !getRole" color="primary" @click="createUserStaff(), successAlert(), dialog = false" depressed>Create</v-btn>
            </div>
            <div :hidden="!teacherShow">
                <v-btn :loading="loading"  :disabled="!teacher" color="primary" @click="createUserTeacher(), successAlert(), dialog = false" depressed>Create</v-btn>
            </div>
            
            
        </v-card-actions>

      </v-card>
      
    </v-dialog>
  </v-row>
</template>



<script>
import { loadScript } from "vue-plugin-load-script";

export default {
    data(){
        return{
            dialog: false,

            loading:false,
            staffMember:'',
            teacher:'',
            getRole:'',

            teacherShow:false,
            staffShow:true,

            lname:'Dasun',


            toggle_exclusive: undefined,
            

            
            // -----------Validation rules-----------
            teacherRules: [v=> !!v || 'Teacher is required'],
            staffRules: [v=> !!v || 'Staff member is required'],
            roleRules: [v=> !!v || 'Role is required'],

            staffMembers:[
                {name:'Samansfsdf Herathsfddf 2121', staffID:'2121'},
                {name:'Dasun Rathnayake', staffID:'2133'},
                {name:'Kasun Bandara', staffID:'24121'},
                {name:'Maheshi Ranathunga', staffID:'3167'},
            ],

            teachers:[
                {name:'Samansfsdf Herathsfddf 2121', teacherID:'2121'},
                {name:'Dasun Rathnayake', teacherID:'2133'},
                {name:'Kasun Bandara', teacherID:'24121'},
                {name:'Maheshi Ranathunga', teacherID:'3167'},
            ],


            // -----------dropdown list-----------
            role:['Standerd user','Admin'],
        
        }
        
        
    },
    

    methods:{
        createUserTeacher(){
            this.loading=true
            console.log(this.teacher);
            this.sendPassword("lakshanugc@gmail.com",this.genPassword())
            this.loading=false
        },

        createUserStaff(){
            this.loading=true
            console.log(this.staffMember);
            this.sendPassword("lakshanugc@gmail.com",this.genPassword())
            this.loading=false
        },

        staffFilter (item, queryText) {
            const textOne = item.name.toLowerCase()
            const textTwo = item.staffID.toLowerCase()
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1

        },

        teacherFilter (item, queryText) {
            const textOne = item.name.toLowerCase()
            const textTwo = item.teacherID.toLowerCase()
            const searchText = queryText.toLowerCase()

            return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1

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
                    Subject : "Login Details",
                    Body : `Hello, <br>You got a new message from <b>ICT Academy</b>.<br><br>Your account was created successfully. Please use the given Password and Username to log into the system.<br><br><b>User name:</b> ${emailAddress}<br><b>Password:</b> ${password}<br><br><i>Please change the password as soon as you log in to the system.</i><br><br>Best wishes,<br>ICT Academy - Hakmana<br>${this.$tpNo}`
                }).then(
                    message => console.log(message)
                );
            }).catch(() => {
                // Failed to fetch script
            });
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
        background-color: teal !important;
        color:white !important;
    }

</style>