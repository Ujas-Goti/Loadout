import { useState } from 'react'
import ProductList, { PAGE_SIZE } from '../components/ProductList.jsx'

export default function ShopView({ products, onOpenProduct }) {
  const [page, setPage] = useState(1)
  const pageCount = Math.ceil(products.length / PAGE_SIZE)
  const start = (page - 1) * PAGE_SIZE
  const end = Math.min(start + PAGE_SIZE, products.length)
  const pageNumbers = []

  for (let number = 1; number <= pageCount; number += 1) {
    pageNumbers.push(number)
  }

  return (
    <section className="container py-4">
      <a href="#/" className="back-link">&larr; Home</a>
      <h1>Shop</h1>
      <p className="text-muted">
        Showing {start + 1}–{end} of {products.length}
      </p>
      <ProductList products={products} page={page} onOpenProduct={onOpenProduct} />
      <nav className="mt-4" aria-label="Product pages">
        <ul className="pagination justify-content-center">
          <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
            <button type="button" className="page-link" onClick={() => setPage(page - 1)} disabled={page === 1}>
              Previous
            </button>
          </li>
          {pageNumbers.map((number) => (
            <li key={number} className={`page-item ${number === page ? 'active' : ''}`}>
              <button type="button" className="page-link" onClick={() => setPage(number)}>
                {number}
              </button>
            </li>
          ))}
          <li className={`page-item ${page === pageCount ? 'disabled' : ''}`}>
            <button
              type="button"
              className="page-link"
              onClick={() => setPage(page + 1)}
              disabled={page === pageCount}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </section>
  )
}
