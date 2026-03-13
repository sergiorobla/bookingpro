import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

interface User {
  id: number;
  nombre: string;
  email: string;
  token: string;
}

const Dashboard = () => {
  const [user, setUser] = useState<User | null>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) return <p>Cargando datos...</p>;

  return (
    <div className={`flex flex-col ${isDark ? "text-white" : "text-black"}`}>
      <h1 className="text-3xl">{user.nombre}</h1>
      <p>Correo: {user.email}</p>
    </div>
  );
};

export default Dashboard;
