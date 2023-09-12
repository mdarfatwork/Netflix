import React from 'react';
import { Link } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';

const FastX = () => {
  const { user } = UserAuth();

  const renderButton = () => {
    if (user) {
      return (
        <Link to="/stream">
          <div className="flex flex-col items-center justify-center">
          <button className="border w-60 md:w-40 mt-4 md:mt-14 bg-gray-100 text-black border-gray-300 py-2 px-5">Play</button>
          </div>
        </Link>
      );
    } else {
      return (
        <Link to="/login">
          <div className="flex flex-col items-center justify-center">
          <button className="border w-60 md:w-40 mt-4 md:mt-14 bg-gray-100 text-black border-gray-300 py-2 px-5">Login and Play</button>
          </div>
        </Link>
      );
    }
  };

  return (
    <div className="max-w-[100vw]">
      <div className="flex flex-col md:flex-row w-full justify-center">
        <div className="m-10 text-white">
          <img className="md:w-[600px] w-[500px] mr-[10vw]" src="https://movies.universalpictures.com/media/02-fx-dm-mobile-banner-1080x745-pl-f01-031323-64108e7aa3468-1.jpg" alt="Fast X Poster" />
        </div>
        <div className="m-10 text-white flex flex-col justify-center">
          <h1 className="text-center text-3xl md:text-5xl font-bold">Fast X</h1>
          {renderButton()}
        </div>
      </div>
    </div>
  );
};

export default FastX;
