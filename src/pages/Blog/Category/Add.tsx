import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";


const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const VERSION = import.meta.env.VITE_BACKEND_API_VERSION;

const AddBlogCategoryPage = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) {
      alert("Category name is required");
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`${BASE_URL}/api/${VERSION}/blogs/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to create category");
      }

      navigate("/blog/all-categories"); // change as needed
    } catch (error) {
      console.error("Error creating blog category:", error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb pageName="Create Blog Category" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark py-6 px-8 max-w-xl mx-auto mt-8">
        <div className="mb-5">
          <label className="block mb-2 text-black dark:text-white">
            Category Name
          </label>
          <input
            type="text"
            placeholder="Enter blog category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
          />
        </div>

        <div className="text-center">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded bg-[#30BFAC] p-3 font-medium text-white hover:bg-opacity-90 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Category"}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddBlogCategoryPage;
