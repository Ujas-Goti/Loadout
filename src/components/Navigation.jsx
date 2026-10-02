import { cartCount } from '../utils.js'

export function Logo() {
  return (
    <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
      <path d="M16 3 L28 10 V22 L16 29 L4 22 V10 Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
      <path d="M11 16 L16 11 L21 16 L16 21 Z" fill="#2ef2dc" />
    </svg>
  )
}

export default function Navigation({ view, cartItems }) {
  const count = cartCount(cartItems)

  function linkClass(name) {
    const shopActive = name === 'shop' && (view === 'shop' || view === 'product')
    const accountActive = name === 'account' && (view === 'account' || view === 'create')
    const active = view === name || shopActive || accountActive
    return active ? 'nav-link active' : 'nav-link'
  }

  function closeMenu() {
    const menu = document.getElementById('mainNav')
    if (menu) {
      menu.classList.remove('show')
    }
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark site-nav">
      <div className="container">
        <a href="#/" className="navbar-brand brand-button" onClick={closeMenu}>
          <Logo />
          <span>
            <span className="brand-name">Loadout</span>
            <span className="brand-tag">Gaming gear</span>
          </span>
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainNav"
          aria-controls="mainNav"
          aria-expanded="false"
          aria-label="Open navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mainNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="#/" className={linkClass('home')} onClick={closeMenu}>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a href="#/shop" className={linkClass('shop')} onClick={closeMenu}>
                Shop
              </a>
            </li>
            <li className="nav-item">
              <a href="#/account" className={linkClass('account')} onClick={closeMenu}>
                Account
              </a>
            </li>
            <li className="nav-item">
              <a href="#/cart" className={linkClass('cart')} onClick={closeMenu}>
                Cart
                <span className="cart-count">{count}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
