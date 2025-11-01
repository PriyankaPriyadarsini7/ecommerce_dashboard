import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useApp";
import { fetchProducts } from "../features/products/productSlice";
import ProductCard from "../features/products/productCard";
import ProductQuickView from "../features/products/ProductQuickView";
import Loader from "../components/Loader";

export default function Inventory({
  showWishlists = false,
}: {
  showWishlists?: boolean;
}) {
  const dispatch = useAppDispatch();

  // Redux state
  const { list, loading, searchTerm, categoryFilter} = useAppSelector((s) => s.products);
  const favorites = useAppSelector((s) => s.wishlists.list);

  // Local state
  const [localLoading, setLocalLoading] = useState(true);
  const [filtered, setFiltered] = useState(list);
  const [quickOpen, setQuickOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [quickProduct, setQuickProduct] = useState<any | null>(null);
  const [hasFetchedOnce, setHasFetchedOnce] = useState(false); // ✅ NEW FLAG

  /** Fetch Products only when NOT on Wishlist page */
  useEffect(() => {
    if (!showWishlists) {
      dispatch(fetchProducts()).finally(() => setHasFetchedOnce(true));
    } else {
      setHasFetchedOnce(true); // Wishlist doesn’t need fetch
    }
  }, [dispatch, showWishlists]);

  /** Loader for Wishlist page */
  useEffect(() => {
    if (showWishlists) {
      setLocalLoading(true);
      const timer = setTimeout(() => setLocalLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [showWishlists, favorites]);

  /** Filter data based on search */
  useEffect(() => {
    let filteredList = list;
    if(categoryFilter){
      filteredList = filteredList.filter((p) => p.category === categoryFilter);
    }

    if (searchTerm.trim()) return setFiltered(filteredList);
    const lower = searchTerm.toLowerCase();
    setFiltered(
      filteredList = filteredList.filter(
        (p) =>
          (p.title || "").toLowerCase().includes(lower) ||
          (p.description || "").toLowerCase().includes(lower)
      )
    );
  }, [list, searchTerm, categoryFilter]);

 

  /** Quick View handler */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleQuickView = (p: any) => {
    setQuickProduct(p);
    setQuickOpen(true);
  };

  /** Data to show */
  const dataToShow = showWishlists ? favorites : filtered.filter((p) => {
        if (!searchTerm.trim()) return true;
        const q = searchTerm.toLowerCase();
        return (
          (p.title || "").toLowerCase().includes(q) ||
          (p.description || "").toLowerCase().includes(q)
        );
      });
 
  /** Overall loader */
  const isLoading = showWishlists ? localLoading : loading;

  return (
    <div className="max-w-[var(--page-max-w)] mx-auto pb-4 pt-0 sm:pt-4 px-3 animate-fadeIn">
      {/* Header */}
      <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          {showWishlists ? (
            <>
              <span className="text-amber-500 dark:text-amber-400 dark:drop-shadow-lg hover:scale-110">
                ⭐
              </span>
              <span>My Wishlist</span>
            </>
          ) : (
            <>
              <span className="text-sky-500 dark:text-white dark:drop-shadow-lg hover:scale-110">
                🛒
              </span>
              <span>Inventory</span>
            </>
          )}
        </h1>
      </header>

      {/* Content */}
      {isLoading && !hasFetchedOnce ? (
        <Loader />
      ) : dataToShow.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-clos-4 xl:grid-cols-4 gap-5 transition-all duration-300">
          {dataToShow.map((p) => (
            <ProductCard key={p.id} product={p} onQuickView={handleQuickView} />
          ))}
        </div>
      ) : !hasFetchedOnce ? (
        // 👇 Don't show "No products" until first fetch completes
        <Loader />
      ) : showWishlists ? (
        <div className="text-center text-gray-500 mt-10">
          <p className="text-lg">💔 No favorite products yet</p>
          <p className="text-sm mt-1">
            Go to <span className="text-blue-600">Inventory</span> and add some!
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10">No products found...</p>
      )}

      {/* Quick View Modal */}
      <ProductQuickView
        open={quickOpen}
        onClose={() => setQuickOpen(false)}
        product={quickProduct}
      />
    </div>
  );
}
