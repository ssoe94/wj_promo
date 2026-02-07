import { useEffect } from "react";
import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import CoreIcon from "../components/icons/CoreIcon";
import SummaryIcon from "../components/icons/SummaryIcon";
import machinesImage from "../../resources/machines.JPG";
import operationImage from "../../resources/operation.JPG";
import digitalImage from "../../resources/digital.jpg";
import productsImage from "../../resources/products.png";
import emailImg from "../../resources/email.png";
import profileImg from "../../resources/profile.png";
import { useLanguage } from "../context/LanguageContext";
import { usePageMetadata } from "../hooks/usePageMetadata";

const Home = () => {
  const { content } = useLanguage();
  usePageMetadata(content.meta.home, content.code);

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
      card.classList.add("motion-ready");
      card.classList.remove("is-visible");
      card.style.setProperty("--reveal-delay", `${(index * 0.12).toFixed(2)}s`);
      card.style.setProperty("--tilt-x", "0deg");
      card.style.setProperty("--tilt-y", "0deg");
      card.style.setProperty("--shadow-x", "0px");
      card.style.setProperty("--shadow-y", "0px");
      revealObserver.observe(card);

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
      <HeroSection />

      <section className="card-section">
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

      <section className="about-summary-home motion-card" id="about-summary">
        <div className="about-summary-copy">
          <h2>{content.home.aboutSummary.heading}</h2>
          <p>{content.home.aboutSummary.lead}</p>
          <p>{content.home.aboutSummary.details}</p>
          <Link className="secondary-btn" to="/about">
            {content.home.aboutSummary.cta}
          </Link>
        </div>
        <div className="about-summary-media" style={{ backgroundImage: `url(${productsImage})` }} aria-hidden="true" />
      </section>

      <section className="card-section factory">
        <div className="section-heading with-icon">
          <SummaryIcon />
          <div>
            <h2>{content.home.factoryHeading}</h2>
            <p>{content.common.vision}</p>
          </div>
        </div>
        <div className="card-grid three">
          {content.home.factoryHighlights.map((item) => {
            const bgImage = item.background ? factoryBackgrounds[item.background] : null;
            const cardClasses = ["highlight-card", "motion-card"];
            if (bgImage) {
              cardClasses.push("with-bg", `bg-${item.background}`);
            }
            return (
              <article
                className={cardClasses.join(" ")}
                key={item.label}
                style={bgImage ? { backgroundImage: `url(${bgImage})` } : undefined}
              >
                <div className="card-copy">
                  <p className="label">{renderMultiline(item.label)}</p>
                  <p className="home-multiline">{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="customers motion-card">
        <h2>{content.home.customersHeading}</h2>
        <div className="customer-row">
          {content.home.customers.map((customer) => (
            <span key={customer}>{customer}</span>
          ))}
        </div>
      </section>

      <section className="cta-banner motion-card">
        <div>
          <h3>{content.home.ctaBanner.title}</h3>
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
    </div>
  );
};

export default Home;
