import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { createContext, useEffect, useState, lazy, Suspense } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebase";

const Login = lazy(() => import("@/pages/Auth/Login"));
const Entry = lazy(() => import("@/pages/Entry"));
const Statistics = lazy(() => import("@/pages/Statistics"));
const Archive = lazy(() => import("@/pages/Archive"));
const NoPage = lazy(() => import("@/pages/Auth/NoPage"));
import ProtectedRoutes from "@/pages/Auth/ProtectedRoutes";
import { Spinner } from "react-bootstrap";

// Contexts
export const AuthContext = createContext<User | null>(null);

function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={user}>
      <BrowserRouter>
        <Suspense fallback={<LoadingComponent />}>
          <Routes>
            <Route index element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/entry" element={<Entry />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/archive" element={<Archive />} />
              <Route path="*" element={<NoPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;

const LoadingComponent = () => {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center flex-column">
      <Spinner
        animation="border"
        style={{ width: "100px", height: "100px" }}
        role="status"
        className="mb-4"
      />
      <h2>Loading Page...</h2>
    </div>
  );
};
