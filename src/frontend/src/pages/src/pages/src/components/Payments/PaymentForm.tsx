import { useState } from 'react';
import api from '../../lib/api';
import toast from 'react-hot-toast';

export default function PaymentForm() {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/payments', {
        amount: parseFloat(amount),
        recipient,
      });
      toast.success('Payment sent!');
    } catch (err) {
      toast.error('Payment failed');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Send Money</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          className="w-full p-2 mb-4 border rounded"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Recipient Email"
          className="w-full p-2 mb-4 border rounded"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Send Payment
        </button>
      </form>
    </div>
  );
}