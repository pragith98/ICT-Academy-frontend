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
                            <v-tab href="#1">All Advances</v-tab>
                            <v-tab href="#2">Advance For Employee</v-tab>
                            <v-tab href="#3">Advance For Type</v-tab>

                            
                            <v-tab-item value="1" class="mt-5">
                                <app-AllAdvanceReport></app-AllAdvanceReport>
                            </v-tab-item>
                        
                            <v-tab-item value="2" class="mt-5">
                                <app-AdvanceForEmployee></app-AdvanceForEmployee>
                            </v-tab-item>

                            <v-tab-item value="3" class="mt-5">
                                <app-AdvanceForType></app-AdvanceForType>
                            </v-tab-item>
                            
                            
                        </v-tabs>
                    </v-card>

                </v-col>
                

            </v-row>

        </v-container>
    </div>
</template>



<script>
    import AllAdvanceReport from './AllAdvanceReport.vue'
    import AdvanceForEmployee from './AdvanceForEmployee.vue'
    import AdvanceForType from './AdvanceForType.vue'

    export default{
        components:{
            'app-AllAdvanceReport':AllAdvanceReport,
            'app-AdvanceForEmployee':AdvanceForEmployee,
            'app-AdvanceForType':AdvanceForType,
        },
        data(){
            return{
                


                breadcrumbs: [
                    { text: 'Reports', disabled: false, href: '/Reports' },
                    { text: 'Advance Reports', disabled: true, href: '/Reportsv/FinancialTrash' }
                ],
            }
        }
        
    }
</script>
