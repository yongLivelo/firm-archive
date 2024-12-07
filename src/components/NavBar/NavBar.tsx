import Settings from "./Settings";
import { useLocation } from "react-router-dom";
import {
  Navbar,
  Nav,
  Container,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
  NavLink,
} from "react-bootstrap";

function NavBar() {
  const location = useLocation().pathname;

  const activatedLink = (path: string) => {
    return location === path ? "nav-link active" : "nav-link";
  };

  return (
    <>
      <Navbar expand="lg" className="shadow-sm">
        <Container fluid>
          <NavbarBrand href="/entry"> Firm Archive</NavbarBrand>
          <NavbarToggle aria-controls="basic-navbar-nav" />
          <NavbarCollapse>
            <Nav className="me-auto">
              <NavLink className={activatedLink("/entry")} href="/entry">
                Entry
              </NavLink>
              <NavLink
                className={activatedLink("/statistics")}
                href="/statistics"
              >
                Statistics
              </NavLink>
              <NavLink className={activatedLink("/archive")} href="/archive">
                Archive
              </NavLink>
            </Nav>
            <Nav>
              <Settings />
            </Nav>
          </NavbarCollapse>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
