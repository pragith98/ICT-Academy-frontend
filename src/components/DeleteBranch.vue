<template>
    <v-row justify="end">
        <v-dialog v-model="dialog" persistent max-width="400px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="error" fab dark x-small depressed v-bind="attrs" v-on="on"><v-icon dark>mdi-delete</v-icon></v-btn>
            </template>
            <v-card>
                <v-container class="text-center">
                    <v-card-title>
                        <v-row justify="center">
                            <v-icon size="100" color="error">mdi-help-circle-outline</v-icon>
                        </v-row>
                    </v-card-title>
                    <span class="text-h6 text-center">Do you really want to delete <br> <strong>"{{branchDetails.branchName}}"</strong></span>
                </v-container>
                
                
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" @click="dialog = false" outlined>Cancel</v-btn>
                    <v-btn color="error" @click="dialog = false, deleteBranch()" depressed>Delete
                        <v-icon right>mdi-delete</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>



<script>
    export default {
        props:['branchDetails'],
        data: () => ({
            dialog: false,
            
        }),

        methods:{
            deleteBranch(){
                this.axios.delete('http://127.0.0.1:8000/api/v1.0/BranchManagement/branches/'+this.branchDetails.branchID)
                    .then(Response=>{
                        if(Response.data.success == true){
                            this.successAlert();
                        }else{
                            this.failedAlert();
                        }
                    })
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