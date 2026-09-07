import { useTranslation } from "react-i18next";
import { Camera, Search } from "lucide-react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

export default function SearchBar() {
  const { t } = useTranslation();

  return (
    <div className="w-full max-w-2xl rounded-full bg-brand-gradient p-[2px] shadow-xs">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="flex w-full items-center gap-2 rounded-full bg-white px-2 py-1.5"
      >
        <input
          type="text"
          placeholder={
            t("searchBar.placeholder") || "What are you looking for?"
          }
          className="flex-1 border-none bg-transparent px-3 py-1.5 text-base text-black outline-hidden"
        />

        <button type="button">
          <Camera className="text-gray-500 hover:fill-gray-600 hover:text-white" />
        </button>

        <button
          type="submit"
          className="flex items-center gap-1 rounded-full bg-brand-gradient-reverse px-3 py-1.5 text-white"
        >
          <Search className="h-4 w-4" /> {t("searchBar.button") || "Search"}
        </button>
      </form>
    </div>
  );
}
