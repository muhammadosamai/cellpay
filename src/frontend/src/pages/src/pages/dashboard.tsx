import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { getToken, isTokenExpired } from '../lib/auth';
import api from '../lib/api';
import toast from 'react-hot-toast';
import PaymentForm from '../components/Payments/PaymentForm';

export default function Dashboard() {
  const router = useRouter();
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const token = getToken();
    if (!token || isTokenExpired(token)) {
      router.push('/login');
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('celltopay_token');
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">CellToPay Dashboard</h1>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-800"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="max-w-6xl mx-auto p-4">
        <PaymentForm />
      </main>
    </div>
  );
}