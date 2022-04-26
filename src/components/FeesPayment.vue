<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>

            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Student delete <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Student delete <strong>successful</strong> </v-snackbar>
            
            
            <template>
                <v-card flat class="blue-grey lighten-5" outlined color="red">
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Today Classes</v-card-title>
                    <v-row class="pa-5">
                        <v-col lg="4" md="4" sm="6" cols="12" v-for="classes in classes" :key="classes.name">
                            <v-card flat outlined>
        
                                <v-card-title style="background: #5D4037" class="mb-2">
                                    <div class="title white--text">{{ classes.name }}</div>
                                </v-card-title>
                                
                                <v-card-text><v-icon left>mdi-clock</v-icon> {{classes.time}} <br>
                                <v-icon left>mdi-home</v-icon><v-chip small outlined>{{classes.location}}</v-chip> <br>
                                <v-icon left>mdi-account</v-icon> {{classes.teacher}} </v-card-text>


                                <v-card-actions  class="pb-5">
                                    <app-PayFeesStudents class="ml-1" :classDetails='classes'></app-PayFeesStudents>
                                    <v-spacer></v-spacer>
                                    <!-- <app-CancelClass class="mr-1" :classDetails='classes'  @success="cancelAlert($event)" @failed="faileAlert($event)"></app-CancelClass> -->
                                </v-card-actions>
                                
                            </v-card>
                            
                            
                        </v-col>

                    </v-row>
                </v-card>
            </template>
            

            

            <template>
                <v-card flat>
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">All Classes</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    <template>
                        <div>
                            <v-data-table :headers="headers" :items="classes" :search="search">
                                <template v-slot:[`item.actions`]="{ item }">
                                    <app-ClassConductedMonths :classDetails="item"></app-ClassConductedMonths>
                                </template>
                            </v-data-table>
                        </div>
                        
                    </template>
                </v-card>
            </template>
        </v-container>
    </div>
 
    
</template>

<script>
    
    
    import PayFeesStudents from './PayFeesStudents.vue'
    import ClassConductedMonths from './ClassConductedMonths.vue'

    export default {
        
        components:{
            'app-PayFeesStudents':PayFeesStudents,
            'app-ClassConductedMonths':ClassConductedMonths
        },

        data () {
            return {
                menu:false,

                search: '',
                headers: [
                    { text: 'CLASS',align: 'start', sortable: false, value:'name'},
                    { text: 'TEACHER', sortable: false, value: 'teacher' },
                    { text: 'SUBJECT', sortable: false, value: 'subject' },
                    { text: 'GRADE',sortable: true, value: 'grade' },
                    { value: 'actions', sortable: false,align:'start' },
                ],

                classes: [
                    {name:'Sinhala 8', teacher:'Mr.Smantha Bandara', grade:'8', subject:'Sinhala', fee:'1500.00', time:'08:00 - 10:00', location:'Hall 1', day:'Sunday', id:'clz8673', color:'green'},
                    {name:'Maths 8', teacher:'Mr.Kelum Saranga', grade:'8', subject:'Maths', fee:'1500.00', time:'08:00 - 10:00', location:'Hall 3', day:'Monday', id:'clz8473', color:'red'},
                    {name:'Science 9', teacher:'Ms.Nirosha Damayanthi', grade:'9', subject:'Science', fee:'1500.00', time:'08:00 - 10:00', location:'Hall 2', day:'Sunday', id:'clz8883', color:'blue'},
                    {name:'History 6', teacher:'Mr.Nimal Santha', grade:'6', subject:'History', fee:'1500.00', time:'08:00 - 10:00', location:'Hall 1', day:'Sunday', id:'clz9473', color:'brown'},
                    {name:'Sinhala 7', teacher:'Mr.Kusal Bandara', grade:'7', subject:'Sinhala', fee:'1500.00', time:'08:00 - 10:00', location:'Online', day:'Sunday', id:'clz8403', color:'grey'},

                    
                    
                ],

                breadcrumbs: [
                    { text: 'Financial', disabled: false, href: '/Financial' },
                    { text: 'Fees Payment', disabled: true, href: '/Financial/FeesPayment' }
                ],

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
        }
    }
</script>
            





            
        
        

