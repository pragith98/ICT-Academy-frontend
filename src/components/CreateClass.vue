<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>

            <!----------------------------- Alerts ---------------------------------->

            <v-snackbar :timeout="3000" v-model="unsuccessfulCreateClass" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Class create <strong>failed</strong> </v-snackbar>
           
            <!----------------------------- Alerts ---------------------------------->
 

            <template>
                <v-card flat max-width="750px" style="margin: auto">
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Create Class</v-card-title>
                    
                    <v-stepper v-model="e1" flat alt-labels>
                        <v-stepper-header style="box-shadow:0px 0px 0px 0px" class="px-15">
                            <v-stepper-step :complete="e1 > 1" step="1">
                                Select Teacher
                            </v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step :complete="e1 > 2" step="2">
                                Select Subject
                            </v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step :complete="e1 > 3" step="3">
                                Class Details
                            </v-stepper-step>
                            <v-divider></v-divider>

                            <v-stepper-step step="4">
                                Finish
                            </v-stepper-step>
                        </v-stepper-header>
                        <v-divider></v-divider>
                        <v-stepper-items>
                            <v-form ref="form" v-model="valid" lazy-validation>
                                <v-stepper-content step="1">
                                    <v-card class="mb-12" flat min-height="200px">
                                        <v-row dense>
                                            <v-card-text class="grey--text">
                                                Please select <strong>Teacher</strong> from below menu.
                                            </v-card-text>
                                            <v-col cols="12" md="12" sm="12">
                                                <v-card-text>
                                                    <v-autocomplete :items="teachers" v-model="teacher" :filter="teacherFilter" item-text="firstName" item-value="teacherID" label="Teacher" prepend-icon="mdi-account" :rules="teacherRules"></v-autocomplete>
                                                </v-card-text>
                                            </v-col>
                                            <v-col cols="12" md="12" sm="12" align-self="center">
                                                <v-card-text class="grey--text">
                                                    * Use Name or ID to search for a teacher 
                                                </v-card-text>
                                            </v-col>

                                        </v-row>
                                        
                                    </v-card>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn outlined color="grey" @click="Reset(),scrollToTop()">Cancel</v-btn>
                                        
                                        <v-btn color="primary" @click="e1=2" depressed :disabled="!valid || !teacher">Next
                                            <v-icon>mdi-chevron-right</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-stepper-content>

                                <v-stepper-content step="2">
                                    <v-card class="mb-12" flat min-height="200px">
                                        <v-row dense>
                                            <v-card-text class="grey--text">
                                                Please select <strong>Category</strong> and the <strong>Subject</strong> from below menu.
                                            </v-card-text>
                                            <v-col cols="12" md="6" sm="6">
                                                <v-card-text>
                                                    <v-autocomplete @click="getAllCategories(), subject.subjectID=''" @change="getSubjectsByCategory()"  prepend-icon="mdi-candy-outline" :items="categories" v-model="category" :filter="categoryFilter" item-text='categoryName' item-value="categoryID" label="Category"  :rules="subjectRules" return-object></v-autocomplete>
                                                </v-card-text>
                                            </v-col>

                                            <v-col cols="12" md="6" sm="6">
                                                <v-card-text>
                                                    <v-autocomplete prepend-icon="mdi-format-align-center" :items="subjects" v-model="subject" :filter="subjectFilter" item-text='subjectName' item-value="subjectID" label="Subject" :rules="subjectRules" return-object></v-autocomplete>
                                                </v-card-text>
                                            </v-col>

                                        </v-row>
                                        
                                        <v-card color="grey lighten-3" flat class="pa-5">
                                            <v-card-text>
                                                If you won't find the <strong>Subject</strong>, please create new <strong>Subject</strong>,
                                            </v-card-text>
                                            <div class="mt-5">
                                                <app-createSubject @success="successfulCreateSubjectAlert($event)" @failed="unsuccessfulCreateSubjectAlert($event)"></app-createSubject>
                                            </div>
                                        </v-card>
                                        
                                        
                                    </v-card>
                                    
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn outlined color="grey" @click="e1=1">
                                            <v-icon >mdi-chevron-left</v-icon>
                                            Back
                                        </v-btn>
                                        <v-btn color="primary" @click="e1=3" depressed :disabled="!valid || !subject || !category">Next
                                            <v-icon>mdi-chevron-right</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-stepper-content>

                                <v-stepper-content step="3">
                                    <v-card class="mb-12" flat min-height="250px">
                                        <v-row dense>

                                            <v-col cols="12" md="12" sm="12">
                                                <v-select :items="grade" :rules="gradeRules" label="Grade" prepend-icon="mdi-card-bulleted" v-model="getGrade"></v-select>
                                            </v-col>

                                            <v-col cols="12" md="6" sm="6">
                                                <v-select :items="feeType"  label="Fee Type" prepend-icon="mdi-form-select" v-model="getFeeType" :rules="feeTypeRules" Required></v-select>
                                            </v-col>

                                            <v-col cols="12" md="6" sm="6">
                                                <v-text-field v-model="fee" label="Fee" prepend-icon="mdi-cash-multiple" :rules="feeRules" Required prefix="RS." placeholder="0.00" clearable></v-text-field>
                                            </v-col>

                                            <v-col cols="12" md="6" sm="6">
                                                <v-select :items="day" label="Day" prepend-icon="mdi-calendar" v-model="getDay" :rules="dayRules" Required ></v-select>
                                            </v-col>

                                            <v-col cols="12" md="6" sm="6">
                                                <v-select :items="location"  label="Location" prepend-icon="mdi-map-marker" v-model="getLocation" :rules="locationRules" Required :disabled="!getDay"></v-select>
                                            </v-col>

                                            <v-col cols="12" md="6" sm="6">
                                                <div>
                                                    <v-menu ref="startTimeMenu" v-model="startTimeMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="startTime" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="startTime" label="Start Time" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on" :rules="timeRules" Required :disabled="!getDay"></v-text-field>
                                                        </template>
                                                        <v-time-picker v-if="startTimeMenu" v-model="startTime" full-width @click:minute="$refs.startTimeMenu.save(startTime)" ></v-time-picker>
                                                    </v-menu>
                                                </div>
                                            </v-col>

                                            <v-col cols="12" md="6" sm="6">
                                                <div>
                                                    <v-menu ref="endTimeMenu" v-model="endTimeMenu" :close-on-content-click="false" :nudge-right="40" :return-value.sync="endTime" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                                        <template v-slot:activator="{ on, attrs }">
                                                            <v-text-field v-model="endTime" label="End Time" prepend-icon="mdi-clock-time-four-outline" readonly v-bind="attrs" v-on="on" :rules="timeRules" Required :disabled="!startTime"></v-text-field>
                                                        </template>
                                                        <v-time-picker v-if="endTimeMenu" v-model="endTime" full-width @click:minute="$refs.endTimeMenu.save(endTime)"></v-time-picker>
                                                    </v-menu>
                                                </div>
                                            </v-col>

                                        </v-row>
                                        
                                    </v-card>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn outlined color="grey" @click="e1=2">
                                            <v-icon >mdi-chevron-left</v-icon>
                                            Back
                                        </v-btn>
                                        <v-btn color="primary" @click="e1=4, createClassName()" depressed :disabled="!valid || !getFeeType || !fee || !getLocation || !getDay || !startTime || !endTime || !getGrade">Next
                                            <v-icon>mdi-chevron-right</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-stepper-content>

                                <v-stepper-content step="4">
                                    <v-card  class="mb-12 text-center" height="100px" flat>
                                        <v-col cols="12" md="12" sm="12">
                                            <v-text-field v-model="className" label="Class Name" prepend-icon="mdi-home-variant" :rules="nameRules" required ></v-text-field>
                                        </v-col>


                                        <v-btn x-large color="primary" depressed @click="createClass()">Create Class
                                            <v-icon right>mdi-home-plus</v-icon>
                                        </v-btn>
                                        <br>
                                        <v-btn text color="grey" class="mt-3" @click="Reset(), e1=1">Cancel</v-btn>
                                    </v-card>

                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn outlined color="grey" @click="e1=3">
                                            <v-icon >mdi-chevron-left</v-icon>
                                            Back
                                        </v-btn>
                                    </v-card-actions>
                                </v-stepper-content>
                            </v-form>
                            
                        </v-stepper-items>
                    </v-stepper>
                </v-card>
            </template>


            <!----------------------------------- dialog box ------------------------------------------>

            <v-dialog v-model="dialog" persistent max-width="400px">
                <v-card>
                    <v-container class="text-center">
                        <v-card-title>
                            <v-row justify="center">
                                <v-icon size="100" color="success">mdi-check-circle-outline</v-icon>
                            </v-row>
                        </v-card-title>
                        <span class="text-h6 text-center">Class created <strong>successfully</strong> </span>
                    </v-container>
                    
                    
                    <v-card-actions style="justify-content: center">
                        <v-btn @click="dialog=false" depressed block color="success">Ok</v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>

            <!----------------------------------- dialog box ------------------------------------------>
            
        </v-container>
    </div>
 
    
</template>

<script>
    import CreateSubject from './CreateSubject.vue'
    

    export default {
        components:{
            'app-createSubject':CreateSubject
        },
        data () {
            return {
                dialog:false,

                valid:true,
                e1: 1,

                

                getLocation:'',
                getDay:'',
                getFeeType:'Daily',
                className:'',
                fee:'0.00',
                getGrade:'',


                startTimeMenu: false,
                startTimeModel: false,
                startTime: null,

                endTimeMenu: false,
                endTimeModel: false,
                endTime: null,

                teacher:null,
                subject:[{
                    subjectID:null, subjectName:null
                }],

                category:[{
                    categoryID:null, categoryName:null
                }],
                

                
                

                

                breadcrumbs: [
                    { text: 'Classes', disabled: false, href: '/Classes' },
                    { text: 'CreateClass', disabled: true, href: '/Class/CreateClass' }
                ],


                // -----------Validation rules-----------
                nameRules: [v=> !!v || 'Class name is required', v=> (v && v.length >3)|| 'Name must be greater than 3'],
                
                feeTypeRules: [v=> !!v || 'Fee type is required'],

                locationRules: [v=> !!v || 'Location is required'],

                dayRules: [v=> !!v || 'Day is required'],

                timeRules: [v=> !!v || 'Time is required'],

                feeRules: [v=> !!v || 'Fee is required', v => /^\d{0,8}(\.\d{1,4})?$/.test(v) ||'Invalid fee', v=> v != 0.00 ],

                teacherRules: [v=> !!v || 'Teacher is required'],

                subjectRules: [v=> !!v || 'Subject is required'],

                gradeRules: [v=> !!v || 'Grade is required'],



                // -----------dropdown list-----------
                location:[],
                
                subjects: [],

                categories:[],

                teachers:[],

                day:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],

                feeType:['Monthly','Daily'],

                grade:['1','2','3','4','5','6','7','8','9','10','11','12','13','Other'],
                



                

                multiLine: true,

                
                unsuccessfulCreateClass:false,
            }
        },

        created(){
            this.getClassHall()
            this.getTeachers()
            this.getAllCategories()
        },

        methods: {
            createClassName(){
                this.className = this.subject.subjectName+"/Grd"+this.getGrade+"/"+this.getDay+"/"+this.startTime;
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

            getClassHall(){
                this.axios.get(this.$apiUrl+"/api/v1.0/BranchManagement/branches/"+'BRNCH001')
                .then(Response=>{
                    var halls=Response.data.branch.data[0].noOfRooms;

                    for(var i=1; i<=halls; i++){
                        this.location.push("Room No. "+i);
                    }
                    this.location.push("Online");
                })
            },

            getTeachers(){
                this.axios.get(this.$apiUrl+"/api/v1.0/TeacherManagement/teachers",{
                params:{
                    status: "Active"
                }
                
                }).then(Response=>(
                    this.teachers=Response.data.teacher.data,
                    
                    this.teachers.forEach(element => {
                        element.firstName=element.title+" "+element.firstName+" "+element.lastName
                    })
                    
                ))
            },

            Reset() {
                this.$refs.form.reset()
            },

            scrollToTop() {
                window.scrollTo(0, 0);
            },

            teacherFilter (item, queryText) {
                const textOne = item.firstName.toLowerCase()
                const textTwo = item.teacherID.toLowerCase()
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


            createClass(){
                if(this.$refs.form.validate()){
                    this.axios.post(this.$apiUrl+"/api/v1.0/ClassManagement/classes",{
                        className: this.className,
                        day: this.getDay,
                        startTime: this.startTime,
                        endTime : this.endTime,
                        grade : this.getGrade,
                        room: this.getLocation,
                        classFee: this.fee +".00",
                        feeType: this.getFeeType,
                        status: "Active",
                        subjectID: this.subject.subjectID,
                        categoryID: this.category.categoryID,
                        teacherID: this.teacher,
                        branchID: "BRNCH001",
                        
                        
                    })
                    .then(Response=>{
                        
                        if(Response.data.success == true){
                            this.dialog = true
                            this.e1=1
                            this.Reset()
                        }else{
                            this.unsuccessfulCreateClass = true;
                        }
                    })
                    .catch(error => {
                        this.unsuccessfulCreateClass = true;
                        console.log(error.data)
                        
                    });
                    
                }
            },



            


        }
    }
</script>
            



<style scoped>
    .v-application .justify-end {
        justify-content: center !important;
    }
</style>

            
        
        

