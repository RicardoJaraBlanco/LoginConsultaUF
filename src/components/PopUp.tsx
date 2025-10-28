import React from "react";
import Button from "./Button"; // Importa tu componente Button

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  actions?: { label: string; onClick: () => void; variant?: "blue" | "green" | "red" | "gray"; size?: "sm" | "md" | "lg" }[];
}

export default function Popup({ isOpen, onClose, title, children, actions }: PopupProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        {/* Botón de cerrar */}
        <div className="absolute top-3 right-3">
          <Button
            onClick={onClose}
            variant="red"
            size="sm"
          >
            ✕
          </Button>
        </div>

        {/* Título */}
        {title && <h2 className="text-xl font-semibold mb-4 text-gray-900">{title}</h2>}

        {/* Contenido */}
        <div className="mb-4">{children}</div>

        {/* Botones de acción */}
        {actions && actions.length > 0 && (
          <div className="flex justify-end gap-3">
            {actions.map((action, idx) => (
              <Button
                key={idx}
                onClick={action.onClick}
                variant={action.variant || "blue"}
                size={action.size || "md"}
              >
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
