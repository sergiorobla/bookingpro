import { useTheme } from "@/contexts/ThemeContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AppRoutes from "./Routes";
import { useLocation } from "react-router-dom";

function App() {
  const { isDark } = useTheme();
  const location = useLocation();

  const centerPages = ["/login", "/register"];
  const isCentered = centerPages.includes(location.pathname);

  return (
    <div
      className={`flex min-h-screen flex-col ${
        isDark ? "bg-gray-950" : "bg-gray-50"
      }`}
    >
      <header>
        <Navbar />
      </header>

      <main
        className={`flex-1 flex ${
          isCentered
            ? "items-center justify-center py-12 px-4"
            : "items-start justify-start p-4"
        }`}
      >
        <AppRoutes />
      </main>

      <Footer />
    </div>
  );
}

export default App;
