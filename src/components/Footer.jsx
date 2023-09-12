import React from 'react'
import {Link} from 'react-router-dom';

const Footer = () => {
  return (
    <>
    <div className="my-5 border-t-4 border-gray-600 w-full"></div>
    <div className='mt-5 w-full'>
    <div className="pt-3 mx-auto max-w-[60vw] h-[300px]">
    <p className='text-gray-300 text-base'>Questions? Call <Link className='hover:cursor-pointer underline' to="tel:000-800-919-1694">000-800-919-1694</Link></p>
    <div className="hover:cursor-pointer mt-5 text-base py-2 leading-9 text-gray-300 underline flex justify-between flex-row">
        <ul>
            <li>FAQ</li>
            <li>Media Centre</li>
            <li>Ways to watch</li>
            <li>Cookie Preference</li>
            <li>Speed Test</li>
        </ul>
        <ul>
            <li>Help Centre</li>
            <li>Investor Relations</li>
            <li>Terms of Use</li>
            <li>Corporate Information</li>
            <li>Legal Notices</li>
        </ul>
        <ul>
            <li><Link to="/account">Account</Link></li>
            <li>Jobs</li>
            <li>Privacy</li>
            <li>Contact Us</li>
            <li>Only on Netflix</li>
        </ul>
    </div>
    </div>
    </div>
    </>
  )
}

export default Footer