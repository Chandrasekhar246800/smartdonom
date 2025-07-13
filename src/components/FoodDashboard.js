import React, { useRef, useEffect, useState } from 'react';

function NGO() {
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const lineRef = useRef(null);
  const btnRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);

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
    if (btnRef.current) {
      btnRef.current.style.animationDelay = '1.3s';
      btnRef.current.classList.add('animate-fromLineDown');
    }
  }, []);

  // Eye SVG icon
  const EyeIcon = ({ open }) => (
    open ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.31-2.687A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.293 5.411M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6 0a3 3 0 016 0" /></svg>
    )
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 py-6 bg-gradient-to-bl from-[#232f3e] to-[#22313f]">
      <div className="flex flex-col items-center w-full max-w-lg mx-auto">
        <h2 ref={titleRef} className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-4 text-center drop-shadow-lg opacity-0 animate-none">NGO Volunteer Login</h2>
        <p ref={descRef} className="text-base sm:text-lg md:text-xl text-gray-200 text-center mb-8 leading-relaxed opacity-0 animate-none">
          As an NGO, you help bridge the gap between donors and those in need. Collect, coordinate, and distribute donations efficiently to maximize impact in your community.
        </p>
        <hr ref={lineRef} className="border-t-4 border-blue-300 w-full max-w-md mb-10 opacity-0 animate-none" />
        <form className="w-full flex flex-col gap-4 items-center">
          <input type="email" placeholder="Volunteer Email" className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" />
          <div className="relative w-full">
            <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full pr-10" />
            <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" tabIndex={-1} onClick={() => setShowPassword(v => !v)}>
              <EyeIcon open={showPassword} />
            </button>
          </div>
          <button ref={btnRef} type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-all w-full opacity-0 animate-none">Login</button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-gray-300">Don't have an account? </span>
          <button className="text-blue-400 hover:underline font-semibold">Sign up</button>
          <div className="mt-2">
            <a href="/donor/organization/forgot-password" className="text-blue-400 hover:underline font-semibold">Forgot password?</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NGO;
