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
                <v-card flat>
                    <v-card-title class="heading-1 blue lighten-4 primary--text">Student Details</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    <!-- <v-data-table :headers="headers" :items="desserts" :search="search" ></v-data-table> -->
                    <v-data-table :headers="headers" :items="students" :search="search">
                        <template v-slot:item="row">
                            <tr>
                                <td>{{row.item.fname}} {{row.item.lname}}</td>
                                <td>{{row.item.admissionNo}}</td>
                                <td>{{row.item.getGrade}}</td>
                                <td>{{row.item.tp}}</td>
                                <td >
                                    <!-- <app-ViewStudentDetails fname='' lname='' tp='' email='' address='' parentTp='' parentName='' parent=''></app-ViewStudentDetails> -->
                                    <app-ViewStudentDetails :student='row.item'></app-ViewStudentDetails>
                                </td>
                                <td>
                                    <app-DeleteStudent :student='row.item' @success="deleteAlert($event)" @failed="faileAlert($event)"></app-DeleteStudent>
                                </td>
                            </tr>
                        </template>
                    </v-data-table>
                </v-card>
            </template>

            
            
        </v-container>
    </div>
 
    
</template>

<script>
    import ViewStudentDetails from '../components/ViewStudentDetails.vue'
    import DeleteStudent from '../components/DeleteStudent.vue'

    export default {
        components:{
            'app-ViewStudentDetails':ViewStudentDetails,
            'app-DeleteStudent':DeleteStudent
        },
        data () {
            return {
                search: '',
                headers: [
                    {text: 'NAME',align: 'start', sortable: false, value:'fname'},
                    { text: 'ADMISSION NO.', sortable: false, value: 'admissionNo' },
                    { text: 'GRADE', value: 'getGrade' },
                    { text: 'TELEPHONE NO.', sortable: false, value: 'tp' },
                    { text: '', sortable: false, value: 'Action' },
                    { text: '', sortable: false, value: 'Action' }
                ],

                students: [
                    {fname:'Saman', lname:'Herath', tp:'1231235323', email:'Saman@Saman.com', address:'no1, rathnapura', parentTp:'4532346534', parentName:'Rohana Herath', parent:'father', getGender:'Male', getGrade:'4', getBrach:'Hakmana', date:'2021-05-12', admissionNo:'2021'},
                    {fname:'Dasun', lname:'Rathnayake', tp:'4321235323', email:'Dasun@Dasun.com', address:'no1, Matale', parentTp:'9872346534', parentName:'Mohan Rathnayake', parent:'father', getGender:'Male', getGrade:'8', getBrach:'Hakmana', date:'2021-06-10', admissionNo:'2028'},
                    {fname:'Kasun', lname:'Bandara', tp:'7831235323', email:'Kasun@Kasun.com', address:'no1, Kandy', parentTp:'4332346534', parentName:'Kumari', parent:'mother', getGender:'Male', getGrade:'10', getBrach:'Hakmana', date:'2021-02-17', admissionNo:'2035'},
                    {fname:'Maheshi', lname:'Ranathunga', tp:'9931235323', email:'Maheshi@Maheshi.com', address:'no1, Jafna', parentTp:'8832346534', parentName:'Ranathunga Bandara', parent:'father', getGender:'Female', getGrade:'6', getBrach:'Hakmana', date:'2021-09-12', admissionNo:'2077'},
                    
                ],

                breadcrumbs: [
                    { text: 'Students', disabled: false, href: '/Students' },
                    { text: 'StudentDetails', disabled: true, href: '/Students/StudentDetails' }
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
            





            
        
        

