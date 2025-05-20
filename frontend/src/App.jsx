import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/users/Home';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import { useAuthContext } from './hooks/useAuthContext';
import CreateBooking from "./pages/users/CreateBooking";
import ViewBooking from './pages/admin/viewBooking';
import ViewDrivers from './pages/admin/ViewDrivers';
import ViewCustomers from './pages/admin/ViewCustomers';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import UpdateBooking from './pages/admin/UpdateBooking';

const App = () => {
  const { user } = useAuthContext();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        <Route path="/signup" element={!user ? <SignUp /> : <Navigate to="/" />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        } />

        <Route path="/createbooking" element={
          <PrivateRoute>
            <CreateBooking />
          </PrivateRoute>
        } />

        <Route path="/viewBooking" element={
          <PrivateRoute>
            <ViewBooking />
          </PrivateRoute>
        } />

        <Route path="/UpdateBooking/:id" element={
          <PrivateRoute>
            <UpdateBooking />
          </PrivateRoute>
        } />

        {/* Admin-only Routes */}
        <Route path="/viewDrivers" element={
          <AdminRoute>
            <ViewDrivers />
          </AdminRoute>
        } />

        <Route path="/UpdateBooking/:id" element={
          <AdminRoute>
            <UpdateBooking />
          </AdminRoute>
        } />

        <Route path="/viewCustomers" element={
          <AdminRoute>
            <ViewCustomers />
          </AdminRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App;
