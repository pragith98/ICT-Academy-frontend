<template>
    <div>
        <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>


        <v-container>
            <h1 class="title font-weight-black grey--text">Financial</h1>
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

                <v-col lg="3" md="4" sm="6" cols="12" v-for="cardlist2 in cardlist2" :key="cardlist2.name" v-show="show">
                    <v-hover close-delay="100" v-slot="{hover}">
                        <v-card  :elevation="hover? 7:0" flat class="'on-hover': hover lighten-2" :to=cardlist2.link :color=cardlist2.color dark>
                        
                            <v-responsive class="pt-4 text-center">
                                <v-icon size="100">{{cardlist2.icon}}</v-icon>
                            </v-responsive>
                            <v-card-title class=" mb-5" style="justify-content:center">
                                <div class="title" >{{ cardlist2.name }}</div>
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
                show:false,
                logedUser : JSON.parse(localStorage.getItem('user')),

                cardlist:[
                    {name:'Fees Payment', icon:'mdi-cash-check', color:'pink lighten-2', link:'/Financial/FeesPayment'},
                    {name:'Teacher Advance', icon:'mdi-account-cash', color:'cyan', link:'/Financial/TeacherAdvance'},
                    {name:'Staff Advance', icon:'mdi-account-cash', color:'lime', link:'/Financial/StaffAdvance'},
                    {name:'Expenditures', icon:'mdi-chart-donut', color:'green', link:'/Financial/Expenditure'},
                ],

                cardlist2:[
                    {name:'Trashed', icon:'mdi-delete', color:'red', link:'/Financial/Expenditure'}
                ],


                breadcrumbs: [
                    { text: 'Financial', disabled: true, href: '/Financial' }
                ],
            }
        },

        created(){
            this.checkPrivilege()
        },

        methods:{
            checkPrivilege(){
                if(this.logedUser){
                    if(this.logedUser.privilege == 'Admin'){
                        this.show=true
                    }else if(this.logedUser.privilege == 'Super'){
                        this.show=true
                    }else{
                        this.show=false
                    }
                    
                }
            }
        }
        
    }
</script>
