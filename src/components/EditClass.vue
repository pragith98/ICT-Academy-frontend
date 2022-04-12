<template>
    <v-row justify="end">

            <!----------------------------- Alerts ---------------------------------->

            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Staff delete <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Staff delete <strong>successful</strong> </v-snackbar>
            
            <v-snackbar v-model="successfulCreateSubject" :multi-line="multiLine">
                Subject Create successfully. Now you can add it from the table.
                <template v-slot:action="{ attrs }">
                    <v-btn color="red" text v-bind="attrs" @click="successfulCreateSubject = false">Close</v-btn>
                </template>
            </v-snackbar>

            <v-snackbar :timeout="3000" v-model="unsuccessfulCreateSubject" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Subject Create <strong>failed</strong> </v-snackbar>
            
            <!----------------------------- Alerts ---------------------------------->

        <v-dialog v-model="dialogMain" scrollable max-width="700px" persistent>
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="teal" dark depressed  v-bind="attrs" v-on="on">Edit<v-icon dark right>mdi-pencil</v-icon></v-btn>
            </template>
            <v-card max-width="700" flat>
                <v-card-title class="heading-1 blue lighten-4 primary--text">Edit Class</v-card-title>
                
                <v-divider></v-divider>
                <v-card-text >
                    <v-card flat max-width="750px" style="margin: auto">
                        
                        
                        <v-stepper v-model="e1" flat alt-labels>
                            <v-stepper-header style="box-shadow:0px 0px 0px 0px" class="px-15">
                                <v-stepper-step :complete="e1 > 1" step="1">
                                    Class Details
                                </v-stepper-step>
                                <v-divider></v-divider>

                                <v-stepper-step :complete="e1 > 2" step="2">
                                    Select Teacher
                                </v-stepper-step>
                                <v-divider></v-divider>

                                <v-stepper-step :complete="e1 > 3" step="3">
                                    Select Subject
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
                                        <v-card class="mb-12" flat min-height="250px">
                                            <v-row dense>
                                                <v-col cols="12" md="6" sm="6">
                                                    <v-text-field v-model="className" label="Class Name" prepend-icon="mdi-home-variant" :rules="nameRules" required ></v-text-field>
                                                </v-col>

                                                <v-col cols="12" md="6" sm="6">
                                                    <v-select :items="grade" :rules="gradeRules" label="Grade" prepend-icon="mdi-card-bulleted" v-model="getGrade"></v-select>
                                                </v-col>

                                                <v-col cols="12" md="6" sm="6">
                                                    <v-select :items="feeType"  label="Fee Type" prepend-icon="mdi-form-select" v-model="getFeeType" :rules="feeTypeRules" Required></v-select>
                                                </v-col>

                                                <v-col cols="12" md="6" sm="6">
                                                    <v-text-field v-model="fee" label="Fee" prepend-icon="mdi-cash-multiple" :rules="feeRules" Required></v-text-field>
                                                </v-col>

                                                <v-col cols="12" md="6" sm="6">
                                                    <v-select :items="location"  label="Location" prepend-icon="mdi-map-marker" v-model="getLocation" :rules="locationRules" Required></v-select>
                                                </v-col>

                                                <v-col cols="12" md="6" sm="6">
                                                    <v-select :items="day" label="Day" prepend-icon="mdi-calendar" v-model="getDay" :rules="dayRules" Required :disabled="!getLocation"></v-select>
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
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn outlined color="grey" @click="Reset(),scrollToTop()">Cancel</v-btn>
                                            <v-btn color="primary" @click="e1=2" depressed :disabled="!valid || !className || !getFeeType || !fee || !getLocation || !getDay || !startTime || !endTime || !getGrade">Next
                                                <v-icon>mdi-chevron-right</v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-stepper-content>

                                    <v-stepper-content step="2">
                                        <v-card class="mb-12" flat min-height="200px">
                                            <v-row dense>
                                                <v-col cols="12" md="6" sm="6">
                                                    <v-card-text>
                                                        <v-autocomplete :items="teachers" v-model="teacher" :filter="teacherFilter" item-text="name" item-value="teacherID" label="Teacher" prepend-icon="mdi-account" :rules="teacherRules"></v-autocomplete>
                                                    </v-card-text>
                                                </v-col>
                                                <v-col cols="12" md="6" sm="6" align-self="center">
                                                    <v-card-text class="grey--text">
                                                        * Use Name or ID to search for a teacher 
                                                    </v-card-text>
                                                </v-col>

                                            </v-row>
                                            
                                        </v-card>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn outlined color="grey" @click="e1=1">
                                                <v-icon >mdi-chevron-left</v-icon>
                                                Back
                                            </v-btn>
                                            <v-btn color="primary" @click="e1=3" depressed :disabled="!valid || !teacher">Next
                                                <v-icon>mdi-chevron-right</v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-stepper-content>

                                    <v-stepper-content step="3">
                                        <v-card class="mb-12" flat min-height="200px">
                                            <v-row dense>
                                                <v-col cols="12" md="12" sm="12">
                                                    <v-text-field v-model="subjectName" label="Subject" prepend-icon="mdi-format-align-center" :rules="subjectRules" required  readonly hint="Add subject from below table"></v-text-field>
                                                </v-col>
                                                <v-card-text class="grey--text">
                                                    * Add subject from below table
                                                </v-card-text>
                                                
                                                
                                                <v-col cols="12" md="12" sm="12">
                                                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="subjectSearch" append-icon="mdi-magnify" label="Search Subject" single-line hide-details></v-text-field></v-card-title>
                                                    <v-data-table :headers="subjectHeaders" :items="subjects" :search="subjectSearch" :items-per-page="5">
                                                        <template v-slot:item="row">
                                                            <tr>
                                                                <td>{{row.item.name}}</td>
                                                                <td>{{row.item.medium}}</td>
                                                                <td>{{row.item.category}}</td>
                                                                <td>
                                                                    <v-btn color="primary" outlined @click="subjectName=row.item.name, subject=row.item.id">Add</v-btn>
                                                                </td>
                                                            </tr>
                                                        </template>
                                                    </v-data-table>
                                                </v-col>
                                                
                                            </v-row>
                                            <v-divider></v-divider>
                                            <v-card-text>
                                                * If you won't find the Subject from the table,
                                            </v-card-text>
                                            <div class="mt-5">
                                                <app-createSubject @success="successfulCreateSubjectAlert($event)" @failed="unsuccessfulCreateSubjectAlert($event)"></app-createSubject>
                                            </div>
                                            
                                        </v-card>
                                        <v-divider></v-divider>
                                        <v-card-actions>
                                            <v-spacer></v-spacer>
                                            <v-btn outlined color="grey" @click="e1=2">
                                                <v-icon >mdi-chevron-left</v-icon>
                                                Back
                                            </v-btn>
                                            <v-btn color="primary" @click="e1=4" depressed :disabled="!valid || !subjectName">Next
                                                <v-icon>mdi-chevron-right</v-icon>
                                            </v-btn>
                                        </v-card-actions>
                                    </v-stepper-content>

                                    <v-stepper-content step="4">
                                        <v-card  class="mb-12 text-center" height="100px" flat>
                                            <v-btn x-large color="primary" depressed @click="submit()">Save Class
                                                <v-icon right>mdi-content-save</v-icon>
                                            </v-btn>
                                            <br>
                                            <v-btn text color="grey" class="mt-3" @click="dialogMain = false">Cancel</v-btn>
                                        </v-card>
                                        <v-divider></v-divider>
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
                
                </v-card-text>
                
            </v-card>
        
        </v-dialog>

        <!----------------------------------- dialog box ------------------------------------------>

        <v-dialog v-model="dialogAlert" persistent max-width="400px">
            <v-card>
                <v-container class="text-center">
                    <v-card-title>
                        <v-row justify="center">
                            <v-icon size="100" color="success">mdi-check-circle-outline</v-icon>
                        </v-row>
                    </v-card-title>
                    <span class="text-h6 text-center">Class Updated <strong>successfully</strong> </span>
                </v-container>
                
                
                <v-card-actions style="justify-content: center">
                    <v-btn color="success" depressed @click="dialogMain = false,dialogAlert=false, e1=1" block >Ok</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!----------------------------------- dialog box ------------------------------------------>

    </v-row>
</template>



<script>
    import CreateSubject from './CreateSubject.vue'

    export default {
        props:['classDetails'],
        components:{
            'app-createSubject':CreateSubject
        },
        data(){
            return{
                dialogm1: '',
                dialogMain: false,
                dialog: false,
                dialogAlert: false,

                valid:true,
                e1: 1,

                getLocation:'',
                getDay:'',
                getFeeType:'Daily Pay',
                className:'',
                fee:'',
                getGrade:'',


                startTimeMenu: false,
                startTimeModel: false,
                startTime: null,

                endTimeMenu: false,
                endTimeModel: false,
                endTime: null,

                teacher:null,
                subject:null,
                subjectName:null,

                subjectSearch: '',
                subjectHeaders: [
                    {text: 'NAME',align: 'start', sortable: true, value:'name'},
                    { text: 'MEDIUM',sortable: true, value: 'medium', filterable:false},
                    { text: 'CATEGORY', sortable: true, value: 'category' },
                    { text: '', sortable: false, value: 'Action' },
                ],
                subjects: [
                    {name:'Science',id:'sub001',medium:'Sinhala',category:'Ordinary Level'},
                    {name:'Maths',id:'sub002',medium:'Sinhala',category:'Ordinary Level'},
                    {name:'Scholarship',id:'sub003',medium:'Sinhala',category:'Scholarship'},
                    {name:'BS',id:'sub004',medium:'Sinhala',category:'Advanced Level'},
                    {name:'Maths',id:'sub005',medium:'English',category:'Ordinary Level'}
                ],

                teachers:[
                    {name:'Samansfsdf Herathsfddf 2121', teacherID:'2121'},
                    {name:'Dasun Rathnayake', teacherID:'2133'},
                    {name:'Kasun Bandara', teacherID:'24121'},
                    {name:'Maheshi Ranathunga', teacherID:'3167'},
                ],

                

                breadcrumbs: [
                    { text: 'Classes', disabled: false, href: '/Classes' },
                    { text: 'CreateClass', disabled: true, href: '/Class/CreateClass' }
                ],


                // -----------Validation rules-----------
                nameRules: [v=> !!v || 'Class name is required', v => /^[A-Za-z0-9 _]*[A-Za-z0-9][A-Za-z0-9 _]*$/.test(v) || 'Invalid characters', v=> (v && v.length >3)|| 'Name must be greater than 3'],
                
                feeTypeRules: [v=> !!v || 'Fee type is required'],

                locationRules: [v=> !!v || 'Location is required'],

                dayRules: [v=> !!v || 'Day is required'],

                timeRules: [v=> !!v || 'Time is required'],

                feeRules: [v=> !!v || 'Fee is required', v => /^\d{0,8}(\.\d{1,4})?$/.test(v) ||'Invalid fee' ],

                teacherRules: [v=> !!v || 'Teacher is required'],

                subjectRules: [v=> !!v || 'Subject is required'],

                gradeRules: [v=> !!v || 'Grade is required'],



                // -----------dropdown list-----------
                location:['Hall 1','Hall 2','Hall 3','Online'],

                day:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],

                feeType:['Monthly Pay','Daily Pay'],

                grade:['1','2','3','4','5','6','7','8','9','10','11','12','13','Other'],



                successAlert:false,
                unsuccessAlert:false,

                multiLine: true,

                successfulCreateSubject:false,
                unsuccessfulCreateSubject:false,
            }
        },

        methods: {
            

            Reset() {
                this.$refs.form.reset()
            },

            scrollToTop() {
                window.scrollTo(0, 0);
            },

            teacherFilter (item, queryText) {
                const textOne = item.name.toLowerCase()
                const textTwo = item.teacherID.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1

            },

            submit(){
                console.log(this.teacher);
                this.dialogAlert= !this.dialogAlert
            },



            // ----------------alerts--------------------------
            deleteAlert(success){
                this.successAlert = success;
            },
            faileAlert(failed){
                this.unsuccessAlert = failed;
            },
            successfulCreateSubjectAlert(success){
                this.successfulCreateSubject = success;
            },
            unsuccessfulCreateSubjectAlert(failed){
                this.unsuccessfulCreateSubject = failed;
            },


        }
    }
</script>
            



<style scoped>
    .v-application .justify-end {
        justify-content: center !important;
    }
</style>