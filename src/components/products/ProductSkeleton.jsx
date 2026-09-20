export default function ProductSkeleton() {
  return (
    <div className="flex flex-col justify-between rounded-xl border border-border bg-card p-4 shadow-xs animate-pulse">
      {/* هيكل الصورة */}
      <div className="mb-3 h-48 w-full rounded-lg bg-muted"></div>

      <div className="flex flex-col grow">
        {/* هيكل العنوان (سطران) */}
        <div className="mb-2 h-4 w-full rounded-sm bg-muted"></div>
        <div className="mb-4 h-4 w-2/3 rounded-sm bg-muted"></div>

        {/* هيكل السعر */}
        <div className="mb-3 h-6 w-1/3 rounded-sm bg-muted"></div>

        {/* هيكل الـ MOQ والكمية المباعة */}
        <div className="mb-3 flex justify-between">
          <div className="h-3 w-1/4 rounded-sm bg-muted"></div>
          <div className="h-3 w-1/4 rounded-sm bg-muted"></div>
        </div>

        {/* هيكل شارة التوثيق السفلية */}
        <div className="mt-auto pt-2 border-t border-border">
          <div className="h-4 w-1/4 rounded-sm bg-muted"></div>
        </div>
      </div>
    </div>
  );
}
