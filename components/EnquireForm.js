"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import toast from "react-hot-toast";
import "flag-icons/css/flag-icons.min.css";

const countryCodes = [
  { code: "+995", flag: "ge", name: "Georgia" },
  { code: "+374", flag: "am", name: "Armenia" },
  { code: "+994", flag: "az", name: "Azerbaijan" },
  { code: "+90", flag: "tr", name: "Turkey" },
  { code: "+7", flag: "ru", name: "Russia" },
  { code: "+380", flag: "ua", name: "Ukraine" },
  { code: "+1", flag: "us", name: "USA" },
  { code: "+44", flag: "gb", name: "UK" },
  { code: "+49", flag: "de", name: "Germany" },
  { code: "+33", flag: "fr", name: "France" },
  { code: "+34", flag: "es", name: "Spain" },
  { code: "+39", flag: "it", name: "Italy" },
  { code: "+48", flag: "pl", name: "Poland" },
  { code: "+31", flag: "nl", name: "Netherlands" },
  { code: "+46", flag: "se", name: "Sweden" },
  { code: "+47", flag: "no", name: "Norway" },
  { code: "+41", flag: "ch", name: "Switzerland" },
];

export default function EnquireForm() {
  const t = useTranslations("enquirePopup");
  const locale = useLocale();
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
    communicationMethods: ["Mail"],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (method) => {
    setFormData((prev) => {
      const methods = prev.communicationMethods.includes(method)
        ? prev.communicationMethods.filter((m) => m !== method)
        : [...prev.communicationMethods, method];
      return { ...prev, communicationMethods: methods };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fullPhoneNumber = `${selectedCountry.code}${formData.phone}`;

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: fullPhoneNumber,
          message: formData.message,
          communicationMethods: formData.communicationMethods,
          formType: "enquire",
        }),
      });

      if (response.ok) {
        toast.success(
          locale === "ka"
            ? "მოთხოვნა წარმატებით გაიგზავნა!"
            : "Enquiry sent successfully!",
        );
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          message: "",
          communicationMethods: ["Mail"],
        });
      } else {
        toast.error(
          locale === "ka"
            ? "მოთხოვნის გაგზავნა ვერ მოხერხდა. სცადეთ თავიდან."
            : "Failed to send enquiry. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        locale === "ka"
          ? "დაფიქსირდა შეცდომა. სცადეთ თავიდან."
          : "An error occurred. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const communicationMethods = [
    "Mail",
    "Phone",
    "WhatsApp",
    "Viber",
    "Telegram",
  ];

  return (
    <div
      className="min-h-[calc(100vh-148px)] flex items-center justify-center px-4 py-12"
      style={{ backgroundColor: "#F7EAD7" }}
    >
      <div className="w-full max-w-2xl">
        {/* Title */}
        <h1
          className="text-2xl font-semibold text-center mb-8"
          style={{ color: "#312618" }}
        >
          {t("title")}
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <input
            type="text"
            name="fullName"
            placeholder={t("form.fullName")}
            value={formData.fullName}
            onChange={handleChange}
            className="w-full h-[50px] px-4 border focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              borderRadius: 0,
              borderColor: "#312618",
              backgroundColor: "transparent",
              color: "#312618",
            }}
            required
            disabled={isSubmitting}
          />

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder={t("form.email")}
            value={formData.email}
            onChange={handleChange}
            className="w-full h-[50px] px-4 border focus:outline-none focus:ring-2 focus:ring-opacity-50"
            style={{
              borderRadius: 0,
              borderColor: "#312618",
              backgroundColor: "transparent",
              color: "#312618",
            }}
            required
            disabled={isSubmitting}
          />

          {/* Phone with Country Flag Dropdown */}
          <div className="w-full flex gap-3">
            {/* Flag Dropdown */}
            <div className="relative shrink-0" style={{ width: "90px" }}>
              <button
                type="button"
                onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                className="w-full h-[50px] flex items-center justify-center gap-2 px-3 border transition-colors cursor-pointer hover:bg-[#ede0cb]"
                style={{
                  borderRadius: 0,
                  borderColor: "#312618",
                  backgroundColor: "transparent",
                }}
                disabled={isSubmitting}
              >
                <span
                  className={`fi fi-${selectedCountry.flag}`}
                  style={{ fontSize: "24px" }}
                ></span>
                <ChevronDown size={18} style={{ color: "#312618" }} />
              </button>

              {showCountryDropdown && (
                <div
                  className="absolute top-full left-0 mt-1 border shadow-lg min-w-[260px] max-h-[300px] overflow-y-auto"
                  style={{
                    borderRadius: 0,
                    borderColor: "#312618",
                    backgroundColor: "#F7EAD7",
                    zIndex: 10,
                  }}
                >
                  {countryCodes.map((country) => (
                    <button
                      key={country.code}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(country);
                        setShowCountryDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 transition-colors text-left cursor-pointer"
                      style={{ color: "#312618" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor = "#ede0cb")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = "transparent")
                      }
                    >
                      <span
                        className={`fi fi-${country.flag}`}
                        style={{ fontSize: "20px" }}
                      ></span>
                      <span className="text-sm flex-1 font-medium">
                        {country.name}
                      </span>
                      <span className="text-sm font-mono">{country.code}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Phone Input */}
            <input
              type="tel"
              name="phone"
              placeholder={t("form.phoneNumber")}
              value={formData.phone}
              onChange={handleChange}
              className="flex-1 min-w-0 h-[50px] px-4 border focus:outline-none focus:ring-2 focus:ring-opacity-50"
              style={{
                borderRadius: 0,
                borderColor: "#312618",
                backgroundColor: "transparent",
                color: "#312618",
              }}
              required
              disabled={isSubmitting}
            />
          </div>

          {/* Message */}
          <textarea
            name="message"
            placeholder={t("form.message")}
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 border focus:outline-none focus:ring-2 focus:ring-opacity-50 resize-none"
            style={{
              borderRadius: 0,
              borderColor: "#312618",
              backgroundColor: "transparent",
              color: "#312618",
            }}
            disabled={isSubmitting}
          />

          {/* Communication Methods */}
          <div>
            <p className="text-sm mb-3" style={{ color: "#312618" }}>
              {t("form.preferredMethod")}
            </p>
            <div className="flex flex-wrap gap-4">
              {communicationMethods.map((method) => (
                <label
                  key={method}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={formData.communicationMethods.includes(method)}
                    onChange={() => handleCheckboxChange(method)}
                    className="w-5 h-5 border-2 cursor-pointer"
                    style={{
                      accentColor: "#312618",
                      borderColor: "#312618",
                      borderRadius: 0,
                    }}
                    disabled={isSubmitting}
                  />
                  <span className="text-sm" style={{ color: "#312618" }}>
                    {method}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-16 py-3 font-medium transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              style={{
                borderRadius: 0,
                backgroundColor: "#ED5C3F",
                color: "#F7EAD7",
              }}
              onMouseEnter={(e) =>
                !isSubmitting &&
                (e.currentTarget.style.backgroundColor = "#d94f33")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "#ED5C3F")
              }
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>{locale === "ka" ? "იგზავნება..." : "Sending..."}</span>
                </>
              ) : (
                t("form.submit")
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
