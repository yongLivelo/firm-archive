import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  const user = true;

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
