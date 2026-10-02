import ProductCard from './ProductCard.jsx'

const PAGE_SIZE = 10

export default function ProductList({ products, page, onOpenProduct }) {
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  return (
    <div className="row g-4">
      {products.map((product, index) => {
        if (index < start || index >= end) {
          return null
        }

        return (
          <div className="col-12 col-sm-6 col-lg-4" key={product.id}>
            <ProductCard product={product} onOpenProduct={onOpenProduct} />
          </div>
        )
      })}
    </div>
  )
}

export { PAGE_SIZE }
