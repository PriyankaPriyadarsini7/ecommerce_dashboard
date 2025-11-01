import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { setSearchTerm } from "../features/products/productSlice";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const searchTerm = useAppSelector((s) => s.products.searchTerm);
  const [value, setValue] = useState(searchTerm);

  // Debounce to avoid excessive dispatches
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(setSearchTerm(value.trim()));
    }, 300);
    return () => clearTimeout(timer);
  }, [value, dispatch]);
  

  return (
    <div className="relative w-full max-w-[90%] sm:max-w-sm md:max-w-md lg:max-w-lg mx-auto px-2 sm:px-0">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search products..."
        className="w-full pl-10 pr-3 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-400 text-sm sm:text-base"
      />
    </div>
  );
}
