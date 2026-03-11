'use client'
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await axios.post('/api/admin/logout');
    router.push('/admin/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-black text-white font-black text-sm uppercase border-2 border-black shadow-[3px_3px_0px_0px_#facc15] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
    >
      LOGOUT
    </button>
  );
}
