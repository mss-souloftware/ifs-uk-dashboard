import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const VERSION = import.meta.env.VITE_BACKEND_API_VERSION;

interface Category {
  id: number;
  name: string;
  picture: string | null;
  shortDescription: string;
  longDescription: string;
  needConsultation: boolean;
  type: string;
  createdAt: string;
  updatedAt: string;
}

const AllCategory = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/${VERSION}/products/categories`);
        const data = await response.json();
        console.log('API Response:', data);
        setCategories(data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem('token');
    if (!confirm('Are you sure you want to delete this category?')) return;

    try {
      const response = await fetch(`${BASE_URL}/api/${VERSION}/products/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to delete category with ID ${id}`);
      }

      // Remove the deleted category from the list
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="py-4 px-4 font-medium text-black dark:text-white">Name</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Type</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Need Consultation</th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="py-5 text-center text-gray-500 dark:text-gray-400">Loading...</td>
              </tr>
            ) : categories.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-5 text-center text-gray-500 dark:text-gray-400">No categories available</td>
              </tr>
            ) : (
              categories.map((category) => (
                <tr key={category.id}>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <h5 className="font-medium text-black dark:text-white">{category.name}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{category.type}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{category.needConsultation ? 'Yes' : 'No'}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <Link
                        to={`/categories/edit/${category.id}`}
                        className="text-blue-500 hover:text-blue-700"
                        onClick={(e) => e.stopPropagation()}
                      >
                         <svg width="18" height="18" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title></title> <g id="Complete"> <g id="edit"> <g> <path d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8" fill="none" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path> <polygon fill="none" points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8" stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></polygon> </g> </g> </g> </g></svg>
                      </Link>
                      <button className="text-gray-700 deleteButton" onClick={() => handleDelete(category.id)}>
                        <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852Z" fill="" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCategory;
