import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

function NGOSignup() {
  const [step, setStep] = useState(1); // 1: verify email, 2: password, 3: location/service, 4: volunteers, 5: success
  const [form, setForm] = useState({
    orgName: '',
    repName: '',
    orgEmail: '',
    otp: '',
    password: '',
    confirmPassword: '',
    location: '',
    serviceAreas: '',
    volunteers: [
      { name: '', email: '' },
      { name: '', email: '' },
      { name: '', email: '' },
      { name: '', email: '' },
      { name: '', email: '' },
    ],
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [donorDropdown, setDonorDropdown] = useState(false);
  const navigate = useNavigate();

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  const otpPattern = /^\d{6}$/;

  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleVolunteerChange = (idx, field, value) => {
    const updated = form.volunteers.map((v, i) => i === idx ? { ...v, [field]: value } : v);
    setForm({ ...form, volunteers: updated });
  };

  const addVolunteer = () => {
    if (form.volunteers.length < 8) {
      setForm({ ...form, volunteers: [...form.volunteers, { name: '', email: '' }] });
    }
  };

  const removeVolunteer = (idx) => {
    if (form.volunteers.length > 5) {
      setForm({ ...form, volunteers: form.volunteers.filter((_, i) => i !== idx) });
    }
  };

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.orgName || !form.repName || !form.orgEmail) {
      setError('All fields are required.');
      return;
    }
    if (!otpPattern.test(form.otp)) {
      setError('OTP must be 6 digits.');
      return;
    }
    setStep(2);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!passwordPattern.test(form.password)) {
      setError('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setStep(3);
  };

  const handleLocationSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!form.location || !form.serviceAreas) {
      setError('All fields are required.');
      return;
    }
    setStep(4);
  };

  const handleVolunteersSubmit = (e) => {
    e.preventDefault();
    setError('');
    // Check for 5-8 volunteers, all fields filled
    if (form.volunteers.length < 5) {
      setError('Please add at least 5 volunteers.');
      return;
    }
    for (let v of form.volunteers) {
      if (!v.name || !v.email) {
        setError('All volunteer fields are required.');
        return;
      }
    }
    setSuccess(true);
    setStep(5);
    // Here you would send data to backend
  };

  // Eye SVG icon
  const EyeIcon = ({ open }) => (
    open ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.31-2.687A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.293 5.411M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6 0a3 3 0 016 0" /></svg>
    )
  );

  // Step indicator
  const steps = [
    'Verify Email',
    'Set Password',
    'Location & Service',
    'Volunteers',
    'Success',
  ];

  useEffect(() => {
    if (step === 5 && success) {
      const timer = setTimeout(() => {
        navigate('/ngo');
      }, 2000); // 2 seconds
      return () => clearTimeout(timer);
    }
  }, [step, success, navigate]);

  // Navbar dropdown close on outside click
  useEffect(() => {
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
      <div className="flex flex-col items-center w-full max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl mx-auto bg-white/5 rounded-xl shadow-lg p-4 sm:p-8 md:p-10 lg:p-12 backdrop-blur-md">
        <h2 className="text-4xl sm:text-5xl font-extrabold text-blue-400 mb-4 text-center drop-shadow-lg">NGO Representative Sign Up</h2>
        <p className="text-base sm:text-lg md:text-xl text-gray-200 text-center mb-8 leading-relaxed">
          As an NGO, you help bridge the gap between donors and those in need. Collect, coordinate, and distribute donations efficiently to maximize impact in your community.
        </p>
        {/* Stepper */}
        <div className="flex justify-center gap-2 mb-8">
          {steps.slice(0, 4).map((label, idx) => (
            <div key={label} className={`flex flex-col items-center w-20 ${step === idx + 1 ? 'font-bold text-blue-400' : 'text-gray-400'}`}> 
              <div className={`w-6 h-6 rounded-full border-2 ${step === idx + 1 ? 'border-blue-400 bg-blue-400 text-white' : 'border-gray-400 bg-gray-700 text-gray-300'} flex items-center justify-center mb-1`}>{idx + 1}</div>
              <span className="text-xs text-center">{label}</span>
            </div>
          ))}
        </div>
        {step === 1 && (
          <form className="w-full flex flex-col gap-4 items-center" onSubmit={handleEmailSubmit}>
            <input name="orgName" type="text" placeholder="Organization Name" value={form.orgName} onChange={handleInput} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" required />
            <input name="repName" type="text" placeholder="Representative Name" value={form.repName} onChange={handleInput} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" required />
            <input name="orgEmail" type="email" placeholder="Representative Email" value={form.orgEmail} onChange={handleInput} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" required />
            <input name="otp" type="text" placeholder="Enter OTP (6 digits)" value={form.otp} onChange={handleInput} maxLength={6} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" required />
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-all w-full">Verify Email</button>
          </form>
        )}
        {step === 2 && (
          <form className="w-full flex flex-col gap-4 items-center" onSubmit={handlePasswordSubmit}>
            <div className="relative w-full">
              <input name="password" type={showPassword ? 'text' : 'password'} placeholder="Create Password" value={form.password} onChange={handleInput} minLength={8} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full pr-10" required />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" tabIndex={-1} onClick={() => setShowPassword(v => !v)}>
                <EyeIcon open={showPassword} />
              </button>
            </div>
            <div className="relative w-full">
              <input name="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm Password" value={form.confirmPassword} onChange={handleInput} minLength={8} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full pr-10" required />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" tabIndex={-1} onClick={() => setShowConfirmPassword(v => !v)}>
                <EyeIcon open={showConfirmPassword} />
              </button>
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-all w-full">Set Password</button>
          </form>
        )}
        {step === 3 && (
          <form className="w-full flex flex-col gap-4 items-center" onSubmit={handleLocationSubmit}>
            <input name="location" type="text" placeholder="Location" value={form.location} onChange={handleInput} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" required />
            <input name="serviceAreas" type="text" placeholder="Service Areas (comma separated)" value={form.serviceAreas} onChange={handleInput} className="border rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full" required />
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-all w-full">Next: Add Volunteers</button>
          </form>
        )}
        {step === 4 && (
          <form className="w-full flex flex-col gap-4 items-center" onSubmit={handleVolunteersSubmit}>
            <div className="w-full">
              <div className="font-semibold text-blue-500 mb-2">Volunteers (5-8 members)</div>
              {form.volunteers.map((v, idx) => (
                <div key={idx} className="mb-4 w-full">
                  <div className="font-semibold text-blue-300 mb-1">Volunteer {idx + 1}</div>
                  <div className="flex flex-col md:flex-row gap-2">
                    <input type="text" placeholder="Volunteer Name" value={v.name} onChange={e => handleVolunteerChange(idx, 'name', e.target.value)} className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 w-full md:w-1/2" required />
                    <input type="email" placeholder="Volunteer Email" value={v.email} onChange={e => handleVolunteerChange(idx, 'email', e.target.value)} className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400 flex-1 w-full md:w-1/2" required />
                    {form.volunteers.length > 5 && (
                      <button type="button" onClick={() => removeVolunteer(idx)} className="text-red-500 font-bold px-2">×</button>
                    )}
                  </div>
                </div>
              ))}
              {form.volunteers.length < 8 && (
                <button type="button" onClick={addVolunteer} className="text-blue-500 hover:underline text-sm mt-1">+ Add Volunteer</button>
              )}
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-all w-full">Finish Signup</button>
          </form>
        )}
        {step === 5 && success && (
          <div className="w-full flex flex-col items-center gap-6 mt-8">
            <div className="text-3xl text-green-400 font-bold mb-2">Signup Successful!</div>
            <div className="text-gray-200 text-center mb-4">Your NGO account has been created. You can now log in and start managing donations and volunteers.</div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded font-semibold transition-all w-48" onClick={() => navigate('/ngo')}>Go to Login</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default NGOSignup;
