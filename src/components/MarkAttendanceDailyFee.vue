<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>
        <v-container>

            

            <template>
                <v-card flat>
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Mark Attendance</v-card-title>
                    <v-card-text class="mt-2">
                        Mark <strong>Attendance</strong> & <strong>Payments</strong> of <strong>className</strong>
                    </v-card-text>
                    <v-card class="pl-10 pr-10" flat>
                        <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                        <template>
                            <v-card flat>
                                <v-data-table :headers="headers" :items="students" :search="search">
                                    <template v-slot:[`item.actions`]="{ item }">
                                        <v-card-actions>
                                            <v-switch color="blue" @change="markAttendance(item.id,item.attendance)" inset v-model="item.attendance" :label="switchLabel(item.attendance)" class="mr-3"></v-switch>
                                            <v-spacer></v-spacer>
                                            <v-badge bordered :content="item.notifications" :value="item.notifications"  color="error">
                                                <app-PayDailyFee :studentID="item.id" :classID="classID" class="ml-2"></app-PayDailyFee>
                                            </v-badge>
                                        </v-card-actions>
                                    </template>
                                </v-data-table>
                            </v-card>
                            
                        </template>
                    </v-card>
                
                    
                </v-card>
            </template>
        </v-container>
    </div>
 
    
</template>

<script>
    import PayDailyFee from './PayDailyFee.vue'

    export default {

        components:{
            'app-PayDailyFee':PayDailyFee
        },
        data () {
            return {
                classID:'',

                dialog: false,
                notifications: false,
                sound: true,
                widgets: false,


                search: '',
                headers: [
                    { text: 'STUDENT',align: 'start', sortable: false, value:'fname'},
                    { text: 'ID', sortable: false, value: 'id' },
                    { text: "ATTENDANCE", value: 'actions', sortable: false,align:'start' },
                ],


                students: [
                    {fname:'Saman Herath', id:'20212021',attendance:false, payment:true, notifications:' '},
                    {fname:'Dasun Rathnayake', id:'2028',attendance:false, payment:false, notifications:0},
                    {fname:'Kasun Bandara', id:'2035',attendance:false, payment:false, notifications:' '},
                    {fname:'Maheshi Ranathunga', id:'2077',attendance:false, payment:true, notifications:' '},
                    {fname:'Saman Herath', id:'2056',attendance:false, payment:false, notifications:0},
                    {fname:'Dasun Rathnayake', id:'2054',attendance:false, payment:false, notifications:' '},
                    {fname:'Kasun Bandara', id:'2099',attendance:false, payment:false, notifications:0},
                    {fname:'Maheshi Ranathunga', id:'2016',attendance:false, payment:true, notifications:0},
                    {fname:'Saman Herath', id:'2093',attendance:false, payment:false, notifications:0},
                    {fname:'Dasun Rathnayake', id:'2027',attendance:false, payment:false, notifications:' '},
                    {fname:'Kasun Bandara', id:'2094',attendance:false, payment:false, notifications:0},
                    {fname:'Maheshi Ranathunga', id:'2011',attendance:false, payment:false, notifications:0},
                    {fname:'Saman Herath', id:'2075',attendance:false, payment:false, notifications:0},
                    {fname:'Dasun Rathnayake', id:'2069',attendance:false, payment:false, notifications:' '},
                    {fname:'Kasun Bandara', id:'2098',attendance:false, payment:false, notifications:0},
                    {fname:'Maheshi Ranathunga', id:'2059',attendance:false, payment:false, notifications:0},
                    {fname:'Saman Herath', id:'2021',attendance:false, payment:false, notifications:' '},
                    {fname:'Dasun Rathnayake', id:'2020',attendance:false, payment:false, notifications:' '},
                    {fname:'Kasun Bandara', id:'2050',attendance:false, payment:false, notifications:' '},
                    {fname:'Maheshi Ranathunga', id:'200',attendance:false, payment:false, notifications:' '},
                
                ],

                breadcrumbs: [
                    { text: 'Today Classes', disabled: false, href: '/Attendance/TodayClasses' },
                    { text: 'Mark Attendance', disabled: true, href: '' }
                ],
            }
        },

        created(){
            this.classID=this.$route.params.id
        },

        methods:{
            show(id){
                console.log(id)
            },

            switchLabel (bool) {
                return bool?'Present ':'Absent  '
            },

            switchLabe2 (bool) {
                return bool?'Paid    ':'Not Paid'
            },

            markAttendance(id,bool){
                if(bool == true){
                    this.addSuccessAlert=true
                    console.log(this.classID,id,"   1")
                }else{
                    this.removeSuccessAlert=true
                    console.log(this.classID,id,"   0")
                }
                
                
            },

            markPayment(id,bool){
                if(bool == true){
                    this.addSuccessAlert=true
                    console.log(this.classID,id,"   1")
                }else{
                    this.removeSuccessAlert=true
                    console.log(this.classID,id,"   0")
                }
                
                
            }
        }
    }
</script>




            
        
        

