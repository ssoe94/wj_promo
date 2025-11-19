import { useLanguage } from "../context/LanguageContext";
import { usePageMetadata } from "../hooks/usePageMetadata";

const Manufacturing = () => {
  const { content } = useLanguage();
  usePageMetadata(content.meta.manufacturing, content.code);
  const manufacturing = content.manufacturing;

  return (
    <div className="page manufacturing-page">
      <section className="page-hero">
        <h1>{manufacturing.heading}</h1>
        <p className="lead">{manufacturing.intro}</p>
      </section>
      <div className="card-grid">
        {manufacturing.pillars.map((pillar) => (
          <article className="info-card" key={pillar.title}>
            <h2>{pillar.title}</h2>
            <ul>
              {pillar.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <section className="note">
        <p>{manufacturing.closing}</p>
      </section>
    </div>
  );
};

export default Manufacturing;

