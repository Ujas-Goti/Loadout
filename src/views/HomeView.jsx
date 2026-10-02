import ProductCard from '../components/ProductCard.jsx'

export default function HomeView({ products, onOpenProduct, onNavigate }) {
  const featured = products.filter((product) => product.featuredProduct)
  const arrivals = products.filter((product) => product.newArrival)

  return (
    <div>
      <section className="hero">
        <div className="container py-5">
          <p className="hero-kicker">Gaming gear</p>
          <h1>Loadout</h1>
          <p className="hero-copy">
            Mice, keyboards, headsets, mousepads, and controllers.
          </p>
          <button type="button" className="btn btn-accent" onClick={() => onNavigate('shop')}>
            Shop
          </button>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="section-title">New arrivals</h2>
        <div className="row g-4">
          {arrivals.map((product) => (
            <div className="col-12 col-sm-6 col-lg-3" key={product.id}>
              <ProductCard product={product} onOpenProduct={onOpenProduct} />
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-5">
        <h2 className="section-title">Featured</h2>
        <div className="row g-4">
          {featured.map((product) => (
            <div className="col-12 col-sm-6 col-lg-4" key={product.id}>
              <ProductCard product={product} onOpenProduct={onOpenProduct} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
