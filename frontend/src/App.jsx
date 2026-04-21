import { useState } from 'react'
import AdminLogin from './features/auth/admin/Login'
import AdminRegister from './features/auth/admin/Register'
import StudentLogin from './features/auth/student/Login'
import StudentRegister from './features/auth/student/Register'
import TeacherRegister from './features/auth/teacher/Register'
import TeacherLogin from './features/auth/teacher/Login'

import DashboardPage from './features/dashboard/Dashborad';

// trade protal
import AddTrade from './features/trade/AddTrade'
import GetTradeList from "./features/trade/TradeList";
import UpdateTrade from "./features/trade/UpdateTrade";

// department portal
import AddDepartment from './features/department/AddDepartment'
import DepartmentList from './features/department/DepartmentList'
import UpdateDepartment from './features/department/UpdateDepartment'

// marks portal
import AddMarks from './features/marks/AddMarks'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
       <BrowserRouter>
           <Routes>
               <Route path='/admin/login' element={<AdminLogin />}/>
               <Route path='/admin/register' element={<AdminRegister />}/>


               <Route path='/student/login' element={<StudentLogin />}/>
               <Route path='/student/register' element={<StudentRegister />}/>

               <Route path='/teacher/register' element={<TeacherRegister />}/>
               <Route path='/teacher/login' element={<TeacherLogin />}/>

               <Route path='/' element={<DashboardPage />}/>

               {/* Trade routes */}
               <Route path='/trade/add' element={<AddTrade />} />
               <Route path='/trade/list' element={<GetTradeList />} />
               <Route path='/trade/update/:_id' element={<UpdateTrade />} />

               {/* Department routes */}
               <Route path='/department/add' element={<AddDepartment />}/>
               <Route path='/department/list' element={<DepartmentList />}/>
               <Route path='/department/update/:_id' element={<UpdateDepartment />}/>

               {/* Marks routes */}
               <Route path='/marks/add' element={<AddMarks /> } />
           </Routes>
       </BrowserRouter>
  )
}

export default App
