import Button from "./Button";
import { useTheme } from "@/contexts/ThemeContext";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const { isDark, setTheme } = useTheme();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
      className={` 
        group
        hover:bg-primary-800 active:bg-primary-700
        cursor-pointer
        transition-all duration-300 ease-in-out 
        ${isDark ? "text-white" : "text-black"}`}
      icon={
        isDark ? (
          <Sun className="h-5 w-5 ml-2 group-hover:text-white transition-colors" />
        ) : (
          <Moon className="h-5 w-5 ml-2 text-black group-hover:text-white transition-colors" />
        )
      }
    />
  );
}
