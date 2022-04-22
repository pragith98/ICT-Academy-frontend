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
                    <v-card-title class="heading-1 blue lighten-4 primary--text">Attendance Details</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    <template>
                        <div>
                            <v-data-table :headers="headers" :items="classes" :search="search">
                                <template v-slot:[`item.actions`]="{ item }">
                                    <app-ClassConductedDates :classDetails="item.id" :className="item.name"></app-ClassConductedDates>
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
    
    import ClassConductedDates from './ClassConductedDates.vue'

    export default {
        
        components:{
            'app-ClassConductedDates':ClassConductedDates
        },

        data () {
            return {
                menu:false,

                search: '',
                headers: [
                    { text: 'BRANCH',align: 'start', sortable: false, value:'name'},
                    { text: 'TP', sortable: false, value: 'tp' },
                    { text: 'ADDRESS',sortable: true, value: 'address' },
                    { text: 'HALLS', sortable: false, value: 'halls' },
                    { value: 'actions', sortable: false,align:'start' },
                ],

                branches: [
                    {id:'001',name:'Hkmana', tp:'0873847384', halls:'8', address:'123, main road, hakmana'},
                    {id:'002',name:'Walasmulla', tp:'3433234543', halls:'4', address:'123, main road, hakmana'},
                    

                    
                    
                ],

                breadcrumbs: [
                    { text: 'Attendance', disabled: false, href: '/Attendance' },
                    { text: 'Attendance Details', disabled: true, href: '/Attendance/AttendanceDetails' }
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
            





            
        
        

