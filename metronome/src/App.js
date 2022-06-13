import { Outlet, Link } from "react-router-dom";

const App = () => {
  return (
    <>
    <div className='menu-button'></div>
    <div className='menu-invisible'>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/settings">Settings</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
        </ul>
      </nav>
    </div>

      <Outlet />
    </>
  )
};

export default App;