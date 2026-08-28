import { FcGoogle } from "react-icons/fc"; // أيقونة جوجل الملونة الرسمية
import { FaFacebook, FaLinkedin } from "react-icons/fa"; // أيقونات فيسبوك ولينكد إن
import { useTranslation } from "react-i18next";

export default function SocialButton({ provider, onClick }) {
  const { t } = useTranslation();
  // تحديد الأيقونة والنص ولون الأيقونة بناءً على نوع المزود
  const config = {
    google: {
      text: t("auth.continueWithGoogle"),
      icon: <FcGoogle className="text-xl" />,
    },
    facebook: {
      text: t("auth.continueWithFacebook"),
      icon: <FaFacebook className="text-xl text-[#1877F2]" />,
    },
    linkedin: {
      text: t("auth.continueWithLinkedIn"),
      icon: <FaLinkedin className="text-xl text-[#0A66C2]" />,
    },
  };

  const current = config[provider] || config.google;

  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-center relative py-2.5 px-4 border border-gray-300 rounded-brand bg-white text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors duration-200 cursor-pointer"
    >
      {/* الأيقونة في أقصى اليسار */}
      <span className="absolute left-4 flex items-center">{current.icon}</span>

      {/* النص في المنتصف */}
      <span>{current.text}</span>
    </button>
  );
}
