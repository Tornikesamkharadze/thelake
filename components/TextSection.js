// components/TextSection.jsx
export default function TextSection({
  title,
  description,
  buttons = [],
  buttonPosition = "bottom", // "top", "middle", "bottom"
  highlightWords = [],
  uppercase = false,
  bgColor = "bg-[#E8DCC8]",
  textColor = "text-black",
}) {
  const renderTitle = () => {
    if (!title) return null;

    if (highlightWords.length > 0) {
      let formattedTitle = title;

      highlightWords.forEach((word) => {
        const regex = new RegExp(`(${word})`, "gi");
        formattedTitle = formattedTitle.replace(
          regex,
          '<strong class="font-bold">$1</strong>'
        );
      });

      return (
        <h2
          className={`text-4xl font-light mb-6 ${uppercase ? "uppercase" : ""}`}
          dangerouslySetInnerHTML={{ __html: formattedTitle }}
        />
      );
    }

    return (
      <h2
        className={`text-4xl font-light mb-6 ${uppercase ? "uppercase" : ""}`}
      >
        {title}
      </h2>
    );
  };

  const renderButtons = () => {
    if (buttons.length === 0) return null;

    return (
      <div className="flex gap-4 justify-center flex-wrap mb-8">
        {buttons.map((button, index) => (
          <a
            key={index}
            href={button.link || "#"}
            className={`
              px-8 py-3 uppercase text-sm font-medium transition-all
              ${button.bgColor || "bg-transparent"}
              ${button.textColor || "text-black"}
              ${button.border || ""}
              hover:opacity-80
            `}
          >
            {button.text}
          </a>
        ))}
      </div>
    );
  };

  return (
    <section className={`${bgColor} ${textColor} py-16 px-6`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Buttons Top */}
        {buttonPosition === "top" && renderButtons()}

        {/* Title */}
        {renderTitle()}

        {/* Buttons Middle */}
        {buttonPosition === "middle" && renderButtons()}

        {/* Description */}
        {description && (
          <p className="text-base leading-relaxed mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}

        {/* Buttons Bottom (default) */}
        {buttonPosition === "bottom" && renderButtons()}
      </div>
    </section>
  );
}
