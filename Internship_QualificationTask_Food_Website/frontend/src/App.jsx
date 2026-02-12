import { useEffect, useState } from 'react'
import { Routes, Route, Outlet, useNavigate } from 'react-router-dom'
import axios from 'axios'
import './App.css'
import Navbar from './Components/Navbar'
import Homepage from './Pages/Homepage'
import Recipelist from './Pages/Recipelist'
import Recipedetailpage from './Pages/Recipedetailpage'
import Submitdetailpage from './Pages/Submitdetailpage'
import AddtoCard from './Pages/AddtoCard'
import Loginpage from './Pages/Loginpage'
import Registerpage from './Pages/Registerpage'
import { RecipesProvider } from './context/RecipesContext'
import { OrderProvider } from './context/OrderContext'
import OrderConfirmation from './Pages/OrderConfirmation'

// Layout that shows Navbar on all "main" pages
function MainLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

function App() {
  const navigate = useNavigate();

  // Restore auth token on load & setup interceptor
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }

    // Add a response interceptor
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Token expired or invalid
          localStorage.removeItem('token');
          delete axios.defaults.headers.common["Authorization"];
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptor on unmount
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, [navigate]);

  return (
    <RecipesProvider>
      <OrderProvider>
        <Routes>
          {/* Routes that include the Navbar */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Homepage />} />
            {/* Mount Recipelist on /browse to match Navbar/Homepage/Footer links */}
            <Route path="/browse" element={<Recipelist />} />
            {/* Optional alias: keep old /recipelist path working too */}
            <Route path="/recipelist" element={<Recipelist />} />
            {/* Recipe detail page (expects an :id param) */}
            <Route path="/recipe/:id" element={<Recipedetailpage />} />
            {/* Submit recipe page */}
            <Route path="/submit" element={<Submitdetailpage />} />
            {/* Cart page */}
            <Route path="/cart" element={<AddtoCard />} />
            {/* Order Confirmation */}
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Route>

          {/* Auth routes WITHOUT Navbar */}
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
        </Routes>
      </OrderProvider>
    </RecipesProvider>
  )
}

export default App
