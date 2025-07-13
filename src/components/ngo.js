import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function NGO() {
  const [showPassword, setShowPassword] = useState(false);
  const [donorDropdown, setDonorDropdown] = useState(false);
  const navigate = useNavigate();

  // Eye SVG icon
  const EyeIcon = ({ open }) => (
    open ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.31-2.687A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.293 5.411M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6 0a3 3 0 016 0" /></svg>
    )
  );

  // Navbar dropdown close on outside click
  React.useEffect(() => {
    function handleClick(e) {
      if (!e.target.closest('#donor-dropdown')) {
        setDonorDropdown(false);
      }
    }
    if (donorDropdown) {
      document.addEventListener('mousedown', handleClick);
    } else {
      document.removeEventListener('mousedown', handleClick);
    }
    return () => document.removeEventListener('mousedown', handleClick);
  }, [donorDropdown]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 md:px-8 py-6 bg-gradient-to-bl from-[#232f3e] to-[#22313f]">
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
      <div className="flex flex-col items-center w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto bg-white/5 rounded-xl shadow-lg p-4 sm:p-8 md:p-10 lg:p-12 backdrop-blur-md">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-400 mb-4 text-center drop-shadow-lg">NGO Volunteer Login</h2>
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 text-center mb-8 leading-relaxed">
          As an NGO, you help bridge the gap between donors and those in need. Collect, coordinate, and distribute donations efficiently to maximize impact in your community.
        </p>
        <hr className="border-t-4 border-blue-300 w-full max-w-md mb-10" />
        <form className="w-full flex flex-col gap-4 items-center">
          <input type="email" placeholder="Volunteer Email" className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full text-sm sm:text-base md:text-lg" />
          <div className="relative w-full">
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full pr-10 text-sm sm:text-base md:text-lg" />
            <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" tabIndex={-1} onClick={() => setShowPassword(v => !v)}>
              <EyeIcon open={showPassword} />
            </button>
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-all w-full text-sm sm:text-base md:text-lg">Login</button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-300 text-sm sm:text-base">Don't have an account? </span>
          <button className="text-blue-400 hover:underline font-semibold text-sm sm:text-base" onClick={() => navigate('/ngo/signup')}>Sign up</button>
          <div className="mt-2">
            <a href="/ngo/forgot-password" className="text-blue-400 hover:underline font-semibold text-sm sm:text-base">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NGO;
