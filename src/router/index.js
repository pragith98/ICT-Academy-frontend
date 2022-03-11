import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Students from '../views/Students.vue'
import Accounting from '../views/Accounting.vue'
import Attendance from '../views/Attendance.vue'
import Branches from '../views/Branches.vue'
import Classes from '../views/Classes.vue'
import Parents from '../views/Parents.vue'
import Payments from '../views/Payments.vue'
import Staff from '../views/Staff.vue'
import Teachers from '../views/Teachers.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path:'/Students', name:'Students', component:Students},
  { path:'/Accounting', name:'Accounting', component:Accounting},
  { path:'/Attendance', name:'Attendance', component:Attendance},
  { path:'/Branches', name:'Branches', component:Branches},
  { path:'/Classes', name:'Classes', component:Classes},
  { path:'/Parents', name:'Parents', component:Parents},
  { path:'/Payments', name:'Payments', component:Payments},
  { path:'/Staff', name:'Staff', component:Staff},
  { path:'/Teachers', name:'Teachers', component:Teachers},

  { path:'/Students/StudentRegistration', name:'StudentRegistration', component:()=> import('../components/StudentRegistration.vue')},
  { path:'/Teachers/TeacherRegistration', name:'TeacherRegistration', component:()=> import('../components/TeacherRegistration.vue')}
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
