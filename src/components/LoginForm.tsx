import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Popup from "../components/PopUp"; 
import { loginMock } from "../api/Auth";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMsg, setPopupMsg] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  setLoading(true);

  const result = await loginMock(username, password);

  if (result.success && result.username) {
    localStorage.setItem("user", JSON.stringify({ username: result.username }));
    setUsername("");
    setPassword("");
    navigate("/consulta-uf");
  } else {
    setPopupMsg(result.message || "Error desconocido");
    setPopupOpen(true);
  }

  setLoading(false);
};

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white/95 backdrop-blur-lg p-8 md:p-10 rounded-2xl shadow-2xl max-w-md w-full border border-white/20"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Bienvenido</h2>
          <p className="text-gray-500 text-sm mt-2">
            Ingresa tus credenciales para continuar
          </p>
        </div>

        {/* Inputs */}
        <div className="space-y-5">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all outline-none"
              required
            />
          </div>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 border border-gray-200 rounded-xl bg-white/50 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all outline-none"
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="mt-8">
          {loading ? (
            <div className="flex justify-center items-center py-3">
              <svg
                className="animate-spin h-8 w-8 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            </div>
          ) : (
            <button
              type="submit"
              className="group w-full py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center space-x-2"
            >
              <span>Entrar</span>
              <svg
                className="w-5 h-5 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </button>
          )}
        </div>
      </form>

      {/* Popup de error */}
      <Popup
        isOpen={popupOpen}
        onClose={() => setPopupOpen(false)}
        title="Error de inicio de sesión"
        actions={[{ label: "Cerrar", onClick: () => setPopupOpen(false) }]}
      >
        <p className="text-gray-800">{popupMsg}</p>
      </Popup>
    </>
  );
}
