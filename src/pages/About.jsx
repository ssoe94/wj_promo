import { useLanguage } from "../context/LanguageContext";
import { usePageMetadata } from "../hooks/usePageMetadata";
import summaryImage from "../../resources/summary.jpg";
import machinesImage from "../../resources/machines.JPG";
import operationImage from "../../resources/operation.JPG";
import digitalImage from "../../resources/digital.jpg";

const About = () => {
  const { content } = useLanguage();
  usePageMetadata(content.meta.about, content.code);
  const about = content.about;
  const heroBadges = Array.isArray(about.badges) ? about.badges : [];
  const profileHighlights = Array.isArray(about.profileHighlights) ? about.profileHighlights : [];
  const equipmentList = Array.isArray(about.equipmentList) ? about.equipmentList : [];
  const systems = Array.isArray(about.systems) ? about.systems : [];
  const certifications = Array.isArray(about.certifications) ? about.certifications : [];
  const recognitions = Array.isArray(about.recognitions) ? about.recognitions : [];
  const sheePoints = Array.isArray(about.sheePoints) ? about.sheePoints : [];
  const historyItems = Array.isArray(about.history) ? about.history : [];
  const valueItems = Array.isArray(about.values) ? about.values : [];
  const capacityItems = Array.isArray(about.capacityPoints) ? about.capacityPoints : [];
  const mesItems = Array.isArray(about.mesPoints) ? about.mesPoints : [];

  const highlightBackgrounds = {
    machines: machinesImage,
    operation: operationImage,
    digital: digitalImage,
  };

  return (
    <div className="page about-page">
      <section className="page-hero about-hero">
        <div className="about-hero-grid">
          <div className="about-hero-card">
            <h1>{about.heading}</h1>
            <p className="lead">{about.intro}</p>
            {heroBadges.length > 0 && (
              <div className="about-badges">
                {heroBadges.map((badge) => (
                  <span className="about-badge" key={badge}>
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>
          <div className="about-hero-media">
            <div className="about-hero-tile large" style={{ backgroundImage: `url(${summaryImage})` }} />
            <div className="about-hero-tile" style={{ backgroundImage: `url(${machinesImage})` }} />
            <div className="about-hero-orb" aria-hidden="true" />
          </div>
        </div>
      </section>

      {profileHighlights.length > 0 && (
        <section className="card-section about-highlights">
          <div className="section-heading">
            <h2>{about.profileTitle}</h2>
            {about.profileIntro && <p>{about.profileIntro}</p>}
          </div>
          <div className="card-grid three">
            {profileHighlights.map((item) => {
              const bgImage = item.background ? highlightBackgrounds[item.background] : null;
              const cardClasses = ["highlight-card"];
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
                    <p className="label">{item.label}</p>
                    <p>{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {equipmentList.length > 0 && (
        <section className="card-section about-equipment">
          <div className="section-heading">
            <h2>{about.equipmentTitle}</h2>
            {about.equipmentIntro && <p>{about.equipmentIntro}</p>}
          </div>
          <div className="about-equipment-grid">
            <div className="about-equipment-image" style={{ backgroundImage: `url(${operationImage})` }} />
            <div className="about-equipment-content">
              <ul className="equipment-list">
                {equipmentList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              {systems.length > 0 && (
                <div className="equipment-systems">
                  {systems.map((system) => (
                    <span className="system-chip" key={system}>
                      {system}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <section className="timeline">
        <h2>{about.historyTitle}</h2>
        <div className="timeline-grid">
          {historyItems.map((item) => (
            <article key={item.year}>
              <span className="year">{item.year}</span>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mission-section mission-highlight">
        <div className="mission-card">
          <h2>{about.missionTitle}</h2>
          <p>{about.mission}</p>
        </div>
        <div className="mission-values">
          {valueItems.map((value) => (
            <article className="value-card" key={value}>
              <p>{value}</p>
            </article>
          ))}
        </div>
      </section>

      {capacityItems.length > 0 && (
        <section className="card-section">
          <h2>{about.capacityTitle}</h2>
          <div className="card-grid">
            {capacityItems.map((point) => (
              <article className="info-card" key={point}>
                <p>{point}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {mesItems.length > 0 && (
        <section className="card-section">
          <h2>{about.mesTitle}</h2>
          <div className="card-grid">
            {mesItems.map((point) => (
              <article className="info-card" key={point}>
                <p>{point}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      {(certifications.length > 0 || recognitions.length > 0) && (
        <section className="card-section about-awards">
          <div className="section-heading">
            <h2>{about.awardsTitle}</h2>
            {about.awardsIntro && <p>{about.awardsIntro}</p>}
          </div>
          <div className="card-grid">
            {certifications.length > 0 && (
              <article className="info-card">
                <h3>{about.certificationsTitle}</h3>
                <ul>
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

      {sheePoints.length > 0 && (
        <section className="card-section about-shee">
          <div className="section-heading">
            <h2>{about.sheeTitle}</h2>
            {about.sheeSummary && <p>{about.sheeSummary}</p>}
          </div>
          <div className="card-grid">
            {sheePoints.map((point) => (
              <article className="value-card" key={point}>
                <p>{point}</p>
              </article>
            ))}
          </div>
        </section>
      )}

      <section className="global-section">
        <h2>{about.globalTitle}</h2>
        <p>{about.globalText}</p>
      </section>
    </div>
  );
};

export default About;

