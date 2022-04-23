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
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Teacher Details</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    
                    <v-data-table :headers="headers" :items="teachers" :search="search">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-card-actions>
                                <app-ViewTeacherDetails :teacher='item'></app-ViewTeacherDetails>
                                <v-spacer></v-spacer>
                                <app-DeleteTeacher class="ml-5" :teacher='item' @success="deleteAlert($event)" @failed="faileAlert($event)"></app-DeleteTeacher>
                            </v-card-actions> 
                        </template>
                    </v-data-table>
                </v-card>
            </template>

            
            
        </v-container>
    </div>
 
    
</template>

<script>
    import ViewTeacherDetails from './ViewTeacherDetails.vue'
    import DeleteTeacher from './DeleteTeacher.vue'

    export default {
        components:{
            'app-ViewTeacherDetails':ViewTeacherDetails,
            'app-DeleteTeacher':DeleteTeacher
        },
        data () {
            return {
                search: '',
                headers: [
                    {text: 'NAME',align: 'start', sortable: false, value:'fname'},
                    { text: 'TELEPHONE NO.', sortable: false, value: 'tp' },
                    { text: 'EMAIL', sortable: false, value: 'email' },
                    { text: '', sortable: false, value: 'actions' },
                ],

                teachers: [
                    {fname:'Saman', lname:'Herath', nicType:'old', nicNo:'871982289v', tp:'1231235323', email:'Saman@Saman.com', address:'no1, rathnapura', getGender:'Male', teacherID:'2621', date:'2021-02-17', getTitle:'Mr'},
                    {fname:'Dasun', lname:'Rathnayake', nicType:'old', nicNo:'871982289v', tp:'4321235323', email:'Dasun@Dasun.com', address:'no1, Matale', getGender:'Male', teacherID:'2065', date:'2021-07-19', getTitle:'Mr'},
                    {fname:'Kasun', lname:'Bandara', nicType:'old', nicNo:'871982289v', tp:'7831235323', email:'Kasun@Kasun.com', address:'no1, Kandy', getGender:'Male', date:'2021-02-19', teacherID:'2071', getTitle:'Mr'},
                    {fname:'Maheshi', lname:'Ranathunga', nicType:'old', nicNo:'871982289v',tp:'9931235323', email:'Maheshi@Maheshi.com', address:'no1, Jafna', getGender:'Female', date:'2021-09-12', teacherID:'2024', getTitle:'Ms'},
                    
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
            





            
        
        

