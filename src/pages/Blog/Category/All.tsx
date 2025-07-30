import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";


const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const VERSION = import.meta.env.VITE_BACKEND_API_VERSION;

const AllBlogCategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/api/${VERSION}/blogs/categories`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setCategories(data.data || []);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${BASE_URL}/api/${VERSION}/blogs/categories/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.message || "Delete failed");
      }

      // Remove deleted category from UI
      setCategories((prev) => prev.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
      alert(error.message);
    }
  };

  return (
    <>
      <Breadcrumb pageName="All Blog Categories" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6">
        <div className="flex justify-between mb-4">
          <h2 className="text-lg font-semibold text-black dark:text-white">
            Blog Categories
          </h2>
          <Link
            to="/blog/add-category"
            className="bg-[#30BFAC] text-white px-4 py-2 rounded hover:bg-opacity-90"
          >
            + Add Category
          </Link>
        </div>

        {loading ? (
          <p>Loading categories...</p>
        ) : categories.length === 0 ? (
          <p>No categories found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-100 dark:bg-meta-4 text-left">
                  <th className="py-3 px-4 border-b border-gray-300">#</th>
                  <th className="py-3 px-4 border-b border-gray-300">Name</th>
                  <th className="py-3 px-4 border-b border-gray-300">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr key={category.id} className="border-b border-gray-200 dark:border-gray-700">
                    <td className="py-2 px-4">{index + 1}</td>
                    <td className="py-2 px-4">{category.name}</td>
                    <td className="py-2 px-4 flex gap-2">
                      <Link
                        to={`/blog/edit-category/${category.id}`}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default AllBlogCategoriesPage;
