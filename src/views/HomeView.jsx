import ProductCard from '../components/ProductCard.jsx'

export default function HomeView({ products }) {
  const featured = products.filter((product) => product.featuredProduct)
  const arrivals = products.filter((product) => product.newArrival)

  return (
    <div>
      <section className="hero">
        <div className="container py-5">
          <p className="hero-kicker">Gaming gear</p>
          <h1>Loadout</h1>
          <p className="hero-copy">
            Loadout is a small shop for PC play. We sell mice, keyboards, headsets,
            mousepads, and controllers. Photos, prices, sizes, and colors are on each
            product page.
          </p>
          <a href="#/shop" className="btn btn-accent">
            Shop
          </a>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="section-title">New arrivals</h2>
        <div className="row g-4">
          {arrivals.map((product) => (
            <div className="col-12 col-sm-6 col-lg-3" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-5">
        <h2 className="section-title">Featured</h2>
        <div className="row g-4">
          {featured.map((product) => (
            <div className="col-12 col-sm-6 col-lg-4" key={product.id}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
