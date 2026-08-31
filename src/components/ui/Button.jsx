export default function Button({
  children,
  onClick = () => {},
  type = "button",
  variant = "primary",
  disabled = false,
  className = "",
}) {
  const baseStyles =
    "px-6 py-3 rounded-brand font-bold transition-all duration-300 flex justify-center items-center gap-2";

  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:bg-primary-hover shadow-primary-glow",
    secondary:
      "bg-secondary text-secondary-foreground hover:bg-secondary-hover",
    danger: "bg-danger text-white hover:bg-danger-hover",
    outline: "border-2 border-primary text-primary hover:bg-primary-50",
    gradient:
      "bg-brand-gradient text-white hover:opacity-90 shadow-primary-glow",
  };

  const disabledStyles = disabled
    ? "opacity-60 cursor-not-allowed"
    : "cursor-pointer hover:-translate-y-0.5 active:scale-95";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variants[variant]} ${disabledStyles} ${className}`}
    >
      {children}
    </button>
  );
}
