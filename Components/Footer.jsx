import { assets } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-black border-t-8 border-yellow-400 py-10 px-5'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col lg:flex-row justify-between items-center gap-8'>
          <div className='flex flex-col items-center lg:items-start'>
            <div className='text-3xl sm:text-4xl font-black uppercase tracking-tight text-white mb-4'>
              MATH<span className='text-yellow-400'>&</span>TEX
            </div>
            <p className='text-gray-300 font-bold text-sm uppercase tracking-wide'>
              DIVISER POUR MIEUX PARTAGER
            </p>
          </div>

          <div className='flex flex-col sm:flex-row gap-6 text-center'>
            <Link
              href="/mentions-legales"
              className='px-6 py-3 bg-cyan-400 text-black font-black text-sm uppercase border-4 border-white shadow-[4px_4px_0px_0px_#fff] hover:shadow-[2px_2px_0px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all transform rotate-1'
            >
              MENTIONS LÉGALES
            </Link>
            <Link
              href="/politique-confidentialite"
              className='px-6 py-3 bg-pink-400 text-black font-black text-sm uppercase border-4 border-white shadow-[4px_4px_0px_0px_#fff] hover:shadow-[2px_2px_0px_0px_#fff] hover:translate-x-[2px] hover:translate-y-[2px] transition-all transform -rotate-1'
            >
              POLITIQUE DE CONFIDENTIALITÉ
            </Link>
          </div>

          <div className='flex gap-2'>
            <div className='p-3 bg-red-500 border-4 border-white transform rotate-3 hover:rotate-0 transition-all'>
              <Image src={assets.facebook_icon} alt='Facebook' width={24} />
            </div>
            <div className='p-3 bg-green-400 border-4 border-white transform -rotate-3 hover:rotate-0 transition-all'>
              <Image src={assets.twitter_icon} alt='Twitter' width={24} />
            </div>
            <div className='p-3 bg-purple-400 border-4 border-white transform rotate-2 hover:rotate-0 transition-all'>
              <Image src={assets.googleplus_icon} alt='Google Plus' width={24} />
            </div>
          </div>
        </div>

        <div className='mt-8 pt-6 border-t-4 border-yellow-400 text-center'>
          <p className='text-white font-bold text-sm uppercase tracking-wide'>
            © 2024 MATH&TEX - TOUS DROITS RÉSERVÉS
          </p>
        </div>
      </div>
    </div>
  )
}

export default Footer
