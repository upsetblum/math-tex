'use client'
import { assets } from '@/Assets/assets'
import axios from 'axios'
import Image from 'next/image'
import React, { useState } from 'react'
import { toast } from 'react-toastify'

const page = () => {

    const [pdfFile,setPdfFile] = useState(false);
    const [data,setData] = useState({
        title:"",
        description:"",
        category:"Math",
        author:"upset blum",
        authorImg:"/profile.PNG"
    })

    const onChangeHandler = (event) =>{
        const name = event.target.name;
        const value = event.target.value;
        setData(data=>({...data,[name]:value}));
        console.log(data);
    }

    const onSubmitHandler = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append('title',data.title);
        formData.append('description',data.description);
        formData.append('category',data.category);
        formData.append('author',data.author);
        formData.append('authorImg',data.authorImg);
        formData.append('pdfFile',pdfFile);
        const response = await axios.post('/api/blog',formData);
        if (response.data.success) {
            toast.success(response.data.msg);
            setPdfFile(false);
            setData({
              title:"",
              description:"",
              category:"Math",
              author:"upset blum",
              authorImg:"/profile.PNG"
            });
        }
        else{
            toast.error("Error");
        }
    }

  return (
    <>
      <form onSubmit={onSubmitHandler} className='pt-5 px-5 sm:pt-12 sm:pl-16'>
        <p className='text-xl'>Upload PDF</p>
        <label htmlFor="pdfFile" className='cursor-pointer'>
            <div className='mt-4 border-2 border-dashed border-gray-300 p-4 text-center'>
                {!pdfFile ?
                    <p className='text-gray-500'>Click to upload PDF file</p> :
                    <p className='text-green-600'>Selected: {pdfFile.name}</p>
                }
            </div>
        </label>
        <input onChange={(e)=>setPdfFile(e.target.files[0])} type="file" id='pdfFile' accept=".pdf" hidden required />
        <p className='text-xl mt-4'>Blog title</p>
        <input name='title' onChange={onChangeHandler} value={data.title} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='Type here' required />
        <p className='text-xl mt-4'>Blog Description</p>
        <textarea name='description' onChange={onChangeHandler} value={data.description} className='w-full sm:w-[500px] mt-4 px-4 py-3 border' type="text" placeholder='write content here' rows={6} required />
        <p className='text-xl mt-4'>Blog category</p>
        <select name="category" onChange={onChangeHandler} value={data.category} className='w-40 mt-4 px-4 py-3 border text-gray-500'>
            <option value="Math">Math</option>
            <option value="Info">Info</option>
        </select>
        <br />
        <button type="submit" className='mt-8 w-40 h-12 bg-black text-white'>ADD</button>
      </form>
    </>
  )
}

export default page
