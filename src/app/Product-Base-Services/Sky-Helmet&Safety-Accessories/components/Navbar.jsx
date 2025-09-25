"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const option = [
  {
    name: "Revvo Helmet",
    link: "/Product-Base-Services/Sky-Helmet&Safety-Accessories/Sky-Helmet",
    submenu: [
      { name: "Full Face", link: "/Product-Base-Services/Sky-Helmet&Safety-Accessories/Sky-Helmet/Full-Face" },
      { name: "Modular Face", link: "/Product-Base-Services/Sky-Helmet&Safety-Accessories/Sky-Helmet/Modular-Face" },
      { name: "Open Face", link: "/Product-Base-Services/Sky-Helmet&Safety-Accessories/Sky-Helmet/Open-Face" },
      { name: "Half Face", link: "/Product-Base-Services/Sky-Helmet&Safety-Accessories/Sky-Helmet/Half-Face" },
    ],
  },
  {
    name: "Safety Accessories",
    link: "/Product-Base-Services/Sky-Helmet&Safety-Accessories/Safety-Accessories",
    submenu: [
      { name: "Safety Helmets (Hard Hats)", link: "/Product-Base-Services/Safety-Accessories/Helmets" },
      { name: "Safety Goggles / Face Shields", link: "/Product-Base-Services/Safety-Accessories/Goggles" },
      { name: "Ear Plugs / Ear Muffs", link: "/Product-Base-Services/Safety-Accessories/Hearing-Protection" },
      { name: "Safety Gloves", link: "/Product-Base-Services/Safety-Accessories/Gloves" },
      { name: "Safety Shoes / Gumboots", link: "/Product-Base-Services/Safety-Accessories/Shoes" },
      { name: "High-Visibility Safety Vests", link: "/Product-Base-Services/Safety-Accessories/Vests" },
      { name: "Respirators / Masks", link: "/Product-Base-Services/Safety-Accessories/Masks" },
      { name: "Coveralls / Suits", link: "/Product-Base-Services/Safety-Accessories/Coverall" },
      { name: "Fall Protection Harness", link: "/Product-Base-Services/Safety-Accessories/Harness" },
      { name: "Welding Helmets & Gloves", link: "/Product-Base-Services/Safety-Accessories/Welding" },
    ],
  },
];

function Navbar() {
  const [mobileMenu, setMobileMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [hoverIndex, setHoverIndex] = useState(null);
  const pathname=usePathname();
  const [product, setProduct] = useState({
    title: "",
  });

  useEffect(()=>{
    const currentPath=pathname.split('/').filter(Boolean)
    if(currentPath.length>2){
      setProduct({
        title: currentPath[2],
      })
    }else{
        setProduct({
          title: "",
        })
      }
  },[pathname])

  return (
    <nav className="bg-black dark:bg-white dark:text-black text-white h-auto px-4 py-2">
      <div className="max-w-7xl mx-auto flex md:justify-center justify-between items-center h-auto ">
                        {/* Breadcrumb */}
        {product?.title && <div className="flex items-center gap-2">
          <Link
            href="/Product-Base-Services/Sky-Helmet&Safety-Accessories"
            prefetch={false}
            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
          >
            {`<< Back`}
          </Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-300 dark:text-gray-800 max-w-[120px] truncate" title={product.title}>{product.title}</span>
         </div>}
        {/* Desktop Menu */}
        <ul className="hidden flex-1 h-full md:flex justify-center items-center gap-10 relative">
          {option.map((item, index) => (
            <li
              key={item.name}
              className="relative"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
            >
              <Link className="hover:text-gray-300" href={item.link} prefetch={false}>
                {item.name}
              </Link>

              {/* Animated Dropdown for Desktop */}
              <AnimatePresence>
                {hoverIndex === index && item.submenu && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="absolute left-0 mt-2 bg-white/90 dark:bg-black text-black dark:text-white shadow-lg rounded-md w-70 z-50"
                  >
                    {item.submenu.map((sub) => (
                      <li key={sub.name}>
                        <Link
                          href={sub.link}
                          prefetch={false}
                          className="block px-4 py-2 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover-text-white"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden  text-2xl"
          onClick={() => setMobileMenu(!mobileMenu)}
        >
          {mobileMenu ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.div
            initial={{ height: 0, opacity: 1 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="md:hidden mt-3 bg-white dark:bg-black text-black dark:text-white shadow-lg overflow-hidden rounded-md p-4"
          >
            {option.map((item, index) => (
              <div key={item.name} className="mb-2">
                <button
                  className="w-full flex justify-between items-center py-2 font-medium"
                  onClick={() =>
                    setOpenDropdown(openDropdown === index ? null : index)
                  }
                >
                  {item.name}
                  <span>{openDropdown === index ? "▲" : "▼"}</span>
                </button>

                {/* Animated Mobile Dropdown */}
                <AnimatePresence>
                  {openDropdown === index && item.submenu && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6 }}
                      className="pl-4 mt-1 space-y-1 overflow-hidden"
                    >
                      {item.submenu.map((sub) => (
                        <li key={sub.name}>
                          <Link
                            href={sub.link}
                            className="block px-2 py-1 hover:bg-gray-200 dark:hover:bg-gray-800 rounded"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;