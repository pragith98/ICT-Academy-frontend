<template>
  <v-row justify="end">
    <v-dialog v-model="dialog" scrollable max-width="700px" persistent>
        <template v-slot:activator="{ on, attrs }">
            <v-btn class="primary" dark  depressed  v-bind="attrs" v-on="on">view<v-icon dark right>mdi-account</v-icon></v-btn>
        </template>
        <v-card max-width="700" flat>
        <v-card-title class="heading-1 blue lighten-4 primary--text">Admission - {{student.admissionNo}}
            <v-spacer></v-spacer>
            <v-btn depressed color="primary" dark @click="isEditing = !isEditing" v-if="!isEditing"> Edit
                <v-icon right>mdi-account-edit</v-icon>
            </v-btn>  
        </v-card-title>
        
        <v-divider></v-divider>
        <v-card-text style="height: 800px;">
            <v-form ref="form" v-model="valid" lazy-validation class="px-5" :readonly="!isEditing">
                <v-card-text class="grey--text">Student Details</v-card-text>
                <v-responsive class="text-center">
                    <v-avatar  size="150" class="mb-2">
                        <v-icon size="150" v-if="!imageUrl">mdi-account-circle</v-icon>
                        <img :src="imageUrl" v-if="imageUrl">
                    </v-avatar> <br>
                    <v-btn @click="onPickFile" depressed class="white grey--text" v-if="isEditing">
                        <v-icon left>mdi-camera</v-icon>
                        <span>upload image</span>
                    </v-btn>
                </v-responsive>
                <input type="file" v-show="false" ref="fileInput" accept="image/*" @change="onFilePicked">
                

                <v-row justify="center" dense >

                    <v-col cols="12" md="6" sm="6">
                        <v-text-field v-model="fname" :rules="nameRules" label="First Name" prepend-icon="mdi-account" required></v-text-field>
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
                        <v-text-field v-model="tp" :rules="tpRules" label="Telephone No." prepend-icon="mdi-phone-classic" required maxlength="10" ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                        <v-text-field v-model="email"  :rules="emailRules" label="E-mail" prepend-icon="mdi-mail" required></v-text-field>
                    </v-col>

                    <v-col cols="12"  md="12" sm="12">
                        <v-text-field v-model="address"  :rules="addressRules" label="Address" prepend-icon="mdi-map-marker" required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                        <v-select :items="grade" :rules="gradeRules" label="Grade" prepend-icon="mdi-card-bulleted" v-model="getGrade"></v-select>
                    </v-col>

                    <v-col cols="12" md="6" sm="6">
                        <v-select :items="brach" :rules="branchRules" label="Branch" prepend-icon="mdi-sitemap" v-model="getBrach"></v-select>
                    </v-col>

                    
                    <v-card-text class="grey--text">Parent Details</v-card-text>
                    
                    <v-col cols="12" md="12" sm="12" >
                        <v-radio-group v-model="parent" row style="justify-content:center !important">
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
            </v-form>
            
          

        </v-card-text>
        <v-divider></v-divider>




        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn   @click="dialog = false" color="primary" v-if="!isEditing" depressed>OK</v-btn>
            <v-btn   @click="cancelEdit()" outlined color="grey" v-if="isEditing">Cancel</v-btn>
            <v-btn :disabled="!valid" color="primary" @click="Save()" depressed v-if="isEditing">Save
                <v-icon left>mdi-content-save</v-icon>
            </v-btn>
        </v-card-actions>

        <v-snackbar v-model="hasSaved" :timeout="2000" absolute bottom left>Student details has been updated</v-snackbar>

      </v-card>
    </v-dialog>
  </v-row>
</template>



<script>
export default {
    props:['student'],
    data(){
        return{
            imageUrl:'',
            image:null,

            valid:true,
            fname: this.student.fname,
            lname: this.student.lname,
            tp: this.student.tp,
            email: this.student.email,
            address: this.student.address,
            parentTp: this.student.parentTp,
            parentName: this.student.parentName,
            parent:this.student.parent,
            getGender:this.student.getGender,
            getGrade:this.student.getGrade,
            getBrach:this.student.getBrach,

            activePicker: null,
            date: this.student.date,
            menu: false,

            dialogm1: '',
            dialog: false,

            isEditing: null,
            hasSaved: false,
            
            // -----------Validation rules-----------
            nameRules: [v=> !!v || 'Name is required', v => /^[a-zA-Z_ ]*$/.test(v) || 'Must be text only', v=> (v && v.length >3)|| 'Name must be greater than 3'],
            
            tpRules: [v=> !!v || 'Telephone no. is required', v => /^\d+$/.test(v) || 'Must be a number', v=> (v && v.length ==10)|| 'Telephone no. must be 10'],
            
            emailRules: [v=> !!v || 'email is required', v=> /.+@.+\..+/.test(v) || 'email must be valid'],         
            
            addressRules: [v=> !!v || 'Address is required', v=> (v && v.length >5)|| 'Address must be greater than 5'],

            birthdayRules: [v=> !!v || 'Birthday is required'],

            genderRules: [v=> !!v || 'Gender is required'],

            gradeRules: [v=> !!v || 'Grade is required'],

            branchRules: [v=> !!v || 'Branch is required'],

            

            


            // -----------dropdown list-----------
            gender:['Male','Female','Other'],

            grade:['1','2','3','4','5','6','7','8','9','10','11','12','13','NVQ'],

            brach:['Hakmana','Walasmulla'],
            





            breadcrumbs: [
                { text: 'Students', disabled: false, href: '/Students' },
                { text: 'StudentRegistration', disabled: true, href: '/StudentRegistration' }
            ],
        
        }
        
        
    },
    watch: {
      menu (val) {
        val && setTimeout(() => (this.activePicker = 'YEAR'))
      }
    },

    methods:{
        Save(){
            if(this.$refs.form.validate()){
                console.log('fname:'+this.fname+' lname:'+this.lname+' tp:'+this.tp+' email:'+this.email+' address:'+this.address+' bday:'+this.date+' gender:'+this.getGender);
                console.log('parent type:'+this.parent+' parent name:'+this.parentName+' parent tp:'+this.parentTp);
                this.isEditing = !this.isEditing;
                this.hasSaved = true;
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
        
        cancelEdit(){
            this.isEditing = !this.isEditing;
            this.hasSaved = false;
        }
        
      
    }
}
</script>