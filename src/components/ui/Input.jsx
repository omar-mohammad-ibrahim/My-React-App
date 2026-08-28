export default function Input({
  placeholder = "",
  value,
  onChange,
  type = "text",
  error = "",
  disabled = false,
  className = "",
  ...props
}) {
  // لون الحدود: أحمر عند وجود خطأ، ورمادي يتحول لأسود هادئ عند الضغط
  const borderStyles = error
    ? "border-danger focus:border-danger"
    : "border-gray-300 focus:border-gray-800";

  return (
    <div className={`w-full flex flex-col ${className}`}>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
        className={`w-full px-3.5 py-3 text-sm text-gray-900 bg-white rounded-brand border outline-none transition-colors duration-200 placeholder:text-gray-400 ${borderStyles} ${
          disabled ? "bg-gray-100 cursor-not-allowed opacity-60" : ""
        }`}
        {...props}
      />

      {/* رسالة الخطأ تظهر أسفل الحقل فوراً باللون الأحمر */}
      {error && (
        <span className="text-danger text-xs mt-1.5 text-left font-normal">
          {error}
        </span>
      )}
    </div>
  );
}
