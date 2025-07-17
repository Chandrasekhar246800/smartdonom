import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

// Cloud configs (copied from Dashboard.js)
const CLOUD_CONFIGS = [
  { top: '2.5rem', left: -20, width: 352, height: 176, shadow: 'animate-cloudShadow1', opacity: 0.95, blur: 'blur-xl', float: 'animate-cloudFloatSlow', z: 1, speed: 0.08 },
  { top: '8rem', left: -30, width: 480, height: 208, shadow: 'animate-cloudShadow2', opacity: 0.98, blur: 'blur-lg', float: 'animate-cloudFloat', z: 1, speed: 0.06 },
  { bottom: '5rem', left: -25, width: 400, height: 160, shadow: 'animate-cloudShadow3', opacity: 0.92, blur: 'blur-xl', float: 'animate-cloudFloat', z: 1, speed: 0.07 },
  { bottom: '2.5rem', left: -15, width: 288, height: 112, shadow: 'animate-cloudShadow4', opacity: 0.95, blur: 'blur-lg', float: 'animate-cloudFloatSlow', z: 1, speed: 0.05 },
  { top: '4rem', left: -10, width: 240, height: 80, shadow: 'animate-cloudShadow5', opacity: 0.90, blur: 'blur-md', float: 'animate-cloudFloat', z: 1, speed: 0.09 },
  { top: '50%', left: -18, width: 256, height: 96, shadow: 'animate-cloudShadow6', opacity: 0.85, blur: 'blur-xl', float: 'animate-cloudFloatReverse', z: 1, speed: 0.07 },
  { top: '25%', left: -22, width: 208, height: 80, shadow: 'animate-cloudShadow7', opacity: 0.90, blur: 'blur-md', float: 'animate-cloudFloat', z: 1, speed: 0.08 },
  { bottom: '33%', left: 10, width: 320, height: 128, shadow: 'animate-cloudShadow8', opacity: 0.88, blur: 'blur-lg', float: 'animate-cloudFloatReverse', z: 1, speed: 0.06 },
  { top: '1.25rem', left: 30, width: 224, height: 80, shadow: 'animate-cloudShadow9', opacity: 0.92, blur: 'blur-lg', float: 'animate-cloudFloat', z: 2, speed: 0.05 },
  { top: '33%', left: 20, width: 256, height: 112, shadow: 'animate-cloudShadow10', opacity: 0.90, blur: 'blur-lg', float: 'animate-cloudFloatSlow', z: 2, speed: 0.04 },
  { bottom: '2.5rem', left: 60, width: 208, height: 80, shadow: 'animate-cloudShadow11', opacity: 0.85, blur: 'blur-lg', float: 'animate-cloudFloat', z: 2, speed: 0.03 },
  { top: '66%', right: -30, width: 288, height: 128, shadow: 'animate-cloudShadow12', opacity: 0.92, blur: 'blur-lg', float: 'animate-cloudFloatReverse', z: 1, speed: -0.06 },
  { bottom: '25%', right: -20, width: 224, height: 96, shadow: 'animate-cloudShadow13', opacity: 0.88, blur: 'blur-lg', float: 'animate-cloudFloat', z: 1, speed: -0.05 },
  { top: '6rem', left: 45, width: 128, height: 48, shadow: 'animate-cloudShadow14', opacity: 0.80, blur: 'blur-md', float: 'animate-cloudFloat', z: 3, speed: 0.11 },
  { top: '66%', left: 60, width: 144, height: 56, shadow: 'animate-cloudShadow15', opacity: 0.82, blur: 'blur-md', float: 'animate-cloudFloatReverse', z: 3, speed: 0.10 },
  { bottom: '6rem', left: 80, width: 112, height: 40, shadow: 'animate-cloudShadow16', opacity: 0.75, blur: 'blur-md', float: 'animate-cloudFloat', z: 3, speed: 0.09 },
  { top: '25%', left: 0, width: 160, height: 64, shadow: 'animate-cloudShadow17', opacity: 0.78, blur: 'blur-md', float: 'animate-cloudFloatSlow', z: 3, speed: 0.08 },
  { top: '10rem', left: 0, width: 176, height: 64, shadow: 'animate-cloudShadow18', opacity: 0.85, blur: 'blur-md', float: 'animate-cloudFloat', z: 3, speed: 0.07 },
  { bottom: '8rem', left: 0, width: 160, height: 56, shadow: 'animate-cloudShadow19', opacity: 0.80, blur: 'blur-md', float: 'animate-cloudFloatReverse', z: 3, speed: 0.06 },
];

function MovableCloud({ config, idx }) {
  const [pos, setPos] = React.useState(() => {
    return {
      x: config.left !== undefined ? config.left : config.right,
      y: 0,
      dragging: false,
      dragStartX: 0,
      dragOffset: 0,
    };
  });
  // Animate horizontally
  React.useEffect(() => {
    let raf;
    let lastTime = performance.now();
    function animate(now) {
      const dt = (now - lastTime) / 16.67;
      lastTime = now;
      if (!pos.dragging) {
        setPos(prev => {
          let x = prev.x + config.speed * dt;
          if (config.speed > 0 && x > 120) x = -40;
          if (config.speed < 0 && x < -40) x = 120;
          return { ...prev, x };
        });
      }
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [config.speed, pos.dragging]);
  // Drag logic
  function onDown(e) {
    e.preventDefault();
    setPos(prev => ({ ...prev, dragging: true, dragStartX: e.touches ? e.touches[0].clientX : e.clientX, dragOffset: prev.x }));
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
  }
  function onMove(e) {
    e.preventDefault();
    setPos(prev => {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      let x = prev.dragOffset + (clientX - prev.dragStartX) / 8;
      if (x < -40) x = -40;
      if (x > 120) x = 120;
      return { ...prev, x };
    });
  }
  function onUp(e) {
    setPos(prev => ({ ...prev, dragging: false }));
    window.removeEventListener('mousemove', onMove);
    window.removeEventListener('touchmove', onMove);
    window.removeEventListener('mouseup', onUp);
    window.removeEventListener('touchend', onUp);
  }
  const style = {
    position: 'absolute',
    width: config.width,
    height: config.height,
    zIndex: config.z,
    opacity: 1,
    cursor: 'grab',
    top: config.top,
    bottom: config.bottom,
    left: config.left !== undefined ? `${pos.x}%` : undefined,
    right: config.right !== undefined ? `${pos.x}%` : undefined,
    transition: pos.dragging ? 'none' : 'box-shadow 0.2s',
    touchAction: 'none',
  };
  return (
    <div style={style} className="group select-none">
      <div className={`absolute left-0 top-[80%] w-full h-10 bg-black bg-opacity-10 rounded-full blur-2xl ${config.shadow}`} />
      <div
        className={`w-full h-full bg-white rounded-full ${config.blur} shadow-cloud ${config.float}`}
        style={{ opacity: config.opacity, position: 'absolute' }}
        onMouseDown={onDown}
        onTouchStart={onDown}
        tabIndex={0}
        aria-label={`Cloud ${idx+1}`}
      />
    </div>
  );
}

function AboutUs() {
  const navigate = useNavigate();
  return (
    <>
      {/* Animated sky and clouds background */}
      <div
        style={{position:'fixed', inset:0, width:'100vw', height:'100vh', zIndex:0, pointerEvents:'none', overflow:'hidden'}}
        id="cloud-bg-parallax"
      >
        <div style={{position:'absolute', inset:0, width:'100vw', height:'100vh', background:'linear-gradient(180deg, #b3e0ff 0%, #87ceeb 40%, #e0f7fa 100%)', zIndex:0}} />
        <div style={{position:'absolute', inset:0, width:'100vw', height:'100vh', zIndex:1, pointerEvents:'none'}}>
          {CLOUD_CONFIGS.map((cfg, i) => (
            <MovableCloud key={i} config={cfg} idx={i} />
          ))}
        </div>
      </div>
      {/* Navbar (same as dashboard, but no About Us button) */}
      <nav className="w-full flex items-center justify-between px-4 py-3 bg-sky-100 shadow-lg fixed top-0 left-0 z-30">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}> 
          <img src={logo} alt="SmartDonum Logo" className="md:h-[70px] md:w-[70px] w-[50px] h-[50px] object-contain" style={{display:'block'}} />
          <span className="md:text-2xl text-[20px] font-bold text-sky-700">SmartDonum</span>
        </div>
        {/* Desktop Login button (unchanged) */}
        <div className="hidden md:flex">
          <button
            className="bg-sky-400 hover:bg-sky-500 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow transition-all transform hover:scale-105 hover:shadow-xl focus:outline-none"
            onClick={() => navigate('/landing')}
          >
            Login
          </button>
        </div>
        {/* Mobile hamburger menu */}
        <div className="md:hidden flex items-center">
          <MobileMenu navigate={navigate} />
        </div>
      </nav>
      {/* Spacer for navbar */}
      <div className="h-16"></div>
      {/* Main About Us content */}
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 relative z-10 animate-fadeInUpOnce" style={{background:'transparent'}}>
        <h1 className="text-3xl font-bold text-sky-700 mb-4">About Us</h1>
        <p className="text-lg text-gray-600">This page is under construction.</p>
      </div>
      {/* Cloud animation keyframes (Tailwind custom classes required) */}
      <style>{`
        @keyframes fadeInUpOnce {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUpOnce {
          animation: fadeInUpOnce 1.1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .animate-cloudFloat { animation: cloudFloat 7s ease-in-out infinite; }
        .animate-cloudFloatSlow { animation: cloudFloatSlow 11s ease-in-out infinite; }
        .animate-cloudFloatReverse { animation: cloudFloatReverse 9s ease-in-out infinite; }
        .shadow-cloud {
          box-shadow: 0 8px 32px 0 rgba(135, 206, 235, 0.18), 0 2px 8px 0 rgba(0,0,0,0.07);
        }
        @keyframes cloudFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-18px); }
        }
        @keyframes cloudFloatSlow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(12px); }
        }
        @keyframes cloudFloatReverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(14px); }
        }
        /* Cloud shadow movement keyframes */
        @keyframes cloudShadow1 { 0%,100%{opacity:0.32;} 50%{opacity:0.18;} }
        @keyframes cloudShadow2 { 0%,100%{opacity:0.28;} 50%{opacity:0.14;} }
        @keyframes cloudShadow3 { 0%,100%{opacity:0.30;} 50%{opacity:0.16;} }
        @keyframes cloudShadow4 { 0%,100%{opacity:0.26;} 50%{opacity:0.13;} }
        @keyframes cloudShadow5 { 0%,100%{opacity:0.22;} 50%{opacity:0.10;} }
        @keyframes cloudShadow6 { 0%,100%{opacity:0.22;} 50%{opacity:0.10;} }
        @keyframes cloudShadow7 { 0%,100%{opacity:0.22;} 50%{opacity:0.10;} }
        @keyframes cloudShadow8 { 0%,100%{opacity:0.22;} 50%{opacity:0.10;} }
        @keyframes cloudShadow9 { 0%,100%{opacity:0.22;} 50%{opacity:0.10;} }
        @keyframes cloudShadow10 { 0%,100%{opacity:0.22;} 50%{opacity:0.10;} }
        @keyframes cloudShadow11 { 0%,100%{opacity:0.22;} 50%{opacity:0.10;} }
        @keyframes cloudShadow12 { 0%,100%{opacity:0.22;} 50%{opacity:0.10;} }
        @keyframes cloudShadow13 { 0%,100%{opacity:0.22;} 50%{opacity:0.10;} }
        @keyframes cloudShadow14 { 0%,100%{opacity:0.18;} 50%{opacity:0.08;} }
        @keyframes cloudShadow15 { 0%,100%{opacity:0.18;} 50%{opacity:0.08;} }
        @keyframes cloudShadow16 { 0%,100%{opacity:0.18;} 50%{opacity:0.08;} }
        @keyframes cloudShadow17 { 0%,100%{opacity:0.18;} 50%{opacity:0.08;} }
        @keyframes cloudShadow18 { 0%,100%{opacity:0.18;} 50%{opacity:0.08;} }
        @keyframes cloudShadow19 { 0%,100%{opacity:0.18;} 50%{opacity:0.08;} }
        .animate-cloudShadow1 { animation: cloudShadow1 7s ease-in-out infinite; }
        .animate-cloudShadow2 { animation: cloudShadow2 8s ease-in-out infinite; }
        .animate-cloudShadow3 { animation: cloudShadow3 7.5s ease-in-out infinite; }
        .animate-cloudShadow4 { animation: cloudShadow4 9s ease-in-out infinite; }
        .animate-cloudShadow5 { animation: cloudShadow5 7.5s ease-in-out infinite; }
        .animate-cloudShadow6 { animation: cloudShadow6 6.5s ease-in-out infinite; }
        .animate-cloudShadow7 { animation: cloudShadow7 8.5s ease-in-out infinite; }
        .animate-cloudShadow8 { animation: cloudShadow8 10s ease-in-out infinite; }
        .animate-cloudShadow9 { animation: cloudShadow9 12s ease-in-out infinite; }
        .animate-cloudShadow10 { animation: cloudShadow10 11s ease-in-out infinite; }
        .animate-cloudShadow11 { animation: cloudShadow11 13s ease-in-out infinite; }
        .animate-cloudShadow12 { animation: cloudShadow12 11s ease-in-out infinite; }
        .animate-cloudShadow13 { animation: cloudShadow13 14s ease-in-out infinite; }
        .animate-cloudShadow14 { animation: cloudShadow14 11s ease-in-out infinite; }
        .animate-cloudShadow15 { animation: cloudShadow15 10s ease-in-out infinite; }
        .animate-cloudShadow16 { animation: cloudShadow16 12s ease-in-out infinite; }
        .animate-cloudShadow17 { animation: cloudShadow17 11s ease-in-out infinite; }
        .animate-cloudShadow18 { animation: cloudShadow18 10s ease-in-out infinite; }
        .animate-cloudShadow19 { animation: cloudShadow19 12s ease-in-out infinite; }
      `}</style>
    </>
  );
}

// MobileMenu component for About Us only
function MobileMenu({ navigate }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div className="relative">
      <button
        className="p-2 rounded focus:outline-none"
        aria-label="Open menu"
        onClick={() => setOpen(o => !o)}
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#0ea5e9" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg z-50 py-2 border border-sky-200 animate-fadeInUpOnce">
          <button className="block w-full text-left px-4 py-2 text-sky-700 hover:bg-sky-100" onClick={() => { setOpen(false); navigate('/about'); }}>About Us</button>
        </div>
      )}
    </div>
  );
}

export default AboutUs;
