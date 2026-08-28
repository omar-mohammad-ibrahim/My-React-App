import { useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import SocialButton from "../../ui/SocialButton";

export default function IdentifierStep({ onProceed, onSocialLogin }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError(t("auth.emailError"));
      return;
    }
    setError("");
    onProceed(email);
  };

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 text-start">
        {t("auth.signInOrCreate")}
      </h1>

      {/* أزرار التواصل الاجتماعي */}
      <div className="flex flex-col gap-3 w-full">
        <SocialButton
          provider="google"
          onClick={() => onSocialLogin("google")}
        />
        <SocialButton
          provider="facebook"
          onClick={() => onSocialLogin("facebook")}
        />
        <SocialButton
          provider="linkedin"
          onClick={() => onSocialLogin("linkedin")}
        />
      </div>

      {/* فاصل OR */}
      <div className="relative my-6 text-center">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <span className="relative bg-white px-3 text-xs text-gray-400 uppercase tracking-wider">
          {t("auth.or")}
        </span>
      </div>

      {/* نموذج إدخال البريد */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          placeholder={t("auth.emailPlaceholder")}
          type="email"
          value={email}
          error={error}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
        />

        <Button type="submit" className="w-full mt-2">
          {t("auth.continue")}
        </Button>
      </form>
    </div>
  );
}
