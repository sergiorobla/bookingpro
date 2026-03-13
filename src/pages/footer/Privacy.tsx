import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

const Privacy: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className={`max-w-3xl mx-auto p-6 md:p-12 ${isDark ? "text-white prose-invert" : "text-black prose"}`}>
      <h1>Políticas de Privacidad</h1>
      <p>Nos comprometemos a proteger tu privacidad y manejar tus datos de manera segura.</p>

      <h2>1. Datos que recopilamos</h2>
      <p>Recopilamos información que proporcionas al registrarte, como nombre, correo electrónico y contraseña.</p>

      <h2>2. Uso de la información</h2>
      <p>Los datos se usan únicamente para proveer el servicio, enviar notificaciones importantes y mejorar la experiencia del usuario.</p>

      <h2>3. Seguridad</h2>
      <p>Mantenemos medidas de seguridad técnicas y organizativas para proteger tus datos frente a accesos no autorizados.</p>

      <h2>4. Compartir datos</h2>
      <p>No vendemos ni compartimos tus datos con terceros, excepto si es necesario por ley o para operar el servicio.</p>

      <h2>5. Derechos del usuario</h2>
      <p>Puedes acceder, modificar o eliminar tu información personal contactándonos desde la aplicación.</p>

      <p>Última actualización: 13 de marzo de 2026</p>
    </div>
  );
};

export default Privacy;
