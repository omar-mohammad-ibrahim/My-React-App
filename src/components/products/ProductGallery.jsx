import { useState } from "react";

export default function ProductGallery({ images }) {
  // الصورة الرئيسية الافتراضية هي أول صورة في المصفوفة
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
      {/* عرض الصورة الرئيسية */}
      <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden bg-white flex items-center justify-center border border-gray-100">
        <img
          src={mainImage}
          alt="Main product"
          className="object-contain w-full h-full max-h-[400px]"
        />
      </div>

      {/* شريط الصور المصغرة (يظهر فقط إذا كان هناك أكثر من صورة) */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setMainImage(img)}
              className={`shrink-0 w-16 h-16 rounded-md border-2 overflow-hidden transition-all duration-200 ${
                mainImage === img
                  ? "border-[#eb5b00] opacity-100"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index + 1}`}
                className="object-cover w-full h-full bg-gray-50"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
