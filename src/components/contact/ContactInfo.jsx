export default function ContactInfo() {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[42px] font-bold leading-tight text-[#111]">
        Get in —<br />
        touch with us
      </h2>
      <p className="text-[#666] text-[15px] leading-relaxed max-w-[90%]">
        We’re here to help! Whether you have a question about our services, need
        assistance with your account, or want to provide feedback, our team is
        ready to assist you.
      </p>

      <div className="flex flex-col gap-1.5 mt-2">
        <span className="text-[13px] text-[#888] font-medium">Email:</span>
        <a
          href="mailto:hello@finpro.com"
          className="text-lg font-bold text-[#111] hover:text-[#ff4e00]"
        >
          hello@finpro.com
        </a>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-[13px] text-[#888] font-medium">Phone:</span>
        <a
          href="tel:+123456778"
          className="text-lg font-bold text-[#111] hover:text-[#ff4e00]"
        >
          +1 234 567 78
        </a>
      </div>

      <div className="flex flex-col gap-1.5">
        <span className="text-[13px] text-[#888] font-medium">Location:</span>
        <span className="text-lg font-bold text-[#111]">Amman, Jordan</span>
        <div className="mt-2 rounded-lg overflow-hidden">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d433871.3815945412!2d35.617962747688104!3d31.835335330489126!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151b5fb85d7981af%3A0x631c30c0f8dc65e8!2sAmman!5e0!3m2!1sen!2sjo!4v1784734122622!5m2!1sen!2sjo"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          ></iframe>
        </div>
      </div>

      <p className="text-[#666] text-sm mt-2">
        Available Monday to Friday, 9 AM - 6 PM GMT
      </p>

      <button
        type="button"
        className="bg-[#ff4e00] text-white border-none py-3 px-6 rounded-full text-sm font-semibold cursor-pointer w-fit mt-2 hover:opacity-85 transition-opacity"
      >
        Live Chat
      </button>
    </div>
  );
}
