import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { ArrowRight } from "lucide-react";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "contacts"), {
        ...formData,
        createdAt: serverTimestamp(),
        status: "unread",
      });

      alert("Your message has been saved successfully! 🎉");
      setFormData({ firstName: "", lastName: "", email: "", message: "" });
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-[20px] shadow-[0_10px_25px_rgba(0,0,0,0.03)] flex flex-col gap-6"
    >
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-2 flex-1">
          <label
            htmlFor="firstName"
            className="text-[13px] font-semibold text-[#444]"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name..."
            required
            className="w-full p-3 bg-[#f9f9fb] border border-[#ff6600] rounded-lg text-sm text-[#222] outline-none focus:border-black focus:bg-white transition-colors"
          />
        </div>

        <div className="flex flex-col gap-2 flex-1">
          <label
            htmlFor="lastName"
            className="text-[13px] font-semibold text-[#444]"
          >
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name..."
            required
            className="w-full p-3 bg-[#f9f9fb] border border-[#ff6600] rounded-lg text-sm text-[#222] outline-none focus:border-black focus:bg-white transition-colors"
          />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-[13px] font-semibold text-[#444]"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email address..."
          required
          className="w-full p-3 bg-[#f9f9fb] border border-[#ff6600] rounded-lg text-sm text-[#222] outline-none focus:border-black focus:bg-white transition-colors"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="message"
          className="text-[13px] font-semibold text-[#444]"
        >
          How can we help you?
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Enter your message..."
          required
          className="w-full p-3 bg-[#f9f9fb] border border-[#ff6600] rounded-lg text-sm text-[#222] outline-none focus:border-black focus:bg-white transition-colors min-h-[120px] resize-y"
        ></textarea>
      </div>

      <div className="flex justify-end mt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#ff4e00] text-white border-none py-3.5 px-7 rounded-full text-sm font-semibold cursor-pointer flex items-center gap-2 hover:opacity-85 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          {!isSubmitting && <ArrowRight className="w-4 h-4" />}
        </button>
      </div>
    </form>
  );
}
