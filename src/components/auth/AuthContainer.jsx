import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../features/auth/authSlice";
import { authService } from "../../services/authService"; // الاستيراد الوحيد للباك اند

import IdentifierStep from "./steps/IdentifierStep";
import PasswordStep from "./steps/PasswordStep";
import AccountTypeStep from "./steps/AccountTypeStep";
import OtpVerifyStep from "./steps/OtpVerifyStep";
import AccountSetupStep from "./steps/AccountSetupStep";

const formatUserData = (firebaseUser, role = "Buyer", extraData = {}) => ({
  uid: firebaseUser.uid,
  email: firebaseUser.email,
  displayName:
    firebaseUser.displayName ||
    `${extraData.firstName || ""} ${extraData.lastName || ""}`.trim(),
  photoURL: firebaseUser.photoURL || "",
  token: firebaseUser.accessToken,
  role: role,
  country: extraData.country || "Jordan",
});

export default function AuthContainer() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [step, setStep] = useState("IDENTIFIER");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Buyer",
  });
  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailSubmit = async (email) => {
    const cleanEmail = email.trim().toLowerCase();
    setFormData((prev) => ({ ...prev, email: cleanEmail }));
    setIsLoading(true);
    setAuthError("");

    try {
      const result = await authService.checkEmail(cleanEmail);
      if (result.exists) {
        setFormData((prev) => ({ ...prev, role: result.role }));
        setStep("PASSWORD");
      } else {
        setStep("ACCOUNT_TYPE");
      }
    } catch {
      setStep("ACCOUNT_TYPE");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordSubmit = async (password) => {
    setFormData((prev) => ({ ...prev, password }));
    setAuthError("");
    try {
      const { user, role } = await authService.login(formData.email, password);
      dispatch(loginUser(formatUserData(user, role)));
      navigate("/");
    } catch (error) {
      setAuthError("Your account name or password is incorrect.");
    }
  };

  const handleSocialLogin = async (providerName) => {
    try {
      const { user, role } = await authService.socialLogin(providerName);
      dispatch(loginUser(formatUserData(user, role)));
      navigate("/");
    } catch (error) {
      alert("Social login failed: " + error.message);
    }
  };

  const handleRoleSelect = async (role) => {
    setFormData((prev) => ({ ...prev, role }));
    try {
      await authService.registerInitial(formData.email, role);
      setStep("OTP");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("Email already registered! Please sign in.");
        setStep("PASSWORD");
      } else alert("Error: " + error.message);
    }
  };

  const handleCheckVerify = async () => {
    const isVerified = await authService.verifyStatus();
    if (isVerified) setStep("ACCOUNT_SETUP");
    else
      alert(
        "Please verify your email using the link sent to your inbox first.",
      );
  };

  const handleAccountSetupComplete = async (setupData) => {
    setIsLoading(true);
    try {
      const { user, role, country, firstName, lastName } =
        await authService.finalizeAccount(
          formData.email,
          formData.role,
          setupData,
        );
      dispatch(
        loginUser(formatUserData(user, role, { firstName, lastName, country })),
      );
      navigate("/");
    } catch (error) {
      alert("Setup failed: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white">
      {step === "IDENTIFIER" && (
        <IdentifierStep
          onProceed={handleEmailSubmit}
          onSocialLogin={handleSocialLogin}
          isLoading={isLoading}
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
          onCheckVerify={handleCheckVerify}
          onResendLink={authService.resendLink}
          onGoBack={() => setStep("ACCOUNT_TYPE")}
        />
      )}
      {step === "ACCOUNT_SETUP" && (
        <AccountSetupStep
          onComplete={handleAccountSetupComplete}
          isSubmitting={isLoading}
        />
      )}
    </div>
  );
}
