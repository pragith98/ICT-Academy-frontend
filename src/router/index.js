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
import Exams from '../views/Exams.vue'
import Processes from '../views/Processes.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', name: 'Home', component: Home ,meta:{ requiresAuth:true }},
  { path:'/Students', name:'Students', component:Students ,meta:{ requiresAuth:true }},
  { path:'/Attendance', name:'Attendance', component:Attendance ,meta:{ requiresAuth:true }},
  { path:'/Branches', name:'Branches', component:Branches ,meta:{ requiresAuth:true }},
  { path:'/Classes', name:'Classes', component:Classes ,meta:{ requiresAuth:true }},
  { path:'/Financial', name:'Financial', component:Financial  ,meta:{ requiresAuth:true }},
  { path:'/Staff', name:'Staff', component:Staff ,meta:{ requiresAuth:true }},
  { path:'/Teachers', name:'Teachers', component:Teachers ,meta:{ requiresAuth:true }},
  { path:'/Users', name:'Users', component:Users ,meta:{ requiresAuth:true }},
  { path:'/Login', name:'Login', component:Login  ,meta:{ disableIfLoggedIn:true }},
  { path:'/ForgotPassword', name:'ForgotPassword', component:ForgotPassword},
  { path:'/Exams', name:'Exams', component:Exams ,meta:{ requiresAuth:true }},
  { path:'/Processes', name:'Processes', component:Processes ,meta:{ requiresAuth:true }},

  { path:'/Students/StudentRegistration', name:'StudentRegistration', component:()=> import('../components/StudentRegistration.vue') ,meta:{ requiresAuth:true }},
  { path:'/Students/StudentDetails', name:'StudentDetails', component:()=> import('../components/StudentDetails.vue') ,meta:{ requiresAuth:true }},
  { path:'/Students/PastStudentDetails', name:'PastStudentDetails', component:()=> import('../components/PastStudentDetails.vue') ,meta:{ requiresAuth:true }},
  { path:'/Teachers/TeacherRegistration', name:'TeacherRegistration', component:()=> import('../components/TeacherRegistration.vue') ,meta:{ requiresAuth:true }},
  { path:'/Teachers/TeacherDetails', name:'TeacherDetails', component:()=> import('../components/TeacherDetails.vue') ,meta:{ requiresAuth:true }},
  { path:'/Teachers/DeactivatedTeacherDetails', name:'DeactivatedTeacherDetails', component:()=> import('../components/DeactivatedTeacherDetails.vue') ,meta:{ requiresAuth:true }},
  { path:'/Staff/StaffRegistration', name:'StaffRegistration', component:()=> import('../components/StaffRegistration.vue') ,meta:{ requiresAuth:true }},
  { path:'/Staff/StaffDetails', name:'StaffDetails', component:()=> import('../components/StaffDetails.vue') ,meta:{ requiresAuth:true }},
  { path:'/Staff/DeactivatedStaffDetails', name:'DeactivatedStaffDetails', component:()=> import('../components/DeactivatedStaffDetails.vue') ,meta:{ requiresAuth:true }},
  { path:'/Users/SystemUsers', name:'SystemUsers', component:()=> import('../components/SystemUsers.vue') ,meta:{ requiresAuth:true }},
  { path:'/Users/DeactivatedSystemUsers', name:'DeactivatedSystemUsers', component:()=> import('../components/DeactivatedSystemUsers.vue') ,meta:{ requiresAuth:true }},
  { path:'/Classes/CreateClass', name:'CreateClass', component:()=> import('../components/CreateClass.vue') ,meta:{ requiresAuth:true }},
  { path:'/Classes/Subjects', name:'Subjects', component:()=> import('../components/Subjects.vue') ,meta:{ requiresAuth:true }},
  { path:'/Classes/ClassDetails', name:'ClassDetails', component:()=> import('../components/ClassDetails.vue') ,meta:{ requiresAuth:true }},
  { path:'/Classes/DeactivatedClassDetails', name:'DeactivatedClassDetails', component:()=> import('../components/DeactivatedClassDetails.vue') ,meta:{ requiresAuth:true }},
  { path:'/Classes/EnrollDetails', name:'EnrollDetails', component:()=> import('../components/EnrollDetails.vue') ,meta:{ requiresAuth:true }},
  { path:'/Classes/FreeCards', name:'FreeCards', component:()=> import('../components/FreeCards.vue') ,meta:{ requiresAuth:true }},
  { path:'/Attendance/TodayClasses', name:'TodayClasses', component:()=> import('../components/TodayClasses.vue') ,meta:{ requiresAuth:true }},
  { path:'/Attendance/AttendanceDetails', name:'AttendanceDetails', component:()=> import('../components/AttendanceDetails.vue') ,meta:{ requiresAuth:true }},
  { path:'/Branches/CreateBranch', name:'CreateBranch', component:()=> import('../components/CreateBranch.vue') ,meta:{ requiresAuth:true }},
  { path:'/Branches/BranchDetails', name:'BranchDetails', component:()=> import('../components/BranchDetails.vue') ,meta:{ requiresAuth:true }},
  { path:'/Financial/FeesPayment', name:'FeesPayment', component:()=> import('../components/FeesPayment.vue') ,meta:{ requiresAuth:true }},
  { path:'/Financial/TeacherAdvance', name:'TeacherAdvance', component:()=> import('../components/TeacherAdvance.vue') ,meta:{ requiresAuth:true }},
  { path:'/Financial/StaffAdvance', name:'StaffAdvance', component:()=> import('../components/StaffAdvance.vue') ,meta:{ requiresAuth:true }},
  { path:'/Financial/Expenditure', name:'Expenditure', component:()=> import('../components/Expenditure.vue') ,meta:{ requiresAuth:true }},
  { path:'/Financial/FinancialTrash', name:'FinancialTrash', component:()=> import('../components/FinancialTrash.vue') ,meta:{ requiresAuth:true }},
  { path:'/Attendance/TodayClasses/MarkAttendanceDailyFee/:id', name:'MarkAttendanceDailyFee', component:()=> import('../components/MarkAttendanceDailyFee.vue') ,meta:{ requiresAuth:true }},
  { path:'/Attendance/TodayClasses/MarkAttendanceMonthlyFee/:id', name:'MarkAttendanceMonthlyFee', component:()=> import('../components/MarkAttendanceMonthlyFee.vue') ,meta:{ requiresAuth:true }},
  { path:'/Exams/CreateExams', name:'CreateExams', component:()=> import('../components/CreateExams.vue') ,meta:{ requiresAuth:true }},
  { path:'/Exams/ExamDetails', name:'ExamDetails', component:()=> import('../components/ExamDetails.vue') ,meta:{ requiresAuth:true }},
  { path:'/Exams/ExamMarksDetails', name:'ExamMarksDetails', component:()=> import('../components/ExamMarksDetails.vue') ,meta:{ requiresAuth:true }},
  { path:'/Processes/YearEndProcess', name:'YearEndProcess', component:()=> import('../components/YearEndProcess.vue') ,meta:{ requiresAuth:true }},
  { path:'/Processes/BatchEndProcess', name:'BatchEndProcess', component:()=> import('../components/BatchEndProcess.vue') ,meta:{ requiresAuth:true }},
  { path:'/Processes/MonthEndProcess', name:'MonthEndProcess', component:()=> import('../components/MonthEndProcess.vue') ,meta:{ requiresAuth:true }},
  
  { path: '*', name: 'WildCard', component: Home ,meta:{ requiresAuth:true } }
  
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



router.beforeEach((to,from,next) =>{
  const token=localStorage.getItem('userToken');
  if(to.meta.requiresAuth){
    if(token){
      next();
    }else{
      next('/Login');
    }
  }else{
    next();
  }

  if(to.meta.disableIfLoggedIn){
    if(token){
      next('/');
    }else{
      next('/Login');
    }
  }else{
    next();
  }
})




export default router







