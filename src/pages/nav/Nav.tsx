import Settings from "./Settings";
import { useLocation } from "react-router-dom";

function Nav() {
  const location = useLocation().pathname;

  const activatedLink = (path: string) => {
    return location === path ? "nav-link active" : "nav-link";
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand" href="/entry">
            Firm Archive
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className={activatedLink("/entry")}
                  aria-current="page"
                  href="/entry"
                >
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className={activatedLink("/statistics")} href="/statistics">
                  Statistics
                </a>
              </li>
              <li className="nav-item">
                <a className={activatedLink("/archive")} href="/archive">
                  Archive
                </a>
              </li>
            </ul>
            <div className="navbar-nav mb-2 mb-lg-0">
              <Settings />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Nav;
