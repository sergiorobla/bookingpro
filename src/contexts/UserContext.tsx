import { createContext, useState, useContext, type ReactNode, useEffect } from "react";

export interface User {
  id?: number;
  nombre: string;
  email: string;
  token: string;
  avatarUrl?: string;
  telefono?: string;
  direccion?: string;
  bio?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  updateAvatar: (avatarUrl: string) => void;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {

  const [user, setUserState] = useState<User | null>(null);

  // cargar usuario al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserState(JSON.parse(storedUser));
    }
  }, []);

  // setter que SIEMPRE sincroniza localStorage
  const setUser = (newUser: User | null) => {
    setUserState(newUser);

    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  };

  const updateAvatar = (avatarUrl: string) => {
    if (!user) return;

    const updatedUser = { ...user, avatarUrl };
    setUser(updatedUser);
  };

  const logout = () => {
    setUser(null);
  };

  // refetch del usuario desde backend
  const refreshUser = async () => {
    if (!user?.id) return;

    try {
      const res = await fetch(`http://localhost:8081/api/users/${user.id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      if (!res.ok) return;

      const updatedUser = await res.json();

      setUser({
        ...user,
        ...updatedUser
      });

    } catch (err) {
      console.error("Error refrescando usuario", err);
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser, updateAvatar, logout, refreshUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};