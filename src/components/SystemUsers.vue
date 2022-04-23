<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
                <template v-slot:divider>
                    <v-icon>mdi-chevron-right</v-icon>
                </template>
            </v-breadcrumbs>
        <v-container>

            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon>Account remove <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Account remove <strong>successful</strong> </v-snackbar>
            
            <v-snackbar :timeout="3000" v-model="unsuccessCreateAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon>Account Create <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successCreateAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Account Create <strong>successful</strong> </v-snackbar>
 

            <template>
                <v-card flat>
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">System Users
                        <app-CreateSystemUser class="mr-2" @success="createSuccessAlert($event)" @failed="createFailAlert($event)"></app-CreateSystemUser>
                    </v-card-title>
                    <v-card-title><v-spacer></v-spacer><v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field></v-card-title>
                    <v-data-table :headers="headers" :items="staff" :search="search">
                        <template v-slot:[`item.actions`]="{ item }">
                                <!-- <v-chip small>{{item.role}}</v-chip>
                                <v-chip outlined small>{{item.getBrach}}</v-chip> -->

                                <v-card-actions>
                                    <app-EditSystemUser :staff='item'></app-EditSystemUser>
                                    <v-spacer></v-spacer>
                                    <app-RemoveSystemUser class="ml-5" :staff='item' @success="deleteAlert($event)" @failed="faileAlert($event)"></app-RemoveSystemUser>
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
    import CreateSystemUser from './CreateSystemUser.vue'
    import EditSystemUser from './EditSystemUser.vue'

    export default {
        components:{
            'app-RemoveSystemUser':RemoveSystemUser,
            'app-CreateSystemUser':CreateSystemUser,
            'app-EditSystemUser':EditSystemUser
        },
        data () {
            return {
                search: '',
                headers: [
                    { text: 'ID', sortable: false, value: 'staffID' },
                    { text: 'NAME',align: 'start', sortable: false, value:'fname'},
                    { text: 'ROLE', sortable: true, value: 'role' },
                    { text: 'TELEPHONE NO.', sortable: false, value: 'tp' },
                    { text: 'BRANCH', sortable: true, value: 'getBrach' },
                    { text: '', sortable: false, value: 'actions' }
                ],

                staff: [
                    {fname:'Saman', lname:'Herath', nicType:'old', nicNo:'871982289v', tp:'1231235323', email:'Saman@Saman.com', address:'no1, rathnapura', getGender:'Male', staffID:'2621', date:'2021-02-17', getBrach:'Hakmana', role:'Teacher'},
                    {fname:'Dasun', lname:'Rathnayake', nicType:'old', nicNo:'871982289v', tp:'4321235323', email:'Dasun@Dasun.com', address:'no1, Matale', getGender:'Male', staffID:'2065', date:'2021-07-19', getBrach:'Walasmulla', role:'Admin'},
                    {fname:'Kasun', lname:'Bandara', nicType:'old', nicNo:'871982289v', tp:'7831235323', email:'Kasun@Kasun.com', address:'no1, Kandy', getGender:'Male', date:'2021-02-19', staffID:'2071', getBrach:'Kamburupitiya', role:'Standerd user'},
                    {fname:'Maheshi', lname:'Ranathunga', nicType:'old', nicNo:'871982289v',tp:'9931235323', email:'Maheshi@Maheshi.com', address:'no1, Jafna', getGender:'Female', date:'2021-09-12', staffID:'2024', getBrach:'Walasmulla', role:'Standerd user'},
                    
                ],

                breadcrumbs: [
                    { text: 'Staff', disabled: false, href: '/Staff' },
                    { text: 'SystemUsers', disabled: true, href: '/Staff/SystemUsers' }
                ],

                successAlert:false,
                unsuccessAlert:false,
                unsuccessCreateAlert:false,
                successCreateAlert:false
            }
        },

        methods: {
            deleteAlert(success){
                this.successAlert = success;
            },
            faileAlert(failed){
                this.unsuccessAlert = failed;
            },

            createSuccessAlert(success){
                this.successCreateAlert = success
            },
            createFailAlert(failed){
                this.unsuccessCreateAlert = failed
            }
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

            
        
        

