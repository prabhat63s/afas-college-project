import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import AdminLayout from "./AdminLayout";

export default function SoilAdmin() {
  const [soil, setSoil] = useState([]);
  const [name, setName] = useState("");
  const [descriptions, setDescriptions] = useState([]);
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
        toast.success(data.message);
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

  // create
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/soil/create-soil`,
        { name, descriptions } // Send name and descriptions array to backend
      );
      if (data.success) {
        toast.success(data.message);
        getAllSoil();
        setName("");
        setDescriptions([]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`Something went wrong: ${error.message}`);
    }
  };

  // delete
  const handleDelete = async (sid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/soil/delete-soil/${sid}`
      );
      if (data.success) {
        toast.success(`Soil is deleted`);
        getAllSoil();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting soil");
    }
  };

  const addDescription = () => {
    setDescriptions([...descriptions, ""]); // Add an empty string for a new description
  };

  const updateDescription = (index, value) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions[index] = value;
    setDescriptions(updatedDescriptions);
  };

  const removeDescription = (index) => {
    const updatedDescriptions = [...descriptions];
    updatedDescriptions.splice(index, 1);
    setDescriptions(updatedDescriptions);
  };

  return (
    <AdminLayout>
      <div className="w-full flex h-full overflow-auto flex-col">
        <h2 className="text-2xl font-semibold">मिट्टी परीक्षण</h2>
        <div className="flex flex-col space-y-2">
          <form className="mt-4 flex flex-col gap-4">
            <input
              type="text"
              className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400"
              placeholder="चरण दर्ज करें"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            {descriptions.map((desc, index) => (
              <div key={index} className="flex gap-2">
                <textarea
                  rows="3"
                  value={desc}
                  onChange={(e) => updateDescription(index, e.target.value)}
                  placeholder="विवरण दर्ज करें"
                  className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400 resize-none"
                ></textarea>
                <button
                  type="button"
                  onClick={() => removeDescription(index)}
                  className="p-2 h-fit bg-red-500 text-white rounded-md"
                >
                  <MdOutlineDelete />
                </button>
              </div>
            ))}
            <div className="flex flex-col lg:flex-row gap-4">
              <button
                type="button"
                onClick={addDescription}
                className="flex justify-center lg:w-fit rounded-md bg-emerald-500 py-3 lg:py-2 px-2 font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
              >
                विवरण जोड़ें
              </button>
              <button
                className="flex justify-center lg:w-fit rounded-md bg-emerald-500 py-3 lg:py-2 px-2 font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
                onClick={handleSubmit}
              >
                जोड़ें
              </button>
            </div>
          </form>
        </div>
        <div className="overflow-x-auto mt-5  rounded-md border">
          <table className="min-w-full divide-y">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-medium">चरण</th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  विवरण
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  कार्रवाई
                </th>
              </tr>
            </thead>
            <tbody className="divide-y ">
              {soil.map((s) => (
                <tr key={s._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">{s.name}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">
                      {s.descriptions.map((description, descIndex) => (
                        <p key={descIndex} className="flex flex-col gap-2 mt-2">
                          {description}
                        </p>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => {
                          if (window.confirm("Are you sure to delete?")) {
                            handleDelete(s._id);
                          }
                        }}
                      >
                        <MdOutlineDelete
                          size={20}
                          className="text-red-500 cursor-pointer"
                        />
                      </button>
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
}
