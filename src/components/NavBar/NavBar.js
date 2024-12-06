import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Settings from "./Settings";
import { useLocation, Link } from "react-router-dom";
import { Navbar, Nav, NavLink, Container, NavbarBrand, NavbarToggle, NavbarCollapse, } from "react-bootstrap";
function NavBar() {
    const location = useLocation().pathname;
    const activatedLink = (path) => {
        return location === path ? "nav-link active" : "nav-link";
    };
    return (_jsx(Navbar, { expand: "lg", className: "shadow-sm", children: _jsxs(Container, { fluid: true, children: [_jsx(NavbarBrand, { as: Link, to: "/entry", children: "Firm Archive" }), _jsx(NavbarToggle, { "aria-controls": "basic-navbar-nav" }), _jsxs(NavbarCollapse, { children: [_jsxs(Nav, { className: "me-auto", children: [_jsx(NavLink, { as: Link, to: "/entry", className: activatedLink("/entry"), children: "Entry" }), _jsx(NavLink, { as: Link, to: "/statistics/", className: activatedLink("/statistics"), children: "Statistics" }), _jsx(NavLink, { as: Link, to: "/archive/", className: activatedLink("/archive"), children: "Archive" })] }), _jsx(Nav, { children: _jsx(Settings, {}) })] })] }) }));
}
export default NavBar;
