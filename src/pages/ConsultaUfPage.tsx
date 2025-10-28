import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";
import bgImage from "../assets/background.jpg";
import Popup from "../components/PopUp";
import { obtenerUfDia, obtenerUfRango } from "../api/ConsultaUf";


export default function ConsultaUfPage() {
    const navigate = useNavigate();

    const [fecha, setFecha] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const [uf, setUf] = useState<number | null>(null);
    const [ufData, setUfData] = useState<{ fecha: string; valor: number }[]>([]);
    const [loading, setLoading] = useState(false);
    const [popupOpen, setPopupOpen] = useState(false);
    const [popupMsg, setPopupMsg] = useState("");
    const [modo, setModo] = useState<"dia" | "rango">("dia");

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) navigate("/");
    }, [navigate]);

    const formatearFecha = (f: string) => {
        const [year, month, day] = f.split("-");
        return `${day}-${month}-${year}`;
    };

    const showPopup = (mensaje: string) => {
        setPopupMsg(mensaje);
        setPopupOpen(true);
    };

    // Consulta UF por día
    const handleConsultaDia = async () => {
        setLoading(true);
        setUf(null);
        try {
            const fechaFormateada = formatearFecha(fecha);
            const valor = await obtenerUfDia(fechaFormateada);
            setUf(valor);
        } catch (err: any) {
            showPopup(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Consulta UF por rango (multi-año)
    const handleConsultaRango = async () => {
        setLoading(true);
        setUfData([]);
        try {
            const datos = await obtenerUfRango(new Date(fechaInicio), new Date(fechaFin));
            setUfData(datos);
        } catch (err: any) {
            showPopup(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (

        <div
            className="min-h-screen w-full bg-cover bg-center p-6"
            style={{ backgroundImage: `url(${bgImage})` }}
        >
            {/* Contenedor centrado */}
            <div className="mt-20 flex items-center justify-center">
                <div className="bg-white/90 backdrop-blur-lg p-8 rounded-3xl shadow-2xl max-w-3xl w-full">
                    <h1 className="uf-title">
                        Consulta de UF
                    </h1>

                    {/* Selector de modo */}
                    <div className="flex justify-center gap-4 mb-6">
                        <button
                            onClick={() => setModo("dia")}
                            className={`px-4 py-2 rounded-xl font-semibold transition ${modo === "dia"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            UF por Día
                        </button>
                        <button
                            onClick={() => setModo("rango")}
                            className={`px-4 py-2 rounded-xl font-semibold transition ${modo === "rango"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                }`}
                        >
                            UF por Rango
                        </button>
                    </div>

                    {/* --- MODO POR DÍA --- */}
                    {modo === "dia" && (
                        <div className="flex flex-col gap-4">
                            <label className="text-gray-700 font-medium">Selecciona una fecha:</label>
<input
    type="date"
    value={fecha}
    onChange={(e) => setFecha(e.target.value)}
    className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-400 outline-none date-input"
/>
                            <button
                                onClick={handleConsultaDia}
                                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition"
                            >
                                Consultar
                            </button>

                            {loading && (
                                <div className="flex justify-center py-4">
                                    <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}

                            {uf !== null && !loading && (
                                <div className="bg-blue-50 p-6 rounded-2xl shadow-md text-center">
                                    <p className="text-lg text-blue-900">
                                        El valor de la UF para el{" "}
                                        <span className="font-bold">{formatearFecha(fecha)}</span> es:
                                    </p>

                                    <p className="text-3xl font-bold mt-2 text-blue-800">
                                        ${uf.toLocaleString("es-CL", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </p>
                                </div>
                            )}

                        </div>
                    )}

                    {/* --- MODO POR RANGO --- */}
                    {modo === "rango" && (
                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="text-gray-700 font-medium">Fecha inicio:</label>
<input
    type="date"
    value={fechaInicio}
    onChange={(e) => setFechaInicio(e.target.value)}
    className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-400 outline-none date-input"
/>
                                </div>
                                <div>
                                    <label className="text-gray-700 font-medium">Fecha fin:</label>
<input
    type="date"
    value={fechaFin}
    onChange={(e) => setFechaFin(e.target.value)}
    className="border border-gray-300 p-3 rounded-xl w-full focus:ring-2 focus:ring-blue-400 outline-none date-input"
/>
                                </div>
                            </div>

                            <button
                                onClick={handleConsultaRango}
                                className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-blue-900 transition"
                            >
                                Consultar rango
                            </button>

                            {loading && (
                                <div className="flex justify-center py-4">
                                    <div className="h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            )}

                            {ufData.length > 0 && !loading && (
                                <div className="mt-6">
                                    <h2 className="text-xl font-semibold text-center text-blue-900 mb-4">
                                        Evolución de la UF
                                    </h2>
                                    <ResponsiveContainer width="100%" height={350}>
                                        <LineChart data={ufData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="fecha" tick={{ fontSize: 10 }} interval="preserveStartEnd" />
                                            <YAxis domain={["auto", "auto"]} />
                                            <Tooltip formatter={(v) => `$${v.toLocaleString("es-CL")}`} />
                                            <Line
                                                type="monotone"
                                                dataKey="valor"
                                                stroke="#2563eb"
                                                strokeWidth={2}
                                                dot={false}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Popup */}
                <Popup
                    isOpen={popupOpen}
                    onClose={() => setPopupOpen(false)}
                    title="Atención"
                    actions={[{ label: "Cerrar", onClick: () => setPopupOpen(false) }]}
                >
                    <p className="text-gray-800">{popupMsg}</p>
                </Popup>
            </div>
        </div>

    );
}
