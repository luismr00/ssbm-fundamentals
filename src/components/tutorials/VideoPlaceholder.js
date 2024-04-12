import React from 'react'

const VideoPlaceholder = () => {
  return (
    <div>
        <hr />
        <div className='flex mt-12 mb-12 gap-[80px]'>
            <img className='w-1/2 h-1/2' src='https://via.placeholder.com/800x450' alt='placeholder' />
            <div className='flex flex-col justify-center'>
                <b className='text-h4'>Punish Game Basics</b>
                <p className='text-paragraph mt-3'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                <span className='text-paragraph font-light mt-10 hover:underline'><a href='/'>Watch tutorial &nbsp;&nbsp;&gt;</a></span>
                {/* <button className='text-paragraph mt-6 bg-dark border-2 border-white w-24 h-11 text-white'>Watch</button> */}
            </div>
        </div>
    </div>
  )
}

export default VideoPlaceholder