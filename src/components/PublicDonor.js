import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { auth, RecaptchaVerifier } from '../firebase';
import { signInWithPhoneNumber } from 'firebase/auth';

function PublicDonor() {
  const [showLogin, setShowLogin] = useState(true); // true = login, false = signup
  const [signupStep, setSignupStep] = useState(1); // 1 = details, 2 = OTP/password
  const [signupData, setSignupData] = useState({ name: '', email: '', contact: '', otp: '', password: '', confirmPassword: '' });
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formAnim, setFormAnim] = useState('');
  const [donorDropdown, setDonorDropdown] = useState(false);
  const [otpError, setOtpError] = useState('');
  const navigate = useNavigate();

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  const handleSignupInput = (e) => {
    const { name, value } = e.target;
    if (name === 'otp') {
      // Only allow up to 6 digits, and only numbers
      const numericValue = value.replace(/\D/g, '').slice(0, 6);
      setSignupData({ ...signupData, [name]: numericValue });
    } else {
      setSignupData({ ...signupData, [name]: value });
    }
  };

  const handleSignupDetailsSubmit = async (e) => {
    e.preventDefault();
    setOtpError('');
    if (!/^\d{10,}$/.test(signupData.contact)) {
      setOtpError('Please enter a valid phone number.');
      return;
    }
    try {
      if (!window.recaptchaVerifier) {
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
          'size': 'invisible',
          'callback': (response) => {},
        }, auth);
      }
      const appVerifier = window.recaptchaVerifier;
      const phoneNumber = '+91' + signupData.contact; // Change country code as needed
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
      window.confirmationResult = confirmationResult;
      setSignupStep(2);
    } catch (error) {
      setOtpError(error.message || 'Failed to send OTP.');
    }
  };

  const handleSignupOTPSubmit = (e) => {
    e.preventDefault();
    let valid = true;
    setPasswordError('');
    setConfirmError('');
    if (!passwordPattern.test(signupData.password)) {
      setPasswordError('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
      valid = false;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setConfirmError('Passwords do not match.');
      valid = false;
    }
    if (valid) {
      // Proceed with account creation
    }
  };

  const handleShowLogin = () => {
    setFormAnim('animate-fadeOutLeft');
    setTimeout(() => {
      setShowLogin(true);
      setSignupStep(1);
      setFormAnim('animate-fadeInRight');
    }, 300);
    setTimeout(() => setFormAnim(''), 700);
  };

  const handleShowSignup = () => {
    setFormAnim('animate-fadeOutRight');
    setTimeout(() => {
      setShowLogin(false);
      setSignupStep(1);
      setFormAnim('animate-fadeInLeft');
    }, 300);
    setTimeout(() => setFormAnim(''), 700);
  };

  // Eye SVG icon
  const EyeIcon = ({ open }) => (
    open ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.31-2.687A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.293 5.411M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6 0a3 3 0 016 0" /></svg>
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
        <h2 className="text-4xl sm:text-5xl font-extrabold text-green-400 mb-4 text-center drop-shadow-lg">Public Donor</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 text-center mb-8 leading-relaxed">
          As a public donor, you can easily register your leftover food, books, or toys for donation. NGOs will be notified and can schedule a pickup.
        </p>
        <div className="relative w-full max-w-md min-h-[340px] flex items-center justify-center">
          {/* Animated form container */}
          {showLogin ? (
            <div className={`w-full flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 transition-all duration-500 ${formAnim}`}>
              <form className="w-full flex flex-col gap-4">
                <input type="email" placeholder="Email" className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" />
                <div className="relative">
                  <input type={showPassword ? 'text' : 'password'} placeholder="Password" className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 w-full pr-10" />
                  <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" tabIndex={-1} onClick={() => setShowPassword(v => !v)}>
                    <EyeIcon open={showPassword} />
                  </button>
                </div>
                <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold transition-all">Login</button>
              </form>
              <div className="mt-4 text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <button className="text-green-600 hover:underline font-semibold" onClick={handleShowSignup}>Sign up</button>
                <div className="mt-2">
                  <a href="/donor/public/forgot-password" className="text-green-600 hover:underline font-semibold">Forgot password?</a>
                </div>
              </div>
            </div>
          ) : (
            <div className={`w-full flex flex-col items-center justify-center bg-white rounded-xl shadow-lg p-8 transition-all duration-500 ${formAnim}`}>
              {signupStep === 1 ? (
                <form className="w-full flex flex-col gap-4" onSubmit={handleSignupDetailsSubmit}>
                  <input name="name" type="text" placeholder="Name" value={signupData.name} onChange={handleSignupInput} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" required />
                  <input name="email" type="email" placeholder="Email" value={signupData.email} onChange={handleSignupInput} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" required />
                  <input name="contact" type="text" placeholder="Contact Number" value={signupData.contact} onChange={handleSignupInput} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" required />
                  {otpError && <span className="text-red-500 text-sm">{otpError}</span>}
                  <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold transition-all">Send OTP</button>
                </form>
              ) : (
                <form className="w-full flex flex-col gap-4" onSubmit={handleSignupOTPSubmit}>
                  <input name="otp" type="text" placeholder="Enter OTP" value={signupData.otp} onChange={handleSignupInput} maxLength={6} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400" required />
                  <div className="relative">
                    <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Password" value={signupData.password} onChange={handleSignupInput} minLength={8} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 w-full pr-10" required />
                    <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" tabIndex={-1} onClick={() => setShowPassword(v => !v)}>
                      <EyeIcon open={showPassword} />
                    </button>
                  </div>
                  {passwordError && <span className="text-red-500 text-sm">{passwordError}</span>}
                  <div className="relative">
                    <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" value={signupData.confirmPassword} onChange={handleSignupInput} minLength={8} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 w-full pr-10" required />
                    <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" tabIndex={-1} onClick={() => setShowConfirmPassword(v => !v)}>
                      <EyeIcon open={showConfirmPassword} />
                    </button>
                  </div>
                  {confirmError && <span className="text-red-500 text-sm">{confirmError}</span>}
                  <button type="submit" className="bg-green-500 hover:bg-green-600 text-white py-2 rounded font-semibold transition-all">Create Account</button>
                </form>
              )}
              <div className="mt-4 text-center">
                <span className="text-gray-600">Already have an account? </span>
                <button className="text-green-600 hover:underline font-semibold" onClick={handleShowLogin}>Login</button>
              </div>
            </div>
          )}
        </div>
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}

export default PublicDonor;
