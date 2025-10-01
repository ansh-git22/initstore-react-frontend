// src/components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    // Ensure product and its properties exist before accessing them
    if (!product) return null; 

    // Determine badges based on backend data
    const isNew = product.isNew; 
    const isSale = product.isSale;

    return (
        <div className="bg-white border rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* Link to a future product detail page */}
            <Link to={`/product/${product.id}`}>
                <div className="relative">
                    <img 
                        src={product.imageUrl || 'https://via.placeholder.com/400x400.png?text=No+Image'} 
                        alt={product.name} 
                        className="w-full h-64 object-cover"
                    />
                    
                    {/* SALE/NEW Badges */}
                    <div className="absolute top-2 left-2 flex space-x-2">
                        {isNew && (
                            <span className="bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">NEW</span>
                        )}
                        {isSale && (
                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">SALE</span>
                        )}
                    </div>
                </div>

                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800 truncate">{product.name}</h3>
                    <p className={`mt-1 text-xl font-bold ${isSale ? 'text-red-600' : 'text-gray-900'}`}>
                        {/* Format price: using toFixed(2) works for both BigDecimal (as string) and number */}
                        ${product.price ? parseFloat(product.price).toFixed(2) : 'N/A'}
                    </p>
                    <div className="text-yellow-500 text-sm mt-1">Rating: {product.rating || 0}/5</div>
                </div>
            </Link>
        </div>
    );
};

export default ProductCard;