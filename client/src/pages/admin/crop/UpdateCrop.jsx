import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { Select } from "antd";
import { MdDelete } from "react-icons/md";
import AdminLayout from "../AdminLayout";

const { Option } = Select;

const UpdateCrop = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState([]);
  const [id, setId] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/crops/get-crop/${params.slug}`
        );
        const { name, description, category, _id } = data.product;
        setName(name);
        setDescription(description);
        setCategory(category._id);
        setId(_id);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to fetch product details");
      }
    };
    fetchData();
  }, [params.slug]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/category/get-category/`
        );
        if (data?.success) {
          setCategories(data.category);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to fetch categories");
      }
    };
    fetchCategories();
  }, []);

  const handleAddDescription = () => {
    setDescription([...description, { title: "", content: "" }]);
  };

  const handleChange = (e, i) => {
    const { name, value } = e.target;
    const updatedDescription = [...description];
    updatedDescription[i][name] = value;
    setDescription(updatedDescription);
  };

  const handleDeleteDescription = (i) => {
    const updatedDescription = [...description];
    updatedDescription.splice(i, 1);
    setDescription(updatedDescription);
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    try {
      const updatedProduct = {
        name,
        description,
        category,
      };
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/crops/update-crop/${id}`,
        updatedProduct
      );
      if (data?.success) {
        toast.success("Product updated successfully");
        navigate("/dashboard/admin/crops");
      } else {
        toast.error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Something went wrong while updating product");
    }
  };

  const handleDeleteProduct = async () => {
    try {
      const answer = window.confirm(
        "Are you sure you want to delete the product?"
      );
      if (answer) {
        await axios.delete(
          `${process.env.REACT_APP_API_URL}/api/v1/crops/delete-crop/${id}`
        );
        toast.success("Product deleted successfully");
        navigate("/dashboard/admin/crops");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <AdminLayout>
      <div className="w-full h-full overflow-auto">
        <h2 className="text-xl font-semibold ">अपडेट</h2>
        <form onSubmit={handleUpdateProduct} className="flex flex-col my-4">
          <Select
            bordered={false}
            placeholder="Select a category"
            size="large"
            showSearch
            className="border rounded-md mb-3"
            onChange={(value) => setCategory(value)}
            value={category}
          >
            {categories.map((c) => (
              <Option key={c._id} value={c._id}>
                {c.name}
              </Option>
            ))}
          </Select>

          <input
            type="text"
            value={name}
            placeholder="Enter name"
            className="border rounded-md p-2"
            onChange={(e) => setName(e.target.value)}
          />
          <button
            type="button"
            className="flex justify-center my-4 w-fit rounded-md bg-emerald-500 p-2 font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
            onClick={handleAddDescription}
          >
            विवरण जोड़ें
          </button>
          {description.map((desc, i) => (
            <div key={i} className="mb-3 flex flex-col gap-4">
              <input
                name="title"
                value={desc.title}
                placeholder="Enter title"
                className="border rounded-md p-2"
                onChange={(e) => handleChange(e, i)}
              />
              <textarea
                name="content"
                value={desc.content}
                placeholder="Enter description"
                rows={3}
                className="border rounded-md p-2"
                onChange={(e) => handleChange(e, i)}
              ></textarea>
              <button
                type="button"
                className="flex justify-center w-fit rounded-md bg-red-500 p-2 font-semibold leading-6 text-white shadow-sm hover:bg-red-400"
                onClick={() => handleDeleteDescription(i)}
              >
                <MdDelete />
              </button>
            </div>
          ))}
          <div className="flex gap-4">
            <button
              type="submit"
              className="flex justify-center w-fit rounded-md bg-emerald-500 p-2 font-semibold leading-6 text-white shadow-sm hover:bg-emerald-400"
            >
              अपडेट
            </button>
            <button
              type="button"
              className="flex justify-center w-fit rounded-md bg-red-500 p-2 font-semibold leading-6 text-white shadow-sm hover:bg-red-400"
              onClick={handleDeleteProduct}
            >
              हटाएँ
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
};

export default UpdateCrop;
