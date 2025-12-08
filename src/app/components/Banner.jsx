'use client';
import { AnimatePresence, motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const slides = [
  {
    src: '/sazin.mp4',
    alt: 'Modern construction project banner 1',
    title: 'We Build Great Solutions',
    subtitle: 'Welcome to Our Company',
    desc: 'Providing top-notch services and products that help your business grow',
    buttonText: 'Get Started',
    buttonColor: 'bg-red-600 text-white hover:bg-white hover:text-red-600',
    path:'/contact'
  },
  {
    src: '/Agrooo.png',
    alt: 'Agro and Fisheries project banner 2',
    title: 'Sazin Agro & Fisheries',
    subtitle: 'Sazin Agro & Fisheries',
    desc: 'Sustainable Farming & Responsible Fisheries.',
    buttonText: 'Explore Agro',
    buttonColor: 'bg-green-600 hover:bg-white hover:text-green-600',
    path:'/Product-Base-Services/Agro&Fisheries'
  },
  {
    src: '/helmetbanner.jpg',
    alt: 'Helmets solutions banner 3',
    title: 'Welcome to Our Safety World',
    subtitle: 'Sky Helmet & Safety Accessories',
    desc: 'Providing premium helmets and safety equipment for every need.',
    buttonText: 'Shop Now',
    buttonColor: 'bg-red-600 text-white hover:bg-white hover:text-red-600',
    path:'/Product-Base-Services/Revvo&Safety'
  },
];

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  exit: { opacity: 0, y: -40, transition: { duration: 0.5 } },
};

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const { theme } = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallax = (distance) => scrollY * distance;

  useEffect(() => {
    const wait=current===0?11000:5000;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, wait);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('next-section');
    if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) {
      setCurrent((prev) => (prev + 1) % slides.length);
    } else if (info.offset.x > 50) {
      setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
    }
  };

  const currentSlide = slides[current];

  return (
    <section
      className="relative -mt-25 w-full min-h-[70vh] md:min-h-[80vh] lg:min-h-[100vh] overflow-hidden"
      aria-label="Hero banner with company introduction and call to action"
    >
      <AnimatePresence>
        {slides.map((slide, index) =>
          index === current ? (
            <motion.div
              key={slide.src}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.5 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            >
              {slide.src.endsWith('.mp4') ? (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src={slide.src} type="video/mp4" />
                </video>
              ) : (
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={true}
                  className="object-cover"
                />
              )}
            </motion.div>
          ) : null
        )}
      </AnimatePresence>

      {/* Overlay */}
      <div
        className={`absolute inset-0 ${
          theme === 'dark' ? 'bg-black/50' : 'bg-black/40'
        }`}
      />

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide.title}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={textVariants}
            className="flex flex-col items-center"
          >
            <motion.h2
              className="text-white text-sm md:text-lg lg:text-2xl mb-2 font-medium"
              style={{ y: parallax(0.3) }}
            >
              {currentSlide.subtitle}
            </motion.h2>

            <motion.h1
              className="text-white text-xl sm:text-3xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
              style={{ y: parallax(0.5) }}
            >
              {currentSlide.title}
            </motion.h1>

            <motion.p
              className="text-white text-xs sm:text-sm md:text-lg lg:text-xl max-w-md md:max-w-xl mb-6"
              style={{ y: parallax(0.7) }}
            >
              {currentSlide.desc}
            </motion.p>

            <motion.button
              className={`${currentSlide.buttonColor} cursor-pointer z-[60] font-semibold px-4 py-2 sm:px-6 sm:py-2 rounded-md shadow-lg text-sm sm:text-base md:text-xl transition transform`}
              style={{ y: parallax(0.9) }}
              onClick={() => router.push(currentSlide.path)}
              aria-label="Contact us to get started"
            >
              {currentSlide.buttonText}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`cursor-pointer w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all ${
              current === index
                ? 'bg-red-600 scale-125'
                : 'bg-white/50 hover:bg-white'
            }`}
          />
        ))}
      </div>

      {/* Scroll Down */}
      <motion.button
        onClick={scrollToNext}
        aria-label="Scroll to next section"
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-lg sm:text-2xl animate-bounce"
        whileHover={{ scale: 1.2 }}
      >
        <FaChevronDown />
      </motion.button>
    </section>
  );
};

export default Banner;