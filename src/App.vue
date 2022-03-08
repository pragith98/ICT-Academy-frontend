<template>
  <v-app>
    <app-AdminNavigation></app-AdminNavigation>
    <v-main class="blue lighten-5">
      <router-view></router-view>
    </v-main>
  </v-app>
</template>


<script>
    import AdminNavigation from './components/Admin-Navigation.vue'

    export default{
        components:{
            'app-AdminNavigation':AdminNavigation
        }
    }
</script>