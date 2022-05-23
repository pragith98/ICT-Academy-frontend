<template>
    <div>
        


        <v-container class="mt-5">
            <h1 class="title font-weight-black grey--text">DASHBOARD</h1>
            <v-row class="mt-3">
                <v-col lg="3" md="3" sm="6" cols="12" class="mb-3" v-for="cardlist in cardlist" :key="cardlist.name">
                    <v-card flat  :color=cardlist.color dark class="lighten-2">
                        <v-row>
                            <v-col>
                                <v-responsive class="text-left ml-5">
                                    <v-icon size="80">{{cardlist.icon}}</v-icon>
                                </v-responsive>
                            </v-col>
                            <v-col class="text-right mr-5">
                                <div class="display-1 font-weight-black" >{{ cardlist.count }}</div>
                                <div class="title" >{{ cardlist.name }}</div>
                            </v-col>
                        </v-row>
                    </v-card>
                </v-col>

                <v-col>
                    <v-card width="500" height="100">
                        
                    </v-card>
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
                    {name:'STUDENTS', count:"2500", icon:'mdi-account-group', color:'purple lighten-2'},
                    {name:'TEACHERS', count:"15", icon:'mdi-human-male-board', color:'pink lighten-2'},
                    {name:'STAFF', count:"5", icon:'mdi-account-multiple', color:'brown'},
                    {name:'CLASSES', count:"30", icon:'mdi-google-classroom', color:'blue'},
                    
                ],


                
            }
        }
        
    }
</script>
