import React, { useState } from 'react';

function ForgotPassword({ userType = 'public' }) {
  const [step, setStep] = useState(1); // 1: enter email, 2: verify, 3: reset password
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setStep(2);
  };

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setError('');
    if (!passwordPattern.test(password)) {
      setError('Password must be at least 8 characters and include uppercase, lowercase, number, and special character.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setStep(4);
  };

  // Eye SVG icon
  const EyeIcon = ({ open }) => (
    open ? (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
    ) : (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.477 0-8.268-2.943-9.542-7a9.956 9.956 0 012.223-3.592m3.31-2.687A9.956 9.956 0 0112 5c4.477 0 8.268 2.943 9.542 7a9.973 9.973 0 01-4.293 5.411M15 12a3 3 0 11-6 0 3 3 0 016 0zm-6 0a3 3 0 016 0" /></svg>
    )
  );

  // Envelope icon
  const EnvelopeIcon = () => (
    <svg className="h-10 w-10 text-blue-400 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-18 8V8a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
  );

  // Success icon
  const SuccessIcon = () => (
    <svg className="h-10 w-10 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
  );

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 sm:px-4 py-6 bg-gradient-to-bl from-[#232f3e] to-[#22313f]">
      <div className={`flex flex-col items-center w-full max-w-md mx-auto rounded-2xl shadow-2xl p-8 animate-fadeUp ${userType === 'ngo' ? 'bg-green-50' : 'bg-white'}`}>
        <div className="flex flex-col items-center mb-4">
          {userType === 'ngo' ? (
            <svg className="h-12 w-12 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 21.364l-7.682-7.682a4.5 4.5 0 010-6.364z" /></svg>
          ) : (step === 4 ? <SuccessIcon /> : <EnvelopeIcon />)}
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${userType === 'public' ? 'bg-cyan-100 text-cyan-700' : userType === 'ngo' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
            {userType === 'public' ? 'Public Donor' : userType === 'ngo' ? 'NGO Representative' : 'Organization Donor'}
          </span>
          <h2 className={`text-2xl sm:text-3xl font-extrabold mb-2 text-center drop-shadow-lg ${userType === 'ngo' ? 'text-green-600' : 'text-blue-400'}`}>
            {userType === 'public' ? 'Public Donor Password Reset' : userType === 'ngo' ? 'NGO Representative Password Reset' : 'Organization Donor Password Reset'}
          </h2>
          <p className={`text-center text-lg font-semibold mb-2 ${userType === 'ngo' ? 'text-green-700' : 'text-gray-700'}`}>
            {userType === 'public' && 'Reset your password for your Donor account.'}
            {userType === 'organization' && 'Reset your password for your Organization Donor account.'}
            {userType === 'ngo' && 'Reset your password for your NGO Representative account.'}
          </p>
          <p className={`text-center text-base mb-2 ${userType === 'ngo' ? 'text-green-600' : 'text-gray-500'}`}>
            {userType === 'ngo' && step === 1 && 'Enter your NGO representative email to receive a secure OTP for password reset.'}
            {userType === 'ngo' && step === 2 && 'Enter the 6-digit OTP sent to your email to verify your identity.'}
            {userType === 'ngo' && step === 3 && 'Create a strong new password for your NGO account.'}
            {userType === 'ngo' && step === 4 && 'Your password has been reset! You can now log in as an NGO representative.'}
            {userType !== 'ngo' && step === 1 && 'Enter your registered email address below and we will send you a One Time Password (OTP) to reset your password.'}
            {userType !== 'ngo' && step === 2 && 'Enter the 6-digit OTP sent to your email to verify your identity.'}
            {userType !== 'ngo' && step === 3 && 'Create a strong new password for your account. Make sure it is secure and easy to remember.'}
            {userType !== 'ngo' && step === 4 && 'Your password has been reset successfully! You can now log in with your new password.'}
          </p>
        </div>
        {step === 1 && (
          <form className="w-full flex flex-col gap-4" onSubmit={handleEmailSubmit}>
            <input type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} className="border-2 border-blue-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" required />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold shadow transition-all">Send OTP</button>
          </form>
        )}
        {step === 2 && (
          <form className="w-full flex flex-col gap-4" onSubmit={handleOtpSubmit}>
            <input type="text" placeholder="Enter OTP" value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))} maxLength={6} className="border-2 border-blue-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" required />
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold shadow transition-all">Verify OTP</button>
          </form>
        )}
        {step === 3 && (
          <form className="w-full flex flex-col gap-4" onSubmit={handlePasswordSubmit}>
            <div className="relative">
              <input type={showPassword ? 'text' : 'password'} placeholder="New Password" value={password} onChange={e => setPassword(e.target.value)} minLength={8} className="border-2 border-blue-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full pr-10 transition-all" required />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" tabIndex={-1} onClick={() => setShowPassword(v => !v)}>
                <EyeIcon open={showPassword} />
              </button>
            </div>
            <div className="relative">
              <input type={showConfirmPassword ? 'text' : 'password'} placeholder="Confirm New Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} minLength={8} className="border-2 border-blue-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full pr-10 transition-all" required />
              <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2" tabIndex={-1} onClick={() => setShowConfirmPassword(v => !v)}>
                <EyeIcon open={showConfirmPassword} />
              </button>
            </div>
            {error && <span className="text-red-500 text-sm">{error}</span>}
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-semibold shadow transition-all">Reset Password</button>
          </form>
        )}
        {step === 4 && (
          <div className="text-center text-green-600 font-semibold mt-2">
            Password reset successful! <a href={userType === 'public' ? '/donor/public' : '/donor/organization'} className="text-blue-600 underline ml-1">Back to Login</a>
          </div>
        )}
        {step !== 4 && (
          <div className="mt-6 text-center">
            <a href={userType === 'public' ? '/donor/public' : '/donor/organization'} className="text-blue-600 hover:underline font-semibold">Back to Login</a>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
