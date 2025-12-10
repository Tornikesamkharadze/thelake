// components/Hero.jsx
export default function Hero({
  image,
  video,
  title,
  subtitle,
  height = "60vh",
  uppercase = false,
  highlightWords = [], // მაგ: ["LAKE", "HOME"]
}) {
  const renderTitle = () => {
    if (!title) return null;

    if (highlightWords.length > 0) {
      let formattedTitle = title;

      // ყველა highlight სიტყვა შევცვალოთ bold-ით
      highlightWords.forEach((word) => {
        const regex = new RegExp(`(${word})`, "gi");
        formattedTitle = formattedTitle.replace(
          regex,
          '<strong class="font-bold">$1</strong>'
        );
      });

      return (
        <h1
          className="text-5xl font-light mb-4" // font-light = 300
          dangerouslySetInnerHTML={{ __html: formattedTitle }}
        />
      );
    }

    return <h1 className="text-5xl font-normal mb-4">{title}</h1>; // font-normal = 400
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: `calc(${height} - 148px)` }}
    >
      {/* ვიდეო ან ფოტო */}
      {video ? (
        <video
          src={video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      ) : (
        <img
          src={image}
          alt={title || "Hero"}
          className="w-full h-full object-cover"
        />
      )}

      {/* Overlay */}
      {(title || subtitle) && (
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div
            className={`text-center text-white px-4 ${
              uppercase ? "uppercase" : ""
            }`}
          >
            {renderTitle()}
            {subtitle && <p className="text-xl font-normal">{subtitle}</p>}
          </div>
        </div>
      )}
    </div>
  );
}
