import {NavLink} from "react-router-dom";

function Navbar({status}){
  return(
    <div className="container">
      <div className="row">
        <div className="col-12">
          <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
              <span className="navbar-brand">Kroviniai</span>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
             </button>
              <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                <NavLink to="/" end className={({isActive}) => isActive ? 'nav-item nav-link active' : "nav-item nav-link"}>Pradžia</NavLink>
                {status === 3 ?  <NavLink to="/containers" className={({isActive}) => isActive ? 'nav-item nav-link active' : "nav-item nav-link"}>Konteineriai</NavLink> : null}
                {status === 3 ?  <NavLink to="/boxes" className={({isActive}) => isActive ? 'nav-item nav-link active' : "nav-item nav-link"}>Dėžės</NavLink> : null} 
                {status === 1 ? <NavLink to="/login" className="nav-link">Login</NavLink> : null}
                {status !== 1 ? <NavLink to="/logout" className="nav-link">Logout</NavLink> : null}
                </div>
              </div>
              </div>
          </nav>
        </div>
      </div>

    </div>
  )
}

export default Navbar;