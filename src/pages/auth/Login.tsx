import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTheme } from "@/contexts/ThemeContext";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { useUser } from "@/contexts/UserContext";

const Login = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { setUser } = useUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Credenciales incorrectas");
      }

      const data = await response.json();

      // Guardar usuario completo y token en localStorage
      localStorage.setItem("user", JSON.stringify(data));
      localStorage.setItem("token", data.token);

      setUser(data);

      console.log("Login exitoso");
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.message);
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
        <h1 className="text-3xl font-bold">Iniciar Sesión</h1>
        <p className="mt-2">Ingresa tus credenciales para continuar</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Correo electrónico"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />

        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password"
        />

        {error && <p className="text-sm text-center text-red-500">{error}</p>}

        <Button type="submit" fullWidth loading={loading}>
          {loading ? "Iniciando..." : "Iniciar Sesión"}
        </Button>
      </form>

      <div className="text-center text-sm">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="font-medium">
          Regístrate aquí
        </Link>
      </div>
    </div>
  );
};

export default Login;
