import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = ({ user }: any) => {
  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
