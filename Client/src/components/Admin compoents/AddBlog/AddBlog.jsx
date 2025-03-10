import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";

const AddBlog = () => {
  const backendLink = useSelector((state) => state.prod.link);
  const [Tittle, setTittle] = useState("");
  const [Description, setDescription] = useState("");
  const [Image, setImage] = useState(null); // Ensure it's null initially
  const [Loading, setLoading] = useState(false);
  const [Cat, setCat] = useState("");
  const [ActualCategory, setActualCategory] = useState();
  const [categoryId, SetcategoryId] = useState("");
  const handleAddBlog = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const form = new FormData();
      form.append("tittle", Tittle);
      form.append("desc", Description);
      form.append("image", Image); // Append the file correctly
      form.append("category",categoryId)

      const response = await axios.post( `${backendLink}/app/v1/addBlog`,
        form,
        { withCredentials: true, }
      );
      toast.success(response.data.message);
      
    } catch (error) {
     toast.error(error.response.data.message);
    }
    finally {
      setTittle("");
      setDescription("");
      setImage(null)
      setLoading(false);
    }
  };
  const handleCategory=async(e) => {
    e.preventDefault();
   
     const response = await axios.post( `${backendLink}/app/v1/addCategory`,
        {tittle:Cat},
        { withCredentials: true, }
      );
    toast.success(response.data.message);
    setCat("");
      
  }
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`${backendLink}/app/v1/getCategory`,
      
        { withCredentials: true, }
      );
     setActualCategory(response.data.category);
    }
    fetch()
  }, [backendLink])
  

  return (
    <div className=" m-4  h-screen">
      <div className="bg-white p-4 rounded shadow">
         <h1 className="text-2xl font-semibold">Add Blog</h1>
      <form className="my-4 flex flex-col gap-4" onSubmit={handleAddBlog}>
        <input
          type="text"
          placeholder="Enter Title"
          className="p-4 bg-transparent outline-none text-3xl border-b w-full border-zinc-500 font-semibold"
          value={Tittle}
          onChange={(e) => setTittle(e.target.value)}
        />
        <textarea
          rows="5"
          cols="3"
          placeholder="Enter Description"
          className="p-4 bg-transparent outline-none text-2xl border-b w-full border-zinc-500 font-semibold"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {/* Fix file input handling */}
        <div className="flex items-center justify-between"> 
          <input
            type="file"
            className="bg-zinc-900 text-2xl text-white rounded"
            accept=".jpeg,.png,.jpg"
            onChange={(e) => setImage(e.target.files[0])} // Use files[0]
          />
          <select 
  name="tittle" 
  id="" 
  className="px-4 py-2 mx-30 rounded shadow bg-blue-400" 
  onChange={(e) => SetcategoryId(e.target.value)} // ✅ Properly placed onChange event
>
  <option value="">Select category</option>
  {ActualCategory && ActualCategory.map((items, i) => (
    <option key={i} value={items.tittle}>{items.tittle}</option>
  ))}
</select>

        </div>
        <hr className="border b border-zinc-500" />
        <div>
         {Loading ? (
  <button
    className="mx-40 py-3 flex items-center justify-center bg-zinc-800 w-100 bg-gradient-to-r from-yellow-400 to-yellow-600 
      text-white font-semibold px-4 rounded-lg shadow-md hover:shadow-lg transition hover:scale-105 duration-300"
    disabled
  >
    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0h-2a6 6 0 10-12 0H4z"></path>
    </svg>
    Adding Blogs...
  </button>
) : (
  <button
    className="mx-40 py-3 flex items-center justify-center bg-zinc-800 w-100 bg-gradient-to-r from-yellow-400 to-yellow-600 
      text-white font-semibold px-4 rounded-lg shadow-md hover:shadow-lg transition hover:scale-105 duration-300"
  >
    Add Blog
  </button>
)}

        
        </div>
      </form>
     </div>
           <div className="bg-white p-4 rounded shadow mt-8">

      <h1 className="text-2xl font-semibold mt-8">Add New Category</h1>
      <form action="" className="mt-4 "onSubmit={handleCategory}>
        <input type="text" placeholder="your new category"
          required
          className="bg-none border outline-none px-4 py-2 rounded bg-gray-50"
          value={Cat}
          onChange={(e)=>setCat(e.target.value)}
        />
        <button className="ms-4 bg-blue-600 px-4 py-2 rounded text-white">Add category</button>
        </form>
        </div>
      <br>
      </br>
      <br>
      </br>
    </div>
  );
};

export default AddBlog;
