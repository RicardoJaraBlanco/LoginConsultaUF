import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/LoginForm";
import bgImage from "../assets/background.jpg";

export default function LoginPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      navigate("/consulta-uf");
    }
  }, [navigate]);

  return (
    <div
      className="h-screen w-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="flex items-center justify-center w-full">
        <LoginForm />
      </div>
    </div>
  );
}
