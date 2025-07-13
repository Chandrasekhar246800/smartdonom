import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

// Import dashboard images
import twokids from '../assets/dashboard/twokids.jpg';
import smillegirl from '../assets/dashboard/smillegirl.jpg';
import twokids2 from '../assets/dashboard/twokids2.jpg';
import hands from '../assets/dashboard/hands.jpg';

function useScrollAnimation(ref, animationClass) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const handleIntersect = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          node.classList.add(animationClass);
        }
      });
    };
    const observer = new window.IntersectionObserver(handleIntersect, { threshold: 0.2 });
    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, animationClass]);
}

// Cloud configs for position, speed, size, and style
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
  // Right-to-left clouds
  { top: '66%', right: -30, width: 288, height: 128, shadow: 'animate-cloudShadow12', opacity: 0.92, blur: 'blur-lg', float: 'animate-cloudFloatReverse', z: 1, speed: -0.06 },
  { bottom: '25%', right: -20, width: 224, height: 96, shadow: 'animate-cloudShadow13', opacity: 0.88, blur: 'blur-lg', float: 'animate-cloudFloat', z: 1, speed: -0.05 },
  // Small accent clouds
  { top: '6rem', left: 45, width: 128, height: 48, shadow: 'animate-cloudShadow14', opacity: 0.80, blur: 'blur-md', float: 'animate-cloudFloat', z: 3, speed: 0.11 },
  { top: '66%', left: 60, width: 144, height: 56, shadow: 'animate-cloudShadow15', opacity: 0.82, blur: 'blur-md', float: 'animate-cloudFloatReverse', z: 3, speed: 0.10 },
  { bottom: '6rem', left: 80, width: 112, height: 40, shadow: 'animate-cloudShadow16', opacity: 0.75, blur: 'blur-md', float: 'animate-cloudFloat', z: 3, speed: 0.09 },
  { top: '25%', left: 0, width: 160, height: 64, shadow: 'animate-cloudShadow17', opacity: 0.78, blur: 'blur-md', float: 'animate-cloudFloatSlow', z: 3, speed: 0.08 },
  // Extra overlapping
  { top: '10rem', left: 0, width: 176, height: 64, shadow: 'animate-cloudShadow18', opacity: 0.85, blur: 'blur-md', float: 'animate-cloudFloat', z: 3, speed: 0.07 },
  { bottom: '8rem', left: 0, width: 160, height: 56, shadow: 'animate-cloudShadow19', opacity: 0.80, blur: 'blur-md', float: 'animate-cloudFloatReverse', z: 3, speed: 0.06 },
];

function MovableCloud({ config, idx }) {
  const [pos, setPos] = useState(() => {
    // Start at config.left or config.right
    return {
      x: config.left !== undefined ? config.left : config.right,
      y: 0,
      dragging: false,
      dragStartX: 0,
      dragOffset: 0,
    };
  });
  const cloudRef = useRef();
  // Animate horizontally
  useEffect(() => {
    let raf;
    let lastTime = performance.now();
    function animate(now) {
      const dt = (now - lastTime) / 16.67; // ~60fps
      lastTime = now;
      if (!pos.dragging) {
        setPos(prev => {
          let x = prev.x + config.speed * dt;
          // Wrap around
          if (config.speed > 0 && x > 120) x = -40;
          if (config.speed < 0 && x < -40) x = 120;
          return { ...prev, x };
        });
      }
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line
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
      let x = prev.dragOffset + (clientX - prev.dragStartX) / 8; // scale drag
      // Clamp
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
  // Style
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
    <div ref={cloudRef} style={style} className="group select-none">
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

function Dashboard() {
  // Parallax state for movable clouds
  const cloudsParallaxRef = useRef(null);
  // Clouds always animate horizontally, but dragging adds a parallax offset
  const parallaxOffset = useRef(0);
  useEffect(() => {
    const bg = document.getElementById('cloud-bg-parallax');
    if (!bg || !cloudsParallaxRef.current) return;
    const clouds = cloudsParallaxRef.current;
    let dragging = false;
    let startX = 0;
    let lastOffset = 0;

    function setTransform(offset) {
      parallaxOffset.current = offset;
      clouds.style.transform = `translateX(${offset}px)`;
    }

    function onDown(e) {
      dragging = true;
      startX = e.touches ? e.touches[0].clientX : e.clientX;
      lastOffset = parallaxOffset.current || 0;
      bg.style.cursor = 'grabbing';
    }
    function onMove(e) {
      if (!dragging) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      let offset = lastOffset + (x - startX);
      // Clamp offset to avoid moving clouds too far
      offset = Math.max(Math.min(offset, 200), -200);
      setTransform(offset);
    }
    function onUp() {
      dragging = false;
      bg.style.cursor = '';
    }
    bg.addEventListener('mousedown', onDown);
    bg.addEventListener('touchstart', onDown, { passive: false });
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);
    return () => {
      bg.removeEventListener('mousedown', onDown);
      bg.removeEventListener('touchstart', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchend', onUp);
    };
  }, []);
  const navigate = useNavigate();
  const dashboardImages = [twokids, smillegirl, twokids2, hands];
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(0);
  const [direction, setDirection] = useState('right'); // 'right' or 'left'
  const timeoutRef = useRef(null);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setPrev(current);
      setDirection('right');
      setCurrent((prev) => (prev + 1) % dashboardImages.length);
    }, 3000); // Change time (ms) for speed
    return () => clearTimeout(timeoutRef.current);
  }, [current, dashboardImages.length]);

  // Animation refs
  const foodRef = useRef(null);
  const clothesRef = useRef(null);
  const booksRef = useRef(null);
  const toysRef = useRef(null);

  useScrollAnimation(foodRef, 'slide-in-right');
  useScrollAnimation(clothesRef, 'slide-in-left');
  useScrollAnimation(booksRef, 'slide-in-right');
  useScrollAnimation(toysRef, 'slide-in-left');

  return (
    <>
      {/* Clouds and sky background behind all content (moved outside main content for full-page coverage) */}
      <div
        style={{position:'fixed', inset:0, width:'100vw', height:'100vh', zIndex:0, pointerEvents:'none', overflow:'hidden'}}
        id="cloud-bg-parallax"
      >
        {/* Blue sky gradient */}
        <div style={{position:'absolute', inset:0, width:'100vw', height:'100vh', background:'linear-gradient(180deg, #b3e0ff 0%, #87ceeb 40%, #e0f7fa 100%)', zIndex:0}} />
      {/* Parallax and floating clouds with animated shadows (now real-time and draggable) */}
      <div
        style={{position:'absolute', inset:0, width:'100vw', height:'100vh', zIndex:1, pointerEvents:'none'}}
      >
        {CLOUD_CONFIGS.map((cfg, i) => (
          <MovableCloud key={i} config={cfg} idx={i} />
        ))}
      </div>
      </div>
      {/* Navbar with Login button top right (fixed, always visible) */}
      <nav className="w-full flex items-center justify-between px-4 py-3 bg-sky-100 shadow-lg fixed top-0 left-0 z-30">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}> 
          <img src={logo} alt="SmartDonum Logo" className="md:h-[70px] md:w-[70px] w-[50px] h-[50px] object-contain" style={{display:'block'}} />
          <span className="md:text-2xl text-[20px] font-bold text-sky-700">SmartDonum</span>
        </div>
        <button
          className="bg-sky-400 hover:bg-sky-500 text-white px-6 py-2 rounded-lg text-lg font-semibold shadow transition-all transform hover:scale-105 hover:shadow-xl focus:outline-none"
          onClick={() => navigate('/landing')}
        >
          Login
        </button>
      </nav>
      {/* Spacer for navbar */}
      <div className="h-16"></div>
      {/* Main dashboard content */}
      <div className="min-h-screen flex flex-col justify-between items-center px-4 py-8 relative overflow-x-hidden overflow-y-auto z-10 animate-fadeInUpOnce" style={{background:'transparent'}}>
     
      {/* Horizontal moving images under the image container */}
      <div className="w-full flex-col justify-center items-start mb-0 overflow-hidden p-0">
        <div className="relative w-full mt-0 sm:mt-0 h-[100vh] max-h-[100vh] sm:h-[calc(100vh-1px)] sm:max-h-[700px] p-0">
          {/* Left Arrow Button */}
          <button
            aria-label="Previous image"
            onClick={() => {
              setPrev(current);
              setDirection('left');
              setCurrent((prev) => (prev - 1 + dashboardImages.length) % dashboardImages.length);
            }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-sky-200 text-sky-700 rounded-full shadow-xl p-3 transition-all focus:outline-none border-2 border-sky-300"
            style={{width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
          >
            {/* Left Chevron SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          {/* Right Arrow Button */}
          <button
            aria-label="Next image"
            onClick={() => {
              setPrev(current);
              setDirection('right');
              setCurrent((prev) => (prev + 1) % dashboardImages.length);
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-sky-200 text-sky-700 rounded-full shadow-xl p-3 transition-all focus:outline-none border-2 border-sky-300"
            style={{width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center'}}
          >
            {/* Right Chevron SVG */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-7 h-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
          {/* Images */}
          {dashboardImages.map((img, idx) => {
            let classNames = 'carousel-img absolute top-0 left-0 w-full h-full object-cover rounded-2xl shadow-lg border border-sky-200 bg-white/80 p-0 m-0 ';
            if (idx === current) {
              classNames += direction === 'right' ? ' fade-slide-in-right' : ' fade-slide-in-left';
            } else if (idx === prev) {
              classNames += direction === 'right' ? ' fade-slide-out-left' : ' fade-slide-out-right';
            } else {
              classNames += ' opacity-0 pointer-events-none';
            }
            return (
              <img
                key={idx}
                src={img}
                alt={`dashboard-img-${idx}`}
                className={classNames}
                style={{
                  transition: 'none',
                  padding: 0,
                  margin: 0
                }}
              />
            );
          })}
        </div>
      </div>
      {/* Dividing line below images */}
      <div className="w-full h-2 rounded-full my-0 shimmer-divider" style={{marginTop: 16, marginBottom: 0}}></div>
      {/* Title below the dividing line */}
      <div className="w-full flex flex-col justify-center items-center mt-6 mb-2 px-0">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-sky-700 tracking-wide drop-shadow-lg uppercase text-center w-full">
          WHAT'S SMARTDONUM
        </h2>
        <p className="w-full mt-4 text-base sm:text-lg text-sky-800 text-center font-medium bg-white/70 rounded-xl px-2 sm:px-8 py-4 shadow-md" style={{letterSpacing: '0.01em'}}>

SmartDonum is a thoughtful donation platform that brings new life to the things you no longer need. From gently used clothes and toys to essential household items, individuals can easily give what they have to those who need it most. We make the process simple, convenient, and impactful, allowing anyone to contribute with just a few clicks. For food donations, we collaborate directly with trusted NGOs and verified organizations to ensure safe handling and responsible distribution, maintaining quality and hygiene at every step.

Our goal is simple: to reduce waste, support underprivileged communities, and make giving back as effortless and rewarding as possible. Every item you donate not only avoids ending up in a landfill but also finds a new purpose in someone else’s life. With SmartDonum, your unused belongings can spark joy, bring comfort, and make a real difference—transforming everyday generosity into lasting impact.
        </p>
      </div>
      {/* What you can donate section */}
      <div className="w-full flex justify-center items-center mt-8 mb-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-sky-800 tracking-wide drop-shadow-md uppercase text-center">
          What you can donate?
        </h2>
      </div>
      {/* Animated donation sections with scroll-triggered slide-in */}
      <div className="space-y-12">
        {/* Food section: slide in from right */}
        <div ref={foodRef} className="w-full flex flex-col sm:flex-row items-center justify-center gap-8 mt-4 mb-8 px-2 opacity-0">
          <div className="flex flex-col sm:flex-row items-center w-full max-w-2xl bg-white/80 rounded-2xl shadow-xl border-2 border-sky-200 overflow-hidden">
            {/* Provided image left */}
            <div className="flex-shrink-0 w-full sm:w-64 min-h-[180px] h-full sm:h-64 bg-white">
              <img
                src={require("../assets/dashboard/food.jpg")}
                alt="Donating food"
                className="w-full h-full object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-t-none"
              />
            </div>
            {/* Info text right */}
            <div className="flex-1 text-sky-900 text-base sm:text-lg font-medium px-4 py-4">
              <h3 className="text-xl sm:text-2xl font-bold text-sky-700 mb-2"><span className='bg-yellow-200 text-orange-700 px-2 py-1 rounded'>Food</span></h3>
              <p className="mt-3 text-sky-700 text-sm">Food donation is the act of giving extra or unused food to those in need, helping to reduce waste and fight hunger. Individuals, restaurants, and businesses can donate non-perishable items, fresh produce, or safely packed cooked meals. The food must be clean, unexpired, and stored properly. Donations can be made to food banks, NGOs, or local charities. It’s a simple way to support communities and promote sustainability.</p>
            </div>
          </div>
        </div>
        {/* Clothes section: slide in from left */}
        <div ref={clothesRef} className="w-full flex flex-col-reverse sm:flex-row items-center justify-center gap-8 mt-4 mb-8 px-2 opacity-0">
          <div className="flex flex-col-reverse sm:flex-row items-center w-full max-w-2xl bg-white/80 rounded-2xl shadow-xl border-2 border-sky-200 overflow-hidden">
            {/* Info text left */}
            <div className="flex-1 text-sky-900 text-base sm:text-lg font-medium px-4 py-4">
              <h3 className="text-xl sm:text-2xl font-bold text-sky-700 mb-2"><span className='bg-blue-200 text-blue-700 px-2 py-1 rounded'>Clothes</span></h3>
              <p className="mt-3 text-sky-700 text-sm">Clothes donation involves giving gently used or unused clothing to those in need, helping support underprivileged communities while reducing textile waste. Individuals can donate all types of clean, wearable clothes like shirts, pants, jackets, or even shoes and accessories. These donations are usually made to NGOs, shelters, or collection drives. Donating clothes not only helps people in need but also promotes reuse and reduces the environmental impact of fast fashion.</p>
            </div>
            {/* Provided image right */}
            <div className="flex-shrink-0 w-full sm:w-64 min-h-[180px] h-full sm:h-64 bg-white">
              <img
                src={require("../assets/dashboard/clothes.jpg")}
                alt="Donating clothes"
                className="w-full h-full object-cover rounded-b-2xl sm:rounded-r-2xl sm:rounded-b-none"
              />
            </div>
          </div>
        </div>
        {/* Books section: slide in from right */}
        <div ref={booksRef} className="w-full flex flex-col sm:flex-row items-center justify-center gap-8 mt-4 mb-8 px-2 opacity-0">
          <div className="flex flex-col sm:flex-row items-center w-full max-w-2xl bg-white/80 rounded-2xl shadow-xl border-2 border-sky-200 overflow-hidden">
            {/* Provided image left */}
            <div className="flex-shrink-0 w-full sm:w-64 min-h-[180px] h-full sm:h-64 bg-white">
              <img
                src={require("../assets/dashboard/book.jpg")}
                alt="Donating books"
                className="w-full h-full object-cover rounded-t-2xl sm:rounded-l-2xl sm:rounded-t-none"
              />
            </div>
            {/* Info text right */}
            <div className="flex-1 text-sky-900 text-base sm:text-lg font-medium px-4 py-4">
              <h3 className="text-xl sm:text-2xl font-bold text-sky-700 mb-2"><span className='bg-yellow-200 text-orange-700 px-2 py-1 rounded'>Books</span></h3>
              <p className="mt-3 text-sky-700 text-sm">Book donation is the act of giving away unused or gently used books to those who need them, helping to spread knowledge and promote literacy. Individuals can donate textbooks, storybooks, reference books, or educational materials to schools, libraries, NGOs, or community centers. It supports students and readers who lack access to learning resources while also reducing waste and encouraging the reuse of valuable materials.</p>
            </div>
          </div>
        </div>
        {/* Toys section: slide in from left */}
        <div ref={toysRef} className="w-full flex flex-col-reverse sm:flex-row items-center justify-center gap-8 mt-4 mb-8 px-2 opacity-0">
          <div className="flex flex-col-reverse sm:flex-row items-center w-full max-w-2xl bg-white/80 rounded-2xl shadow-xl border-2 border-sky-200 overflow-hidden">
            {/* Info text left */}
            <div className="flex-1 text-sky-900 text-base sm:text-lg font-medium px-4 py-4">
              <h3 className="text-xl sm:text-2xl font-bold text-sky-700 mb-2"><span className='bg-blue-200 text-blue-700 px-2 py-1 rounded'>Toys</span></h3>
              <p className="mt-3 text-sky-700 text-sm">Toy donation involves giving gently used or new toys to children in need, bringing joy and comfort to those who may not have access to them. Individuals can donate items like dolls, puzzles, games, or educational toys to orphanages, NGOs, shelters, or hospitals. Donating toys not only supports a child’s emotional and mental development but also encourages sharing, reduces waste, and gives old toys a new purpose.</p>
            </div>
            {/* Provided image right */}
            <div className="flex-shrink-0 w-full sm:w-64 min-h-[180px] h-full sm:h-64 bg-white">
              <img
                src={require("../assets/dashboard/toy.jpg")}
                alt="Donating toys"
                className="w-full h-full object-cover rounded-b-2xl sm:rounded-r-2xl sm:rounded-b-none"
              />
            </div>
          </div>
        </div>
      </div>
      {/* Quotation carousel box below the dividing line */}
      <QuoteCarousel />
      {/* Public vs Organization donation cards */}
      <div className="w-full flex flex-col sm:flex-row justify-center items-stretch gap-8 mt-10 mb-10 animate-fadeInUp">
        {/* Public Card */}
        <div className="flex-1 max-w-md bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl border border-sky-200 flex flex-col items-center py-10 px-7 mb-6 sm:mb-0 relative overflow-hidden group transition-all duration-500 hover:scale-[1.035] hover:shadow-4xl card-hover-effect animate-fadeInup origin-center will-change-transform" style={{boxShadow:'0 8px 32px 0 rgba(2,132,199,0.12)'}}>
          {/* Icon - elegant layered */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-sky-200 via-white to-sky-100 flex items-center justify-center shadow-xl border-4 border-white">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center">
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' className='w-10 h-10'><circle cx='20' cy='15' r='6' fill='#fff'/><ellipse cx='20' cy='28' rx='10' ry='7' fill='#fff' opacity='0.8'/></svg>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-sky-300 flex items-center justify-center shadow checkmark-animate"><svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5A6.5 6.5 0 1110 3.5a6.5 6.5 0 010 13z" fill="#38bdf8"/></svg></div>
          </div>
          <h4 className="text-2xl font-extrabold text-sky-700 mb-2 tracking-wide drop-shadow">Public</h4>
          <ul className="w-full mt-6 space-y-3">
            <li className="flex items-center gap-2 text-sky-800 text-base font-semibold"><span className="bg-green-100 rounded-full p-1"><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M7.5 13.5l-3-3 1.06-1.06L7.5 11.38l6.94-6.94 1.06 1.06-8 8z" fill="#22c55e"/></svg></span> Packaged Food</li>
            <li className="flex items-center gap-2 text-sky-800 text-base font-semibold"><span className="bg-green-100 rounded-full p-1"><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M7.5 13.5l-3-3 1.06-1.06L7.5 11.38l6.94-6.94 1.06 1.06-8 8z" fill="#22c55e"/></svg></span> Clothes</li>
            <li className="flex items-center gap-2 text-sky-800 text-base font-semibold"><span className="bg-green-100 rounded-full p-1"><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M7.5 13.5l-3-3 1.06-1.06L7.5 11.38l6.94-6.94 1.06 1.06-8 8z" fill="#22c55e"/></svg></span> Books</li>
            <li className="flex items-center gap-2 text-sky-800 text-base font-semibold"><span className="bg-green-100 rounded-full p-1"><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M7.5 13.5l-3-3 1.06-1.06L7.5 11.38l6.94-6.94 1.06 1.06-8 8z" fill="#22c55e"/></svg></span> Toys</li>
            <li className="flex items-center gap-2 text-gray-400 text-base font-semibold line-through"><span className="bg-gray-200 rounded-full p-1"><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M7.5 13.5l-3-3 1.06-1.06L7.5 11.38l6.94-6.94 1.06 1.06-8 8z" fill="#a3a3a3"/></svg></span> Cooked Foods</li>
          </ul>
        </div>
        {/* Organization Card */}
        <div className="flex-1 max-w-md bg-white/60 backdrop-blur-lg rounded-3xl shadow-2xl border border-amber-200 flex flex-col items-center py-10 px-7 relative overflow-hidden group transition-all duration-500 hover:scale-[1.035] hover:shadow-4xl card-hover-effect animate-fadeinup origin-center will-change-transform" style={{boxShadow:'0 8px 32px 0 rgba(251,191,36,0.10)'}}>
          {/* Icon - elegant layered */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-200 via-white to-amber-100 flex items-center justify-center shadow-xl border-4 border-white">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' className='w-10 h-10'><rect x='10' y='16' width='20' height='12' rx='5' fill='#fff'/><rect x='15' y='10' width='10' height='8' rx='3' fill='#fff' opacity='0.8'/></svg>
              </div>
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-amber-300 flex items-center justify-center shadow checkmark-animate"><svg width="20" height="20" fill="none" viewBox="0 0 20 20"><path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14.5A6.5 6.5 0 1110 3.5a6.5 6.5 0 010 13z" fill="#fbbf24"/></svg></div>
          </div>
          <h4 className="text-2xl font-extrabold text-amber-700 mb-2 tracking-wide drop-shadow">Organization</h4>
          <ul className="w-full mt-6 space-y-3">
            <li className="flex items-center gap-2 text-amber-900 text-base font-semibold"><span className="bg-green-100 rounded-full p-1"><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M7.5 13.5l-3-3 1.06-1.06L7.5 11.38l6.94-6.94 1.06 1.06-8 8z" fill="#22c55e"/></svg></span> Packaged Food</li>
            <li className="flex items-center gap-2 text-amber-900 text-base font-semibold"><span className="bg-green-100 rounded-full p-1"><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M7.5 13.5l-3-3 1.06-1.06L7.5 11.38l6.94-6.94 1.06 1.06-8 8z" fill="#22c55e"/></svg></span> Clothes</li>
            <li className="flex items-center gap-2 text-amber-900 text-base font-semibold"><span className="bg-green-100 rounded-full p-1"><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M7.5 13.5l-3-3 1.06-1.06L7.5 11.38l6.94-6.94 1.06 1.06-8 8z" fill="#22c55e"/></svg></span> Books</li>
            <li className="flex items-center gap-2 text-amber-900 text-base font-semibold"><span className="bg-green-100 rounded-full p-1"><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M7.5 13.5l-3-3 1.06-1.06L7.5 11.38l6.94-6.94 1.06 1.06-8 8z" fill="#22c55e"/></svg></span> Toys</li>
            <li className="flex items-center gap-2 text-amber-900 text-base font-semibold"><span className="bg-green-100 rounded-full p-1"><svg width="18" height="18" fill="none" viewBox="0 0 20 20"><path d="M7.5 13.5l-3-3 1.06-1.06L7.5 11.38l6.94-6.94 1.06 1.06-8 8z" fill="#22c55e"/></svg></span> Cooked Foods</li>
          </ul>
        </div>
      </div>
      {/* Thanks message above footer */}
      <div className="w-full flex justify-center items-center mt-2 mb-2">
        <div className="max-w-xl w-full bg-gradient-to-r from-sky-100 via-white to-amber-100 bg-opacity-80 rounded-2xl shadow-lg border border-sky-200 px-6 py-6 text-center animate-fadeInUp card-hover-effect">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-sky-700 mb-2 tracking-wide drop-shadow">Thank You for Making a Difference!</h3>
          <p className="text-base sm:text-lg text-sky-800 font-medium">Your generosity helps bring hope, comfort, and opportunity to those in need. Every donation, big or small, creates a ripple of kindness. Together, we are building a brighter, more compassionate world. <span className="inline-block align-middle ml-1">💙</span></p>
        </div>
      </div>
      {/* Title below the dividing line */}
      <footer className="w-full mt-10 sm:mt-16 flex-shrink-0 bg-sky-100 bg-opacity-90 z-10">
        <div className="text-center text-sky-700 text-sm py-4">
          © {new Date().getFullYear()} SmartDonum. All rights reserved. |
          <a href="#contact" className="text-sky-500 hover:text-sky-700 underline ml-2">Contact Us</a>
        </div>
      </footer>
      {/* Cloud animation keyframes (Tailwind custom classes required) */}
      <style>{`
        @keyframes fadeInUpOnce {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUpOnce {
          animation: fadeInUpOnce 1.1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .card-hover-effect {
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1), box-shadow 0.28s cubic-bezier(0.4,0,0.2,1);
        }
        .card-hover-effect:hover {
          transform: scale(1.035);
          box-shadow: 0 12px 36px 0 rgba(2,132,199,0.18), 0 2px 8px 0 rgba(0,0,0,0.09);
        }
        @keyframes cloudInfinite1 { 0% { left: -20%; } 100% { left: 120%; } }
        @keyframes cloudInfinite2 { 0% { left: -30%; } 100% { left: 110%; } }
        @keyframes cloudInfinite3 { 0% { left: -25%; } 100% { left: 115%; } }
        @keyframes cloudInfinite4 { 0% { left: -15%; } 100% { left: 125%; } }
        @keyframes cloudInfinite5 { 0% { left: -10%; } 100% { left: 130%; } }
        @keyframes cloudInfinite6 { 0% { left: -18%; } 100% { left: 120%; } }
        @keyframes cloudInfinite7 { 0% { left: -22%; } 100% { left: 128%; } }
        @keyframes cloudInfinite8 { 0% { left: 10%; } 100% { left: 140%; } }
        @keyframes cloudInfinite9 { 0% { left: 30%; } 100% { left: 150%; } }
        @keyframes cloudInfinite10 { 0% { left: 20%; } 100% { left: 135%; } }
        @keyframes cloudInfinite11 { 0% { left: 60%; } 100% { left: 160%; } }
        /* Right-to-left clouds for parallax */
        @keyframes cloudInfinite12Rtl { 0% { right: -30%; } 100% { right: 120%; } }
        @keyframes cloudInfinite13Rtl { 0% { right: -20%; } 100% { right: 110%; } }
        @keyframes cloudInfinite14 { 0% { left: 45%; } 100% { left: 130%; } }
        @keyframes cloudInfinite15 { 0% { left: 60%; } 100% { left: 140%; } }
        @keyframes cloudInfinite16 { 0% { left: 80%; } 100% { left: 160%; } }
        .animate-cloudInfinite1 { animation: cloudInfinite1 30s linear infinite; }
        .animate-cloudInfinite2 { animation: cloudInfinite2 40s linear infinite; }
        .animate-cloudInfinite3 { animation: cloudInfinite3 35s linear infinite; }
        .animate-cloudInfinite4 { animation: cloudInfinite4 45s linear infinite; }
        .animate-cloudInfinite5 { animation: cloudInfinite5 38s linear infinite; }
        .animate-cloudInfinite6 { animation: cloudInfinite6 32s linear infinite; }
        .animate-cloudInfinite7 { animation: cloudInfinite7 42s linear infinite; }
        .animate-cloudInfinite8 { animation: cloudInfinite8 50s linear infinite; }
        .animate-cloudInfinite9 { animation: cloudInfinite9 60s linear infinite; }
        .animate-cloudInfinite10 { animation: cloudInfinite10 55s linear infinite; }
        .animate-cloudInfinite11 { animation: cloudInfinite11 65s linear infinite; }
        .animate-cloudInfinite12Rtl { animation: cloudInfinite12Rtl 55s linear infinite reverse; }
        .animate-cloudInfinite13Rtl { animation: cloudInfinite13Rtl 70s linear infinite reverse; }
        .animate-cloudInfinite14 { animation: cloudInfinite14 55s linear infinite; }
        .animate-cloudInfinite15 { animation: cloudInfinite15 50s linear infinite; }
        .animate-cloudInfinite16 { animation: cloudInfinite16 60s linear infinite; }
        /* Parallax/floating clouds */
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
        .animate-cloudFloat { animation: cloudFloat 7s ease-in-out infinite; }
        .animate-cloudFloatSlow { animation: cloudFloatSlow 11s ease-in-out infinite; }
        .animate-cloudFloatReverse { animation: cloudFloatReverse 9s ease-in-out infinite; }
        .shadow-cloud {
          box-shadow: 0 8px 32px 0 rgba(135, 206, 235, 0.18), 0 2px 8px 0 rgba(0,0,0,0.07);
        }
        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(80px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-80px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .slide-in-right {
          opacity: 1 !important;
          animation: slideInRight 1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .slide-in-left {
          opacity: 1 !important;
          animation: slideInLeft 1s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
      </div>
    </>
  );
}

const QUOTES = [
  {
    text: "No one has ever become poor by giving.",
    author: "Anne Frank"
  },
  {
    text: "We make a living by what we get, but we make a life by what we give.",
    author: "Winston Churchill"
  },
  {
    text: "The simplest acts of kindness are by far more powerful than a thousand heads bowing in prayer.",
    author: "Mahatma Gandhi"
  },
  {
    text: "It's not how much we give, but how much love we put into giving.",
    author: "Mother Teresa"
  },
  {
    text: "Only by giving are you able to receive more than you already have.",
    author: "Jim Rohn"
  },
  {
    text: "Happiness doesn't result from what we get, but from what we give.",
    author: "Ben Carson"
  }
];

function QuoteCarousel() {
  const [index, setIndex] = React.useState(0);
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setIndex((prev) => (prev + 1) % QUOTES.length);
    }, 4000);
    return () => clearTimeout(timeoutRef.current);
  }, [index]);

  return (
    <div className="w-full flex justify-center items-center mt-8 mb-8 px-2">
      <div className="max-w-2xl w-full bg-white/80 border-2 border-sky-200 rounded-2xl shadow-xl p-6 flex flex-col gap-4 animate-fadeInUp relative">
        <h3 className="text-xl sm:text-2xl font-bold text-sky-700 mb-2 text-center">Inspiring Words on Giving</h3>
        <div className="min-h-[110px] flex flex-col justify-center items-center transition-all duration-700">
          <blockquote key={index} className="text-sky-800 italic text-base sm:text-lg font-medium border-l-4 border-sky-400 pl-4 mb-2 animate-fadeInQuote">
            <span className="block animate-fadeInQuoteText">"{QUOTES[index].text}"</span>
            <span className="block text-right text-sky-500 font-semibold mt-1 animate-fadeInQuoteAuthor">— {QUOTES[index].author}</span>
          </blockquote>
        </div>
        {/* Dots navigation */}
        <div className="flex justify-center items-center gap-2 mt-2">
          {QUOTES.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot w-3 h-3 rounded-full border border-sky-400 transition-all duration-300${i === index ? ' active' : ''}`}
              onClick={() => setIndex(i)}
              aria-label={`Show quote ${i+1}`}
            />
          ))}
        </div>
      </div>
      <style>{`
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
        @keyframes fadeInQuoteText {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInQuoteText {
          animation: fadeInQuoteText 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes fadeInQuoteAuthor {
          0% { opacity: 0; transform: translateY(16px); }
          60% { opacity: 0; }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInQuoteAuthor {
          animation: fadeInQuoteAuthor 0.7s 0.35s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .card-tilt-effect {
          will-change: transform;
          transition: transform 0.28s cubic-bezier(0.4,0,0.2,1), box-shadow 0.28s cubic-bezier(0.4,0,0.2,1);
        }
        .card-tilt-effect:hover {
          transform: perspective(900px) rotateY(7deg) scale(1.045) !important;
          box-shadow: 0 16px 40px 0 rgba(2,132,199,0.22), 0 2px 8px 0 rgba(0,0,0,0.11);
        }
        @keyframes cardPopIn {
          0% { opacity: 0; transform: scale(0.92) translateY(40px); }
          60% { opacity: 1; transform: scale(1.04) translateY(-8px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-cardPopIn {
          animation: cardPopIn 0.85s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        @keyframes checkmarkBounce {
          0% { transform: scale(0.2); opacity: 0; }
          60% { transform: scale(1.25); opacity: 1; }
          80% { transform: scale(0.92); }
          100% { transform: scale(1); }
        }
        .checkmark-animate {
          animation: checkmarkBounce 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
        .shimmer-divider {
          background: linear-gradient(90deg, #38bdf8 0%, #0ea5e9 40%, #38bdf8 80%, #bae6fd 100%);
          background-size: 200% 100%;
          animation: shimmerGradient 2.5s linear infinite;
          position: relative;
        }
        @keyframes shimmerGradient {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        /* Carousel fade+slide transitions */
        .carousel-img {
          opacity: 0;
          z-index: 0;
          pointer-events: none;
        }
        .fade-slide-in-right {
          animation: fadeSlideInRight 1.1s cubic-bezier(0.77,0,0.175,1) both;
          z-index: 10;
          opacity: 1;
          pointer-events: auto;
        }
        .fade-slide-in-left {
          animation: fadeSlideInLeft 1.1s cubic-bezier(0.77,0,0.175,1) both;
          z-index: 10;
          opacity: 1;
          pointer-events: auto;
        }
        .fade-slide-out-left {
          animation: fadeSlideOutLeft 1.1s cubic-bezier(0.77,0,0.175,1) both;
          z-index: 0;
        }
        .fade-slide-out-right {
          animation: fadeSlideOutRight 1.1s cubic-bezier(0.77,0,0.175,1) both;
          z-index: 0;
        }
        @keyframes fadeSlideInRight {
          0% { opacity: 0; transform: translateX(60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideInLeft {
          0% { opacity: 0; transform: translateX(-60px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        @keyframes fadeSlideOutLeft {
          0% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(-60px); }
        }
        @keyframes fadeSlideOutRight {
          0% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0; transform: translateX(60px); }
        }
        /* Carousel dot animation */
        .carousel-dot {
          transform: scale(1);
        }
        .carousel-dot.active {
          background: #38bdf8;
          border-color: #0ea5e9;
          transform: scale(1.35);
          box-shadow: 0 0 0 2px #bae6fd;
          transition: background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        @keyframes fadeInQuote {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInQuote {
          animation: fadeInQuote 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
