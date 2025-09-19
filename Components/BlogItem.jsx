import { assets, blog_data } from '@/Assets/assets'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogItem = ({title,description,category,id}) => {
  const categoryColors = {
    'Math': 'bg-cyan-400',
    'Info': 'bg-pink-400'
  };

  return (
    <div className='max-w-[350px] bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] hover:shadow-[12px_12px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all transform rotate-1 hover:rotate-0'>
      <div className="p-6">
        <div className={`mb-4 px-3 py-2 inline-block ${categoryColors[category] || 'bg-gray-400'} text-black text-sm font-black uppercase border-2 border-black transform -rotate-2`}>
          {category}
        </div>
        <h5 className='mb-4 text-2xl font-black tracking-tight text-black uppercase leading-tight'>{title}</h5>
        <p className='mb-6 text-base font-semibold text-gray-800' dangerouslySetInnerHTML={{"__html":description.slice(0,120)}}></p>
        <Link
          href={`/blogs/${id}`}
          className='inline-flex items-center px-4 py-3 bg-green-400 text-black font-black text-sm uppercase border-3 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all transform -rotate-1'
          prefetch={true}
        >
            VOIR PDF <Image src={assets.arrow} className='ml-2 filter invert' alt='arrow' width={12} />
        </Link>
      </div>
    </div>
  )
}

export default BlogItem
