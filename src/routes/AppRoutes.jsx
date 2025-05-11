import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from '../pages/Auth'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import GoogleAuth from '../pages/GoogleAuth'
import ProtectedRoutes from './ProtectedRoutes'
import Sidebar from '../components/sideBar/Sidebar'
import CreateNewVideo from '../pages/CreateNewVideo'
const AppRoutes = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5'>
      <BrowserRouter>
        <div className='col-span-1'>
          <Sidebar />
        </div>
        <div className='col-span-4 p-12'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/auth' element={<GoogleAuth />} />
            <Route path='/dashboard' element={<ProtectedRoutes><Dashboard /></ProtectedRoutes>} />
            <Route path='/new-video' element={<ProtectedRoutes><CreateNewVideo /></ProtectedRoutes>} />
            <Route path='*' element={<GoogleAuth />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  )
}

export default AppRoutes