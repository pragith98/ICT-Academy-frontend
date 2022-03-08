import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  { path:'/Students', name:'Students', component:()=> import('../views/Students.vue')},
  { path:'/Accounting', name:'Accounting', component:()=> import('../views/Accounting.vue')},
  { path:'/Attendance', name:'Attendance', component:()=> import('../views/Attendance.vue')},
  { path:'/Branches', name:'Branches', component:()=> import('../views/Branches.vue')},
  { path:'/Classes', name:'Classes', component:()=> import('../views/Classes.vue')},
  { path:'/Parents', name:'Parents', component:()=> import('../views/Parents.vue')},
  { path:'/Payments', name:'Payments', component:()=> import('../views/Payments.vue')},
  { path:'/Staff', name:'Staff', component:()=> import('../views/Staff.vue')},
  { path:'/Teachers', name:'Teachers', component:()=> import('../views/Teachers.vue')}
  // {
  //   path: '/about',
  //   name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
