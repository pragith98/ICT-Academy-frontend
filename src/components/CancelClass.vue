<template>
    <v-row justify="end">
        <v-dialog v-model="dialog" persistent max-width="400px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn text v-bind="attrs" v-on="on" >Cancel</v-btn>
            </template>
            <v-card>
                <v-container class="text-center">
                    <v-card-title>
                        <v-row justify="center">
                            <v-icon size="100" color="error">mdi-help-circle-outline</v-icon>
                        </v-row>
                    </v-card-title>
                    <span class="text-h6 text-center">Do you really want to cancel <br> <strong>"{{classDetails.className}}"</strong></span>
                </v-container>
                
                
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" @click="dialog = false" outlined>No</v-btn>
                    <v-btn color="error" @click="cancelClass()" depressed>Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>



<script>
    export default {
        props:['classDetails','todayDate'],
        data: () => ({
            dialog: false,
            
        }),

        methods:{

            cancelClass(){
                this.axios.delete(this.$apiUrl+"/api/v1.0/AttendanceManagement/attendances/classes/"+this.classDetails.classID,{
                    data: {
                        date:this.todayDate
                    }

                })
                .then(Response=>{
                    if(Response.data.success == true){
                        this.dialog=false
                        this.successAlert()
                    }else{
                        this.failedAlert()
                    }
                })
                .catch(error => {
                    this.failedAlert()
                    console.log(error)
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

<style scoped>
    @media only screen and (min-width: 768px) {


        .v-btn:not(.v-btn--round).v-size--default{
            width: 100px !important;
        }
    }
</style>