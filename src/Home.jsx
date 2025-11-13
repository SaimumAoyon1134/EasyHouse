import React, { useContext } from 'react'
import { AuthContext } from './AuthContext'
import ContinuousSwiper from './ContinuousSwiper';
import Loading from './Loading';

import "animate.css"
import TopRatedServices from './TopRatedServices';
import StaticSections from './StaticSection';
import Explore from './Explore';



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
      <Explore/>
      <TopRatedServices/>
      <StaticSections/>
  
    
    </div>
  );
}

export default Home
