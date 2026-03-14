// UserMenu.tsx
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
import { Fragment, type FC } from "react";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import ThemeButton from "./ThemeButton";
import { useTheme } from "@/contexts/ThemeContext";
import type { User as ContextUser } from "@/contexts/UserContext";

interface UserMenuProps {
  user: ContextUser;
  handleLogout: () => void;
  textColor?: string;
  menuBg?: string;
  menuActive?: string;
}

const UserMenu: FC<UserMenuProps> = ({ user, handleLogout }) => {
  const { isDark } = useTheme();

  const textColor = isDark ? "text-white" : "text-gray-900";
  const menuBg = isDark ? "bg-gray-800" : "bg-white";
  const menuActive = isDark ? "bg-gray-700" : "bg-gray-100";
  return (
    <div className="flex items-center gap-3">
      <ThemeButton />

      <Menu as="div" className="relative">
        <MenuButton
          className={`flex items-center gap-2 focus:outline-none cursor-pointer hover:bg-primary-800 p-2 rounded-md group transition-all duration-300 ease-in-out ${textColor}`}
        >
          <Avatar
            src={user.avatarUrl ?? "/default-avatar.png"}
            size={32}
            className="w-8 h-8 border border-black"
          />
          <span
            className={`hidden md:block group-hover:text-white transition-all duration-300 ease-in-out ${isDark ? "text-white" : "text-black"}`}
          >
            {user.nombre}
          </span>
        </MenuButton>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-150"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-100"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems
            className={`absolute right-0 mt-2 min-w-48 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 ${menuBg}`}
          >
            <div className="py-1">
              <MenuItem>
                {({ active }) => (
                  <Link
                    to="/dashboard"
                    className={`block px-4 py-2 text-sm cursor-pointer ${textColor} ${
                      active ? menuActive : ""
                    }`}
                  >
                    Perfil
                  </Link>
                )}
              </MenuItem>

              <MenuItem>
                {({ active }) => (
                  <Link
                    to="/settings"
                    className={`block px-4 py-2 text-sm cursor-pointer ${textColor} ${
                      active ? menuActive : ""
                    }`}
                  >
                    Ajustes
                  </Link>
                )}
              </MenuItem>

              <MenuItem>
                {({ active }) => (
                  <button
                    onClick={handleLogout}
                    className={`w-full text-left px-4 py-2 text-sm cursor-pointer ${textColor} ${
                      active ? menuActive : ""
                    }`}
                  >
                    Cerrar sesión
                  </button>
                )}
              </MenuItem>
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserMenu;
