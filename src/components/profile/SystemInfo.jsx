import { useState } from "react";
import { Copy, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import CountryFlag from "@/components/common/CountryFlag";

export default function SystemInfo({ formData, isEditing }) {
  const { t } = useTranslation();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(formData.memberId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2 text-sm mt-4 text-start">
      {/* Member ID */}
      <div className="flex items-center text-muted-foreground">
        <span className="w-48 text-muted-foreground">
          {t("profile.memberId", "Member ID")}
        </span>
        <span className="text-foreground font-medium">{formData.memberId}</span>
        {isEditing ? (
          <button
            onClick={handleCopy}
            type="button"
            className="ms-auto text-primary hover:underline text-xs cursor-pointer"
          >
            {copied
              ? t("profile.copied", "Copied!")
              : t("profile.copy", "Copy")}
          </button>
        ) : (
          <button
            onClick={handleCopy}
            type="button"
            className="ms-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <Copy className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Country of registration */}
      <div className="flex items-center text-muted-foreground">
        <span className="w-48 text-muted-foreground flex items-center gap-1">
          {t("profile.countryOfRegistration", "Country of registration")}{" "}
          {isEditing && <Info className="w-3 h-3 text-muted-foreground" />}
        </span>
        <span className="flex items-center gap-2 text-foreground font-medium">
          <CountryFlag
            code={formData.country === "Jordan" ? "JO" : formData.country}
            className="w-5 h-3.5 shrink-0"
          />
          <span>{formData.country}</span>
          {!isEditing && <Info className="w-4 h-4 text-muted-foreground" />}
        </span>
      </div>

      {/* Year joined */}
      {!isEditing && (
        <div className="flex items-center text-muted-foreground">
          <span className="w-48 text-muted-foreground">
            {t("profile.yearJoined", "Year joined")}
          </span>
          <span className="text-foreground font-medium">
            {formData.yearJoined}
          </span>
        </div>
      )}
    </div>
  );
}
