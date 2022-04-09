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
                    <v-card-title class="heading-1 blue lighten-4 primary--text">Subjects</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    
                    <v-data-table :headers="headers" :items="subjects" :search="search">
                        <template v-slot:item="row">
                            <tr>
                                <td>{{row.item.name}}</td>
                                <td>{{row.item.id}}</td>
                                <td>{{row.item.medium}}</td>
                                <td>{{row.item.category}}</td>
                                <td >
                                    <app-ViewStudentDetails :student='row.item'></app-ViewStudentDetails>
                                </td>
                                <td>
                                    <app-DeleteStudent :student='row.item' @success="deleteAlert($event)" @failed="faileAlert($event)"></app-DeleteStudent>
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
    import DeleteStudent from './DeleteStudent.vue'

    export default {
        components:{
            'app-ViewStudentDetails':ViewStudentDetails,
            'app-DeleteStudent':DeleteStudent
        },
        data () {
            return {
                search: '',
                headers: [
                    {text: 'NAME',align: 'start', sortable: true, value:'name'},
                    { text: 'ID', sortable: false, value: 'id' },
                    { text: 'MEDIUM',sortable: true, value: 'medium' },
                    { text: 'CATEGORY', sortable: true, value: 'category' },
                    { text: '', sortable: false, value: 'Action' },
                    { text: '', sortable: false, value: 'Action' },
                ],

                subjects: [
                    {name:'Science',id:'sub001',medium:'Sinhala',category:'OL'},
                    {name:'Maths',id:'sub002',medium:'Sinhala',category:'OL'},
                    {name:'Scholarship',id:'sub003',medium:'Sinhala',category:'Scholarship'},
                    {name:'BS',id:'sub004',medium:'Sinhala',category:'AL'},
                    {name:'Maths',id:'sub005',medium:'English',category:'OL'}
                    
                    
                ],

                breadcrumbs: [
                    { text: 'Classes', disabled: false, href: '/Classes' },
                    { text: 'Subjects', disabled: true, href: '/Classes/Subjects' }
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
            





            
        
        

