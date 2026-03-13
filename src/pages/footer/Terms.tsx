import React from "react";
import { useTheme } from "@/contexts/ThemeContext";
const Terms: React.FC = () => {
  const { isDark } = useTheme();
  return (
    <div className={`max-w-3xl mx-auto p-6 md:p-12 ${isDark ? "text-white prose-invert" : "text-black prose"}`}>
      <h1>Términos y Condiciones</h1>
      <p>Bienvenido a nuestra aplicación. Al usar este servicio, aceptas los siguientes términos:</p>

      <h2>1. Uso del servicio</h2>
      <p>Debes utilizar la aplicación únicamente para fines legales y conforme a nuestras reglas internas.</p>

      <h2>2. Cuenta de usuario</h2>
      <p>Tu cuenta es personal e intransferible. No compartas tus credenciales con terceros.</p>

      <h2>3. Propiedad intelectual</h2>
      <p>Todo el contenido y software de la aplicación está protegido por derechos de autor y otras leyes de propiedad intelectual.</p>

      <h2>4. Limitación de responsabilidad</h2>
      <p>No nos hacemos responsables de daños directos o indirectos derivados del uso del servicio.</p>

      <h2>5. Modificaciones</h2>
      <p>Podemos modificar los términos en cualquier momento, notificando a los usuarios mediante la aplicación o correo electrónico.</p>

      <p>Última actualización: 13 de marzo de 2026</p>
    </div>
  );
};

export default Terms;
