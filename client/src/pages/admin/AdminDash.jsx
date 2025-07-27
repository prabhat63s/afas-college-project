/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import AdminLayout from "../admin/AdminLayout";
import axios from "axios";
import { FaLeaf } from "react-icons/fa6";

import toast from "react-hot-toast";


export default function AdminDash() {
  const [error] = useState(null);
  const [categories, setCategories] = useState([]);
  const [crops, setCrops] = useState([]);
  const [advanceEqp, setAdvanceEqp] = useState([]);
  const [news, setNews] = useState([]);

  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.log(error);
      toast("something went wrong in getting category");
    }
  };

  const getAllCrops = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/crops/get-crop`
      );
      setCrops(data.getCrops);
    } catch (error) {
      console.error("Error fetching crops:", error);
      toast.error("Something went wrong while fetching crops");
    }
  };

  const getAllAdvanceEqp = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/advanceEqp/get-advanceEqp`
      );
      const data = response.data;

      if (data && data.success) {
        setAdvanceEqp(data.AdvanceEqp);
      } else {
        toast("Failed to fetch advanceEqp data");
      }
    } catch (error) {
      toast("Something went wrong while fetching advanceEqp");
    }
  };
  const getAllNews = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/news/get-news`
      );
      if (data.success) {
        setNews(data.news);
        toast.success(data.message);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
      toast.error("Something went wrong while fetching news");
    }
  };

  useEffect(() => {
    getAllCategory();
    getAllCrops();
    getAllAdvanceEqp();
    getAllNews()
  }, []);

  const boxes = [
    {
      icon: <FaLeaf size={26} />,
      name: "विभिन्न ऋतुएँ", // Different Seasons
      total: categories.length,
    },
    {
      icon: <FaLeaf size={26} />,
      name: "सभी फसलें", // All Crops
      total: crops.length,
    },
    {
      icon: <FaLeaf size={26} />,
      name: "समाचार", // News
      total: news.length,
    },
    {
      icon: <FaLeaf size={26} />,
      name: "उन्नत उपकरण", // Advanced Equipment
      total: advanceEqp.length,
    },
  ];


  return (
    <AdminLayout>
      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {boxes.map((b, index) => (
            <div
              key={index}
              className="h-28 w-full flex flex-row items-center justify-between px-10 gap-10 bg-white rounded-2xl transition-transform duration-300 hover:scale-105"
            >
              <div className="w-[15%] relative flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="60"
                  height="60"
                  viewBox="0 0 48 52"
                  fill="none"
                  className="absolute"
                >
                  <path
                    d="M19.1094 2.12943C22.2034 0.343099 26.0154 0.343099 29.1094 2.12943L42.4921 9.85592C45.5861 11.6423 47.4921 14.9435 47.4921 18.5162V33.9692C47.4921 37.5418 45.5861 40.8431 42.4921 42.6294L29.1094 50.3559C26.0154 52.1423 22.2034 52.1423 19.1094 50.3559L5.72669 42.6294C2.63268 40.8431 0.726688 37.5418 0.726688 33.9692V18.5162C0.726688 14.9435 2.63268 11.6423 5.72669 9.85592L19.1094 2.12943Z"
                    fill="#10b981"
                  />
                </svg>
                <div className="relative z-10 text-white">{b.icon}</div>
              </div>
              <div className="flex justify- flex-col w-[85%]">
                <h1 className="font-medium text-lg">{b.name}</h1>
                <p className="text-2xl mb-0 font-semibold">{b.total}</p>
              </div>
            </div>
          ))}
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </AdminLayout>
  );
}
