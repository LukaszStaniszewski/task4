import {Route, Routes} from 'react-router-dom'
import Authentication from './routes/authentication/authentication.component';
import UserManagement from './routes/user-management/userManagement.component';
import Navbar from "./components/navbar/navbar.component";

function App() { 
  return (
    <div className="w-screen h-screen overflow-hidden">
      <Routes>
        <Route path="/" element={<Navbar/>}>
          <Route index element={<Authentication/>} />
            <Route path='/users' element={<UserManagement/>}/>
          </Route>
      </Routes>
    </div>
  );
}

export default App;
