import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Camera, Search, X, Clock, Trash2, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const RECENT_SEARCHES_KEY = "nexustrade_recent_searches";
const MAX_RECENT_ITEMS = 6;
const MAX_SUGGESTIONS = 6;

export default function SearchBar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // جلب المنتجات لتوليد الاقتراحات الحية
  const rawProducts = useSelector((state) => state.products?.items || []);
  const products = useMemo(() => {
    return Array.isArray(rawProducts) ? rawProducts : rawProducts?.data || [];
  }, [rawProducts]);

  // الحالات
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [typedTerm, setTypedTerm] = useState(searchParams.get("q") || ""); // حفظ النص الفعلي المكتوب (للمعاينة)
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [recentSearches, setRecentSearches] = useState([]);

  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null); // مرجع لرفع الصور (الخاصية 5)

  // مزامنة حقل الإدخال مع الرابط عند التغيير الخارجي
  useEffect(() => {
    const q = searchParams.get("q") || "";
    setSearchTerm(q);
    setTypedTerm(q);
  }, [searchParams]);

  // تحميل سجل البحث السابق من المتصفح
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (stored) setRecentSearches(JSON.parse(stored));
    } catch {
      setRecentSearches([]);
    }
  }, []);

  // إغلاق القائمة عند النقر بالخارج
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // استخراج الاقتراحات الحية
  const suggestions = useMemo(() => {
    const trimmed = typedTerm.trim().toLowerCase();
    if (!trimmed || trimmed.length < 2) return [];

    const matches = new Set();
    for (const item of products) {
      if (matches.size >= MAX_SUGGESTIONS) break;
      const title = item.title || "";
      const category = item.category || "";

      if (title.toLowerCase().includes(trimmed)) matches.add(title);
      if (category.toLowerCase().includes(trimmed)) matches.add(category);
    }
    return Array.from(matches);
  }, [typedTerm, products]);

  const activeList =
    typedTerm.trim().length >= 2 ? suggestions : recentSearches;

  // حفظ الكلمة في السجل
  const saveToRecent = (query) => {
    const clean = query.trim();
    if (!clean) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== clean.toLowerCase(),
      );
      const updated = [clean, ...filtered].slice(0, MAX_RECENT_ITEMS);
      try {
        localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  // 6. تنفيذ البحث مع مراعاة التبويب الحالي (Products أم Suppliers)
  const executeSearch = (query) => {
    const targetQuery = query.trim();
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.blur();

    if (targetQuery) saveToRecent(targetQuery);

    // الحفاظ على نطاق التبويب الحالي (Products أو Suppliers)
    const currentView = searchParams.get("view");
    const nextParams = new URLSearchParams(
      location.pathname.startsWith("/products") ? searchParams : "",
    );

    if (targetQuery) {
      nextParams.set("q", targetQuery);
    } else {
      nextParams.delete("q");
    }

    if (currentView) {
      nextParams.set("view", currentView);
    }

    nextParams.delete("page"); // تصفير الصفحة دائماً عند بدء بحث جديد
    navigate(`/products?${nextParams.toString()}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedIndex >= 0 && activeList[selectedIndex]) {
      executeSearch(activeList[selectedIndex]);
    } else {
      executeSearch(searchTerm);
    }
  };

  // 3. التنقل بالأسهم مع المعاينة الحية في الـ Input
  const handleKeyDown = (e) => {
    if (!isOpen && (e.key === "ArrowDown" || e.key === "ArrowUp")) {
      setIsOpen(true);
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const nextIndex =
        selectedIndex + 1 < activeList.length ? selectedIndex + 1 : -1;
      setSelectedIndex(nextIndex);
      // إذا رجع المؤشر للأعلى يعيد النص الأصلي الذي كتبه المستخدم، وإلا يضع نص الاقتراح المحدد
      setSearchTerm(nextIndex === -1 ? typedTerm : activeList[nextIndex]);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prevIndex =
        selectedIndex - 1 >= -1 ? selectedIndex - 1 : activeList.length - 1;
      setSelectedIndex(prevIndex);
      setSearchTerm(prevIndex === -1 ? typedTerm : activeList[prevIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
      setSelectedIndex(-1);
      setSearchTerm(typedTerm);
    }
  };

  // 5. معالجة البحث بالصور
  const handleImageSelect = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // محاكاة التعرف على الصورة باستخراج اسمها والبحث به
    const cleanFileName = file.name
      .split(".")[0]
      .replace(/[-_]/g, " ")
      .replace(/[0-9]/g, "")
      .trim();

    const query = cleanFileName || "product";
    setSearchTerm(query);
    setTypedTerm(query);
    executeSearch(query);
  };

  const handleClearInput = () => {
    setSearchTerm("");
    setTypedTerm("");
    setSelectedIndex(-1);
    if (location.pathname.startsWith("/products")) {
      const nextParams = new URLSearchParams(searchParams);
      nextParams.delete("q");
      nextParams.delete("page");
      navigate(`/products?${nextParams.toString()}`);
    }
    inputRef.current?.focus();
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-2xl">
      {/* حقل ملف مخفي لاختيار الصورة */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
        className="hidden "
      />

      {/* إطار شريط البحث الخارجي */}
      <div className="w-full rounded-full bg-brand-gradient p-[2px] shadow-xs focus-within:shadow-md transition-shadow">
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center gap-1 rounded-full bg-card px-2 py-1 transition-colors"
        >
          <div className="relative flex-1 flex items-center">
            <Input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onFocus={() => setIsOpen(true)}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setTypedTerm(e.target.value);
                setIsOpen(true);
                setSelectedIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              placeholder={
                searchParams.get("view") === "suppliers"
                  ? "Search suppliers by name or country..."
                  : t("searchBar.placeholder") || "What are you looking for?"
              }
              className="w-full border-none bg-transparent shadow-none px-3 py-1 text-sm sm:text-base text-card-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:border-none h-9 pe-8"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={handleClearInput}
                className="absolute end-2 p-1 text-muted-foreground hover:text-foreground cursor-pointer rounded-full transition-colors"
                aria-label="Clear input"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* 5. زر البحث بالصور عبر الكاميرا */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            title="Search by image"
            aria-label="Search by image"
            className="p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer rounded-full hover:bg-muted/50"
          >
            <Camera className="h-5 w-5" />
          </button>

          <Button
            type="submit"
            variant="gradient"
            className="h-9 px-4 sm:px-6 py-0 text-sm font-semibold rounded-full shrink-0 flex items-center gap-1.5"
          >
            <Search className="h-4 w-4" />
            <span>{t("searchBar.button") || "Search"}</span>
          </Button>
        </form>
      </div>

      {/* القائمة المنسدلة الذكية */}
      {isOpen && (
        <div className="absolute top-full start-0 end-0 mt-2 z-50 rounded-2xl border border-border bg-card py-3 shadow-xl backdrop-blur-md">
          {typedTerm.trim().length >= 2 ? (
            <div className="flex flex-col">
              <div className="px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Suggestions
              </div>

              {suggestions.length > 0 ? (
                suggestions.map((item, index) => {
                  const isSelected = index === selectedIndex;
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        setSearchTerm(item);
                        setTypedTerm(item);
                        executeSearch(item);
                      }}
                      className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-muted text-primary font-medium"
                          : "text-foreground hover:bg-muted/60"
                      }`}
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
                        {/* 1. إبراز الحروف المطابقة داخل الكلمة */}
                        <span className="truncate">
                          <HighlightMatch text={item} query={typedTerm} />
                        </span>
                      </div>
                      <ArrowUpRight className="h-3.5 w-3.5 text-muted-foreground/60 shrink-0" />
                    </div>
                  );
                })
              ) : (
                <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                  Press enter to search for &quot;
                  <span className="text-foreground font-medium">
                    {typedTerm}
                  </span>
                  &quot;
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col">
              {recentSearches.length > 0 ? (
                <>
                  <div className="flex items-center justify-between px-4 pb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <span>Recent Searches</span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setRecentSearches([]);
                        try {
                          localStorage.removeItem(RECENT_SEARCHES_KEY);
                        } catch {}
                      }}
                      className="text-xs font-normal normal-case hover:text-destructive flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Trash2 className="h-3 w-3" />
                      <span>Clear all</span>
                    </button>
                  </div>

                  {recentSearches.map((item, index) => {
                    const isSelected = index === selectedIndex;
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setSearchTerm(item);
                          setTypedTerm(item);
                          executeSearch(item);
                        }}
                        className={`flex items-center justify-between px-4 py-2 text-sm cursor-pointer transition-colors group ${
                          isSelected
                            ? "bg-muted text-primary font-medium"
                            : "text-foreground hover:bg-muted/60"
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <Clock className="h-4 w-4 shrink-0 text-muted-foreground" />
                          <span className="truncate">{item}</span>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setRecentSearches((prev) => {
                              const updated = prev.filter((i) => i !== item);
                              try {
                                localStorage.setItem(
                                  RECENT_SEARCHES_KEY,
                                  JSON.stringify(updated),
                                );
                              } catch {}
                              return updated;
                            });
                          }}
                          className="p-1 text-muted-foreground hover:text-foreground opacity-60 group-hover:opacity-100 transition-opacity cursor-pointer rounded-xs"
                          aria-label={`Remove ${item}`}
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    );
                  })}
                </>
              ) : (
                <div className="px-4 py-3 text-sm text-muted-foreground text-center">
                  Search by product name, supplier, or category
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// 1. مكوّن إبراز الحروف المتطابقة (Highlight Match)
function HighlightMatch({ text, query }) {
  if (!query || !query.trim()) return <span>{text}</span>;

  // حماية الرموز الخاصة في الاستعلام لعدم كسر Regex
  const escaped = query.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) =>
        part.toLowerCase() === query.trim().toLowerCase() ? (
          <span key={i} className="font-bold text-primary">
            {part}
          </span>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  );
}
