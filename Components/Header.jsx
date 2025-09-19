'use client';
import { assets } from '@/Assets/assets';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Header = () => {
  const [email, setEmail] = useState('');
  const pathname = usePathname();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    const response = await axios.post('/api/email', formData);
    if (response.data.success) {
      toast.success(response.data.msg);
      setEmail('');
    } else {
      toast.error('Error');
    }
  };

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <div className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
          MATH<span className="text-yellow-400">&</span>TEX
        </div>
        <Link
          href={pathname === '/about' ? '/' : '/about'}
          className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] hover:shadow-[-10px_10px_0px_#000000] transition-all"
          prefetch={true}
        >
          {pathname === '/about' ? 'Home' : 'About'} <Image src={assets.arrow} alt="arrow" />
        </Link>
      </div>
      <div className="text-center my-12">
        <h1 className="text-6xl sm:text-8xl font-black uppercase tracking-tight text-black mb-6">
          MATH<span className="text-yellow-400">&</span>TEX
        </h1>
        <div className="bg-yellow-400 border-4 border-black p-6 max-w-[800px] mx-auto transform rotate-1 shadow-[8px_8px_0px_0px_#000]">
          <p className="text-lg sm:text-xl font-bold text-black uppercase tracking-wide">
            <span className="bg-black text-yellow-400 px-2 py-1">DIVISER</span> pour mieux
            <span className="bg-black text-yellow-400 px-2 py-1 ml-2">PARTAGER</span>
          </p>
          <p className="mt-4 text-base font-semibold text-black">
            Corrigés LaTeX haute qualité • Solutions pas à pas • PDF téléchargeables
          </p>
        </div>
        <form
          onSubmit={onSubmitHandler}
          className="flex max-w-[500px] mx-auto mt-10 transform -rotate-1"
          action=""
        >
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="TON EMAIL ICI!"
            className="flex-1 px-4 py-4 text-lg font-bold border-4 border-black outline-none bg-white placeholder-gray-600 uppercase tracking-wide"
            required
          />
          <button
            type="submit"
            className="px-6 py-4 bg-red-500 text-white font-black text-lg uppercase border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all"
          >
            GO!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Header;
