"use client";

import { useState } from "react";
import Image from "next/image";

export default function ContactWithAdressSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // აქ შეგიძლია დაამატო შენი API call ლოგიკა
    console.log("Form submitted:", formData);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative" id="contact-section">
      <section className="relative bg-[#d3b473] px-4 pt-[120px] pb-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_0.6fr] gap-8 lg:gap-16">
          {/* Contact Form - Left Side */}
          <div className="flex flex-col gap-8">
            <h2 className="text-[33px] uppercase tracking-widest text-gray-700 font-medium tbc-medium">
              STAY IN TOUCH
            </h2>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 max-w-[400px]"
            >
              <input
                type="text"
                name="name"
                placeholder="Name and Surname"
                className="w-full p-4 bg-transparent border border-gray-500 text-gray-700 text-base transition-colors duration-300 rounded-none h-14 font-inherit placeholder:text-gray-500 focus:outline-none focus:border-gray-700 tbc-regular"
                value={formData.name}
                onChange={handleChange}
                required
              />

              <input
                type="email"
                name="email"
                placeholder="E-mail"
                className="w-full p-4 bg-transparent border border-gray-500 text-gray-700 text-base transition-colors duration-300 rounded-none h-14 font-inherit placeholder:text-gray-500 focus:outline-none focus:border-gray-700 tbc-regular"
                value={formData.email}
                onChange={handleChange}
                required
              />

              <div className="flex gap-4 items-stretch w-full">
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  className="w-[calc(400px-76px)] max-[480px]:w-[calc(100%-76px)] flex-none p-4 bg-transparent border border-gray-500 text-gray-700 text-base transition-colors duration-300 rounded-none h-14 font-inherit placeholder:text-gray-500 focus:outline-none focus:border-gray-700 tbc-regular"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />

                <button
                  type="submit"
                  className="bg-[#ed5c3f] text-white border-none px-6 py-4 cursor-pointer transition-colors duration-300 flex items-center justify-center w-[60px] h-14 shrink-0 hover:bg-[#d54a35]"
                >
                  <Image
                    src="/send.svg"
                    alt="Send"
                    width={20}
                    height={20}
                    className="brightness-0 invert"
                  />
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info Box - Right Side */}
          <div className="relative">
            <div className="bg-[#f4e9d8] shadow-[0_10px_25px_rgba(0,0,0,0.1)] p-8 px-6 relative z-10 -mb-40 max-[1023px]:mb-0 max-w-[350px] max-[1023px]:max-w-full mx-auto mt-[70px]">
              <h3 className="font-medium text-[27px] uppercase text-center text-gray-700 mb-8 tracking-widest tbc-medium">
                CONTACT
              </h3>
              <div className="flex flex-col text-center">
                <div>
                  <a
                    href="https://maps.app.goo.gl/m2F9LwKSAY6TMB5ZA"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline text-inherit"
                  >
                    <p className="text-gray-500 text-base mb-0 transition-colors duration-400ms hover:text-[#ed5c3f] tbc-regular">
                      15D Tuta Street. 0159 <br />
                      Tbilisi, Georgia
                    </p>
                  </a>
                </div>

                <hr className="border-none border-t border-black my-4" />

                <div>
                  <a
                    href="https://web.whatsapp.com/send?phone=+995511553333"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="no-underline text-inherit"
                  >
                    <p className="text-gray-500 text-base mb-0 transition-colors duration-400ms hover:text-[#ed5c3f] tbc-regular">
                      +995 511 55 33 33
                    </p>
                  </a>
                </div>

                <hr className="border-none border-t border-black my-4 tbc-regular" />

                <div className="flex flex-col z-90">
                  <a
                    href="mailto:info@placemakers.ge"
                    className="no-underline text-inherit"
                  >
                    <p className="text-gray-500 text-base mb-0 transition-colors duration-400ms hover:text-[#ed5c3f] tbc-regular">
                      info@placemakers.ge
                    </p>
                  </a>

                  <p className="text-gray-500 text-base mb-0 transition-colors duration-400ms hover:text-[#ed5c3f] tbc-regular">
                    Www.TheLake.ge
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
