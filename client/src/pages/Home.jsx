import React from "react";
import Layout from "../components/layout/Layout";
import Marquee from "../components/Marquee";
import { Link } from "react-router-dom";
import Weather from "../components/weather/Weather";
import Bot from "../components/Bot";
import { useAuth } from "../context/auth";

const infraStructure = [
  {
    link: "/crop",
    image:
      "https://img.freepik.com/free-vector/realistic-wheat-composition_1284-22993.jpg?w=740&t=st=1727770591~exp=1727771191~hmac=fb39d2d49d5ddf7d5e3ea8803738e1363c474fdf55d4557c1668ec4729f7f8d1",
    title: "फसल उत्पादन",
  },

  {
    link: "/fertilizer",
    image:
      "https://img.freepik.com/premium-vector/fertilizer-bag-cartoon-vector-set-white-background-isolated_873925-2101612.jpg?w=740",
    title: "उर्वरक",
  },
  {
    link: "/advanceEqp",
    image:
      "https://img.freepik.com/premium-photo/seeder-planter-drill-machine-farm-equipment-3d-rendering-white-background_1113051-1606.jpg?w=826",
    title: "उन्नत कृषि उपकरण",
  },
  {
    link: "/stubble",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwnCDK0ZvGpQouWIwyS47oukpjL1owyx-bVw&usqp=CAU",
    title: "पराली",
  },
  {
    link: "/soil",
    image:
      "https://img.freepik.com/free-vector/soil-science-abstract-concept-vector-illustration-soil-biology-chemistry-environmental-science-natural-resource-study-fertility-properties-land-management-pedology-abstract-metaphor_335657-1982.jpg?t=st=1727770792~exp=1727774392~hmac=1acaca8fdc4c1d3f4b0ef96c24c79aa23ae055ae07b7f9547b68a37d56634516&w=740",
    title: "मिट्टी परीक्षण",
  },
  {
    link: "/greenhouse",
    image:
      "https://img.freepik.com/free-vector/greenhouse-isometric-composition_1284-15767.jpg?t=st=1727770824~exp=1727774424~hmac=b36588e0f85e8c67f2260056fd92d1771700052839f009f9f972f30b7a9c22c4&w=740",
    title: "ग्रीन हाउस",
  },
  {
    link: "/seed",
    image:
      "https://img.freepik.com/free-vector/isolated-plants-shop-white-background8_1308-48686.jpg?t=st=1727770862~exp=1727774462~hmac=8d3e8870e89387ef9118e908f0534062ca2e97092e079aab74c6d476f319bc0a&w=900",
    title: "बीज भंडारित करें",
  },
  {
    image:
      "https://img.freepik.com/free-vector/coming-soon-notification-template-modern-style_1017-53352.jpg?t=st=1727771019~exp=1727774619~hmac=53555eea72f1846448aec621d2a931f3dc295b9d9ba89a96d0b31fc48a5aa9d8&w=826",
    title: "अधिक और विकल्प जल्द ही आ रहे हैं...",
  },
];

const benefits = [
  {
    title: "छोटी जोत वाले किसान",
    description: (
      <>
        विकासशील देशों में कई छोटे किसान गरीबी में रहते हैं और अपनी आय का मुख्य
        स्रोत कृषि पर निर्भर हैं। वे परिवार का समर्थन करते हैं और साल भर कड़ी
        मेहनत करते हैं, ताकि अपने परिवारों के लिए आवश्यकताएं पूरी कर सकें:{" "}
        <span className="font-bold flex gap-2">
          खाना, आश्रय, स्वास्थ्य, देखभाल शिक्षा
        </span>
      </>
    ),
  },
  {
    title: "स्थानीय कृषि व्यवसाय",
    description: (
      <>
        फसल की सुरक्षा स्थानीय कृषि व्यवसायों को छोटे किसानों से अधिक खरीदने,
        कृषि उत्पादों को संसाधित करने और स्थानीय समुदाय में नौकरियां पैदा करने
        में मदद करती है।
      </>
    ),
  },
  {
    title: "उपभोक्ताओं",
    description: (
      <>
        किसानों के साथ फसल की सुरक्षा उपभोक्ताओं को टिकाऊ, उच्च गुणवत्ता वाले
        खाद्य पदार्थों तक पहुंच प्रदान करती है।
      </>
    ),
  },
];

export default function Home() {
  const [auth] = useAuth();

  return (
    <Layout>
      {/* home banner  */}
      <div className="h-60 md:min-h-[400px] flex flex-col space-y-3 justify-center items-center bg-hero opacity-90 bg-no-repeat bg-cover">
        <h1 className="font-semibold font-serif text-4xl text-center text-white md:text-7xl">
          अपनी फसल अपनी सुरक्षा
        </h1>
        <div className="flex gap-4 font-medium">
          <Link
            to="/about"
            className="text-white border shadow-md border-emerald-500 py-2 px-5 mt-4 rounded-lg bg-emerald-500 hover:bg-white hover:text-emerald-500"
          >
            अधिक
          </Link>
          <Link
            to="/contact"
            className="text-emerald-500 border shadow-md border-emerald-500 py-2 px-5 mt-4 rounded-lg bg-white hover:bg-emerald-500 hover:text-white"
          >
            संपर्क करें
          </Link>
        </div>
      </div>

      <div className="w-[100%]">
        {/* weather */}
        <div className="lg:max-w-7xl mx-auto mt-8 px-4">
          <Weather />
        </div>

        {/* News  */}
        <div className="lg:max-w-7xl mx-auto my-16 px-4">
          <h1 className="text-2xl w-fit text-emerald-500 font-bold mb-6 border-b-4">
            समाचार
          </h1>
          <Marquee />
        </div>

        {/* infraStructure  */}
        <div className="lg:max-w-7xl mx-auto my-16 px-4">
          <h1 className="text-2xl w-fit text-emerald-500 font-bold mb-6 border-b-4">
            इन्फ्रास्ट्रक्चर.
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {infraStructure.map((item, index) => (
              <div
                key={index}
                className="rounded-xl overflow-hidden border"
              >
                <Link
                  to={item.link}
                  className="h-40 w-full bg-no-repeat hover:bg-opacity-40 flex flex-col items-center justify-center relative"
                  style={{
                    backgroundImage: `url(${item.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="bg-black hover:bg-emerald-500 hover:bg-opacity-80 bg-opacity-50 w-full h-full flex items-center justify-center">
                    {" "}
                    <h1 className="text-white font-semibold text-center">
                      {item.title}
                    </h1>{" "}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* benifits  */}
        <div className="lg:max-w-7xl mx-auto my-16 px-4">
          <h1 className="text-2xl w-fit text-emerald-500 font-bold mb-6 border-b-4">
            किसे फायदा.
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-4 hover:bg-emerald-50 bg-gray-50 flex flex-col space-y-2 items-start justify-start rounded-xl"
              >
                <h2 className="text-lg text-emerald-500">{benefit.title}</h2>
                <p>{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* community  */}
        <div className="lg:max-w-7xl mx-auto my-16 px-4">
          <div className="w-full p-8 text-center bg-gray-50 hover:bg-emerald-50 rounded-xl ">
            {!auth?.user ? (
              <Link
                to="/sign-in"
                className=" text-emerald-500 text-2xl font-semibold"
              >
                हमारी कम्युनिटी "परामर्श" से जुड़े!
              </Link>
            ) : (
              <Link
                to="/dashboard/community"
                className=" text-emerald-500 text-2xl font-semibold"
              >
                हमारी कम्युनिटी "परामर्श" से जुड़े!
              </Link>
            )}
            <p className="pt-5">
              "हम कृषि हैं, जीवन की भूमि की देखभाल करते हैं और आपके लिए आहार की
              समृद्धि को सुनिश्चित करते हैं। हमारी मेहनत से हरा-भरा खेत आपके लिए
              अनंत संभावनाओं का प्रतीक है। हम कृषि के माध्यम से समृद्धि का संदेश
              भेजते हैं और आपसे सहयोग का अनुरोध करते हैं ताकि हम समुदाय के और
              आपके जीवन को सुखद और समृद्ध बना सकें।"
            </p>
          </div>
        </div>
      </div>

      {/* bots */}
      <Bot />
    </Layout>
  );
}
