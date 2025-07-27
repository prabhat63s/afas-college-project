import { WiSunrise, WiSunset } from "react-icons/wi";

function ForecastCard({ date, tempMin, tempMax, condition, astro }) {
  // Function to translate day of the week
  const getDayInHindi = (date) => {
    const options = { weekday: "long" };
    return new Date(date).toLocaleDateString("hi-IN", options); // Hindi locale
  };

  const conditionTranslations = {
    Sunny: "धूप",
    Mist: "धुंध",
    Rain: "बारिश",
    Cloudy: "बादल",
    "Patchy rain nearby": "नजदीक हल्की बारिश",
    "Overcast": "आसमान में बादल",
    "Partly cloudy": "आंशिक रूप से बादल",
    "Light rain": "हल्की बारिश",
    "Heavy rain": "तेज़ बारिश",
    "Thunderstorm": "बिजली गरजना",
    "Clear": "स्पष्ट",
    "Snow": "बर्फ़",
  };
  

  return (
    <div className="flex flex-col items-center justify-center bg-gray-50 hover:bg-emerald-50 rounded-lg p-4 gap-2">
      {/* Date */}
      <h4 className="text-lg font-semibold text-gray-800">
        {getDayInHindi(date)}
      </h4>

      {/* Weather Condition */}
      <div className="flex items-center gap-2">
        <img src={condition.icon} alt={condition.text} className="w-8 h-8" />
        <p className="text-md text-gray-600">
          {conditionTranslations[condition.text] || condition.text}
        </p>
      </div>

      {/* Temperature Range */}
      <p className="text-lg font-medium">
        {tempMin}°C / {tempMax}°C
      </p>

      {/* Sunrise and Sunset */}
      <div className="flex items-center justify-center gap-4 mt-2 whitespace-nowrap">
        <div className="flex items-center gap-1">
          <WiSunrise size={24} className="text-yellow-500" />
          <p className="text-sm text-gray-600">{astro.sunrise}</p>
        </div>
        <div className="flex items-center gap-1">
          <WiSunset size={24} className="text-orange-500" />
          <p className="text-sm text-gray-600">{astro.sunset}</p>
        </div>
      </div>
    </div>
  );
}

export default ForecastCard;
