<template>
    <v-row justify="start">
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
                    <span class="text-h6 text-center">Do you really want to delete <br> <strong>"{{examDetails.exam}}"</strong></span>
                </v-container>
                
                
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" @click="dialog = false" outlined>Cancel</v-btn>
                    <v-btn :loading="loading" color="error" @click="deleteExam()" depressed>Delete
                        <v-icon right>mdi-delete</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>



<script>
    export default {
        props:['examDetails'],
        data: () => ({
            dialog: false,
            loading:false,
        }),

        methods:{
            deleteExam(){
                this.loading=true
                this.axios.delete(this.$apiUrl+'/api/v1.0/ExamManagement/exams/'+this.examDetails.examID)
                    .then(Response=>{
                        if(Response.data.success == true){
                            this.successAlert();
                            this.loading=false
                            this.dialog=false
                        }else{
                            this.failedAlert();
                        }
                    }).catch(error => {
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