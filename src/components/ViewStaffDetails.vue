<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn @click="getStaff()" small block class="primary" dark  depressed  v-bind="attrs" v-on="on">view<v-icon dark right>mdi-account</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Staff ID - {{staff.staffID}}
            <v-spacer></v-spacer>
            <v-btn depressed color="blue-grey" dark @click="isEditing = !isEditing" v-if="!isEditing"> Edit
                <v-icon right>mdi-account-edit</v-icon>
            </v-btn>  
        </v-card-title>
        
        <v-divider></v-divider>
        <v-card-text style="height: 800px;">
            <v-form ref="form" v-model="valid" lazy-validation class="px-5" :readonly="!isEditing">
                <v-card-text class="grey--text">Staff Details</v-card-text>
                <v-responsive class="text-center">
                    <v-avatar  size="150" class="mb-10 mt-2">
                        <img src="../assets/icons/staff.jpg">
                    </v-avatar>
                </v-responsive>
                
                <v-row justify="center" dense >

                    <v-col cols="12" md="12" sm="12">
                        <v-select :items="title" :rules="titleRules" label="Title" prepend-icon="mdi-badge-account" v-model="getTitle"></v-select>
                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                        <v-text-field v-model="fname" :rules="nameRules" label="First Name" prepend-icon="mdi-account" required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                        <v-text-field v-model="lname" :rules="nameRules" label="Last Name" prepend-icon="mdi-account" required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" sm="6" >
                        <v-radio-group v-model="nicType" row style="justify-content:center !important">
                            <v-radio label="Old NIC" value="old"></v-radio>
                            <v-radio label="New NIC" value="new"></v-radio>
                        </v-radio-group>
                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                        <v-text-field v-if="nicType=='new'" v-model="nicNo" :rules="newNicRules" label="NIC no.new" prepend-icon="mdi-card-bulleted" required maxlength="12"></v-text-field>
                        <v-text-field v-else-if="nicType=='old'" v-model="nicNo" :rules="oldNicRules" label="NIC no.old" prepend-icon="mdi-card-bulleted" required maxlength="10"></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                        <v-select :items="gender" :rules="genderRules" label="Gender" prepend-icon="mdi-gender-male-female" v-model="getGender"></v-select>
                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                        <template>
                            <div>
                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto" :disabled="!isEditing">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="date" label="Birthday date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :rules="birthdayRules"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="date" :active-picker.sync="activePicker" :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" min="1950-01-01" ></v-date-picker>
                                </v-menu>
                            </div>
                        </template>
                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                        <v-text-field placeholder="ex: 0714332332" v-model="tp" :rules="tpRules" label="Telephone No." prepend-icon="mdi-phone-classic" required maxlength="10" ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                        <v-text-field v-model="email"  :rules="emailRules" label="E-mail" prepend-icon="mdi-mail" required></v-text-field>
                    </v-col>

                    <v-col cols="12"  md="12" sm="12">
                        <v-text-field v-model="address"  :rules="addressRules" label="Address" prepend-icon="mdi-map-marker" required></v-text-field>
                    </v-col>

                    <v-card-text class="grey--text">Class Details</v-card-text>

                    <v-col cols="12" md="6" sm="6">
                        <v-select disabled :items="branch" item-text='branchName' item-value="branchID" :rules="branchRules" label="Branch" prepend-icon="mdi-sitemap" v-model="getBranch"></v-select>
                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                        <template>
                            <div>
                                <v-menu ref="menud" v-model="joingMenu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto" :disabled="!isEditing">
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field v-model="joingDate" label="Join date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :rules="joinDateRules"></v-text-field>
                                    </template>
                                    <v-date-picker v-model="joingDate" :active-picker.sync="joingActivePicker" :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" min="1950-01-01"></v-date-picker>
                                </v-menu>
                            </div>
                        </template>
                    </v-col>

                    <v-col cols="12" md="12" sm="12">
                        <v-divider></v-divider>
                        <v-switch color="red" @change="deactivateStaff()"  inset v-model="status" label="Mark as a Deactivated Staff Member"></v-switch>
                    </v-col>
                    
                </v-row>
            </v-form>
            
          

        </v-card-text>
        <v-divider></v-divider>




        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn   @click="dialog = false" color="primary" v-if="!isEditing" depressed>OK</v-btn>
            <v-btn   @click="cancelEdit(),getStaff()" outlined color="grey" v-if="isEditing">Cancel</v-btn>
            <v-btn :loading="loading" :disabled="!valid" color="primary" @click="updateStaff()" depressed v-if="isEditing">Save
                <v-icon left>mdi-content-save</v-icon>
            </v-btn>
        </v-card-actions>

        <v-snackbar v-model="hasSaved" :timeout="3000" absolute bottom left color="green">Staff details has been updated</v-snackbar>
        <v-snackbar :timeout="3000" v-model="hasNotSaved" color="red"  absolute bottom left ><v-icon left>mdi-alert-outline</v-icon>Updated failed </v-snackbar>

      </v-card>
    </v-dialog>
  </v-row>
</template>



<script>
export default {
    props:['staff'],
    data(){
        return{
           
            loading:false,
            valid:true,
            fname: '',
            lname: '',
            tp: '',
            email: '',
            address:'',
            getGender:'',
            nicNo:'',
            nicType:'',
            getTitle:'',

            activePicker: null,
            date: '',
            getBranch:'',

            status:null,
            showStatus:'',
            

            joingActivePicker: null,
            joingDate: '',
            joingMenu: false,

            menu: false,

            dialogm1: '',
            dialog: false,

            isEditing: null,
            hasSaved: false,
            hasNotSaved:false,
            
            // -----------Validation rules-----------
            nameRules: [v=> !!v || 'Name is required', v => /^[a-zA-Z\s.]+$/.test(v) || 'Must be text only', v=> (v && v.length >3)|| 'Name must be greater than 3'],
            
            tpRules: [v=> !!v || 'Telephone no. is required', v => /^\d+$/.test(v) || 'Must be a number', v=> (v && v.length ==10)|| 'Telephone no. must be 10'],
            
            emailRules: [v=> !!v || 'email is required', v=> /.+@.+\..+/.test(v) || 'email must be valid'],         
            
            addressRules: [v=> !!v || 'Address is required', v=> (v && v.length >5)|| 'Address must be greater than 5'],

            birthdayRules: [v=> !!v || 'Birthday is required'],

            genderRules: [v=> !!v || 'Gender is required'],

            newNicRules: [v=> !!v || 'NIC is required', v => /^\d+$/.test(v) || 'Must be a number', v=> (v && v.length ==12)|| 'New Nic no. must have 12 numbers'],
            
            oldNicRules: [v=> !!v || 'NIC is required', v => /[0-9]+[vxVX]/.test(v) || 'Please insert valid NIC', v=> (v && v.length ==10)|| 'Old Nic no. must have 10 characters'],

            branchRules: [v=> !!v || 'Branch is required'],

            joinDateRules: [v=> !!v || 'Join Date is required'],

            titleRules: [v=> !!v || 'Title is required'],


            // -----------dropdown list-----------
            gender:['Male','Female','Other'],

            branch:[],

            title:['Mr.', 'Ms.', 'Mrs.', 'Miss.']

        
        }
        
        
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      }
    },

    created(){
        this.axios.get(this.$apiUrl+"/api/v1.0/BranchManagement/branches").then(Response=>(
            this.branch= Response.data.branch.data
        ) )
    },

    methods:{

        deactivateStaff(){
            if(this.status == false){
                this.showStatus = "Active"
            }else if(this.status == true){
                this.showStatus = "Deactivate"
            }
        },

        getStaff(){
            this.axios.get(this.$apiUrl+"/api/v1.0/StaffManagement/staffs/"+this.staff.staffID)
            .then(Response=>{
                this.fname=Response.data.staff.data[0].firstName;
                this.lname=Response.data.staff.data[0].lastName;
                this.tp=Response.data.staff.data[0].telNo;
                this.email=Response.data.staff.data[0].email;
                this.address=Response.data.staff.data[0].address;
                this.getGender=Response.data.staff.data[0].sex;
                this.nicNo=Response.data.staff.data[0].nic;
                this.getTitle=Response.data.staff.data[0].title;
                this.date=Response.data.staff.data[0].dob;
                this.joingDate=Response.data.staff.data[0].joinedDate;
                
                if((Response.data.staff.data[0].nic).length>10){
                    this.nicType="new"
                }else{
                    this.nicType="old"
                }

                if(Response.data.staff.data[0].status=="Active"){
                    this.status=false;
                    this.showStatus="Active"
                }else{
                    this.status=true;
                    this.showStatus="Deactivate"
                }
                
                this.getBranchDetails(Response.data.staff.data[0].branch.branchID)
                
                
                
                
            })
        },

        getBranchDetails(branchID){
            this.axios.get(this.$apiUrl+"/api/v1.0/BranchManagement/branches/"+branchID)
            .then(Response=>{
                this.getBranch=Response.data.branch.data[0].branchID;
            })
        },

        updateStaff(){
            if(this.$refs.form.validate()){
                this.loading=true
                this.axios.patch(this.$apiUrl+'/api/v1.0/StaffManagement/staffs/'+this.staff.staffID,{
                    firstName:this.fname,
                    lastName:this.lname,
                    telNo:this.tp,
                    email:this.email,
                    address:this.address,
                    sex:this.getGender,
                    nic:this.nicNo,
                    title:this.getTitle,
                    dob:this.date,
                    joinedDate:this.joingDate,
                    branchID:this.getBranch,
                    status: this.showStatus,


                    
                })
                .then(Response=>{

                    if(Response.data.success == true){
                        this.hasSaved = true;
                        this.isEditing = !this.isEditing;
                        this.reCreate()
                        this.loading=false
                    }else{
                        this.hasSaved = false;
                    }
                }).catch(error => {
                    this.loading=false
                    console.log(error.data)
                    this.hasNotSaved=true
                });
                
            }  
        },

        
        cancelEdit(){
            this.isEditing = !this.isEditing;
            this.hasSaved = false;
        },

        reCreate(){
            this.$emit('success',true)
        },
        
      
    }
}
</script>