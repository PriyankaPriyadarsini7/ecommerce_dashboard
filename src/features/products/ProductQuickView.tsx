import { AnimatePresence, motion } from "framer-motion";
import type { Product } from "../../types/productTypes";

export default function ProductQuickView({
  open,
  onClose,
  product,
}: {
  open: boolean;
  onClose: () => void;
  product: Product | null;
}) {
  if (!product) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center backdrop-blur-sm px-3 sm:px-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="relative bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-2xl shadow-2xl max-w-[95%] sm:max-w-md md:max-w-lg w-full border border-gray-100 dark:border-gray-700"
          >
            {/* 🔴 Red Glowing Close Button */}
            <motion.button
              onClick={onClose}
              aria-label="Close"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 0 12px rgba(239, 68, 68, 0.7)",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="absolute top-3 right-3 p-1.5 sm:p-2 rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 focus:outline-none"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 sm:h-5 sm:w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            {/* --- Product Image --- */}
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 sm:h-52 md:h-60 object-cover rounded-xl mb-3 sm:mb-4"
            />

            {/* --- Product Details --- */}
            <h3 className="text-sm sm:text-lg md:text-xl font-semibold text-gray-900 dark:text-white">
              {product.title}
            </h3>
            <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300 mt-2 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-3 sm:mt-5 flex flex-row justify-between items-center gap-2">
              <span className="text-sm sm:text-base md:text-lg font-bold text-indigo-600 dark:text-indigo-400">
                ${product.price}
              </span>
              <span
                className={`px-1.5 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-1.5 rounded-full text-xs sm:text-sm md:text-base font-medium ${
                  product.stock && product.stock < 10
                    ? "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300"
                    : "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300"
                }`}
              >
                {product.stock} in stock
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
