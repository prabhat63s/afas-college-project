import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { BsPencil } from "react-icons/bs";
import AdminLayout from "../AdminLayout";

const Crops = () => {
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    getAllCrops();
  }, []);

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

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-semibold mb-6">सभी फसलें</h1>
        <div className="overflow-x-auto">
          <table className="w-full divide-y divide-gray-200">
            <thead className="bg-white">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">फसल</th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  शीर्षक
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  विवरण
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  कार्रवाई
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {crops.map((c) => (
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{c.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {c.description.map((desc, index) => (
                      <div
                        key={index}
                        className="leading-7 text-sm font-medium"
                      >
                        {desc.title}
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {c.description.map((desc, index) => (
                      <div
                        key={index}
                        className="leading-7 truncate w-96 text-sm font-medium"
                      >
                        {desc.content}
                      </div>
                    ))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-4">
                      <Link
                        to={`/dashboard/admin/crops/updateCrop/${c.slug}`}
                        className="text-emerald-600 hover:text-emerald-900"
                      >
                        <BsPencil />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Crops;
