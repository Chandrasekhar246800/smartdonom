import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

function Donor() {
  const navigate = useNavigate();
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const lineRef = useRef(null);
  const btnsRef = useRef([]);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

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

  // Navbar dropdown close on outside click
  React.useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest('#donor-dropdown')) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [dropdownOpen]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 py-6 bg-gradient-to-bl from-[#232f3e] to-[#22313f]">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full bg-[#232f3e]/90 shadow z-30 flex items-center justify-between px-6 py-3">
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-green-400 tracking-wide cursor-pointer" onClick={() => navigate('/')}>SmartDonum</span>
          <div className="relative" id="donor-dropdown">
            <button
              className="flex items-center gap-1 text-white font-semibold px-4 py-2 rounded hover:bg-green-600 focus:outline-none focus:ring"
              onClick={() => setDropdownOpen((v) => !v)}
            >
              Donor
              <svg className={`w-4 h-4 ml-1 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
            </button>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white rounded shadow-lg py-2 z-40 animate-fadeIn">
                <button
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-green-100"
                  onClick={() => { setDropdownOpen(false); navigate('/donor/public'); }}
                >
                  Public
                </button>
                <button
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-green-100"
                  onClick={() => { setDropdownOpen(false); navigate('/donor/organization'); }}
                >
                  Organization
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all"
          onClick={() => navigate('/ngo')}
        >
          NGO Login
        </button>
      </nav>
      {/* Spacer for navbar */}
      <div className="h-20" />
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
