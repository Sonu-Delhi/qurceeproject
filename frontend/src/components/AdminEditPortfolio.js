import React, { useState } from 'react';
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const AdminEditPortfolio = ({ onClose, productData, fetchdata }) => {
    const [data, setData] = useState({
        ...productData,
        companyName: productData?.companyName,
        logoImage: productData?.productImage || [],
        description: productData?.description,
    });

    const [openFullScreenImage, setOpenFullScreenImage] = useState(false);
    const [fullScreenImage, setFullScreenImage] = useState("");

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const uploadImageCloudinary = await uploadImage(file);
        setData((prev) => ({
            ...prev,
            logoImage: [...prev.logoImage, uploadImageCloudinary.url]
        }));
    };

    const handleDeleteProductImage = (index) => {
        const newLogoImage = [...data.logoImage];
        newLogoImage.splice(index, 1);
        setData((prev) => ({
            ...prev,
            logoImage: newLogoImage
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(SummaryApi.updateProduct.url, {
                method: SummaryApi.updateProduct.method,
                credentials: 'include',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (response.ok && responseData.success) {
                toast.success(responseData.message);
                onClose();
                fetchdata();
            } else {
                throw new Error(responseData.message || "Failed to update product.");
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="fixed mt-16 w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
            <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
                <div className="flex justify-between items-center pb-3">
                    <h2 className="font-bold text-lg">Upload Product</h2>
                    <div
                        className="w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer"
                        onClick={onClose}
                    >
                        <CgClose />
                    </div>
                </div>

                <form className="grid p-4 gap-2 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
                    <label htmlFor="logoImage" className="mt-3">Product Image :</label>
                    <label htmlFor="uploadImageInput">
                        <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
                            <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                                <span className="text-4xl"><FaCloudUploadAlt /></span>
                                <p className="text-sm">Upload Product Image</p>
                                <input
                                    type="file"
                                    id="uploadImageInput"
                                    className="hidden"
                                    onChange={handleUploadProduct}
                                />
                            </div>
                        </div>
                    </label>
                    <div>
                        {data.logoImage.length > 0 ? (
                            <div className="flex items-center gap-2">
                                {data.logoImage.map((el, index) => (
                                    <div key={index} className="relative group">
                                        <img
                                            src={el}
                                            alt="Product"
                                            width={80}
                                            height={80}
                                            className="bg-slate-100 border cursor-pointer"
                                            onClick={() => {
                                                setOpenFullScreenImage(true);
                                                setFullScreenImage(el);
                                            }}
                                        />
                                        <div
                                            className="absolute bottom-0 right-0 p-1 text-white bg-blue-600 rounded-full hidden group-hover:block cursor-pointer"
                                            onClick={() => handleDeleteProductImage(index)}
                                        >
                                            <MdDelete />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-blue-600 text-xs">*Please upload product image</p>
                        )}
                    </div>

                    <label htmlFor="companyName" className="mt-3">Company Name :</label>
                    <input
                        type="text"
                        id="companyName"
                        placeholder="Enter company name"
                        value={data.companyName}
                        name="companyName"
                        onChange={handleOnChange}
                        className="p-2 bg-slate-100 border rounded"
                        required
                    />

                    <label htmlFor="description" className="mt-3">Description :</label>
                    <textarea
                        className="h-28 bg-slate-100 border resize-none p-1"
                        placeholder="Enter product description"
                        rows={3}
                        onChange={handleOnChange}
                        name="description"
                        value={data.description}
                    ></textarea>

                    <button className="px-3 py-2 bg-blue-600 text-white mb-10 hover:bg-blue-700">
                        Upload Portfolio
                    </button>
                </form>
            </div>

            {openFullScreenImage && (
                <DisplayImage
                    onClose={() => setOpenFullScreenImage(false)}
                    imgUrl={fullScreenImage}
                />
            )}
        </div>
    );
};

export default AdminEditPortfolio;