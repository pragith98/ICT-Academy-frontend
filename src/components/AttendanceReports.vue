<template>
    <div>
        <v-breadcrumbs :items="breadcrumbs">
            <template v-slot:divider>
                <v-icon>mdi-chevron-right</v-icon>
            </template>
        </v-breadcrumbs>


        <v-container>
            
            <v-row>
                <v-col>
                    <v-card flat>
                        <v-tabs vertical center-active show-arrows active-class="white--text grey" background-color="blue-grey lighten-4 " >
                            <v-tabs-slider color="blue-grey"></v-tabs-slider>
                            <v-tab href="#1">All Expences</v-tab>
                            <v-tab href="#2">Expences For Branches</v-tab>

                            
                            <v-tab-item value="1" class="mt-5">
                                <app-AllExpenceReport></app-AllExpenceReport>
                            </v-tab-item>
                        
                            <v-tab-item value="2" class="mt-5">
                                <app-TrashTeacherAdvance></app-TrashTeacherAdvance>
                            </v-tab-item>
                            
                        </v-tabs>
                    </v-card>

                </v-col>
                

            </v-row>

        </v-container>
    </div>
</template>



<script>
    import AllExpenceReport from './AllExpenceReport.vue'

    import TrashTeacherAdvance from './TrashTeacherAdvance.vue'

    export default{
        components:{
            'app-AllExpenceReport':AllExpenceReport,

            'app-TrashTeacherAdvance':TrashTeacherAdvance,
        },
        data(){
            return{
                


                breadcrumbs: [
                    { text: 'Reports', disabled: false, href: '/Reports' },
                    { text: 'Attendance Reports', disabled: true, href: '/Reports/FinancialTrash' }
                ],
            }
        }
        
    }
</script>
