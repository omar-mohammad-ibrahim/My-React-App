import { useTranslation } from "react-i18next";

export default function UserDetails({ formData, isEditing, onInputChange }) {
  const { t } = useTranslation();

  if (isEditing) {
    return (
      <div className="grid grid-cols-2 gap-4 max-w-md mb-4 pt-1 text-start">
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            {t("profile.firstName", "First name")}{" "}
            <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={onInputChange}
            className="w-full border border-border bg-background text-foreground rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-ring focus:border-ring outline-none transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-muted-foreground mb-1">
            {t("profile.lastName", "Last name")}{" "}
            <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={onInputChange}
            className="w-full border border-border bg-background text-foreground rounded-lg px-3 py-2 text-sm focus:ring-1 focus:ring-ring focus:border-ring outline-none transition-colors"
          />
        </div>
      </div>
    );
  }

  return (
    <h3 className="text-xl font-bold text-foreground mb-2 pt-1 text-start">
      {formData.firstName} {formData.lastName}
    </h3>
  );
}
