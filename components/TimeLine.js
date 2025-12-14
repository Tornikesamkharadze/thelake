"use client";

const Timeline = ({
  // ტექსტები
  items = [],
  // ფერები
  backgroundColor = "#e8dfd0",
  lineColor = "#ED5C3F",
  dotColor = "#ED5C3F",
  yearColor = "#000000",
  titleColor = "#000000",
  descriptionColor = "#000000",
  // ფონტის სიმძიმე
  yearWeight = "400",
  titleWeight = "700",
  descriptionWeight = "400",
  // ტექსტის ტრანსფორმაცია
  yearTransform = "none",
  titleTransform = "none",
  descriptionTransform = "none",
  // დოტის ზომა
  dotSize = "14px",
}) => {
  return (
    <section
      className="relative w-full py-12 md:py-16"
      style={{ backgroundColor }}
    >
      <div className="mx-auto max-w-7xl px-6 md:px-10 lg:px-12">
        {/* DESKTOP VERSION */}
        <div className="hidden md:block relative">
          {/* ხაზი */}
          <div
            className="absolute left-[2%] right-[2%] top-1/2 h-px"
            style={{ backgroundColor: lineColor }}
          />

          <div className="relative flex justify-between px-[2%]">
            {items.map((item, i) => (
              <div
                key={i}
                className="relative flex flex-col items-center max-w-[200px]"
              >
                {/* წელი */}
                <div
                  className="mb-10 text-center font-serif italic text-[20px] md:text-[24px] lg:text-[28px]"
                  style={{
                    color: yearColor,
                    fontWeight: yearWeight,
                    textTransform: yearTransform,
                  }}
                >
                  {item.year}
                </div>

                {/* დოტი */}
                <div className="absolute top-1/2 -translate-y-1/2">
                  <span
                    className="block rounded-full"
                    style={{
                      height: dotSize,
                      width: dotSize,
                      backgroundColor: dotColor,
                      boxShadow: `0 0 0 2px ${dotColor}35`,
                    }}
                  />
                </div>

                {/* ტექსტები */}
                <div className="mt-10 text-center space-y-2">
                  {/* სათაური */}
                  {item.title && (
                    <h3
                      className="leading-tight text-[14px] md:text-[16px] lg:text-[18px]"
                      style={{
                        color: titleColor,
                        fontWeight: titleWeight,
                        textTransform: titleTransform,
                      }}
                    >
                      {item.title}
                    </h3>
                  )}

                  {/* აღწერა */}
                  {item.description && (
                    <p
                      className="leading-relaxed text-[13px] md:text-[14px]"
                      style={{
                        color: descriptionColor,
                        fontWeight: descriptionWeight,
                        textTransform: descriptionTransform,
                      }}
                    >
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE VERSION */}
        <div className="block md:hidden">
          <div className="relative max-w-[340px] mx-auto px-4">
            {/* ვერტიკალური ხაზი */}
            <div
              className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px"
              style={{ backgroundColor: lineColor }}
            />

            <div className="space-y-10">
              {items.map((item, i) => (
                <div
                  key={i}
                  className="relative flex items-center justify-center gap-6"
                >
                  {/* მარცხენა - წელი */}
                  <div className="w-[100px] shrink-0 text-right pr-6">
                    <span
                      className="font-serif italic leading-none inline-block text-[20px] md:text-[24px]"
                      style={{
                        color: yearColor,
                        fontWeight: yearWeight,
                        textTransform: yearTransform,
                      }}
                    >
                      {item.year}
                    </span>
                  </div>

                  {/* დოტი */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span
                      className="block rounded-full"
                      style={{
                        height: dotSize,
                        width: dotSize,
                        backgroundColor: dotColor,
                        boxShadow: `0 0 0 2px ${dotColor}35`,
                      }}
                    />
                  </div>

                  {/* მარჯვენა - ტექსტები */}
                  <div className="w-[100px] shrink-0 pl-6 space-y-1">
                    {item.title && (
                      <h3
                        className="leading-snug text-[14px] md:text-[16px]"
                        style={{
                          color: titleColor,
                          fontWeight: titleWeight,
                          textTransform: titleTransform,
                        }}
                      >
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p
                        className="leading-snug text-[13px] md:text-[14px]"
                        style={{
                          color: descriptionColor,
                          fontWeight: descriptionWeight,
                          textTransform: descriptionTransform,
                        }}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
