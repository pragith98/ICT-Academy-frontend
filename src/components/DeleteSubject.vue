<template>
    <v-row justify="start">
        <v-dialog v-model="dialog" persistent max-width="400px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="error" fab dark x-small depressed v-bind="attrs" v-on="on" ><v-icon dark>mdi-delete</v-icon></v-btn>
            </template>

            <!-------------------- Delete confirmation dialog box --------------------->
            <v-card v-if="subjectDetails.classCount ==0">
                <v-container class="text-center">
                    <v-card-title>
                        <v-row justify="center">
                            <v-icon size="100" color="error">mdi-help-circle-outline</v-icon>
                        </v-row>
                    </v-card-title>
                    <span class="text-h6 text-center">Do you really want to delete <br> <strong>"{{subjectDetails.subjectName}}"</strong></span>
                </v-container>
                
                
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" @click="dialog = false" outlined>Cancel</v-btn>
                    <v-btn :loading="loading" color="error" @click="deleteSubject()" depressed>Delete
                        <v-icon right>mdi-delete</v-icon>
                    </v-btn>
                </v-card-actions>
            </v-card>

            <!-------------------- inform can't delete --------------------->
            <v-card v-else>
                <v-container class="text-center">
                    <v-card-title>
                        <v-row justify="center">
                            <v-icon size="100" color="orange">mdi-alert-circle-outline</v-icon>
                        </v-row>
                    </v-card-title>
                    <span class="text-h6 text-center">You cannot delete<br> <strong>"{{subjectDetails.subjectName}}"</strong><br>It has been assigned classes</span>
                </v-container>
                
                
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn class="ok_btn" color="grey" @click="dialog = false" outlined> OK </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>



<script>
    export default {
        props:['subjectDetails'],
        data: () => ({
            dialog: false,
            loading:false,
        }),

        methods:{

            deleteSubject(){
                this.loading=true
                this.axios.delete(this.$apiUrl+'/api/v1.0/SubjectManagement/subjects/'+this.subjectDetails.subjectID)
                    .then(Response=>{
                        if(Response.data.success == true){
                            this.successAlert();
                            this.dialog = false
                            this.loading=false
                        }else{
                            this.failedAlert();
                        }
                    })
                    .catch(error => {
                        this.failedAlert()
                        console.log(error.data)
                        this.loading=false
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
    .ok_btn{
        width: 100px;
    }
</style>