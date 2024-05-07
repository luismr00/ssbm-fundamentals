import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Resources = () => {
  return (
    <div className="gradient-bg font-roboto min-h-screen">
      <Navbar />
      <div className="flex justify-center items-center">
        <div className="custom-container text-white py-44 flex flex-col">
          {/* Add 5 resources that will be next to each other. Each will be within a div and this will contain an image placeholder, a subheading title, and read more anchor link text*/}
          <b className='text-h2 text-center'>Expand Your Knowledge</b>
          <p className='text-center mt-4 mb-16'>Access additional resources for further learning</p>
          <div className="grid grid-cols-3 gap-8">
            <div className="flex flex-col">
              <img src="https://via.placeholder.com/450x300" alt="Placeholder" />
              <b className="text-subheading mt-2">Mastering combos and techniques</b>
              <p className="mt-1 ">Learn advanced strategies to dominate your opponents.</p>
              <a href=""><p className="mt-5">Learn more &nbsp;&nbsp;&gt;</p></a>
            </div>
            <div className="flex flex-col">
              <img src="https://via.placeholder.com/450x300" alt="Placeholder" />
              <b className="text-subheading mt-2">Mastering combos and techniques</b>
              <p className="mt-1 ">Learn advanced strategies to dominate your opponents.</p>
              <a href=""><p className="mt-5">Learn more &nbsp;&nbsp;&gt;</p></a>
            </div>
            <div className="flex flex-col">
              <img src="https://via.placeholder.com/450x300" alt="Placeholder" />
              <b className="text-subheading mt-2">Mastering combos and techniques</b>
              <p className="mt-1 ">Learn advanced strategies to dominate your opponents.</p>
              <a href=""><p className="mt-5">Learn more &nbsp;&nbsp;&gt;</p></a>
            </div>
            <div className="flex flex-col">
              <img src="https://via.placeholder.com/450x300" alt="Placeholder" />
              <b className="text-subheading mt-2">Mastering combos and techniques</b>
              <p className="mt-1 ">Learn advanced strategies to dominate your opponents.</p>
              <a href=""><p className="mt-5">Learn more &nbsp;&nbsp;&gt;</p></a>
            </div>
            <div className="flex flex-col">
              <img src="https://via.placeholder.com/450x300" alt="Placeholder" />
              <b className="text-subheading mt-2">Mastering combos and techniques</b>
              <p className="mt-1 ">Learn advanced strategies to dominate your opponents.</p>
              <a href=""><p className="mt-5">Learn more &nbsp;&nbsp;&gt;</p></a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Resources;
