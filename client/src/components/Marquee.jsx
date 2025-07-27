import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Marquee = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setIsPaused(false);
  };

  // Fetch all news articles
  const getAllNews = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/news/get-news`
      );
      if (data.success) {
        setNews(data.news);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Something went wrong while fetching news");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllNews();
  }, []);

  return (
    <div
      className="marque-container h-[750px] md:h-[400px] mt-5"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={`marque-content ${isPaused ? "paused" : ""}`}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="w-[100%] leading-7">
            {news.map((n, index) => (
              <Link
                to="/"
                key={index}
                className="w-[100%] py-5 border-b flex flex-col md:flex-row justify-between"
              >
                <div className="w-full md:w-[70%] ">
                  <h1 className="text-2xl font-semibold mb-2">{n.name}</h1>
                  <p className="flex flex-col leading-6">{n.description}</p>
                </div>
                <img
                  src={n.pic}
                  className="hidden md:block w-[350px] rounded-md object-cover object-center mt-5 md:mt-0"
                  alt=""
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marquee;
