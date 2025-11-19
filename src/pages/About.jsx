import { useLanguage } from "../context/LanguageContext";
import { usePageMetadata } from "../hooks/usePageMetadata";

const About = () => {
  const { content } = useLanguage();
  usePageMetadata(content.meta.about, content.code);
  const about = content.about;

  return (
    <div className="page about-page">
      <section className="page-hero">
        <p className="eyebrow">{content.common.legalName}</p>
        <h1>{about.heading}</h1>
        <p className="lead">{about.intro}</p>
      </section>

      <section className="timeline">
        <h2>{about.historyTitle}</h2>
        <div className="timeline-grid">
          {about.history.map((item) => (
            <article key={item.year}>
              <span className="year">{item.year}</span>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mission-section">
        <div>
          <h2>{about.missionTitle}</h2>
          <p>{about.mission}</p>
        </div>
        <div>
          <ul className="values-list">
            {about.values.map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="card-section">
        <h2>{about.capacityTitle}</h2>
        <div className="card-grid">
          {about.capacityPoints.map((point) => (
            <article className="info-card" key={point}>
              <p>{point}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="card-section">
        <h2>{about.mesTitle}</h2>
        <div className="card-grid">
          {about.mesPoints.map((point) => (
            <article className="info-card" key={point}>
              <p>{point}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="global-section">
        <h2>{about.globalTitle}</h2>
        <p>{about.globalText}</p>
      </section>
    </div>
  );
};

export default About;

