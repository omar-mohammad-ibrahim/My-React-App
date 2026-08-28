import { Link } from "react-router-dom";

export default function CreateAccountButton() {
  return (
    <Link
      to="/auth"
      className="rounded-lg bg-orange-600 px-3.5 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-700 shadow-sm"
    >
      إنشاء حساب
    </Link>
  );
}
