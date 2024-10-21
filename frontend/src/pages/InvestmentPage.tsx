import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import api from '../api';

const InvestmentPage: React.FC = () => {
  const [rates, setRates] = useState({ gold: 0, silver: 0 });
  const [investmentType, setInvestmentType] = useState('gold');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const response = await api.investment.getRates();
      setRates(response.data);
    } catch (error) {
      console.error('Error fetching rates:', error);
    }
  };

  const handleInvest = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.investment.buy({ type: investmentType, amount: parseFloat(amount) });
      // Show success message and reset form
      setAmount('');
    } catch (error) {
      console.error('Error investing:', error);
    }
  };

  // ... rest of the component remains the same, but use the `rates` state instead of hardcoded values