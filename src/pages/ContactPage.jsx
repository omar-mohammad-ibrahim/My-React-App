import ContactHero from "../components/contact/ContactHero";
import ContactInfo from "../components/contact/ContactInfo";
import ContactForm from "../components/contact/ContactForm";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-[#f4f6f8] text-[#333333]">
      {/* استدعاء مكون شريط البحث والصورة العلوية */}
      <ContactHero />

      {/* الهيكل الشبكي الذي يجمع المعلومات والنموذج */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto my-10 p-8 md:p-14 bg-[#f4f4f6] rounded-[28px] items-center w-[95%]">
        <ContactInfo />
        <ContactForm />
      </section>
    </div>
  );
}
