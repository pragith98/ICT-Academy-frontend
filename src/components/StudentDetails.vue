<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>

            <v-alert  type="success">I'm a dense alert with the <strong>text</strong> prop and a <strong>type</strong> of success</v-alert>
            <v-alert  type="error">I'm a dense alert with the <strong>text</strong> prop and a <strong>type</strong> of success</v-alert>
            
            

            <template>
                <v-card flat>
                    <v-card-title class="heading-1 blue lighten-4 primary--text">Student Details</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    <!-- <v-data-table :headers="headers" :items="desserts" :search="search" ></v-data-table> -->
                    <v-data-table :headers="headers" :items="desserts" :search="search">
                        <template v-slot:item="row">
                            <tr>
                                <td>{{row.item.name}}</td>
                                <td>{{row.item.admission}}</td>
                                <td>{{row.item.grade}}</td>
                                <td>{{row.item.telephone}}</td>
                                <td >
                                    <app-ViewStudentDetails></app-ViewStudentDetails>
                                </td>
                                <td>
                                    <app-EditStudentDetails></app-EditStudentDetails>
                                </td>
                                <td>
                                    <app-DeleteStudent></app-DeleteStudent>
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
    import EditStudentDetails from '../components/EditStudentDetails.vue'

    export default {
        components:{
            'app-ViewStudentDetails':ViewStudentDetails,
            'app-DeleteStudent':DeleteStudent,
            'app-EditStudentDetails':EditStudentDetails
        },
        data () {
            return {
                search: '',
                headers: [
                    {text: 'NAME',align: 'start', sortable: false, value: 'name',},
                    { text: 'ADMISSION NO.', sortable: false, value: 'admission' },
                    { text: 'GRADE', value: 'grade' },
                    { text: 'TELEPHONE NO.', sortable: false, value: 'telephone' },
                    { text: '', sortable: false, value: 'Action' },
                    { text: '', sortable: false, value: 'Action' },
                    { text: '', sortable: false, value: 'Action' }
                    // { text: 'ACTION', sortable: false, value: 'Action' }
                ],

                desserts: [
                    {name: 'Frozen Yogurt', admission:'202012', grade:'6', telephone:'0898123489', email:'asdff@fff.com'},
                    { name: 'Ice cream sandwich', admission:'202013', grade:'5', telephone:'0898123489', email:'asdff@fff.com'},
                    { name: 'Eclair', admission:'202016', grade:'9', telephone:'0898123489', email:'asdff@fff.com'},
                    {name: 'Cupcake', admission:'202019', grade:'10', telephone:'0898123489', email:'asdff@fff.com'},
                    {name: 'Frozen Yogurt', admission:'202012', grade:'6', telephone:'0898123489', email:'asdff@fff.com'},
                    { name: 'Ice cream sandwich', admission:'202013', grade:'5', telephone:'0898123489', email:'asdff@fff.com'},
                    { name: 'Eclair', admission:'202016', grade:'9', telephone:'0898123489', email:'asdff@fff.com'},
                    {name: 'Cupcake', admission:'202019', grade:'10', telephone:'0898123489', email:'asdff@fff.com'},
                    {name: 'Frozen Yogurt', admission:'202012', grade:'6', telephone:'0898123489', email:'asdff@fff.com'},
                    { name: 'Ice cream sandwich', admission:'202013', grade:'5', telephone:'0898123489', email:'asdff@fff.com'},
                    { name: 'Eclair', admission:'202016', grade:'9', telephone:'0898123489', email:'asdff@fff.com'},
                    {name: 'Cupcake', admission:'202019', grade:'10', telephone:'0898123489', email:'asdff@fff.com'},
                    {name: 'Frozen Yogurt', admission:'202012', grade:'6', telephone:'0898123489', email:'asdff@fff.com'},
                    { name: 'Ice cream sandwich', admission:'202013', grade:'5', telephone:'0898123489', email:'asdff@fff.com'},
                    { name: 'Eclair', admission:'202016', grade:'9', telephone:'0898123489', email:'asdff@fff.com'},
                    {name: 'Cupcake', admission:'202019', grade:'10', telephone:'0718123489', email:'asdff@fff.com'},
                ],

                breadcrumbs: [
                    { text: 'Students', disabled: false, href: '/Students' },
                    { text: 'StudentDetails', disabled: true, href: '/Students/StudentDetails' }
                ],

            }
        },

        methods: {
            onButtonClick(item) {
                console.log('click on ' + item.name)
            }
        }
    }
</script>
            





            
        
        

