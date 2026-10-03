import Cart from '../components/Cart.jsx'
import { cartCount } from '../js/utils.js'

export default function CartView({ cartItems, products, onIncrease, onDecrease, onRemove }) {
  const count = cartCount(cartItems)

  return (
    <section className="container py-4">
      <a href="#/shop" className="back-link">&larr; Back to shop</a>
      <h1>Cart</h1>
      <p className="text-muted">{count} {count === 1 ? 'item' : 'items'}</p>
      <Cart
        cartItems={cartItems}
        products={products}
        onIncrease={onIncrease}
        onDecrease={onDecrease}
        onRemove={onRemove}
      />
    </section>
  )
}
