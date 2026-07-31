const { useState, useEffect, useRef } = React;

// --- HERO BACKGROUND PARTICLES (MONOCHROME SILVER/WHITE) ---
const CanvasParticles = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resize = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles = Array.from({ length: 45 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.8 + 0.4,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: -Math.random() * 0.5 - 0.2,
      opacity: Math.random() * 0.6 + 0.2,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < 0 || p.x > canvas.width) {
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#FFFFFF';
        ctx.fill();
      });
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-10" />;
};

// --- NAVBAR COMPONENT (STREETWEAR LOGO & WHITE ACCENTS) ---
const Navbar = ({ onOpenCheckout }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 py-4 transition-all duration-500">
      <div className={`max-w-6xl mx-auto px-6 py-3.5 rounded-full transition-all duration-500 flex items-center justify-between ${
        scrolled
          ? 'bg-[#000000]/90 backdrop-blur-xl border border-white/30 shadow-2xl shadow-black'
          : 'bg-black/40 backdrop-blur-md border border-white/15'
      }`}>
        {/* Brand Logo with Custom Cloudinary Logo Image & Streetwear Font */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full overflow-hidden border border-white/50 shadow-lg group-hover:scale-105 transition-transform bg-black flex items-center justify-center shrink-0">
            <img
              src="https://res.cloudinary.com/uhj4l0sp/image/upload/v1785377804/WJEI4888_vuksu4.jpg"
              alt="Dreamers Club Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="font-streetwear-brand text-xs sm:text-base font-extrabold tracking-[0.22em] text-white uppercase group-hover:text-gray-200 transition-colors">
            DREAMERS<span className="text-black bg-white px-2 py-0.5 rounded font-extrabold ml-1.5 text-[10px] sm:text-xs tracking-widest inline-block shadow-md">CLUB</span>
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8 text-xs font-semibold tracking-wider text-gray-300">
          <a href="#inicio" className="hover:text-white transition-colors uppercase tracking-widest">Inicio</a>
          <a href="#coleccion" className="hover:text-white transition-colors uppercase tracking-widest">Colección</a>
          <a href="#historia" className="hover:text-white transition-colors uppercase tracking-widest">Historia</a>
          <a href="#faq" className="hover:text-white transition-colors uppercase tracking-widest">FAQ</a>
        </div>

        {/* Action CTA Button & Instagram Link */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://www.instagram.com/dreamersclubcl/"
            target="_blank"
            rel="noreferrer"
            className="p-2.5 rounded-full border border-white/30 text-white hover:bg-white hover:text-black transition-all shadow-md"
            title="Síguenos en Instagram @dreamersclubcl"
          >
            <i data-lucide="instagram" className="w-4 h-4"></i>
          </a>

          <button
            onClick={() => onOpenCheckout()}
            className="btn-shimmer relative px-6 py-2.5 rounded-full bg-white text-black font-extrabold text-xs tracking-widest uppercase shadow-lg shadow-white/10 hover:scale-105 hover:bg-gray-100 transition-all duration-300"
          >
            Comprar Ahora
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenu(!mobileMenu)}
          className="md:hidden text-gray-300 hover:text-white focus:outline-none"
        >
          <i data-lucide={mobileMenu ? "x" : "menu"} className="w-6 h-6"></i>
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div className="md:hidden mt-3 max-w-6xl mx-auto p-6 rounded-2xl bg-black/95 backdrop-blur-2xl border border-white/30 space-y-4 text-center animate-fadeIn">
          <a href="#inicio" onClick={() => setMobileMenu(false)} className="block py-2 text-sm tracking-widest text-white uppercase hover:text-gray-300">Inicio</a>
          <a href="#coleccion" onClick={() => setMobileMenu(false)} className="block py-2 text-sm tracking-widest text-white uppercase hover:text-gray-300">Colección</a>
          <a href="#historia" onClick={() => setMobileMenu(false)} className="block py-2 text-sm tracking-widest text-white uppercase hover:text-gray-300">Historia</a>
          <a href="#faq" onClick={() => setMobileMenu(false)} className="block py-2 text-sm tracking-widest text-white uppercase hover:text-gray-300">FAQ</a>
          <button
            onClick={() => { setMobileMenu(false); onOpenCheckout(); }}
            className="w-full py-3 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-widest"
          >
            Comprar Ahora
          </button>
        </div>
      )}
    </nav>
  );
};

// --- HERO SECTION WITH BACKGROUND VIDEO & 3D TILT CAP ---
const Hero = ({ onOpenCheckout }) => {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rx = (-y / rect.height) * 22;
    const ry = (x / rect.width) * 22;
    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 0, ry: 0 });
  };

  return (
    <section id="inicio" className="relative min-h-screen pt-32 pb-20 px-4 sm:px-8 flex flex-col justify-center items-center overflow-hidden bg-marble-overlay">
      <CanvasParticles />

      {/* Atmospheric Background Video */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40 filter brightness-90 contrast-110 scale-105"
        >
          <source src="https://res.cloudinary.com/uhj4l0sp/video/upload/v1785375711/0729_1_qmtfey.mp4" type="video/mp4" />
        </video>
        {/* Pure Dark Overlays for High Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#000000]/85 via-[#000000]/40 to-[#000000]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#000000]/50 to-[#000000]"></div>
      </div>

      <div className="relative z-20 max-w-5xl mx-auto text-center space-y-6">
        {/* Luxury Capsule Tag Monochrome */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-white border border-white/30 text-white text-xs font-semibold tracking-widest uppercase animate-pulse-white">
          <i data-lucide="sparkles" className="w-3.5 h-3.5 text-white"></i>
          <span>LIMITED DREAMS. UNLIMITED LEGACY.</span>
        </div>

        {/* Headlines */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight text-white">
          <span className="font-streetwear uppercase tracking-widest text-white block drop-shadow-lg text-3xl sm:text-5xl md:text-6xl">
            Dreamers Club,
          </span>
          <span className="font-serif-italic font-normal text-gray-200 block text-3xl sm:text-5xl md:text-6xl mt-1.5 tracking-wide">
            solo para soñadores.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-gray-300 font-light leading-relaxed">
          Gorras premium diseñadas para quienes no siguen tendencias. <span className="text-white font-medium italic">Las crean.</span>
        </p>

        {/* 3D INTERACTIVE CAP SHOWCASE WITH CLEAN ANGELIC WHITE AURA */}
        <div
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative my-8 sm:my-12 max-w-xl mx-auto perspective-1000 cursor-grab active:cursor-grabbing flex items-center justify-center min-h-[420px] sm:min-h-[500px]"
        >
          {/* Pure White Radial Aura Glow behind Cap */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 sm:w-[450px] sm:h-[450px] rounded-full bg-white/20 filter blur-3xl pointer-events-none animate-pulse"></div>

          <div
            className="transform-style-3d transition-transform duration-200 ease-out relative z-10 w-full flex flex-col items-center"
            style={{
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            }}
          >
            {/* Cutout PNG Cap with Pure White Aura Drop Shadow */}
            <div className="relative p-2 flex items-center justify-center">
              <img
                src="https://res.cloudinary.com/uhj4l0sp/image/upload/v1785377172/LQEZ8867_gkadph.png"
                alt="DROP 001 ONLY DREAMERS"
                className="w-full h-auto max-h-[450px] sm:max-h-[520px] object-contain transform group-hover:scale-105 transition-transform duration-700 relative z-10 filter drop-shadow-[0_0_40px_rgba(255,255,255,0.9)] drop-shadow-[0_0_80px_rgba(255,255,255,0.6)]"
              />
            </div>

            <div className="mt-4 flex justify-between items-center px-6 py-3 rounded-2xl bg-black/90 backdrop-blur-md border border-white/30 z-30 shadow-2xl gap-8">
              <div className="text-left">
                <span className="text-[10px] text-gray-400 font-mono-custom tracking-wider block">DROP 001 // EDITION</span>
                <span className="text-sm font-bold text-white tracking-wide uppercase font-streetwear">DROP 001 ONLY DREAMERS</span>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono-custom text-white font-bold">$35.990 CLP</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => onOpenCheckout()}
            className="btn-shimmer w-full sm:w-auto px-8 py-4 rounded-full bg-white text-black font-extrabold text-sm tracking-widest uppercase shadow-xl shadow-white/10 hover:scale-105 hover:bg-gray-100 transition-all duration-300"
          >
            Comprar ahora
          </button>
          <a
            href="#coleccion"
            className="w-full sm:w-auto px-8 py-4 rounded-full glass-panel border border-white/40 text-white font-bold text-sm tracking-widest uppercase hover:bg-white/10 transition-all duration-300 text-center"
          >
            Ver colección
          </a>
        </div>

        {/* Trust Badges Monochrome */}
        <div className="pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-3 p-3.5 rounded-2xl glass-panel border border-white/10 text-gray-300">
            <i data-lucide="shield-check" className="w-5 h-5 text-white"></i>
            <span className="text-xs font-semibold tracking-wider">Edición Limitada 100 Unidades</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-3.5 rounded-2xl glass-panel border border-white/10 text-gray-300">
            <i data-lucide="truck" className="w-5 h-5 text-white"></i>
            <span className="text-xs font-semibold tracking-wider">Envíos Express a todo Chile</span>
          </div>
          <div className="flex items-center justify-center gap-3 p-3.5 rounded-2xl glass-panel border border-white/10 text-gray-300">
            <i data-lucide="award" className="w-5 h-5 text-white"></i>
            <span className="text-xs font-semibold tracking-wider">Calidad Premium Garantizada</span>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- OFFER & COUNTDOWN SECTION (MONOCHROME B&W) ---
const OfferSection = ({ onOpenCheckout }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 32, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const currentYear = now.getFullYear();
      let targetDate = new Date(currentYear, 7, 31, 23, 59, 59); // 7 is August (0-indexed)

      if (now > targetDate) {
        targetDate = new Date(currentYear + 1, 7, 31, 23, 59, 59);
      }

      const diff = targetDate - now;

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 px-4 sm:px-8 bg-black relative overflow-hidden border-y border-white/15">
      <div className="max-w-5xl mx-auto relative z-10 glass-panel-white p-8 sm:p-12 rounded-3xl border border-white/30 white-glow-md">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
          {/* Left Column: Pricing & Offer */}
          <div className="space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 border border-white text-white font-bold text-xs tracking-widest uppercase">
              <span className="w-2 h-2 rounded-full bg-white animate-ping"></span>
              LANZAMIENTO EXCLUSIVO CHILE
            </div>

            <div>
              <span className="text-gray-400 text-sm font-mono-custom line-through block">Precio Oficial: $41.990 CLP</span>
              <div className="flex items-baseline gap-3">
                <span className="text-4xl sm:text-6xl font-extrabold font-mono-custom text-white">$35.990</span>
                <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">CLP</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-gray-300 font-light leading-relaxed">
              Precio promocional válido únicamente durante el periodo de oferta o hasta agotar el stock.
            </p>

            {/* Limited Stock Counter Progress Bar */}
            <div className="space-y-2 pt-2">
              <div className="flex justify-between items-center text-xs font-bold font-mono-custom">
                <span className="text-white">DISPONIBILIDAD DROP 001</span>
              </div>
              <div className="w-full h-3 rounded-full bg-black border border-white/20 overflow-hidden p-0.5">
                <div className="h-full rounded-full bg-gradient-to-r from-gray-500 via-white to-gray-300 w-[85%] animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Right Column: Animated Countdown Timer to 31st of August */}
          <div className="glass-panel p-6 sm:p-8 rounded-2xl border border-white/20 text-center space-y-4">
            <span className="text-xs font-bold text-gray-300 uppercase tracking-widest block">
              TIEMPO RESTANTE DE LA OFERTA
            </span>

            <div className="grid grid-cols-4 gap-2 font-mono-custom">
              <div className="p-3 rounded-xl bg-black border border-white/20">
                <span className="text-2xl sm:text-4xl font-extrabold text-white block">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-[10px] text-gray-400 uppercase">Días</span>
              </div>
              <div className="p-3 rounded-xl bg-black border border-white/20">
                <span className="text-2xl sm:text-4xl font-extrabold text-white block">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[10px] text-gray-400 uppercase">Horas</span>
              </div>
              <div className="p-3 rounded-xl bg-black border border-white/20">
                <span className="text-2xl sm:text-4xl font-extrabold text-white block">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[10px] text-gray-400 uppercase">Min</span>
              </div>
              <div className="p-3 rounded-xl bg-black border border-white/20">
                <span className="text-2xl sm:text-4xl font-extrabold text-white block">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[10px] text-gray-400 uppercase">Seg</span>
              </div>
            </div>

            <button
              onClick={() => onOpenCheckout()}
              className="btn-shimmer w-full py-4 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-widest shadow-lg hover:bg-gray-200 transition-all"
            >
              Asegurar Mi Gorra Ahora
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

// --- PRODUCT VIEWER (HEADER IMAGE + DROP 001 ONLY DREAMERS) ---
const ProductViewer = ({ onOpenCheckout }) => {
  const capImages = [
    'https://res.cloudinary.com/uhj4l0sp/image/upload/v1785377812/OGYL0625_ewafwi.jpg',
    'https://res.cloudinary.com/uhj4l0sp/image/upload/v1785457694/0d08e257-b428-4440-8e9b-acb3bc35c996_ogfpc1.png',
    'https://res.cloudinary.com/uhj4l0sp/image/upload/v1785435425/FIAGE7944_xrx6es.jpg'
  ];
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const current = {
    name: 'DROP 001 ONLY DREAMERS',
    price: '$35.990 CLP',
    image: capImages[activeImgIndex],
    badge: 'Bestseller Drop 001',
    desc: 'Bordado frontal exclusivo DROP 001 ONLY DREAMERS con acabado deluxe y piedreria de calidad.',
  };

  return (
    <section id="coleccion" className="py-24 px-4 sm:px-8 bg-[#000000] relative">
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* SECTION GRAPHIC HEADER IMAGE REPLACING TEXT TITLE WITH STREETWEAR BADGES */}
        <div className="text-center space-y-4">
          <span className="text-xs font-bold text-white tracking-widest uppercase font-mono-custom">CATÁLOGO EXCLUSIVO // DROP 001</span>
          
          <div className="max-w-md sm:max-w-xl mx-auto rounded-3xl overflow-hidden border border-white/40 shadow-2xl white-glow-md relative p-2 bg-black">
            <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-full bg-black/90 backdrop-blur-md border border-white/40 text-[10px] font-mono-custom text-white uppercase tracking-wider">
              ✦ EDICIÓN LIMITADA • 100 UNIDADES
            </div>
            <div className="absolute bottom-4 right-4 z-20 px-3 py-1 rounded-full bg-white text-black font-extrabold text-[10px] uppercase font-streetwear tracking-wider shadow-lg">
              DROP 001 ONLY DREAMERS
            </div>
            <img
              src="https://res.cloudinary.com/uhj4l0sp/image/upload/v1785436047/681492381_1679462983201885_4962351382971705758_n_mtwa0m.jpg"
              alt="Colección Drop 001 Header"
              className="w-full h-auto object-cover rounded-2xl filter contrast-105 brightness-100 hover:scale-105 transition-transform duration-700"
            />
          </div>

          <div className="flex justify-center items-center gap-4 text-[11px] text-gray-400 font-mono-custom pt-1">
            <span>⚡ DESPACHOS A TODO CHILE</span>
            <span>•</span>
            <span>🔒 GARANTÍA AUTÉNTICA</span>
            <span>•</span>
            <span>💎 CALIDAD PREMIUM</span>
          </div>

          <p className="text-gray-400 text-sm max-w-xl mx-auto font-light pt-1">
            Cada pieza se fabrica bajo estrictos estándares artesanales streetwear. No realizamos reposiciones de drops agotados.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Dynamic Viewer with Dual Image Gallery & Ambient Tonal Glow Aura */}
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="relative w-full rounded-3xl p-2 sm:p-4 overflow-visible flex items-center justify-center">
              {/* Multi-layered Ambient Tonal Aura Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95%] h-[95%] rounded-full bg-gradient-to-tr from-white/40 via-gray-300/30 to-white/20 filter blur-3xl pointer-events-none opacity-90 animate-pulse"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-white/20 filter blur-2xl pointer-events-none"></div>

              <div className="relative w-full h-[380px] sm:h-[480px] rounded-3xl overflow-hidden glass-panel border border-white/40 shadow-[0_0_60px_rgba(255,255,255,0.3)] z-10 p-2 group bg-black">
                <div className="absolute top-4 left-4 z-20 px-3.5 py-1 rounded-full bg-black/90 backdrop-blur-md border border-white/50 text-white font-mono-custom text-xs shadow-lg">
                  {current.badge}
                </div>

                <img
                  src={current.image}
                  alt={current.name}
                  className="w-full h-full object-cover rounded-2xl filter brightness-105 contrast-105 transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Interactive Dual-Image Thumbnails Selector */}
            <div className="flex justify-center items-center gap-3 z-20">
              {capImages.map((imgUrl, imgIdx) => (
                <button
                  key={imgIdx}
                  onClick={() => setActiveImgIndex(imgIdx)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 transition-all p-1 bg-black cursor-pointer ${
                    activeImgIndex === imgIdx
                      ? 'border-white scale-105 shadow-xl white-glow-sm'
                      : 'border-white/20 opacity-60 hover:opacity-100 hover:border-white/50'
                  }`}
                  title={`Ver foto ${imgIdx + 1}`}
                >
                  <img src={imgUrl} alt={`Vista ${imgIdx + 1}`} className="w-full h-full object-cover rounded-xl" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Details & Specs */}
          <div className="space-y-6 text-left">
            <div>
              <span className="text-xs font-mono-custom text-gray-400">DISPONIBLE AHORA</span>
              <h3 className="text-2xl sm:text-4xl font-black text-white mt-1 font-streetwear uppercase">{current.name}</h3>
              <span className="text-3xl font-mono-custom font-extrabold text-white mt-2 block">{current.price}</span>
            </div>

            <p className="text-gray-300 text-sm font-light leading-relaxed">{current.desc}</p>

            {/* Specifications Cards */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold tracking-widest text-gray-400 uppercase">ESPECIFICACIONES TÉCNICAS</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-black border border-white/20 flex items-center gap-3">
                  <i data-lucide="layers" className="w-4 h-4 text-white shrink-0"></i>
                  <span className="text-white font-medium">Material De Algodon y Viscera de Gamuza Premium</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black border border-white/20 flex items-center gap-3">
                  <i data-lucide="sparkles" className="w-4 h-4 text-white shrink-0"></i>
                  <span className="text-white font-medium">Bordado 3D Alta Calidad</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black border border-white/20 flex items-center gap-3">
                  <i data-lucide="shield" className="w-4 h-4 text-white shrink-0"></i>
                  <span className="text-white font-medium">Interior de Satin Ultra-Suave con Diseño</span>
                </div>
                <div className="p-3.5 rounded-xl bg-black border border-white/20 flex items-center gap-3">
                  <i data-lucide="gem" className="w-4 h-4 text-white shrink-0"></i>
                  <span className="text-white font-medium">Piedreria Blanca y Negra Calidad Premium</span>
                </div>
              </div>
            </div>

            {/* ESTE DROP INCLUYE (GLOWING LUXURY UNBOXING CARD WITH STRIKING TYPOGRAPHY) */}
            <div className="relative rounded-3xl p-6 glass-panel border border-white/40 shadow-2xl overflow-hidden group mt-4">
              {/* Glowing Background Aura */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-white/25 via-gray-300/35 to-white/25 filter blur-2xl pointer-events-none opacity-90 animate-pulse"></div>

              <div className="relative z-10 space-y-4 text-left">
                <div className="flex items-center justify-between border-b border-white/20 pb-3">
                  <div className="flex items-center gap-2.5">
                    <i data-lucide="gift" className="w-5 h-5 text-white animate-bounce"></i>
                    <h4 className="text-base sm:text-lg font-black tracking-widest text-white uppercase font-streetwear">
                      ESTE DROP INCLUYE:
                    </h4>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-white text-black font-black text-[10px] uppercase font-mono-custom tracking-wider shadow-md">
                    PACK LUXURY
                  </span>
                </div>

                <ul className="space-y-2.5 font-mono-custom text-xs sm:text-sm">
                  <li className="flex items-center gap-3 p-3 rounded-xl bg-black/80 border border-white/30 text-white font-bold tracking-wide hover:border-white transition-all shadow-lg">
                    <span className="w-7 h-7 rounded-full bg-white/20 border border-white flex items-center justify-center text-white shrink-0 text-xs">✨</span>
                    <span>Cubrepolvo de Satín calidad premium</span>
                  </li>
                  <li className="flex items-center gap-3 p-3 rounded-xl bg-black/80 border border-white/30 text-white font-bold tracking-wide hover:border-white transition-all shadow-lg">
                    <span className="w-7 h-7 rounded-full bg-white/20 border border-white flex items-center justify-center text-white shrink-0 text-xs">🎁</span>
                    <span>Llavero de regalo exclusivo</span>
                  </li>
                  <li className="flex items-center gap-3 p-3 rounded-xl bg-black/80 border border-white/30 text-white font-bold tracking-wide hover:border-white transition-all shadow-lg">
                    <span className="w-7 h-7 rounded-full bg-white/20 border border-white flex items-center justify-center text-white shrink-0 text-xs">🔥</span>
                    <span>Sticker de colección limitada</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => onOpenCheckout(current.name)}
                className="btn-shimmer w-full py-4 rounded-full bg-white text-black font-extrabold text-xs uppercase tracking-widest shadow-xl hover:bg-gray-200 transition-all"
              >
                Comprar {current.name}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- MICRO UIs (COMPARISON MONOCHROME) ---
const MicroUIs = () => {
  return (
    <section className="py-24 px-4 sm:px-8 bg-[#0D0D12] relative border-t border-white/10">
      <div className="max-w-6xl mx-auto space-y-16">
        
        {/* COMPARISON MODULE */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold text-white tracking-widest uppercase">POR QUÉ SOMOS DIFERENTES</span>
            <h2 className="text-3xl font-extrabold text-white">Otras Marcas vs DREAMERS CLUB</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Otras Marcas */}
            <div className="p-8 rounded-3xl bg-black/80 border border-white/10 space-y-6 text-left">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <h3 className="text-xl font-bold text-gray-400 uppercase tracking-wider">OTRAS MARCAS</h3>
              </div>
              <ul className="space-y-4 text-sm text-gray-400">
                <li className="flex items-center gap-3">
                  <i data-lucide="x" className="w-5 h-5 text-red-400 shrink-0"></i>
                  <span>Producción masiva sin exclusividad</span>
                </li>
                <li className="flex items-center gap-3">
                  <i data-lucide="x" className="w-5 h-5 text-red-400 shrink-0"></i>
                  <span>Calidad promedio de poliéster estándar</span>
                </li>
                <li className="flex items-center gap-3">
                  <i data-lucide="x" className="w-5 h-5 text-red-400 shrink-0"></i>
                  <span>Diseños repetidos y clonados</span>
                </li>
                <li className="flex items-center gap-3">
                  <i data-lucide="x" className="w-5 h-5 text-red-400 shrink-0"></i>
                  <span>Sin historia ni identidad streetwear</span>
                </li>
              </ul>
            </div>

            {/* Dreamers Club Monochrome */}
            <div className="p-8 rounded-3xl glass-panel-white border border-white/50 white-glow-md space-y-6 text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 px-4 py-1 bg-white text-black font-extrabold text-[10px] tracking-widest uppercase rounded-bl-xl">
                ESTÁNDAR LUXURY
              </div>

              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-white animate-pulse"></div>
                <h3 className="text-xl font-bold text-white uppercase tracking-wider font-streetwear">DREAMERS CLUB</h3>
              </div>

              <ul className="space-y-4 text-sm text-white font-medium">
                <li className="flex items-center gap-3">
                  <i data-lucide="check" className="w-5 h-5 text-white shrink-0"></i>
                  <span>Edición limitada (100 gorras por drop)</span>
                </li>
                <li className="flex items-center gap-3">
                  <i data-lucide="check" className="w-5 h-5 text-white shrink-0"></i>
                  <span>bordado 3D de alta densidad</span>
                </li>
                <li className="flex items-center gap-3">
                  <i data-lucide="check" className="w-5 h-5 text-white shrink-0"></i>
                  <span>Exclusividad y detalles que marcan diferencia</span>
                </li>
                <li className="flex items-center gap-3">
                  <i data-lucide="check" className="w-5 h-5 text-white shrink-0"></i>
                  <span>Identidad de marca</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

// --- BRAND STORY / EDITORIAL ---
const Story = () => {
  return (
    <section id="historia" className="py-24 px-4 sm:px-8 bg-black relative overflow-hidden">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-left">
          <span className="text-xs font-bold text-white tracking-widest uppercase">NUESTRO MANIFIESTO</span>
          
          <div className="space-y-4">
            <p className="text-gray-100 text-base sm:text-lg leading-relaxed font-bold">
              <strong className="text-white font-streetwear tracking-wider">Dreamers Club</strong> no es para todos.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              Fue creada para quienes se niegan a conformarse, para quienes convierten la disciplina en un hábito y la ambición en un estilo de vida.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              Creemos que el éxito no llega por suerte. Se construye con constancia, sacrificio y la decisión de seguir avanzando cuando otros se detienen.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed font-light">
              Nuestras colecciones son limitadas porque representan algo que también lo es: una mentalidad. La de las personas que sueñan en grande, trabajan en silencio y dejan que sus resultados hablen por ellas.
            </p>
            <p className="text-gray-300 text-sm leading-relaxed font-light font-medium">
              No importa de dónde vienes. Importa hasta dónde estás dispuesto a llegar.
            </p>
          </div>

          <div className="pt-2">
            <span className="font-serif-italic text-xl text-white block">— Dreamers Club</span>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/30 shadow-2xl">
          <img
            src="https://res.cloudinary.com/uhj4l0sp/image/upload/v1785436100/GRAF7506_mrgups.jpg"
            alt="Dreamers Manifiesto Art"
            className="w-full h-full object-cover filter brightness-95 contrast-105 hover:scale-105 transition-transform duration-700 max-h-[500px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          <div className="absolute bottom-6 left-6 right-6 p-4 glass-panel-dark rounded-xl border border-white/20 text-center">
            <span className="text-xs font-mono-custom text-white tracking-widest uppercase block">
              "Limited Dreams. Unlimited Legacy."
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

// --- FAQ ACCORDION SECTION MONOCHROME ---
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: '¿Son originales las gorras de Dreamers Club?',
      a: 'Absolutamente. Todos los productos de Dreamers Club son 100% originales, diseñados de forma exclusiva por nuestro equipo creativo y fabricados con estándares de alta costura streetwear.',
    },
    {
      q: '¿Cuánto demora el envío dentro de Chile?',
      a: 'Realizamos despachos express a través de BlueExpress y Starken a todas las regiones de Chile. El tiempo estimado de entrega aproximado entre 24 y 48 horas hábiles después de confirmado tu pago por transferencia.',
    },
    {
      q: '¿Cuántas unidades existen por colección?',
      a: 'Nuestra premisa es la exclusividad. Cada drop consta únicamente de 100 unidades limitadas. Una vez agotado el stock, la colección desaparece para siempre y no vuelve a fabricarse.',
    },
    {
      q: '¿Puedo solicitar cambio de talla o modelo?',
      a: 'Nuestras gorras cuentan con un sistema de broche ajustable unisex de talla universal. En caso de solicitar cambio por disconformidad con el modelo, dispones de 10 días continuos con el producto sellado.',
    },
    {
      q: '¿Cómo envío el comprobante de pago por transferencia?',
      a: 'Una vez completado el formulario de compra en esta web, se mostrarán en pantalla los datos bancarios oficiales de nuestra cuenta. Podrás adjuntar la foto/captura del comprobante directamente en la página o enviarlo a nuestro correo dreamersclubcl@gmail.com , con tu número de orden.',
    },
  ];

  return (
    <section id="faq" className="py-24 px-4 sm:px-8 bg-black relative">
      <div className="max-w-4xl mx-auto space-y-10">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-white tracking-widest uppercase">PREGUNTAS FRECUENTES</span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white">Resolvemos tus dudas</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-2xl glass-panel border border-white/15 overflow-hidden transition-all"
            >
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className="w-full p-6 text-left flex justify-between items-center gap-4 focus:outline-none"
              >
                <span className="text-base sm:text-lg font-bold text-white">{faq.q}</span>
                <i
                  data-lucide="chevron-down"
                  className={`w-5 h-5 text-white transition-transform duration-300 ${
                    openIndex === idx ? 'rotate-180' : ''
                  }`}
                ></i>
              </button>

              {openIndex === idx && (
                <div className="px-6 pb-6 text-sm text-gray-300 font-light leading-relaxed border-t border-white/10 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- FINAL CINEMATIC CTA MONOCHROME ---
const FinalCTA = ({ onOpenCheckout }) => {
  return (
    <section className="py-32 px-4 sm:px-8 bg-black relative overflow-hidden text-center border-t border-white/20">
      <div className="absolute inset-0 z-0 opacity-25">
        <img
          src="https://res.cloudinary.com/uhj4l0sp/image/upload/v1785377182/HAEN0704_dj4exu.jpg"
          alt="Angel Sculpture Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        <span className="text-xs font-bold text-white tracking-widest uppercase">ÚLTIMAS UNIDADES DISPONIBLES</span>

        <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
          "No todos pueden <span className="font-serif-italic text-gray-200">pertenecer."</span>
        </h2>

        <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto font-light">
          Asegura tu pieza de colección antes de que el Drop 001 quede oficialmente sellado.
        </p>

        <div>
          <button
            onClick={() => onOpenCheckout()}
            className="btn-shimmer px-10 py-5 rounded-full bg-white text-black font-extrabold text-sm tracking-widest uppercase shadow-2xl shadow-white/20 hover:scale-105 hover:bg-gray-100 transition-all"
          >
            Comprar mi Dreamers
          </button>
        </div>
      </div>
    </section>
  );
};

// --- INSTAGRAM SHOWCASE SECTION ---
const InstagramSection = () => {
  return (
    <section className="py-20 px-4 sm:px-8 bg-black relative border-t border-white/10 text-center">
      <div className="max-w-4xl mx-auto space-y-6 glass-panel-white p-8 sm:p-12 rounded-3xl border border-white/30 white-glow-md">
        {/* User Specified Cloudinary Instagram Logo Image Asset */}
        <div className="w-20 h-20 mx-auto rounded-full overflow-hidden flex items-center justify-center p-2.5 bg-black border border-white/40 shadow-2xl hover:scale-110 transition-transform">
          <img
            src="https://res.cloudinary.com/uhj4l0sp/image/upload/v1785433652/descarga_1_pk3ltn.png"
            alt="Instagram Logo Dreamers Club"
            className="w-full h-full object-contain filter invert brightness-200"
          />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-gray-400 tracking-widest uppercase font-mono-custom">COMUNIDAD OFICIAL</span>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-streetwear">
            @DREAMERSCLUBCL
          </h3>
        </div>

        <p className="text-gray-300 text-sm max-w-lg mx-auto font-light leading-relaxed">
          Únete a nuestra comunidad exclusiva en Instagram. Sé el primero en enterarte de los nuevos drops, colecciones privadas y adelantos exclusivos antes que nadie.
        </p>

        <div className="pt-2">
          <a
            href="https://www.instagram.com/dreamersclubcl/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-white text-black font-extrabold text-xs tracking-widest uppercase shadow-xl shadow-white/10 hover:scale-105 hover:bg-gray-200 transition-all duration-300"
          >
            <i data-lucide="instagram" className="w-4 h-4"></i>
            Seguir en Instagram @dreamersclubcl
          </a>
        </div>
      </div>
    </section>
  );
};

// --- FOOTER ---
const Footer = () => {
  return (
    <footer className="py-12 px-4 sm:px-8 bg-black border-t border-white/10 text-center space-y-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <div className="text-left flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden border border-white/30">
            <img
              src="https://res.cloudinary.com/uhj4l0sp/image/upload/v1785377804/WJEI4888_vuksu4.jpg"
              alt="Dreamers Club Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="font-streetwear text-base font-black tracking-widest text-white uppercase block">
              DREAMERS<span className="text-gray-400 font-light ml-1">CLUB</span>
            </span>
            <p className="text-[10px] text-gray-400 font-mono-custom">Limited Dreams. Unlimited Legacy.</p>
          </div>
        </div>

        <div className="flex items-center gap-6 text-xs text-gray-400">
          <a href="https://www.instagram.com/dreamersclubcl/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-white">
            <i data-lucide="instagram" className="w-4 h-4 text-white"></i> @dreamersclubcl
          </a>
          <a href="https://www.tiktok.com/@dreamersclubcl?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5 font-bold text-white">
            <i data-lucide="video" className="w-4 h-4 text-white"></i> TikTok @dreamersclubcl
          </a>
          <a href="mailto:dreamersclubcl@gmail.com" className="hover:text-white transition-colors flex items-center gap-1.5">
            <i data-lucide="mail" className="w-4 h-4"></i> dreamersclubcl@gmail.com
          </a>
        </div>
      </div>

      <div className="pt-6 border-t border-white/5 text-[11px] text-gray-500 font-mono-custom">
        © 2026 DREAMERS CLUB CHILE. Todos los derechos reservados. Streetwear de edición limitada.
      </div>
    </footer>
  );
};

// Official 16 Chilean Regions
const CHILE_REGIONS = [
  "Región Metropolitana de Santiago",
  "Región de Valparaíso",
  "Región del Biobío",
  "Región de Coquimbo",
  "Región de La Araucanía",
  "Región de Antofagasta",
  "Región de Tarapacá",
  "Región de Arica y Parinacota",
  "Región de Atacama",
  "Región del Libertador General Bernardo O'Higgins",
  "Región del Maule",
  "Región de Ñuble",
  "Región de Los Ríos",
  "Región de Los Lagos",
  "Región de Aysén del General Carlos Ibáñez del Campo",
  "Región de Magallanes y de la Antártica Chilena"
];

// Master list of Chilean Comunas with their respective Regions
const ALL_CHILEAN_COMUNAS = [
  // Región Metropolitana
  { name: "Cerrillos", region: "Región Metropolitana de Santiago" },
  { name: "Cerro Navia", region: "Región Metropolitana de Santiago" },
  { name: "Conchalí", region: "Región Metropolitana de Santiago" },
  { name: "El Bosque", region: "Región Metropolitana de Santiago" },
  { name: "Estación Central", region: "Región Metropolitana de Santiago" },
  { name: "Huechuraba", region: "Región Metropolitana de Santiago" },
  { name: "Independencia", region: "Región Metropolitana de Santiago" },
  { name: "La Cisterna", region: "Región Metropolitana de Santiago" },
  { name: "La Florida", region: "Región Metropolitana de Santiago" },
  { name: "La Granja", region: "Región Metropolitana de Santiago" },
  { name: "La Pintana", region: "Región Metropolitana de Santiago" },
  { name: "La Reina", region: "Región Metropolitana de Santiago" },
  { name: "Las Condes", region: "Región Metropolitana de Santiago" },
  { name: "Lo Barnechea", region: "Región Metropolitana de Santiago" },
  { name: "Lo Espejo", region: "Región Metropolitana de Santiago" },
  { name: "Lo Prado", region: "Región Metropolitana de Santiago" },
  { name: "Macul", region: "Región Metropolitana de Santiago" },
  { name: "Maipú", region: "Región Metropolitana de Santiago" },
  { name: "Ñuñoa", region: "Región Metropolitana de Santiago" },
  { name: "Pedro Aguirre Cerda", region: "Región Metropolitana de Santiago" },
  { name: "Peñalolén", region: "Región Metropolitana de Santiago" },
  { name: "Providencia", region: "Región Metropolitana de Santiago" },
  { name: "Pudahuel", region: "Región Metropolitana de Santiago" },
  { name: "Puente Alto", region: "Región Metropolitana de Santiago" },
  { name: "Quilicura", region: "Región Metropolitana de Santiago" },
  { name: "Quinta Normal", region: "Región Metropolitana de Santiago" },
  { name: "Recoleta", region: "Región Metropolitana de Santiago" },
  { name: "Renca", region: "Región Metropolitana de Santiago" },
  { name: "San Bernardo", region: "Región Metropolitana de Santiago" },
  { name: "San Joaquín", region: "Región Metropolitana de Santiago" },
  { name: "San Miguel", region: "Región Metropolitana de Santiago" },
  { name: "San Ramón", region: "Región Metropolitana de Santiago" },
  { name: "Santiago", region: "Región Metropolitana de Santiago" },
  { name: "Vitacura", region: "Región Metropolitana de Santiago" },
  { name: "Colina", region: "Región Metropolitana de Santiago" },
  { name: "Lampa", region: "Región Metropolitana de Santiago" },
  { name: "Tiltil", region: "Región Metropolitana de Santiago" },
  { name: "Pirque", region: "Región Metropolitana de Santiago" },
  { name: "San José de Maipo", region: "Región Metropolitana de Santiago" },
  { name: "Buin", region: "Región Metropolitana de Santiago" },
  { name: "Calera de Tango", region: "Región Metropolitana de Santiago" },
  { name: "Paine", region: "Región Metropolitana de Santiago" },
  { name: "Melipilla", region: "Región Metropolitana de Santiago" },
  { name: "Talagante", region: "Región Metropolitana de Santiago" },
  { name: "Peñaflor", region: "Región Metropolitana de Santiago" },
  { name: "Isla de Maipo", region: "Región Metropolitana de Santiago" },
  { name: "El Monte", region: "Región Metropolitana de Santiago" },
  { name: "Padre Hurtado", region: "Región Metropolitana de Santiago" },

  // Valparaíso
  { name: "Valparaíso", region: "Región de Valparaíso" },
  { name: "Viña del Mar", region: "Región de Valparaíso" },
  { name: "Concón", region: "Región de Valparaíso" },
  { name: "Quilpué", region: "Región de Valparaíso" },
  { name: "Villa Alemana", region: "Región de Valparaíso" },
  { name: "Quillota", region: "Región de Valparaíso" },
  { name: "La Calera", region: "Región de Valparaíso" },
  { name: "Limache", region: "Región de Valparaíso" },
  { name: "Olmué", region: "Región de Valparaíso" },
  { name: "San Antonio", region: "Región de Valparaíso" },
  { name: "Cartagena", region: "Región de Valparaíso" },
  { name: "El Quisco", region: "Región de Valparaíso" },
  { name: "El Tabo", region: "Región de Valparaíso" },
  { name: "Santo Domingo", region: "Región de Valparaíso" },
  { name: "San Felipe", region: "Región de Valparaíso" },
  { name: "Los Andes", region: "Región de Valparaíso" },

  // Biobío
  { name: "Concepción", region: "Región del Biobío" },
  { name: "Talcahuano", region: "Región del Biobío" },
  { name: "San Pedro de la Paz", region: "Región del Biobío" },
  { name: "Chiguayante", region: "Región del Biobío" },
  { name: "Coronel", region: "Región del Biobío" },
  { name: "Lota", region: "Región del Biobío" },
  { name: "Hualpén", region: "Región del Biobío" },
  { name: "Penco", region: "Región del Biobío" },
  { name: "Tomé", region: "Región del Biobío" },
  { name: "Los Ángeles", region: "Región del Biobío" },

  // Coquimbo
  { name: "La Serena", region: "Región de Coquimbo" },
  { name: "Coquimbo", region: "Región de Coquimbo" },
  { name: "Ovalle", region: "Región de Coquimbo" },
  { name: "Illapel", region: "Región de Coquimbo" },

  // Araucanía
  { name: "Temuco", region: "Región de La Araucanía" },
  { name: "Padre Las Casas", region: "Región de La Araucanía" },
  { name: "Villarrica", region: "Región de La Araucanía" },
  { name: "Pucón", region: "Región de La Araucanía" },
  { name: "Angol", region: "Región de La Araucanía" },

  // Antofagasta
  { name: "Antofagasta", region: "Región de Antofagasta" },
  { name: "Calama", region: "Región de Antofagasta" },
  { name: "Tocopilla", region: "Región de Antofagasta" },

  // Tarapacá
  { name: "Iquique", region: "Región de Tarapacá" },
  { name: "Alto Hospicio", region: "Región de Tarapacá" },

  // Arica y Parinacota
  { name: "Arica", region: "Región de Arica y Parinacota" },

  // Atacama
  { name: "Copiapó", region: "Región de Atacama" },
  { name: "Vallenar", region: "Región de Atacama" },

  // O'Higgins
  { name: "Rancagua", region: "Región del Libertador General Bernardo O'Higgins" },
  { name: "Machalí", region: "Región del Libertador General Bernardo O'Higgins" },
  { name: "San Fernando", region: "Región del Libertador General Bernardo O'Higgins" },

  // Maule
  { name: "Talca", region: "Región del Maule" },
  { name: "Curicó", region: "Región del Maule" },
  { name: "Linares", region: "Región del Maule" },

  // Ñuble
  { name: "Chillán", region: "Región de Ñuble" },
  { name: "Chillán Viejo", region: "Región de Ñuble" },

  // Los Ríos
  { name: "Valdivia", region: "Región de Los Ríos" },
  { name: "La Unión", region: "Región de Los Ríos" },

  // Los Lagos
  { name: "Puerto Montt", region: "Región de Los Lagos" },
  { name: "Puerto Varas", region: "Región de Los Lagos" },
  { name: "Osorno", region: "Región de Los Lagos" },
  { name: "Castro", region: "Región de Los Lagos" },

  // Aysén
  { name: "Coyhaique", region: "Región de Aysén del General Carlos Ibáñez del Campo" },

  // Magallanes
  { name: "Punta Arenas", region: "Región de Magallanes y de la Antártica Chilena" },
  { name: "Puerto Natales", region: "Región de Magallanes y de la Antártica Chilena" }
];

// Popular Chilean address database for zero-latency instant autocomplete matching
const popularChileanAddresses = [
  { street: "Av. Libertador Bernardo O'Higgins 1234", comuna: "Santiago", region: "Región Metropolitana de Santiago" },
  { street: "Av. Providencia 2200", comuna: "Providencia", region: "Región Metropolitana de Santiago" },
  { street: "Av. Apoquindo 4500", comuna: "Las Condes", region: "Región Metropolitana de Santiago" },
  { street: "Av. Vitacura 3000", comuna: "Vitacura", region: "Región Metropolitana de Santiago" },
  { street: "Av. Irarrázaval 2400", comuna: "Ñuñoa", region: "Región Metropolitana de Santiago" },
  { street: "Av. Vicuña Mackenna 1500", comuna: "La Florida", region: "Región Metropolitana de Santiago" },
  { street: "Av. Pedro de Valdivia 1000", comuna: "Providencia", region: "Región Metropolitana de Santiago" },
  { street: "Av. Pajaritos 3000", comuna: "Maipú", region: "Región Metropolitana de Santiago" },
  { street: "Av. Americo Vespucio 1000", comuna: "Peñalolén", region: "Región Metropolitana de Santiago" },
  { street: "Av. Santa Rosa 1200", comuna: "San Miguel", region: "Región Metropolitana de Santiago" },
  { street: "Av. Recoleta 800", comuna: "Recoleta", region: "Región Metropolitana de Santiago" },
  { street: "Av. Libertad 1050", comuna: "Viña del Mar", region: "Región de Valparaíso" },
  { street: "Av. Alvarez 800", comuna: "Viña del Mar", region: "Región de Valparaíso" },
  { street: "Av. San Martín 500", comuna: "Viña del Mar", region: "Región de Valparaíso" },
  { street: "Av. Errázuriz 1100", comuna: "Valparaíso", region: "Región de Valparaíso" },
  { street: "Av. Pedro de Valdivia 500", comuna: "Concepción", region: "Región del Biobío" },
  { street: "Av. Chacabuco 800", comuna: "Concepción", region: "Región del Biobío" },
  { street: "Av. Paicaví 1200", comuna: "Concepción", region: "Región del Biobío" },
  { street: "Av. Francisco de Aguirre 400", comuna: "La Serena", region: "Región de Coquimbo" },
  { street: "Av. Balmaceda 1200", comuna: "La Serena", region: "Región de Coquimbo" },
  { street: "Av. Alemania 0800", comuna: "Temuco", region: "Región de La Araucanía" },
  { street: "Av. Brasil 2100", comuna: "Antofagasta", region: "Región de Antofagasta" },
  { street: "Av. Arturo Prat 1000", comuna: "Iquique", region: "Región de Tarapacá" },
  { street: "Av. Diego Portales 1200", comuna: "Puerto Montt", region: "Región de Los Lagos" },
  { street: "Av. 2 Sur 1100", comuna: "Talca", region: "Región del Maule" },
  { street: "Av. Miguel Ramírez 500", comuna: "Rancagua", region: "Región del Libertador General Bernardo O'Higgins" },
  { street: "Av. O'Higgins 800", comuna: "Chillán", region: "Región de Ñuble" },
  { street: "Av. Picarte 1500", comuna: "Valdivia", region: "Región de Los Ríos" },
  { street: "Av. Diego Portales 500", comuna: "Arica", region: "Región de Arica y Parinacota" },
  { street: "Av. Bories 800", comuna: "Punta Arenas", region: "Región de Magallanes y de la Antártica Chilena" }
];

// --- BANK TRANSFER CHECKOUT MODAL B&W ---
const CheckoutModal = ({ isOpen, onClose, initialItem }) => {
  const [step, setStep] = useState(1);
  const [copied, setCopied] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [receiptFile, setReceiptFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const [orderNumber, setOrderNumber] = useState('');

  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    direccion: '',
    comuna: '',
    region: 'Región Metropolitana de Santiago',
    agenciaEnvio: 'BlueExpress',
    cantidad: 1,
    modelo: initialItem || 'DROP 001 ONLY DREAMERS',
  });

  useEffect(() => {
    if (isOpen && !orderNumber) {
      const currentSeq = parseInt(localStorage.getItem('dreamers_order_seq') || '1001', 10);
      setOrderNumber(`#DC-${currentSeq}`);
    }
  }, [isOpen]);

  const pricePerUnit = 35990;
  const totalPrice = pricePerUnit * formData.cantidad;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleStep1Submit = (e) => {
    e.preventDefault();

    // Increment Order Number in localStorage
    const currentSeq = parseInt(localStorage.getItem('dreamers_order_seq') || '1001', 10);
    const assignedNum = orderNumber || `#DC-${currentSeq}`;
    localStorage.setItem('dreamers_order_seq', (currentSeq + 1).toString());

    // Save order payload locally in localStorage backup array
    const newOrderPayload = {
      orderNumber: assignedNum,
      date: new Date().toLocaleString('es-CL'),
      ...formData,
      totalPrice,
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem('dreamers_all_orders') || '[]');
      existingOrders.push(newOrderPayload);
      localStorage.setItem('dreamers_all_orders', JSON.stringify(existingOrders));
    } catch (err) {}

    // Send automatic notification email in background to dreamersclubcl@gmail.com
    try {
      fetch('https://formspree.io/f/mqakpyqo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: `📦 NUEVO INTENTO DE PAGO / PEDIDO ${assignedNum} - ${formData.nombre} ${formData.apellido}`,
          orderNumber: assignedNum,
          cliente: `${formData.nombre} ${formData.apellido}`,
          correo: formData.correo,
          telefono: formData.telefono,
          modelo: formData.modelo,
          cantidad: formData.cantidad,
          montoTotal: `$${totalPrice.toLocaleString('es-CL')} CLP`,
          agenciaEnvio: formData.agenciaEnvio,
          direccionDespacho: `${formData.direccion}, ${formData.comuna}, ${formData.region}`,
          fecha: new Date().toLocaleString('es-CL'),
        }),
      }).catch(() => {});
    } catch (err) {}

    setStep(2);
  };

  const handleComunaInputChange = (e) => {
    const val = e.target.value;
    const found = ALL_CHILEAN_COMUNAS.find(c => c.name.toLowerCase() === val.toLowerCase());
    setFormData(prev => ({
      ...prev,
      comuna: val,
      region: found ? found.region : prev.region
    }));
  };

  const handleAddressInputChange = (e) => {
    const val = e.target.value;
    setFormData(prev => ({ ...prev, direccion: val }));

    if (val.trim().length >= 1) {
      const query = val.toLowerCase();
      const numMatch = val.match(/\b\d+\b/);
      const userNum = numMatch ? ` ${numMatch[0]}` : '';

      // Check if user typed a known comuna name inside their string (e.g. "lo prado", "providencia")
      const matchedComunaObj = ALL_CHILEAN_COMUNAS.find(c => query.includes(c.name.toLowerCase()));

      let smartFallbacks = [];

      if (matchedComunaObj) {
        // User typed a specific comuna name in the input!
        let cleanStreet = val
          .replace(new RegExp(matchedComunaObj.name, 'gi'), '')
          .replace(/\b\d+\b/g, '')
          .trim();

        if (!cleanStreet) cleanStreet = val.trim();

        smartFallbacks.push({
          street: `${cleanStreet}${userNum}`,
          comuna: matchedComunaObj.name,
          region: matchedComunaObj.region
        });
      } else {
        // Search preset addresses matching query
        const localMatches = popularChileanAddresses.filter(a =>
          a.street.toLowerCase().includes(query) ||
          a.comuna.toLowerCase().includes(query)
        );

        smartFallbacks = localMatches.map(m => ({
          street: `${m.street.replace(/\s+\d+$/, '')}${userNum}`,
          comuna: m.comuna,
          region: m.region
        }));

        if (smartFallbacks.length === 0) {
          smartFallbacks.push({
            street: val,
            comuna: formData.comuna || "Santiago",
            region: formData.region || "Región Metropolitana de Santiago"
          });
        }
      }

      setSuggestions(smartFallbacks);
      setShowSuggestions(true);

      // Fetch live Photon OpenStreetMap API with CORRECT parameter: countrycode=cl
      fetch(`https://photon.komoot.io/api/?q=${encodeURIComponent(val)}&countrycode=cl&limit=8`)
        .then(res => res.json())
        .then(data => {
          if (data && data.features && data.features.length > 0) {
            const fetched = data.features.map(f => {
              const p = f.properties;
              const streetName = p.name || p.street || val;
              const houseNum = p.housenumber ? ` ${p.housenumber}` : userNum;
              const comunaName = p.city || p.town || p.district || p.suburb || p.county || (matchedComunaObj ? matchedComunaObj.name : (formData.comuna || 'Santiago'));
              
              const rawState = p.state || (matchedComunaObj ? matchedComunaObj.region : (formData.region || 'Región Metropolitana de Santiago'));
              const matchedRegion = CHILE_REGIONS.find(r =>
                r.toLowerCase().includes(rawState.toLowerCase()) ||
                rawState.toLowerCase().includes(r.toLowerCase().replace('región de ', '').replace('región del ', ''))
              ) || (matchedComunaObj ? matchedComunaObj.region : (formData.region || 'Región Metropolitana de Santiago'));

              return {
                street: `${streetName}${houseNum}`,
                comuna: comunaName,
                region: matchedRegion
              };
            });

            // Combine fetched + fallbacks deduplicated
            const combined = [...fetched, ...smartFallbacks].filter((item, index, self) =>
              index === self.findIndex((t) => 
                t.street.toLowerCase() === item.street.toLowerCase() && 
                t.comuna.toLowerCase() === item.comuna.toLowerCase()
              )
            );

            setSuggestions(combined.slice(0, 8));
          }
        })
        .catch(() => {});
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSelectSuggestion = (sug) => {
    const matchedRegion = ALL_CHILEAN_COMUNAS.find(c => c.name.toLowerCase() === sug.comuna.toLowerCase())?.region || sug.region;
    setFormData(prev => ({
      ...prev,
      direccion: sug.street,
      comuna: sug.comuna,
      region: CHILE_REGIONS.includes(matchedRegion) ? matchedRegion : prev.region
    }));
    setShowSuggestions(false);
  };

  const handleCopyBankData = () => {
    const bankText = `Banco Santander
Cuenta de Ahorro
Sebastian Orlando Vidal Munoz
21.381.872-4
0 012 02 75232 9
dreamersclubcl@gmail.com`;

    navigator.clipboard.writeText(bankText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setReceiptFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setReceiptFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const getWhatsAppURL = () => {
    const msg = `Hola Dreamers Club. Acabo de realizar mi compra por transferencia bancaria.
*N° DE PEDIDO: ${orderNumber || '#DC-1001'}*
*Detalles del pedido:*
- Cliente: ${formData.nombre} ${formData.apellido}
- Modelo: ${formData.modelo} (x${formData.cantidad})
- Monto Total: $${totalPrice.toLocaleString('es-CL')} CLP
- Teléfono: ${formData.telefono}
- Dirección de Despacho: ${formData.direccion}, ${formData.comuna}, ${formData.region}
- Agencia de Envío: ${formData.agenciaEnvio}${receiptFile ? `\n- Comprobante Adjunto: ${receiptFile.name}` : ''}`;

    return `https://wa.me/56957937798?text=${encodeURIComponent(msg)}`;
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-6 bg-black/90 backdrop-blur-xl animate-fadeIn cursor-pointer"
    >
      <div className="relative w-full max-w-2xl bg-[#08080C] border border-white/40 rounded-2xl sm:rounded-3xl p-3 sm:p-6 flex flex-col max-h-[92vh] shadow-2xl white-glow-lg my-auto overflow-hidden cursor-default">
        
        {/* Fixed Modal Header */}
        <div className="flex justify-between items-center border-b border-white/15 pb-2.5 shrink-0 mb-2">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono-custom text-gray-400 tracking-widest uppercase">CHECKOUT EXCLUSIVO CHILE</span>
              {orderNumber && (
                <span className="px-2 py-0.5 rounded bg-white/20 border border-white/40 text-[10px] font-mono-custom text-white font-bold">
                  {orderNumber}
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-2xl font-extrabold text-white mt-0.5">
              {step === 1 && 'Paso 1: Datos de Envío'}
              {step === 2 && 'Paso 2: Datos para Transferencia'}
              {step === 3 && 'Paso 3: Confirmación de Comprobante'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded-full bg-white/10 hover:bg-white hover:text-black border border-white/30 text-white text-xs font-bold transition-all flex items-center gap-1.5"
            title="Cerrar formulario y volver atrás"
          >
            <i data-lucide="x" className="w-4 h-4"></i>
            <span>Cerrar</span>
          </button>
        </div>

        {/* Scrollable Modal Content Container (Ensures No Field Clipping on Mobile Keyboards) */}
        <div className="overflow-y-auto pr-1 space-y-3 sm:space-y-4 text-left flex-1 custom-scrollbar">

          {/* STEP 1: DELIVERY FORM */}
          {step === 1 && (
            <form
              onSubmit={handleStep1Submit}
              className="space-y-3 sm:space-y-4 pt-1"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <label className="text-xs text-gray-300 font-medium block mb-1">Nombre *</label>
                  <input
                    type="text"
                    required
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    placeholder="Felipe"
                    className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#121218] border border-white/20 text-white text-base sm:text-sm focus:border-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-300 font-medium block mb-1">Apellido *</label>
                  <input
                    type="text"
                    required
                    name="apellido"
                    value={formData.apellido}
                    onChange={handleChange}
                    placeholder="Vidal"
                    className="w-full px-4 py-3 sm:py-2.5 rounded-xl bg-[#121218] border border-white/20 text-white text-base sm:text-sm focus:border-white focus:outline-none"
                  />
                </div>
              </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-300 font-medium block mb-1">Correo Electrónico *</label>
                <input
                  type="email"
                  required
                  name="correo"
                  value={formData.correo}
                  onChange={handleChange}
                  placeholder="tu@correo.cl"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121218] border border-white/15 text-white text-sm focus:border-white focus:outline-none"
                />
              </div>
              <div>
                <label className="text-xs text-gray-300 font-medium block mb-1">Teléfono WhatsApp *</label>
                <input
                  type="tel"
                  required
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  placeholder="+56 9 1234 5678"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121218] border border-white/15 text-white text-sm focus:border-white focus:outline-none"
                />
              </div>
            </div>

            {/* DIRECCIÓN CON AUTOCOMPLETADO DE TODO CHILE */}
            <div className="relative">
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs text-gray-300 font-medium">Dirección de Despacho *</label>
                <span className="text-[10px] text-gray-400 font-mono-custom flex items-center gap-1">
                  <i data-lucide="map" className="w-3 h-3 text-white"></i> Cobertura Nacional Chile
                </span>
              </div>

              <input
                type="text"
                required
                name="direccion"
                value={formData.direccion}
                onChange={handleAddressInputChange}
                onFocus={() => formData.direccion.length >= 2 && setShowSuggestions(true)}
                placeholder="Escribe tu calle, pasaje o avenida (ej: Condell, Providencia, Pedro de Valdivia...)"
                className="w-full px-4 py-2.5 rounded-xl bg-[#121218] border border-white/15 text-white text-sm focus:border-white focus:outline-none"
              />

              {/* Autocomplete Dropdown List Overlay */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute left-0 right-0 top-full mt-1 z-[100] bg-[#121218] border border-white/40 rounded-2xl shadow-2xl overflow-hidden max-h-64 overflow-y-auto">
                  <div className="p-2 bg-black/60 border-b border-white/10 text-[10px] font-mono-custom text-gray-400 text-left px-3">
                    📍 DIRECCIONES ENCONTRADAS EN CHILE (Haz clic para autocompletar):
                  </div>
                  {suggestions.map((item, idx) => (
                    <div
                      key={idx}
                      onMouseDown={(e) => {
                        e.preventDefault();
                        handleSelectSuggestion(item);
                      }}
                      className="p-3.5 hover:bg-white/20 cursor-pointer border-b border-white/10 last:border-0 flex items-start gap-3 text-xs transition-colors bg-[#121218] text-left"
                    >
                      <i data-lucide="map-pin" className="w-4 h-4 text-white shrink-0 mt-0.5"></i>
                      <div>
                        <span className="font-bold text-white block">{item.street}</span>
                        <span className="text-[11px] text-gray-300 font-mono-custom">
                          Comuna: <strong className="text-white">{item.comuna}</strong> • {item.region}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* COMUNA Y SELECCIÓN DE LAS 16 REGIONES DE CHILE */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-gray-300 font-medium">Comuna *</label>
                  <span className="text-[10px] text-gray-400 font-mono-custom">Todas las comunas de Chile</span>
                </div>
                <input
                  type="text"
                  required
                  name="comuna"
                  list="chilean-comunas-datalist"
                  value={formData.comuna}
                  onChange={handleComunaInputChange}
                  placeholder="Escribe o selecciona tu comuna (ej: Providencia, Las Condes, Viña del Mar...)"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121218] border border-white/15 text-white text-sm focus:border-white focus:outline-none"
                />
                <datalist id="chilean-comunas-datalist">
                  {ALL_CHILEAN_COMUNAS.map((c, cIdx) => (
                    <option key={cIdx} value={c.name}>
                      {c.name} ({c.region})
                    </option>
                  ))}
                </datalist>
              </div>

              <div>
                <label className="text-xs text-gray-300 font-medium block mb-1">Región (Chile) *</label>
                <select
                  name="region"
                  value={formData.region}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121218] border border-white/15 text-white text-sm focus:border-white focus:outline-none cursor-pointer"
                >
                  {CHILE_REGIONS.map((reg, rIdx) => (
                    <option key={rIdx} value={reg} className="bg-black text-white">
                      {reg}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* SELECCIÓN DE AGENCIA DE ENVÍO */}
            <div>
              <label className="text-xs text-gray-300 font-medium block mb-1.5">Agencia de Envío *</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, agenciaEnvio: 'BlueExpress' })}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    formData.agenciaEnvio === 'BlueExpress'
                      ? 'bg-white text-black border-white shadow-md shadow-white/20'
                      : 'bg-[#121218] border-white/15 text-gray-400 hover:text-white'
                  }`}
                >
                  <i data-lucide="truck" className="w-4 h-4"></i>
                  BlueExpress
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, agenciaEnvio: 'Starken' })}
                  className={`p-3 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    formData.agenciaEnvio === 'Starken'
                      ? 'bg-white text-black border-white shadow-md shadow-white/20'
                      : 'bg-[#121218] border-white/15 text-gray-400 hover:text-white'
                  }`}
                >
                  <i data-lucide="package" className="w-4 h-4"></i>
                  Starken
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs text-gray-300 font-medium block mb-1">Modelo Seleccionado</label>
                <select
                  name="modelo"
                  value={formData.modelo}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121218] border border-white/15 text-white text-sm focus:border-white focus:outline-none"
                >
                  <option value="DROP 001 ONLY DREAMERS">DROP 001 ONLY DREAMERS</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-300 font-medium block mb-1">Cantidad</label>
                <select
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={(e) => setFormData({ ...formData, cantidad: Number(e.target.value) })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#121218] border border-white/15 text-white text-sm focus:border-white focus:outline-none"
                >
                  <option value="1">1 Unidad ($35.990 CLP)</option>
                  <option value="2">2 Unidades ($71.980 CLP)</option>
                  <option value="3">3 Unidades ($107.970 CLP)</option>
                </select>
              </div>
            </div>

            {/* Total Summary */}
            <div className="p-4 rounded-2xl glass-panel border border-white/30 flex justify-between items-center mt-4">
              <span className="text-xs font-bold text-gray-300">TOTAL A PAGAR POR TRANSFERENCIA:</span>
              <span className="text-2xl font-mono-custom font-extrabold text-white">
                ${totalPrice.toLocaleString('es-CL')} CLP
              </span>
            </div>

            <div className="pt-2 space-y-2">
              <button
                type="submit"
                className="btn-shimmer w-full py-4 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-widest shadow-xl hover:bg-gray-200 transition-all"
              >
                Continuar a Datos de Transferencia
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 text-xs text-gray-400 hover:text-white transition-colors underline text-center block"
              >
                ← Volver a la página principal sin enviar
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: BANK TRANSFER DETAILS */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-[#121218] border border-white/30 space-y-3 text-left">
              <div className="flex justify-between items-center border-b border-white/15 pb-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">DATOS PARA TRANSFERENCIA BANCARIA</span>
                <span className="text-xs font-mono-custom text-emerald-400">CUENTA VERIFICADA</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono-custom">
                <div>
                  <span className="text-gray-400 block">BANCO:</span>
                  <span className="text-white font-bold text-sm">Banco Santander</span>
                </div>
                <div>
                  <span className="text-gray-400 block">TIPO DE CUENTA:</span>
                  <span className="text-white font-bold text-sm">Cuenta de Ahorro</span>
                </div>
                <div>
                  <span className="text-gray-400 block">TITULAR:</span>
                  <span className="text-white font-bold text-sm">Sebastian Orlando Vidal Munoz</span>
                </div>
                <div>
                  <span className="text-gray-400 block">RUT:</span>
                  <span className="text-white font-bold text-sm">21.381.872-4</span>
                </div>
                <div>
                  <span className="text-gray-400 block">N° DE CUENTA:</span>
                  <span className="text-white font-bold text-base">0 012 02 75232 9</span>
                </div>
                <div>
                  <span className="text-gray-400 block">CORREO REGISTRO:</span>
                  <span className="text-white font-bold text-sm">dreamersclubcl@gmail.com</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/15 flex justify-between items-center">
                <span className="text-xs text-gray-300 font-bold">MONTO EXACTO A TRANSFERIR:</span>
                <span className="text-2xl font-mono-custom font-extrabold text-white">${totalPrice.toLocaleString('es-CL')} CLP</span>
              </div>
            </div>

            {/* RESUMEN DE DIRECCIÓN Y AGENCIA */}
            <div className="p-4 rounded-xl bg-[#121218] border border-white/15 space-y-1.5 text-xs text-left font-mono-custom">
              <div className="flex justify-between items-center text-white font-bold">
                <span>📍 DATOS DE DESPACHO CONFIRMADOS</span>
                <span className="px-2 py-0.5 rounded bg-white/10 border border-white/30 text-[10px] text-white">
                  AGENCIA: {formData.agenciaEnvio}
                </span>
              </div>
              <div className="text-white font-semibold">
                {formData.nombre} {formData.apellido} • {formData.telefono}
              </div>
              <div className="text-gray-300 text-[11px]">
                {formData.direccion}, {formData.comuna}, {formData.region}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCopyBankData}
                className="flex-1 py-3.5 rounded-xl glass-panel border border-white/40 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:bg-white/10 transition-all"
              >
                <i data-lucide={copied ? "check" : "copy"} className="w-4 h-4 text-white"></i>
                {copied ? '¡Datos Copiados al Portapapeles!' : 'Copiar Datos Bancarios'}
              </button>

              <button
                onClick={() => setStep(3)}
                className="flex-1 btn-shimmer py-3.5 rounded-xl bg-white text-black font-extrabold text-xs uppercase tracking-wider shadow-lg hover:bg-gray-200"
              >
                Ya Realicé la Transferencia
              </button>
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs text-gray-400 hover:text-white underline block mx-auto"
            >
              ← Volver a editar datos de envío
            </button>
          </div>
        )}

        {/* STEP 3: RECEIPT SUBMISSION */}
        {step === 3 && (
          <div className="space-y-6 text-center">
            <div className="p-8 rounded-2xl glass-panel border border-emerald-500/30 space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <i data-lucide="check-circle" className="w-6 h-6"></i>
              </div>
              <h4 className="text-xl font-bold text-white">¡Reserva Registrada Exitosamente!</h4>
              <p className="text-xs text-gray-300 font-light max-w-md mx-auto leading-relaxed">
                Para validar inmediatamente tu pedido y enviar tu código de seguimiento, sube tu comprobante a continuación o envíalo directamente a nuestro WhatsApp oficial: <strong className="text-white font-mono-custom">+56957937798</strong>
              </p>
            </div>

            {/* Functional Receipt File Dropzone */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,.pdf"
              className="hidden"
            />

            {!receiptFile ? (
              <div
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`p-6 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center space-y-2 ${
                  isDragging
                    ? 'border-white bg-white/10 scale-105'
                    : 'border-white/30 hover:border-white bg-[#121218]'
                }`}
              >
                <i data-lucide="upload-cloud" className="w-8 h-8 mx-auto text-white"></i>
                <span className="text-xs font-bold text-white block">Arrastra aquí tu comprobante de pago</span>
                <span className="text-[10px] text-gray-400 block">o haz clic para seleccionar archivo desde tu dispositivo (JPG, PNG, PDF)</span>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/50 flex items-center justify-between text-left shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <i data-lucide="file-check" className="w-5 h-5"></i>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-white block truncate max-w-[200px] sm:max-w-xs">{receiptFile.name}</span>
                    <span className="text-[10px] text-emerald-400 font-mono-custom block">
                      {(receiptFile.size / 1024).toFixed(1)} KB • Adjuntado correctamente
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setReceiptFile(null)}
                  className="text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg border border-white/20 hover:bg-white/10 transition-colors"
                >
                  Cambiar
                </button>
              </div>
            )}

            <div className="pt-2 space-y-3">
              <a
                href={getWhatsAppURL()}
                target="_blank"
                rel="noreferrer"
                className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg transition-all"
              >
                <i data-lucide="message-circle" className="w-5 h-5"></i>
                Enviar Comprobante a WhatsApp (+56957937798)
              </a>

              <button
                onClick={onClose}
                className="w-full py-3 rounded-xl glass-panel text-gray-400 hover:text-white text-xs font-semibold"
              >
                Cerrar Ventana
              </button>
            </div>
          </div>
        )}
        </div>

      </div>
    </div>
  );
};

// --- FLOATING WHATSAPP BUTTON ---
const WhatsAppButton = () => {
  const defaultWhatsAppURL = "https://wa.me/56957937798?text=Hola%20Dreamers%20Club.%20Quiero%20hacer%20una%20consulta.";

  return (
    <a
      href={defaultWhatsAppURL}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-white text-black shadow-2xl hover:scale-110 transition-transform white-glow-hover flex items-center gap-2 group"
    >
      <i data-lucide="message-circle" className="w-6 h-6 text-black"></i>
      <span className="hidden group-hover:inline-block text-xs font-extrabold tracking-wider pr-1 text-black">
        SOPORTE WHATSAPP
      </span>
    </a>
  );
};

// --- BACKGROUND AUDIO PLAYER (YOUTUBE EMBED) ---
const BackgroundAudio = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const iframeRef = useRef(null);

  const toggleMusic = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    if (iframeRef.current && iframeRef.current.contentWindow) {
      const command = nextState ? 'playVideo' : 'pauseVideo';
      iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: command, args: '' }), '*');
    }
  };

  useEffect(() => {
    // Attempt auto play / unmute on user interaction if blocked
    const handleFirstInteraction = () => {
      if (iframeRef.current && iframeRef.current.contentWindow) {
        iframeRef.current.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: '' }), '*');
      }
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };

    window.addEventListener('click', handleFirstInteraction);
    window.addEventListener('keydown', handleFirstInteraction);

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('keydown', handleFirstInteraction);
    };
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Hidden YouTube Audio Iframe */}
      <iframe
        ref={iframeRef}
        className="hidden"
        width="0"
        height="0"
        src="https://www.youtube.com/embed/rCL8-CiGSmc?enablejsapi=1&autoplay=1&loop=1&playlist=rCL8-CiGSmc&controls=0"
        allow="autoplay"
      ></iframe>

      <button
        onClick={toggleMusic}
        className="px-4 py-2.5 rounded-full bg-black/90 backdrop-blur-md border border-white/30 text-white font-mono-custom text-xs flex items-center gap-2.5 shadow-2xl hover:scale-105 transition-all cursor-pointer group hover:border-white"
      >
        <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-white animate-pulse' : 'bg-gray-600'}`}></span>
        <i data-lucide={isPlaying ? "disc" : "pause"} className={`w-4 h-4 text-white ${isPlaying ? 'animate-spin' : ''}`}></i>
        <span className="font-bold tracking-wider">{isPlaying ? "REPRODUCIENDO MÚSICA" : "MÚSICA PAUSADA"}</span>
      </button>
    </div>
  );
};

// --- MAIN APP ENTRY COMPONENT ---
const App = () => {
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutItem, setCheckoutItem] = useState('DROP 001 ONLY DREAMERS');

  const handleOpenCheckout = (item) => {
    if (item) setCheckoutItem(item);
    setCheckoutOpen(true);
  };

  useEffect(() => {
    // Re-initialize Lucide Icons after DOM mounts
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }, [checkoutOpen]);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar onOpenCheckout={handleOpenCheckout} />
      <Hero onOpenCheckout={handleOpenCheckout} />
      <OfferSection onOpenCheckout={handleOpenCheckout} />
      <ProductViewer onOpenCheckout={handleOpenCheckout} />
      <MicroUIs />
      <Story />
      <FAQ />
      <FinalCTA onOpenCheckout={handleOpenCheckout} />
      <InstagramSection />
      <Footer />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        initialItem={checkoutItem}
      />
      <WhatsAppButton />
      <BackgroundAudio />
    </div>
  );
};

// Render Root
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
