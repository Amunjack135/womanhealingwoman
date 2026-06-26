import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import womanhealingwomanLogo from '../assets/womanhealingwoman.png';

const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Detect scroll so we can deepen the navbar background */
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* Close mobile menu on route change */
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/events", label: "Events" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${scrolled
          ? "bg-[#FCECE3] shadow-md py-3"
          : "bg-[#FCECE3]/80 backdrop-blur-md py-4"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 group">
            <img
              src={womanhealingwomanLogo}
              className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
              alt="Woman Healing Woman Foundation"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-2">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`relative px-4 py-2 rounded-full text-base font-medium transition-all duration-200 flex flex-col items-center
                    ${isActive(to)
                      ? "text-[#652818]"
                      : "text-[#652818]/70 hover:text-[#652818] hover:bg-[#652818]/8"
                    }`}
                >
                  {label}
                  {/* Animated active dot indicator */}
                  <span
                    className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 rounded-full bg-[#652818] transition-all duration-300
                      ${isActive(to) ? "w-5 opacity-100" : "w-0 opacity-0"}`}
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Desktop donate */}
          <div className="hidden md:flex items-center gap-4">
            <style>{`.pp-PTTJPNZ28JUN8{text-align:center;border:none;border-radius:1.5rem;min-width:9rem;padding:0 1.5rem;height:2.5rem;font-weight:bold;background-color:#652818;color:#ffffff;font-family:"Helvetica Neue",Arial,sans-serif;font-size:0.95rem;cursor:pointer;transition:opacity 0.2s;} .pp-PTTJPNZ28JUN8:hover{opacity:0.88;}`}</style>
            <form action="https://www.paypal.com/ncp/payment/PTTJPNZ28JUN8" method="post" target="_blank">
              <input className="pp-PTTJPNZ28JUN8" type="submit" value="Donate" />
            </form>
          </div>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden relative w-9 h-9 flex items-center justify-center rounded-full hover:bg-[#652818]/10 transition"
            onClick={() => setIsOpen(prev => !prev)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span className={`block w-5 h-0.5 bg-[#652818] rounded-full transition-all duration-300 origin-center
                ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[#652818] rounded-full transition-all duration-300
                ${isOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-[#652818] rounded-full transition-all duration-300 origin-center
                ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
        ${isOpen ? "max-h-96" : "max-h-0"}`}>
        <div className="max-w-7xl mx-auto px-6 pt-2 pb-5 border-t border-[#652818]/10 mt-3">
          <ul className="flex flex-col gap-1">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link
                  to={to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200
                    ${isActive(to)
                      ? "bg-[#652818]/10 text-[#652818]"
                      : "text-[#652818]/70 hover:bg-[#652818]/5 hover:text-[#652818]"
                    }`}
                >
                  {/* Active pill on mobile */}
                  <span className={`w-1.5 h-1.5 rounded-full bg-[#652818] transition-all duration-200
                    ${isActive(to) ? "opacity-100" : "opacity-0"}`} />
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Donate in mobile menu */}
          <div className="mt-4 pt-4 border-t border-[#652818]/10">
            <form action="https://www.paypal.com/ncp/payment/PTTJPNZ28JUN8" method="post" target="_blank">
              <input
                className="pp-PTTJPNZ28JUN8 w-full"
                type="submit"
                value="Donate"
              />
            </form>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;