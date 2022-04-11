<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>

            <!----------------------------- Alerts ---------------------------------->

            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon>Item delete <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Item delete <strong>successful</strong> </v-snackbar>
            
            <v-snackbar :timeout="3000" v-model="unsuccessAlertSubjectCreate" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon>Subject Create <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlertSubjectCreate" color="green"  bottom><v-icon left>mdi-check</v-icon>Subject Create <strong>successful</strong> </v-snackbar>
            
            
            <!----------------------------- Alerts ---------------------------------->
            

            <template>
                <v-row>
                    <v-col>
                        <v-card flat>
                            <v-card-title class="heading-1 blue lighten-4 primary--text ">Subjects
                                <v-spacer></v-spacer>
                                <app-CreateSubject class="mr-2" @success="subjectCreateSuccessAlert($event)" @failed="subjectCreateFaileAlert($event)"></app-CreateSubject>
                            </v-card-title>
                            <v-card-title><v-spacer></v-spacer><v-text-field v-model="subjectSearch" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                            
                            <v-data-table :headers="subjectHeaders" :items="subjects" :search="subjectSearch">
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
                                            <app-deleteSubject :subject='row.item' @success="deleteAlert($event)" @failed="faileAlert($event)"></app-deleteSubject>
                                        </td>
                                        
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-card>
                    </v-col>
                    <v-col>
                        <v-card flat>
                            <v-card-title class="heading-1 blue lighten-4 primary--text ">Category</v-card-title>
                            <v-card-title><v-spacer></v-spacer><v-text-field v-model="categorySearch" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                            
                            <v-data-table :headers="categoryHeaders" :items="categories" :search="categorySearch">
                                <template v-slot:item="row">
                                    <tr>
                                        <td>{{row.item.name}}</td>
                                        <td>{{row.item.id}}</td>
                                        <td >
                                            <app-ViewStudentDetails :student='row.item'></app-ViewStudentDetails>
                                        </td>
                                        <td>
                                            <app-DeleteStudent :student='row.item' @success="deleteAlert($event)" @failed="faileAlert($event)"></app-DeleteStudent>
                                        </td>
                                        
                                    </tr>
                                </template>
                            </v-data-table>
                        </v-card>
                    </v-col>
                </v-row>
                
            </template>

            
            
        </v-container>
    </div>
 
    
</template>

<script>
    import ViewStudentDetails from './ViewStudentDetails.vue'
    import DeleteStudent from './DeleteStudent.vue'
    import CreateSubject from './CreateSubject.vue'
    import DeleteSubject from './DeleteSubject.vue'

    export default {
        components:{
            'app-ViewStudentDetails':ViewStudentDetails,
            'app-DeleteStudent':DeleteStudent,
            'app-CreateSubject':CreateSubject,
            'app-deleteSubject':DeleteSubject
        },
        data () {
            return {
                subjectSearch: '',
                categorySearch: '',
                subjectHeaders: [
                    {text: 'NAME',align: 'start', sortable: true, value:'name'},
                    { text: 'ID', sortable: false, value: 'id' },
                    { text: 'MEDIUM',sortable: true, value: 'medium', filterable:false},
                    { text: 'CATEGORY', sortable: true, value: 'category' },
                    { text: '', sortable: false, value: 'Action' },
                    { text: '', sortable: false, value: 'Action' },
                ],

                subjects: [
                    {name:'Science',id:'sub001',medium:'Sinhala',category:'Ordinary Level'},
                    {name:'Maths',id:'sub002',medium:'Sinhala',category:'Ordinary Level'},
                    {name:'Scholarship',id:'sub003',medium:'Sinhala',category:'Scholarship'},
                    {name:'BS',id:'sub004',medium:'Sinhala',category:'Advanced Level'},
                    {name:'Maths',id:'sub005',medium:'English',category:'Ordinary Level'}
                ],

                categoryHeaders: [
                    {text: 'NAME',align: 'start', sortable: true, value:'name'},
                    { text: 'ID', sortable: false, value: 'id' },
                    { text: '', sortable: false, value: 'Action' },
                    { text: '', sortable: false, value: 'Action' },
                ],

                categories: [
                    {name:'Ordinary Level',id:'cat001'},
                    {name:'Advanced Level',id:'cat002'},
                    {name:'Scholarship',id:'cat003'},
                    {name:'Professional',id:'cat004'}
                ],

                breadcrumbs: [
                    { text: 'Classes', disabled: false, href: '/Classes' },
                    { text: 'Subjects', disabled: true, href: '/Classes/Subjects' }
                ],

                successAlert:false,
                unsuccessAlert:false,

                unsuccessAlertSubjectCreate:false,
                successAlertSubjectCreate:false,

            }
        },

        methods: {
            deleteAlert(success){
                this.successAlert = success;
            },
            faileAlert(failed){
                this.unsuccessAlert = failed;
            },

            subjectCreateSuccessAlert(success){
                this.successAlertSubjectCreate = success;
            },
            subjectCreateFaileAlert(failed){
                this.unsuccessAlertSubjectCreate = failed;
            },
        }
    }
</script>
            





            
        
        

