import Logo from "../layout/items/Logo";
import LanguageSelector from "../ui/LanguageSelector"; // استيراد نفس المكون

export default function AuthHeader() {
  return (
    <header className="w-full max-w-7xl mx-auto px-8 py-5 flex items-center gap-6">
      {/* شعار المتجر */}
      <div className=" cursor-pointer">
        <Logo />
      </div>

      {/* محدد اللغة المشترك */}
      <LanguageSelector />
    </header>
  );
}
