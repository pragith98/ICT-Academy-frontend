import Vue from 'vue'
import VueRouter from 'vue-router'

import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)


import Home from '../views/Home.vue'
import Students from '../views/Students.vue'
import Attendance from '../views/Attendance.vue'
import Branches from '../views/Branches.vue'
import Classes from '../views/Classes.vue'
import Financial from '../views/Financial.vue'
import Staff from '../views/Staff.vue'
import Teachers from '../views/Teachers.vue'
import Users from '../views/Users.vue'
import Login from '../views/Login.vue'
import ForgotPassword from '../views/ForgotPassword.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path:'/Students', name:'Students', component:Students},
  { path:'/Attendance', name:'Attendance', component:Attendance},
  { path:'/Branches', name:'Branches', component:Branches},
  { path:'/Classes', name:'Classes', component:Classes},
  { path:'/Financial', name:'Financial', component:Financial },
  { path:'/Staff', name:'Staff', component:Staff},
  { path:'/Teachers', name:'Teachers', component:Teachers},
  { path:'/Users', name:'Users', component:Users},
  { path:'/Login', name:'Login', component:Login},
  { path:'/ForgotPassword', name:'ForgotPassword', component:ForgotPassword},

  { path:'/Students/StudentRegistration', name:'StudentRegistration', component:()=> import('../components/StudentRegistration.vue')},
  { path:'/Students/StudentDetails', name:'StudentDetails', component:()=> import('../components/StudentDetails.vue')},
  { path:'/Students/PastStudentDetails', name:'PastStudentDetails', component:()=> import('../components/PastStudentDetails.vue')},
  { path:'/Teachers/TeacherRegistration', name:'TeacherRegistration', component:()=> import('../components/TeacherRegistration.vue')},
  { path:'/Teachers/TeacherDetails', name:'TeacherDetails', component:()=> import('../components/TeacherDetails.vue')},
  { path:'/Teachers/DeactivatedTeacherDetails', name:'DeactivatedTeacherDetails', component:()=> import('../components/DeactivatedTeacherDetails.vue')},
  { path:'/Staff/StaffRegistration', name:'StaffRegistration', component:()=> import('../components/StaffRegistration.vue')},
  { path:'/Staff/StaffDetails', name:'StaffDetails', component:()=> import('../components/StaffDetails.vue')},
  { path:'/Staff/DeactivatedStaffDetails', name:'DeactivatedStaffDetails', component:()=> import('../components/DeactivatedStaffDetails.vue')},
  { path:'/Users/SystemUsers', name:'SystemUsers', component:()=> import('../components/SystemUsers.vue')},
  { path:'/Classes/CreateClass', name:'CreateClass', component:()=> import('../components/CreateClass.vue')},
  { path:'/Classes/Subjects', name:'Subjects', component:()=> import('../components/Subjects.vue')},
  { path:'/Classes/ClassDetails', name:'ClassDetails', component:()=> import('../components/ClassDetails.vue')},
  { path:'/Classes/EnrollDetails', name:'EnrollDetails', component:()=> import('../components/EnrollDetails.vue')},
  { path:'/Classes/FreeCards', name:'FreeCards', component:()=> import('../components/FreeCards.vue')},
  { path:'/Attendance/TodayClasses', name:'TodayClasses', component:()=> import('../components/TodayClasses.vue')},
  { path:'/Attendance/AttendanceDetails', name:'AttendanceDetails', component:()=> import('../components/AttendanceDetails.vue')},
  { path:'/Branches/CreateBranch', name:'CreateBranch', component:()=> import('../components/CreateBranch.vue')},
  { path:'/Branches/BranchDetails', name:'BranchDetails', component:()=> import('../components/BranchDetails.vue')},
  { path:'/Financial/FeesPayment', name:'FeesPayment', component:()=> import('../components/FeesPayment.vue')},
  { path:'/Financial/TeacherAdvance', name:'TeacherAdvance', component:()=> import('../components/TeacherAdvance.vue')},
  { path:'/Financial/StaffAdvance', name:'StaffAdvance', component:()=> import('../components/StaffAdvance.vue')},
  { path:'/Financial/Expenditure', name:'Expenditure', component:()=> import('../components/Expenditure.vue')},
  { path:'/Attendance/TodayClasses/MarkAttendanceDailyFee/:id', name:'MarkAttendanceDailyFee', component:()=> import('../components/MarkAttendanceDailyFee.vue')}
  
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
