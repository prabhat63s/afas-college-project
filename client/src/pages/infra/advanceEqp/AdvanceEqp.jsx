import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout"; import Spinner from "../../../components/Spinner";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function AdvanceEqp() {
  const [advanceEqp, setAdvanceEqp] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllAdvanceEqp = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/advanceEqp/get-advanceEqp`
      );
      const data = response.data;

      if (data && data.success) {
        setAdvanceEqp(data.AdvanceEqp); // Assuming the key is 'AdvanceEqp'
      } else {
        toast.error("Failed to fetch advanceEqp data");
      }
    } catch (error) {
      console.error("Error fetching advanceEqp data:", error);
      toast.error("Something went wrong while fetching advanceEqp");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllAdvanceEqp();
  }, []);

  return (
    <Layout>
      <div className="w-full">
        <div className="lg:max-w-7xl mx-auto my-10 px-4">
          <div className="pb-6 mb-10 border-b">
            <h1 className="text-2xl text-emerald-500 font-semibold mb-2">
              {" "}
              उन्नत कृषि उपकरण
            </h1>
            <p className="flex items-start justify-start ">
              उन्नत कृषि उपकरणों और प्रौद्योगिकी ने कृषि उद्योग में क्रांति ला
              दी है, दक्षता, उत्पादकता और स्थिरता में सुधार किया है। ये उपकरण और
              प्रौद्योगिकियाँ किसानों और कृषि पेशेवरों को अपने कार्यों को
              सुव्यवस्थित करने, शारीरिक श्रम को कम करने और डेटा-संचालित निर्णय
              लेने में मदद करती हैं। यहां कुछ उन्नत कृषि उपकरण और
              प्रौद्योगिकियां दी गई हैं|
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {loading ? (
              <p>
                <Spinner />
              </p>
            ) : advanceEqp.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {advanceEqp.map((item, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-5 rounded-xl hover:bg-emerald-50"
                  >
                    <span className="font-medium text-lg text-emerald-500">
                      {index + 1}. {item.name}:
                    </span>
                    <p className="flex mt-2">{item.descriptions.join(" ")}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p>No advanceEqp data available</p>
            )}
            <p className="">
              हालाँकि, फसल के प्रकार, जलवायु और कृषि प्रणाली के आधार पर पराली
              प्रबंधन प्रथाएँ भिन्न हो सकती हैं। कुछ किसान जुताई के माध्यम से
              पराली को मिट्टी में मिलाने का विकल्प चुन सकते हैं या इसे तेजी से
              तोड़ने के लिए पराली मल्चर या श्रेडर जैसे विशेष उपकरणों का उपयोग कर
              सकते हैं। अन्य लोग इसे संरक्षण जुताई या बिना जुताई वाली खेती के
              रूप में सतह पर अछूता छोड़ सकते हैं। पराली प्रबंधन पद्धति का चुनाव
              मिट्टी के प्रकार, फसल चक्र और संरक्षण लक्ष्य जैसे कारकों पर निर्भर
              करता है।
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-6">
            <Link
              to="http://localhost:3000/"
              className="flex items-center rounded-md bg-emerald-500 px-3.5 py-2.5 text-white hover:bg-emerald-400"
            >
              खरीदने के लिए इस लिंक पर जाएं
            </Link>
            <Link
              to="/contact"
              className="flex items-center rounded-md bg-emerald-500 px-3.5 py-2.5 text-white hover:bg-emerald-400"
            >
              किराए पर लेंने के लिए हमसे संपर्क करें
            </Link>
            <Link
              to="/contact"
              className="flex items-center rounded-md bg-emerald-500 px-3.5 py-2.5 text-white hover:bg-emerald-400"
            >
              जानें इसका उपयोग कैसे करें
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
