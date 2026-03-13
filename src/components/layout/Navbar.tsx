import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useUser } from "@/contexts/UserContext";
import { useTheme } from "@/contexts/ThemeContext";

import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import ThemeButton from "@/components/ui/ThemeButton";

const Navbar = () => {
  const { user, setUser } = useUser();
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const navBg = isDark ? "bg-gray-900" : "bg-gray-50";
  const textColor = isDark ? "text-white" : "text-gray-900";
  const menuBg = isDark ? "bg-gray-800" : "bg-white";
  const menuActive = isDark ? "bg-gray-700" : "bg-gray-100";

  return (
    <nav
      className={`flex items-center justify-between px-4 py-3 shadow-sm ${navBg}`}
    >
      <Icon />

      {user ? (
        <div className="flex items-center gap-3">
          <ThemeButton />

          <Menu as="div" className="relative">
            <Menu.Button
              className={`flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 ${textColor}`}
            >
              <User size={28} />
              <span className="hidden md:block">{user.nombre}</span>
            </Menu.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-150"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-100"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                className={`absolute right-0 mt-2 min-w-48 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 ${menuBg}`}
              >
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/dashboard"
                        className={`block px-4 py-2 text-sm ${textColor} ${active ? menuActive : ""}`}
                      >
                        Perfil
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <Link
                        to="/settings"
                        className={`block px-4 py-2 text-sm ${textColor} ${active ? menuActive : ""}`}
                      >
                        Ajustes
                      </Link>
                    )}
                  </Menu.Item>

                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={handleLogout}
                        className={`w-full text-left px-4 py-2 text-sm ${textColor} ${active ? menuActive : ""}`}
                      >
                        Cerrar sesión
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <ThemeButton />

          <Link to="/login">
            <Button variant={isDark ? "primaryDark" : "primary"}>
              Iniciar sesión
            </Button>
          </Link>

          <Link to="/register">
            <Button variant={isDark ? "outlineDark" : "outline"}>
              Suscribirse
            </Button>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
