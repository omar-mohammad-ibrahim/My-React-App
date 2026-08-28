import { FiChevronDown } from "react-icons/fi";
import Logo from "../layout/items/Logo";

export default function AuthHeader() {
  return (
    <header className="w-full max-w-7xl mx-auto px-6 py-4 flex items-center ">
      {/* شعار المتجر */}
      <div className="flex items-center gap-1 cursor-pointer">
        <Logo />
      </div>

      {/* محدد اللغة */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-brand text-xs font-medium text-gray-700 hover:border-gray-400 cursor-pointer transition-colors">
        <span>English</span>
        <FiChevronDown className="text-gray-500 text-sm" />
      </div>
    </header>
  );
}
