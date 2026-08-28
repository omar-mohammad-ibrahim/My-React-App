import { useState } from "react";
import { Link } from "react-router-dom";

export default function NavDropdownItem({
  icon: Icon,
  label,
  to,
  badge,
  dropdown,
  align = "left-0",
}) {
  const [isOpen, setIsOpen] = useState(false);

  const triggerContent = (
    <div className="flex flex-col items-center justify-center gap-0.5 text-gray-700 hover:text-orange-600 transition cursor-pointer">
      <div className="relative">
        {Icon && <Icon className="h-5 w-5 stroke-[1.75]" />}

        {badge > 0 && (
          <span className="absolute -top-1.5 -right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-600 px-1 text-[10px] font-bold text-white">
            {badge}
          </span>
        )}
      </div>

      {label && (
        <span className="text-[11px] font-medium select-none">{label}</span>
      )}
    </div>
  );

  return (
    <div
      className="relative py-1.5"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {to ? <Link to={to}>{triggerContent}</Link> : triggerContent}

      {isOpen && dropdown && (
        <div className={`absolute top-full z-50 pt-2 ${align}`}>{dropdown}</div>
      )}
    </div>
  );
}
