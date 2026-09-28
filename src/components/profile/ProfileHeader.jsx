import { useTranslation } from "react-i18next";

export default function ProfileHeader() {
  const { t } = useTranslation();

  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold text-foreground">
        {t("profile.headerTitle", "Profile")}
      </h1>
    </div>
  );
}
