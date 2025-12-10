// components/Divider.jsx
export default function Divider({
  text = "",
  bgColor = "bg-[#E8DCC8]",
  textColor = "text-black",
  uppercase = true,
}) {
  return (
    <div
      className={`${bgColor} w-full h-[59px] flex items-center justify-center px-6`}
    >
      <div className="border-t  py-3 text-center w-full">
        <h3
          className={`text-[25px] tracking-[0.4em] ${textColor} ${
            uppercase ? "uppercase" : ""
          }`}
        >
          {text}
        </h3>
      </div>
    </div>
  );
}
