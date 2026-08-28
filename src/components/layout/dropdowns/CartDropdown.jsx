/* داخل مكون النافذة نفسه (مثل CartDropdown.jsx) */
export default function CartDropdown() {
  return (
    <div className="relative w-80 rounded-xl border border-gray-100 bg-white p-4 shadow-xl">
      {/* السهم المتصل بالأيقونة في الأعلى */}
      <div className="absolute -top-2 left-6 h-3.5 w-3.5 rotate-45 border-t border-l border-gray-100 bg-white" />

      {/* محتوى النافذة */}
      <div>...</div>
    </div>
  );
}
