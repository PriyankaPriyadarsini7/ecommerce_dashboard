import { Outlet, useLocation, NavLink } from "react-router-dom";
import ToggleTheme from "../ui/ToggleTheme";
import SearchBar from "../../context/SearchBox";
import { useAppDispatch, useAppSelector } from "../../hooks/useApp";
import { setCategoryFilter } from "../../features/products/productSlice";
import ProductFilters from "../../features/products/productFilters";

export default function Layout() {
  const location = useLocation();
  const showSearchBar = location.pathname.startsWith("/inventory");
  const dispatch = useAppDispatch();

  const { list , categoryFilter}  = useAppSelector((s) => s.products);
  const categories = Array.from(
  new Set(
    list
      .map((p) => p.category)
      .filter((cat): cat is string => typeof cat === "string" && cat.trim() !== "")
  )
);


  const handleFilter = (cat:string) => {
    dispatch(setCategoryFilter(cat));
  }

  return (

    <div className="min-h-screen flex flex-col bg-[#eeeddf] dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* --- Header --- */}
      <header className="bg-[#FFF9F0] dark:bg-gray-800 shadow-lg fixed top-0 left-0 right-0 z-10">
        <div className="max-w-[var(--page-max-w)] mx-auto px-4 py-3 flex items-center md:gap-2 gap-y-3 sm:gap-y-0 sm:gap-x-6 justify-between relative">
          {/* Left section: Title + Search */}
          <div className="flex items-center ml-4 sm:ml-0 md:gap-10 sm:gap-2 flex-1 justify-between sm:justify-start flex-shrink-0">
            <NavLink
              to="/"
              className="text-xl md:text-3xl sm:text-lg font-bold text-blue-600 dark:text-blue-300 whitespace-nowrap"
            >
              Ecommerce
            </NavLink>

            {/* Show SearchBar next to title */}
            {showSearchBar && (
              <div className="flex-1 min-w-[180px] sm:min-w-[170px] max-w-[400px] md:min-w-[300px]">
                <SearchBar />
              </div>
            )}
          </div>

          {/* --- Centered Navigation --- */}
          <nav className="absolute left-1/2 -translate-x-1/2 md:text-base sm:text-sm hidden sm:flex gap-10 sm:gap-5">
            <NavLink
              to="/inventory"
              className={({ isActive }) =>
                `transition font-medium ${
                  isActive
                    ? "text-blue-600 dark:text-blue-300 border-b-2 border-blue-600 dark:border-blue-300 pb-1"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300"
                }`
              }
            >
              Inventory
            </NavLink>
            <NavLink
              to="/wishlists"
              className={({ isActive }) =>
                `transition font-medium ${
                  isActive
                    ? "text-blue-600 dark:text-blue-300 border-b-2 border-blue-600 dark:border-blue-300 pb-1"
                    : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300"
                }`
              }
            >
              Wishlist
            </NavLink>
          </nav>

          {/* Right: Theme Toggle and Filter Dropdown */}
          <div className="flex items-center gap-6 sm:gap-4 ml-1">
            {
              showSearchBar && (
                <ProductFilters 
                categories={categories}
                onFilter={handleFilter}
                selectedCategory={categoryFilter}
                className ="hidden sm:flex"
                />
              )
            }

            {/* Theme toggle is always visible */}
              <ToggleTheme />
          </div>
        </div>
      </header>

      {/* --- Mobile Navigation --- */}
      <div className="sm:hidden fixed left-0 right-0 z-10  bg-[#FFF9F0] dark:bg-gray-800 mt-[56px] border-t dark:border-gray-700 px-4 py-2 flex items-center gap-6 justify-center flex-wrap">
        <NavLink
          to="/inventory"
          className={({ isActive }) =>
            `transition font-medium ${
              isActive
                ? "text-blue-600 dark:text-blue-300"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300"
            }`
          }
        >
          Inventory
        </NavLink>
        <NavLink
          to="/wishlists"
          className={({ isActive }) =>
            `transition font-medium ${
              isActive
                ? "text-blue-600 dark:text-blue-300"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-300"
            }`
          }
        >
          Wishlist
        </NavLink>
        {showSearchBar && (
          <div className="ml-2">
            <ProductFilters
              categories={categories}
              onFilter={handleFilter}
              selectedCategory={categoryFilter}
            />
          </div>
        )}
      </div>

      {/* --- Main Content --- */}
      <main className="flex-1 pt-[120px] sm:pt-[80px] pb-8">
        <Outlet />
      </main>

      {/* --- Footer --- */}
      <footer className="bg-[#FFF9F0] dark:bg-gray-800 py-3 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Inventory Dashboard
      </footer>
    </div>
  );
}
