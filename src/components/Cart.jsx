import CartItem from './CartItem.jsx'
import { cartCount, cartItemKey, cartSubtotal, formatMoney, quantityInCart } from '../utils.js'

export default function Cart({ cartItems, products, onIncrease, onDecrease, onRemove }) {
  const count = cartCount(cartItems)
  const subtotal = cartSubtotal(cartItems)

  if (cartItems.length === 0) {
    return (
      <div className="empty-cart">
        <p>Your cart is empty.</p>
        <p>Items: 0</p>
        <p>Subtotal: {formatMoney(0)}</p>
        <a href="#/shop" className="btn btn-main">
          Browse the shop
        </a>
      </div>
    )
  }

  return (
    <div className="row g-4">
      <div className="col-lg-8">
        {cartItems.map((item) => {
          const product = products.find((entry) => entry.id === item.productId)
          const stock = product ? product.quantityInStock : item.quantity
          const canIncrease = quantityInCart(cartItems, item.productId) < stock
          return (
            <CartItem
              key={cartItemKey(item)}
              item={item}
              canIncrease={canIncrease}
              onIncrease={onIncrease}
              onDecrease={onDecrease}
              onRemove={onRemove}
            />
          )
        })}
      </div>
      <div className="col-lg-4">
        <aside className="summary-box">
          <h2 className="h5">Summary</h2>
          <p className="d-flex justify-content-between">
            <span>Items</span>
            <span>{count}</span>
          </p>
          <p className="d-flex justify-content-between summary-total">
            <span>Subtotal</span>
            <span>{formatMoney(subtotal)}</span>
          </p>
        </aside>
      </div>
    </div>
  )
}
