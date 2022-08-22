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
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Ordinary Level End Process</v-card-title>
                    
                    <v-row justify="center" style="padding:12px">
                        <v-card-text>
                            End process.
                        </v-card-text>
                        <div class="px-2 mb-5">
                            <v-btn :loading="loading1" @click="endProcessOrdinaryLevel()" :disabled="showOrdinaryLevel" block depressed x-large class="primary">End Batch <v-icon right>mdi-archive-cog</v-icon></v-btn>
                        </div>
                    </v-row>

                    <v-divider v-show="showOrdinaryLevel"></v-divider>
                    <v-row style="padding:12px" justify="center">
                        <v-card-text v-show="showOrdinaryLevel">
                            Updated_at: <strong>{{processOrdinaryLevel.updated_at}}</strong><br>
                            Staff member: <strong>{{processOrdinaryLevel.handledBy.staffName}}</strong><br>
                        </v-card-text>
                    </v-row>
                </v-card>

                <v-card flat max-width="750px" style="margin: auto" class="mt-10">
                    <v-card-title class="heading-1 blue-grey lighten-4  blue-grey--text text--darken-2">Advanced Level End Process</v-card-title>
                    
                    <v-row justify="center" style="padding:12px">
                        <v-card-text>
                            End process.
                        </v-card-text>
                        <div class="px-2 mb-5">
                            <v-btn :loading="loading2" @click="endProcessAdvancedLevel()" :disabled="showAdvancedLevel" block depressed x-large class="primary">End Batch <v-icon right>mdi-archive-cog</v-icon></v-btn>
                        </div>
                    </v-row>

                    <v-divider v-show="showAdvancedLevel"></v-divider>
                    <v-row style="padding:12px" justify="center">
                        <v-card-text v-show="showAdvancedLevel">
                            Updated_at: <strong>{{processAdvancedLevel.updated_at}}</strong><br>
                            Staff member: <strong>{{processAdvancedLevel.handledBy.staffName}}</strong><br>
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
                loading1:false,
                loading2:false,

                showOrdinaryLevel:false,
                showAdvancedLevel:false,

                processOrdinaryLevel:{
                    updated_at:'',
                    handledBy:{
                        staffName:''
                    }
                },

                processAdvancedLevel:{
                    updated_at:'',
                    handledBy:{
                        staffName:''
                    }
                },

                breadcrumbs: [
                    { text: 'Processes', disabled: false, href: '/Processes' },
                    { text: 'Batch End Process', disabled: true, href: '/Processes/BatchEndProcess' }
                ],


                successAlert:false,
                unsuccessAlert:false,

                
            }
        },

        created(){
            this.getAdvancedLevelProcess()
            this.getOrdinaryLevelProcess()
        },

        methods: {

            getAdvancedLevelProcess(){
                this.axios.get(this.$apiUrl+"/api/v1.0/ProcessManagement/processes/showAdvancedLevelEnd").then(Response=>(
                    this.setDataAdvancedLevel(Response),
                    this.checkResponseAdvancedLevel(Response.data.success)
                    
                ))
            },

            getOrdinaryLevelProcess(){
                this.axios.get(this.$apiUrl+"/api/v1.0/ProcessManagement/processes/showOrdinaryLevelEnd").then(Response=>(
                    this.setDataOrdinaryLevel(Response),
                    this.checkResponseOrdinaryLevel(Response.data.success)
                    
                ))
            },

            setDataAdvancedLevel(Response){
                if(Response.data.process){
                    this.processAdvancedLevel=Response.data.process
                }
            },

            setDataOrdinaryLevel(Response){
                if(Response.data.process){
                    this.processOrdinaryLevel=Response.data.process
                }
            },

            checkResponseAdvancedLevel(Response){
                if(Response == true){
                    this.showAdvancedLevel = true
                }else{
                    this.showAdvancedLevel = false
                }
            },

            checkResponseOrdinaryLevel(Response){
                if(Response == true){
                    this.showOrdinaryLevel = true
                }else{
                    this.showOrdinaryLevel = false
                }
            },


            endProcessAdvancedLevel(){
                const LogedUser = JSON.parse(localStorage.getItem('user'));
                this.loading2=true
                this.axios.post(this.$apiUrl+"/api/v1.0/ProcessManagement/processes/advancedLevelEnd",{
                    handlerStaffID: LogedUser.employee.employeeID,
                    branchID: LogedUser.employee.branch.branchID
                })
                .then(Response=>{
                    if(Response.data.success == true){
                        this.loading2=false
                        this.getAdvancedLevelProcess()
                        this.successAlert=true;
                    }else{
                        this.unsuccessAlert=true;
                    }
                })
                .catch(error => {
                    this.loading2=false
                    this.unsuccessAlert=true;
                    console.log(error.data)
                });
            },


            endProcessOrdinaryLevel(){
                const LogedUser = JSON.parse(localStorage.getItem('user'));
                this.loading1=true
                this.axios.post(this.$apiUrl+"/api/v1.0/ProcessManagement/processes/ordinaryLevelEnd",{
                    handlerStaffID: LogedUser.employee.employeeID,
                    branchID: LogedUser.employee.branch.branchID
                })
                .then(Response=>{
                    if(Response.data.success == true){
                        this.loading1=false
                        this.getOrdinaryLevelProcess()
                        this.successAlert=true;
                    }else{
                        this.unsuccessAlert=true;
                    }
                })
                .catch(error => {
                    this.loading1=false
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

            
        
        

