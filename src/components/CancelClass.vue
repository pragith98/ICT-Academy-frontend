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
                    <span class="text-h6 text-center">Do you really want to cancel <br> <strong>"{{classDetails.name}}"</strong></span>
                </v-container>
                
                
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" @click="dialog = false, failedAlert()" outlined>No</v-btn>
                    <v-btn color="error" @click="dialog = false, successAlert()" depressed>Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>



<script>
    export default {
        props:['classDetails'],
        data: () => ({
            dialog: false,
            
        }),

        methods:{
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