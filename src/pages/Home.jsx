import { Link } from "react-router-dom";
import HeroSection from "../components/HeroSection";
import { useLanguage } from "../context/LanguageContext";
import { usePageMetadata } from "../hooks/usePageMetadata";

const Home = () => {
  const { content } = useLanguage();
  usePageMetadata(content.meta.home, content.code);

  return (
    <div className="page home-page">
      <HeroSection />

      <section className="card-section">
        <h2>{content.home.strengthsHeading}</h2>
        <div className="card-grid">
          {content.home.strengths.map((item) => (
            <article className="info-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card-section factory">
        <div className="section-heading">
          <h2>{content.home.factoryHeading}</h2>
          <p>{content.common.vision}</p>
        </div>
        <div className="card-grid three">
          {content.home.factoryHighlights.map((item) => (
            <article className="highlight-card" key={item.label}>
              <p className="label">{item.label}</p>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="customers">
        <h2>{content.home.customersHeading}</h2>
        <div className="customer-row">
          {content.home.customers.map((customer) => (
            <span key={customer}>{customer}</span>
          ))}
        </div>
      </section>

      <section className="cta-banner">
        <div>
          <h3>{content.home.ctaBanner.title}</h3>
          <p>{content.home.ctaBanner.text}</p>
        </div>
        <div className="cta-actions">
          <Link className="primary-btn" to="/contact">
            {content.home.ctaBanner.primary}
          </Link>
          <a className="secondary-btn" href={`mailto:${content.common.email}`}>
            {content.home.ctaBanner.secondary}
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;

