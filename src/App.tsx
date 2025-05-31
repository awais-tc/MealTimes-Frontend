import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CurrencyProvider } from './contexts/CurrencyContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Support from './pages/Support';

// Protected Pages
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/UserManagement';
import Reports from './pages/admin/Reports';
import FeedbackManagement from './pages/admin/FeedbackManagement';
import PlatformPerformance from './pages/admin/PlatformPerformance';

import CorporateDashboard from './pages/corporate/Dashboard';
import CorporateAccount from './pages/CorporateAccount';
import CorporateCheckout from './pages/CorporateCheckout';

import EmployeeDashboard from './pages/employee/Dashboard';
import EmployeeCheckout from './pages/employee/Checkout';
import DietaryPreferences from './pages/employee/DietaryPreferences';
import Feedback from './pages/employee/Feedback';
import Meals from './pages/Meals';
import OrderTracking from './pages/OrderTracking';

import ChefDashboard from './pages/chef/Dashboard';
import ChefProfile from './pages/chef/Profile';
import UploadMeal from './pages/chef/UploadMeal';
import OrderManagement from './pages/chef/OrderManagement';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return children;
};

// Role-specific dashboard redirect
const DashboardRedirect = () => {
  const { user } = useAuth();
  
  switch (user?.role) {
    case 'admin':
      return <Navigate to="/admin/dashboard" />;
    case 'corporate':
      return <Navigate to="/corporate/dashboard" />;
    case 'employee':
      return <Navigate to="/employee/dashboard" />;
    case 'chef':
      return <Navigate to="/chef/dashboard" />;
    default:
      return <Navigate to="/" />;
  }
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <CurrencyProvider>
          <Router>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Navbar />
              <main className="flex-grow">
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/support" element={<Support />} />

                  {/* Dashboard Redirect */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['admin', 'corporate', 'employee', 'chef']}>
                        <DashboardRedirect />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Admin Routes */}
                  <Route 
                    path="/admin/dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/users" 
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <UserManagement />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/reports" 
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <Reports />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/feedback" 
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <FeedbackManagement />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/performance" 
                    element={
                      <ProtectedRoute allowedRoles={['admin']}>
                        <PlatformPerformance />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Corporate Routes */}
                  <Route 
                    path="/corporate/dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['corporate']}>
                        <CorporateDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/corporate/account" 
                    element={
                      <ProtectedRoute allowedRoles={['corporate']}>
                        <CorporateAccount />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/corporate/checkout/:planId" 
                    element={
                      <ProtectedRoute allowedRoles={['corporate']}>
                        <CorporateCheckout />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Employee Routes */}
                  <Route 
                    path="/employee/dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['employee']}>
                        <EmployeeDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/employee/meals" 
                    element={
                      <ProtectedRoute allowedRoles={['employee']}>
                        <Meals />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/employee/checkout/:mealId" 
                    element={
                      <ProtectedRoute allowedRoles={['employee']}>
                        <EmployeeCheckout />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/employee/orders/:orderId" 
                    element={
                      <ProtectedRoute allowedRoles={['employee']}>
                        <OrderTracking />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/employee/preferences" 
                    element={
                      <ProtectedRoute allowedRoles={['employee']}>
                        <DietaryPreferences />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/employee/feedback" 
                    element={
                      <ProtectedRoute allowedRoles={['employee']}>
                        <Feedback />
                      </ProtectedRoute>
                    } 
                  />

                  {/* Chef Routes */}
                  <Route 
                    path="/chef/dashboard" 
                    element={
                      <ProtectedRoute allowedRoles={['chef']}>
                        <ChefDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/chef/profile" 
                    element={
                      <ProtectedRoute allowedRoles={['chef']}>
                        <ChefProfile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/chef/upload-meal" 
                    element={
                      <ProtectedRoute allowedRoles={['chef']}>
                        <UploadMeal />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/chef/orders" 
                    element={
                      <ProtectedRoute allowedRoles={['chef']}>
                        <OrderManagement />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CurrencyProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;