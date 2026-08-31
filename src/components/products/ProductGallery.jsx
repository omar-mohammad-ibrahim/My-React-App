import { useState } from "react";

export default function ProductGallery({ images }) {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      {/* الصورة الرئيسية */}
      <div className="aspect-square w-full mb-4 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 flex items-center justify-center">
        <img
          src={mainImage}
          alt="Product"
          className="object-contain w-full h-full"
        />
      </div>

      {/* الصور المصغرة */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setMainImage(img)}
              className={`flex-shrink-0 w-16 h-16 rounded-md border-2 overflow-hidden ${
                mainImage === img
                  ? "border-[#eb5b00]"
                  : "border-gray-200 hover:border-gray-300"
              }`}
            >
              <img
                src={img}
                alt={`Thumbnail ${index}`}
                className="object-cover w-full h-full"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
