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
           </Routes>
       </BrowserRouter>
  )
}

export default App
