<template>
    <div>
        <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>


        <v-container>
            <h1 class="title font-weight-black grey--text">STAFF</h1>
            <v-row>
                <v-col lg="3" md="4" sm="6" cols="12" v-for="cardlist in cardlist" :key="cardlist.name">
                    <v-hover close-delay="100" v-slot="{hover}">
                        <v-card  :elevation="hover? 7:0" flat class="'on-hover': hover lighten-2" :to=cardlist.link :color=cardlist.color dark>
                        
                            <v-responsive class="pt-4 text-center">
                                <v-icon size="100">{{cardlist.icon}}</v-icon>
                            </v-responsive>
                            <v-card-title class=" mb-5" style="justify-content:center">
                                <div class="title" >{{ cardlist.name }}</div>
                            </v-card-title>
                            
                        </v-card>
                    </v-hover>
                    
                </v-col>

            </v-row>

        </v-container>
    </div>
</template>



<script>

    export default{

        data(){
            return{
                cardlist:[
                    {name:'Register Staff', icon:'mdi-account-plus', color:'teal', link:'/Staff/StaffRegistration'},
                    {name:'Staff Details', icon:'mdi-view-list', color:'orange', link:'/Staff/StaffDetails'},
                    {name:'Deactivated Staff', icon:'mdi-account-off', color:'red', link:'/Staff/DeactivatedStaffDetails'}
                ],


                breadcrumbs: [
                    { text: 'Staff', disabled: true, href: '/Staff' }
                ],
            }
        }
        
    }
</script>
