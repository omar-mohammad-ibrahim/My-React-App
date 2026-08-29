import React from "react";
import Logo from "./items/Logo";
import SearchBar from "./items/SearchBar";
import SubHeader from "./SubHeader";

// استيراد القوائم المنسدلة الجديدة
import LocationDropdown from "./dropdowns/LocationDropdown";
import LanguageDropdown from "./dropdowns/LanguageDropdown";
import MessagesDropdown from "./dropdowns/MessagesDropdown";
import OrdersDropdown from "./dropdowns/OrdersDropdown";
import CartDropdown from "./dropdowns/CartDropdown";
import ProfileDropdown from "./dropdowns/ProfileDropdown";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-8 px-4 py-3 sm:px-6">
        <Logo />

        <div className="flex-1 max-w-3xl">
          <SearchBar />
        </div>

        <nav className="flex items-center gap-6 text-gray-700">
          <LocationDropdown />
          <LanguageDropdown />
          <MessagesDropdown />
          <OrdersDropdown />
          <CartDropdown />
          <ProfileDropdown />
        </nav>
      </div>

      <SubHeader />
    </header>
  );
}
