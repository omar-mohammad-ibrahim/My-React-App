import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

import Logo from "./items/Logo";
import SearchBar from "./items/SearchBar";
function DeliverTo() {
  return (
    /* 1. الحاوية تأخذ group */
    <div className="">
      {/* زر العرض في الـ Navbar */}
      <div className="flex flex-col items-start leading-tight">
        <span className="text-[11px] text-gray-500">Deliver to:</span>
        <div className="flex items-center gap-1 text-gray-800">
          <span className="text-base">🇯🇴</span>
          <span className="text-xs">JO</span>
        </div>
      </div>

      {/* 2. القائمة المنبثقة: تظهر تلقائياً بدون State عند الـ Hover */}
      <div className="hidden group-hover:block absolute top-full left-0 z-50 pt-2">
        <div className="w-80 rounded-2xl border border-gray-100 bg-white p-5 shadow-xl">
          {/* محتوى كرت تحديد الموقع */}
        </div>
      </div>
    </div>
  );
}
import LanguageSelector from "./items/LanguageSelector";
import MessagesIcon from "./items/MessagesIcon";
import OrdersIcon from "./items/OrdersIcon";
import CartIcon from "./items/CartIcon";
import UserProfileDropdown from "./items/UserProfileDropdown";
import SignInLink from "./items/SignInLink";
import CreateAccountButton from "./items/CreateAccountButton";

import SubHeader from "./SubHeader";

export default function Navbar() {
  const { currentUser } = useAuth?.() || {};
  const [testLogin, setTestLogin] = useState(false);
  const isLoggedIn = currentUser || testLogin;

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-100 bg-white shadow-sm">
      {/* Main Header */}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-1 py-2.5 sm:px-6">
        <Logo />

        <SearchBar />

        <nav className="flex items-center gap-5 text-sm font-medium text-gray-700">
          <DeliverTo />
          <LanguageSelector />

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <MessagesIcon />
              <OrdersIcon />
              <CartIcon />
              <UserProfileDropdown />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <CartIcon />
              <SignInLink />
              <CreateAccountButton />
            </div>
          )}
        </nav>
      </div>
      {/* Sub Header */}
      <SubHeader />
    </header>
  );
}
