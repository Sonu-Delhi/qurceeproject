import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SummaryApi from '../common';

const CategoryList = () => {
  const [categoryProduct, setCategoryProduct] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const categoryLoading = new Array(4).fill(null);

  const navigate = useNavigate();

  const fetchCategoryProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(SummaryApi.categoryProduct.url);
      const dataResponse = await response.json();
      setCategoryProduct(dataResponse?.data || []); // Use optional chaining and default to an empty array
    } catch (err) {
      setError("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryProduct();
  }, []);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory) {
      navigate(`/product-category?category=${selectedCategory}`);
    }
  };

  return (
    <div className="container mx-auto px-4 hidden md:block">
      <div>
        {error && <p className="text-red-500">{error}</p>}
        {loading ? (
          categoryLoading.map((el, index) => (
            <div className="animate-pulse overflow-hidden" key={"categoryLoading" + index}>
              <p>Loading...</p>
            </div>
          ))
        ) : (
          <div className="w-fit">
            <select
              id="category"
              onChange={handleCategoryChange}
              className="block w-full p-2 text-white categorylist bg-blue-500 hover:bg-blue-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              aria-label="Select a Category"
            >
              <option value="">--Select a Category--</option>
              {categoryProduct.length > 0 ? (
                categoryProduct.map((product, index) => (
                  <option key={index} value={product?.category}>
                    {product?.category}
                  </option>
                ))
              ) : (
                <option value="" disabled>No categories available</option>
              )}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
