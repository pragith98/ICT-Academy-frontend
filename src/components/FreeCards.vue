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
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Free Cards
                        <v-spacer></v-spacer>
                        <app-CreateFreeCardStudent class="mr-2"></app-CreateFreeCardStudent>
                    </v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    <template>
                        <div>
                            <v-data-table :headers="headers" :items="students" :search="search" >
                                <template v-slot:[`item.actions`]="{ item }">
                                    <app-FreeCardClasses :studentDetails='item'></app-FreeCardClasses>
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
    
    import FreeCardClasses from './FreeCardClasses.vue'
    import CreateFreeCardStudent from './CreateFreeCardStudent.vue'

    export default {
        components:{
            'app-FreeCardClasses':FreeCardClasses,
            'app-CreateFreeCardStudent':CreateFreeCardStudent
        },
        data () {
            return {
                menu:false,

                search: '',
                headers: [
                    { text: 'STUDENT',align: 'start', sortable: false, value:'fname'},
                    { text: 'ID', sortable: false, value: 'id' },
                    { text: '', sortable: false, value: 'actions'}
                ],

                students: [
                    {fname:'Saman Herath', id:'2021'},
                    {fname:'Dasun Rathnayake', id:'2028'},
                    {fname:'Kasun Bandara', id:'2035'},
                    {fname:'Maheshi Ranathunga', id:'2077'},
                
                ],





                breadcrumbs: [
                    { text: 'Classes', disabled: false, href: '/Classes' },
                    { text: 'Free Cards', disabled: true, href: '/Classes/FreeCards'}
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
            





            
        
        

