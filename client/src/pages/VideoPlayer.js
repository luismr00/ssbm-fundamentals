// import React from 'react'
// import Navbar from '../components/Navbar'
// import Footer from '../components/Footer'

// const VideoPlayer = () => {
//   return (
//     <div className="gradient-bg font-roboto">
//       <Navbar />
//       <div className="custom-container text-white">
//         <div className='flex mt-16 gap-[24px] '>
//           <iframe
//             src="https://www.youtube.com/embed/9bZkp7q19f0"
//             title="YouTube video player"
//             frameBorder={0}
//             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//             allowFullScreen
//             className='w-2/3 h-[750px]'
//           />
          
//           <div className='w-1/3 h-[750px] p-16 bg-dark'>
//             <div className="">
//             <b className="text-h3">Title of Video</b>
//             <p className='text-paragraph text-justify mt-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
//             </div>
//             <div className='mt-3'>
//                 <p className="text-sm text-gray-400">Uploaded on April 10, 2024 • 1.2M views • 5.2K likes</p>
//                 <p className="text-sm text-gray-400 mt-2">Tags: #tag1 #tag2 #tag3</p>
//             </div>
//             <div className='mt-3'>
//                 <button className="text-gray-500 hover:text-blue-500 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
//                 </svg>
//                 </button>
//                 <button className="text-gray-500 hover:text-red-500">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//                 </button>
//             </div>
//         </div>
//         </div>
//         {/* Add anchor links below to go back to the previous video link and another to go to the next video. Add some arrows along with the text as well. */}
//         {/* <div className="flex justify-between items-center mt-8">
//             <a href="/" className="text-white hover:text-blue-500">&lt;&mdash; Go Back</a>
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"></svg>
//             <a href="/" className="text-white hover:text-blue-500">Continue to Next Video &mdash;&gt;</a>
//         </div> */}
//         {/* <div className='mt-12 mb-5 p-16'>
//             <div className="">
//             <b className="text-h3">Title of Video</b>
//             <p className='text-paragraph text-justify mt-2'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
//             </div>
//             <div className='mt-3'>
//                 <p className="text-sm text-gray-400">Uploaded on April 10, 2024 • 1.2M views • 5.2K likes</p>
//                 <p className="text-sm text-gray-400 mt-2">Tags: #tag1 #tag2 #tag3</p>
//             </div>
//             <div className='mt-3'>
//                 <button className="text-gray-500 hover:text-blue-500 mr-4">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
//                 </svg>
//                 </button>
//                 <button className="text-gray-500 hover:text-red-500">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                 </svg>
//                 </button>
//             </div>
//         </div> */}
//         {/* </div> */}
//         {/* <div>
//           <h3 className="text-h3 mb-2">Navigate</h3>
//           <div className="flex justify-between">
//             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
//               Go Back
//             </button>
//             <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//               Continue to Next Video
//             </button>
//           </div>
//         </div> */}
//       </div>
//       {/* Add a comments section below */}
//       <div className="custom-container text-white mt-16 mb-16">
//         <b className="text-h4">Comments</b>
//         <hr />
//         {/* Add an input below with just a bottom white border where a user can type along with a user icon on the left */}
//         <div className="flex gap-4 mt-5">
//             <img src="https://via.placeholder.com/150" alt="user" className="w-16 h-16 rounded-full" />
//             <div className='flex flex-col justify-center w-full'>
//                 <input type="text" placeholder="Add a comment..." className="w-full h-1/2 justify-end bg-transparent text-white border-b-2 border-white focus:outline-none" />
//             </div>
//         </div>
//         <div className="flex mt-5 gap-4">
//           <img src="https://via.placeholder.com/150" alt="user" className="w-16 h-16 rounded-full" />
//           <div>
//             <b className="text-subheading">Username</b>
//             <p className="text-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
//           </div>
//         </div>
//         <div className="flex gap-4 mt-5">
//           <img src="https://via.placeholder.com/150" alt="user" className="w-16 h-16 rounded-full" />
//           <div>
//             <b className="text-subheading">Username</b>
//             <p className="text-paragraph">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   )
// }

// export default VideoPlayer




// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
// import axios from 'axios';

const DisplayVideo = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [expirationTime, setExpirationTime] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const {id, category} = useParams(); 
  const videoRef = useRef(null);

  console.log(id, category);

  const fetchVideoException = async () => {
    const response = await fetch(`http://localhost:4000/dev/videos/${category}/video-exception/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    console.log(data);

    try {
      if (response.status === 200) {
        setVideoUrl(data.video_link);
        setExpirationTime(Date.now() + 3 * 60 * 1000); // 3 minutes
      } else {
        setErrorMessage('Error fetching video URL');
        console.log('Failed to fetch video URL');
      }
    } catch (error) {
      setErrorMessage('Error fetching video URL');
      console.error('Error fetching video URL', error);
    }
  };

  const fetchVideoUrl = async () => {
    const response = await fetch(`http://localhost:4000/dev/videos/${category}/video/${id}`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    const data = await response.json();
    console.log(data);

    try {
      if (response.status === 401 && category === 'introduction') {
        fetchVideoException();
      } else if (response.status === 200) {
        setVideoUrl(data.video_link);
        setExpirationTime(Date.now() + 3 * 60 * 1000); // 3 minutes
      } else {
        setErrorMessage('Error fetching video URL');
        console.log('Failed to fetch video URL');
      }
    } catch (error) {
      setErrorMessage('Error fetching video URL');
      console.error('Error fetching video URL', error);
    }
  };

  useEffect(() => {
    fetchVideoUrl();
  }, [id]); // Fetch URL when component mounts or when `id` changes

  useEffect(() => {
    const intervalId = setInterval(() => {
        if ((Date.now() >= expirationTime - 2 * 60 * 1000) && !errorMessage) { // 2 minutes before expiration
          fetchVideoUrl().then(() => {
            if (videoRef.current) {
              const isPlaying = !videoRef.current.paused && !videoRef.current.ended;
              const currentTime = videoRef.current.currentTime;
  
              videoRef.current.pause();
              videoRef.current.oncanplay = () => {
                videoRef.current.currentTime = currentTime;
                if (isPlaying) {
                  videoRef.current.play();
                }
                videoRef.current.oncanplay = null;
              };
  
              videoRef.current.src = videoUrl;
              videoRef.current.load();
            }
          });
        }
      }, 60 * 1000); // Check every minute

    return () => clearInterval(intervalId);
  }, [expirationTime, videoUrl]); // Check for expirationTime and videoUrl changes


  return (
    <div style={{ position: 'relative', width: '600px' }}>
      {videoUrl ? (
        <video ref={videoRef} controls width="600">
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <video controls width="600">
          <p>Your browser does not support the video tag.</p>
        </video>
      )}
      {errorMessage && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            zIndex: 1,
          }}
        >
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default DisplayVideo;