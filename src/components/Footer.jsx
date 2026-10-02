import { Logo } from './Navigation.jsx'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container py-4 d-flex flex-column flex-md-row justify-content-between gap-3">
        <a href="#/" className="brand-button footer-brand">
          <Logo />
          <span className="brand-name">Loadout</span>
        </a>
        <p className="mb-0 footer-copy">
          Mice, keyboards, headsets, mousepads, and controllers.
          <br />
          <span className="footer-name">Ujas Goti</span>
        </p>
        <div className="d-flex gap-3">
          <a href="#/shop" className="footer-link">
            Shop
          </a>
          <a href="#/account" className="footer-link">
            Account
          </a>
          <a href="#/cart" className="footer-link">
            Cart
          </a>
        </div>
      </div>
    </footer>
  )
}
