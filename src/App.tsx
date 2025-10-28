import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AppLayout from "./AppLayout";
import ConsultaUfPage from "./pages/ConsultaUfPage";


export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<AppLayout />}>
        <Route path="/consulta-uf" element={<ConsultaUfPage />} />
      </Route>
    </Routes>
  );
}
