import { Link, useNavigate } from "react-router-dom";

import { useUser } from "@/contexts/UserContext";
import { useTheme } from "@/contexts/ThemeContext";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import ThemeButton from "@/components/ui/ThemeButton";
import UserMenu from "../ui/UserMenu";

const Navbar = () => {
  const { user, setUser } = useUser(); // 🔹 agregamos setUser
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔹 Limpiar contexto y localStorage
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login"); // redirige a login
  };

  const navBg = isDark ? "bg-gray-900" : "bg-gray-50";


  return (
    <nav className={`flex items-center justify-between px-4 py-3 shadow-sm ${navBg}`}>
      <Icon />

      {user ? (
 <UserMenu
        user={user}
        handleLogout={handleLogout}
        textColor="text-white"
        menuBg="bg-gray-800"
        menuActive="bg-gray-700"
      />
      ) : (
        <div className="flex items-center gap-2">
          <ThemeButton />

          <Link to="/login">
            <Button variant={isDark ? "primaryDark" : "primary"}>Iniciar sesión</Button>
          </Link>

          <Link to="/register">
            <Button variant={isDark ? "outlineDark" : "outline"}>Suscribirse</Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;