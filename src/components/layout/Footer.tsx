import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { isDark } = useTheme();

  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <footer
      className={`mt-auto py-8 text-center text-[14px] select-none ${
        isDark ? "text-primary-300" : "text-[#6b6b6b]"
      }`}
    >
      <div className="max-w-4xl mx-auto px-4">
        <p>
          © {new Date().getFullYear()} Sergio Robla · Todos los derechos
          reservados. · al usar esta página, acepta nuestros{" "}
          <Link to="/terms" onClick={scrollTop}>
            <span
              className={`cursor-pointer ${isDark ? "text-white" : "text-black"}`}
            >
              Términos
            </span>
          </Link>
          {" y "}
          <Link to="/privacy" onClick={scrollTop}>
            <span
              className={`cursor-pointer ${isDark ? "text-white" : "text-black"}`}
            >
              Política de Privacidad
            </span>
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;
