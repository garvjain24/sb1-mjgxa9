import React, { useState, useEffect } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';
import api from '../api';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await api.cart.get();
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const updateQuantity = async (id: string, newQuantity: number) => {
    try {
      await api.cart.add({ productId: id, quantity: newQuantity });
      fetchCart();
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const removeItem = async (id: string) => {
    try {
      await api.cart.remove(id);
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  // ... rest of the component remains the same, but use the `cartItems` state