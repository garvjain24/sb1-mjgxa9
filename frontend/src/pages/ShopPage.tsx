import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import api from '../api';

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [searchTerm, priceRange, selectedCategory]);

  const fetchProducts = async () => {
    try {
      const response = await api.products.getAll({
        search: searchTerm,
        minPrice: priceRange[0],
        maxPrice: priceRange[1],
        category: selectedCategory,
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = async (productId) => {
    try {
      await api.cart.add({ productId, quantity: 1 });
      // Show success message or update cart count
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  // ... rest of the component remains the same, but use the `products` state instead of the mock data