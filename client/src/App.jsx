import React from 'react'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Header from './component/Header'
import ConfirmEmail from './component/ConfirmEmail'
import Forgotpass from './component/User/Forgotpass'
import Resetpass from './component/User/Resetpass'
import AddCarData from './component/AddCarData'
import ProtectedRoute from './component/ProtectedRoute'
import Detailpage from './pages/Detailpage'
import Carlist from './pages/Carlist'

function App() {

  return (
    <>
      <Router >
        <Header/>
        <Routes >
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/' element={<Home/>}/>
          <Route path='/admin' element={<ProtectedRoute Role = 'admin'><Admin/></ProtectedRoute>}/>
          <Route path='/confirmation/:token' element={<ConfirmEmail/>}/>
          <Route path='/account/forget/password' element={<Forgotpass/>}/>
          <Route path='/reset-password/:token' element={<Resetpass/>}/>
          <Route path='/admin/add/cars' element={<ProtectedRoute Role = 'admin'><AddCarData/></ProtectedRoute>}/>
          <Route path='/cardetails/:id' element={<Detailpage/>}/>
          <Route path='/carlist' element={<Carlist/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
