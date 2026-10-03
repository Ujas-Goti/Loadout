import { formatMoney } from '../js/utils.js'

export default function CartItem({ item, canIncrease, onIncrease, onDecrease, onRemove }) {
  const lineTotal = item.unitPrice * item.quantity

  return (
    <article className="cart-item">
      <img src={`/images/${item.image}`} alt="" className="cart-photo" />
      <div>
        <h2 className="h6 mb-1">{item.name}</h2>
        <p className="mb-1 small">Product ID: {item.productId}</p>
        <p className="mb-1 small">Color: {item.color}</p>
        <p className="mb-1 small">Size: {item.size}</p>
        <p className="mb-0 small">Unit price: {formatMoney(item.unitPrice)}</p>
      </div>
      <div className="qty-controls">
        <button
          type="button"
          className="qty-button"
          onClick={() => onDecrease(item)}
          disabled={item.quantity <= 1}
          aria-label={`Decrease quantity of ${item.name}`}
        >
          −
        </button>
        <span className="qty-value">{item.quantity}</span>
        <button
          type="button"
          className="qty-button"
          onClick={() => onIncrease(item)}
          disabled={!canIncrease}
          aria-label={`Increase quantity of ${item.name}`}
        >
          +
        </button>
      </div>
      <div className="cart-line">
        <p className="mb-2">{formatMoney(lineTotal)}</p>
        <button type="button" className="remove-button" onClick={() => onRemove(item)}>
          Remove
        </button>
      </div>
    </article>
  )
}
