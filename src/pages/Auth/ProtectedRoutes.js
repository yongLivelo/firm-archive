import { jsx as _jsx } from "react/jsx-runtime";
import { AuthContext } from "@/App";
import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
const ProtectedRoutes = () => {
    const user = useContext(AuthContext);
    return user ? _jsx(Outlet, {}) : _jsx(Navigate, { to: "/login" });
};
export default ProtectedRoutes;
