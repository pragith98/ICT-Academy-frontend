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
                    <v-card-title class="heading-1 blue lighten-4 primary--text">Class Details</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    <template>
                        <div>
                            <v-data-table :headers="headers" :items="classes" :search="search">
                                <template v-slot:item="row">
                                    <tr>
                                        <td>{{row.item.name}}</td>
                                        <td>{{row.item.teacher}}</td>
                                        <td>{{row.item.grade}}</td>
                                        <td>{{row.item.subject}}</td>
                                        <td>{{row.item.fee}}</td>
                                        <td>{{row.item.startTime}} - {{row.item.endTime}}</td>
                                        <td>
                                            <v-chip small :color="row.item.color" dark>{{row.item.location}}</v-chip>
                                        </td>
                                        <td>{{row.item.day}}</td>
                                        <td >
                                            <app-ViewStudentDetails :student='row.item'></app-ViewStudentDetails>
                                        </td>
                                        <td>
                                            <app-DeleteStudent :student='row.item' @success="deleteAlert($event)" @failed="faileAlert($event)"></app-DeleteStudent>
                                        </td>
                                    </tr>
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
    import ViewStudentDetails from '../components/ViewStudentDetails.vue'
    import DeleteStudent from '../components/DeleteStudent.vue'

    export default {
        components:{
            'app-ViewStudentDetails':ViewStudentDetails,
            'app-DeleteStudent':DeleteStudent
        },
        data () {
            return {
                menu:false,

                search: '',
                headers: [
                    { text: 'NAME',align: 'start', sortable: false, value:'name'},
                    { text: 'TEACHER', sortable: false, value: 'teacher' },
                    { text: 'GRADE',sortable: true, value: 'grade' },
                    { text: 'SUBJECT', sortable: false, value: 'subject' },
                    { text: 'FEE', sortable: false, value: 'fee', filterable:false},
                    { text: 'TIME', sortable: true, value: 'startTime' },
                    { text: 'LOCATION', sortable: false, value: 'hall' },
                    { text: 'DAY', sortable: true, value: 'day' },
                    { text: '', sortable: false, value: 'Action' },
                    { text: '', sortable: false, value: 'Action' },
                ],

                classes: [
                    {name:'Sinhala 8', teacher:'Mr.Smantha Bandara', grade:'8', subject:'Sinhala', fee:'1500.00', startTime:'08:00', endTime:'10:00', location:'Hall 1', day:'Sunday', id:'clz8473', color:'green'},
                    {name:'Maths 8', teacher:'Mr.Kelum Saranga', grade:'8', subject:'Maths', fee:'1500.00', startTime:'08:00', endTime:'10:00', location:'Hall 3', day:'Monday', id:'clz8473', color:'red'},
                    {name:'Science 9', teacher:'Ms.Nirosha Damayanthi', grade:'9', subject:'Science', fee:'1500.00', startTime:'08:00', endTime:'10:00', location:'Hall 2', day:'Sunday', id:'clz8473', color:'blue'},
                    {name:'History 6', teacher:'Mr.Nimal Santha', grade:'6', subject:'History', fee:'1500.00', startTime:'08:00', endTime:'10:00', location:'Hall 1', day:'Sunday', id:'clz8473', color:'brown'},
                    {name:'Sinhala 7', teacher:'Mr.Kusal Bandara', grade:'7', subject:'Sinhala', fee:'1500.00', startTime:'08:00', endTime:'10:00', location:'Online', day:'Sunday', id:'clz8473', color:'grey'},

                    
                    
                ],

                breadcrumbs: [
                    { text: 'Classes', disabled: false, href: '/Classes' },
                    { text: 'ClassDetails', disabled: true, href: '/Classes/ClassDetails' }
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
            





            
        
        

