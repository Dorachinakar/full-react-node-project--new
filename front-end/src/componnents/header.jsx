import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";
function Header() {
  const { user } = useAuth();
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="column">
            <nav
              className="navbar navbar-expand-md navbar-dark bg-dark"
              aria-label="Fourth navbar example"
            >
              <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                  i <i className="bi bi-card-checklist"></i> card
                </Link>
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarsExample04"
                  aria-controls="navbarsExample04"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample04">
                  <ul className="navbar-nav me-auto mb-2 mb-md-0">
                    <li className="nav-item">
                      <NavLink className="nav-link" to="/about">
                        About
                      </NavLink>
                    </li>
                    {user?.isVip && (
                      <li className="nav-item">
                        <NavLink to="card/mycards" className="nav-link">
                          My Cards
                        </NavLink>
                      </li>
                    )}
                  </ul>
                </div>

                <div className="collapse navbar-collapse" id="navbarsExample04">
                  <ul className="navbar-nav ms-auto mb-2 mb-md-0">
                    {user ? (
                      <li className="nav-item">
                        <NavLink to="signout" className="nav-link">
                          Sign Out
                        </NavLink>
                      </li>
                    ) : (
                      <>
                        <li className="nav-item">
                          <NavLink to="signin" className="nav-link">
                            Sign In
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="signup" className="nav-link">
                            Sign Up
                          </NavLink>
                        </li>
                        <li className="nav-item">
                          <NavLink to="signupBiz" className="nav-link">
                            Sign Up Business
                          </NavLink>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
