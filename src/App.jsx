import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AuthenticatedUserLayout from './layout/AuthenticatedUserLayout'
import NotFound from './pages/NotFound'
import Dashboard from './pages/Dashboard'
import Records from './pages/Records'
import Settings from './pages/Settings'
import { Toaster } from 'sonner';

function App() {

  return (
    <BrowserRouter>
      <Toaster richColors position='top-right' />
      <Routes>  
        {/* 1. Bigyan ng sariling path ang Login at Signup */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 2. Ang "/" ay ituturo na natin sa Dashboard sa loob ng Protected Layout */}
        <Route element={<AuthenticatedUserLayout />}>
          <Route path="/" element={<Dashboard />} /> 
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/my-plants" element={<Records />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* 3. Catch-all para sa mga maling URL */}
        <Route path="/*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
