import { useLanguage } from "../context/LanguageContext";
import { usePageMetadata } from "../hooks/usePageMetadata";

const Contact = () => {
  const { content } = useLanguage();
  usePageMetadata(content.meta.contact, content.code);
  const contact = content.contact;

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="page contact-page">
      <section className="page-hero">
        <h1>{contact.heading}</h1>
        <p className="lead">{contact.description}</p>
      </section>
      <div className="contact-layout">
        <div className="contact-info">
          <div>
            <p className="label">{contact.addressLabel}</p>
        <p>{content.common.address}</p>
      </div>
      <div>
        <p className="label">{contact.phoneLabel}</p>
        <p>{content.common.phone}</p>
      </div>
      <div>
        <p className="label">{contact.faxLabel}</p>
        <p>{content.common.fax}</p>
      </div>
      <div>
        <p className="label">{contact.emailLabel}</p>
        <p>{content.common.email}</p>
      </div>
          <div>
            <p className="label">{contact.hoursLabel}</p>
            <p>{content.common.hours}</p>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <p className="form-heading">{contact.form.heading}</p>
          <p className="form-description">{contact.form.description}</p>
          <label>
            <span>{contact.form.name}</span>
            <input type="text" name="name" placeholder={contact.form.name} required />
          </label>
          <label>
            <span>{contact.form.email}</span>
            <input type="email" name="email" placeholder={contact.form.email} required />
          </label>
          <label>
            <span>{contact.form.company}</span>
            <input type="text" name="company" placeholder={contact.form.company} />
          </label>
          <label>
            <span>{contact.form.message}</span>
            <textarea name="message" rows="4" placeholder={contact.form.message} />
          </label>
          <button className="primary-btn" type="submit">
            {contact.form.submit}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
