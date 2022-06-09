import { useRoutes } from "./Routes";
import React from "react";
import { BrowserRouter } from 'react-router-dom'
import 'materialize-css'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook'
import Navbar from "./stuff/Navbar";
import { useCart } from "./hooks/cart.hook";
import Footer from "./stuff/Footer";

function App() {
  const { token, login, logout, userId } = useAuth()
  const { cart, deleteFromCart, addInCart,deleteAll} = useCart()
  var isAutheficated = !!token 
  const routes = useRoutes(isAutheficated)
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAutheficated,cart,deleteFromCart,addInCart,deleteAll
    }}>
      <BrowserRouter>
      <Navbar />
        <div>
          {routes}
        </div>
        <Footer/>
      </BrowserRouter>
      
    </AuthContext.Provider>
  );
}


export default App;
