<template>
    <div>
        <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>


        <v-container>
            <h1 class="title font-weight-black grey--text">Reports</h1>
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
                    {name:'Advance Reports', icon:'mdi-file-document-multiple', color:'green', link:'/Reports/AdvanceReports'},
                    {name:'Expence Reports', icon:'mdi-file-document-multiple', color:'orange', link:'/Branches/BranchDetails'},
                    {name:'Register Reports', icon:'mdi-file-document-multiple', color:'blue', link:'/Branches/BranchDetails'},
                    {name:'Exam Marks Reports', icon:'mdi-file-document-multiple', color:'purple', link:'/Branches/BranchDetails'},
                    {name:'Attendance Reports', icon:'mdi-file-document-multiple', color:'red', link:'/Branches/BranchDetails'},
                    {name:'Timetable Reports', icon:'mdi-file-document-multiple', color:'brown', link:'/Branches/BranchDetails'},
                ],


                breadcrumbs: [
                    { text: 'Reports', disabled: true, href: '/Reports' }
                ],
            }
        }
        
    }
</script>
