import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { useCart } from './context/CartContext'; 
// Assuming all these icons are correctly exported from your Icons.js
import { BagIcon, ShirtIcon, TagIcon, CartIcon, UserIcon, LoginIcon, LogoutIcon } from './Icons'; 

// Categories array must be defined or imported here if not defined globally
const CATEGORIES = [
    { name: 'New Arrivals', link: '/shop/new', icon: TagIcon, image: 'https://img.freepik.com/free-photo/shop-clothing-clothes-shop-hanger-modern-shop-boutique_1150-8886.jpg?semt=ais_hybrid&w=740&q=80', description: 'Fresh styles for the season' },
    { name: 'Tops & Shirts', link: '/shop/tops', icon: ShirtIcon, image: 'https://t3.ftcdn.net/jpg/16/52/65/90/360_F_1652659051_VVaYrvs4orSfyW94wk1uCSs8ePoXr0ac.jpg', description: 'Tees, blouses, and button-ups' },
    { name: 'Bags & Accessories', link: '/shop/bags', icon: BagIcon, image: 'https://cdn.grabon.in/gograbon/indulge/wp-content/uploads/2021/11/Types-of-bags-1.jpg', description: 'Totes, backpacks, and more' },
    { name: 'Sale', link: '/shop/sale', icon: TagIcon, image: 'https://media.istockphoto.com/id/498301640/vector/big-sale-banner.jpg?s=612x612&w=0&k=20&c=fppPOZ3LZCyvtDUiy6tR52xDWofX52Fdu3a7Ltc_fVY=', description: 'Limited-time discounts' },
];
    
// --- MEGAMENU COMPONENT ---
const MegaMenu = ({ isOpen, setMenuOpen }) => {
    const menuClasses = isOpen
        ? 'mega-menu visible opacity-100 translate-y-0'
        : 'mega-menu invisible opacity-0 -translate-y-4';
    
    return (
        <div className={`absolute left-0 w-full z-20 transition-all duration-300 ease-in-out bg-white border-t border-gray-100 shadow-xl ${menuClasses}`}
             onMouseLeave={() => setMenuOpen(false)}>
            <div className="container mx-auto px-6 py-8">
                <div className="grid grid-cols-4 gap-8">
                    {CATEGORIES.map((category) => (
                        <Link 
                            key={category.name}
                            to={category.link}
                            className="group block relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
                            onClick={() => setMenuOpen(false)}
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                                loading="lazy" 
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-end p-4">
                                <category.icon className="h-6 w-6 text-white mb-1" />
                                <h3 className="text-xl font-bold text-white mb-1 leading-tight">
                                    {category.name}
                                </h3>
                                <p className="text-sm text-gray-200">{category.description}</p>
                            </div>
                            <div className="absolute inset-0 border-4 border-transparent group-hover:border-brand-accent transition-all duration-300 pointer-events-none"></div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};


// --- HEADER COMPONENT ---
const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const { user, logout } = useAuth();
    const { totalItems } = useCart(); // GET TOTAL ITEMS FROM CART CONTEXT

    return (
        <div className="relative"> 
            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <Link to="/" className="text-3xl font-extrabold text-brand-primary tracking-tight">initstore</Link>
                    <nav className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-brand-text hover:text-brand-accent transition-colors">Home</Link>
                        <button onMouseEnter={() => setMenuOpen(true)} className="text-brand-text hover:text-brand-accent transition-colors py-4">Shop</button>
                    </nav>
                    <div className="flex items-center space-x-4">
                        
                        {/* CART ICON - ANIMATED and DYNAMIC COUNT */}
                        <Link to="/cart" className="group text-gray-500 hover:text-brand-accent relative transition duration-300">
                            <CartIcon />
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-brand-accent text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                        
                        {user ? (
                            <>
                                {/* NEW: MY ORDERS LINK */}
                                <Link to="/orders" className="text-brand-text hover:text-brand-accent transition-colors flex items-center">
                                    <span className="ml-2">My Orders</span>
                                </Link>
                                
                                <span className="text-brand-text">Welcome, {user.name}!</span>
                                <button onClick={logout} className="text-brand-text hover:text-brand-accent transition-colors flex items-center">
                                    <LogoutIcon /> <span className="ml-2">Logout</span>
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="text-brand-text hover:text-brand-accent transition-colors flex items-center"><UserIcon /> <span className="ml-2">Login</span></Link>
                                <Link to="/signup" className="bg-brand-primary text-white font-bold py-2 px-4 rounded-full hover:bg-opacity-90 transition flex items-center"><LoginIcon /> <span className="ml-2">Sign Up</span></Link>
                            </>
                        )}
                    </div>
                </div>
            </header>
            <MegaMenu isOpen={isMenuOpen} setMenuOpen={setMenuOpen} />
        </div>
    );
};

export default Header;
