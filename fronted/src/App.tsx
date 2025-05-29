import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout/Layout';
import { Login } from './pages/Login';
import Dashboard from './pages/Dashboard';
import { Profile } from './pages/Profile';
import { PaymentHistory } from './pages/PaymentHistory';
import { Documents } from './pages/Documents';
import { Applications } from './pages/Applications';
import { Users } from './pages/admin/Users';
import { Settings } from './pages/Settings';
import { Analytics } from './pages/director/Analytics';
import { Doctors } from './pages/Doctors';
import { Appointments } from './pages/Appointments';
import { PatientList } from './components/patients/PatientList';
import { PatientDetails } from './components/patients/PatientDetails';
import { AddPatient } from './components/patients/AddPatient';
import { EditPatient } from './components/patients/EditPatient';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Staff Routes */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          
          {/* Doctor Routes */}
          <Route path="appointments" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <Appointments />
            </ProtectedRoute>
          } />
          <Route path="patients" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <PatientList />
            </ProtectedRoute>
          } />
          <Route path="patients/:id" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <PatientDetails />
            </ProtectedRoute>
          } />
          <Route path="patients/new" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <AddPatient />
            </ProtectedRoute>
          } />
          <Route path="patients/:id/edit" element={
            <ProtectedRoute allowedRoles={['doctor']}>
              <EditPatient />
            </ProtectedRoute>
          } />
          
          {/* Cashier Routes */}
          <Route path="payment-history" element={
            <ProtectedRoute allowedRoles={['cashier']}>
              <PaymentHistory />
            </ProtectedRoute>
          } />
          
          {/* Admin Routes */}
          <Route path="doctors" element={
            <ProtectedRoute allowedRoles={['admin', 'director']}>
              <Doctors />
            </ProtectedRoute>
          } />
          <Route path="admin/users" element={
            <ProtectedRoute allowedRoles={['admin']}>
              <Users />
            </ProtectedRoute>
          } />
          
          {/* Director Routes */}
          <Route path="analytics" element={
            <ProtectedRoute allowedRoles={['director']}>
              <Analytics />
            </ProtectedRoute>
          } />
          
          {/* Common Routes */}
          <Route path="documents" element={<Documents />} />
          <Route path="applications" element={<Applications />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;