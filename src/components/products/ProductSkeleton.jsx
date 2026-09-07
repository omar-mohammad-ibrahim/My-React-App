export default function ProductSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-gray-100 bg-white p-4 shadow-xs animate-pulse">
      <div className="mb-3 h-48 w-full rounded-lg bg-gray-200"></div>

      <div className="flex flex-col grow">
        <div className="mb-2 h-4 w-full rounded-sm bg-gray-200"></div>
        <div className="mb-4 h-4 w-2/3 rounded-sm bg-gray-200"></div>

        <div className="mb-3 h-6 w-1/3 rounded-sm bg-gray-200"></div>

        <div className="mb-3 flex justify-between">
          <div className="h-3 w-1/4 rounded-sm bg-gray-200"></div>
          <div className="h-3 w-1/4 rounded-sm bg-gray-200"></div>
        </div>

        <div className="mt-auto pt-2 border-t border-gray-100">
          <div className="h-4 w-1/4 rounded-sm bg-gray-200"></div>
        </div>
      </div>
    </div>
  );
}
