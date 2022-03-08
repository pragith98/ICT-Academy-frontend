<template>
    <nav>
        <v-app-bar color="white" app flat>
            <v-app-bar-nav-icon @click="drawer= !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title class="font-weight-black text--secondary" >ICT Academy</v-toolbar-title>
            <v-chip outlined class="ml-2" >Hakmana</v-chip>
            <v-spacer></v-spacer>
            <h1 class="subtitle-1">Hi! Daminda</h1>
            <v-btn depressed color="grey" dark class="ml-5 lighten-1" small>
                Logout
                <v-icon right>mdi-logout</v-icon>
            </v-btn>
        </v-app-bar>
        
        <v-navigation-drawer v-model="drawer" app color="primary" dark>
            <v-system-bar color="primary"></v-system-bar>
            <v-list class="text-center">
                <v-list-item-avatar size="100" >
                    <!-- <v-img src="../assets/Logo.png"></v-img> -->
                </v-list-item-avatar>
            </v-list>
            <v-divider></v-divider>
            <v-list nav dense shaped>
                <v-list-item-group v-model="selectedItem" color="white">
                    <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
                            <v-list-item-icon >
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title v-text="item.text"></v-list-item-title>
                            </v-list-item-content>
                        
                    </v-list-item>
                </v-list-item-group>
            </v-list>
            <!-- <router-link to="/students">students</router-link> -->
        </v-navigation-drawer>
    </nav>
</template>


<script>

    export default{
        

        data(){
            return{
                drawer:false,
                selectedItem: 0,
                items: [
                    { text: 'Dashboard', icon: 'mdi-view-dashboard', link:'/Students' },
                    { text: 'Students', icon: 'mdi-account-group', link:'/'},
                    { text: 'Teachers', icon: 'mdi-human-male-board' },
                    { text: 'Staff', icon: 'mdi-account-multiple' },
                    { text: 'Parents', icon: 'mdi-account' },
                    { text: 'Classes', icon: 'mdi-google-classroom' },
                    { text: 'Attendance', icon: 'mdi-checkbox-marked-outline' },
                    { text: 'Payments', icon: 'mdi-credit-card-outline' },
                    { text: 'Accounting', icon: 'mdi-chart-donut' },
                    { text: 'Branches', icon: 'mdi-sitemap' }
                ],
            }
        },

    }
</script>