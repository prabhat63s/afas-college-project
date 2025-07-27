import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import axios from "axios";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import cropsRoutes from "./routes/CropsRoutes.js";
import newsRoute from "./routes/newsRoute.js";
import organicFertiRoute from "./routes/organicFertiRoute.js";
import greenhouseRoute from "./routes/greenhouseRoute.js";
import stubbleRoute from "./routes/stubbleRoute.js";
import seedRoute from "./routes/seedRoute.js";
import soilRoute from "./routes/soilRoute.js";
import advanceEqpRoute from "./routes/advanceEqpRoute.js";
import postRoute from "./routes/postRoute.js";
import cors from "cors";


//configure env
dotenv.config();


//databse config
connectDB();

//rest object
const app = express();

//PORT
const PORT = process.env.PORT || 8080;

console.log(process.env.PORT);

//middelwares
app.use(
  cors({
    origin: ["http://localhost:3000", "https://afas-live.onrender.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(morgan("dev"));

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/crops", cropsRoutes);
app.use("/api/v1/news", newsRoute);
app.use("/api/v1/organicFerti", organicFertiRoute);
app.use("/api/v1/greenhouse", greenhouseRoute);
app.use("/api/v1/stubble", stubbleRoute);
app.use("/api/v1/advanceEqp", advanceEqpRoute);
app.use("/api/v1/seed", seedRoute);
app.use("/api/v1/soil", soilRoute);
app.use("/api/v1/posts", postRoute);

app.get("/api/v1/weather/:city", async (req, res) => {
  const API_KEY = process.env.WEATHER_API_KEY;
  const city = req.params.city;

  if (!API_KEY) {
    return res
      .status(500)
      .json({ error: "API key is missing from environment variables" });
  }

  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);

    if (error.response && error.response.status === 400) {
      res
        .status(400)
        .json({ error: "City not found. Please try a different city." });
    } else {
      res
        .status(500)
        .json({
          error: "Failed to fetch weather data. Please try again later.",
        });
    }
  }
});

app.get("/api/v1/forecast", async (req, res) => {
  const API_KEY = process.env.WEATHER_API_KEY;
  const { lat, lon } = req.query;

  if (!API_KEY) {
    return res.status(500).json({ error: "API key is missing from environment variables" });
  }

  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7`
    );
    res.json(response.data.forecast.forecastday);
  } catch (error) {
    console.error(error);
    if (error.response && error.response.status === 400) {
      res.status(400).json({ error: "Invalid coordinates. Please provide valid latitude and longitude." });
    } else {
      res.status(500).json({ error: "Failed to fetch forecast data. Please try again later." });
    }
  }
});


//run listen
app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
