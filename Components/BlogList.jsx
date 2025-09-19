import { blog_data } from '@/Assets/assets'
import React, { useEffect, useState } from 'react'
import BlogItem from './BlogItem'
import axios from 'axios';

const BlogList = () => {

    const [menu,setMenu] = useState("All");
    const [blogs,setBlogs] = useState([]);

    const fetchBlogs = async () =>{
      const response = await axios.get('/api/blog');
      setBlogs(response.data.blogs);
    }

    useEffect(()=>{
      fetchBlogs();
    },[])

  return (
    <div>
      <div className='flex justify-center gap-4 my-12'>
        <button
          onClick={()=>setMenu('All')}
          className={`px-6 py-3 font-black text-lg uppercase border-4 border-black transition-all ${
            menu==="All"
              ? 'bg-purple-400 text-black shadow-[6px_6px_0px_0px_#000] transform rotate-2'
              : 'bg-white text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]'
          }`}
        >
          TOUS
        </button>
        <button
          onClick={()=>setMenu('Math')}
          className={`px-6 py-3 font-black text-lg uppercase border-4 border-black transition-all ${
            menu==="Math"
              ? 'bg-cyan-400 text-black shadow-[6px_6px_0px_0px_#000] transform rotate-2'
              : 'bg-white text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]'
          }`}
        >
          MATH
        </button>
        <button
          onClick={()=>setMenu('Info')}
          className={`px-6 py-3 font-black text-lg uppercase border-4 border-black transition-all ${
            menu==="Info"
              ? 'bg-pink-400 text-black shadow-[6px_6px_0px_0px_#000] transform rotate-2'
              : 'bg-white text-black shadow-[4px_4px_0px_0px_#000] hover:shadow-[6px_6px_0px_0px_#000] hover:translate-x-[-2px] hover:translate-y-[-2px]'
          }`}
        >
          INFO
        </button>
      </div>
      <div className='flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24'>
        {blogs.filter((item)=> menu==="All"?true:item.category===menu).map((item,index)=>{
            return <BlogItem key={index} id={item._id} title={item.title} description={item.description} category={item.category} />
        })}
      </div>
    </div>
  )
}

export default BlogList
