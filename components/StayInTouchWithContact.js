"use client";

import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";

export default function StayInTouchWithContact({
  showAddressBox = true,
  backgroundImage = null,
  backgroundColor = "#d3b473",
  contactBoxBackgroundColor = "#f4e9d8",
  addressBoxBg = "#f4e9d8",
  addressBoxTitleColor = "#374151",
  formTitleColor = "#374151",
  inputBorderColor = "#6b7280",
  inputFocusBorderColor = "#374151",
  inputTextColor = "#374151",
  submitButtonColor = "#ed5c3f",
  submitButtonHoverColor = "#d54a35",
  linkColor = "#6b7280",
  linkHoverColor = "#ed5c3f",
  onSubmit = null,
}) {
  const t = useTranslations("contact");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (onSubmit) {
      onSubmit(formData);
    } else {
      console.log("Form submitted:", formData);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="relative" id="contact-section">
      <section
        className="relative px-4 pt-[120px] pb-16"
        style={{
          backgroundColor: backgroundColor,
          backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className={`max-w-7xl mx-auto grid grid-cols-1 gap-8 lg:gap-16 ${
            showAddressBox
              ? "lg:grid-cols-[1fr_0.6fr]"
              : "lg:grid-cols-1 place-items-center"
          }`}
        >
          {/* Contact Form */}
          <div
            className={`flex flex-col gap-8 ${
              !showAddressBox ? "max-w-[700px] w-full" : ""
            }`}
          >
            <div
              className={
                !showAddressBox
                  ? "p-10 md:p-16 lg:p-20 shadow-[0_10px_25px_rgba(0,0,0,0.1)]"
                  : ""
              }
              style={{
                backgroundColor: !showAddressBox
                  ? contactBoxBackgroundColor
                  : "transparent",
              }}
            >
              <h2
                className={`text-[33px] uppercase tracking-widest font-medium tbc-medium ${
                  !showAddressBox ? "text-center mb-10 md:mb-12" : ""
                }`}
                style={{ color: formTitleColor }}
              >
                {t("title")}
              </h2>

              <form
                onSubmit={handleSubmit}
                className={`flex flex-col gap-4 ${
                  !showAddressBox ? "w-full" : "max-w-[400px]"
                }`}
              >
                <input
                  type="text"
                  name="name"
                  placeholder={t("namePlaceholder")}
                  className="w-full p-4 bg-transparent border transition-colors duration-300 rounded-none h-14 font-inherit tbc-regular focus:outline-none"
                  style={{
                    borderColor: inputBorderColor,
                    color: inputTextColor,
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = inputFocusBorderColor)
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = inputBorderColor)
                  }
                  value={formData.name}
                  onChange={handleChange}
                  required
                />

                <input
                  type="email"
                  name="email"
                  placeholder={t("emailPlaceholder")}
                  className="w-full p-4 bg-transparent border transition-colors duration-300 rounded-none h-14 font-inherit tbc-regular focus:outline-none"
                  style={{
                    borderColor: inputBorderColor,
                    color: inputTextColor,
                  }}
                  onFocus={(e) =>
                    (e.target.style.borderColor = inputFocusBorderColor)
                  }
                  onBlur={(e) =>
                    (e.target.style.borderColor = inputBorderColor)
                  }
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

                <div className="flex gap-4 items-stretch w-full">
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t("phonePlaceholder")}
                    className={`p-4 bg-transparent border transition-colors duration-300 rounded-none h-14 font-inherit tbc-regular focus:outline-none ${
                      !showAddressBox
                        ? "flex-1"
                        : "w-[calc(400px-76px)] max-[480px]:w-[calc(100%-76px)] flex-none"
                    }`}
                    style={{
                      borderColor: inputBorderColor,
                      color: inputTextColor,
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = inputFocusBorderColor)
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = inputBorderColor)
                    }
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />

                  <button
                    type="submit"
                    className="text-white border-none px-6 py-4 cursor-pointer transition-colors duration-300 flex items-center justify-center w-[60px] h-14 shrink-0"
                    style={{
                      backgroundColor: submitButtonColor,
                    }}
                    onMouseEnter={(e) =>
                      (e.target.style.backgroundColor = submitButtonHoverColor)
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = submitButtonColor)
                    }
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
          </div>

          {/* Contact Info Box */}
          {showAddressBox && (
            <div className="relative">
              <div
                className="shadow-[0_10px_25px_rgba(0,0,0,0.1)] p-8 px-6 relative z-10 -mb-25 max-[1023px]:mb-0 max-w-[350px] max-[1023px]:max-w-full mx-auto mt-[70px]"
                style={{ backgroundColor: addressBoxBg }}
              >
                <h3
                  className="font-medium text-[27px] uppercase text-center mb-8 tracking-widest tbc-medium"
                  style={{ color: addressBoxTitleColor }}
                >
                  {t("contactTitle")}
                </h3>
                <div className="flex flex-col text-center">
                  {/* Address */}
                  <div>
                    <a
                      href="https://maps.app.goo.gl/m2F9LwKSAY6TMB5ZA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline transition-colors duration-300 tbc-regular"
                      style={{ color: linkColor }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = linkHoverColor)
                      }
                      onMouseLeave={(e) => (e.target.style.color = linkColor)}
                    >
                      <p className="text-base mb-0 whitespace-pre-line">
                        {t("address")}
                      </p>
                    </a>
                  </div>

                  <hr className="border-none border-t border-black my-4" />

                  {/* Phone */}
                  <div>
                    <a
                      href="https://web.whatsapp.com/send?phone=+995511553333"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline transition-colors duration-300 tbc-regular"
                      style={{ color: linkColor }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = linkHoverColor)
                      }
                      onMouseLeave={(e) => (e.target.style.color = linkColor)}
                    >
                      <p className="text-base mb-0">{t("phone")}</p>
                    </a>
                  </div>

                  <hr className="border-none border-t border-black my-4" />

                  {/* Email & Website */}
                  <div className="flex flex-col">
                    <a
                      href={`mailto:${t("email")}`}
                      className="no-underline transition-colors duration-300 tbc-regular"
                      style={{ color: linkColor }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = linkHoverColor)
                      }
                      onMouseLeave={(e) => (e.target.style.color = linkColor)}
                    >
                      <p className="text-base mb-0">{t("email")}</p>
                    </a>

                    <a
                      href="https://www.thelake.ge"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline transition-colors duration-300 tbc-regular"
                      style={{ color: linkColor }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = linkHoverColor)
                      }
                      onMouseLeave={(e) => (e.target.style.color = linkColor)}
                    >
                      <p className="text-base mb-0">{t("website")}</p>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
