import { useState } from "react";
import IdentifierStep from "./steps/IdentifierStep";
import PasswordStep from "./steps/PasswordStep";
import AccountTypeStep from "./steps/AccountTypeStep";
import OtpVerifyStep from "./steps/OtpVerifyStep";

export default function AuthContainer() {
  const [step, setStep] = useState("IDENTIFIER"); // 'IDENTIFIER' | 'PASSWORD' | 'ACCOUNT_TYPE' | 'OTP'
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Buyer",
    otp: "",
  });
  const [authError, setAuthError] = useState("");

  // 1. معالجة إدخال الإيميل
  const handleEmailSubmit = (email) => {
    setFormData((prev) => ({ ...prev, email }));

    // محاكاة الفحص: إذا كان الإيميل يبدأ بـ 'new' نعتبره حساباً جديداً
    if (email.startsWith("new")) {
      setStep("ACCOUNT_TYPE");
    } else {
      setStep("PASSWORD");
    }
  };

  // 2. معالجة تسجيل الدخول بكلمة المرور
  const handlePasswordSubmit = (password) => {
    setFormData((prev) => ({ ...prev, password }));

    if (password !== "123456") {
      setAuthError("Your account name or password is incorrect.");
    } else {
      setAuthError("");
      alert("Login Successful!");
    }
  };

  // 3. معالجة اختيار الدور
  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
    setStep("OTP");
  };

  // 4. معالجة رمز التحقق
  const handleOtpVerify = (otpCode) => {
    setFormData((prev) => ({ ...prev, otp: otpCode }));
    alert(`Account created successfully as ${formData.role}!`);
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-brand shadow-sm border border-gray-100">
      {step === "IDENTIFIER" && (
        <IdentifierStep
          onProceed={handleEmailSubmit}
          onSocialLogin={(provider) => console.log("Social login:", provider)}
        />
      )}

      {step === "PASSWORD" && (
        <PasswordStep
          email={formData.email}
          onSubmit={handlePasswordSubmit}
          onSwitchToRegister={() => setStep("ACCOUNT_TYPE")}
          authError={authError}
        />
      )}

      {step === "ACCOUNT_TYPE" && (
        <AccountTypeStep
          onSelectRole={handleRoleSelect}
          onBackToLogin={() => setStep("PASSWORD")}
        />
      )}

      {step === "OTP" && (
        <OtpVerifyStep
          email={formData.email}
          onVerify={handleOtpVerify}
          onGoBack={() => setStep("ACCOUNT_TYPE")}
        />
      )}
    </div>
  );
}
