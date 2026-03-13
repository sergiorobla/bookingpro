import { useTheme } from "@/contexts/ThemeContext";
import { Link } from "react-router-dom";

const Logo = () => {
  const { isDark } = useTheme();

  return (
    <Link to={"/"}>
      <img
        width={30}
        height={30}
        src={isDark ? "/wicon.png" : "/bicon.png"}
        alt="Logo SR"
        className="object-contain"
      />
    </Link>
  );
};

export default Logo;
