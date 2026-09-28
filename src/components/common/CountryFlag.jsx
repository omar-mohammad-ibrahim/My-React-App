export default function CountryFlag({ code = "cn", className = "w-4 h-3" }) {
  if (!code) return null;

  const countryCode = code.toLowerCase();

  return (
    <img
      src={`https://flagcdn.com/w40/${countryCode}.png`}
      srcSet={`https://flagcdn.com/w80/${countryCode}.png 2x`}
      alt={code.toUpperCase()}
      className={`inline-block object-contain rounded-[2px] shadow-2xs ${className}`}
      loading="lazy"
    />
  );
}
