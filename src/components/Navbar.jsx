"use client";
import Logo from "@/Logo";
import Theme from "@/utils/Theme";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaArrowUp, FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Navbar() {
  const [dropdown, setDropdown] = useState({
    about: false,
    business: false,
  });
  const [sazinDropdown, setSazinDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState({
    about: false,
    business: false,
    more: false,
  });
  const [isScrolled, setIsScrolled] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const pathname = usePathname();

  const aboutRef = useRef(null);
  const businessRef = useRef(null);
  const sazin=useRef(null)

  const menuData = {
    about: [
      {
        name: "Detailed Company History",
        href: "/about/history",
        prefetch: true,
      },
      { name: "Mission & Vision", href: "/about/mission", prefetch: true },
      {
        name: "Leadership Profiles",
        href: "/about/leadership",
        prefetch: false,
      },
      {
        name: "Overview of Business Sectors",
        href: "/about/sectors",
        prefetch: false,
      },
    ],
    sazin_dropdown: [
      {
        name: "Electro-Mechanical Construction",
        href: "/Services/Electro-mechanical",
        prefetch: true,
      },
      {
        name: "Civil Construction",
        href: "/Services/Civil-construction",
        prefetch: true,
      },
      {
        name: "Engineering Procurement & Construction",
        href: "/Services/engineering-procurement-construction",
        prefetch: false,
      },
      {
        name: "Safety & Security Construction and Management",
        href: "/Services/safety-security-construction-management",
        prefetch: false,
      },
      {
        name: "Populer Project",
        href: "/Product-Base-Services/Successful-Project",
        prefetch: false,
      },
    ],
    business: [
      {
        name: "Sazin Agro & Fisheries",
        href: "/Product-Base-Services/Agro&Fisheries",
        prefetch: false,
      },
      {
        name: "Revvo Helmet & Safety Accessories",
        href: "/Product-Base-Services/Sky-Helmet&Safety-Accessories",
        prefetch: false,
      },
    ],
    more: [
      // { name: 'Projects', href: '/Projects', prefetch: true },
      { name: "Gallery", href: "/project-gallery", prefetch: true },
      { name: "Contact", href: "/contact", prefetch: true },
      { name: "Career", href: "/career", prefetch: false },
      { name: "News/Blog", href: "/news-blog", prefetch: false },
      { name: "Sustainability", href: "/sustainability", prefetch: false },
    ],
  };

  // 🔹 Click outside & scroll logic
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (aboutRef.current?.contains(e.target)) {
        setDropdown({ about: !dropdown.about, business: false });
      } else if (businessRef.current?.contains(e.target)) {
        if(sazin.current?.contains(e.target))setDropdown({ business:true, about: false });
        else setDropdown({ business:!dropdown.business, about: false });
      } else {
        setDropdown({ about: false, business:false});
      }
    };
    document.addEventListener("pointerdown", handleClickOutside);

    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 20);
      setShowTopBtn(scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("pointerdown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dropdown]);

  // 🔹 Scroll to Top
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const [theme, setTheme] = useState([]);
  useEffect(() => {
    if (pathname.startsWith("/Product-Base-Services/Agro&Fisheries")) {
      setTheme([
        {
          underline: "bg-green-800",
          hover: "hover:text-[#6cb12c]",
          themeText: "text-[#6cb12c]",
        },
      ]);
    } else if (pathname.startsWith("/")) {
      setTheme([
        {
          underline: "bg-red-500",
          hover: "hover:text-red-600",
          themeText: "text-red-600",
        },
      ]);
    }
  }, [pathname]);

  // 🔹 Active Border
  const ActiveBorder = () => (
    <motion.span
      className={`absolute bottom-0 left-0 h-[1.8px]  ${theme[0]?.underline}`}
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    />
  );

  return (
    <>
      <motion.nav
        className={`bg-transparent  fixed w-full  top-0 z-[9999] transition-all duration-300 ${
          isScrolled ? "shadow-lg py-2 dark:text-white text-black" : "py-2 text-white"
        }`}
      >
        <div className="w-full max-w-[100rem] mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" prefetch className=" font-bold w-40 h-fit ">
            {/* Company<span className="text-red-600">Logo</span> */}
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden lg:flex space-x-6 items-center xl:text-xl">
            {/* Home */}
            <li className="relative">
              <Link
                href="/"
                prefetch={true}
                className={` relative transition-colors ${theme[0]?.hover}`}
              >
                Home
              </Link>
              {pathname === "/" && <ActiveBorder />}
            </li>

            {/* Dropdowns */}
            {["about", "business"].map((key) => (
              <li
                key={key}
                className="relative"
                ref={key === "about" ? aboutRef : businessRef}
              >
                <button
                  className={`relative cursor-pointer flex items-center gap-1   transition-colors ${theme[0]?.hover}`}
                >
                  {key === "about" ? "About Us" : "Business/Products"}{" "}
                  {dropdown[key] ? (
                    <FaChevronUp className="w-4 h-4" />
                  ) : (
                    <FaChevronDown className="w-4 h-4" />
                  )}
                  {menuData[key].some((item) =>
                    pathname.startsWith(item.href)
                  ) && <ActiveBorder />}
                </button>
                <AnimatePresence>
                  {dropdown[key] && (
                    <motion.ul
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 bg-white/90 dark:bg-gray-800 shadow-lg mt-2 w-72 rounded-md p-2 space-y-2 z-50"
                    >
                      {key === "business" && (
                        <ul
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className=" bg-transparent  w-full rounded-md  space-y-2 z-50"
                        >
                          <button
                            ref={sazin}
                            onClick={(e) => {
                            e.stopPropagation();
                            setSazinDropdown(!sazinDropdown);
                          }}
                            className={`relative w-full  cursor-pointer flex items-center justify-between gap-1 text-gray-700 dark:text-gray-200  transition-colors ${theme[0]?.hover}`}
                          >
                            Sazin Construction Ltd
                            {sazinDropdown ? (
                              <FaChevronUp className="w-4 h-4" />
                            ) : (
                              <FaChevronDown className="w-4 h-4" />
                            )}
                            {menuData?.sazin_dropdown.some((item) =>
                              pathname.startsWith(item.href)
                            ) && <ActiveBorder />}
                          </button>
                          {sazinDropdown &&
                            menuData?.sazin_dropdown.map((link, idx) => (
                              <li key={idx} className="relative pl-2">
                                <Link
                                  href={link.href}
                                  prefetch={link.prefetch}
                                  className={`block text-sm text-gray-800 dark:text-gray-200  relative transition-colors ${theme[0]?.hover}`}
                                >
                                  {link.name}
                                  {pathname.startsWith(link.href) && (
                                    <ActiveBorder />
                                  )}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      )}
                      {menuData[key].map((link, idx) => (
                        <li key={idx} className="relative">
                          <Link
                            href={link.href}
                            prefetch={link.prefetch}
                            className={`block text-gray-800 dark:text-gray-200  relative transition-colors ${theme[0]?.hover}`}
                          >
                            {link.name}
                            {pathname.startsWith(link.href) && <ActiveBorder />}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </li>
            ))}

            {/* Projects */}
            <li className="relative">
              <Link
                href="/Projects"
                prefetch={true}
                className={` relative transition-colors ${theme[0]?.hover}`}
              >
                Projects
              </Link>
              {pathname.startsWith("/Projects") && <ActiveBorder />}
            </li>

            {/* More */}
            <li className="relative group py-2">
              <button
                className={`relative flex items-center gap-1   transition-colors ${theme[0]?.hover}`}
              >
                More Details{" "}
                <span className="transition-transform duration-300 group-hover:rotate-180">
                  ↓
                </span>
                {menuData.more.some((item) =>
                  pathname.startsWith(item.href)
                ) && <ActiveBorder />}
              </button>
              <ul className="absolute hidden group-hover:block top-full right-0 bg-white/90 dark:bg-gray-800 shadow-lg w-40 rounded-xl p-2 space-y-1 z-50">
                {menuData.more.map((item, idx) => (
                  <li key={idx} className="relative">
                    <Link
                      href={item.href}
                      prefetch={item.prefetch}
                      className={`block text-gray-800 dark:text-gray-200  relative transition-colors ${theme[0]?.hover}`}
                    >
                      {item.name}
                      {pathname.startsWith(item.href) && <ActiveBorder />}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>

            {/* Theme Toggle */}
            <li>
              <Theme theme={theme} />
            </li>
          </ul>

          {/* Mobile Button */}
          <div className="lg:hidden flex items-center gap-2 ">
            <Theme theme={theme} />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className=""
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    mobileOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className="myDiv fixed lg:hidden top-20 left-0 h-[calc(100vh-80px)] dark:bg-black bg-white z-[9999] w-3/4 max-w-xs shadow-lg p-6 overflow-y-auto"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
            >
              <ul className="flex flex-col space-y-4">
                {/* Static Home */}
                <li className="relative">
                  <Link
                    href="/"
                    prefetch
                    className={`block text-gray-700 dark:text-gray-200  relative transition-colors ${theme[0]?.hover}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    Home
                    {pathname === "/" && <ActiveBorder />}
                  </Link>
                </li>

                {/* Mobile Dropdowns */}
                {["about", "business", "more"].map((key) => (
                  <li key={key} className="relative">
                    <button
                      onClick={() =>
                        setMobileDropdown({
                          ...mobileDropdown,
                          [key]: !mobileDropdown[key],
                        })
                      }
                      className={`flex justify-between w-full text-gray-700 dark:text-gray-200  relative transition-colors ${theme[0]?.hover}`}
                    >
                      {key === "about"
                        ? "About Us"
                        : key === "business"
                        ? "Business/Products"
                        : "More Details"}
                      {mobileDropdown[key] ? (
                        <FaChevronUp />
                      ) : (
                        <FaChevronDown />
                      )}
                      {menuData[key].some((item) =>
                        pathname.startsWith(item.href)
                      ) && <ActiveBorder />}
                    </button>

                    {mobileDropdown[key] && (
                      <ul className="pl-4 mt-2 space-y-2 relative">
                        {key === "business" && (
                        <ul
                          onClick={(e) => {
                            e.stopPropagation();
                            setSazinDropdown(!sazinDropdown);
                          }}
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className=" bg-transparent  w-full rounded-md  space-y-2 z-50"
                        >
                          <button
                            className={`relative w-full  cursor-pointer flex items-center justify-between gap-1 text-gray-700 dark:text-gray-200  transition-colors ${theme[0]?.hover}`}
                          >
                            Sazin Construction Ltd
                            {sazinDropdown ? (
                              <FaChevronUp className="w-4 h-4" />
                            ) : (
                              <FaChevronDown className="w-4 h-4" />
                            )}
                            {menuData?.sazin_dropdown.some((item) =>
                              pathname.startsWith(item.href)
                            ) && <ActiveBorder />}
                          </button>
                          {sazinDropdown &&
                            menuData?.sazin_dropdown.map((link, idx) => (
                              <li key={idx} className="relative pl-2">
                                <Link
                                  href={link.href}
                                  prefetch={link.prefetch}
                                  className={`block text-sm text-gray-800 dark:text-gray-200  relative transition-colors ${theme[0]?.hover}`}
                                >
                                  {link.name}
                                  {pathname.startsWith(link.href) && (
                                    <ActiveBorder />
                                  )}
                                </Link>
                              </li>
                            ))}
                        </ul>
                      )}
                        {menuData[key].map((link, idx2) => (
                          <li key={idx2} className="relative">
                            <Link
                              href={link.href}
                              prefetch={link.prefetch}
                              className={`block text-gray-700 dark:text-gray-200  relative transition-colors ${theme[0]?.hover}`}
                              onClick={() => setMobileOpen(false)}
                            >
                              {link.name}
                              {pathname.startsWith(link.href) && (
                                <ActiveBorder />
                              )}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}

                {/* Projects */}
                <li className="relative">
                  <Link
                    href="/Projects"
                    prefetch={true}
                    className={`block text-gray-700 dark:text-gray-200 relative transition-colors ${theme[0]?.hover}`}
                    onClick={() => setMobileOpen(false)}
                  >
                    Projects
                    {pathname.startsWith("/Projects") && <ActiveBorder />}
                  </Link>
                </li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Scroll to Top */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-5 right-5 p-3 rounded-full ${theme[0]?.underline} text-white shadow-lg ${theme[0]?.hover} transition-all z-[9999]`}
        >
          <FaArrowUp />
        </button>
      )}
    </>
  );
}
