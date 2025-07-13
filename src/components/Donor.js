import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function Donor() {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const lineRef = useRef(null);
  const btnsRef = useRef([]);
  const [donorDropdown, setDonorDropdown] = useState(false);

  useEffect(() => {
    if (lineRef.current) lineRef.current.classList.add('animate-lineGrow');
    if (titleRef.current) {
      titleRef.current.style.animationDelay = '0.9s';
      titleRef.current.classList.add('animate-fromLineUp');
    }
    if (descRef.current) {
      descRef.current.style.animationDelay = '1.1s';
      descRef.current.classList.add('animate-fromLineUp');
    }
    btnsRef.current.forEach((btn, i) => {
      if (btn) {
        btn.style.animationDelay = `${1.3 + i * 0.15}s`;
        btn.classList.add('animate-fromLineDown');
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 py-6 bg-gradient-to-bl from-[#232f3e] to-[#22313f]">
      {/* Navbar */}
      <nav className="w-full flex items-center justify-between px-4 py-3 bg-[#1e293b] shadow-lg fixed top-0 left-0 z-20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
          <img src={logo} alt="SmartDonum Logo" className="md:h-[70px] md:w-[70px] w-[50px] h-[50px] object-contain" style={{display:'block'}} />
          <span className="md:text-2xl text-[20px]  font-bold text-green-400">SmartDonum</span>
        </div>
        <div className="flex items-center md:gap-6 gap-2">
          <div className="relative" id="donor-dropdown">
            <button
              className="text-white font-semibold hover:text-green-400 transition px-3 py-2 rounded focus:outline-none md:text-[20px] text-[15px]"
              onClick={() => setDonorDropdown(v => !v)}
            >
              Donor
              <svg className="inline ml-1 md:w-4 md:h-4 w-2 h-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {donorDropdown && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-30">
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-100" onClick={() => { setDonorDropdown(false); navigate('/donor/public'); }}>Public Donor</button>
                <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-100" onClick={() => { setDonorDropdown(false); navigate('/donor/organization'); }}>Organization Donor</button>
              </div>
            )}
          </div>
          <button className="text-white font-semibold hover:text-green-400 transition px-3 py-2 rounded md:text-[20px] text-[15px]" onClick={() => navigate('/ngo')}>NGO Login</button>
        </div>
      </nav>
      {/* Spacer for navbar */}
      <div className="h-16"></div>
      <div className="flex flex-col items-center w-full max-w-2xl mx-auto">
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl font-extrabold text-green-400 mb-4 text-center drop-shadow-lg opacity-0 animate-none"
        >
          DONOR
        </h1>
        <p
          ref={descRef}
          className="text-base sm:text-lg md:text-xl text-gray-200 text-center mb-8 leading-relaxed opacity-0 animate-none"
        >
          As a donor, you can help make a difference by sharing your surplus food, unused books, or toys with those in need. Choose your donor type below to get started.
        </p>
        <hr
          ref={lineRef}
          className="border-t-4 border-green-300 w-full max-w-xl mb-10 opacity-0 animate-none"
        />
        <div className="flex flex-col md:flex-row gap-6 w-full max-w-md justify-center">
          <button
            ref={el => btnsRef.current[0] = el}
            className="w-full md:w-auto bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg text-xl font-semibold shadow transition-all opacity-0 animate-none"
            onClick={() => navigate('/donor/public')}
          >
            Public
          </button>
          <button
            ref={el => btnsRef.current[1] = el}
            className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white px-8 py-4 rounded-lg text-xl font-semibold shadow transition-all opacity-0 animate-none"
            onClick={() => navigate('/donor/organization')}
          >
            Organization
          </button>
        </div>
      </div>
    </div>
  );
}

export default Donor;
