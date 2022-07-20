<template>
    <v-row justify="end">
        <v-dialog v-model="dialog" max-width="700px" persistent>
            <template v-slot:activator="{ on, attrs }">
                
                <v-btn block depressed color="blue-grey" dark v-bind="attrs" v-on="on">Manage Profile</v-btn>
                
            </template>
            <v-form ref="form" v-model="valid" lazy-validation>
                <v-card flat>
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Profile</v-card-title>
            
                    <v-divider></v-divider>
                
                    <v-card-text >
                        <v-row style="padding:12px">
                                
                            <v-col lg="12" md="12" sm="12" cols="12" >
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

                                    <fieldset class="px-5 pb-3">
                                        <legend> Password Change </legend>
                                        <v-row justify="center">
                                            <v-col cols="12" md="6" sm="6">
                                                <v-text-field v-model="password1" :rules="password1Rules" label="Password" prepend-icon="mdi-lock" required maxlength="8"></v-text-field>
                                            </v-col>

                                            <v-col cols="12" md="6" sm="6">
                                                <v-text-field v-model="password2" :error-messages="errormsg" :rules="password2Rules" label="Confirm Password" prepend-icon="mdi-lock" required maxlength="8"></v-text-field>
                                            </v-col>

                                            <v-col cols="12" md="6" sm="6">
                                                <v-btn :loading="loading" outlined color="primary" @click="changePassword()" >Change Password</v-btn>
                                            </v-col>

                                            <v-col cols="12" md="6" sm="6">
                                                <!-- for empty space -->
                                            </v-col>
                                        </v-row>
                                        
                                    </fieldset>
                                    

                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="primary" depressed @click="dialog=false">OK</v-btn>
                                </v-card-actions>
                                
                            </v-col>

                        </v-row>
                    </v-card-text>
                    <v-snackbar v-model="updateSuccessfulAlert" :timeout="4000" absolute bottom left color="green">Password has been changed</v-snackbar>
                </v-card>
            </v-form>
            
        </v-dialog>
    </v-row>
</template>



<script>
export default {
        components:{
            
        },
        data(){
        return{
            imageUrl:'',
            image:null,
            dialog:false,
            loading:false,
            valid:true,
            
            password1:'',
            password2:'',
            email:'',

            errormsg:"",

            

            updateSuccessfulAlert:false,

            

            
            

            // -----------Validation rules-----------
            password1Rules: [v=> !!v || 'Password is required', v => /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(v) || 'At least one upper case, At least one lower case English letter, At least one digit, At least one special character, Minimum eight in length', v=> (v && v.length >7)|| 'Name must be greater than 8'],
            password2Rules: [v=> !!v || 'Password is required'],
            

            


        
        }
        
        
    },

   

    methods:{
        changePassword(){
            if(this.$refs.form.validate()){
                
                if(this.password1 != this.password2){
                    this.errormsg="Password do not match"
                }else{
                    this.errormsg=""
                    console.log(this.password1)
                    this.Reset()
                    this.updateSuccessfulAlert=true
                }
            }
            
            
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
        

        successAlert(){
            this.success=true
        },
        failedAlert(){
            this.unsuccess=true
        },


        Reset() {
            this.$refs.form.reset()
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