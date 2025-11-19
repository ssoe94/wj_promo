import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import logo from "../assets/wj_logo.png";

const Footer = () => {
  const { content } = useLanguage();
  const navOrder = ["home", "about", "products", "quality", "manufacturing", "contact"];
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div>
          <div className="footer-brand">
            <img
              className="brand-logo"
              src={logo}
              alt="Nanjing Wanjia Precesion Injection Co., Ltd. logo"
              width="48"
              height="48"
            />
            <div className="brand-text">
              <strong className="brand-top">{content.common.brandTop ?? "南京万佳精密注塑有限公司"}</strong>
              <span className="brand-bottom">{content.common.companyName}</span>
            </div>
          </div>
          <p className="footer-vision">{content.common.vision}</p>
        </div>
        <div className="footer-column">
          <p className="footer-heading">{content.footer.navHeading}</p>
          <div className="footer-links">
            {navOrder.map((item) => (
              <Link key={item} to={item === "home" ? "/" : `/${item}`}>
                {content.navigation[item]}
              </Link>
            ))}
          </div>
        </div>
        <div className="footer-column">
          <p className="footer-heading">{content.footer.contactHeading}</p>
          <ul className="footer-contact">
            <li>
              <strong>{content.contact.addressLabel}</strong>
              <span>{content.common.address}</span>
            </li>
            <li>
              <strong>{content.contact.phoneLabel}</strong>
              <span>{content.common.phone}</span>
            </li>
            <li>
              <strong>{content.contact.emailLabel}</strong>
              <span>{content.common.email}</span>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <p className="footer-heading">{content.footer.ctaHeading}</p>
          <p>{content.footer.ctaText}</p>
          <Link className="primary-btn" to="/contact">
            {content.navigation.contact}
          </Link>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {year} {content.common.legalName}. {content.footer.rights}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
