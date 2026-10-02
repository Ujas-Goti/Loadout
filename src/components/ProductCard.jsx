import { useState } from 'react'
import { COLOR_HEX, formatMoney, getUnitPrice, isOnSale, salePercent } from '../utils.js'

function Price({ product }) {
  if (isOnSale(product)) {
    return (
      <p className="price-row mb-2">
        <span className="price-sale">{formatMoney(product.salePrice)}</span>
        <span className="price-original">{formatMoney(product.price)}</span>
        <span className="sale-pill">{salePercent(product)}% off</span>
      </p>
    )
  }

  return <p className="price-row mb-2">{formatMoney(product.price)}</p>
}

function Badges({ product }) {
  return (
    <p className="badge-row">
      {product.newArrival && <span className="info-pill">New</span>}
      {isOnSale(product) && <span className="info-pill info-pill-sale">Sale</span>}
    </p>
  )
}

function ProductCardSummary({ product, onOpenProduct }) {
  return (
    <article className="card product-card h-100" onClick={() => onOpenProduct(product.id)}>
      <button type="button" className="photo-button" onClick={() => onOpenProduct(product.id)}>
        <img src={`/images/${product.image}`} alt={product.name} className="product-photo" />
      </button>
      <div className="card-body d-flex flex-column">
        <p className="category-label">{product.category}</p>
        <h2 className="h5 product-title">{product.name}</h2>
        <p className="brand-line">by {product.brand}</p>
        <p className="card-description">{product.description}</p>
        <Price product={product} />
        <Badges product={product} />
        <button type="button" className="btn btn-main mt-auto" onClick={() => onOpenProduct(product.id)}>
          View product
        </button>
      </div>
    </article>
  )
}

function ProductCardDetail({ product, onAddToCart }) {
  const [color, setColor] = useState('')
  const [size, setSize] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [formError, setFormError] = useState('')
  const [added, setAdded] = useState(false)

  const maxQuantity = Math.min(10, product.quantityInStock)
  const quantityOptions = []
  for (let count = 1; count <= maxQuantity; count += 1) {
    quantityOptions.push(count)
  }

  function handleSubmit(event) {
    event.preventDefault()

    if (!size) {
      setAdded(false)
      setFormError('Select a size before adding this item to the cart.')
      return
    }

    if (!color) {
      setAdded(false)
      setFormError('Select a color before adding this item to the cart.')
      return
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > product.quantityInStock) {
      setAdded(false)
      setFormError('Choose a quantity between 1 and the number in stock.')
      return
    }

    const error = onAddToCart({
      productId: product.id,
      name: product.name,
      image: product.image,
      size,
      color,
      quantity,
      unitPrice: getUnitPrice(product),
    })

    if (error) {
      setAdded(false)
      setFormError(error)
      return
    }

    setFormError('')
    setAdded(true)
  }

  return (
    <div>
      <a href="#/shop" className="back-link">&larr; Back to shop</a>

      <div className="row g-4">
        <div className="col-lg-5">
          <img src={`/images/${product.image}`} alt={product.name} className="detail-photo" />
        </div>
        <div className="col-lg-4">
          <p className="category-label">{product.category}</p>
          <h1 className="detail-title">{product.name}</h1>
          <p className="brand-line">by {product.brand}</p>
          <p className="rating-line">
            {product.rating} / 5 · {product.numberOfReviews} reviews
          </p>
          <Price product={product} />
          <p>{product.description}</p>
          <ul className="highlight-list">
            {product.highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
        <div className="col-lg-3">
          <form className="buy-box" onSubmit={handleSubmit} noValidate>
            <fieldset>
              <legend className="form-label">Color</legend>
              <div className="swatch-row">
                {product.colors.map((colorName) => (
                  <button
                    key={colorName}
                    type="button"
                    className={color === colorName ? 'swatch selected' : 'swatch'}
                    style={{ background: COLOR_HEX[colorName] || '#ccc' }}
                    aria-label={colorName}
                    aria-pressed={color === colorName}
                    onClick={() => {
                      setColor(colorName)
                      setFormError('')
                      setAdded(false)
                    }}
                  />
                ))}
              </div>
              <p className="small text-muted mb-3">{color ? color : 'Select a color'}</p>
            </fieldset>

            <label className="form-label" htmlFor="size">
              Size
            </label>
            <select
              id="size"
              className="form-select mb-3"
              value={size}
              onChange={(event) => {
                setSize(event.target.value)
                setFormError('')
                setAdded(false)
              }}
            >
              <option value="">Select size</option>
              {product.sizes.map((sizeName) => (
                <option key={sizeName} value={sizeName}>
                  {sizeName}
                </option>
              ))}
            </select>

            <label className="form-label" htmlFor="quantity">
              Quantity
            </label>
            <select
              id="quantity"
              className="form-select mb-3"
              value={quantity}
              onChange={(event) => {
                setQuantity(Number(event.target.value))
                setFormError('')
                setAdded(false)
              }}
            >
              {quantityOptions.map((count) => (
                <option key={count} value={count}>
                  {count}
                </option>
              ))}
            </select>

            {product.quantityInStock > 0 ? (
              <p className="stock-ok">In stock ({product.quantityInStock} available)</p>
            ) : (
              <p className="stock-out">Out of stock</p>
            )}

            {formError && <p className="form-error">{formError}</p>}

            {added ? (
              <div>
                <p className="form-success">Added to cart.</p>
                <a href="#/cart" className="btn btn-accent w-100">
                  View cart
                </a>
                <a href="#/shop" className="btn btn-main w-100 mt-2">
                  Back to shop
                </a>
              </div>
            ) : (
              <button type="submit" className="btn btn-accent w-100" disabled={product.quantityInStock < 1}>
                Add to cart
              </button>
            )}
            {product.freeShipping && <p className="small mt-3 mb-0">Free shipping on this item.</p>}
          </form>
        </div>
      </div>

      <section className="detail-specs">
        <h2 className="h4">Product details</h2>
        <p>{product.longDescription}</p>
        <dl className="row spec-list">
          <dt className="col-sm-3">Weight</dt>
          <dd className="col-sm-3">{product.weight}</dd>
          <dt className="col-sm-3">Fit</dt>
          <dd className="col-sm-3">{product.fit}</dd>
          <dt className="col-sm-3">Material</dt>
          <dd className="col-sm-3">{product.material}</dd>
          <dt className="col-sm-3">Connectivity</dt>
          <dd className="col-sm-3">{product.connectivity}</dd>
          <dt className="col-sm-3">Compatibility</dt>
          <dd className="col-sm-3">{product.compatibility}</dd>
          <dt className="col-sm-3">RGB</dt>
          <dd className="col-sm-3">{product.rgb ? 'Yes' : 'No'}</dd>
          <dt className="col-sm-3">SKU</dt>
          <dd className="col-sm-3">{product.sku}</dd>
          <dt className="col-sm-3">Currency</dt>
          <dd className="col-sm-3">{product.currency}</dd>
        </dl>
      </section>
    </div>
  )
}

export default function ProductCard({ product, layout = 'summary', onOpenProduct, onAddToCart }) {
  if (layout === 'detail') {
    return <ProductCardDetail product={product} onAddToCart={onAddToCart} />
  }

  return <ProductCardSummary product={product} onOpenProduct={onOpenProduct} />
}
