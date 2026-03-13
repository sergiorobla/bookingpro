import { useTheme } from "@/contexts/ThemeContext";
const Home = () => {
  const { isDark } = useTheme();
  return (
    <div className={`${isDark ? "text-white" : "text-dark"}`}>
      <h1>Holaa</h1>
    </div>
  );
};

export default Home;
