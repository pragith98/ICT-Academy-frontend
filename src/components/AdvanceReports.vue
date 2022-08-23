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
                        <v-tabs align-with-title show-arrows fixed-tabs active-class="white--text grey" background-color="blue-grey lighten-4 " >
                            <v-tabs-slider color="grey"></v-tabs-slider>
                            <v-tab href="#1"><v-icon left>mdi-cash-check</v-icon> Fees Payment</v-tab>
                            <v-tab href="#2"><v-icon left>mdi-account-cash</v-icon> Teacher Advance</v-tab>
                            <v-tab href="#3"><v-icon left>mdi-account-cash</v-icon> Staff Advance</v-tab>
                            <v-tab href="#4"><v-icon left>mdi-chart-donut</v-icon> Expenditures</v-tab>

                            
                            <v-tab-item value="1" class="mt-5">
                                <app-TrashFeesPayment></app-TrashFeesPayment>
                            </v-tab-item>
                        
                            <v-tab-item value="2" class="mt-5">
                                <app-TrashTeacherAdvance></app-TrashTeacherAdvance>
                            </v-tab-item>

                            <v-tab-item value="3" class="mt-5">
                                <app-TrashStaffAdvance></app-TrashStaffAdvance>
                            </v-tab-item>

                            <v-tab-item value="4" class="mt-5">
                                <app-TrashExpenditures></app-TrashExpenditures>
                            </v-tab-item>
                            
                            
                        </v-tabs>
                    </v-card>

                </v-col>
                

            </v-row>

        </v-container>
    </div>
</template>



<script>
    import TrashFeesPayment from './TrashFeesPayment.vue'
    import TrashTeacherAdvance from './TrashTeacherAdvance.vue'
    import TrashStaffAdvance from './TrashStaffAdvance.vue'
    import TrashExpenditures from './TrashExpenditures.vue'

    export default{
        components:{
            'app-TrashFeesPayment':TrashFeesPayment,
            'app-TrashTeacherAdvance':TrashTeacherAdvance,
            'app-TrashStaffAdvance':TrashStaffAdvance,
            'app-TrashExpenditures':TrashExpenditures,
        },
        data(){
            return{
                


                breadcrumbs: [
                    { text: 'Financial', disabled: false, href: '/Financial' },
                    { text: 'Trash', disabled: true, href: '/Financial/FinancialTrash' }
                ],
            }
        }
        
    }
</script>
