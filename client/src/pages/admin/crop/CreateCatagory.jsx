import React, { useEffect, useState } from "react";

import axios from "axios";
import toast from "react-hot-toast";
import { Modal } from "antd";
import CataegoryForm from "../../../components/CataegoryForm";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import AdminLayout from "../AdminLayout";

const CreateCatagory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/v1/category/create-category`,
        { name }
      );
      if (data.success) {
        toast.success(data.message);
        getAllCategory();
        setName("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(`something went wrong ${data.message}`);
    }
  };
  //get all categories
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/v1/category/get-category`
      );
      if (data.success) {
        setCategories(data.category);
        console.log(categories._id);
      }
    } catch (error) {
      console.log(error);
      toast.error("something went wrong in getting category");
    }
  };
  useEffect(() => {
    getAllCategory();
  }, []);
  //update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is updated`);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  //delete category
  const handleDelete = async (pid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API_URL}/api/v1/category/delete-category/${pid}`
      );
      if (data.success) {
        toast.success(`category is deleted`);
        getAllCategory();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Somtihing went wrong");
    }
  };
  return (
    <>
      <AdminLayout>
        <div className="">
          <h1 className="text-2xl font-semibold mb-6">फसल श्रेणी जोड़ें</h1>

          <div className="w-full flex flex-col">
            <div className="mt-4">
              <CataegoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
                actions="श्रेणी दर्ज करें"
              />
            </div>
            <div className="border mt-5 lg: overflow-auto rounded-md">
              <table className="w-[100%] mb-2 text-[14px]">
                <thead className=" font-medium rounded-md bg-gray-50 border-b">
                  <tr className="flex justify-between">
                    <th className="px-6 py-4">श्रेणी नाम</th>
                    <th className="px-6 py-4">कार्रवाई</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat) => (
                    <tr
                      key={cat.name}
                      className="flex justify-between border-b hover:bg-gray-50"
                    >
                      <td className="px-6 py-4"> {cat.name} </td>
                      <td className="flex space-x-2 px-4 py-4">
                        <button
                          title="Delete"
                          onClick={() => {
                            window.confirm("Are you sure to delete?") &&
                              handleDelete(cat._id);
                          }}
                          className="hover:text-red-400"
                        >
                          <MdOutlineDelete size={24} />
                        </button>
                        <button
                          title="Edit"
                          className="hover:text-emerald-400"
                          onClick={() => {
                            setVisible(true);
                            setUpdatedName(cat.name);
                            setSelected(cat);
                          }}
                        >
                          <MdOutlineEdit size={24} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <Modal
            onCancel={() => setVisible(false)}
            footer={null}
            open={visible}
          >
            <CataegoryForm
              value={updatedName}
              setValue={setUpdatedName}
              handleSubmit={handleUpdate}
              actions="अपडेट"
            />
          </Modal>

          <div className="overflow-x-auto">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-white">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Id
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                </tr>
              </thead>
              {/* <tbody className="bg-white divide-y divide-gray-200">
                  {currentUsers.map((user) => (
                    <tr key={user._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user._id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {user.role === 1 ? "Admin" : "User"}
                      </td>
                    </tr>
                  ))}
                </tbody> */}
            </table>
          </div>

          {/* Pagination Controls */}
          <div className="mt-4 flex justify-between items-center">
            <button
              // onClick={() => handlePageChange(currentPage - 1)}
              // disabled={currentPage === 1}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded"
            >
              Previous
            </button>
            <button
              // onClick={() => handlePageChange(currentPage + 1)}
              // disabled={currentPage === totalPages}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded"
            >
              Next
            </button>
          </div>
        </div>
      </AdminLayout>
    </>
  );
};

export default CreateCatagory;
