import { Link } from "react-router-dom";

export default function Button({
  children,
  to,
  onClick = () => {},
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) {
  // استخدام الرموز الهندسية المعرفة في ملف CSS:
  // rounded-brand مشتقة من var(--radius-brand)
  const baseStyles =
    "px-6 py-3 rounded-full font-bold transition-all duration-300 flex justify-center items-center gap-2 text-center select-none";

  // ربط الأنماط مباشرة مع الرموز المستخرجة من oklch في @theme inline
  const variants = {
    // 1. الأساسي مع الظل المتوهج وحالة الـ hover المعرفة لديك
    primary:
      "bg-primary text-primary-foreground hover:bg-primary-hover shadow-primary-glow",

    // 2. الثانوي المرتبط بأسطح النظام الداعمة
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary-hover",

    // 3. حالات التحذير والخطر
    danger: "bg-danger text-destructive-foreground hover:bg-danger-hover",

    // 4. الإطار الخارجي المتصل بحدود الـ primary وحالة التركيز
    outline:
      "border-2 border-primary text-primary hover:bg-accent hover:text-accent-foreground",

    // 5. التدرج اللوني للعلامة التجارية المعرف في CSS مع الظل المتوهج
    gradient:
      "bg-brand-gradient text-primary-foreground hover:opacity-95 shadow-primary-glow",
  };

  // معالجة حالة التعطيل والتفاعل الحركي
  const disabledStyles = disabled
    ? "opacity-60 cursor-not-allowed pointer-events-none"
    : "cursor-pointer hover:-translate-y-0.5 active:scale-95";

  const combinedClasses = `${baseStyles} ${
    variants[variant] || variants.primary
  } ${disabledStyles} ${className}`;

  // إذا تم تمرير مسار، يتحول المكون إلى رابط React Router
  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      {children}
    </button>
  );
}
