import { useLanguage } from "../context/LanguageContext";

const Footer = () => {
  const { content } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-grid compact">
        <div className="footer-identity">
          <p className="brand-top">{content.common.brandTop ?? "南京万佳精密注塑有限公司"}</p>
          <p className="brand-bottom">{content.common.companyName}</p>
          <p className="footer-tagline">{content.footer.tagline}</p>
        </div>
        <div className="footer-contact-block">
          <p className="footer-heading">{content.footer.contactHeading}</p>
          <div className="footer-contact-row">
            <div className="contact-item">
              <span className="contact-label">{content.contact.addressLabel}</span>
              <p>{content.common.address}</p>
            </div>
            <div className="contact-item">
              <span className="contact-label">{content.contact.phoneLabel}</span>
              <p>
                {content.common.phone}
              </p>
            </div>
            <div className="contact-item">
              <span className="contact-label">{content.contact.faxLabel}</span>
              <p>{content.common.fax}</p>
            </div>
            <div className="contact-item">
              <span className="contact-label">{content.contact.emailLabel}</span>
              <p>{content.common.email}</p>
            </div>
          </div>
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
