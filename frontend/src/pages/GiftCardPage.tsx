import React, { useState } from 'react';
import { Gift, Copy, Mail } from 'lucide-react';
import api from '../api';

const GiftCardPage: React.FC = () => {
  const [amount, setAmount] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [giftCardCode, setGiftCardCode] = useState('');

  const handleGenerateGiftCard = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await api.giftCard.generate({ amount: parseFloat(amount), recipientEmail });
      setGiftCardCode(response.data.code);
    } catch (error) {
      console.error('Error generating gift card:', error);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(giftCardCode);
    // Show a toast or some feedback here
  };

  const handleSendEmail = async () => {
    try {
      await api.giftCard.redeem({ code: giftCardCode, email: recipientEmail });
      // Show success message
    } catch (error) {
      console.error('Error sending gift card:', error);
    }
  };

  // ... rest of the component remains the same