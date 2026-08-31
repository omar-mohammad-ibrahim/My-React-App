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
    <section className="border-b border-gray-200 mb-5 pb-9 bg-gray-50 py-4">
      <div className="container mx-auto flex max-w-7xl items-center justify-between px-4">
        <h2 className="text-xl font-bold tracking-wide text-gray-700">
          {t("welcome.title", { name: firstName })}
        </h2>

        <div className="hidden items-center gap-4 md:flex ">
          <Link
            to="#"
            className="group flex items-center gap-2 text-sm font-bold text-gray-700 transition-colors hover:text-[#eb5b00]"
          >
            <Target className="h-5 w-5 text-gray-500 group-hover:text-[#eb5b00]" />
            {t("welcome.rfq")}
          </Link>

          <span className="h-4 w-px bg-gray-300"></span>

          <Link
            to="#"
            className="group flex items-center gap-2 text-sm font-bold text-gray-700 transition-colors hover:text-[#eb5b00]"
          >
            <Award className="h-5 w-5 text-gray-500 group-hover:text-[#eb5b00]" />
            {t("welcome.top_ranking")}
          </Link>

          <span className="h-4 w-px bg-gray-300"></span>

          <Link
            to="#"
            className="group flex items-center gap-2 text-sm font-bold text-gray-700 transition-colors hover:text-[#eb5b00]"
          >
            <Settings2 className="h-5 w-5 text-gray-500 group-hover:text-[#eb5b00]" />
            {t("welcome.customization")}
          </Link>
        </div>
      </div>
    </section>
  );
}
