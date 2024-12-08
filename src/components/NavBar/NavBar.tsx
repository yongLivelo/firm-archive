import Settings from "./Settings";
import { useLocation, Link } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavLink,
  Container,
  NavbarBrand,
  NavbarToggle,
  NavbarCollapse,
} from "react-bootstrap";

function NavBar() {
  const location = useLocation().pathname;

  const activatedLink = (path: string) => {
    return location === path ? "nav-link active" : "nav-link";
  };

  return (
    <Navbar expand="lg" className="shadow-sm">
      <Container fluid>
        <NavbarBrand as={Link} to="/entry">
          Firm Archive
        </NavbarBrand>
        <NavbarToggle aria-controls="basic-navbar-nav" />
        <NavbarCollapse>
          <Nav className="me-auto">
            <NavLink as={Link} to="/entry" className={activatedLink("/entry")}>
              Entry
            </NavLink>
            <NavLink
              as={Link}
              to="/statistics"
              className={activatedLink("/statistics")}
            >
              Statistics
            </NavLink>
            <NavLink
              as={Link}
              to="/archive"
              className={activatedLink("/archive")}
            >
              Archive
            </NavLink>
          </Nav>
          <Nav>
            <Settings />
          </Nav>
        </NavbarCollapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
