import { Outlet } from "react-router-dom";
import './Navbar.css'

const Navbar = () => {
  return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-warning font-weight-bold">
          <div className="container">
          
            <a className="navbar-brand text-dark " href="/"><div className="logo-container"> 
                <img 
                    src={"./WOPtransparent.png"} 
                    className="logo img-fluid"
                    alt="Logo"
                    width="100" height="100"
                /> 
            </div></a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >

              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a className="nav-link text-dark" href="/">Home</a>
                </li>
                
                {/* {localStorage.getItem('is_admin') === 'true'? */}
                <>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="/companies">Companies</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="/workorders">Work Orders</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-dark" href="/users">Users</a>
                </li>
                </>
                {/* :<>
                </>} */}

              </ul>
              {localStorage.getItem('username')!=='null'?
              <span className="navbar-text text-danger">
                {localStorage.getItem('username')}
              </span>:''}
              
            </div>
          </div>
        </nav>
        <Outlet />
        
        </>
      );
    };

      export default Navbar;