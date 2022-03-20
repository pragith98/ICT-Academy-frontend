<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>

            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Teacher delete <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Teacher delete <strong>successful</strong> </v-snackbar>
            
            
            
            

            

            <template>
                <v-card flat>
                    <v-card-title class="heading-1 blue lighten-4 primary--text">Teacher Details</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    <!-- <v-data-table :headers="headers" :items="desserts" :search="search" ></v-data-table> -->
                    <v-data-table :headers="headers" :items="teachers" :search="search">
                        <template v-slot:item="row">
                            <tr>
                                <td>{{row.item.fname}} {{row.item.lname}}</td>
                                <td>{{row.item.tp}}</td>
                                <td>{{row.item.email}}</td>
                                <td >
                                    <app-ViewStudentDetails :teacher='row.item'></app-ViewStudentDetails>
                                </td>
                                <td>
                                    <app-DeleteTeacher :teacher='row.item' @success="deleteAlert($event)" @failed="faileAlert($event)"></app-DeleteTeacher>
                                </td>
                                <td></td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </template>

            
            
        </v-container>
    </div>
 
    
</template>

<script>
    import ViewStudentDetails from './ViewStudentDetails.vue'
    import DeleteTeacher from './DeleteTeacher.vue'

    export default {
        components:{
            'app-ViewStudentDetails':ViewStudentDetails,
            'app-DeleteTeacher':DeleteTeacher
        },
        data () {
            return {
                search: '',
                headers: [
                    {text: 'NAME',align: 'start', sortable: false, value:'fname'},
                    { text: 'TELEPHONE NO.', sortable: false, value: 'tp' },
                    { text: 'EMAIL', sortable: false, value: 'email' },
                    
                    { text: '', sortable: false, value: 'Action' },
                    { text: '', sortable: false, value: 'Action' },
                    { text: '', sortable: false, value: 'lname'}
                ],

                teachers: [
                    {fname:'Saman', lname:'Herath', nicType:'old', nicNo:'871982289v', tp:'1231235323', email:'Saman@Saman.com', address:'no1, rathnapura', getGender:'Male', teacherID:'2621', date:'2021-02-17'},
                    {fname:'Dasun', lname:'Rathnayake', nicType:'old', nicNo:'871982289v', tp:'4321235323', email:'Dasun@Dasun.com', address:'no1, Matale', getGender:'Male', teacherID:'2065', date:'2021-07-19'},
                    {fname:'Kasun', lname:'Bandara', nicType:'old', nicNo:'871982289v', tp:'7831235323', email:'Kasun@Kasun.com', address:'no1, Kandy', getGender:'Male', date:'2021-02-19', teacherID:'2071'},
                    {fname:'Maheshi', lname:'Ranathunga', nicType:'old', nicNo:'871982289v',tp:'9931235323', email:'Maheshi@Maheshi.com', address:'no1, Jafna', getGender:'Female', date:'2021-09-12', teacherID:'2024'},
                    
                ],

                breadcrumbs: [
                    { text: 'Teachers', disabled: false, href: '/Teachers' },
                    { text: 'TeacherDetails', disabled: true, href: '/Teachers/TeacherDetails' }
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
            





            
        
        

