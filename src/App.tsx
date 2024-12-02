import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@/pages/Auth/Login";
import Entry from "@/pages/Entry";
import Statistics from "@/pages/Statistics";
import Archive from "@/pages/Archive";
import NoPage from "@/pages/Auth/NoPage";
import { createContext, useState } from "react";
import { Api } from "datatables.net-bs5";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Login />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/entry" element={<Entry />}></Route>
          <Route path="/statistics" element={<Statistics />}></Route>
          <Route path="/archive" element={<Archive />}></Route>
          <Route path="*" element={<NoPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
