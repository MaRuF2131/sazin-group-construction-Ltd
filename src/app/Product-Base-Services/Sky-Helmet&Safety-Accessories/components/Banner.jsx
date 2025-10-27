'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useTheme } from 'next-themes';
import { FaChevronDown } from 'react-icons/fa';

const images = [
  '/helmetbanner.jpg',
];

function useTypingEffect(text, speed = 100) {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
}

const Banner = () => {
  const [current, setCurrent] = useState(0);
  const { theme } = useTheme();
  const controls = useAnimation();

  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const parallax = (distance) => scrollY * distance;

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('next-section');
    if (nextSection) nextSection.scrollIntoView({ behavior: 'smooth' });
  };

  const h3Text = useTypingEffect('Welcome to Our Safety World', 80);
  const h1Text = useTypingEffect('Revvo Helmet & Safety Accessories', 50);
  const pText = useTypingEffect('Revvo First & Get Safety', 30);

  const handleDragEnd = (event, info) => {
    if (info.offset.x < -50) {
      setCurrent((prev) => (prev + 1) % images.length);
    } else if (info.offset.x > 50) {
      setCurrent((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  return (
    <section className="relative   w-full h-[70vh] md:h-[80vh] lg:h-[100vh] overflow-hidden">
      <AnimatePresence>
        {images.map((img, index) =>
          index === current ? (
            <motion.div
              key={img}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${img})` }}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 1.5 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
            />
          ) : null
        )}
      </AnimatePresence>

      {/* Overlay */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/50' : 'bg-black/40'}`}></div>

      {/* Text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 md:px-8 lg:px-16">
        <motion.h3
          className="text-white text-base md:text-2xl mb-2"
          style={{ y: parallax(0.3) }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {h3Text}
        </motion.h3>

        <motion.h1
          className="text-white text-2xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
          style={{ y: parallax(0.5) }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        >
          {h1Text}
        </motion.h1>

        <motion.p
          className="text-white text-sm md:text-lg max-w-xl mb-6"
          style={{ y: parallax(0.7) }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          {pText}
        </motion.p>

        <motion.a
          href="/contact"
          className="bg-red-600 z-[60] text-white font-semibold px-4 py-1.5 rounded-md shadow-lg hover:bg-gray-100 hover:text-red-600 hover:scale-105 transition transform"
          style={{ y: parallax(0.9) }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: 'easeOut' }}
        >
          Get Safety
        </motion.a>
      </div>

      {/* Slider Dots */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 flex space-x-2 z-50">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === index ? 'bg-red-600 scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Scroll Down */}
      <motion.button
        onClick={scrollToNext}
        className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-2xl animate-bounce"
        whileHover={{ scale: 1.2 }}
      >
        <FaChevronDown />
      </motion.button>
    </section>
  );
};

export default Banner;
