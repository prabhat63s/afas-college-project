import { Link } from "react-router-dom";
import Layout from "../../../components/layout/Layout"; import toast from "react-hot-toast";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../../../components/Spinner";

export default function OrganicFertilizer() {
  const [fertilizers, setFertilizers] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllOrganicFerti = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/organicFerti/get-organicFerti`
      );
      if (data && data.success) {
        setFertilizers(data.ferti); // Update state with fetched fertilizers
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while fetching organic fertilizers");
    } finally {
      // Set loading to false whether data was fetched successfully or not
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrganicFerti();
  }, []);

  return (
    <Layout>
      <div className="w-full">
        <div className="lg:max-w-7xl mx-auto my-10 px-4">
          <div className="pb-6 mb-10 border-b">
            <h1 className="text-2xl text-emerald-500 font-semibold mb-2">
              {" "}
              जैविक खाद कैसे बनाये
            </h1>
            <span className="">
              <Link to="/">होम / </Link>
              <Link to="/fertilizer">उर्वरक</Link>
            </span>
          </div>
          <div className="text-14px md:text-16px leading-6">
            <div className="space-y-5">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {loading ? (
                  <Spinner />
                ) : (
                  fertilizers.map((fertilizer, i) => (
                    <div
                      key={i}
                      className="bg-gray-50 p-5 rounded-xl hover:bg-emerald-50"
                    >
                      <span className="flex items-center font-medium text-emerald-500">
                        {i + 1}. {fertilizer.name}
                      </span>
                      <div className="pl-7">{fertilizer.description}</div>
                    </div>
                  ))
                )}
              </div>
              <p>
                यह प्रक्रिया सरल होती है और इसमें कुछ सामग्री के साथ सहायता
                मिलनी चाहिए जैसे की खाद, गोबर, और प्राकृतिक स्रोतों का उपयोग
                करना।
              </p>
              <Link
                to="/contact"
                className="flex lg:w-fit items-center rounded-md bg-emerald-500 px-3.5 py-2.5 text-white hover:bg-emerald-400"
              >
                जैविक खाद खरीदने या बेचने के लिए हमसे संपर्क करें
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
