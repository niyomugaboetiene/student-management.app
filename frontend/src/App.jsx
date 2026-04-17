import { useState } from 'react'
import AdminLogin from './features/auth/admin/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
function App() {

  return (
       <BrowserRouter>
           <Routes>
               <Route path='/admin/login' element={<AdminLogin />}/>
           </Routes>
       </BrowserRouter>
  )
}

export default App
