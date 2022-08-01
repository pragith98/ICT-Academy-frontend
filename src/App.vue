<template>
  <v-app>
    <app-AdminNavigation v-show="privilege == 'Super'"></app-AdminNavigation>
    <v-main class="blue-grey  lighten-5">
      <!-- <v-container> -->
        <router-view></router-view>
      <!-- </v-container> -->
      
    </v-main>
  </v-app>
</template>


<script>
    import AdminNavigation from './components/Admin-Navigation.vue'

  export default{
    components:{
        'app-AdminNavigation':AdminNavigation
    },

    data(){
      return{
        logedUser : JSON.parse(localStorage.getItem('user')),
        privilege:''
      }
    },

    created(){
      this.getUserPrivilege()
    },

    methods:{
      getUserPrivilege(){
        if(this.logedUser){
          this.privilege = this.logedUser.privilege
        }
        
        
      }
    }
  }
</script>