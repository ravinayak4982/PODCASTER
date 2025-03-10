import React from 'react'
import BlogCard from '../Blog Card/BlogCard';
const Likedblog = () => {
  const data = [
    {
      img: "../../../public//images.jpg",
      title: "Lorem Ipsum",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum amet, debitis veritatis reprehenderit est odio nobis laborum totam, error ad repellat minus deleniti alias nemo dolorum corrupti repudiandae. Eos, eaque.",
    },
    {
      img: "../../../public//images.jpg",
      title: "Lorem Ipsum",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum amet, debitis veritatis reprehenderit est odio nobis laborum totam, error ad repellat minus deleniti alias nemo dolorum corrupti repudiandae. Eos, eaque.",
    },
    {
      img: "../../../public//images.jpg",
      title: "Lorem Ipsum",
      desc: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum amet, debitis veritatis reprehenderit est odio nobis laborum totam, error ad repellat minus deleniti alias nemo dolorum corrupti repudiandae. Eos, eaque.",
    },
    {
      img: "../../../public//images.jpg",
      title: "Lorem Ipsum",
      desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum amet, debitis veritatis reprehenderit est odio nobis laborum totam, error ad repellat minus deleniti alias nemo dolorum corrupti repudiandae. Eos, eaque.",
    },
  ];
  return (
 
    <div className=''>
      <h1 className='text-xl font-semibold mb-4 '>Liked Blogs</h1>
      <div className='flex flex-col gap-8 lg:gap-4'>
        {data && data.map((items, i) => {
          return (
            <div key={i} className='flex flex-col lg:flex-row gap-2 lg:gap-4'>
              <BlogCard items={items} />
            </div>
          );
        })}

      </div>
    </div>
  );
};

export default Likedblog