import { useEffect, useMemo, useState } from "react";

const ProductFieldsSection = ({ home, isBooting = false }) => {
  const productFields = home?.productFields;
  const tabs = productFields?.tabs ?? [];
  const fallbackCustomers = Array.isArray(home?.customers) ? home.customers : [];

  const defaultTabId = useMemo(() => {
    if (tabs.length === 0) {
      return "";
    }
    return tabs.some((item) => item.id === "display") ? "display" : tabs[0].id;
  }, [tabs]);

  const [activeTabId, setActiveTabId] = useState(defaultTabId);

  useEffect(() => {
    setActiveTabId(defaultTabId);
  }, [defaultTabId]);

  if (!productFields || tabs.length === 0) {
    return (
      <section className="customers motion-card">
        <h2>{home?.customersHeading}</h2>
        <div className="customer-row">
          {fallbackCustomers.map((customer) => (
            <span key={customer}>{customer}</span>
          ))}
        </div>
      </section>
    );
  }

  const activeTab = tabs.find((item) => item.id === activeTabId) ?? tabs[0];

  return (
    <section
      className={`product-fields motion-card motion-card-no-tilt motion-card-no-reveal section-shell ${isBooting ? "is-booting" : ""}`}
    >
      <div className="section-heading">
        <h2>{productFields.title}</h2>
        <p>{productFields.subtitle}</p>
      </div>

      <div className="product-fields-layout">
        <nav className="product-fields-tabs" aria-label={productFields.title}>
          {tabs.map((tab) => {
            const isActive = tab.id === activeTab.id;
            return (
              <button
                className={`product-tab ${isActive ? "active" : ""}`}
                key={tab.id}
                onClick={() => setActiveTabId(tab.id)}
                type="button"
                data-tab={tab.id}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className={`product-fields-panel tab-${activeTab.id}`} key={activeTab.id}>
          <header className="product-panel-head">
            <h3>{activeTab.label}</h3>
            <p className="clamp-2">{activeTab.description}</p>
          </header>

          <div className="product-panel-grid">
            {activeTab.cards.map((card) => (
              <article className="product-field-card" key={card.id}>
                <h4 className="clamp-1">{card.title}</h4>
                <p className="product-field-keyline clamp-1">{card.keyline}</p>
                <ul className="product-field-bullets">
                  <li className="clamp-2">{card.bullets[0]}</li>
                  <li className="clamp-2">{card.bullets[1]}</li>
                </ul>
              </article>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductFieldsSection;
