'use client'
import { assets, blog_data } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
const BlogDetailPage = ({ params }) => {

  const [data, setData] = useState(null);
  const [blogId, setBlogId] = useState(null);

  useEffect(() => {
    const resolveParams = async () => {
      try {
        const resolvedParams = await Promise.resolve(params);
        setBlogId(resolvedParams.id);
      } catch (error) {
        console.error('Error resolving params:', error);
      }
    };

    resolveParams();
  }, [params]);

  useEffect(() => {
    const fetchBlogData = async () => {
      if (!blogId) return;

      console.log('Fetching blog with ID:', blogId);
      try {
        const response = await axios.get('/api/blog', {
          params: {
            id: blogId
          }
        })
        setData(response.data);
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };

    fetchBlogData();
  }, [blogId])

  return (data ? <>
    <div className='bg-yellow-400 py-5 px-5 md:px-12 lg:px-28 border-b-8 border-black'>
      <div className='flex justify-between items-center'>
        <Link href='/' className='text-2xl sm:text-3xl font-black uppercase tracking-tight text-black hover:text-red-500 transition-colors'>
          MATH<span className='text-red-500'>&</span>TEX
        </Link>
        <Link href='/about' className='flex items-center gap-2 font-black py-2 px-4 sm:py-3 sm:px-6 bg-white border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all uppercase text-sm'>
          About <Image src={assets.arrow} alt='Arrow icon' width={12} />
        </Link>
      </div>
      <div className='text-center my-16'>
        <div className='bg-white border-4 border-black p-8 shadow-[8px_8px_0px_0px_#000] transform -rotate-1 max-w-[800px] mx-auto'>
          <h1 className='text-3xl sm:text-5xl font-black uppercase tracking-tight text-black mb-6 leading-tight'>{data.title}</h1>
        </div>
      </div>
    </div>
    <div className='mx-5 max-w-[900px] md:mx-auto mt-[-60px] mb-10'>
      <div className='pdf-container bg-white border-8 border-black shadow-[12px_12px_0px_0px_#000]'>
        {data.image ? (
          <iframe
            src={`${data.image}#toolbar=1&navpanes=0&scrollbar=1&view=FitH`}
            width="100%"
            height="700px"
            style={{border: 'none'}}
            title="PDF Viewer"
            className='block'
          >
            <p>Votre navigateur ne supporte pas l&apos;affichage de PDF.
              <a href={data.image} target="_blank" rel="noopener noreferrer">
                Télécharger le PDF
              </a>
            </p>
          </iframe>
        ) : (
          <div className='p-8 text-center'>
            <p className='text-xl font-black text-black uppercase'>Aucun fichier PDF disponible pour cette ressource.</p>
          </div>
        )}

        <div className='flex justify-center p-6 bg-orange-400 border-t-8 border-black'>
          <a
            href={data.image}
            target="_blank"
            rel="noopener noreferrer"
            className='px-8 py-4 bg-green-400 text-black font-black text-lg uppercase border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[2px_2px_0px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px] transition-all transform -rotate-1'
          >
            📄 PLEIN ÉCRAN
          </a>
        </div>
      </div>

      <div className='blog-content mt-12 bg-cyan-400 border-8 border-black p-8 shadow-[8px_8px_0px_0px_#000] transform -rotate-1'>
        <h3 className='text-3xl font-black mb-6 text-black uppercase tracking-wide'>À PROPOS DE CETTE RESSOURCE :</h3>
        <div className='bg-white border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000] text-lg font-semibold text-black leading-relaxed' dangerouslySetInnerHTML={{__html:data.description}}>
        </div>
      </div>

      <div className='my-16'>
        <div className='bg-purple-400 border-8 border-black p-8 shadow-[8px_8px_0px_0px_#000] transform rotate-1'>
          <div className='flex justify-center items-center gap-6'>
            {data.authorImg && (
              <div className='relative'>
                <Image
                  className='border-4 border-black shadow-[6px_6px_0px_0px_#000] transform rotate-2'
                  src={data.authorImg}
                  width={120}
                  height={120}
                  alt={data.author || 'Author'}
                />
              </div>
            )}
            <div className='bg-yellow-400 border-4 border-black px-6 py-4 transform -rotate-2 shadow-[4px_4px_0px_0px_#000]'>
              <p className='font-black text-black uppercase text-2xl tracking-wide'>{data.author}</p>
              <p className='font-bold text-black text-sm mt-1'>AUTEUR</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </> : <></>
  )
}

export default BlogDetailPage
