import React, { useEffect, useState } from 'react';
import SavedShows from '../components/SavedShows';
import { UserAuth } from '../context/AuthContext';
import { auth } from '../firebase';

const Account = () => {
  const [userEmail, setUserEmail] = useState('');
  const { user } = UserAuth();

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
    } else {
      const unsubscribe = auth.onAuthStateChanged((authUser) => {
        if (authUser) {
          setUserEmail(authUser.email);
        }
      });

      return () => unsubscribe();
    }
  }, [user]);

  return (
    <>
      <div className="w-full text-white">
      <div className="absolute w-full h-[400px] bg-black/60"></div>
      <img
          className='w-full h-[400px] object-cover'
          src="https://assets.nflxext.com/ffe/siteui/vlv3/76c10fc9-7ccd-4fbf-bc59-f16a468921ca/4fb4af6e-d0ca-4c7f-b004-b34226727e55/IN-en-20230529-popsignuptwoweeks-perspective_alpha_website_large.jpg"
          alt=""
        />
      </div>
      <SavedShows />
      <div className="my-5 w-full text-white">
        <h1 className='ml-3 py-4 text-3xl md:text-5xl font-bold'>Your Account Info</h1>
        {userEmail && <p className='ml-3 text-lg mb-16'>Email: {userEmail}</p>}
      </div>
    </>
  );
};

export default Account;