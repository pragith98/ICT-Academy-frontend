<template>
    <div>
        
        <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>

        <v-container>

            <!-- <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Student delete <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Student delete <strong>successful</strong> </v-snackbar> -->
            
            
            <template>
                <v-card flat color="#E3F2FD">
                    <v-card-title class="heading-1 blue lighten-4 primary--text">Started Classes</v-card-title>
                    <v-row class="pa-5">
                        <v-col lg="4" md="4" sm="6" cols="12" v-for="classes in classes" :key="classes.name">
                            <v-card flat>
        
                                <v-card-title style="background: cornflowerblue" class="mb-2">
                                    <div class="title white--text">{{ classes.name }}</div>
                                </v-card-title>
                                
                                <!-- <v-card-title class=" mb-5">
                                    <v-btn outlined>Start Class</v-btn><v-btn text>Cancel</v-btn>
                                    
                                </v-card-title> -->
                                <!-- <v-card-text class="pa-0"><v-icon left>mdi-clock</v-icon> {{classes.time}} </v-card-text>
                                <v-card-text class="pa-0"><v-icon left>mdi-home</v-icon><v-chip outlined>{{classes.location}}</v-chip> </v-card-text>
                                <v-card-text class="pa-0"><v-icon left>mdi-account</v-icon> {{classes.teacher}} </v-card-text> -->
                                
                                <v-card-text><v-icon left>mdi-clock</v-icon> {{classes.time}} <br>
                                <v-icon left>mdi-home</v-icon><v-chip small outlined>{{classes.location}}</v-chip> <br>
                                <v-icon left>mdi-account</v-icon> {{classes.teacher}} </v-card-text>


                                <v-card-actions>
                                    <app-MarkAttendanceDailyFee :classDetails='classes'></app-MarkAttendanceDailyFee>
                                    <!-- <v-btn outlined>Mark Attendance</v-btn> -->
                                    <v-spacer></v-spacer>
                                    <v-btn text>Cancel</v-btn>
                                </v-card-actions>

                                <!-- <v-card-title class=" mb-5" style="justify-content:center">
                                    <v-btn>Start Class</v-btn>
                                </v-card-title> -->
                                
                            </v-card>
                            
                            
                        </v-col>

                    </v-row>
                </v-card>
            </template>

            
            
        </v-container>

    </div>
</template>



<script>
    import MarkAttendanceDailyFee from './MarkAttendanceDailyFee.vue'
    export default{
        components:{
            'app-MarkAttendanceDailyFee':MarkAttendanceDailyFee,
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
            }
        }
        
    }
</script>
