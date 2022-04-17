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
                    <v-card-title class="heading-1 blue lighten-4 primary--text">Free Cards</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    <template>
                        <div>
                            <v-data-table :headers="headers" :items="students" :search="search">
                                <template v-slot:item="row">
                                    <tr>
                                        <td>{{row.item.fname}} {{row.item.lname}}</td>
                                        <td>{{row.item.id}}</td>
                                        <td >
                                            <app-EnrollStudentsDetails :classDetails='row.item'></app-EnrollStudentsDetails>
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
                    { text: 'Student',align: 'start', sortable: false, value:'name'},
                    { text: 'ID', sortable: false, value: 'students' },
                    { text: '', sortable: false, value: 'Action'}
                ],

                classes: [
                    {name:'Sinhala 8', students:'30', id:'clz8773'},
                    {name:'Maths 8', students:'15', id:'clz8343'},
                    {name:'Science 9', students:'400', id:'clz8003'},
                    {name:'History 6', students:'55', id:'clz8467'},
                    {name:'Sinhala 7', students:'10', id:'clz4473'},
                ],

                students: [
                {fname:'Saman', lname:'Herath', id:'2021'},
                {fname:'Dasun', lname:'Rathnayake', id:'2028'},
                {fname:'Kasun', lname:'Bandara', id:'2035'},
                {fname:'Maheshi', lname:'Ranathunga', id:'2077'},
                {fname:'Saman', lname:'Herath', id:'2021'},
                {fname:'Dasun', lname:'Rathnayake', id:'2028'},
                {fname:'Kasun', lname:'Bandara', id:'2035'},
                {fname:'Maheshi', lname:'Ranathunga', id:'2077'},
                {fname:'Saman', lname:'Herath', id:'2021'},
                {fname:'Dasun', lname:'Rathnayake', id:'2028'},
                {fname:'Kasun', lname:'Bandara', id:'2035'},
                {fname:'Maheshi', lname:'Ranathunga', id:'2077'},
                {fname:'Saman', lname:'Herath', id:'2021'},
                {fname:'Dasun', lname:'Rathnayake', id:'2028'},
                {fname:'Kasun', lname:'Bandara', id:'2035'},
                {fname:'Maheshi', lname:'Ranathunga', id:'2077'},
                {fname:'Saman', lname:'Herath', id:'2021'},
                {fname:'Dasun', lname:'Rathnayake', id:'2028'},
                {fname:'Kasun', lname:'Bandara', id:'2035'},
                {fname:'Maheshi', lname:'Ranathunga', id:'2077'},
                
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
            





            
        
        

