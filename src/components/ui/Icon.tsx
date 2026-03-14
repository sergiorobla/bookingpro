import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";

const Logo = () => {
  const { isDark } = useTheme();

  const base = import.meta.env.BASE_URL;

  return (
    <Link to={"/"}>
      <img
        width={30}
        height={30}
        src={isDark ? `${base}wicon.png` : `${base}bicon.png`}
        alt="Logo SR"
        className="object-contain"
      />
    </Link>
  );
};

export default Logo;