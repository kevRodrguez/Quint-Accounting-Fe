"use client"
import { Route, Routes } from 'react-router-dom'

import './App.css'
import Home from './home'
import { LoginForm } from './components/auth/login-form'
import { SignUpForm } from './components/auth/sign-up-form'
import { ForgotPasswordForm } from './components/auth/forgot-password-form'

function App() {


  //defune las rutas de la app
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/sign-up" element={<SignUpForm />} />
      <Route path="/forgot-password" element={<ForgotPasswordForm />} />
      <Route path="/update-password" element={<SignUpForm />} />
    </Routes>
  )
}

export default App
