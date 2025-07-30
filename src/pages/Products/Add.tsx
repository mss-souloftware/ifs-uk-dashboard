import React, { useEffect, useState } from 'react';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Link } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;
const VERSION = import.meta.env.VITE_BACKEND_API_VERSION;

const AddProduct: React.FC = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    thumbnail: '',
    categoryId: null as number | null,
    directCheckout: false,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/${VERSION}/products/categories`);
        const data = await response.json();
        if (data.status.success) {
          setCategories(data.data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (categoryId: number) => {
    setFormData((prev) => ({ ...prev, categoryId }));
  };

  const handleDirectCheckout = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, directCheckout: e.target.checked });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You are not logged in. Please sign in first.');
      return;
    }

    if (!formData.categoryId) {
      alert('Please select a category.');
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/api/${VERSION}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          categoryId: formData.categoryId,
          thumbnail: formData.thumbnail,
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          directCheckout: Boolean(formData.directCheckout),
        }),
      });

      const result = await response.json();
      if (result.status.success) {
        alert('Product created successfully!');
      } else {
        alert('Failed to create product: ' + (result.message || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error creating product. Please try again.');
    }
  };

  return (
    <>
      <Breadcrumb pageName="Add New Product" />
      <div className="flex gap-5 flex-col sm:flex-row">
        <div className="flex flex-col gap-5 w-9/12">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark py-4 px-6.5">
            <div>
              <label className="mb-3 block text-black dark:text-white">Product Title</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Product Name"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            <div className="mt-4">
              <label className="mb-3 block text-black dark:text-white">Product Description</label>
              <textarea
                rows={6}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Product Description"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              ></textarea>
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">Product Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                placeholder="9.99$"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            <div>
              <label className="mb-3 block text-black dark:text-white">Thumbnail URL</label>
              <input
                type="text"
                name="thumbnail"
                value={formData.thumbnail}
                onChange={handleInputChange}
                placeholder="Image URL"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
              />
            </div>
            <div className="mt-4 flex items-center">
              <input
                type="checkbox"
                name="directCheckout"
                checked={formData.directCheckout}
                onChange={handleDirectCheckout}
                className="w-3 h-3 accent-primary"
              />
              <label className="ml-2 block text-black dark:text-white">Consultant Product?</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9 w-1/4">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Product Categories</h3>
            </div>
            <div className="flex flex-col gap-3 p-5">
              {categories.map((category) => (
                <label key={category.id} htmlFor={`category-${category.id}`} className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition ${formData.categoryId === category.id ? 'border-primary bg-[#30BFAC]/10 text-[#30BFAC]' : 'border-gray-300 bg-white text-gray-700 hover:border-primary'} dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-primary`}>
                  <input
                    type="radio"
                    id={`category-${category.id}`}
                    name="category"
                    value={category.id}
                    checked={formData.categoryId === category.id}
                    onChange={() => handleCategoryChange(category.id)}
                    className="hidden"
                  />
                  <div className={`h-5 w-5 flex items-center justify-center rounded-full border-2 transition-all ${formData.categoryId === category.id ? 'border-primary bg-[#30BFAC]' : 'border-gray-400 bg-white'}`}>
                    {formData.categoryId === category.id && (
                      <div className="h-2.5 w-2.5 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="text-sm font-medium">{category.name}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark py-4 px-6.5">
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="flex w-full justify-center rounded bg-[#30BFAC] p-3 font-medium text-gray hover:bg-opacity-90"
              >
                Publish
              </button>
              <Link
                to="#"
                className="text-center text-sm text-[#30BFAC] mt-4 inline-block hover:underline"
              >
                Delete Product
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
