import { useLanguage } from "../context/LanguageContext";
import { usePageMetadata } from "../hooks/usePageMetadata";

const Quality = () => {
  const { content } = useLanguage();
  usePageMetadata(content.meta.quality, content.code);
  const quality = content.quality;

  return (
    <div className="page quality-page">
      <section className="page-hero">
        <h1>{quality.heading}</h1>
        <p className="lead">{quality.intro}</p>
      </section>
      <div className="card-grid">
        {quality.sections.map((section) => (
          <article className="info-card" key={section.title}>
            <h2>{section.title}</h2>
            <ul>
              {section.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <section className="note">
        <p>{quality.highlight}</p>
      </section>
    </div>
  );
};

export default Quality;

