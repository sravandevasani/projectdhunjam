import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/login/LoginPage";
import AdminDashboard from "./components/adminDashboard/AdminDashboard";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
