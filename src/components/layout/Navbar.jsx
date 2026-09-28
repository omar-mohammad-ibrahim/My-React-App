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
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-card text-foreground shadow-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-3 py-2.5 sm:gap-4 sm:px-6 lg:gap-6">
        {/* 1. الشعار محمي من الانكماش والتشوه */}
        <div className="shrink-0">
          <Logo />
        </div>

        {/* 2. شريط البحث مرن مع min-w-0 للانكماش بسلاسة */}
        <div className="flex-1 min-w-0 max-w-2xl lg:max-w-3xl">
          <SearchBar />
        </div>

        {/* 3. القوائم والأيقونات بمسافات متجاوبة وحماية من الـ Shrink */}
        <nav className="flex shrink-0 items-center gap-1.5 sm:gap-3 lg:gap-4 text-foreground">
          {/* إخفاء خيارات الدولة واللغة على شاشات الهاتف وإظهارها بدءاً من التابلت فما فوق */}
          <div className="hidden md:flex items-center">
            <LocationDropdown />
          </div>
          <div className="hidden lg:flex items-center">
            <LanguageAndCurrencyDropdown />
          </div>

          <ThemeToggle />

          {/* الرسائل والطلبات تظهر من الشاشات المتوسطة فما فوق لمنع التزاحم */}
          <div className="hidden sm:flex items-center">
            <MessagesDropdown />
          </div>
          <div className="hidden sm:flex items-center">
            <OrdersDropdown />
          </div>

          {/* العربة والبروفايل عناصر أساسية تبقى ظاهرة دوماً */}
          <CartDropdown />
          <ProfileDropdown />
        </nav>
      </div>

      <SubNavbar />
    </header>
  );
}
