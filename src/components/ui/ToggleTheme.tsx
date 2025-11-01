import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ToggleTheme() {
  const [dark, setDark] = useState(() => localStorage.theme === "dark");
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.theme = dark ? "dark" : "light";
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-md border border-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9"
    >
      {dark ? (
        <Sun className="w-5 h-4 sm:w-5 sm:h-5 text-yellow-400" />
      ) : (
        <Moon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800 dark:text-gray-200" />

      )}
    </button>
  );
}
