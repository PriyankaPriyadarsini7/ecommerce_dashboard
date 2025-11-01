import { useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "../../types/productTypes";
import { Eye } from "lucide-react";
import { toggleWishlists } from "../wishlist/wishlistSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/useApp";

export default function ProductCard({
  product,
  onQuickView,
}: {
  product: Product;
  //onEdit: (p: Product) => void;
  // onDelete: (id?: number, localId?: string) => void;
  onQuickView: (p: Product) => void;
}) {
  const dispatch = useAppDispatch();
  const favs = useAppSelector((s) => s.wishlists.list);
  const isFav = favs.some((p) => p.id === product.id);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      layout
      onMouseMove={handleMouseMove}
      initial={{ scale: 1 }}
      whileHover={{
        scale: 1.04,
        boxShadow:
          "0 12px 40px rgba(99, 102, 241, 0.25), 0 0 25px rgba(167, 139, 250, 0.2), 0 0 50px rgba(236, 72, 153, 0.15)",
      }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
      className="relative rounded-2xl p-[2px] overflow-hidden cursor-pointer group"
    >
      {/* Glowing animated gradient border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400 via-indigo-500 to-pink-500 opacity-70 blur-sm animate-border-glow"></div>

      {/* Inner background layer */}
      <div
        onMouseMove={handleMouseMove}
        className="relative rounded-2xl p-3 backdrop-blur-xl 
               bg-gradient-to-br from-gray-50 via-white to-blue-50 
               dark:from-gray-900 dark:via-indigo-950 dark:to-gray-900"
      >
        {/* Mouse-follow highlight */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle 150px at ${mousePos.x}px ${mousePos.y}px, rgba(99,102,241,0.15), transparent 80%)`,
          }}
        ></div>

        {/* Footer shimmer */}
        <div className="absolute bottom-0 left-0 w-full h-1 opacity-50 rounded-t-full overflow-hidden pointer-events-none">
          <div className="h-full w-1/3 bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-shine"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 p-3 flex flex-col">
          <div className="relative">
            <img
              src={product.thumbnail ?? "https://via.placeholder.com/400x300"}
              alt={product.title}
              className="w-full h-30 sm:h-32 md:h-34 lg:h-36 object-cover rounded-lg shadow-md shadow-indigo-500/10"
            />
            <button
              onClick={() => dispatch(toggleWishlists(product))}
              aria-label={isFav ? "Remove from wishlist" : "Add to wishlist"}
              className={`absolute top-2 right-2 cursor-pointer select-none text-2xl transform transition-all duration-200 ${
                isFav
                  ? "text-red-500 scale-125 hover:scale-135 drop-shadow-[0_0_8px_rgba(255,0,0,0.6)]"
                  : "text-gray-400 hover:text-red-400 hover:scale-125 hover:drop-shadow-[0_0_6px_rgba(255,100,100,0.5)]"
              }`}
            >
              {isFav ? "❤️" : "🤍"}
            </button>
          </div>

          <div className="mt-2 flex-1">
            <h3 className="font-semibold text-gray-800 dark:text-white text-xs md:text-sm">
              {product.title}
            </h3>
            <p className="text-[11px] md:text-xs text-gray-500 dark:text-indigo-200/80">
              {product.category}
            </p>
          </div>

          <div className="mt-2">
            {/* Price */}
            <div className="text-sm font-bold text-indigo-600 dark:text-indigo-300">
              ${product.price}
            </div>

            {/* Stock badge + View button in same horizontal line */}
            <div className="mt-1 flex justify-between items-center gap-1 sm:gap-5 md:gap-5">

              {/* Stock badge */}
              <div
                className={`text-[8px] sm:text-xs px-1 py-[1px] sm:px-2 sm:py-1 rounded-full ${
                  product.stock && product.stock < 10
                    ? "bg-red-100 text-red-700 border border-red-200 dark:bg-red-100/20 dark:text-red-400 dark:border-red-400/30"
                    : "bg-green-100 text-green-700 border border-green-200 dark:bg-green-100/20 dark:text-green-300 dark:border-green-300/30"
                }`}
              >
                {product.stock ?? "N/A"} in stock
              </div>

              {/* Action button */}
              <button
                onClick={() => onQuickView(product)}
                className="px-1.5 sm:px-3 py-[1px] sm:py-1 rounded border border-indigo-300/60 dark:border-indigo-500/40 flex items-center gap-1 
                          hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 
                           transition text-[10px] sm:text-xs text-indigo-700 dark:text-indigo-200"
              >
                <Eye size={15} className="sm:w-4 sm:h-4" /> View
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
