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
                <div v-if="overlayMessage">
                    <v-progress-circular indeterminate size="64"></v-progress-circular><br><br>
                    <p>Please wait..</p>
                </div>
                <div v-else>
                    <p>It seems spent more time. Please refresh!</p>
                    <v-btn color="white" depressed class="black--text" @click="reloadPage()">click here</v-btn>
                </div>
                
                
            </div>
        </v-overlay>
        <!-- ---------------------------------overlay for waiting ----------------------------------------->

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
                <v-card flat class="blue-grey lighten-5" outlined color="red" v-show="startedClassDetails.length>0">
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
                                <div v-if="(startedClassDetails.teacher.teacherName).length<28"><v-icon left>mdi-account</v-icon>{{ startedClassDetails.teacher.teacherName }}</div>
                                <div v-else><v-icon left>mdi-account</v-icon>{{ (startedClassDetails.teacher.teacherName).substring(0,28)+".. " }}</div>
                                </v-card-text>


                                <v-card-actions  class="pb-5">
                                    <v-btn v-if="startedClassDetails.feeType=='Daily'" :to="{ path: '/Attendance/TodayClasses/MarkAttendanceDailyFee/'+startedClassDetails.classID}" color="primary" dark outlined>Mark Attendance</v-btn>
                                    <v-btn v-else :to="{ path: '/Attendance/TodayClasses/MarkAttendanceMonthlyFee/'+startedClassDetails.classID}" color="primary" dark outlined>Mark Attendance</v-btn>
                                    <v-spacer></v-spacer>
                                    <app-CancelClass class="mr-1" :todayDate="todayDate" :classDetails='startedClassDetails'  @success="cancelAlert($event)" @failed="faileAlert($event)"></app-CancelClass>
                                </v-card-actions>
                                
                            </v-card>
                            
                        </v-col>

                    </v-row>
                </v-card>
            </template>

            <template >
                <v-card flat  class="mt-6 blue-grey lighten-5" v-show="newClassDetails.length>0">
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Scheduled Classes</v-card-title>
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
                                <div v-if="(newClassDetails.teacher.teacherName).length<28"><v-icon left>mdi-account</v-icon>{{ newClassDetails.teacher.teacherName }}</div>
                                <div v-else><v-icon left>mdi-account</v-icon>{{ (newClassDetails.teacher.teacherName).substring(0,28)+".. " }}</div>
                                </v-card-text>


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
                overlay:false,

                enrolledClasses:[],
                classDetails:[],
                startedClasses:[],
                startedClassDetails:[],
                newClassDetails:[],
                
                todayDate:'',
                todayDay:'',

                breadcrumbs: [
                    { text: 'Attendance', disabled: false, href: '/Attendance' },
                    { text: 'Today Classes', disabled: true, href: '/Attendance/TodayClasses' }
                ],

                multiLine: true,
                classStartAlert:false,

                successAlert:false,
                unsuccessAlert:false,
                startUnsuccessAlert:false,

                overlayMessage:true
            }
        },

        created(){
            this.overlay=true
            this.getTodayDate()
            this.getTodayDay()
            this.getEnrolledClassDetails()

            setTimeout(()=>{
                if(this.overlay != false){
                    this.overlayMessage=false
                }
            },5000)
            
           

        },

        methods:{
            reloadPage(){
                location.reload();
            },

            getEnrolledClassDetails(){
                
                this.classDetails.splice(0);
                this.startedClassDetails.splice(0);
                this.newClassDetails.splice(0);
                var classDetails=[]

                //------class details
                this.axios.get(this.$apiUrl+"/api/v1.0/ClassManagement/classes",{
                    params:{
                        status: "Active",
                        day:this.todayDay
                    }
                }).then(Response=>(
                    classDetails=Response.data.class.data,
                    classDetails.forEach(element => {
                        element.time=element.startTime+"-"+element.endTime
                    })
                )).then(
                    //------enrolled classes
                    this.axios.get(this.$apiUrl+"/api/v1.0/EnrollmentManagement/classes")
                    .then(Response=>(
                        
                        this.enrolledClasses=Response.data.enrollment.data,

                        classDetails.forEach(element => {
                            var classID=element.classID
                            var classElements=element

                            this.enrolledClasses.forEach(element=>{
                                if(element.classID == classID){
                                    this.classDetails.push(classElements)
                                }
                            })
                            
                        }) 
                    ))
                ).then(
                    //------started classes
                    this.axios.get(this.$apiUrl+"/api/v1.0/AttendanceManagement/attendances",{
                        params:{
                            date: this.todayDate
                        }
                    }).then(Response=>(
                        this.startedClasses=Response.data.attendance.data,

                        
                        this.classDetails.forEach(element=>{
                            var classElements=element
                            var classID=element.classID
                            if(this.startedClasses.length == 0){
                                this.newClassDetails.push(classElements)
                                this.overlay=false
                            }else{
                                this.startedClasses.forEach(element=>{
                                    if(element.classID == classID){
                                        this.startedClassDetails.push(classElements)
                                    }
                                    this.overlay=false
                                })
                            }      
                        }),


                        this.classDetails.forEach(element=>{
                            var classElements=element
                            var classID=element.classID


                            var startedClassID=[]
                            var allClassID=[]

                            if(this.startedClasses.length != 0){

                                this.startedClasses.forEach(element=>{
                                    startedClassID.push(element.classID)
                                })

                                this.classDetails.forEach(element=>{
                                    allClassID.push(element.classID)
                                })

                                startedClassID.sort()
                                allClassID.sort()

                                // ----------compaire and get non-match values
                                let newClassID = allClassID.filter(x => startedClassID.indexOf(x) === -1);

                                newClassID.forEach(element=>{
                                    if(element == classID){
                                        this.newClassDetails.push(classElements)
                                    }
                                    
                                    this.overlay=false
                                })
                            }
                        })    
                    ))
                )
                
            },




            getTodayDate(){
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0');
                var yyyy = today.getFullYear();
                this.todayDate = yyyy + '-' + mm + '-' + dd;
            },

            getTodayDay(){
                const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
                const d = new Date();
                var day = weekday[d.getDay()];
                this.todayDay = day
            },


            startClass(classID){
                this.overlay=true
                this.axios.post(this.$apiUrl+'/api/v1.0/AttendanceManagement/attendances/classes',{
                    classID: classID
                })
                .then(Response=>{
                    if(Response.data.success == true){
                        this.classStartAlert=true
                        this.getEnrolledClassDetails()
                        //this.overlay=false
                    }else{
                        this.startUnsuccessAlert=true
                    }
                })
                .catch(error => {
                    this.startUnsuccessAlert=true
                    console.log(error.data)
                    //this.overlay=false
                });
            },





            cancelAlert(success){
                this.overlay=true
                this.successAlert = success;
                this.getEnrolledClassDetails()
            },
            faileAlert(failed){
                this.unsuccessAlert = failed;
            },


        }
        
    }
</script>

