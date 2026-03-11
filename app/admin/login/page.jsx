'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LoginPage() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await axios.post('/api/admin/login', { password });
      router.push('/admin');
    } catch {
      setError('Invalid password. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-400 flex items-center justify-center">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] p-10 w-full max-w-sm">
        <h1 className="text-3xl font-black uppercase tracking-tight mb-8 text-center">MATH&TEX<br/>Admin</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="px-4 py-3 border-4 border-black font-semibold text-lg focus:outline-none focus:bg-yellow-50"
          />
          {error && (
            <p className="bg-red-400 border-2 border-black px-3 py-2 font-bold text-sm">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white font-black text-lg uppercase py-3 border-4 border-black shadow-[4px_4px_0px_0px_#facc15] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}
