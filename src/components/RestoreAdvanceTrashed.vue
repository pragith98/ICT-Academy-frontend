<template>
    <v-row justify="start">
        <v-dialog v-model="dialog" persistent max-width="400px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn  class="warning" fab dark x-small depressed v-bind="attrs" v-on="on"><v-icon dark>mdi-undo</v-icon></v-btn>
            </template>
            <v-card>
                <v-container class="text-center">
                    <v-card-title>
                        <v-row justify="center">
                            <v-icon size="100" color="warning">mdi-help-circle-outline</v-icon>
                        </v-row>
                    </v-card-title>
                    <span class="text-h6 text-center">Do you really want to restore <br> <strong>Advance ID:"{{payment.advanceID}}"</strong></span>
                </v-container>
                
                
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" @click="dialog = false" outlined>Cancel</v-btn>
                    <v-btn :loading="loading" color="warning" @click="restorePaymentDetails()" depressed>Restore
                        <v-icon right>mdi-undo</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>



<script>
    export default {
        props:['payment'],
        data: () => ({
            dialog: false,
            loading:false,

            //----------logged User details-----------
            logedUser : JSON.parse(localStorage.getItem('user')),
            //----------logged User details-----------
        }),


        methods:{
            restorePaymentDetails(){
                this.loading=true
                this.axios.post(this.$apiUrl+"/api/v1.0/AdvanceManagement/advances/"+this.payment.advanceID+'/restore',{
                    handlerStaffID: this.logedUser.employee.employeeID,
                })
                    .then(Response=>{
                        if(Response.data.success == true){
                            this.dialog = false
                            this.successAlert();
                            this.loading=false
                        }else{
                            this.failedAlert();
                        }
                    })
                    .catch(error => {
                        this.loading=false
                        this.failedAlert()
                        console.log(error.data)
                        
                    });
            },


            successAlert(){
                this.$emit('success',true)
            },
            failedAlert(){
                this.$emit('failed',true)
            }
        }
    }
</script>