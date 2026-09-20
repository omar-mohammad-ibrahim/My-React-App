const BASE_URL = "http://localhost:5000/products";

export const productService = {
  // 1. GET: قراءة كل المنتجات
  async getAll() {
    const res = await fetch(BASE_URL);
    if (!res.ok) throw new Error(`فشل الجلب: رمز الحالة ${res.status}`);
    return await res.json();
  },

  // 2. GET (By ID): قراءة منتج محدد لصفحة التفاصيل (PDP)
  async getById(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) throw new Error("المنتج غير موجود");
    return await res.json();
  },

  // 3. GET (By Category): جلب منتجات قسم معين عند النقر على فتات الخبز (PLP)
  async getByCategory(category) {
    const url = category ? `${BASE_URL}?category=${category}` : BASE_URL;
    const res = await fetch(url);
    if (!res.ok) throw new Error("فشل تحميل منتجات هذا القسم");
    return await res.json();
  },

  // 4. POST: إنشاء وإضافة منتج جديد
  async create(newProductData) {
    const res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProductData),
    });
    if (!res.ok) throw new Error("فشلت عملية إضافة المنتج");
    return await res.json();
  },

  // 5. PATCH: تعديل جزئي (مثل تعديل السعر فقط)
  async updatePrice(id, newPrice) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price: Number(newPrice) }),
    });
    if (!res.ok) throw new Error("فشل تعديل السعر");
    return await res.json();
  },

  // 6. DELETE: حذف منتج نهائياً
  async delete(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) throw new Error("فشلت عملية الحذف");
    return true;
  },
};
