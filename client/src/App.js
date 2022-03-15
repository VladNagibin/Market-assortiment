import { useRoutes } from "./Routes";
import { BrowserRouter } from 'react-router-dom'
import 'materialize-css'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth.hook'
import Navbar from "./stuff/Navbar";

function App() {
  const { token, login, logout, userId } = useAuth()
  var isAutheficated = !!token 
  const routes = useRoutes(isAutheficated)
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, isAutheficated
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
