import { HiLightningBolt } from "react-icons/hi";
import { BsFillCameraFill } from "react-icons/bs";

export default function AuthBanner() {
  return (
    <div className="relative w-full max-w-[480px] h-[580px] bg-gradient-to-b from-[#FF4D00] to-[#FF2E00] rounded-3xl p-8 flex flex-col items-center text-white overflow-hidden shadow-2xl">
      {/* شارة العرض الترويجي */}
      <div className="inline-block bg-white text-primary text-xs font-black italic px-4 py-1 rounded-full shadow-sm mb-4">
        Super September
      </div>

      {/* العنوان التسويقي */}
      <h2 className="text-3xl font-extrabold tracking-tight text-center leading-tight mb-2">
        Smart sourcing with AI Mode
      </h2>

      <p className="text-xs font-medium text-orange-100 mb-8 opacity-90">
        starts Sep 1 (UTC-8)
      </p>

      {/* التكوين الرسومي التجريدي المماثل للصورة */}
      <div className="relative w-full flex-1 flex items-end justify-center">
        {/* خلفية مجسمة بيضاء */}
        <div className="w-[320px] h-[260px] bg-white/95 rounded-t-3xl shadow-lg relative flex items-center justify-center p-6">
          {/* أيقونة الكاميرا ثلاثية الأبعاد */}
          <div className="relative flex items-center justify-center w-28 h-28 bg-gray-900 rounded-full border-4 border-gray-700 shadow-2xl text-gray-200">
            <BsFillCameraFill className="text-4xl" />
          </div>

          {/* شارة البرق الحمراء */}
          <div className="absolute -top-6 -left-4 w-16 h-16 bg-red-500 rounded-2xl rotate-[-12deg] flex items-center justify-center shadow-lg border-2 border-white">
            <HiLightningBolt className="text-3xl text-white" />
          </div>

          {/* شكل النجمة الترويجية */}
          <div className="absolute -top-8 right-6 w-14 h-14 bg-orange-400 rounded-full flex items-center justify-center shadow-md animate-pulse">
            <span className="text-xl">✨</span>
          </div>
        </div>
      </div>
    </div>
  );
}
