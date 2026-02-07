import { useEffect, useRef } from "react";
import heroImage from "../assets/main.jpg";
import { useLanguage } from "../context/LanguageContext";
import { heroCopy } from "../data/heroCopy";

const HeroSection = () => {
  const { content } = useLanguage();
  const copy = heroCopy[content.code] ?? heroCopy.ko;
  const heroRef = useRef(null);

  const renderTitle = () => {
    const lines = copy.titleLines ?? [copy.title ?? ""];
    return lines.map((line, index) => (
      <span className="hero-title-line" key={`${line}-${index}`}>
        {line}
        {index !== lines.length - 1 && <br />}
      </span>
    ));
  };

  const renderDescription = () => {
    const lines = Array.isArray(copy.description) ? copy.description : [copy.description ?? ""];
    return lines.map((line, index) => (
      <span key={`${line}-${index}`}>
        {line}
        {index !== lines.length - 1 && <br />}
      </span>
    ));
  };

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) {
      return undefined;
    }

    const setParallax = (xValue, yValue) => {
      hero.style.setProperty("--parallax-x", `${xValue.toFixed(2)}px`);
      hero.style.setProperty("--parallax-y", `${yValue.toFixed(2)}px`);
    };

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let parallaxRafId = 0;
    let scrollRafId = 0;

    const handleMouseMove = (event) => {
      const rect = hero.getBoundingClientRect();
      const xRatio = (event.clientX - rect.left) / rect.width - 0.5;
      const yRatio = (event.clientY - rect.top) / rect.height - 0.5;
      targetX = xRatio * 30;
      targetY = yRatio * 30;
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setParallax(currentX, currentY);
      parallaxRafId = window.requestAnimationFrame(updateParallax);
    };

    const updateScroll = () => {
      const rect = hero.getBoundingClientRect();
      const viewport = window.innerHeight || 1;
      const progress = Math.max(-1, Math.min(1, (viewport / 2 - rect.top) / viewport));
      hero.style.setProperty("--scroll-shift", `${(progress * 6).toFixed(2)}px`);
    };

    const handleScroll = () => {
      if (scrollRafId) {
        return;
      }
      scrollRafId = window.requestAnimationFrame(() => {
        updateScroll();
        scrollRafId = 0;
      });
    };

    updateParallax();
    updateScroll();
    hero.addEventListener("mousemove", handleMouseMove);
    hero.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (parallaxRafId) {
        window.cancelAnimationFrame(parallaxRafId);
      }
      if (scrollRafId) {
        window.cancelAnimationFrame(scrollRafId);
      }
      hero.removeEventListener("mousemove", handleMouseMove);
      hero.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="hero" ref={heroRef} style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay" />
      <div className="hero-text-block">
        <p className="hero-eyebrow">{copy.eyebrow}</p>
        <p className="hero-company">{copy.companyLine}</p>
        <h1>{renderTitle()}</h1>
        <p className="hero-subhead">{renderDescription()}</p>
        {(copy.identityLine1 || copy.identityLine2) && (
          <div className="hero-identity">
            {copy.identityLine1 && <span>{copy.identityLine1}</span>}
            {copy.identityLine2 && <span>{copy.identityLine2}</span>}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
