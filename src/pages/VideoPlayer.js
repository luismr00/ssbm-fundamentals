import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const VideoPlayer = () => {
  return (
    <div className="gradient-bg font-roboto">
    <Navbar />
    <div className="custom-container text-white">
        <div className='mt-16'>
            <iframe
                src="https://www.youtube.com/embed/9bZkp7q19f0"
                title="YouTube video player"
                frameBorder={0}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className='w-full h-screen'
            />
        </div>
        <div className="mt-16 mb-16 flex flex-col gap-[5px]">
            <b className="text-h2">Title of Video</b>
            <p className='text-paragraph '>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
    </div>
    <Footer />
</div>
  )
}

export default VideoPlayer