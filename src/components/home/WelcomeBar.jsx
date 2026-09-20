import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Target, Award, Settings2 } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function WelcomeBar() {
  const { t } = useTranslation();

  const { user } = useSelector((state) => state.auth || {});

  const rawName = user?.firstName || user?.name || "Omar";
  const firstName = rawName.split(" ")[0];

  return (
    <section className="border-b border-border bg-muted/40 py-7 mb-6 transition-colors ">
      <div className="container max-w-7xl flex items-center justify-between">
        {/* عنوان الترحيب */}
        <h2 className="text-xl font-bold tracking-wide text-foreground">
          {t("welcome.title", { name: firstName })}
        </h2>

        {/* روابط الخدمات السريعة */}
        <div className="hidden items-center gap-5 md:flex">
          <Link
            to="#"
            className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <Target className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            {t("welcome.rfq")}
          </Link>

          <span className="h-4 w-px bg-border"></span>

          <Link
            to="#"
            className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <Award className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            {t("welcome.top_ranking")}
          </Link>

          <span className="h-4 w-px bg-border"></span>

          <Link
            to="#"
            className="group flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
          >
            <Settings2 className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary" />
            {t("welcome.customization")}
          </Link>
        </div>
      </div>
    </section>
  );
}
