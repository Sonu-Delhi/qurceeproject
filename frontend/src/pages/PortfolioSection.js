import React, { useEffect, useState } from 'react';
import SummaryApi from '../common';

const OurClients = () => {
    const [clients, setClients] = useState([]); // Initialize as an empty array
    const [error, setError] = useState(null); // State for error handling

    const fetchClients = async () => {
        try {
            const response = await fetch(SummaryApi.getClients.url, {
                method: SummaryApi.getClients.method,
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const dataResponse = await response.json();
            setClients(dataResponse.data); // Assuming the data structure is correct
        } catch (error) {
            setError(error.message); // Set error message
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Our Clients</h2>
                {error && <p className="text-red-500 text-center">{error}</p>} {/* Error message display */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {clients.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white p-6 rounded-lg shadow-lg transition-transform duration-300 hover:shadow-2xl hover:scale-105"
                        >
                            <div className="flex items-center justify-center mb-4">
                                <img src={item.logoImage} alt={`${item.companyName} logo`} className="h-20 w-20 object-contain" />
                            </div>
                            <h3 className="text-xl font-semibold text-gray-700 text-center">{item.companyName}</h3>
                            <p className="text-gray-600 text-center mt-2">{item.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OurClients;
