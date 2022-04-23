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

            <v-snackbar :timeout="3000" v-model="unsuccessAlertUpdate" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon>Item update <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlertUpdate" color="green"  bottom><v-icon left>mdi-check</v-icon>Item update <strong>successful</strong> </v-snackbar>
            
            
            <!----------------------------- Alerts ---------------------------------->
            

            <template>
                <v-row>
                    <v-col>
                        <v-card flat>
                            <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Subjects
                                <v-spacer></v-spacer>
                                <app-CreateSubject class="mr-2" @success="subjectCreateSuccessAlert($event)" @failed="subjectCreateFaileAlert($event)"></app-CreateSubject>
                            </v-card-title>
                            <v-card-title><v-spacer></v-spacer><v-text-field v-model="subjectSearch" append-icon="mdi-magnify" label="Search Subject" single-line hide-details></v-text-field></v-card-title>
                            
                            <v-data-table :headers="subjectHeaders" :items="subjects" :search="subjectSearch" :items-per-page="5">
                                <template v-slot:[`item.actions`]="{ item }">
                                        <v-card-actions>
                                            <app-editSubject :subjectDetails='item' @success="updateSuccessAlert($event)" @failed="updateFaileAlert($event)"></app-editSubject>
                                            <v-spacer></v-spacer>
                                            <app-deleteSubject class="ml-5" :subject='item' @success="deleteAlert($event)" @failed="faileAlert($event)"></app-deleteSubject>
                                        </v-card-actions>
                                            
                                </template>
                            </v-data-table>
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-card flat>
                            <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Category</v-card-title>
                            <v-card-title><v-spacer></v-spacer><v-text-field v-model="categorySearch" append-icon="mdi-magnify" label="Search Category" single-line hide-details></v-text-field></v-card-title>
                            
                            <v-data-table :headers="categoryHeaders" :items="categories" :search="categorySearch" :items-per-page="5">
                                <template v-slot:[`item.actions`]="{ item }">
                                    <v-card-actions>
                                        <app-editSubjectCategory :subjecCategory='item' @success="updateSuccessAlert($event)" @failed="updateFaileAlert($event)"></app-editSubjectCategory>
                                        <v-spacer></v-spacer>
                                        <app-deleteSubjectCategory class="ml-5" :subjecCategory='item' @success="deleteAlert($event)" @failed="faileAlert($event)"></app-deleteSubjectCategory>
                                    </v-card-actions>
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
    import CreateSubject from './CreateSubject.vue'
    import DeleteSubject from './DeleteSubject.vue'
    import DeleteSubjectCategory from './DeleteSubjectCategory.vue'
    import EditSubject from './EditSubject.vue'
    import EditSubjectCategory from './EditSubjectCategory.vue'

    export default {
        components:{
            'app-CreateSubject':CreateSubject,
            'app-deleteSubject':DeleteSubject,
            'app-deleteSubjectCategory':DeleteSubjectCategory,
            'app-editSubject':EditSubject,
            'app-editSubjectCategory':EditSubjectCategory,
        },
        data () {
            return {
                subjectSearch: '',
                categorySearch: '',
                subjectHeaders: [
                    {text: 'NAME',align: 'start', sortable: true, value:'name'},
                    { text: 'MEDIUM',sortable: true, value: 'medium', filterable:false},
                    { text: 'CATEGORY', sortable: true, value: 'category' },
                    { text: '', sortable: false, value: 'actions' },
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
                    { text: '', sortable: false, value: 'actions' },
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

                unsuccessAlertUpdate:false,
                successAlertUpdate:false,

            }
        },

        methods: {




            // -------------------- alerts --------------------------------
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

            updateSuccessAlert(success){
                this.successAlertUpdate = success;
            },
            updateFaileAlert(failed){
                this.unsuccessAlertUpdate = failed;
            },
        }
    }
</script>
            





            
        
        

