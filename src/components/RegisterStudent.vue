<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>

            

            <v-card class="my-6" max-width="700" >
                <v-form ref="form" v-model="valid" lazy-validation class="px-5">

                    <v-responsive class="text-center">
                        <v-avatar  size="150" class="mb-2">
                            <v-icon size="150" v-if="!imageUrl">mdi-face-man-shimmer</v-icon>
                            <img :src="imageUrl" v-if="imageUrl">
                        </v-avatar> <br>
                        <v-btn @click="onPickFile" depressed class="white grey--text">
                            <v-icon left>mdi-camera</v-icon>
                            <span>upload image</span>
                        </v-btn>
                    </v-responsive>

                    <input type="file" v-show="false" ref="fileInput" accept="image/*" @change="onFilePicked">
                    
                    <v-row justify="center" dense>
                        <v-card-text>
                            Student Details
                        </v-card-text>

                        <v-col cols="12" md="6" sm="6">
                            <v-text-field v-model="fname" :rules="nameRules" label="First Name" prepend-icon="mdi-account" required ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6" sm="6">
                            <v-text-field v-model="lname" :rules="nameRules" label="Last Name" prepend-icon="mdi-account" required></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6" sm="6">
                            <v-select :items="gender" :rules="genderRules" label="Gender" prepend-icon="mdi-gender-male-female"></v-select>
                        </v-col>

                        <v-col cols="12" md="6" sm="6">
                            <template>
                                <div>
                                    <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-text-field v-model="date" label="Birthday date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :rules="birthdayRules"></v-text-field>
                                        </template>
                                        <v-date-picker v-model="date" :active-picker.sync="activePicker" :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" min="1950-01-01" ></v-date-picker>
                                    </v-menu>
                                </div>
                            </template>
                        </v-col>

                        <v-col cols="12" md="6" sm="6">
                            <v-text-field v-model="tp" :rules="tpRules" label="Telephone No." prepend-icon="mdi-phone-classic" required maxlength="10" ></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6" sm="6">
                            <v-text-field v-model="email"  :rules="emailRules" label="E-mail" prepend-icon="mdi-mail" required></v-text-field>
                        </v-col>

                        <v-col cols="12"  md="12" sm="12">
                            <v-text-field v-model="address"  :rules="addressRules" label="Address" prepend-icon="mdi-map-marker" required></v-text-field>
                        </v-col>

                        
                        <v-card-text>
                            Parent Details
                        </v-card-text>

                        <v-col cols="12" md="12" sm="12">
                            <v-radio-group v-model="parent" row  >
                                <v-radio label="Mother" value="mother"></v-radio>
                                <v-radio label="Father" value="father"></v-radio>
                                <v-radio label="Guardian" value="guardian"></v-radio>
                            </v-radio-group>
                        </v-col>

                        <v-col cols="12" md="6" sm="6">
                            <v-text-field v-model="parentName" :rules="nameRules" label="Name" prepend-icon="mdi-account" required></v-text-field>
                        </v-col>

                        <v-col cols="12" md="6" sm="6">
                            <v-text-field v-model="parentTp" :rules="tpRules" label="Telephone No." prepend-icon="mdi-phone-classic" required maxlength="10"></v-text-field>
                        </v-col>
                     </v-row>   
                        <v-card-actions class="justify-end">
                                <v-btn :disabled="!valid" class="grey lighten-3" @click="Register" depressed>Reset</v-btn>
                                <v-btn :disabled="!valid" color="primary" @click="Register" depressed>Register</v-btn>
                        </v-card-actions>
                    
                    
                </v-form>
            </v-card>
            
               
        </v-container>
    </div>
 
    
</template>


<script>
export default {
    data(){
        return{
            imageUrl:'',
            image:null,

            valid:true,
            fname: '',
            lname: '',
            tp: '',
            email: '',
            address: '',
            parentTp: '',
            parentName: '',
            parent:'mother',


            // -----------Validation rules-----------
            nameRules: [v=> !!v || 'Name is required', v => /^[A-Za-z]+$/.test(v) || 'Must be text only', v=> (v && v.length >3)|| 'Name must be greater than 3'],
            
            tpRules: [v=> !!v || 'Telephone no. is required', v => /^\d+$/.test(v) || 'Must be a number', v=> (v && v.length ==10)|| 'Telephone no. must be 10'],
            
            emailRules: [v=> !!v || 'email is required', v=> /.+@.+\..+/.test(v) || 'email must be valid'],         
            
            addressRules: [v=> !!v || 'Address is required', v=> (v && v.length >5)|| 'Address must be greater than 5'],

            birthdayRules: [v=> !!v || 'Birthday is required'],

            genderRules: [v=> !!v || 'Gender is required'],

            

            activePicker: null,
            date: null,
            menu: false,


            // -----------dropdown list-----------
            gender:['Male','Female','Other'],


            breadcrumbs: [
                { text: 'Students', disabled: false, href: '/Students' },
                { text: 'RegisterStudent', disabled: true, href: '/RegisterStudent' }
            ],
        
        }
        
        
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      }
    },

    methods:{
        Register(){
            this.$refs.form.validate();
            console.log(this.date);
        },
        // save (date) {
        // this.$refs.menu.save(date)

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
        }
        
      
    }
}
</script>