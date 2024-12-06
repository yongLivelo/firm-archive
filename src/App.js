import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState, lazy, Suspense } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase/firebase";
const Login = lazy(() => import("@/pages/Auth/Login"));
const Entry = lazy(() => import("@/pages/Entry"));
const Statistics = lazy(() => import("@/pages/Statistics"));
const Archive = lazy(() => import("@/pages/Archive"));
const NoPage = lazy(() => import("@/pages/Auth/NoPage"));
import ProtectedRoutes from "@/pages/Auth/ProtectedRoutes";
import { Spinner } from "react-bootstrap";
// Contexts
export const AuthContext = createContext(null);
function App() {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            setUserLoading(false);
        });
        return () => unsubscribe();
    }, []);
    return (_jsx(AuthContext.Provider, { value: user, children: _jsx(BrowserRouter, { children: _jsx(Suspense, { fallback: _jsx(LoadingComponent, {}), children: _jsxs(Routes, { children: [_jsx(Route, { index: true, element: _jsx(Login, {}) }), _jsx(Route, { path: "/login", element: _jsx(Login, {}) }), _jsxs(Route, { element: _jsx(ProtectedRoutes, {}), children: [_jsx(Route, { path: "/entry", element: _jsx(Entry, {}) }), _jsx(Route, { path: "/statistics", element: _jsx(Statistics, {}) }), _jsx(Route, { path: "/archive", element: _jsx(Archive, {}) }), _jsx(Route, { path: "*", element: _jsx(NoPage, {}) })] })] }) }) }) }));
}
export default App;
const LoadingComponent = () => {
    return (_jsxs("div", { className: "vh-100 d-flex align-items-center justify-content-center flex-column", children: [_jsx(Spinner, { animation: "border", style: { width: "100px", height: "100px" }, role: "status", className: "mb-4" }), _jsx("h2", { children: "Loading Page..." })] }));
};
