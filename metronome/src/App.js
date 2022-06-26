import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './Menu';
import Home from './Home';
import Settings from './Settings';
import Login from './Login';
import Register from './Register';

const App = () => {
  return (
    <>  
      <BrowserRouter>
      <Menu />
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/settings" element={<Settings/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
      
    </>
  )
};

export default App;