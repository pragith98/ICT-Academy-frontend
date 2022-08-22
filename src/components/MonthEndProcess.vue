<template>
    <div>

        <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>

        <v-container>

            <!----------------------------- Alerts ---------------------------------->

            <v-snackbar :timeout="3000" v-model="unsuccessAlert" color="red"  bottom ><v-icon left>mdi-alert-outline</v-icon>Process end <strong>failed</strong> </v-snackbar>
            <v-snackbar :timeout="3000" v-model="successAlert" color="green"  bottom><v-icon left>mdi-check</v-icon>Process end <strong>successful</strong> </v-snackbar>

            
            <!----------------------------- Alerts ---------------------------------->
 
            

            
                <v-card flat max-width="750px" style="margin: auto">
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Month End Process</v-card-title>
                    
                    <v-row justify="center" style="padding:12px">
                        <v-card-text>
                            End process.
                        </v-card-text>
                        <div class="px-2 mb-5">
                            <v-btn :loading="loading" @click="endProcess()" :disabled="show" block depressed x-large class="primary">End Month <v-icon right>mdi-timer-cog</v-icon></v-btn>
                        </div>
                    </v-row>

                    <v-divider v-show="show"></v-divider>
                    <v-row style="padding:12px" justify="center">
                        <v-card-text v-show="show">
                            Updated_at: <strong>{{process.updated_at}}</strong><br>
                            Staff member: <strong>{{process.handledBy.staffName}}</strong><br>
                        </v-card-text>
                    </v-row>
                </v-card>

        </v-container>
    </div>
 
    
</template>

<script>

    export default {
        components:{
            
        },
        data () {
            return {
                loading:false,
                

                show:false,

                process:{
                    updated_at:'',
                    handledBy:{
                        staffName:''
                    }
                },

                breadcrumbs: [
                    { text: 'Processes', disabled: false, href: '/Processes' },
                    { text: 'Month End Process', disabled: true, href: '/Processes/MonthEndProcess' }
                ],


                successAlert:false,
                unsuccessAlert:false,

                
            }
        },

        created(){
            this.getProcess()
        },

        methods: {

            getProcess(){
                this.axios.get(this.$apiUrl+"/api/v1.0/ProcessManagement/processes/showOrdinaryLevelEnd").then(Response=>(
                    this.setData(Response),
                    this.checkResponse(Response.data.success)
                    
                ))
            },


            setData(Response){
                if(Response.data.process){
                    this.process=Response.data.process
                }
            },


            checkResponse(Response){
                if(Response == true){
                    this.show = true
                }else{
                    this.show = false
                }
            },


            endProcess(){
                const LogedUser = JSON.parse(localStorage.getItem('user'));
                this.loading=true
                this.axios.post(this.$apiUrl+"/api/v1.0/ProcessManagement/processes/ordinaryLevelEnd",{
                    handlerStaffID: LogedUser.employee.employeeID,
                    branchID: LogedUser.employee.branch.branchID
                })
                .then(Response=>{
                    if(Response.data.success == true){
                        this.loading=false
                        this.getProcess()
                        this.successAlert=true;
                    }else{
                        this.unsuccessAlert=true;
                    }
                })
                .catch(error => {
                    this.loading=false
                    this.unsuccessAlert=true;
                    console.log(error.data)
                });
            },
        }
    }
</script>
            



<style scoped>
    .v-application .justify-end {
        justify-content: center !important;
    }

    fieldset{
        border-color: rgb(225, 225, 225);
        border-style: solid;
        border:0.1;
        border-style: solid;
    }
        
</style>

            
        
        

