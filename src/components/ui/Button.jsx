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
  // 1. تم دمج whitespace-nowrap لمنع كسر السطر نهائياً، مع shrink-0 ومقاسات متجاوبة
  const baseStyles =
    "whitespace-nowrap shrink-0 px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm rounded-full font-bold transition-all duration-200 inline-flex justify-center items-center gap-2 text-center select-none leading-none";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary-hover shadow-primary-glow",

    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary-hover",

    danger: "bg-danger text-destructive-foreground hover:bg-danger-hover",

    outline:
      "border-2 border-primary text-primary hover:bg-accent hover:text-accent-foreground",

    gradient:
      "bg-brand-gradient text-primary-foreground hover:opacity-95 shadow-primary-glow",

    // نمط علي بابا: إطار أسود/داكن وخلفية شفافة، وعند الـ Hover يتحول لبرتقالي ممتلئ بكتابة بيضاء
    NexusTrade:
      "border border-foreground/90 bg-transparent text-foreground hover:bg-primary hover:border-primary hover:text-white",
  };

  const disabledStyles = disabled
    ? "opacity-60 cursor-not-allowed pointer-events-none"
    : "cursor-pointer hover:-translate-y-0.5 active:scale-95";

  const combinedClasses = `${baseStyles} ${
    variants[variant] || variants.primary
  } ${disabledStyles} ${className}`;

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
