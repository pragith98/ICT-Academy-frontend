import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Students from '../views/Students.vue'
import Accounting from '../views/Accounting.vue'
import Attendance from '../views/Attendance.vue'
import Branches from '../views/Branches.vue'
import Classes from '../views/Classes.vue'
import Payments from '../views/Payments.vue'
import Staff from '../views/Staff.vue'
import Teachers from '../views/Teachers.vue'
import Login from '../views/Login.vue'
import ForgotPassword from '../views/ForgotPassword.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path:'/Students', name:'Students', component:Students},
  { path:'/Accounting', name:'Accounting', component:Accounting},
  { path:'/Attendance', name:'Attendance', component:Attendance},
  { path:'/Branches', name:'Branches', component:Branches},
  { path:'/Classes', name:'Classes', component:Classes},
  { path:'/Payments', name:'Payments', component:Payments},
  { path:'/Staff', name:'Staff', component:Staff},
  { path:'/Teachers', name:'Teachers', component:Teachers},
  { path:'/Login', name:'Login', component:Login},
  { path:'/ForgotPassword', name:'ForgotPassword', component:ForgotPassword},

  { path:'/Students/StudentRegistration', name:'StudentRegistration', component:()=> import('../components/StudentRegistration.vue')},
  { path:'/Students/StudentDetails', name:'StudentDetails', component:()=> import('../components/StudentDetails.vue')},
  { path:'/Teachers/TeacherRegistration', name:'TeacherRegistration', component:()=> import('../components/TeacherRegistration.vue')},
  { path:'/Teachers/TeacherDetails', name:'TeacherDetails', component:()=> import('../components/TeacherDetails.vue')},
  { path:'/Staff/StaffRegistration', name:'StaffRegistration', component:()=> import('../components/StaffRegistration.vue')},
  { path:'/Staff/StaffDetails', name:'StaffDetails', component:()=> import('../components/StaffDetails.vue')},
  { path:'/Staff/SystemUsers', name:'SystemUsers', component:()=> import('../components/SystemUsers.vue')},
  { path:'/Classes/CreateClass', name:'CreateClass', component:()=> import('../components/CreateClass.vue')},
  { path:'/Classes/Subjects', name:'Subjects', component:()=> import('../components/Subjects.vue')},
  { path:'/Classes/ClassDetails', name:'ClassDetails', component:()=> import('../components/ClassDetails.vue')},
  { path:'/Classes/EnrollDetails', name:'EnrollDetails', component:()=> import('../components/EnrollDetails.vue')},
  { path:'/Classes/FreeCards', name:'FreeCards', component:()=> import('../components/FreeCards.vue')},
  { path:'/Attendance/TodayClasses', name:'TodayClasses', component:()=> import('../components/TodayClasses.vue')},
  { path:'/Attendance/AttendanceDetails', name:'AttendanceDetails', component:()=> import('../components/AttendanceDetails.vue')},
  { path:'/Branches/CreateBranch', name:'CreateBranch', component:()=> import('../components/CreateBranch.vue')}
  
  // {
  //   path: '/about',
  //   name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

// router.beforeEach(() =>{
//   console.log("auth")
// })


const router = new VueRouter({
  routes,
  mode:'history'
})

export default router
