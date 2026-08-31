import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Button from "../../ui/Button";

export default function OtpVerifyStep({
  email,
  onCheckVerify,
  onResendLink,
  onGoBack,
}) {
  const { t } = useTranslation();
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const countdown =
      timer > 0 && setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  const maskEmail = (str) => {
    if (!str) return "";
    const [name, domain] = str.split("@");
    const masked = name.slice(0, 3) + "***";
    return `${masked}@${domain}`;
  };

  const handleCheck = async () => {
    setLoading(true);
    await onCheckVerify();
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="text-2xl font-bold text-gray-900 mb-3 text-start w-full">
        {t("auth.verifyEmailTitle") || "Verify your email"}
      </h1>

      <p className="text-xs text-gray-600 text-start w-full mb-8 leading-relaxed">
        {t("auth.sentEmailTo") || "We've sent a verification link to"}{" "}
        <strong className="text-gray-900 font-semibold" dir="ltr">
          {maskEmail(email)}
        </strong>
        <br />
        Please click the link in that email to continue.
      </p>

      <div className="flex flex-col gap-3 w-full">
        <Button onClick={handleCheck} className="w-full" disabled={loading}>
          {loading ? "Checking..." : "I have verified my email"}
        </Button>

        <Button
          type="button"
          variant="outline"
          onClick={onGoBack}
          className="w-full border-gray-900 text-gray-900 hover:bg-gray-50 cursor-pointer"
        >
          {t("auth.goBack") || "Go back"}
        </Button>
      </div>

      <p className="text-xs text-gray-600 text-center mt-6">
        {t("auth.didntReceiveCode") || "Didn't receive the link?"}{" "}
        {timer > 0 ? (
          <span className="text-gray-900 font-medium underline">
            {t("auth.getNewOneIn", { seconds: timer }) ||
              `Get a new one in ${timer}s`}
          </span>
        ) : (
          <button
            type="button"
            onClick={() => {
              setTimer(60);
              onResendLink();
            }}
            className="text-primary font-semibold underline cursor-pointer"
          >
            {t("auth.resendCode") || "Resend link"}
          </button>
        )}
      </p>
    </div>
  );
}
