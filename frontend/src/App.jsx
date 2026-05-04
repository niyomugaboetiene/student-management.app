import { useState } from 'react'
import AdminLogin from './features/auth/admin/Login'
import AdminRegister from './features/auth/admin/Register'

// student portal
import StudentLogin from './features/auth/student/Login'
import StudentRegister from './features/auth/student/Register'
import GetStudentList from './features/students/StudentLIst'
import UpdateStudent from './features/students/UpdateStudent'

// teacher portal
import TeacherRegister from './features/auth/teacher/Register'
import TeacherLogin from './features/auth/teacher/Login'
import TeacherList from './features/teachers/TeacherList'
import UpdateTeacher from './features/teachers/UpdateTeacher'

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
import MarksList from './features/marks/MarksList'
import UpdateMarks from './features/marks/UpdateMarks'

// subject portal
import AddSubject from './features/subject/AddSubject'
import GetSubjectList from "./features/subject/SubjectList"
import UpdateSubject from './features/subject/UpdateSubject'

// Class portal
import ClassList from './features/class/ClassList'
import AddClass from './features/class/AddClass'
import UpdateClass from './features/class/UpdateClass'

//Attendance portal
import AddAttendance from './features/attendance/AddAttendance' 
import AttendanceList from './features/attendance/AttendanceList'
import HandleGetStudentAttendance from './features/attendance/AttendanceById'

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import StudentMarks from './features/students/StudentMarks'

function App() {

  return (
       <BrowserRouter>
           <Routes>
               <Route path='/admin/login' element={<AdminLogin />}/>
               <Route path='/admin/register' element={<AdminRegister />}/>

               {/* Student route */}
               <Route path='/student/login' element={<StudentLogin />}/>
               <Route path='/student/register' element={<StudentRegister />}/>
               <Route path='/student/list' element={<GetStudentList />}/>
               <Route path='/student/update/:_id' element={<UpdateStudent />}/>
               <Route path='/student/myMarks' element={<StudentMarks /> }/>

               {/* Teacher routes */}
               <Route path='/teacher/register' element={<TeacherRegister />}/>
               <Route path='/teacher/login' element={<TeacherLogin />}/>
               <Route path='/teacher/list' element={<TeacherList />}/>
               <Route path='/teacher/update/:_id' element={<UpdateTeacher />}/>

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
               <Route path='/marks/list' element={<MarksList /> } />
               <Route path='/marks/update/:_id' element={<UpdateMarks /> } />

               {/* Subject routes */}
               <Route path='/subject/add' element={<AddSubject />} />
               <Route path='/subject/list' element={<GetSubjectList />} />
               <Route path='/subject/update/:_id' element={<UpdateSubject />} />

               {/* Class route */}
               <Route path='/class/add' element={<AddClass />}/>
               <Route path='/class/list' element={<ClassList />}/>
               <Route path='/class/update/:_id' element={<UpdateClass />}/>

               {/* Attendance route */}
               <Route path='/attendance/add' element={<AddAttendance />} />
               <Route path='/attendance/list' element={<AttendanceList />} />
               <Route path='/attendance/view/:_id' element={<HandleGetStudentAttendance />} />
           </Routes>
       </BrowserRouter>
  )
}

export default App
