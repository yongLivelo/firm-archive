import Settings from "./Settings";
import { useLocation } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";

function Navigation() {
  const location = useLocation().pathname;

  const activatedLink = (path: string) => {
    return location === path ? "nav-link active" : "nav-link";
  };

  return (
    <>
      <Navbar expand="lg" className="shadow-sm">
        <Container fluid>
          <Navbar.Brand href="/entry"> Firm Archive</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Nav className="me-auto">
              <Nav.Link className={activatedLink("/entry")} href="/entry">
                Entry
              </Nav.Link>
              <Nav.Link
                className={activatedLink("/statistics")}
                href="/statistics"
              >
                Statistics
              </Nav.Link>
              <Nav.Link className={activatedLink("/archive")} href="/archive">
                Archive
              </Nav.Link>
            </Nav>
            <Nav>
              <Settings />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navigation;
