<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>

        <!-- ---------------------------------overlay for waiting ----------------------------------------->
        <v-overlay :value="overlay">
            <div class="text-center">
                <v-progress-circular indeterminate size="64"></v-progress-circular><br><br>
                <p>Please wait..</p>
            </div>
        </v-overlay>
        <!-- ---------------------------------overlay for waiting ----------------------------------------->

        <v-container>

            <v-snackbar :timeout="3000" v-model="unsuccess" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Teacher Registration has been<strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="success" color="green"  bottom><v-icon left>mdi-check</v-icon>Teacher Registration has been <strong>successful</strong> </v-snackbar>
            
            <v-form ref="form" v-model="valid" lazy-validation>
                
                <v-card class="my-6" flat>
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Teachers Registration</v-card-title>    
                    <v-row style="padding:12px">
                        

                        
                        <v-col lg="6" md="6" sm="6" cols="12"   max-width="600" >
                            <fieldset class="px-5 pb-3">
                                <legend><v-card-text class="grey--text">Teacher Details</v-card-text></legend>
                                <v-responsive class="text-center">
                                    <v-avatar  size="150" class="mb-10 mt-2">
                                        <img src="../assets/icons/teacher.jpg">
                                    </v-avatar>
                                </v-responsive>

                                <v-row justify="center" dense >

                                    <v-col cols="12" md="12" sm="12">
                                        <v-select :items="title" :rules="titleRules" label="Title" prepend-icon="mdi-badge-account" v-model="getTitle"></v-select>
                                    </v-col>
                                    
                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="fname" :rules="nameRules" label="First Name" prepend-icon="mdi-account" required ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="lname" :rules="nameRules" label="Last Name" prepend-icon="mdi-account" required></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-radio-group v-model="nicType" row style="flex-wrap:nowrap !important; justify-content:center !important ">
                                            <v-radio label="Old NIC" value="old" ></v-radio>
                                            <v-radio label="New NIC" value="new"></v-radio>
                                        </v-radio-group>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-if="nicType=='new'" placeholder="ex: 199836487634" v-model="nicNo" :rules="newNicRules" label="NIC no.new" prepend-icon="mdi-card-bulleted" required maxlength="12"></v-text-field>
                                        <v-text-field v-else-if="nicType=='old'" placeholder="ex: 981232289v" v-model="nicNo" :rules="oldNicRules" label="NIC no.old" prepend-icon="mdi-card-bulleted" required maxlength="10"></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-select :items="gender" :rules="genderRules" label="Gender" prepend-icon="mdi-gender-male-female" v-model="getGender"></v-select>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <template>
                                            <div>
                                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="date" label="Birthday date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :rules="birthdayRules"></v-text-field>
                                                    </template>
                                                    <v-date-picker @input="menu = false" v-model="date" :active-picker.sync="activePicker" :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" min="1950-01-01" ></v-date-picker>
                                                </v-menu>
                                            </div>
                                        </template>
                                    </v-col>

                                </v-row>
                            </fieldset>
                        </v-col>

                        <v-col lg="6" md="6" sm="6" cols="12"  max-width="600" flat >
                            <fieldset class="px-5 pb-lg-10 pb-md-10 pb-sm-10 pb-xs-0  pt-lg-5 pt-md-5 pt-sm-5 pt-xs-0">
                                <legend><v-card-text class="grey--text">Contact Details</v-card-text></legend>
                                <v-row justify="center" dense >

                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="tp" placeholder="ex: 0714332332" :rules="tpRules" label="Telephone No." prepend-icon="mdi-phone-classic" required maxlength="10" ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="email"  :rules="emailRules" label="E-mail" prepend-icon="mdi-mail" required></v-text-field>
                                    </v-col>

                                    <v-col cols="12"  md="12" sm="12">
                                        <v-text-field v-model="address"  :rules="addressRules" label="Address" prepend-icon="mdi-map-marker" required></v-text-field>
                                    </v-col>
                                </v-row>
                            </fieldset>

                            <fieldset class="px-5 pb-lg-15 pb-md-15 pb-sm-15 pb-xs-0  pt-lg-5 pt-md-5 pt-sm-5 pt-xs-0">
                                <legend><v-card-text class="grey--text">Class Details</v-card-text></legend>
                                <v-row justify="center" dense >

                                    <v-col cols="12" md="6" sm="6">
                                        <template>
                                            <div >
                                                <v-menu ref="menud" v-model="joingMenu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="joingDate" label="Join date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :rules="joinDateRules"></v-text-field>
                                                    </template>
                                                    <v-date-picker @input="joingMenu = false" v-model="joingDate" :active-picker.sync="joingActivePicker" :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" min="1950-01-01"></v-date-picker>
                                                </v-menu>
                                            </div>
                                        </template>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <!-- for empty space -->
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6" class="mb-lg-15 mb-md-15 mb-sm-15 mb-xs-0">
                                        <!-- for empty space -->
                                    </v-col>

                                    <v-col cols="12" md="12" sm="12" class="mb-lg-5 mb-md-5 mb-sm-5 mb-xs-0">
                                        <!-- for empty space -->
                                    </v-col>

                                </v-row>
                            </fieldset>
                            <v-card-actions class="justify-end mt-2">
                                <v-btn   @click="Reset" outlined color="grey">Reset</v-btn>
                                <v-btn :disabled="!valid || !getTitle || !fname || !lname || !tp || !email || !address || !getGender || !nicNo || !nicType || !date || !joingDate" color="primary" @click="Register(),scrollToTop()" depressed>Register</v-btn>
                            </v-card-actions>
                            
                        </v-col>
                    </v-row>
                </v-card>
            </v-form>
            
            
               
        </v-container>
    </div>
 
    
</template>


<script>
export default {
    data(){
        return{
            overlay:false,

            valid:true,
            getTitle:'',
            fname: '',
            lname: '',
            tp: '',
            email: '',
            address: '',
            getGender:'',
            nicNo:'',
            nicType:'old',

            activePicker: null,
            date: null,
            menu: false,

            joingActivePicker: null,
            joingDate: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
            joingMenu: false,
            

            // -----------Validation rules-----------
            nameRules: [v=> !!v || 'Name is required', v => /^[a-zA-Z\s.]+$/.test(v) || 'Must be text only', v=> (v && v.length >3)|| 'Name must be greater than 3'],
            
            tpRules: [v=> !!v || 'Telephone no. is required', v => /^\d+$/.test(v) || 'Must be a number', v=> (v && v.length ==10)|| 'Telephone no. must be 10'],
            
            emailRules: [v=> !!v || 'email is required', v=> /.+@.+\..+/.test(v) || 'email must be valid'],         
            
            addressRules: [v=> !!v || 'Address is required', v=> (v && v.length >5)|| 'Address must be greater than 5'],

            birthdayRules: [v=> !!v || 'Birthday is required'],

            genderRules: [v=> !!v || 'Gender is required'],

            newNicRules: [v=> !!v || 'NIC is required', v => /^\d+$/.test(v) || 'Must be a number', v=> (v && v.length ==12)|| 'New Nic no. must have 12 numbers'],
            
            oldNicRules: [v=> !!v || 'NIC is required', v => /[0-9]+[vxVX]/.test(v) || 'Please insert valid NIC', v=> (v && v.length ==10)|| 'Old Nic no. must have 10 characters'],

            joinDateRules: [v=> !!v || 'Join Date is required'],

            titleRules: [v=> !!v || 'Title is required'],

            

            


            // -----------dropdown list-----------
            gender:['Male','Female','Other'],

            title:['Mr.', 'Ms.', 'Mrs.', 'Miss.', 'Rev.'],
            





            breadcrumbs: [
                { text: 'Teachers', disabled: false, href: '/Teachers' },
                { text: 'TeacherRegistration', disabled: true, href: '/TeacherRegistration' }
            ],


            success:false,
            unsuccess:false,
        
        }
        
        
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      }
    },

    methods:{
        Register(){
            this.overlay=!this.overlay

            if(this.$refs.form.validate()){
                this.axios.post(this.$apiUrl+"/api/v1.0/TeacherManagement/teachers",{
                    title:this.getTitle,
                    firstName:this.fname,
                    lastName:this.lname,
                    nic:this.nicNo,
                    dob:this.date,
                    sex:this.getGender,
                    telNo:this.tp,
                    address:this.address,
                    email:this.email,
                    joinedDate:this.joingDate,
                    status:"Active",
                    qualification: "MSc. BSc.ICT",

                })
                .then(Response=>{
                    if(Response.data.success == true){
                        this.overlay=false
                        this.Reset();
                        this.success=true;
                    }else{
                        this.unsuccess=true;
                    }
                })
                .catch(error => {
                    this.overlay=false
                    this.unsuccess=true;
                    console.log(error)
                    
                });
            
            
            }
            
            
        },

        
        Reset () {
            this.$refs.form.reset()
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },

        
        
        
      
    }
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