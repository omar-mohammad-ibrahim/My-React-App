import { useTranslation } from "react-i18next";

export default function ContactInfo({ formData, isEditing }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 text-start">
      {/* قسم البريد الإلكتروني */}
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-1">
            {t("profile.email", "Email")}
          </h4>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {formData.email}
            </span>
            {!isEditing && formData.isEmailVerified && (
              <span className="bg-success/15 text-success border border-success/30 text-xs px-2 py-0.5 rounded-sm font-medium">
                {t("profile.verified", "Verified")}
              </span>
            )}
          </div>
        </div>
        {isEditing && (
          <button
            type="button"
            className="text-primary hover:underline text-sm font-medium cursor-pointer"
          >
            {t("profile.edit", "Edit")}
          </button>
        )}
      </div>

      {/* قسم رقم الهاتف */}
      <div className="flex items-start justify-between">
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-1">
            {t("profile.phoneNumber", "Phone number")}
          </h4>
          <span className="text-sm text-muted-foreground">
            {formData.phone || t("profile.noPhoneNumber", "No phone number")}
          </span>
        </div>
        {isEditing && (
          <button
            type="button"
            className="text-primary hover:underline text-sm font-medium cursor-pointer"
          >
            {formData.phone
              ? t("profile.edit", "Edit")
              : t("profile.add", "Add")}
          </button>
        )}
      </div>
    </div>
  );
}
