import React from 'react';
import { Link } from 'react-router-dom';
import { Diamond, ShoppingCart, User } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-royal-dark text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Diamond className="text-royal-accent-diamond" />
          <span className="font-playfair text-2xl font-bold">Royal Jewels</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/shop" className="hover:text-royal-accent-diamond transition-colors">Shop</Link>
          <Link to="/investment" className="hover:text-royal-accent-diamond transition-colors">Invest</Link>
          <Link to="/gift-card" className="hover:text-royal-accent-diamond transition-colors">Gift Cards</Link>
          <Link to="/cart" className="hover:text-royal-accent-diamond transition-colors">
            <ShoppingCart />
          </Link>
          <Link to="/account" className="hover:text-royal-accent-diamond transition-colors">
            <User />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;