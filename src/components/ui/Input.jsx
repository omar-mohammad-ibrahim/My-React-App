import * as React from "react";
import { cn } from "@/lib/utils"; // أو المسار الذي تعتمد فيه دالة cn لديك

const Input = React.forwardRef(
  (
    { className, type = "text", error, containerClassName = "", ...props },
    ref,
  ) => {
    const inputElement = (
      <input
        type={type}
        ref={ref}
        data-slot="input"
        aria-invalid={Boolean(error)}
        className={cn(
          "h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-2.5 py-1 text-sm shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          className,
        )}
        {...props}
      />
    );

    // إذا وُجد خطأ، يتم تغليفه لعرض رسالة الخطأ كما في كودك القديم
    if (error) {
      return (
        <div className={cn("w-full flex flex-col", containerClassName)}>
          {inputElement}
          <span className="text-destructive text-xs mt-1.5 text-left font-normal">
            {error}
          </span>
        </div>
      );
    }

    // إذا لم يوجد خطأ، يُرجع الـ input مباشرة ليعمل بمرونة تامة داخل الفلاتر والـ flexbox
    return inputElement;
  },
);

Input.displayName = "Input";

// دعم الطريقتين في الاستدعاء لضمان عدم حدوث أي خطأ في الصفحات القديمة
export { Input };
export default Input;
