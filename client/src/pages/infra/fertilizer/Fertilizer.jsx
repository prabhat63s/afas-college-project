import React from "react";
import Layout from "../../../components/layout/Layout"; import { Link } from "react-router-dom";
import { BsDot } from "react-icons/bs";

export default function Fertilizer() {
  return (
    <Layout>
      <div className="w-[100%]">
        <div className="lg:max-w-7xl mx-auto my-10 px-4">
          <div className="pb-6 mb-10 border-b">
            <h1 className="text-2xl text-emerald-500 font-semibold mb-2">
              उर्वरक
            </h1>
            <p className="flex">
              उर्वरक वे पदार्थ हैं जो मिट्टी या पौधों को उपलब्ध कराने के लिए
              डाले जाते हैं आवश्यक पोषक तत्व जिनकी मिट्टी में कमी हो सकती है या
              पौधे की वृद्धि के लिए आवश्यक है. ये पोषक तत्व आवश्यक हैं पौधे अपनी
              चयापचय प्रक्रियाओं को पूरा करने, बढ़ने और उत्पादन करने के लिए फल,
              फूल, और बीज। विभिन्न प्रकार के होते हैं उर्वरकों को उनकी पोषक तत्व
              सामग्री के आधार पर वर्गीकृत किया गया है स्रोत। ये दो प्रकार के
              उर्वरक हैं:
            </p>
          </div>
          <div className=" space-y-5">
            <h1 className="font-medium text-lg text-emerald-500">
              1. जैविक खाद:
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <p className="bg-gray-50 p-5 rounded-xl hover:bg-emerald-50">
                <span className="flex items-center font-medium text-emerald-500">
                  <BsDot size={28} />
                  स्रोत:
                </span>
                <p className="pl-7">
                  जैविक खाद प्राकृतिक, जैविक से प्राप्त होते हैं सामग्री, जैसे
                  खाद, खाद, हड्डी का भोजन, और पौधे अवशेष.
                </p>
              </p>
              <p className="bg-gray-50 p-5 rounded-xl hover:bg-emerald-50">
                <span className="flex items-center font-medium text-emerald-500">
                  <BsDot size={28} />
                  पोषक तत्व रिलीज:
                </span>
                <p className="pl-7">
                  जब वे विघटित होते हैं तो वे धीरे-धीरे पोषक तत्व छोड़ते हैं,
                  जिससे एक प्रदान होता है पौधों को पोषक तत्वों की क्रमिक और
                  स्थिर आपूर्ति।
                </p>
              </p>
              <p className="bg-gray-50 p-5 rounded-xl hover:bg-emerald-50">
                <span className="flex items-center font-medium text-emerald-500">
                  <BsDot size={28} />
                  मृदा स्वास्थ्य:
                </span>
                <p className="pl-7">
                  जैविक उर्वरक मिट्टी की संरचना, जलधारण में सुधार करते हैं, और
                  माइक्रोबियल गतिविधि। वे समग्र मृदा स्वास्थ्य को भी बढ़ाते हैं
                  और समय के साथ प्रजनन क्षमता।
                </p>
              </p>
              <p className="bg-gray-50 p-5 rounded-xl hover:bg-emerald-50">
                <span className="flex items-center font-medium text-emerald-500">
                  <BsDot size={28} />
                  पर्यावरण संबंधी विचार:
                </span>
                <p className="pl-7">
                  उन्हें पर्यावरण के अनुकूल माना जाता है क्योंकि वे पोषक तत्वों
                  के अपवाह और जल प्रदूषण के जोखिम को कम करें। वे टिकाऊ और
                  पर्यावरण-अनुकूल बागवानी प्रथाओं को बढ़ावा देना।
                </p>
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4 mt-6 ">
              <Link
                to="/organic-fertilizer"
                className="flex items-center rounded-md bg-emerald-500 px-3.5 py-2.5 text-white hover:bg-emerald-400"
              >
                जैविक खाद कैसे बनाये
              </Link>
              <Link
                to="/contact"
                className="flex items-center rounded-md bg-emerald-500 px-3.5 py-2.5 text-white hover:bg-emerald-400"
              >
                जैविक खाद खरीदने या बेचेंने लेंने के लिए हमसे संपर्क करें
              </Link>
            </div>

            <h1 className="font-medium text-lg text-emerald-500">
              2. रासायनिक (सिंथेटिक) उर्वरक:
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
              <p className="bg-gray-50 p-5 rounded-xl hover:bg-emerald-50">
                <span className="flex items-center font-medium text-emerald-500">
                  <BsDot size={28} />
                  स्रोत:
                </span>
                <p className="pl-7">
                  रासायनिक उर्वरकों का निर्माण रसायन के माध्यम से किया जाता है
                  प्रक्रियाएं, और वे प्राकृतिक जैविक से प्राप्त नहीं होती हैं
                  सामग्री.
                </p>
              </p>
              <p className="bg-gray-50 p-5 rounded-xl hover:bg-emerald-50">
                <span className="flex items-center font-medium text-emerald-500">
                  <BsDot size={28} />
                  पोषक तत्व रिलीज:
                </span>
                <p className="pl-7">
                  वे आसानी से उपलब्ध रूप में पोषक तत्वों को तेजी से जारी करते
                  हैं पौधे। इसके परिणामस्वरूप त्वरित विकास प्रतिक्रियाएँ प्राप्त
                  होती हैं।
                </p>
              </p>
              <p className="bg-gray-50 p-5 rounded-xl hover:bg-emerald-50">
                <span className="flex items-center font-medium text-emerald-500">
                  <BsDot size={28} />
                  सटीक पोषक तत्व:
                </span>
                <p className="pl-7">
                  रासायनिक उर्वरकों में सटीक पोषक तत्व होते हैं, आमतौर पर लेबल
                  पर एन-पी-के अनुपात के रूप में दर्शाया जाता है
                  (नाइट्रोजन-फास्फोरस-पोटेशियम)।
                </p>
              </p>
              <p className="bg-gray-50 p-5 rounded-xl hover:bg-emerald-50">
                <span className="flex items-center font-medium text-emerald-500">
                  <BsDot size={28} />
                  समान संरचना:
                </span>
                <p className="pl-7">
                  उनके पास एक सुसंगत और समान रचना है, जो पोषक तत्व अनुप्रयोग और
                  प्रबंधन को सरल बनाता है।
                </p>
              </p>
              <p className="bg-gray-50 p-5 rounded-xl hover:bg-emerald-50">
                <span className="flex items-center font-medium text-emerald-500">
                  <BsDot size={28} />
                  पर्यावरण संबंधी विचार:
                </span>
                <p className="pl-7">
                  रासायनिक उर्वरकों का अत्यधिक प्रयोग या अनुचित प्रयोग हानिकारक
                  हो सकता है पोषक तत्वों के अपवाह, मिट्टी जैसे पर्यावरणीय
                  मुद्दों को जन्म देता है गिरावट, और जल प्रदूषण। उचित प्रबंधन है
                  इन चिंताओं को कम करने के लिए आवश्यक है।
                </p>
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-6 ">
            <Link
              to="/contact"
              className="flex items-center rounded-md bg-emerald-500 px-3.5 py-2.5 text-white hover:bg-emerald-400"
            >
              रासायनिक खाद खरीदने लेंने के लिए हमसे संपर्क करें
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
