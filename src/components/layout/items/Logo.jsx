import { Link } from "react-router-dom";

export default function Logo({
  textSize = "text-xl sm:text-2xl md:text-3xl",
  className = "",
}) {
  return (
    <Link
      to="/"
      dir="ltr"
      className={`${textSize} font-black tracking-tight select-none inline-flex items-center leading-none ${className}`}
    >
      {/* كلمة Nexus ستبقى دائماً على اليسار */}
      <span className="text-foreground dark:text-white">Nexus</span>

      {/* كلمة Trade ستبقى دائماً على اليمين */}
      <span className="text-primary">Trade</span>
    </Link>
  );
}
