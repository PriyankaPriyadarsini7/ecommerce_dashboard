
export default function ProductFilters({
  categories,
  onFilter,
  selectedCategory,
  className = "",
}: {
  categories: string[];
  onFilter: (category: string) => void;
  selectedCategory?: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={selectedCategory}
        onChange={(e) => onFilter(e.target.value)}
        className="border rounded-md bg-white dark:bg-gray-700 dark:border-gray-600 focus:ring-1 focus:ring-blue-500
                    text-gray-900 dark:text-gray-100 text-xs sm:text-sm md:text-base px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2
                    w-[120px] sm:w-[170px] md:w-[300px] transition-all duration-200">
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  );
}
