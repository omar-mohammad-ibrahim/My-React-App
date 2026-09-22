import { useSearchParams } from "react-router-dom";
import { useMemo, useCallback } from "react";

export function useProductFilters() {
  const [searchParams, setSearchParams] = useSearchParams();

  // دالة مساعدة داخلية لتحويل النصوص لأرقام بأمان ومنع ظهور NaN
  const parseSafeNumber = (value) => {
    if (!value) return null;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  };

  // -------------------------------------------------------------
  // 1. قراءة الفلاتر وتحويلها للأنواع المناسبة (Parsing with Defaults)
  // -------------------------------------------------------------
  const filters = useMemo(() => {
    // التحقق من رقم الصفحة ليكون دائماً 1 أو أكثر
    const rawPage = parseInt(searchParams.get("page") || "1", 10);
    const validPage = Number.isFinite(rawPage) && rawPage > 0 ? rawPage : 1;

    return {
      // نوع العرض: منتجات أم موردين (الافتراضي: products)
      view: searchParams.get("view") || "products",

      // كلمة البحث القادمة من شريط البحث
      q: searchParams.get("q") || "",

      // التصنيف المختار من القائمة الجانبية
      category: searchParams.get("category") || "",

      // الفلاتر المنطقية (Boolean Filters)
      verified: searchParams.get("verified") === "true",
      tradeAssurance: searchParams.get("trade_assurance") === "true",
      hasSample: searchParams.get("has_sample") === "true",

      // فلاتر الأرقام والمبالغ مع حماية تامة ضد الأخطاء
      minPrice: parseSafeNumber(searchParams.get("min_price")),
      maxPrice: parseSafeNumber(searchParams.get("max_price")),
      moq: parseSafeNumber(searchParams.get("moq")),
      rating: parseSafeNumber(searchParams.get("rating")),
      years: parseSafeNumber(searchParams.get("years")), // سنوات خبرة المورد

      // دولة المورد والترتيب
      country: searchParams.get("country") || "",
      sort: searchParams.get("sort") || "relevance",

      // رقم الصفحة الحالية
      page: validPage,
    };
  }, [searchParams]);

  // -------------------------------------------------------------
  // 2. دالة التحديث الذكية (تحديث، تنظيف، وتصفير الصفحة)
  // -------------------------------------------------------------
  const updateFilters = useCallback(
    (newParams) => {
      const next = new URLSearchParams(searchParams);

      // خريطة لربط أسماء الحقول البرمجية بمفاتيح الـ URL الفعلية
      const keyMap = {
        view: "view",
        q: "q",
        category: "category",
        verified: "verified",
        tradeAssurance: "trade_assurance",
        hasSample: "has_sample",
        minPrice: "min_price",
        maxPrice: "max_price",
        moq: "moq",
        rating: "rating",
        years: "years",
        country: "country",
        sort: "sort",
        page: "page",
      };

      // المرور على التعديلات المدخلة
      Object.entries(newParams).forEach(([key, value]) => {
        const urlKey = keyMap[key] || key;

        // إذا كانت القيمة فارغة أو ملغاة أو false، نحذفها من الرابط لإبقائه نظيفاً
        if (
          value === null ||
          value === undefined ||
          value === "" ||
          value === false ||
          (urlKey === "page" && Number(value) <= 1)
        ) {
          next.delete(urlKey);
        } else {
          next.set(urlKey, String(value));
        }
      });

      // قاعدة ذهبية: إذا تغير أي فلتر غير رقم الصفحة، نلغي 'page' ليعود للصفحة 1 تلقائياً
      if (!("page" in newParams)) {
        next.delete("page");
      }

      setSearchParams(next, { replace: true });
    },
    [searchParams, setSearchParams],
  );

  // -------------------------------------------------------------
  // 3. دالة تفريغ كافة الفلاتر (Clear All Filters)
  // -------------------------------------------------------------
  const clearAllFilters = useCallback(() => {
    const next = new URLSearchParams();

    // نحافظ فقط على نوع العرض (Products/Suppliers) ونص البحث إن وُجدا
    if (searchParams.has("view")) next.set("view", searchParams.get("view"));
    if (searchParams.has("q")) next.set("q", searchParams.get("q"));

    setSearchParams(next, { replace: true });
  }, [searchParams, setSearchParams]);

  // -------------------------------------------------------------
  // 4. دالة مخصصة لتبديل رقم الصفحة في شريط الـ Pagination
  // -------------------------------------------------------------
  const setPage = useCallback(
    (pageNumber) => {
      updateFilters({ page: pageNumber });
    },
    [updateFilters],
  );

  return {
    filters,
    updateFilters,
    clearAllFilters,
    setPage,
  };
}
