import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import ProductFieldsSection from "../components/ProductFieldsSection";
import ScrollCue from "../components/ScrollCue";
import CoreIcon from "../components/icons/CoreIcon";
import SummaryIcon from "../components/icons/SummaryIcon";
import machinesImage from "../../resources/machines.JPG";
import operationImage from "../../resources/assembly.png";
import digitalImage from "../../resources/digital.jpg";
import productsImage from "../../resources/products.png";
import emailImg from "../../resources/email.png";
import profileImg from "../../resources/profile.png";
import { useLanguage } from "../context/LanguageContext";
import { usePageMetadata } from "../hooks/usePageMetadata";

const Home = () => {
  const { content } = useLanguage();
  usePageMetadata(content.meta.home, content.code);
  const [isBooting, setIsBooting] = useState(true);
  const [showScrollCue, setShowScrollCue] = useState(false);
  const [scrollCueTone, setScrollCueTone] = useState("hero");
  const heroRef = useRef(null);
  const ctaRef = useRef(null);
  const nextSectionRef = useRef(null);

  useEffect(() => {
    const cards = Array.from(document.querySelectorAll(".home-page .motion-card"));
    if (cards.length === 0) {
      return undefined;
    }

    const unbindHandlers = [];

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    cards.forEach((card, index) => {
      const noReveal = card.classList.contains("motion-card-no-reveal");
      card.classList.remove("is-visible");
      if (noReveal) {
        card.classList.remove("motion-ready");
        card.classList.add("is-visible");
      } else {
        card.classList.add("motion-ready");
      }
      card.style.setProperty("--reveal-delay", `${(index * 0.12).toFixed(2)}s`);
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--shadow-x", "0px");
      card.style.setProperty("--shadow-y", "0px");
      if (!noReveal) {
        revealObserver.observe(card);
      }

      const handleMove = (event) => {
        const rect = card.getBoundingClientRect();
        const xRatio = (event.clientX - rect.left) / rect.width - 0.5;
        const yRatio = (event.clientY - rect.top) / rect.height - 0.5;
        const rotateX = -yRatio * 8;
        const rotateY = xRatio * 8;
        const shadowX = xRatio * 28;
        const shadowY = yRatio * 28;
        card.style.setProperty("--tilt-x", `${rotateX.toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${rotateY.toFixed(2)}deg`);
        card.style.setProperty("--shadow-x", `${shadowX.toFixed(2)}px`);
        card.style.setProperty("--shadow-y", `${shadowY.toFixed(2)}px`);
      };

      const handleLeave = () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
        card.style.setProperty("--shadow-x", "0px");
        card.style.setProperty("--shadow-y", "0px");
      };

      card.addEventListener("mousemove", handleMove);
      card.addEventListener("mouseleave", handleLeave);
      unbindHandlers.push(() => {
        card.removeEventListener("mousemove", handleMove);
        card.removeEventListener("mouseleave", handleLeave);
      });
    });

    return () => {
      revealObserver.disconnect();
      unbindHandlers.forEach((unbind) => unbind());
      cards.forEach((card) => {
        card.classList.remove("motion-ready", "is-visible");
      });
    };
  }, [content.code]);

  useEffect(() => {
    const done = () => setIsBooting(false);
    const timer = window.setTimeout(done, 900);
    window.addEventListener("load", done, { once: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("load", done);
    };
  }, []);

  useEffect(() => {
    const heroElement = heroRef.current;
    const ctaElement = ctaRef.current;
    if (!heroElement || !ctaElement) {
      return undefined;
    }

    let heroVisible = false;
    let ctaVisible = false;

    const updateTone = () => {
      if (ctaVisible) {
        setScrollCueTone("cta");
        return;
      }
      if (heroVisible) {
        setScrollCueTone("hero");
        return;
      }
      setScrollCueTone("");
    };

    const heroObserver = new IntersectionObserver(
      (entries) => {
        heroVisible = entries[0]?.isIntersecting ?? false;
        updateTone();
      },
      { threshold: 0.2 }
    );

    const ctaObserver = new IntersectionObserver(
      (entries) => {
        ctaVisible = entries[0]?.isIntersecting ?? false;
        updateTone();
      },
      { threshold: 0.2 }
    );

    heroObserver.observe(heroElement);
    ctaObserver.observe(ctaElement);

    return () => {
      heroObserver.disconnect();
      ctaObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const updateCueVisibility = () => {
      const remaining = document.documentElement.scrollHeight - (window.scrollY + window.innerHeight);
      const hasMoreBelow = remaining > 120;
      setShowScrollCue(hasMoreBelow);
    };

    updateCueVisibility();
    window.addEventListener("scroll", updateCueVisibility, { passive: true });
    window.addEventListener("resize", updateCueVisibility);

    return () => {
      window.removeEventListener("scroll", updateCueVisibility);
      window.removeEventListener("resize", updateCueVisibility);
    };
  }, []);

  const factoryBackgrounds = {
    machines: machinesImage,
    operation: operationImage,
    digital: digitalImage,
  };

  const renderMultiline = (value) => {
    const lines = String(value ?? "").split("\n");
    if (lines.length <= 1) {
      return value;
    }
    return lines.map((line, index) => (
      <span key={`${index}-${line}`} className="multiline">
        {line}
        {index < lines.length - 1 ? <br /> : null}
      </span>
    ));
  };

  return (
    <div className="page home-page">
      <div ref={heroRef}>
        <HeroSection />
      </div>

      <section className="card-section" ref={nextSectionRef}>
        <div className="section-heading with-icon">
          <CoreIcon />
          <div>
            <h2>{renderMultiline(content.home.strengthsHeading)}</h2>
            {content.home.strengthsSubheading && <p>{renderMultiline(content.home.strengthsSubheading)}</p>}
          </div>
        </div>
        <div className="card-grid">
          {content.home.strengths.map((item) => (
            <article className="info-card motion-card" key={item.title}>
              {item.icon && (
                <span className="card-icon" aria-hidden="true">
                  {item.icon}
                </span>
              )}
              <div className="card-copy">
                <h3>{renderMultiline(item.title)}</h3>
                <p className="home-multiline">{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section
        className={`about-summary-home motion-card motion-card-no-tilt section-shell ${isBooting ? "is-booting" : ""}`}
        id="about-summary"
      >
        <div className="about-summary-copy">
          <h2>{content.home.aboutSummary.heading}</h2>
          <p className="home-multiline">{content.home.aboutSummary.lead}</p>
          <p className="home-multiline">{content.home.aboutSummary.details}</p>
          <Link className="secondary-btn" to="/about">
            {content.home.aboutSummary.cta}
          </Link>
        </div>
        <div className="about-summary-media" style={{ backgroundImage: `url(${productsImage})` }} aria-hidden="true" />
      </section>

      <section className={`card-section factory motion-card-no-reveal section-shell ${isBooting ? "is-booting" : ""}`}>
        <div className="section-heading with-icon">
          <SummaryIcon />
          <div>
            <h2>{content.home.factoryHeading}</h2>
            <p>{content.home.factorySubheading ?? content.common.vision}</p>
          </div>
        </div>
        <div className="card-grid three">
          {content.home.factoryHighlights.map((item) => {
            const bgImage = item.background ? factoryBackgrounds[item.background] : null;
            const cardClasses = ["highlight-card", "motion-card"];
            if (bgImage) {
              cardClasses.push("with-bg", `bg-${item.background}`);
            }
            const cardTitle = item.title ?? item.label;
            const cardBody = item.body ?? item.text;
            return (
              <article
                className={cardClasses.join(" ")}
                key={cardTitle}
                style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
              >
                <div className="card-copy">
                  <p className="label">{renderMultiline(cardTitle)}</p>
                  {item.highlight && <p className="highlight-line">{renderMultiline(item.highlight)}</p>}
                  <p className={`home-multiline ${item.highlight ? "desc" : ""}`}>{cardBody}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <ProductFieldsSection home={content.home} isBooting={isBooting} langCode={content.code} />

      <section
        ref={ctaRef}
        className={`cta-banner motion-card motion-card-no-tilt motion-card-no-reveal section-shell ${
          isBooting ? "is-booting" : ""
        }`}
      >
        <div>
          <h3>{renderMultiline(content.home.ctaBanner.title)}</h3>
          <p>{content.home.ctaBanner.text}</p>
        </div>
        <div className="cta-actions">
          <a className="primary-btn pill" href={`mailto:${content.common.email}`}>
            <img className="btn-avatar" src={emailImg} alt="" loading="lazy" />
            <span className="btn-label">{content.home.ctaBanner.primary}</span>
          </a>
          <a
            className="secondary-btn pill"
            href="https://wjmes.my.canvasite.cn/general"
            target="_blank"
            rel="noreferrer"
          >
            <img className="btn-avatar" src={profileImg} alt="" loading="lazy" />
            <span className="btn-label">{content.home.ctaBanner.secondary}</span>
          </a>
        </div>
      </section>

      <ScrollCue
        variant="C"
        visible={showScrollCue}
        tone={scrollCueTone}
        languageCode={content.code}
        ariaLabel={
          content.code === "ko"
            ? "다음 섹션으로 이동"
            : content.code === "zh"
              ? "滚动到下一部分"
              : "Scroll to next section"
        }
        onClick={() => {
          nextSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />
    </div>
  );
};

export default Home;
