<template>
    <div>
        
        <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>

        <v-container>


            <!----------------------------- Alerts ---------------------------------->

            <v-snackbar :timeout="5000" v-model="startUnsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Class start <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="5000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Class cancel <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="5000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Class cancel <strong>successful</strong> </v-snackbar>
            
            
            <v-snackbar v-model="classStartAlert" :multi-line="multiLine">
                Class start successfully. Now you can mark <strong>Attendance</strong> .
                <template v-slot:action="{ attrs }">
                    <v-btn color="red" text v-bind="attrs" @click="classStartAlert = false">Close</v-btn>
                </template>
            </v-snackbar>
            
            <!----------------------------- Alerts ---------------------------------->



            <template>
                <v-card flat class="blue-grey lighten-5" outlined color="red">
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Started Classes</v-card-title>
                    <v-row class="pa-5">
                        <v-col lg="4" md="4" sm="6" cols="12" v-for="startedClassDetails in startedClassDetails" :key="startedClassDetails.classID">
                            <v-card flat>
        
                                <v-card-title style="background: #006994" class="mb-2">
                                    <div class="title white--text" v-if="(startedClassDetails.subject.subjectName).length<18">{{ startedClassDetails.subject.subjectName}}</div>
                                    <div class="title white--text" v-else>{{ (startedClassDetails.subject.subjectName).substring(0,16)+".. " }}</div>
                                    <v-spacer></v-spacer>
                                    <div class="subtitle-1 white--text"><v-chip small>Grade:{{ startedClassDetails.grade }} </v-chip></div>
                                </v-card-title>
                                
                                <v-card-text><v-icon left>mdi-clock</v-icon> {{startedClassDetails.time}} <br>
                                <v-icon left>mdi-home</v-icon><v-chip small outlined>{{startedClassDetails.room}}</v-chip> <br>
                                <v-icon left>mdi-account</v-icon> {{startedClassDetails.teacher.teacherName}} </v-card-text>


                                <v-card-actions  class="pb-5">
                                    <v-btn :to="{ path: '/Attendance/TodayClasses/MarkAttendanceDailyFee/'+startedClassDetails.classID}" color="primary" dark outlined>Mark Attendance</v-btn>
                                    <v-spacer></v-spacer>
                                    <app-CancelClass class="mr-1" :classDetails='startedClassDetails'  @success="cancelAlert($event)" @failed="faileAlert($event)"></app-CancelClass>
                                </v-card-actions>
                                
                            </v-card>
                            
                            
                        </v-col>

                    </v-row>
                </v-card>
            </template>

            <template >
                <v-card flat  class="mt-6 blue-grey lighten-5">
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">New Classes</v-card-title>
                    <v-row class="pa-5">
                        <v-col lg="4" md="4" sm="6" cols="12" v-for="newClassDetails in newClassDetails" :key="newClassDetails.classID">
                            <v-card flat>
        
                                <v-card-title style="background: #43A047" class="mb-2">
                                    <div class="title white--text" v-if="(newClassDetails.subject.subjectName).length<18">{{ newClassDetails.subject.subjectName }}</div>
                                    <div class="title white--text" v-else>{{ (newClassDetails.subject.subjectName).substring(0,16)+".. " }}</div>
                                    <v-spacer></v-spacer>
                                    <div class="subtitle-1 white--text"><v-chip small>Grade:{{ newClassDetails.grade }} </v-chip></div>
                                </v-card-title>
                                
                                <v-card-text><v-icon left>mdi-clock</v-icon> {{newClassDetails.time}} <br>
                                <v-icon left>mdi-home</v-icon><v-chip small outlined>{{newClassDetails.room}}</v-chip> <br>
                                <v-icon left>mdi-account</v-icon> {{newClassDetails.teacher.teacherName}} </v-card-text>


                                <v-card-actions  class="pb-5">
                                    <v-btn depressed block dark color="#43A047" @click="startClass(newClassDetails.classID)">Start Class</v-btn>
                                </v-card-actions>
                                
                            </v-card>
                            
                            
                        </v-col>

                    </v-row>
                </v-card>
            </template>

            
            
        </v-container>

    </div>
</template>



<script>
    
    import CancelClass from './CancelClass.vue'
    export default{
        components:{
            'app-CancelClass':CancelClass
        },
        
        data(){
            return{

                todayClasses:[],
                startedClasses:[],
                startedClassDetails:[],
                newClassDetails:[],
                

                breadcrumbs: [
                    { text: 'Attendance', disabled: false, href: '/Attendance' },
                    { text: 'Today Classes', disabled: true, href: '/Attendance/TodayClasses' }
                ],

                multiLine: true,
                classStartAlert:false,

                successAlert:false,
                unsuccessAlert:false,
                startUnsuccessAlert:false
            }
        },

        created(){
            this.getClasses()
        },

        methods:{

            getClasses(){
                this.getStartedClasses()
                this.getClasseDetails()
            },

            getClasseDetails(){
                this.axios.get(this.$apiUrl+"/api/v1.0/ClassManagement/classes",{
                params:{
                    status: "Active",
                    day:"Tuesday"
                }
                
                }).then(Response=>(
                    this.todayClasses=Response.data.class.data,

                    this.todayClasses.forEach(element => {
                        element.time=element.startTime+"-"+element.endTime
                    }),

                    this.todayClasses.forEach(element => {
                        var todayClass=[]
                        todayClass=element;
                        var classID=element.classID;

                        this.startedClasses.forEach(element => {
                            if(element.classID==classID){
                                this.startedClassDetails.push(todayClass)
                            }else{
                                this.newClassDetails.push(todayClass)
                            }
                        })

                    })
                    
                ))
                
            },

            getStartedClasses(){
                this.axios.get(this.$apiUrl+"/api/v1.0/AttendanceManagement/attendances",{
                params:{
                    date: "2022-07-06"
                }
                }).then(Response=>(
                    this.startedClasses=Response.data.attendance.data
                ))
            },



            getTodayDate(){
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var yyyy = today.getFullYear();
                today = yyyy + '-' + mm + '-' + dd;
                return today;
            },


            startClass(classID){
                this.axios.patch(this.$apiUrl+'/api/v1.0/AttendanceManagement/attendances/classes',{
                    classID: classID
                })
                .then(Response=>{
                    if(Response.data.success == true){
                        this.classStartAlert=true
                        this.getClasses()
                    }else{
                        this.startUnsuccessAlert=true
                    }
                })
                .catch(error => {
                    this.startUnsuccessAlert=true
                    console.log(error.data)
                });

                
            },

            cancelAlert(success){
                this.successAlert = success;
            },
            faileAlert(failed){
                this.unsuccessAlert = failed;
            },
        }
        
    }
</script>
