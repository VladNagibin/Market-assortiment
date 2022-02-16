import { useRoutes } from "./Routes";
import {BrowserRouter} from 'react-router-dom'
function App() { 
  const routes = useRoutes(false)
  return (
    <BrowserRouter>
    <div className="container">
      {routes}
    </div>
    </BrowserRouter>
  );
}


export default App;
