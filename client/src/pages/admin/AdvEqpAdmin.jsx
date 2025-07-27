import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { MdOutlineDelete } from "react-icons/md";
import AdminLayout from "./AdminLayout";

export default function AdvEqpAdmin() {
  const [advanceEqp, setAdvanceEqp] = useState([]);
  const [descriptions, setDescriptions] = useState([]);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  // get
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

  // create
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/advanceEqp/create-advanceEqp`,
        { name, descriptions } // Send name and descriptions array to backend
      );
      if (data.success) {
        toast.success(data.message);
        getAllAdvanceEqp();
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
  const handleDelete = async (aid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/advanceEqp/delete-advanceEqp/${aid}`
      );
      if (data.success) {
        toast.success(`stubble is deleted`);
        getAllAdvanceEqp();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong while deleting advanceEqp");
    }
  };

  const addDescription = () => {
    setDescriptions([...descriptions, ""]);
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
        <h2 className="text-2xl font-semibold">उन्नत उपकरण</h2>
        <div className="flex flex-col space-y-2">
          <form className="mt-4 flex flex-col gap-4">
            <input
              type="text"
              className="block w-full rounded-md border py-3 px-2 text-[14px] text-gray-900 shadow-sm placeholder:text-gray-400"
              placeholder=""
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
                <th className="px-6 py-3 text-left text-sm font-medium">
                  उपकरण
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  विवरण
                </th>
                <th className="px-6 py-3 text-left text-sm font-medium">
                  कार्रवाई
                </th>
              </tr>
            </thead>
            <tbody className="divide-y ">
              {advanceEqp.map((s) => (
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
