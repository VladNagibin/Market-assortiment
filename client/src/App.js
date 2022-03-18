import { useRoutes } from "./Routes";
import { BrowserRouter } from 'react-router-dom'
import 'materialize-css'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook'
import Navbar from "./stuff/Navbar";
import { useCart } from "./hooks/cart.hook";

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
      {<Navbar /> }
        <div>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}


export default App;
