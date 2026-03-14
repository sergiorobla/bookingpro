// src/pages/Register.tsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import NameInput from "@/components/ui/NameInput";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { capitalizeWords } from "@/utils/CapitalizeWords";

const Register = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<{ nombre?: string; email?: string; password?: string; general?: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Formatear inputs
    const formattedNombre = capitalizeWords(nombre.trim());
    const formattedEmail = email.trim();

    if (password !== confirmPassword) {
      setError({ password: "Las contraseñas no coinciden" });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: formattedNombre, email: formattedEmail, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error al registrar");
      }

      console.log("Registro exitoso");
      navigate("/login");
    } catch (err: any) {
      setError({ general: err.message || "Ocurrió un error inesperado" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`w-full max-w-md space-y-8 p-8 rounded-xl shadow-lg ${
        isDark ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      <div className="text-center">
        <h1 className="text-3xl font-bold">Suscribirse</h1>
        <p className="mt-2">Crea tu cuenta para empezar a usar BookingPro</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <NameInput
          value={nombre}
          onChange={setNombre}
          error={error?.nombre}
          autoComplete="name"
        />

        <Input
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value.trimStart())}
          error={error?.email || undefined}
          required
          autoComplete="email"
        />

        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error?.password}
          required
          autoComplete="new-password"
        />

        <Input
          label="Repetir contraseña"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={error?.password}
          required
          autoComplete="new-password"
        />

        {error?.general && <p className="text-sm text-center text-red-500">{error.general}</p>}

        <Button type="submit" fullWidth loading={loading}>
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </Button>
      </form>

      <div className="text-center text-sm">
        ¿Ya tienes cuenta?{" "}
        <Link to="/login" className="font-medium underline">
          Inicia sesión aquí
        </Link>
      </div>
    </div>
  );
};

export default Register;