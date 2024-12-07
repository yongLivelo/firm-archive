import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext, useEffect, useState, useContext } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase/firebase";

import Login from "@/pages/Auth/Login";
import Entry from "@/pages/Entry";
import Statistics from "@/pages/Statistics";
import Archive from "@/pages/Archive";
import NoPage from "@/pages/Auth/NoPage";
import ProtectedRoutes from "@/pages/Auth/ProtectedRoutes";
import { Spinner } from "react-bootstrap";

// Contexts
export const AuthContext = createContext<User | null>(null);
export const LoadingContext = createContext<{
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}>({
  isLoading: false,
  setLoading: () => {},
});

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setUserLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (userLoading) {
    return (
      <div className="vh-100 d-flex align-items-center justify-content-center flex-column">
        <Spinner
          animation="border"
          style={{ width: "100px", height: "100px" }}
          role="status"
          className="mb-4"
        />
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={user}>
      <BrowserRouter>
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
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
