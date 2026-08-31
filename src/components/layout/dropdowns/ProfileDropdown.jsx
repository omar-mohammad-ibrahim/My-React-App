import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { User } from "lucide-react";
import { logout } from "../../../features/auth/authSlice";
import { useTranslation } from "react-i18next";

export default function ProfileDropdown() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className="group relative flex cursor-pointer items-center gap-1.5 hover:text-[#eb5b00]">
      <User className="h-6 w-6" strokeWidth={1.5} />

      {isAuthenticated ? (
        <div className="flex flex-col">
          <span className="text-xs text-gray-500 leading-tight">
            {t("navbar.welcome") || "Welcome,"}
          </span>
          <span className="text-sm font-bold truncate max-w-[80px]">
            {user?.firstName || user?.displayName?.split(" ")[0] || "User"}
          </span>

          <div className="absolute end-0 top-full hidden pt-3 group-hover:block z-50 w-60">
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-2xl text-gray-900 cursor-default">
              <p className="text-sm mb-4">
                {t("navbar.account") || "Account:"}{" "}
                <span className="font-bold truncate block">{user.email}</span>
              </p>
              <button
                onClick={() => dispatch(logout())}
                className="w-full text-center py-2 text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
              >
                {t("navbar.signOut") || "Sign out"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <Link
            to="/auth"
            className="text-sm font-medium pt-1 hover:text-[#eb5b00]"
          >
            {t("navbar.signIn") || "Sign in"}
          </Link>

          <div className="absolute ltr:right-0 rtl:left-0 top-full hidden pt-4 group-hover:block z-50 w-72">
            <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-2xl cursor-default text-gray-900">
              <h4 className="font-bold mb-4">
                {t("navbar.signInToContinue") || "Sign back in to continue"}
              </h4>
              <Link to="/auth">
                <button className="w-full bg-[#eb5b00] text-white py-2.5 rounded-full font-bold mb-3 hover:bg-[#d45100] transition-colors cursor-pointer">
                  {t("navbar.signIn") || "Sign in"}
                </button>
              </Link>
              <div className="text-xs text-gray-500 text-center">
                {t("navbar.noAccount") || "Don't have an account?"}{" "}
                <Link
                  to="/auth"
                  className="text-gray-900 underline font-semibold hover:text-[#eb5b00]"
                >
                  {t("navbar.register") || "Register"}
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
