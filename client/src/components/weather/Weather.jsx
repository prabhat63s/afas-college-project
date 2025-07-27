import { useState, useEffect } from "react";
import axios from "axios";
import CityDisplay from "./CityDisplay";
import CurrentWeather from "./CurrentWeather";
import ForecastCard from "./ForecastCard";
import Spinner from "../Spinner";

function Weather() {
  // State to hold weather data, forecast data, and errors
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(""); // Store error messages
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    // Function to get the current location of the user
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeatherData(latitude, longitude);
            fetchForecastData(latitude, longitude);
          },
          (error) => {
            setError("स्थिति नहीं प्राप्त की जा सकी। कृपया स्थान अनुमतियाँ सक्षम करें।");
            setLoading(false);
          }
        );
      } else {
        setError("आपका ब्राउज़र स्थान सेवाओं का समर्थन नहीं करता है।");
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  // Fetch current weather data based on latitude and longitude
  const fetchWeatherData = async (latitude, longitude) => {
    try {
      setError(""); // Reset error state
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/weather/${latitude},${longitude}`);
      console.log("Weather Data:", response.data); // Log the API response
      setWeatherData(response.data);
    } catch (error) {
      setError("नेटवर्क त्रुटि। कृपया बाद में पुनः प्रयास करें।");
      setWeatherData(null);
    } finally {
      setLoading(false); // Make sure to set loading to false here
    }
  };

  // Function to fetch 7-day weather forecast for the given coordinates
  const fetchForecastData = async (latitude, longitude) => {
    try {
      setError(""); // Reset error state
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/forecast?lat=${latitude}&lon=${longitude}`);
      setForecastData(response.data); // Set forecast data
    } catch (error) {
      setError("नेटवर्क त्रुटि। कृपया बाद में पुनः प्रयास करें।");
      setForecastData(null); // Reset forecast data on error
    } finally {
      setLoading(false); // Make sure to set loading to false here
    }
  };

  return (
    <div className="w-full flex flex-col">
      
      <div className="lg:max-w-7xl w-full mx-auto">
        {/* Show loading spinner or message */}
        {loading && !error && (
          <Spinner />
        )}

        {/* Show error message if present */}
        {error && (
          <div className="h-full text-center items-center flex justify-center">
            <p className="text-gray-800 text-4xl font-medium">{error}</p>
          </div>
        )}

        {!error && weatherData && (
          <>
            {weatherData.location && (
              <CityDisplay
                city={weatherData.location.name}
                region={weatherData.location.region}
                condition={{
                  icon: weatherData.current.condition.icon,
                  text: weatherData.current.condition.text,
                }}
              />
            )}

            {/* Display current weather details */}
            <CurrentWeather weatherData={weatherData} />

            <div className="my-5">
              <h1 className="py-1 mb-5 w-fit text-xl font-medium border-b-4">
                पांच दिन का पूर्वानुमान
              </h1>
              <div className="flex gap-4 overflow-auto">
                {forecastData && forecastData.map((day, index) => (
                  <ForecastCard
                    key={index}
                    date={day.date}
                    tempMin={day.day.mintemp_c}
                    tempMax={day.day.maxtemp_c}
                    condition={{
                      icon: day.day.condition.icon,
                      text: day.day.condition.text,
                    }}
                    astro={day.astro}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Weather;
