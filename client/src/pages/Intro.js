import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import VideoPlaceholder from '../components/tutorials/VideoPlaceholder'

const Intro = () => {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
        const response = await fetch('http://localhost:4000/dev/videos/introduction/video-info', {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        console.log(data);
        
        try {
            if (response.status === 200) {
                setVideos(data);
            } else {
                console.log('Failed to fetch video info');
            }
        } catch (error) {
            console.error('Failed to fetch video info: ', error);
        }
    }
    fetchVideos();
    }, []);


  return (
    <div className="gradient-bg font-roboto">
        <Navbar />
        <div className='text-white flex flex-col justify-end' style={{backgroundImage: `url(https://via.placeholder.com/1920x1080)`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center',height: '820px'}}>
            <div className='custom-container mb-28'>
                <b className='text-h1'>Introduction</b>
                <p className='text-paragraph mb-6'>Why you should subscribe</p>
                {/* <p className='text-paragraph'>Date: 06/20/2024</p> */}
                <div className='flex gap-[16px]'>
                    <div className='bg-white text-black p-2 text-small font-semibold'>Combos</div>
                    <div className='bg-white text-black p-2 text-small font-semibold'>Reaction</div>
                    <div className='bg-white text-black p-2 text-small font-semibold'>Follow-ups</div>
                </div>
            </div>
        </div>
        <div className="custom-container text-white">
            <div className='mt-28 mb-16 flex flex-col gap-[5px]'>
                <b className='text-h2'>Table of Contents</b>
                <p className='text-paragraph'>Learn the benefits of learning from ssbm fundamentals</p>
            </div>
            {videos?.map(video => (
                <VideoPlaceholder category={video.category} id={video.id} />
            ))}
            {/* <VideoPlaceholder />
            <VideoPlaceholder />
            <VideoPlaceholder /> */}
        </div>
        <Footer />
    </div>
  )
}

export default Intro