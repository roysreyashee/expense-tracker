import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Layout from "./components/layouts/Layout";
import Transactions from "./pages/Transactions";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import AddTransactions from "./pages/AddTransaction";

export default function() {
  return(
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path='/transactions' element={<Transactions />} />
          <Route path='/add' element={<AddTransactions/>} />
          <Route path='/reports' element={<Reports />} />
          <Route path='/settings' element={<Settings />} />
      </Routes>
    </Layout>
    </BrowserRouter>
  )
}