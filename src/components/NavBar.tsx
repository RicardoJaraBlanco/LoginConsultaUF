// src/components/Navbar.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setUsername(parsed.username);
      } catch {
        localStorage.removeItem("user");
        navigate("/");
      }
    } else {
      setUsername(null);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  if (!username) return null;

  return (
    <nav className="w-full bg-gradient-to-r from-[rgb(42,35,35)] to-[rgb(62,52,52)] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo/Brand */}
        <div className="flex items-center space-x-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <span className="text-xl font-bold hidden sm:block">Mi App</span>
        </div>

        {/* User Section */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <div className="w-8 h-8 bg-[rgb(62,52,52)] rounded-full flex items-center justify-center text-sm font-bold">
              {username.charAt(0).toUpperCase()}
            </div>
            <span className="font-medium">
              Hola, <span className="font-semibold">{username}</span>
            </span>
          </div>

          <button onClick={handleLogout} className="logout-btn px-5 py-2.5 rounded-lg flex items-center space-x-2">
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <span className="hidden sm:inline">Cerrar sesión</span>
            <span className="sm:hidden">Salir</span>
          </button>

        </div>
      </div>
    </nav>



  );
}