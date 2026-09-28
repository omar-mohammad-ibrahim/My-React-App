import { useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./items/Logo";
import SearchBar from "./items/SearchBar";
import ThemeToggle from "./items/ThemeToggle";
import SubNavbar from "./SubNavbar";

import LocationDropdown from "./dropdowns/LocationDropdown";
import LanguageAndCurrencyDropdown from "./dropdowns/LanguageAndCurrencyDropdown";
import MessagesDropdown from "./dropdowns/MessagesDropdown";
import OrdersDropdown from "./dropdowns/OrdersDropdown";
import CartDropdown from "./dropdowns/CartDropdown";
import ProfileDropdown from "./dropdowns/ProfileDropdown";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card text-foreground shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-3 py-2 sm:gap-4 sm:px-6 lg:gap-6">
        {/* زر القائمة للموبايل + الشعار */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className=" hidden flex items-center justify-center p-1.5 rounded-lg text-foreground hover:bg-muted md:hidden cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

          <div className="shrink-0 scale-90 sm:scale-100 origin-start">
            <Logo />
          </div>
        </div>

        {/* شريط البحث: مرن ويمتلك min-w-0 لمنع كسر السطر في الشاشات الصغيرة */}
        <div className="flex-1 min-w-0 max-w-2xl lg:max-w-3xl px-1">
          <SearchBar />
        </div>

        {/* عناصر التحكم والتنقل */}
        <nav className="flex shrink-0 items-center gap-1 sm:gap-3 lg:gap-4 text-foreground">
          {/* الدولة واللغة تظهر في الشاشات الكبيرة فقط */}
          <div className="hidden md:flex items-center">
            <LocationDropdown />
          </div>
          <div className="hidden lg:flex items-center">
            <LanguageAndCurrencyDropdown />
          </div>
          <div className="hidden sm:flex items-center">
            {" "}
            <ThemeToggle />
          </div>

          {/* الرسائل والطلبات */}
          <div className="hidden sm:flex items-center">
            <MessagesDropdown />
          </div>
          <div className="hidden sm:flex items-center">
            <OrdersDropdown />
          </div>

          {/* السلة والبروفايل تظل دائماً ظاهرة كعناصر رئيسية */}
          <div className="hidden sm:flex items-center">
            <CartDropdown />
          </div>
          <div className="hidden sm:flex items-center">
            <ProfileDropdown />
          </div>
        </nav>
      </div>

      {/* شريط الأقسام الفرعي */}
      <SubNavbar />

      {/* قائمة منسدلة خاصة بالموبايل تجمع الخيارات المخفية عند الضغط على الـ Hamburger */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-card p-4 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between py-2 border-b border-border/60">
            <span className="text-xs font-semibold text-muted-foreground">
              Regional Settings
            </span>
            <div className="flex items-center gap-2">
              <LocationDropdown />
              <LanguageAndCurrencyDropdown />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
            <div className="p-2 rounded-lg bg-muted/50 flex items-center gap-2">
              <MessagesDropdown />
              <span>Messages</span>
            </div>
            <div className="p-2 rounded-lg bg-muted/50 flex items-center gap-2">
              <OrdersDropdown />
              <span>Orders</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
