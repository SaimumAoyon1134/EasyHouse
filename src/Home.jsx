import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import ContinuousSwiper from './ContinuousSwiper';
import Loading from './Loading';
import PopularCategories from './PopularCategories';
import "animate.css"



const Home = () => {
  const { user, isLoading } = useContext(AuthContext)
  if (isLoading) {
    return (
      <Loading/>
    )
  }
  
  return (
    <div className="animate__animated animate__fadeInLeft">
      <ContinuousSwiper />
      <PopularCategories />
  
    
    </div>
  );
}

export default Home
