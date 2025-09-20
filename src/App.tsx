"use client"
import { Navigate, Route, Routes } from 'react-router-dom'

import './App.css'
import { LoginForm } from './pages/auth/login-form'
import { SignUpForm } from './pages/auth/sign-up-form'
import { ForgotPasswordForm } from './components/auth/forgot-password-form'
import { AuthProvider } from './context/AuthContext'
import { ProtectedRoute } from './components/auth/ProtectedRoute'
import Dashboard from './pages/dashboard/dashboard'
import Home from './pages/home/home'
import LibrosMayores from './pages/home/libros-mayores'
import LibrosDiarios from './pages/home/libros-diarios'
import Reportes from './pages/home/reportes'
import { UpdatePasswordForm } from './components/auth/update-password-form'
import LibroDiario from './pages/dashboard/libro-diario'
import CatalogoCuentas from './pages/cuentas/cuentas'


function App() {

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/sign-up" element={<SignUpForm />} />
        <Route path="/forgot-password" element={<ForgotPasswordForm />} />
        <Route path="/update-password" element={<UpdatePasswordForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/libros-mayores" element={<LibrosMayores />} />
        <Route path="/libros-diarios" element={<LibrosDiarios />} />
        <Route path="/reportes" element={<Reportes />} />

        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Sidebar Routes */}
          <Route path="/libro-diario" element={<LibroDiario />} />
          <Route path="/catalogo-cuentas" element={<CatalogoCuentas />} />

          {/* Redirect to dashboard for any other route */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>

      </Routes>
    </AuthProvider>
  );
}

export default App
