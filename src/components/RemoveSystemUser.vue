<template>
    <v-row justify="start">
        <v-dialog v-model="dialog" persistent max-width="400px">
            <template v-slot:activator="{ on, attrs }">
                <v-btn class="error" fab dark x-small depressed v-bind="attrs" v-on="on"><v-icon dark>mdi-close</v-icon></v-btn>
            </template>
            <v-card>
                <v-container class="text-center">
                    <v-card-title>
                        <v-row justify="center">
                            <v-icon size="100" color="error">mdi-help-circle-outline</v-icon>
                        </v-row>
                    </v-card-title>
                    <span class="text-h6 text-center">Do you really want to remove <br> <strong>"{{staff.fname}}"</strong></span>
                </v-container>
                
                
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" @click="dialog = false, failedAlert()" outlined>Cancel</v-btn>
                    <v-btn color="error" @click="dialog = false, successAlert()" depressed>Remove</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-row>
</template>



<script>
    export default {
        props:['staff'],
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