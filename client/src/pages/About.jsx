import React from "react";
import Layout from "../components/layout/Layout";
import { BsDot } from "react-icons/bs";

const ourObjectivePoint = [
  {
    id: 1,

    desc: "किसानों और विशेषज्ञों के बीच ज्ञान के अंतर को पाटने के लिए नवीनतम फसल उत्पादन तकनीक का प्रसार करना।",
  },
  {
    id: 2,

    desc: "खाद्य सुरक्षा सुनिश्चित करने और किसानों की आय बढ़ाने के लिए फसल उत्पादन और उत्पादकता में लगातार वृद्धि करना।",
  },
  {
    id: 3,

    desc: "संरक्षण कृषि को बढ़ावा देना।",
  },
  {
    id: 4,

    desc: "एकीकृत पोषक तत्व प्रबंधन (आईएनएम) और एकीकृत कीट प्रबंधन (आईपीएम) को बढ़ावा देना।",
  },
  {
    id: 5,

    desc: "बागवानी और अन्य उच्च मूल्य वाली फसलों का विविधीकरण। ",
  },
  {
    id: 6,

    desc: "सिंचाई हेतु जल संसाधनों का कुशल प्रबंधन।",
  },
];

const ourVisionPoint = [
  {
    id: 1,
    desc: "हमारा उद्देश्य किशन को फसल उगाने की नवीनतम तकनीक के साथ-साथ आधुनिक औजारों और उपकरणों के उपयोग के बारे में जानकारी प्रदान करना और समय-समय पर फसलों की बिक्री मूल्य का वास्तविक समय डेटा प्रदान करना है। और वे बिना भुगतान किए अपना अनाज कैसे बेच सकते हैं यह किसी तीसरे पक्ष को?",
  },
  {
    id: 2,
    desc: "हमारा मिशन किसानों के लिए कृषि स्तर पर विशिष्ट फसल हस्तक्षेपों के माध्यम से किसी दिए गए क्षेत्र में फसल उत्पादकता और शुद्ध आय बढ़ाना और इसे लंबे समय तक बनाए रखना है।",
  },
];

const About = () => {
  return (
    <Layout>
      <div className="w-[100%]">
        {/* our Objective  */}
        <div className="lg:max-w-7xl mx-auto my-10 px-4">
          <h1 className="text-xl text-emerald-500 font-bold mb-4 border-b-4 w-fit">
            उद्देश्य
          </h1>
          <div className="w-[100%]">
            {ourObjectivePoint.map(({ id, desc, icon }) => (
              <p
                id={id}
                key={id}
                className="flex items-start leading-7"
              >
                <span className="text-emerald-500">
                  <BsDot size={30} />{" "}
                </span>{" "}
                {desc}
              </p>
            ))}
          </div>
        </div>

        {/* our mission & vision  */}
        <div className="lg:max-w-7xl mx-auto my-10 px-4">
          <h1 className="text-xl text-emerald-500 font-bold mb-4 border-b-4 w-fit">
            मिशन और द्रष्टिकोण
          </h1>
          <div className="w-[100%]">
            {ourVisionPoint.map(({ id, desc, icon }) => (
              <p
                id={id}
                key={id}
                className=" flex justify-start py-1 leading-7"
              >
                <span className="text-emerald-500">
                  <BsDot size={30} />{" "}
                </span>{" "}
                {desc}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
