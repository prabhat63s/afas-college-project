import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AdminLayout from "../AdminLayout";

const CreateCrop = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState([]);

  const navigate = useNavigate();

  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data.category);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      toast.error("Something went wrong while fetching categories");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL}/api/v1/crops/create-crop`,
        {
          name,
          category,
          description,
        }
      );
      if (data?.success) {
        toast.success("Crop created successfully");
        navigate("/dashboard/admin/crops");
      } else {
        toast.error("Failed to create crop");
      }
    } catch (error) {
      console.error("Error creating crop:", error);
      toast.error("Something went wrong while creating crop");
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const updatedDescription = [...description];
    updatedDescription[index] = { ...updatedDescription[index], [name]: value };
    setDescription(updatedDescription);
  };

  const handleAddDescription = () => {
    setDescription([...description, { title: "", content: "" }]);
  };

  const handleDeleteDescription = (index) => {
    const updatedDescription = [...description];
    updatedDescription.splice(index, 1);
    setDescription(updatedDescription);
  };

  return (
    <AdminLayout>
      <div className="w-full flex flex-col gap-6 lg:flex-row">
        <div className="w-full overflow-auto">
          <h2 className="text-2xl font-semibold">फसल जोड़ें</h2>
          <div className="mt-4">
            <select
              name="category"
              className="block w-full rounded-md border p-2 text-gray-900 shadow-sm placeholder:text-gray-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>-- श्रेणी चुनना --</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <div className="my-3">
              <input
                type="text"
                value={name}
                placeholder="फसल का नाम दर्ज करें"
                className="block w-full rounded-md border p-2 text-gray-900 shadow-sm placeholder:text-gray-400"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <button
                onClick={handleAddDescription}
                className="flex justify-center rounded-md bg-emerald-500 py-3 px-2 font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
              >
                विवरण जोड़ें
              </button>
              {description.map((desc, i) => (
                <div key={i} className="flex flex-col space-y-4 mt-4">
                  <input
                    name="title"
                    value={desc.title}
                    placeholder="शीर्षक"
                    className="block w-full rounded-md border py-3 px-2 text-gray-900 shadow-sm placeholder:text-gray-400"
                    onChange={(e) => handleInputChange(e, i)}
                  />
                  <div className="flex items-center gap-2">
                    <textarea
                      name="content"
                      value={desc.content}
                      placeholder="विवरण"
                      className="block w-full rounded-md border py-3 px-2 text-gray-900 shadow-sm placeholder:text-gray-400"
                      onChange={(e) => handleInputChange(e, i)}
                    />
                    <button
                      onClick={() => handleDeleteDescription(i)}
                      className="flex w-fit justify-center rounded-md bg-emerald-500 py-3 px-2 font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
                    >
                      हटाएँ
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <button
                onClick={handleCreate}
                className="flex justify-center rounded-md bg-emerald-500 py-3 px-2 font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
              >
                फसल बनाएं
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default CreateCrop;
