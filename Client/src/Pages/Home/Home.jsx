import React from 'react'
import Header from '../../components/Home/Header';
import Categorish from '../../components/Home/Categorish';
import RecentsBlogs from '../../components/Home/RecentsBlogs';

const Home = () => {
  return (
    <div>
      <Header />
      <Categorish />
      <RecentsBlogs/>
    </div>
  )
}

export default Home;
