import { useRoutes } from "./Routes";
import { BrowserRouter } from 'react-router-dom'
import 'materialize-css'
import { AuthContext } from './context/AuthContext'
import {useAuth} from './hooks/auth.hook'
function App() {
  const { token, login, logout, userId, ready } = useAuth()
  var isAutheficated = !!token
  console.log(isAutheficated)
  const routes = useRoutes(isAutheficated)
  return (
    <AuthContext.Provider value={{
      token, login, logout, userId, ready
    }}>
      <BrowserRouter>
        <div className="container">
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}


export default App;
