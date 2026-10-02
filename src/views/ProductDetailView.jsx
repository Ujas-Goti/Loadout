import ProductCard from '../components/ProductCard.jsx'

export default function ProductDetailView({ product, onAddToCart }) {
  if (!product) {
    return (
      <section className="container py-4">
        <a href="#/shop" className="back-link">&larr; Back to shop</a>
        <h1>Product not found</h1>
      </section>
    )
  }

  return (
    <section className="container py-4">
      <ProductCard layout="detail" product={product} onAddToCart={onAddToCart} />
    </section>
  )
}
