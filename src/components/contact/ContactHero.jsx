import { Search } from "lucide-react";

export default function ContactHero() {
  return (
    <section
      className="flex justify-center items-center bg-cover bg-center h-[337px] w-full"
      style={{
        backgroundImage:
          'url("https://china-southnorth-01.oss-cn-zhangjiakou.aliyuncs.com/intl-social-service/26/143003/20200416/7869abc19a4c4bbd8203b9d4f5d76f2d-helphub-1587013750729-rc-upload-1587006101888-128")',
      }}
    >
      <form className="flex items-center w-[90%] max-w-[580px] bg-white border-2 border-[#ff4e00] rounded-xs overflow-hidden">
        <input
          className="flex-1 border-none outline-hidden py-2.5 px-3.5 text-sm text-[#333]"
          type="search"
          placeholder="Enter question or keyword. Example: Payment"
        />
        <button
          type="button"
          className="bg-[#ff4e00] border-none py-2 px-4 cursor-pointer flex items-center justify-center h-full"
        >
          <Search className="text-white w-6 h-6" />
        </button>
      </form>
    </section>
  );
}
