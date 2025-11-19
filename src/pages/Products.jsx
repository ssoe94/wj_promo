import { useLanguage } from "../context/LanguageContext";
import { usePageMetadata } from "../hooks/usePageMetadata";

const Products = () => {
  const { content } = useLanguage();
  usePageMetadata(content.meta.products, content.code);
  const products = content.products;

  return (
    <div className="page products-page">
      <section className="page-hero">
        <h1>{products.heading}</h1>
        <p className="lead">{products.intro}</p>
      </section>
      <div className="card-grid product-grid">
        {products.categories.map((category) => (
          <article className="product-card" key={category.name}>
            <h2>{category.name}</h2>
            <p>{category.description}</p>
            <ul>
              {category.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
      <section className="note">
        <p>{products.note}</p>
      </section>
    </div>
  );
};

export default Products;

