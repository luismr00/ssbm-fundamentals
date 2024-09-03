import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const IndexTutorials = () => {
  return (
    <div className="gradient-bg font-roboto">
        <Navbar />
        <div className="flex flex-col justify-center items-center custom-container text-white py-44">

            <b className='text-h2'>Tutorials</b>
            <p className='text-paragraph mt-2'>Learn how to use our platform with these tutorials.</p>

            <div className='flex flex-col w-1/3 mt-8 gap-4'>
                <a href='/videos/introduction' className='text-white'>Introduction</a>
                <a href='/videos/punish-game' className='text-white'>Punish Game</a>
                <a href='/videos/neutral-game' className='text-white'>Neutral Game</a>
                <a href='/videos/edgeguard-game' className='text-white'>Edgeguard Game</a>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default IndexTutorials