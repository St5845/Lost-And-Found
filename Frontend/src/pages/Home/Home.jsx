import React from 'react'
import Navbar from './Navbar'
import "../../index.css";
import HeroSection from './HeroSection';
import HowItWorksSection from './HowItWorksSection';
import StatisticsSection from './StatisticsSection';
import Footer from './Footer';

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection/>
     <HowItWorksSection/>
     <StatisticsSection/>
     <Footer/>
     </div>
  )
}

export default Home