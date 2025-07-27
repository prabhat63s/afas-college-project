function CurrentWeather({ weatherData }) {
  // Define the condition translations in Hindi
  const conditionTranslations = {
    Sunny: "धूप",
    Mist: "धुंध",
    Rain: "बारिश",
    Cloudy: "बादल",
    "Patchy rain nearby": "नजदीक हल्की बारिश",
    Overcast: "आसमान में बादल",
    "Partly cloudy": "आंशिक रूप से बादल",
    "Light rain": "हल्की बारिश",
    "Heavy rain": "तेज़ बारिश",
    Thunderstorm: "बिजली गरजना",
    Clear: "स्पष्ट",
    Snow: "बर्फ़",
  };

  // Destructure relevant data from weatherData
  const {
    current: {
      temp_c,
      condition,
      precip_mm,
      humidity,
      wind_kph,
      feelslike_c,
      last_updated,
    },
  } = weatherData || {}; // Safely destructure, default to empty object

  // Function to format the date string into a more readable format in Hindi
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long", day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString("hi-IN", options); // Format date in Hindi
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {/* Current temperature and condition display */}
      <div className="bg-gray-50 rounded-xl flex justify-between items-center p-4 hover:bg-emerald-50">
        <div className="">
          <h3 className="text-2xl font-semibold">{temp_c}°C</h3>
          <p className="text-lg text-gray-700">
            {conditionTranslations[condition.text] || condition.text}
          </p>
          <p className="text-md text-gray-600">{formatDate(last_updated)}</p>
        </div>
        <div className="icon">
          <img
            src={condition.icon}
            alt={condition.text}
            className="w-16 h-16"
          />
        </div>
      </div>

      {/* Additional weather information cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Real Feels card */}
        <div className="hover:bg-emerald-50 rounded-xl flex flex-col gap-2 items-center justify-center p-4 bg-gray-50">
          वास्तविक महसूस
          <p className="text-xl font-medium">{feelslike_c}°C</p>
        </div>
        {/* Wind Speed card */}
        <div className="hover:bg-emerald-50 rounded-xl flex flex-col gap-2 items-center justify-center p-4 bg-gray-50">
          हवा की गति
          <p className="text-xl font-medium">{wind_kph} किमी/घंटा</p>
        </div>
      </div>
      {/* Additional weather information cards */}
      <div className="grid grid-cols-2 gap-4">
        {/* Humidity card */}
        <div className="hover:bg-emerald-50 rounded-xl flex flex-col gap-2 items-center justify-center p-4 bg-gray-50">
          आर्द्रता
          <p className="text-xl font-medium">{humidity}%</p>
        </div>
        {/* Precipitation card */}
        <div className="hover:bg-emerald-50 rounded-xl flex flex-col gap-2 items-center justify-center p-4 bg-gray-50">
          वर्षा
          <p className="text-xl font-medium">{precip_mm} मिमी</p>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
