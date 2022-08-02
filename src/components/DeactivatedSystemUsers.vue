<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>


            <!----------------------------- alert ------------------------->
            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon>Account remove <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Account remove <strong>successful</strong> </v-snackbar>
            
            <v-snackbar :timeout="3000" v-model="unsuccessCreateAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon>Account Create <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successCreateAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Account Create <strong>successful</strong> </v-snackbar>

            <v-snackbar :timeout="3000" v-model="successUpdateAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Account update <strong>Successful</strong> </v-snackbar>
            <!----------------------------- alert ------------------------->

            <template>
                <v-card flat>
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">System Users</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    <v-data-table :headers="headers" :items="users" :search="search" :items-per-page=10>
                        <template v-slot:[`item.actions`]="{ item }">
                            <v-card-actions>
                                <app-EditSystemUser @success="updateSuccessAlert($event)" :users='item'></app-EditSystemUser>
                                <v-spacer></v-spacer>
                                <app-RemoveSystemUser class="ml-5" :users='item' @success="deleteAlert($event)" @failed="faileAlert($event)"></app-RemoveSystemUser>
                            </v-card-actions>
                                
                        </template>
                    </v-data-table>
                </v-card>
            </template>

            
            
        </v-container>
    </div>
 
    
</template>

<script>
    import RemoveSystemUser from './RemoveSystemUser.vue'
    import EditSystemUser from './EditSystemUser.vue'

    export default {
        components:{
            'app-RemoveSystemUser':RemoveSystemUser,
            'app-EditSystemUser':EditSystemUser
        },
        data () {
            return {
                search: '',
                headers: [
                    { text: 'NAME',align: 'start', sortable: false, value:'employee.name'},
                    { text: 'ROLE', sortable: true, value: 'privilege' },
                    { text: 'EMAIL', sortable: false, value: 'employee.email' },
                    { text: '', sortable: false, value: 'actions' }
                ],

                users: [],

                breadcrumbs: [
                    { text: 'Users', disabled: false, href: '/Users' },
                    { text: 'SystemUsers', disabled: true, href: '/Users/SystemUsers' }
                ],

                successAlert:false,
                unsuccessAlert:false,
                unsuccessCreateAlert:false,
                successCreateAlert:false,
                successUpdateAlert:false
            }
        },

        created(){
            this.getUsers()
        },

        methods: {

            getUsers(){
                this.axios.get(this.$apiUrl+"/api/v1.0/UserManagement/users",{
                params:{
                    status: "Deactivate"
                }
                
                }).then(Response=>(
                    this.users=Response.data.user.data
                ))
            },



            deleteAlert(success){
                this.successAlert = success;
                this.getUsers()
            },
            faileAlert(failed){
                this.unsuccessAlert = failed;
            },

            createSuccessAlert(success){
                this.getUsers()
                this.successCreateAlert = success
            },
            createFailAlert(failed){
                this.unsuccessCreateAlert = failed
            },

            updateSuccessAlert(success){
                this.getUsers()
                this.successUpdateAlert = success
            },

            
        }
    }
</script>
            



<style scoped>

    .theme--light.v-chip:not(.v-chip--active).v-chip.Teacher{
        background: orange;
    }
    .theme--light.v-chip:not(.v-chip--active).v-chip.Admin{
        background: rgb(0, 192, 0);
    }
    .theme--light.v-chip:not(.v-chip--active).v-chip.Standerd{
        background: rgb(185, 182, 182);
    }
</style>

            
        
        

