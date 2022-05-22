<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>

            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Staff delete <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Staff delete <strong>successful</strong> </v-snackbar>
            
            
 

            <template>
                <v-card flat>
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Staff Details</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    
                    <v-data-table :headers="headers" :items="staff" :search="search">
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-card-actions>
                                <app-ViewStaffDetails @success="reCreate($event)" :staff='item'></app-ViewStaffDetails>
                                <v-spacer></v-spacer>
                                <app-DeleteStaff class="ml-5" :staff='item' @success="deleteAlert($event)" @failed="faileAlert($event)"></app-DeleteStaff>
                            </v-card-actions>
                        </template>
                    </v-data-table>
                </v-card>
            </template>

            
            
        </v-container>
    </div>
 
    
</template>

<script>
    import ViewStaffDetails from './ViewStaffDetails.vue'
    import DeleteStaff from './DeleteStaff.vue'

    export default {
        components:{
            'app-ViewStaffDetails':ViewStaffDetails,
            'app-DeleteStaff':DeleteStaff
        },
        data () {
            return {
                search: '',
                headers: [
                    { text: 'NAME',align: 'start', sortable: false, value:'firstName'},
                    { text: 'TELEPHONE NO.', sortable: false, value: 'telNo' },
                    { text: 'EMAIL', sortable: false, value: 'email' },
                    { text: 'BRANCH', sortable: true, value: 'branch.branchName' },
                    { text: '', sortable: false, value: 'actions' },
                ],

                staff: [],

                breadcrumbs: [
                    { text: 'Staff', disabled: false, href: '/Staff' },
                    { text: 'StaffDetails', disabled: true, href: '/Staff/StaffDetails' }
                ],

                successAlert:false,
                unsuccessAlert:false,
            }
        },

        created(){
            this.getStaff()
        },

        methods: {
            deleteAlert(success){
                this.getStaff()
                this.successAlert = success;
            },

            faileAlert(failed){
                this.unsuccessAlert = failed;
            },

            getStaff(){
                this.axios.get(this.$apiUrl+"/api/v1.0/StaffManagement/staffs",{
                params:{
                    status: "Active"
                }
                
                }).then(Response=>(
                    this.staff=Response.data.staff.data,

                    this.staff.forEach(element => {
                        element.firstName=element.title+" "+element.firstName+" "+element.lastName
                    })
                ))
            },


            reCreate(success){
                this.getStaff();
                console.log(success)

            },

        }
    }
</script>
            





            
        
        

