<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>

            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Staff delete <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Staff delete <strong>successful</strong> </v-snackbar>
            
            
 

            <template>
                <v-card flat max-width="750px" style="margin: auto">
                    <v-card-title class="heading-1 blue lighten-4 primary--text">Create Class</v-card-title>
                    
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
                                            <v-col cols="12" md="12" sm="12">
                                                <v-text-field v-model="className" label="Class Name" prepend-icon="mdi-home-variant" :rules="nameRules" required ></v-text-field>
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
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn outlined color="grey" @click="Reset(),scrollToTop()">Cancel</v-btn>
                                        <!-- <v-btn color="primary" @click="e1=2" depressed :disabled="!valid || !className || !getFeeType || !fee || !getLocation || !getDay || !startTime || !endTime">Next -->
                                        <v-btn color="primary" @click="e1=2" depressed >Next
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
                                            <v-col cols="12" md="6" sm="6">
                                                <v-card-text>
                                                    <v-autocomplete :items="subjects" v-model="subject" :filter="subjectFilter" item-text="name" item-value="subjectID" label="Subject" prepend-icon="mdi-format-align-center" :rules="teacherRules"></v-autocomplete>
                                                </v-card-text>
                                            </v-col>
                                            <v-col cols="12" md="6" sm="6" align-self="center">
                                                <v-card-text class="grey--text">
                                                    * Use Name, ID, Category or Medium to search for a subject 
                                                </v-card-text>
                                            </v-col>

                                        </v-row>
                                        
                                    </v-card>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn outlined color="grey" @click="e1=2">
                                            <v-icon >mdi-chevron-left</v-icon>
                                            Back
                                        </v-btn>
                                        <v-btn color="primary" @click="e1=4" depressed>Next
                                            <v-icon>mdi-chevron-right</v-icon>
                                        </v-btn>
                                    </v-card-actions>
                                </v-stepper-content>

                                <v-stepper-content step="4">
                                    <v-card color="grey" class="mb-12" height="200px" flat></v-card>
                                    <v-card-actions>
                                        <v-spacer></v-spacer>
                                        <v-btn outlined color="grey" @click="e1=3">
                                            <v-icon >mdi-chevron-left</v-icon>
                                            Back
                                        </v-btn>
                                        <v-btn color="primary" depressed>Create Class</v-btn>
                                    </v-card-actions>
                                </v-stepper-content>
                            </v-form>
                            
                        </v-stepper-items>
                        

                       
                    </v-stepper>

                </v-card>
            </template>

            
            
        </v-container>
    </div>
 
    
</template>

<script>
    

    export default {
        components:{
            
        },
        data () {
            return {

                valid:true,
                e1: 1,

                getLocation:'',
                getDay:'',
                getFeeType:'Daily Pay',
                className:'',
                fee:'',


                startTimeMenu: false,
                startTimeModel: false,
                startTime: null,

                endTimeMenu: false,
                endTimeModel: false,
                endTime: null,

                teacher:null,
                subject:null,

                teachers:[
                    {name:'Samansfsdf Herathsfddf 2121', teacherID:'2121'},
                    {name:'Dasun Rathnayake', teacherID:'2133'},
                    {name:'Kasun Bandara', teacherID:'24121'},
                    {name:'Maheshi Ranathunga', teacherID:'3167'},
                ],

                subjects:[
                    {name:'Sinhala, Category: OL, Medium: Sinhala', subjectID:'2121', category:'OL', medium:'Sinhala'},
                    {name:'Science', subjectID:'2133', category:'OL', medium:'Sinhala'},
                    {name:'Maths', subjectID:'24121', category:'OL', medium:'English'},
                    {name:'Bs', subjectID:'3167', category:'AL', medium:'Sinhala'},
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



                // -----------dropdown list-----------
                location:['Hall 1','Hall 2','Hall 3','Online'],

                day:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],

                feeType:['Monthly Pay','Daily Pay'],

                successAlert:false,
                unsuccessAlert:false,
            }
        },

        methods: {
            deleteAlert(success){
                this.successAlert = success;
            },
            faileAlert(failed){
                this.unsuccessAlert = failed;
            },

            Reset () {
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

            subjectFilter (item, queryText) {
                const textOne = item.name.toLowerCase()
                const textTwo = item.teacherID.toLowerCase()
                const searchText = queryText.toLowerCase()

                return textOne.indexOf(searchText) > -1 || textTwo.indexOf(searchText) > -1

            },

            submit(){
                console.log(this.teacher);
            }
        }
    }
</script>
            





            
        
        

