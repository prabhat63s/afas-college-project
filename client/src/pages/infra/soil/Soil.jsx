import React, { useEffect, useState } from "react";
import Layout from "../../../components/layout/Layout"; import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Spinner from "../../../components/Spinner";

export default function Soil() {
  const [soil, setSoil] = useState([]);
  const [loading, setLoading] = useState(true);

  // get
  const getAllSoil = async () => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/soil/get-soil`
      );
      const data = response.data;
      if (data && data.success) {
        setSoil(data.soil);
        // toast.success(data.message);
      } else {
        toast.error("Failed to fetch soil testing data");
      }
    } catch (error) {
      console.log(error.response.data); // Log the server response data for more details
      toast.error("Something went wrong while fetching soil test data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllSoil();
  }, []);

  return (
    <Layout>
      <div className="w-[100%]">
        <div className="lg:max-w-7xl mx-auto my-10 px-4">
          <div className="pb-6 mb-10 border-b">
            <h1 className="text-2xl text-emerald-500 font-semibold mb-2">
              {" "}
              मिट्टी की जांच
            </h1>
            <p className="flex items-start justify-start ">
              मिट्टी की जांच (soil testing) एक महत्वपूर्ण प्रक्रिया है जो
              किसानों को उनकी खेत की मिट्टी के गुणवत्ता और पोषण स्तर का
              मूल्यांकन करने में मदद करती है। यह जानने में मदद करती है कि मिट्टी
              में कौन-कौन से पोषक तत्व मौजूद हैं और कितने मात्रा में, जिससे कि
              उन्हें उचित खादों का चयन करने में मदद मिल सके।
            </p>
          </div>
          <div className="flex flex-col space-y-5">
            <p className="flex items-start justify-start ">
              मिट्टी के विभिन्न प्रकार हो सकते हैं, जैसे:
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className=" bg-gray-50 p-5 rounded-xl hover:bg-emerald-50">
                <span className="font-medium text-lg text-emerald-500">
                  1. लोमड़ी मिट्टी (लूस सॉइल):
                </span>
                <p className="flex mt-2 flex-col md:flex-row">
                  यह मिट्टी ज्यादातर रेगिस्तानी इलाकों में पाई जाती है और यहाँ
                  की खेती के लिए उपयुक्त नहीं होती है। इसमें पानी आसानी से सोख
                  जाता है और यहाँ पर पादप विकसित नहीं हो पाते हैं।
                </p>
              </div>
              <div className=" bg-gray-50 p-5 rounded-xl hover:bg-emerald-50">
                <span className="font-medium text-lg text-emerald-500">
                  2. मारूदंडी मिट्टी (सैंडी सॉइल):
                </span>
                <p className="flex mt-2 flex-col md:flex-row">
                  यह मिट्टी रेगिस्तानी इलाकों में पाई जाती है और इसमें खेती के
                  लिए ज्यादा पानी और मिट्टी की जरूरत होती है। यहाँ पर आलू,
                  गन्ना, जूट जैसी फसलें उगाई जाती हैं।
                </p>
              </div>
              <div className=" bg-gray-50 p-5 rounded-xl hover:bg-emerald-50">
                <span className="font-medium text-lg text-emerald-500">
                  3. भूरणी मिट्टी (लोम):
                </span>
                <p className="flex mt-2 flex-col md:flex-row">
                  यह मिट्टी बहुत ही फुर्तील होती है और इसमें पानी की संधारण
                  अच्छी होती है। यहाँ पर चावल, गेहूं, जौ, मक्का, इत्यादि की खेती
                  की जाती है।
                </p>
              </div>
              <div className=" bg-gray-50 p-5 rounded-xl hover:bg-emerald-50">
                <span className="font-medium text-lg text-emerald-500">
                  4. काली मिट्टी (ब्लैक सॉइल):
                </span>
                <p className="flex mt-2 flex-col md:flex-row">
                  यह मिट्टी महाराष्ट्र, मध्य प्रदेश, गुजरात, कर्नाटक, और
                  महाराष्ट्र में पाई जाती है और इसमें काला रंग होता है। यहाँ पर
                  कपास, जूट, मक्का, गेहूं, तिलहन आदि की खेती की जाती है।
                </p>
              </div>
              <div className=" bg-gray-50 p-5 rounded-xl hover:bg-emerald-50">
                <span className="font-medium text-lg text-emerald-500">
                  5. रेगुर मिट्टी (रेड सॉइल):
                </span>
                <p className="flex mt-2 flex-col md:flex-row">
                  यह मिट्टी मध्य प्रदेश, महाराष्ट्र, गुजरात, और तमिलनाडु में पाई
                  जाती है और इसमें लाल रंग होता है। यहाँ पर गेहूं, कपास, तिलहन,
                  और मसूर जैसी खेती की जाती है।
                </p>
              </div>
            </div>

            <p className="flex mt-5 ">
              मिट्टी का परीक्षण खेती में एक महत्वपूर्ण प्रक्रिया है जिससे मिट्टी
              के गुणवत्ता और पोषक तत्वों का स्तर मापा जा सकता है। यह प्रक्रिया
              उत्पादकता को बढ़ाने और उचित खाद का उपयोग करने में मदद करती है।
              मिट्टी के परीक्षण से निम्नलिखित जानकारी प्राप्त की जा सकती है:
            </p>
            {loading ? (
              <Spinner />
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {soil.map((s, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-5 rounded-xl hover:bg-emerald-50"
                  >
                    <span className="font-medium text-lg text-emerald-500">
                      {index + 1}. {s.name}:
                    </span>
                    <p className="flex mt-2 flex-col md:flex-row">
                      {s.descriptions}
                    </p>
                  </div>
                ))}
              </div>
            )}

            <p className="flex mt-5 ">
              फसलों का उत्पादन बढ़ाने के लिए सही उर्वरकों का चयन करना आवश्यक है
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <div className=" bg-gray-50 p-5 rounded-xl hover:bg-emerald-50">
                <span className="font-medium text-lg text-emerald-500">
                  1. उचित खाद का चयन:
                </span>
                <p className="flex mt-2 flex-col md:flex-row">
                  मिट्टी की जांच करने से किसान को यह पता चलता है कि उसकी खेत को
                  कौन-कौन से पोषक तत्वों की जरुरत है। इससे उन्हें उचित खाद का
                  चयन करने में मदद मिलती है।
                </p>
              </div>
              <div className=" bg-gray-50 p-5 rounded-xl hover:bg-emerald-50">
                <span className="font-medium text-lg text-emerald-500">
                  2. पोषण की स्तर का नियंत्रण:
                </span>
                <p className="flex mt-2 flex-col md:flex-row">
                  मिट्टी की जांच करने से किसान को पता चलता है कि कौन-कौन से पोषक
                  तत्वों की कमी हैं और उन्हें कैसे पूरा किया जा सकता है।
                </p>
              </div>
              <div className=" bg-gray-50 p-5 rounded-xl hover:bg-emerald-50">
                <span className="font-medium text-lg text-emerald-500">
                  3. उचित जल नियंत्रण:
                </span>
                <p className="flex mt-2 flex-col md:flex-row">
                  मिट्टी की जांच से किसान को पता चलता है कि किस प्रकार की मिट्टी
                  है जो पानी को कितनी अच्छी तरह से बनाए रख सकती है। इससे उन्हें
                  उचित जल नियंत्रण करने के लिए उपाय अपनाने में मदद मिलती है।
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-6 ">
            <Link
              to="/contact"
              className="flex items-center rounded-md bg-emerald-500 px-3.5 py-2.5 text-white hover:bg-emerald-400"
            >
              मिट्टी की गुणवत्ता का परीक्षण करने के लिए हमसे संपर्क करें
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
