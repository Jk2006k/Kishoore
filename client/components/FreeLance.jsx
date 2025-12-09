import React, { useState } from "react";
import Particles from "./Particles";

export default function Freelance() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+91 ");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState(null);

  // Replace this with your WhatsApp number in international format (no plus).
  // Example: "919876543210"
  const OWNER_WHATSAPP = "919025513821";

  const handlePhoneChange = (e) => {
    let value = e.target.value;

    if (!value.startsWith("+91")) {
      const digits = value.replace(/\D/g, "").slice(0, 10);
      value = "+91 " + digits;
    }

    const digits = value.replace("+91 ", "").replace(/\D/g, "").slice(0, 10);
    setPhone("+91 " + digits);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const digits = phone.replace(/\D/g, "").slice(2);

    if (!name.trim() || digits.length < 5 || !desc.trim()) {
      setStatus({
        type: "error",
        msg: "Please fill all fields correctly.",
      });
      return;
    }

    // Build message
    const message = `New project request%0A%0AName: ${encodeURIComponent(
      name
    )}%0APhone: ${encodeURIComponent(phone)}%0AProject: ${encodeURIComponent(
      desc
    )}`;

    // preferred wa.me format (works across web & mobile)
    const waUrl = `https://wa.me/${OWNER_WHATSAPP}?text=${message}`;

    // open WhatsApp in new tab/window
    window.open(waUrl, "_blank");

    setStatus({
      type: "success",
      msg: "Your request has been submitted! I'll get back to you on WhatsApp.",
    });

    console.log({ name, phone, desc });

    setName("");
    setPhone("+91 ");
    setDesc("");

    setTimeout(() => setStatus(null), 4000);
  };

  return (
    <section id="freelance" className="mt-12 relative z-10 max-w-6xl mx-auto px-4">
      <div className="absolute inset-0 bg-black z-0"></div>

      <Particles />
      <Particles />

      <div className="relative z-10">
        <div className="text-center mb-8">
          <p className="tracking-[0.3em] text-xs text-gray-500">WORK WITH ME</p>
          <h3 className="text-3xl md:text-4xl font-bold mt-2 text-white">
            Freelance — Hire me
            <span style={{ color: "#D4AF37" }}>.</span>
          </h3>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
            I build clean, modern and performance-focused websites and applications.
            Whether it’s a portfolio, full-stack project, or a custom feature —
            I can turn your idea into a polished final product.
          </p>
        </div>

        <div className="bg-black border border-[#2b2b2b] rounded-2xl p-6 md:p-10 shadow-lg">
          <span className="block mb-6 text-gray-300 font-medium text-center">
            Share your project details below — let’s create something amazing together.
          </span>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="px-4 py-3 rounded-lg bg-black/80 border border-[#2b2b2b] text-white outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-gray-300">Phone</label>
              <input
                type="text"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="+91 98765..."
                className="px-4 py-3 rounded-lg bg-black/80 border border-[#2b2b2b] text-white outline-none"
              />
            </div>

            <div className="md:col-span-3 flex flex-col gap-2">
              <label className="text-sm text-gray-300">Project Description</label>
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows="4"
                placeholder="Describe what work you want me to do..."
                className="px-4 py-3 rounded-lg bg-black/80 border border-[#2b2b2b] text-white outline-none resize-none"
              />
            </div>

            <div className="md:col-span-3">
              <button
                type="submit"
                className="px-8 py-3 rounded-lg font-semibold"
                style={{
                  background: "linear-gradient(135deg,#D4AF37,#FFD700)",
                  color: "#000",
                }}
              >
                Launch Your Idea
              </button>

              {status && (
                <p
                  className={`mt-3 text-sm ${
                    status.type === "error" ? "text-red-400" : "text-green-400"
                  }`}
                >
                  {status.msg}
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
