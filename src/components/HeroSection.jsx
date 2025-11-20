import heroImage from "../assets/main.jpg";
import { useLanguage } from "../context/LanguageContext";
import { heroCopy } from "../data/heroCopy";

const HeroSection = () => {
  const { content } = useLanguage();
  const copy = heroCopy[content.code] ?? heroCopy.ko;

  const renderTitle = () => {
    const lines = copy.titleLines ?? [copy.title ?? ""];
    return lines.map((line, index) => (
      <span key={`${line}-${index}`}>
        {line}
        {index !== lines.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay" />
      <div className="hero-text-block">
        <p className="hero-eyebrow">{copy.eyebrow}</p>
        <p className="hero-company">{copy.companyLine}</p>
        <h1>{renderTitle()}</h1>
        <p className="hero-subhead">{copy.description}</p>
        <div className="hero-identity">
          <span>{copy.identityLine1}</span>
          <span>{copy.identityLine2}</span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
