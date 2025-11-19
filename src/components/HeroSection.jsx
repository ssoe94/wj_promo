import heroImage from "../assets/main.jpg";
import { useLanguage } from "../context/LanguageContext";

const formatTextWithLineBreaks = (text) => {
  return text.split('\n').map((item, key) => (
    <span key={key}>
      {item}
      {key < text.split('\n').length - 1 && <br />}
    </span>
  ));
};

const HeroSection = () => {
  const { content } = useLanguage();
  const hero = content.hero;

  return (
    <section className="hero" style={{ backgroundImage: `url(${heroImage})` }}>
      <div className="hero-overlay" />
      <div className="hero-text-block">
        <p className="hero-eyebrow">{hero.eyebrow}</p>
        <p className="hero-company">{hero.companyLine}</p>
        <h1>{formatTextWithLineBreaks(hero.title)}</h1>
        <p className="hero-subhead">{hero.description}</p>

      </div>
    </section>
  );
};

export default HeroSection;

