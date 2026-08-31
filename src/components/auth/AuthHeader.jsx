import Logo from "../layout/items/Logo";
import LanguageSelector from "../ui/LanguageSelector";

export default function AuthHeader() {
  return (
    <header className="w-full max-w-7xl mx-auto px-8 py-5 flex items-center gap-6">
      <div className=" cursor-pointer">
        <Logo />
      </div>

      <LanguageSelector />
    </header>
  );
}
