import React from 'react'
import Hero from '../components/Hero'
import LatestCollections from '../components/LatestCollections'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsLater from '../components/NewsLater'

function Home() {
  return (
    <div>
      <Hero/>
      <LatestCollections/>
      <BestSeller/>
      <br />
      <OurPolicy/>
      <NewsLater/>
    </div>
  )
}

export default Home
