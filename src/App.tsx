import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Auth/Login";
import Entry from "@/pages/Entry";
import Statistics from "@/pages/Statistics";
import Archive from "@/pages/Archive";
import NoPage from "@/pages/Auth/NoPage";
import ProtectedRoutes from "@/pages/Auth/ProtectedRoutes";
import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "./firebase/firebase";

export const AuthContext = createContext<User | null>(null);

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsFetching(false);
    });
    return () => unsubscribe();
  }, []);

  if (isFetching) {
    return (
      <h2 className="vh-100 d-flex align-items-center justify-content-center">
        Loading...
      </h2>
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
