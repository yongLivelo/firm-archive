import { BrowserRouter, Routes, Route } from "react-router-dom";
import Entry from "./pages/entry/Entry";
import Statistics from "./pages/statistics/Statistics";
import Archive from "./pages/archive/Archive";
import Authentication from "./pages/authentication/Authentication";
import NoPage from "./pages/NoPage";
import { createContext, useState } from "react";
import { Api } from "datatables.net-bs5";

interface TableContextType {
  data: Api | undefined | null;
  setData: (table: Api | undefined | null) => void;
}

export const TableContext = createContext<TableContextType | undefined>(
  undefined
);
function App() {
  const [data, setData] = useState<Api | undefined | null>(undefined);
  return (
    <>
      <TableContext.Provider value={{ data, setData }}>
        <BrowserRouter>
          <Routes>
            <Route index element={<Authentication />}></Route>
            <Route path="/authentication" element={<Authentication />}></Route>
            <Route path="/entry" element={<Entry />}></Route>
            <Route path="/statistics" element={<Statistics />}></Route>
            <Route path="/archive" element={<Archive />}></Route>
            <Route path="*" element={<NoPage />}></Route>
          </Routes>
        </BrowserRouter>
      </TableContext.Provider>
    </>
  );
}

export default App;
