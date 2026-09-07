import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Pencil, Camera } from "lucide-react";

import { updateUserProfile } from "../features/auth/authSlice";

import ProfileHeader from "../components/profile/ProfileHeader";
import UserDetails from "../components/profile/UserDetails";
import SystemInfo from "../components/profile/SystemInfo";
import ContactInfo from "../components/profile/ContactInfo";

export default function ProfilePage() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth || {});

  const joinYear = user?.createdAt
    ? new Date(user.createdAt).getFullYear()
    : "2026";

  const initialData = {
    firstName: user?.firstName || "Omar",
    lastName: user?.lastName || "Ibrahim",
    memberId: user?.uid || "jo29084111744wyul",
    country: user?.country || "Jordan",
    yearJoined: joinYear,
    email: user?.email || "omaribrahim9070@gmail.com",
    isEmailVerified: true,
    phone: user?.phone || "",
  };

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(initialData);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(
      updateUserProfile({
        uid: user.uid,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      }),
    );

    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData(initialData);
    setIsEditing(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ProfileHeader />

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span className="text-gray-500 text-xl">📰</span> Basic
              information
            </h2>
            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-500 hover:text-[#eb5b00] transition-colors"
              >
                <Pencil className="w-5 h-5" />
              </button>
            )}
          </div>

          <div className="p-6">
            <div className="flex items-start gap-6 mb-8">
              <div className="relative group cursor-pointer shrink-0">
                <div className="w-20 h-20 rounded-full bg-orange-50 flex items-center justify-center text-3xl font-bold text-[#eb5b00] border border-orange-100">
                  {formData.firstName.charAt(0).toUpperCase()}
                </div>
                {isEditing && (
                  <div className="absolute bottom-0 right-0 bg-white p-1 rounded-full border border-gray-200 shadow-xs">
                    <Camera className="w-4 h-4 text-gray-600" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <UserDetails
                  formData={formData}
                  isEditing={isEditing}
                  onInputChange={handleInputChange}
                />
                <SystemInfo formData={formData} isEditing={isEditing} />
              </div>
            </div>

            <div className="border-t border-gray-100 my-6"></div>

            <ContactInfo formData={formData} isEditing={isEditing} />

            {isEditing && (
              <div className="mt-8 pt-6 border-t border-gray-100 flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="px-5 py-2 border border-gray-300 rounded-full text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="px-5 py-2 bg-gray-500 text-white rounded-full text-sm font-medium hover:bg-gray-600 transition-colors"
                >
                  Save changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
