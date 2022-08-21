<template>
    
    <nav>
        
        <v-app-bar app flat class="pt-3 blue-grey lighten-5">
            <v-app-bar rounded flat color="white">
                <v-app-bar-nav-icon @click="drawer= !drawer"></v-app-bar-nav-icon>
                <v-toolbar-title class="font-weight-black text--secondary" >ICT Academy</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-menu left bottom :close-on-content-click="closeOnContentClick">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on" class="mr-5">
                            <v-list-item-avatar size="40">
                                <v-img src="../assets/icons/teacher.jpg"></v-img>
                            </v-list-item-avatar>
                        </v-btn>
                    </template>
                    <v-card  width="300" height="370">
                        <v-list>
                            <v-row justify="center" class="mt-3">
                                <v-list-item-avatar size="100">
                                    <v-img src="../assets/icons/teacher.jpg"></v-img>
                                </v-list-item-avatar>
                            </v-row>
                            
                            <v-row justify="center">
                                <v-card-title class="pb-0">{{proName}}</v-card-title>
                            </v-row>
                            <v-row justify="center">
                                <v-chip small outlined>{{privilege}}</v-chip>
                            </v-row>
                            <v-row>
                                <v-divider class="mt-2"></v-divider>
                            </v-row>
                            <v-row justify="center" class="pa-8">
                                <app-UserProfile></app-UserProfile>
                            </v-row>
                            <v-row>
                                <v-divider></v-divider>
                            </v-row>
                            <v-row justify="center" class="pa-5">
                                <v-btn @click="logout()" :loading="loading"  depressed color="grey" dark class=" lighten-1" outlined>Logout
                                    <v-icon right>mdi-logout</v-icon>
                                </v-btn>
                            </v-row>
                            
                        </v-list>
                    </v-card>
                    
                </v-menu>
                
            </v-app-bar>
            
        </v-app-bar>
        
        <v-navigation-drawer v-model="drawer" app color="#263238" dark>
            
            <v-card color="#263238" class="pa-4 mt-3" flat>
                <v-card flat class="text-center" color="#455A64" shaped>
                    <v-card-title class="font-weight-bold">ICT Academy</v-card-title>
                    <v-select @change="changeBranch()" return-object item-text="branchName" item-value="branchID" :items="branches" v-model="branch" outlined dense class="px-3"></v-select>
                    
                </v-card>
            </v-card>
            
 
            <v-divider></v-divider>
            <v-list nav dense shaped>
                <v-list-item-group v-model="selectedItem" color="white">
                    <v-list-item v-for="(item, i) in items" :key="i" :to="item.link">
                            <v-list-item-icon >
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>

                            <v-list-item-content>
                                <v-list-item-title class="subtitle-2" v-text="item.text"></v-list-item-title>
                            </v-list-item-content>
                        
                    </v-list-item>
                </v-list-item-group>
            </v-list>
        </v-navigation-drawer>
    </nav>
</template>


<script>
    import UserProfile from './UserProfile.vue'
    export default{
        components:{
            'app-UserProfile':UserProfile
        },

        data(){
            return{
                //----------logged User details-----------
                logedUser : JSON.parse(localStorage.getItem('user')),
                //----------logged User details-----------


                proName:'',
                privilege:'',

                loading:false,

                closeOnContentClick: false,
                drawer:false,
                selectedItem: 0,
                items: [
                    { text: 'Exams', icon: 'mdi-file-document-edit', link:'/Exams' },
                ],

                branch:[],
                branches:[],

            }
        },

        created(){
            this.showUser()
            this.getAllBranches()
        },

        


        methods:{
            setBranch(){
                var user=this.logedUser

                if(user.employee.branch.branchID == null){
                    this.branch = this.branches[0],
            
                    user.employee.branch = this.branch

                    const jsonObj = JSON.stringify(user)
                    localStorage.setItem('user', jsonObj)

                }
            },

            changeBranch(){
                var user=this.logedUser
                user.employee.branch = this.branch

                const jsonObj = JSON.stringify(user)
                localStorage.setItem('user', jsonObj)
                this.$router.go()
            },

            getAllBranches(){
                this.axios.get(this.$apiUrl+"/api/v1.0/BranchManagement/branches").then(Response=>{
                    this.branches=Response.data.branch.data,
                    this.setBranch(),

                    this.branch=this.logedUser.employee.branch
                })
            },
            
            showUser(){
                if(this.logedUser){
                    this.proName= this.logedUser.employee.name
                    this.privilege=this.logedUser.privilege
                }
                
            },

            logout(){
                this.loading=true
                this.axios.post(this.$apiUrl+"/api/v1.0/UserManagement/users/"+this.logedUser.userID+"/logout",
                    null
                )
                .then(Response=>{
                    if(Response.data.success == true){
                        this.clearUserLocalStorage()
                        console.log("loged out!")
                        this.loading=false

                        window.location.replace("/Login")
                    }else{
                        this.loading=false
                    }
                })
                .catch(error => {
                    this.loading=false
                    console.log(error.data)
                });
                
            },

            clearUserLocalStorage(){
                localStorage.clear()
            },
        }

    }
</script>



<style scoped>
    .v-application--is-ltr .v-list-item__avatar:first-child {
        margin-right: 0px;
    }
</style>