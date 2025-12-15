"use client";

export default function LocationMapSection() {
  return (
    <section className="relative w-full">
      {/* Google Maps Container - full viewport height minus header */}
      <div className="w-full max-w-[2500px] mx-auto">
        <div className="relative w-full h-[calc(85vh-148px)] min-h-[500px]">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d11906.092585991995!2d44.731145373586095!3d41.752377321808375!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDQ1JzA4LjQiTiA0NMKwNDMnNTMuOSJF!5e0!3m2!1sen!2sge!4v1765798200035!5m2!1sen!2sge"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Lisi Lake Location"
          />
        </div>
      </div>

      {/* Distance Information */}
      <div className="w-full max-w-[2500px] mx-auto bg-white py-12 md:py-16 lg:py-12 px-4">
        <div className="max-w-5xl mx-auto">
          {/* Title - Centered */}
          <h2 className="text-[28px] md:text-[36px] lg:text-[48px] font-bold text-black text-center mb-10 md:mb-16 lg:mb-12 tracking-wide tbc-bold">
            DISTANCE FROM ...
          </h2>

          {/* Distance List - Grid layout, both columns aligned */}
          <div className="flex flex-col gap-6 md:gap-4 max-w-3xl mx-auto">
            {/* Item 1 */}
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:gap-x-20 items-start">
              <span className="text-[16px] md:text-[18px] lg:text-[22px] font-normal text-black text-left md:text-right whitespace-nowrap tbc-regular">
                5 MIN BY CAR
              </span>
              <span className="text-[16px] md:text-[18px] lg:text-[22px] font-normal text-black text-left tbc-regular">
                Insert Nearest Private School here
              </span>
            </div>

            {/* Item 2 */}
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:gap-x-20 items-start">
              <span className="text-[16px] md:text-[18px] lg:text-[22px] font-normal text-black text-left md:text-right whitespace-nowrap tbc-regular">
                5 MIN WALKING DISTANCE
              </span>
              <span className="text-[16px] md:text-[18px] lg:text-[22px] font-normal text-black text-left tbc-regular">
                Lisi lake
              </span>
            </div>

            {/* Item 3 */}
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:gap-x-20 items-start">
              <span className="text-[16px] md:text-[18px] lg:text-[22px] font-normal text-black text-left md:text-right whitespace-nowrap tbc-regular">
                5 MIN BY CAR
              </span>
              <span className="text-[16px] md:text-[18px] lg:text-[22px] font-normal text-black text-left tbc-regular">
                Nearest busy road with public transportation
              </span>
            </div>

            {/* Item 4 */}
            <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-2 md:gap-x-20 items-start">
              <span className="text-[16px] md:text-[18px] lg:text-[22px] font-normal text-black text-left md:text-right whitespace-nowrap tbc-regular">
                5 MIN BY CAR
              </span>
              <span className="text-[16px] md:text-[18px] lg:text-[22px] font-normal text-black text-left tbc-regular">
                Nearest sports centre
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
