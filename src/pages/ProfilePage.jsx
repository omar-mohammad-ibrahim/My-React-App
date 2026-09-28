import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pencil, Camera } from "lucide-react";
import { useTranslation } from "react-i18next";

import { updateUserProfile } from "@/features/auth/authSlice";

import ProfileHeader from "@/components/profile/ProfileHeader";
import UserDetails from "@/components/profile/UserDetails";
import SystemInfo from "@/components/profile/SystemInfo";
import ContactInfo from "@/components/profile/ContactInfo";
import Button from "@/components/ui/Button";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { user } = useSelector((state) => state.auth || {});

  const joinYear = user?.createdAt
    ? new Date(user.createdAt).getFullYear()
    : "2026";

  const getInitialData = () => ({
    firstName: user?.firstName || user?.displayName?.split(" ")[0] || "Omar",
    lastName:
      user?.lastName ||
      user?.displayName?.split(" ").slice(1).join(" ") ||
      "Ibrahim",
    memberId: user?.uid || "jo29084111744wyul",
    country: user?.country || "Jordan",
    yearJoined: joinYear,
    email: user?.email || "omaribrahim9070@gmail.com",
    isEmailVerified: true,
    phone: user?.phone || "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(getInitialData);

  useEffect(() => {
    if (user && !isEditing) {
      setFormData(getInitialData());
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = () => {
    dispatch(
      updateUserProfile({
        uid: user?.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      }),
    );
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(getInitialData());
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground py-8 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <ProfileHeader />

        <div className="bg-card text-card-foreground rounded-2xl border border-border shadow-xs overflow-hidden">
          {/* رأس الكرت */}
          <div className="px-6 py-4 border-b border-border flex justify-between items-center bg-muted/40">
            <h2 className="text-base font-bold flex items-center gap-2 text-foreground">
              <span className="text-lg">📰</span>
              {t("profile.basicInfo", "Basic information")}
            </h2>

            {!isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                aria-label="Edit Profile"
                className="p-1.5 rounded-lg text-muted-foreground hover:text-primary hover:bg-muted transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <Pencil className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8 text-center sm:text-start">
              <div className="relative group cursor-pointer shrink-0">
                <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-extrabold text-primary border border-primary/20 select-none shadow-xs">
                  {formData.firstName?.charAt(0)?.toUpperCase() || "U"}
                </div>
                {isEditing && (
                  <div className="absolute bottom-0 end-0 bg-card p-1.5 rounded-full border border-border shadow-xs text-muted-foreground hover:text-foreground transition-colors">
                    <Camera className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>

              <div className="flex-1 w-full space-y-4">
                <UserDetails
                  formData={formData}
                  isEditing={isEditing}
                  onInputChange={handleInputChange}
                />
                <SystemInfo formData={formData} isEditing={isEditing} />
              </div>
            </div>

            <div className="border-t border-border my-6" />

            <ContactInfo formData={formData} isEditing={isEditing} />

            {/* أزرار الحفظ والإلغاء */}
            {isEditing && (
              <div className="mt-8 pt-6 border-t border-border flex justify-end items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleCancel}
                  className="h-10 px-5 text-sm"
                >
                  {t("profile.cancel", "Cancel")}
                </Button>

                <Button
                  type="button"
                  variant="primary"
                  onClick={handleSave}
                  className="h-10 px-6 text-sm shadow-sm"
                >
                  {t("profile.saveChanges", "Save changes")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
