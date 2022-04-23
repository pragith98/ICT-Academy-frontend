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
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Enroll Details</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    <template>
                        <div>
                            <v-data-table :headers="headers" :items="classes" :search="search">
                                <template v-slot:[`item.actions`]="{ item }">
                                    <v-card-actions>
                                        <app-EnrollStudentsDetails :classDetails='item'></app-EnrollStudentsDetails>
                                        <v-spacer></v-spacer>
                                        <app-EnrollStudents class="ml-5" :classDetails='item'></app-EnrollStudents>
                                    </v-card-actions>
                                            
                                       
                                            
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
    import EnrollStudents from './EnrollStudents.vue'
    import EnrollStudentsDetails from './EnrollStudentsDetails.vue'

    export default {
        components:{
            'app-EnrollStudents':EnrollStudents,
            'app-EnrollStudentsDetails':EnrollStudentsDetails
        },
        data () {
            return {
                menu:false,

                search: '',
                headers: [
                    { text: 'Class',align: 'start', sortable: false, value:'name'},
                    { text: 'Students Count', sortable: false, value: 'students' },
                    { text: '', sortable: false, value: 'actions'}
                ],

                classes: [
                    {name:'Sinhala 8', students:'30', id:'clz8773'},
                    {name:'Maths 8', students:'15', id:'clz8343'},
                    {name:'Science 9', students:'400', id:'clz8003'},
                    {name:'History 6', students:'55', id:'clz8467'},
                    {name:'Sinhala 7', students:'10', id:'clz4473'},

                    
                    
                ],

                breadcrumbs: [
                    { text: 'Classes', disabled: false, href: '/Classes' },
                    { text: 'Enroll Students', disabled: true, href: '/Classes/EnrollDetails' }
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
            





            
        
        

