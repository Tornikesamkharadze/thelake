"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion, useInView } from "framer-motion";
import toast from "react-hot-toast";

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
  const locale = useLocale();
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isMobile, setIsMobile] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          formType: "contact",
        }),
      });

      if (response.ok) {
        toast.success(
          locale === "ka"
            ? "შეტყობინება წარმატებით გაიგზავნა!"
            : "Message sent successfully!",
        );
        setFormData({ name: "", email: "", phone: "" });

        if (onSubmit) {
          onSubmit(formData);
        }
      } else {
        toast.error(
          locale === "ka"
            ? "შეტყობინების გაგზავნა ვერ მოხერხდა. სცადეთ თავიდან."
            : "Failed to send message. Please try again.",
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(
        locale === "ka"
          ? "დაფიქსირდა შეცდომა. სცადეთ თავიდან."
          : "An error occurred. Please try again.",
        {
          style: {
            background: "#ef4444",
            color: "#ffffff",
          },
        },
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const inputVariants = {
    hidden: { opacity: 0, x: isMobile ? 0 : -30 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.5,
      },
    }),
  };

  const contactInfoVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.6 + i * 0.1,
        duration: 0.5,
      },
    }),
  };

  return (
    <div
      className="relative overflow-x-hidden md:overflow-x-visible"
      id="contact-section"
    >
      <section
        ref={sectionRef}
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
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
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
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`text-[33px] uppercase tracking-widest font-medium tbc-medium ${
                  !showAddressBox ? "text-center mb-10 md:mb-12" : ""
                }`}
                style={{ color: formTitleColor }}
              >
                {t("title")}
              </motion.h2>

              <form
                onSubmit={handleSubmit}
                className={`flex flex-col gap-4 ${
                  !showAddressBox ? "w-full" : "max-w-[400px]"
                }`}
              >
                <motion.input
                  custom={0}
                  variants={inputVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileFocus={{ scale: 1.02 }}
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
                  disabled={isSubmitting}
                />

                <motion.input
                  custom={1}
                  variants={inputVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  whileFocus={{ scale: 1.02 }}
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
                  disabled={isSubmitting}
                />

                <motion.div
                  custom={2}
                  variants={inputVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  className="flex gap-4 items-stretch w-full"
                >
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
                    disabled={isSubmitting}
                  />

                  <motion.button
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="text-white border-none px-6 py-4 cursor-pointer transition-colors duration-300 flex items-center justify-center w-[60px] h-14 shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: submitButtonColor,
                    }}
                    onMouseEnter={(e) =>
                      !isSubmitting &&
                      (e.target.style.backgroundColor = submitButtonHoverColor)
                    }
                    onMouseLeave={(e) =>
                      (e.target.style.backgroundColor = submitButtonColor)
                    }
                  >
                    {isSubmitting ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      <Image
                        src="/send.svg"
                        alt="Send"
                        width={20}
                        height={20}
                        className="brightness-0 invert"
                      />
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          </div>

          {/* Contact Info Box */}
          {showAddressBox && (
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, x: isMobile ? 0 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="shadow-[0_10px_25px_rgba(0,0,0,0.1)] p-8 px-6 relative z-10 -mb-25 max-[1023px]:mb-0 max-w-[350px] max-[1023px]:max-w-full mx-auto mt-[70px]"
                style={{ backgroundColor: addressBoxBg }}
              >
                <motion.h3
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="font-medium text-[27px] uppercase text-center mb-8 tracking-widest tbc-medium"
                  style={{ color: addressBoxTitleColor }}
                >
                  {t("contactTitle")}
                </motion.h3>
                <div className="flex flex-col text-center">
                  {/* Address */}
                  <motion.div
                    custom={0}
                    variants={contactInfoVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    <motion.a
                      whileHover={{ scale: 1.02 }}
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
                    </motion.a>
                  </motion.div>

                  <hr className="border-none border-t border-black my-4" />

                  {/* Phone */}
                  <motion.div
                    custom={1}
                    variants={contactInfoVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  >
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      href="https://web.whatsapp.com/send?phone=15558702876"
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
                    </motion.a>
                  </motion.div>

                  <hr className="border-none border-t border-black my-4" />

                  {/* Email & Website */}
                  <motion.div
                    custom={2}
                    variants={contactInfoVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    className="flex flex-col"
                  >
                    <motion.a
                      whileHover={{ scale: 1.02 }}
                      href={`mailto:${t("email")}`}
                      className="no-underline transition-colors duration-300 tbc-regular"
                      style={{ color: linkColor }}
                      onMouseEnter={(e) =>
                        (e.target.style.color = linkHoverColor)
                      }
                      onMouseLeave={(e) => (e.target.style.color = linkColor)}
                    >
                      <p className="text-base mb-0">{t("email")}</p>
                    </motion.a>

                    <motion.a
                      whileHover={{ scale: 1.02 }}
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
                    </motion.a>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
