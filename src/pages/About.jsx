import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { usePageMetadata } from "../hooks/usePageMetadata";
import factoryImage from "../../resources/mold.jpg";
import statementImage from "../../resources/about2.jpg";

const About = () => {
  const { content } = useLanguage();
  usePageMetadata(content.meta.about, content.code);

  const about = content.about;
  const heroBadges = Array.isArray(about.badges) ? about.badges : [];
  const profileHighlights = Array.isArray(about.profileHighlights) ? about.profileHighlights : [];
  const overviewCards = Array.isArray(about.overviewCards) ? about.overviewCards : [];
  const overviewFacts = Array.isArray(about.overviewFacts) ? about.overviewFacts : [];
  const valueItems = Array.isArray(about.values) ? about.values : [];
  const commitmentItems = Array.isArray(about.commitments) ? about.commitments : [];
  const historyItems = Array.isArray(about.history) ? about.history : [];
  const certifications = Array.isArray(about.certifications) ? about.certifications : [];
  const recognitions = Array.isArray(about.recognitions) ? about.recognitions : [];

  return (
    <div className="page about-page">
      <section className="page-hero about-hero">
        <div className="about-hero-grid">
          <div className="about-hero-card">
            <h1>{about.heading}</h1>
            <p className="lead">{about.intro}</p>
            {about.subText && <p className="about-hero-subtext">{about.subText}</p>}
            {heroBadges.length > 0 && (
              <div className="about-badges">
                {heroBadges.map((badge) => (
                  <span className="about-badge" key={badge}>
                    {badge}
                  </span>
                ))}
              </div>
            )}
            <div className="about-hero-actions">
              <a className="primary-btn" href="https://wjmes.my.canvasite.cn/general" target="_blank" rel="noreferrer">
                {about.ctaProfile}
              </a>
              <Link className="secondary-btn" to="/contact">
                {about.ctaContact}
              </Link>
            </div>
          </div>
          <div className="about-hero-media">
            <div className="about-hero-tile large" style={{ backgroundImage: `url(${factoryImage})` }} />
          </div>
        </div>
      </section>

      {overviewCards.length > 0 && (
        <section className="card-section about-overview">
          <div className="section-heading about-section-heading">
            <h2>{about.overviewTitle}</h2>
          </div>
          <div className="card-grid four about-overview-kpis">
            {overviewCards.map((item) => (
              <article className="info-card about-overview-card" key={`${item.value}-${item.label}`}>
                <p className="overview-value">{item.value}</p>
                <p className="overview-label">{item.label}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="philosophy-section">
        <div className="philosophy-header">
          {about.philosophyLabel && <span className="philosophy-label">{about.philosophyLabel}</span>}
          <h2>{about.philosophyTitle}</h2>
        </div>
        {Array.isArray(about.philosophyKeywords) && about.philosophyKeywords.length > 0 && (
          <p className="philosophy-keywords">{about.philosophyKeywords.join(" · ")}</p>
        )}
        {about.philosophyDescription && <p className="philosophy-description">{about.philosophyDescription}</p>}
        {Array.isArray(about.philosophyPrinciples) && about.philosophyPrinciples.length > 0 && (
          <div className="philosophy-principles">
            {about.philosophyPrinciples.map((item) => (
              <article className="philosophy-principle" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        )}
      </section>

      {overviewFacts.length > 0 && (
        <section className="card-section about-overview">
          <article className="info-card about-overview-facts">
            <dl className="about-overview-facts-list">
              {overviewFacts.map((item) => (
                <div className="about-overview-fact-row" key={`${item.label}-${item.value}`}>
                  <dt>{item.label}</dt>
                  <dd>{item.value}</dd>
                </div>
              ))}
            </dl>
          </article>
        </section>
      )}

      {profileHighlights.length > 0 && (
        <section className="card-section about-factory-statement">
          <div className="section-heading about-section-heading">
            <h2>{about.profileTitle}</h2>
          </div>
          <div className="about-factory-grid">
            <div className="about-factory-media" style={{ backgroundImage: `url(${statementImage})` }} aria-hidden="true" />
            <div className="about-factory-copy">
              {profileHighlights.map((item) => (
                <article className="about-factory-point" key={item.label}>
                  <h3>{item.label}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {historyItems.length > 0 && (
        <section className="about-timeline">
          <div className="section-heading about-section-heading">
            <h2>{about.historyTitle}</h2>
          </div>
          <div className="timeline-flow">
            {historyItems.map((item) => (
              <article className="timeline-node" key={item.year}>
                <div className="timeline-dot" aria-hidden="true"></div>
                <div className="timeline-card">
                  <span className="timeline-year">{item.year}</span>
                  {Array.isArray(item.points) ? (
                    <ul>
                      {item.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{item.text}</p>
                  )}
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {(certifications.length > 0 || recognitions.length > 0) && (
        <section className="card-section about-awards">
          <div className="section-heading">
            <h2>{about.awardsTitle}</h2>
          </div>
          <div className="card-grid">
            {certifications.length > 0 && (
              <article className="info-card">
                <h3>{about.certificationsTitle}</h3>
                <ul className="certification-list">
                  {certifications.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            )}
            {recognitions.length > 0 && (
              <article className="info-card">
                <h3>{about.recognitionsTitle}</h3>
                <ul>
                  {recognitions.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

export default About;
