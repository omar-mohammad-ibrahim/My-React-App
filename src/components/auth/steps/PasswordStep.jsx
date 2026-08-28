import { useState, useRef, useEffect } from "react";
import Button from "../../ui/Button";

export default function OtpVerifyStep({ email, onVerify, onGoBack }) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(58);
  const inputsRef = useRef([]);

  // عداد تنازلي للرمز
  useEffect(() => {
    const countdown =
      timer > 0 && setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(countdown);
  }, [timer]);

  // إخفاء جزء من الإيميل مثل Alibaba (om***@gmail.com)
  const maskEmail = (str) => {
    if (!str) return "";
    const [name, domain] = str.split("@");
    const masked = name.slice(0, 3) + "***";
    return `${masked}@${domain}`;
  };

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // الانتقال التلقائي للخانة التالية
    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onVerify(otp.join(""));
  };

  return (
    <div className="w-full flex flex-col">
      <h1 className="text-2xl font-bold text-gray-900 mb-3 text-left">
        Verify your email
      </h1>

      <p className="text-xs text-gray-600 text-left mb-6 leading-relaxed">
        We've sent an email to{" "}
        <strong className="text-gray-900 font-semibold">
          {maskEmail(email)}
        </strong>
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* مربعات الإدخال الـ 6 */}
        <div className="flex justify-between gap-2">
          {otp.map((digit, idx) => (
            <input
              key={idx}
              ref={(el) => (inputsRef.current[idx] = el)}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e.target.value)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              className="w-11 h-12 text-center text-lg font-bold border border-gray-300 rounded-brand focus:border-gray-900 outline-none transition-colors"
            />
          ))}
        </div>

        {/* المؤقت وإعادة الإرسال */}
        <p className="text-xs text-gray-600 text-left">
          Didn't receive the code?{" "}
          {timer > 0 ? (
            <span className="text-gray-900 font-medium underline">
              Get a new one in {timer}s
            </span>
          ) : (
            <button
              type="button"
              onClick={() => setTimer(60)}
              className="text-primary font-semibold underline"
            >
              Resend code
            </button>
          )}
        </p>

        {/* أزرار الإجراءات */}
        <div className="flex flex-col gap-3 mt-4">
          <Button type="submit" className="w-full">
            Continue
          </Button>

          <Button
            type="button"
            variant="outline"
            onClick={onGoBack}
            className="w-full border-gray-900 text-gray-900 hover:bg-gray-50"
          >
            Go back
          </Button>
        </div>
      </form>
    </div>
  );
}
