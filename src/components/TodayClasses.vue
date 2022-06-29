<template>
    <div>
        
        <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>

        <v-container>


            <!----------------------------- Alerts ---------------------------------->

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
                        <v-col lg="4" md="4" sm="6" cols="12" v-for="classes in classes" :key="classes.name">
                            <v-card flat>
        
                                <v-card-title style="background: cornflowerblue" class="mb-2">
                                    <div class="title white--text">{{ classes.name }}</div>
                                </v-card-title>
                                
                                <v-card-text><v-icon left>mdi-clock</v-icon> {{classes.time}} <br>
                                <v-icon left>mdi-home</v-icon><v-chip small outlined>{{classes.location}}</v-chip> <br>
                                <v-icon left>mdi-account</v-icon> {{classes.teacher}} </v-card-text>


                                <v-card-actions  class="pb-5">
                                    <!-- <app-MarkAttendanceDailyFee class="ml-1" :classDetails='classes'></app-MarkAttendanceDailyFee> -->
                                    <v-btn :to="{ path: '/TodayClasses/MarkAttendanceDailyFee/'+classes.id}" color="primary" dark outlined>Mark Attendance</v-btn>
                                    <v-spacer></v-spacer>
                                    <app-CancelClass class="mr-1" :classDetails='classes'  @success="cancelAlert($event)" @failed="faileAlert($event)"></app-CancelClass>
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
                        <v-col lg="4" md="4" sm="6" cols="12" v-for="classes in classes" :key="classes.name">
                            <v-card flat>
        
                                <v-card-title style="background: #43A047" class="mb-2">
                                    <div class="title white--text">{{ classes.name }}</div>
                                </v-card-title>
                                
                                <v-card-text><v-icon left>mdi-clock</v-icon> {{classes.time}} <br>
                                <v-icon left>mdi-home</v-icon><v-chip small outlined>{{classes.location}}</v-chip> <br>
                                <v-icon left>mdi-account</v-icon> {{classes.teacher}} </v-card-text>


                                <v-card-actions  class="pb-5">
                                    <v-btn depressed block dark color="#43A047" @click="startClass(classes.id)">Start Class</v-btn>
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
    // import MarkAttendanceDailyFee from './MarkAttendanceDailyFee.vue'
    import CancelClass from './CancelClass.vue'
    export default{
        components:{
            // 'app-MarkAttendanceDailyFee':MarkAttendanceDailyFee,
            'app-CancelClass':CancelClass
        },
        
        data(){
            return{

                classes: [
                    {name:'Sinhala 8', id:'clz8773',time:'08:00 - 10:00', location:'Hall 1',teacher:'Rohana Herath'},
                    {name:'Maths 8', id:'clz8343', time:'08:00 - 10:00', location:'Hall 2',teacher:'Rohana Herath'},
                    {name:'Science 9', id:'clz8003', time:'08:00 - 10:00', location:'Hall 3',teacher:'Rohana Herath'},
                    {name:'History 6', id:'clz8467', time:'08:00 - 10:00', location:'Hall 1',teacher:'Rohana Herath'},
                    {name:'Sinhala 7', id:'clz4473', time:'08:00 - 10:00', location:'Online',teacher:'Rohana Herath'},
                ],


                breadcrumbs: [
                    { text: 'Attendance', disabled: false, href: '/Attendance' },
                    { text: 'Today Classes', disabled: true, href: '/Attendance/TodayClasses' }
                ],

                multiLine: true,
                classStartAlert:false,

                successAlert:false,
                unsuccessAlert:false,
            }
        },

        methods:{

            startClass(classID){
                console.log(classID)
                this.classStartAlert=true
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
