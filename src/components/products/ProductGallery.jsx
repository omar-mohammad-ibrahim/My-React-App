import { useState } from "react";

export default function ProductGallery({ images = [] }) {
  const safeImages =
    images?.length > 0
      ? images
      : ["https://placehold.co/400x400?text=No+Image"];

  // نخزن فقط الصورة التي يختارها المستخدم يدوياً
  const [selectedImage, setSelectedImage] = useState(null);

  // إذا اختار المستخدم صورة وموجودة ضمن منتجنا الحالي نعرضها، وإلا نعرض أول صورة تلقائياً
  const mainImage =
    selectedImage && safeImages.includes(selectedImage)
      ? selectedImage
      : safeImages[0];

  return (
    <div className="bg-card text-card-foreground p-4 rounded-xl border border-border shadow-xs">
      {/* عرض الصورة الرئيسية */}
      <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden bg-background/50 flex items-center justify-center border border-border">
        <img
          src={mainImage}
          alt="Main product"
          className="object-contain w-full h-full max-h-[400px] transition-all duration-300"
        />
      </div>

      {/* شريط الصور المصغرة */}
      {safeImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {safeImages.map((img, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`shrink-0 w-16 h-16 rounded-md border-2 overflow-hidden transition-all duration-200 cursor-pointer ${
                mainImage === img
                  ? "border-primary opacity-100 shadow-xs"
                  : "border-border/60 opacity-60 hover:opacity-100 hover:border-border"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover w-full h-full bg-muted"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
