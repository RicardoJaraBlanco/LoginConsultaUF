import { Outlet } from "react-router-dom";
import Navbar from "./components/NavBar";


export default function AppLayout() {
  return (
    <>
      <Navbar />
      <div className=""> 
        <Outlet /> 
      </div>
    </>
  );
}
