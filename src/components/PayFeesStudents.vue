<template>
    <v-row justify="center">
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
        
            <template v-slot:activator="{ on, attrs }">
                <v-btn color="#5D4037" dark v-bind="attrs" v-on="on" outlined>Mark Payments</v-btn> 
            </template>
            <v-card flat>
                <v-toolbar  dark class="blue-grey darken-4" >
            
                    <v-toolbar-title>Mark Payments</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn dark text @click="dialog = false">Close</v-btn>
                    </v-toolbar-items> 
            
                </v-toolbar>

                <v-card class="pa-10" flat>
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">{{classDetails.name}}</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    <template>
                        <v-card flat>
                            <v-data-table :headers="headers" :items="students" :search="search">
                                <template v-slot:[`item.actions`]="{ item }">
                                    <v-card-actions>
                                        <v-badge bordered :content="item.notifications" :value="item.notifications"  color="error">
                                            <app-PayDailyFee :studentID="item.id" :classID="classDetails.id" class="ml-2"></app-PayDailyFee>
                                        </v-badge>
                                    </v-card-actions>
                                </template>
                            </v-data-table>
                        </v-card>
                        
                    </template>
                </v-card>
            
                
            </v-card>
        </v-dialog>
    </v-row>
</template>


<script>
    import PayDailyFee from './PayDailyFee.vue'

    export default {
        props:['classDetails'],

        components:{
            'app-PayDailyFee':PayDailyFee
        },
        data () {
            return {
                dialog: false,
                notifications: false,
                sound: true,
                widgets: false,


                search: '',
                headers: [
                    { text: 'STUDENT',align: 'start', sortable: false, value:'fname'},
                    { text: 'ID', sortable: false, value: 'id' },
                    { text: '', sortable: false, value: 'actions',align:'end' },
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
                    {fname:'Kasun', lname:'Bandara', id:'2050',attendance:false, payment:false, notifications:' '},
                    {fname:'Maheshi', lname:'Ranathunga', id:'200',attendance:false, payment:false, notifications:' '},
                
                ],
            }
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
                    console.log(this.classDetails.id,id,"   1")
                }else{
                    this.removeSuccessAlert=true
                    console.log(this.classDetails.id,id,"   0")
                }
                
                
            },

            markPayment(id,bool){
                if(bool == true){
                    this.addSuccessAlert=true
                    console.log(this.classDetails.id,id,"   1")
                }else{
                    this.removeSuccessAlert=true
                    console.log(this.classDetails.id,id,"   0")
                }
                
                
            }
        }
    }
</script>