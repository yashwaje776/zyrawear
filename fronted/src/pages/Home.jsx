import React from 'react'
import Hero from '../components/Hero'
import Latest_collection from '../components/Latest_collection'
import BestSeller from '../components/BestSeller'
import Ourpolicy from '../components/Ourpolicy'
import Subscribe from '../components/Subscribe'

const Home = () => {
  return (
    <div >
      <Hero/>
      <Latest_collection/>
      <BestSeller/>
      <Ourpolicy/>
      <Subscribe/>
    </div>
  )
}

export default Home
