import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import logo from "../assets/wj_logo.png";

const Header = () => {
  const { content } = useLanguage();
  const nav = content.navigation;
  const navOrder = ["home", "about", "products", "quality", "manufacturing", "contact"];
  const [isMenuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);


  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="brand">
          <Link to="/" className="brand-link" onClick={() => setMenuOpen(false)}>
            <img className="brand-logo" src={logo} alt="Nanjing Wanjia Precesion Injection Co., Ltd. logo" />
            <div className="brand-text">
              <strong className="brand-top brand-top-zh">
                南京万佳精密注塑有限公司
              </strong>
              <span className="brand-bottom">Nanjing Wanjia Precesion Injection Co., Ltd.</span>
            </div>
          </Link>
        </div>

        <nav className={`main-nav ${isMenuOpen ? "is-open" : ""}`}>
          {navOrder.map((key) => (
            <NavLink
              key={key}
              to={key === "home" ? "/" : `/${key}`}
              className="nav-link"
              onClick={() => setMenuOpen(false)}
            >
              {nav[key]}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <LanguageSwitcher />
          <button
            className={`mobile-menu-toggle ${isMenuOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span className="hamburger-icon"></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
