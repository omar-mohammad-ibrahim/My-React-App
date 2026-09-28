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
  const baseStyles =
    "px-6 py-3 rounded-full font-bold transition-all duration-200 flex justify-center items-center gap-2 text-center select-none";

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
    alibaba:
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

// export default function Input({
//   placeholder = "",
//   value,
//   onChange,
//   type = "text",
//   error = "",
//   disabled = false,
//   className = "",
//   ...props
// }) {
//   const borderStyles = error
//     ? "border-danger focus:border-danger"
//     : "border-gray-300 focus:border-gray-800";

//   return (
//     <div className={`w-full flex flex-col ${className}`}>
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         disabled={disabled}
//         placeholder={placeholder}
//         className={`w-full px-3.5 py-3 text-sm text-gray-900 bg-white rounded-brand border outline-hidden transition-colors duration-200 placeholder:text-gray-400 ${borderStyles} ${
//           disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : ""
//         }`}
//         {...props}
//       />

//       {error && (
//         <span className="text-danger text-xs mt-1.5 text-left font-normal">
//           {error}
//         </span>
//       )}
//     </div>
//   );
// }
