import { useRoutes } from "./Routes";
import {BrowserRouter} from 'react-router-dom'
import 'materialize-css'
function App() { 
  const routes = useRoutes(true)
  return (
    <BrowserRouter>
    <div className="container">
      {routes}
    </div>
    </BrowserRouter>
  );
}


export default App;
