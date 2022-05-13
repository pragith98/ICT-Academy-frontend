<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>


            <!----------------------------- Alerts ---------------------------------->
            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon> Branch delete <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Branch delete <strong>successful</strong> </v-snackbar>
            
            <v-snackbar :timeout="3000" v-model="unsuccessAlertUpdate" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon>Branch update <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlertUpdate" color="green"  bottom><v-icon left>mdi-check</v-icon>Branch update <strong>successful</strong> </v-snackbar>
            
            <!----------------------------- Alerts ---------------------------------->

            

            <template>
                <v-card flat>
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Branch Details</v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    <template>
                        <div>
                            <v-data-table :headers="headers" :items="branches" :search="search">
                                <template v-slot:[`item.actions`]="{ item }">
                                    <v-card-actions>
                                        <app-EditBranch  :branchDetails='item' @success="updateSuccessAlert($event)" @failed="updateFaileAlert($event)"></app-EditBranch> <v-spacer></v-spacer>
                                        <app-DeleteBranch class="ml-5" :branchDetails='item' @success="deleteAlert($event)" @failed="faileAlert($event)"></app-DeleteBranch>
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
    
    import DeleteBranch from './DeleteBranch.vue'
    import EditBranch from './EditBranch.vue'

    export default {
        
        components:{
            'app-DeleteBranch':DeleteBranch,
            'app-EditBranch':EditBranch,
        },

        data () {
            return {
                menu:false,

                search: '',
                headers: [
                    { text: 'BRANCH',align: 'start', sortable: false, value:'branchName'},
                    { text: 'TP', sortable: false, value: 'telNo' },
                    { text: 'ADDRESS',sortable: true, value: 'address' },
                    { text: 'HALLS', sortable: false, value: 'noOfRooms' },
                    { value: 'actions', sortable: false,align:'start' },
                ],

                branches:[],

                breadcrumbs: [
                    { text: 'Branches', disabled: false, href: '/Branches' },
                    { text: 'Branch Details', disabled: true, href: '/Attendance/BranchDetails' }
                ],

                successAlert:false,
                unsuccessAlert:false,

                unsuccessAlertUpdate:false,
                successAlertUpdate:false,
            }
        },

        created(){
            this.axios.get("http://127.0.0.1:8000/api/v1.0/BranchManagement/branches").then(Response=>(this.branches= Response.data.branch.data) )
        },

        methods: {
            recreate(){
                this.axios.get("http://127.0.0.1:8000/api/v1.0/BranchManagement/branches").then(Response=>(this.branches= Response.data.branch.data) )
            },

            deleteAlert(success){
                this.recreate();
                this.successAlert = success;
            },
            
            faileAlert(failed){
                this.unsuccessAlert = failed;
            },

            updateSuccessAlert(success){
                this.recreate();
                this.successAlertUpdate = success;

            },
            updateFaileAlert(failed){
                this.unsuccessAlertUpdate = failed;
            },
        }
    }
</script>
            





            
        
        

