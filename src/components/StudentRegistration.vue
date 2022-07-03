<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>

            <v-snackbar :timeout="3000" v-model="unsuccess" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Student Registration has been<strong>failed</strong> </v-snackbar>
            
            
            <v-form ref="form" v-model="valid" lazy-validation>
                
                <v-card class="my-6" flat>
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Student Registration</v-card-title>    
                    <v-row style="padding:12px">
                        

                        
                        <v-col lg="6" md="6" sm="6" cols="12"   max-width="600" >
                            <fieldset class="px-5 pb-lg-15 pb-md-15 pb-sm-15  pb-xs-3">
                                <legend><v-card-text class="grey--text">Student Details</v-card-text></legend>
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
                                
                                <v-row justify="center" dense >
                                    
                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="fname" :rules="nameRules" label="First Name" prepend-icon="mdi-account" required ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="lname" :rules="nameRules" label="Last Name" prepend-icon="mdi-account" required></v-text-field>
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

                                    <v-col cols="12" md="6" sm="6">
                                        <v-select :items="grade" :rules="gradeRules" label="Grade" prepend-icon="mdi-card-bulleted" v-model="getGrade"></v-select>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <!-- for empty space -->
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6" class="mb-lg-5 mb-md-5 mb-sm-5 mb-xs-0">
                                        <!-- for empty space -->
                                    </v-col>

                                </v-row>
                            </fieldset>
                        </v-col>

                        <v-col lg="6" md="6" sm="6" cols="12"  max-width="600" flat >
                            <fieldset class="px-5 pb-3">
                                <legend><v-card-text class="grey--text">Contact Details</v-card-text></legend>
                                <v-row justify="center" dense >

                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="tp" :rules="tpRules" label="Telephone No." prepend-icon="mdi-phone-classic" required maxlength="10" ></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="email"  :rules="emailRules" label="E-mail" prepend-icon="mdi-mail" required></v-text-field>
                                    </v-col>

                                    <v-col cols="12"  md="12" sm="12">
                                        <v-text-field v-model="address"  :rules="addressRules" label="Address" prepend-icon="mdi-map-marker" required></v-text-field>
                                    </v-col>
                                </v-row>
                            </fieldset>

                            <fieldset class="px-5 pb-3">
                                <legend><v-card-text class="grey--text">Parent Details</v-card-text></legend>
                                <v-row justify="center" dense >
                                    
                                    <v-col cols="12" md="12" sm="12">
                                        <v-radio-group  v-model="parent" row style="justify-content:center !important" :rules="guardianRules" required>
                                            <v-radio label="Mother" value="Mother"></v-radio>
                                            <v-radio label="Father" value="Father"></v-radio>
                                            <v-radio label="Guardian" value="Guardian"></v-radio>
                                        </v-radio-group>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="parentName" :rules="nameRules" label="Name" prepend-icon="mdi-account" required></v-text-field>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="parentTp" :rules="tpRules" label="Telephone No." prepend-icon="mdi-phone-classic" required maxlength="10"></v-text-field>
                                    </v-col>
                                </v-row>
                            </fieldset>

                            <fieldset class="px-5 pb-3">
                                <legend><v-card-text class="grey--text">Class Details</v-card-text></legend>
                                <v-row justify="center" dense >

                                    <v-col cols="12" md="6" sm="6">
                                       <v-select :items="branch" item-text='branchName' item-value="branchID" :rules="branchRules" label="Branch" prepend-icon="mdi-sitemap" v-model="getBranch"></v-select>
                                    </v-col>

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
                                </v-row>
                            </fieldset>
                            <v-card-actions class="justify-end mt-2">
                                <v-btn   @click="Reset" outlined color="grey">Reset</v-btn>
                                <!-- <v-btn :disabled="!valid || !fname || !lname || !tp || !email || !address || !parentTp || !parentName || !parent || !getGender || !getGrade || !getBranch || !date || !joingDate" color="primary" @click="Register(),scrollToTop()" depressed>Register</v-btn> -->
                                <v-btn  color="primary" @click="success=true"  depressed>Register</v-btn>
                            </v-card-actions>
                            
                        </v-col>
                    </v-row>
                </v-card>
            </v-form>



            <!----------------------------------- dialog box ------------------------------------------>

            <v-dialog v-model="success" persistent max-width="500px">
                <v-card>
                    <v-card  flat color="#66BB6A" class="pa-5" tile>
                        <v-card-title>
                            <v-row justify="center">
                                <v-icon size="100" color="white">mdi-check-circle-outline</v-icon>
                            </v-row>
                        </v-card-title>
                        <v-container class="text-center" fluid>
                            <span class="text-h5 text-center white--text">Registration Successful</span>
                        </v-container>
                    </v-card>
                    <v-container class="text-center pb-0" fluid>
                        <v-row class="pl-5 pr-3 ma-0">
                            <v-col cols="9" md="9" sm="9">
                                <v-text-field v-model="studentID" label="Student ID" outlined append-icon="mdi-account-outline" dense readonly></v-text-field>
                            </v-col>
                            <v-col cols="2" md="2" sm="2">
                                <v-btn  outlined @click="copyID(),copySuccess=true">Copy</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                    
                    <v-divider></v-divider>
                    <legend><v-card-text class="grey--text">Enrollement</v-card-text></legend>
                    <v-card-text class="text-subtitle-1">Do you want to enroll this student in a class?</v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="grey" outlined @click="dialog = false">Do later</v-btn>
                        <v-btn color="primary" depressed>Enroll now</v-btn>
                    </v-card-actions>

                    <v-snackbar :timeout="2000" v-model="copySuccess"  absolute bottom left>Student ID copied </v-snackbar>
                
                </v-card>
            </v-dialog>

            <!----------------------------------- dialog box ------------------------------------------>
            
            
               
        </v-container>
    </div>
 
    
</template>


<script>
export default {
    data(){
        return{
            copySuccess:false,
            studentID:'ICTA1998001',
            imageUrl:'',
            image:null,

            valid:true,
            fname: '',
            lname: '',
            tp: '',
            email: '',
            address: '',
            parentTp:'',
            parentName: '',
            parent:'Mother',
            getGender:'',
            getGrade:'',
            getBranch:'',
            title:'',

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

            gradeRules: [v=> !!v || 'Grade is required'],

            branchRules: [v=> !!v || 'Branch is required'],

            guardianRules: [v=> !!v || 'Guardian is required'],

            joinDateRules: [v=> !!v || 'Join Date is required'],

            

            


            // -----------dropdown list-----------
            gender:['Male','Female','Other'],

            grade:['1','2','3','4','5','6','7','8','9','10','11','12','13','Other'],

            branch:[],
            





            breadcrumbs: [
                { text: 'Students', disabled: false, href: '/Students'},
                { text: 'StudentRegistration', disabled: true, href: '/StudentRegistration' }
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
        copyID(){
            navigator.clipboard.writeText(this.studentID);

        },


        Register(){
            if(this.$refs.form.validate()){
                
                if(this.parent=="Father"){
                    this.title="Mr."
                }else if(this.parent=="Mother"){
                    this.title="Mrs."
                }else{
                    this.title="Mr."
                }

                this.axios.post(this.$apiUrl+"/api/v1.0/StudentManagement/students",{
                    
                    firstName:this.fname,
                    lastName:this.lname,
                    dob:this.date,
                    sex:this.getGender,
                    grade:this.getGrade,
                    telNo:this.tp,
                    address:this.address,
                    email:this.email,
                    status:"Active",
                    joinedDate:this.joingDate,
                    branchID:this.getBranch,
                    title:this.title,
                    parentName:this.parentName,
                    parentType:this.parent,
                    parentTelNo:this.parentTp
   

                })
                .then(Response=>{
                    if(Response.data.success == true){
                        this.Reset();
                        this.successAlert()
                    }else{
                        this.failedAlert()
                    }
                })
                .catch(error => {
                    this.failedAlert()
                    console.log(error)
                    
                });
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
        Reset () {
            this.$refs.form.reset()
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },

        successAlert(){
            this.success=true
        },
        failedAlert(){
            this.unsuccess=true
        },

        
        
      
    },

    
    created(){
        this.axios.get(this.$apiUrl+"/api/v1.0/BranchManagement/branches").then(Response=>(
            this.branch= Response.data.branch.data
            
        ))
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