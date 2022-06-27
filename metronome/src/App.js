import { useContext, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './Menu';
import Home from './Home';
import Settings from './Settings';
import Login from './Login';
import Register from './Register';
import UserContext from "./UserContext";

const App = () => {
  const [username, setUsername] = useState('');
  const updateUserContext = (un) => {
    setUsername(un);
  };

  return (
    <UserContext.Provider value={{username: username, updateUserContext: updateUserContext}}>  
      <BrowserRouter>
      <Menu />
        <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/settings" element={<Settings/>}/>
            <Route exact path="/login" element={<Login/>}/>
            <Route exact path="/register" element={<Register/>}/>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  )
};

export default App;