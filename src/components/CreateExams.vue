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

            <!----------------------------- Alerts ---------------------------------->

            <v-snackbar :timeout="3000" v-model="unSuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon>Exam Create <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Exam Create <strong>successful</strong> </v-snackbar>
            <!----------------------------- Alerts ---------------------------------->
 

            <v-form ref="form" v-model="valid" lazy-validation>
                <v-card flat max-width="750px" style="margin: auto">
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Create Exam</v-card-title>
                    
                          
                    <v-row style="padding:12px">
                        <v-col>
                            <fieldset class="px-5 mb-3">
                                <legend><v-card-text class="grey--text">Exam Details</v-card-text></legend>
                                <v-row dense>
                                
                                    <v-col cols="12" md="12" sm="12">
                                        <v-text-field v-model="examName" label="Exam Name" prepend-icon="mdi-file-document-edit" :rules="nameRules" required ></v-text-field>
                                    </v-col>
                                    
                                    <v-col cols="12" md="6" sm="6">
                                        <v-text-field v-model="totalMark" placeholder="eg: 100" :rules="markRules" label="Total Mark" prepend-icon="mdi-flag-triangle" required maxlength="3" ></v-text-field>
                                    </v-col>
                                    
                                    <v-col cols="12" md="6" sm="6">
                                        <template>
                                            <div>
                                                <v-menu ref="menu" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y min-width="auto">
                                                    <template v-slot:activator="{ on, attrs }">
                                                        <v-text-field v-model="date" label="Conducting Date" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" :rules="dateRules"></v-text-field>
                                                    </template>
                                                    <v-date-picker @input="menu = false" v-model="date" :active-picker.sync="activePicker"  :min="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)" ></v-date-picker>
                                                </v-menu>
                                            </div>
                                        </template>
                                    </v-col>

                                </v-row>
                            </fieldset>

                            <!-- <fieldset class="px-5 mb-3">
                                <legend><v-card-text class="grey--text">Subject Details</v-card-text></legend>
                                <v-row dense>

                                    <v-col cols="12" md="6" sm="6">
                                        <v-autocomplete @click="getAllCategories(), subject.subjectID='', subject.subjectName='' " @change="getSubjectsByCategory()"  prepend-icon="mdi-candy-outline" :items="categories" v-model="category" :filter="categoryFilter" item-text='categoryName' item-value="categoryID" label="Category"  :rules="subjectRules" return-object></v-autocomplete>
                                    </v-col>

                                    <v-col cols="12" md="6" sm="6">
                                            <v-autocomplete prepend-icon="mdi-format-align-center" @click="classs.classID='', classs.className=''" @change="getAllClasses()" :items="subjects" v-model="subject" :filter="subjectFilter" item-text='subjectName' item-value="subjectID" label="Subject" :rules="subjectRules" return-object></v-autocomplete>
                                    </v-col>

                                </v-row>
                            </fieldset> -->

                            <fieldset class="px-5 mb-3">
                                <legend><v-card-text class="grey--text">Class Details</v-card-text></legend>
                                <v-row dense>
                                
                                    <v-col cols="12" md="12" sm="12">
                                        <v-autocomplete prepend-icon="mdi-home-variant"  :items="classes" v-model="classs" :filter="classFilter" item-text='className' item-value="classID" label="Class" :rules="subjectRules" return-object></v-autocomplete>
                                    </v-col>
                                    
                                </v-row>
                            </fieldset>
                        </v-col>
                    </v-row>

                    
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn outlined color="grey" @click="Reset()">Cancel</v-btn>
                        <v-btn color="primary" @click="createExam()" depressed :disabled="!valid || !examName || !totalMark || !date || !classs.classID">Create</v-btn>
                    </v-card-actions>
                                

                                
                                    
                                
                            
                            
                        
                </v-card>
            </v-form>


            
        </v-container>
    </div>
 
    
</template>

<script>
    
    

    export default {
        components:{
            
        },
        data () {
            return {
                overlay:false,

                valid:true,
                
                examName:'',
                totalMark:'',
        

                activePicker: null,
                date: null,
                menu: false,

                subjects: [],
                categories:[],
                classes:[],

                subject:[{
                    subjectID:'', subjectName:''
                }],

                category:[{
                    categoryID:'', categoryName:''
                }],

                // classs:[{
                //     classID:'', className:''
                // }],

                classs:[],


                breadcrumbs: [
                    { text: 'Exams', disabled: false, href: '/Exams' },
                    { text: 'CreateExams', disabled: true, href: '/Exams/CreateExams' }
                ],


                // -----------Validation rules-----------

                markRules: [v=> !!v || 'Total mark is required', v => /^\d+$/.test(v) || 'Must be a number', v=> (v !=0)|| 'must be greater than 0'],

                nameRules: [v=> !!v || 'Class name is required', v=> (v && v.length >3)|| 'Name must be greater than 3'],

                subjectRules: [v=> !!v || 'This field is required'],

                dateRules: [v=> !!v || 'Conducted date is required'],



                

                successAlert:false,
                unSuccessAlert:false
            }
        },

        created(){
            this.getClassByTeacher()
        },

        methods: {

            getClassByTeacher(){
                this.axios.get(this.$apiUrl+"/api/v1.0/TeacherManagement/teachers/"+localStorage.getItem('userID')+"/classes").then(Response=>(
                    this.classes= Response.data.teacher.classes
                    
                ))
            },

            getSubjectsByCategory(){
                this.axios.get(this.$apiUrl+"/api/v1.0/CategoryManagement/categories/"+this.category.categoryID+"/subjects").then(Response=>(
                    this.subjects= Response.data.category.data[0].subjects
                ))
            },

            getAllCategories(){
                this.axios.get(this.$apiUrl+"/api/v1.0/CategoryManagement/categories").then(Response=>(
                    this.categories= Response.data.category.data
                ))
                
            },

            getAllClasses(){
                this.axios.get(this.$apiUrl+"/api/v1.0/SubjectManagement/subjects/"+this.subject.subjectID+"/classes").then(Response=>(
                    this.classes= Response.data.subject.data[0].classes
                ))
                
            },

            classFilter (item, queryText) {
                const textOne = item.className.toLowerCase()
                const textTwo = item.classID.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
            },

            subjectFilter (item, queryText) {
                const textOne = item.subjectName.toLowerCase()
                const textTwo = item.subjectID.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
            },

            categoryFilter (item, queryText) {
                const textOne = item.categoryName.toLowerCase()
                const textTwo = item.categoryID.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1
            },

            createExam(){
                this.overlay=!this.overlay

                if(this.$refs.form.validate()){
                    this.axios.post(this.$apiUrl+"/api/v1.0/ExamManagement/exams",{
                        exam: this.examName,
                        totalMark: this.totalMark,
                        date: this.date,
                        subjectID : this.classs.subject.subjectID,
                        categoryID: this.classs.category.categoryID,
                        classID : this.classs.classID,
                        branchID: this.classs.branch.branchID,
                        
                    })
                    .then(Response=>{
                        if(Response.data.success == true){
                            //-----------store students acording to class-----------
                            this.axios.post(this.$apiUrl+"/api/v1.0/MarkManagement/exams",{
                                examID:Response.data.examID

                            }).then(Response=>{
                                if(Response.data.success == true){
                                    this.overlay=false
                                    this.successAlert=true
                                    this.Reset()
                                    
                                }else{
                                    this.unsuccessfulCreateClass = true;
                                }
                            }).catch(error => {
                                this.overlay=false
                                this.unSuccessAlert=true
                                console.log(error.data)
                                
                            });
                                
                           
                        }else{
                            this.unSuccessAlert=true
                        }
                    })
                    .catch(error => {
                        this.overlay=false
                        this.unSuccessAlert=true
                        console.log(error.data)
                        
                    });
                    
                }
            },


            // createExam(){
            //     this.overlay=!this.overlay
            //     if(this.$refs.form.validate()){
            //         this.axios.post(this.$apiUrl+"/api/v1.0/ExamManagement/exams",{
            //             exam: this.examName,
            //             totalMark: this.totalMark,
            //             date: this.date,
            //             subjectID : this.subject.subjectID,
            //             categoryID: this.category.categoryID,
            //             classID : this.classs.classID,
            //             branchID: localStorage.getItem('branch'),
            //         })
            //         .then(Response=>{
            //             if(Response.data.success == true){
            //                 //-----------store students acording to class-----------
            //                 this.axios.post(this.$apiUrl+"/api/v1.0/MarkManagement/exams",{
            //                     examID:Response.data.examID
            //                 }).then(Response=>{
            //                     if(Response.data.success == true){
            //                         this.overlay=false
            //                         this.successAlert=true
            //                         this.Reset()
            //                     }else{
            //                         this.unsuccessfulCreateClass = true;
            //                     }
            //                 }).catch(error => {
            //                     this.overlay=false
            //                     this.unSuccessAlert=true
            //                     console.log(error.data)
            //                 });
            //             }else{
            //                 this.unSuccessAlert=true
            //             }
            //         })
            //         .catch(error => {
            //             this.overlay=false
            //             this.unSuccessAlert=true
            //             console.log(error.data)
                        
            //         });
                    
            //     }
            // },

            Reset() {
                this.$refs.form.reset()
            },
            

        }
    }
</script>
            



<style scoped>
    .v-application .justify-end {
        justify-content: center !important;
    }

    fieldset{
        border-color: rgb(225, 225, 225);
        border-style: solid;
        border:0.1;
        border-style: solid;
    }
</style>

            
        
        

