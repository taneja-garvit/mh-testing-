import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import ContactPage from './pages/ContactPage';
import SearchPage from './pages/SearchPage';
import PgDetailsPage from './pages/PgDetailsPage';
// import ComplaintPortal from './pages/ComplaintPortal';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminPgList from './pages/admin/AdminPgList';
import AdminAddPg from './pages/admin/AdminAddPg';
import AdminEditPg from './pages/admin/AdminEditPg';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';
// import AdminUsersPage from './pages/admin/AdminUsersPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/pg/:id" element={<PgDetailsPage />} />
        {/* <Route path="/complaints" element={<ComplaintPortal />} /> */}
        <Route path="/auth" element={<AuthPage />} />

        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/pg-list" element={
          <ProtectedRoute>
            <AdminPgList />
          </ProtectedRoute>
        } />
        <Route path="/admin/add-pg" element={
          <ProtectedRoute>
            <AdminAddPg />
          </ProtectedRoute>
        } />
        <Route path="/admin/edit-pg/:id" element={
          <ProtectedRoute>
            <AdminEditPg />
          </ProtectedRoute>
        } />
          {/* <Route path="/admin/users" element={
          <ProtectedRoute>
            <AdminUsersPage />
          </ProtectedRoute>
        } /> */}
      </Routes>
    </Router>
  );
}

export default App;