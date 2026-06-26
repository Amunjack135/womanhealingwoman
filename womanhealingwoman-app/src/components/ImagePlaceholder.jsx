const ImagePlaceholder = ({ icon, label, className = "" }) => (
  <div
    className={`rounded-3xl bg-gradient-to-br from-[#652818] to-[#8a3a26] text-white flex flex-col items-center justify-center text-center gap-4 px-8 py-16 ${className}`}
  >
    <div className="opacity-80">{icon}</div>
    {label && <p className="text-sm font-medium opacity-80">{label}</p>}
  </div>
);

export default ImagePlaceholder;