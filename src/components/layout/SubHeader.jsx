import { Menu } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import Button from "../ui/Button";

export default function SubHeader() {
  const { t } = useTranslation();
  const location = useLocation();
  const isPlpPage = location.pathname.startsWith("/products");

  return (
    <div className="w-full border-b border-border bg-card transition-colors">
      {isPlpPage ? (
        <div>
          <Button ></Button>
        </div>



      ) : (
        <div className="container max-w-7xl flex items-center justify-between py-2 text-sm font-medium">
          {/* القسم الأيسر: الأقسام والمصنعين */}
          <div className="flex items-center gap-6 text-foreground">
            {/* قائمة كافة الفئات (All Categories) */}
            <div className="group relative flex cursor-pointer items-center gap-2 py-1.5 transition-colors hover:text-primary">
              <Menu className="h-5 w-5" strokeWidth={1.5} />
              <span>{t("subheader.allCategories") || "All categories"}</span>

              {/* القائمة المنسدلة الضخمة (Mega Menu) */}
              <div className="absolute top-full start-0 z-50 hidden w-[800px] pt-3 group-hover:block">
                <div className="h-[400px] cursor-default rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-2xl">
                  <h3 className="font-semibold text-foreground">
                    محتوى الفئات (Categories) يوضع هنا...
                  </h3>
                </div>
              </div>
            </div>

            {/* المصنعون المعتمدون */}
            <div className="group relative cursor-pointer py-1.5 transition-colors hover:text-primary">
              <span>{t("subheader.verified") || "Verified manufacturers"}</span>

              <div className="absolute top-full start-0 z-50 hidden w-[600px] pt-3 group-hover:block">
                <div className="h-[300px] cursor-default rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-2xl">
                  <h3 className="font-semibold text-foreground">
                    محتوى المصنعين يوضع هنا...
                  </h3>
                </div>
              </div>
            </div>

            {/* الدروب شيبينغ */}
            <div className="cursor-pointer py-1.5 transition-colors hover:text-primary">
              <span>{t("subheader.dropshipping") || "Dropshipping"}</span>
            </div>
          </div>

          {/* القسم الأيمن: الروابط المساعدة والموردين */}
          <div className="flex items-center gap-6 text-muted-foreground">
            <div className="cursor-pointer py-1.5 transition-colors hover:text-primary">
              <span>{t("subheader.about") || "About Alibaba.com"}</span>
            </div>

            {/* مركز المساعدة */}
            <div className="group relative cursor-pointer py-1.5 transition-colors hover:text-primary">
              <span>{t("subheader.help") || "Help Center"}</span>

              <div className="absolute top-full end-0 z-50 hidden w-[400px] pt-3 group-hover:block">
                <div className="cursor-default rounded-xl border border-border bg-popover p-6 text-popover-foreground shadow-2xl">
                  <h3 className="font-semibold text-foreground">
                    محتوى مركز المساعدة يوضع هنا...
                  </h3>
                </div>
              </div>
            </div>

            <div className="cursor-pointer py-1.5 transition-colors hover:text-primary">
              <span>{t("subheader.accio") || "Accio Work"}</span>
            </div>

            <div className="cursor-pointer py-1.5 transition-colors hover:text-primary">
              <span>{t("subheader.sell") || "Sell on Alibaba.com"}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
