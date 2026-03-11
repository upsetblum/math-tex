'use client';
import { assets } from '@/Assets/assets';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Header = () => {
  const pathname = usePathname();

  return (
    <div className="py-5 px-5 md:px-12 lg:px-28">
      <div className="flex justify-between items-center">
        <div className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-black">
          MATH<span className="text-yellow-400">&</span>TEX
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/convert"
            className={`flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] hover:shadow-[-10px_10px_0px_#000000] transition-all ${pathname === '/convert' ? 'bg-pink-400' : ''}`}
            prefetch={true}
          >
            Convert
          </Link>
          <Link
            href={pathname === '/about' ? '/' : '/about'}
            className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border border-solid border-black shadow-[-7px_7px_0px_#000000] hover:shadow-[-10px_10px_0px_#000000] transition-all"
            prefetch={true}
          >
            {pathname === '/about' ? 'Home' : 'About'} <Image src={assets.arrow} alt="arrow" />
          </Link>
        </div>
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
            Blog de maths • Corrigés LaTeX haute qualité • Solutions pas à pas • PDF téléchargeables
          </p>
        </div>

        {/* Feature cards */}
        <div className="max-w-[1000px] mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Convert feature callout */}
          <div className="transform -rotate-1">
            <div className="bg-cyan-400 border-4 border-black shadow-[8px_8px_0px_0px_#000] p-5 text-left h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl shrink-0">⚡</span>
                <p className="text-xs font-black uppercase tracking-widest text-black">Nouvelle fonctionnalité</p>
              </div>
              <h2 className="text-2xl font-black uppercase text-black leading-tight mb-2">
                PDF → LaTeX
              </h2>
              <p className="text-base font-black text-black mb-1">
                Transforme ton PDF en code LaTeX éditable
              </p>
              <p className="text-xs font-semibold text-black mb-4">
                Dépose un document • récupère le .tex • recompile à la volée • améliore la qualité du contenu
              </p>
              <div className="flex gap-2 flex-wrap mb-5">
                <span className="bg-black text-cyan-400 px-3 py-1 font-black text-xs uppercase">STREAMING</span>
                <span className="bg-black text-cyan-400 px-3 py-1 font-black text-xs uppercase">COMPILABLE</span>
                <span className="bg-black text-cyan-400 px-3 py-1 font-black text-xs uppercase">.TEX</span>
              </div>
              <Link
                href="/convert"
                className="mt-auto flex flex-col items-center justify-center border-4 border-dashed border-black p-5 hover:bg-cyan-300 transition-colors group"
              >
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">📄</span>
                <span className="font-black uppercase text-black text-sm tracking-wide">Déposer un PDF →</span>
              </Link>
            </div>
          </div>

          {/* Rewrite feature callout */}
          <div className="transform rotate-1">
            <div className="bg-pink-400 border-4 border-black shadow-[8px_8px_0px_0px_#000] p-5 text-left h-full flex flex-col">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-2xl shrink-0">✨</span>
                <p className="text-xs font-black uppercase tracking-widest text-black">Nouvelle fonctionnalité</p>
              </div>
              <h2 className="text-2xl font-black uppercase text-black leading-tight mb-2">
                PDF → Réécriture
              </h2>
              <p className="text-base font-black text-black mb-1">
                Réécris automatiquement ton document
              </p>
              <p className="text-xs font-semibold text-black mb-4">
                Dépose un PDF • améliore la typographie • booste la lisibilité • élève la qualité globale
              </p>
              <div className="flex gap-2 flex-wrap mb-5">
                <span className="bg-black text-pink-400 px-3 py-1 font-black text-xs uppercase">TYPOGRAPHIE</span>
                <span className="bg-black text-pink-400 px-3 py-1 font-black text-xs uppercase">LISIBILITÉ</span>
                <span className="bg-black text-pink-400 px-3 py-1 font-black text-xs uppercase">QUALITÉ</span>
              </div>
              <Link
                href="/rewrite"
                className="mt-auto flex flex-col items-center justify-center border-4 border-dashed border-black p-5 hover:bg-pink-300 transition-colors group"
              >
                <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">🖊️</span>
                <span className="font-black uppercase text-black text-sm tracking-wide">Déposer un PDF →</span>
              </Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Header;
