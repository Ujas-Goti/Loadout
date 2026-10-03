import { useEffect, useState } from 'react'
import products from './data/products.json'
import Navigation from './components/Navigation.jsx'
import Footer from './components/Footer.jsx'
import HomeView from './views/HomeView.jsx'
import ShopView from './views/ShopView.jsx'
import ProductDetailView from './views/ProductDetailView.jsx'
import AccountView from './views/AccountView.jsx'
import CreateAccountView from './views/CreateAccountView.jsx'
import CartView from './views/CartView.jsx'
import { addCartItem, quantityInCart, sameCartItem } from './js/utils.js'

function readRoute() {
  const path = window.location.hash.replace(/^#/, '') || '/'
  const parts = path.split('/').filter(Boolean)
  const name = parts[0] || 'home'

  if (name === 'shop') return { view: 'shop', productId: null }
  if (name === 'product') return { view: 'product', productId: Number(parts[1]) || null }
  if (name === 'account') return { view: 'account', productId: null }
  if (name === 'create-account') return { view: 'create', productId: null }
  if (name === 'cart') return { view: 'cart', productId: null }
  return { view: 'home', productId: null }
}

function hrefFor(view, productId) {
  if (view === 'shop') return '#/shop'
  if (view === 'product') return `#/product/${productId}`
  if (view === 'account') return '#/account'
  if (view === 'create') return '#/create-account'
  if (view === 'cart') return '#/cart'
  return '#/'
}

export default function App() {
  const startingRoute = readRoute()
  const [view, setView] = useState(startingRoute.view)
  const [selectedProductId, setSelectedProductId] = useState(startingRoute.productId)
  const [cartItems, setCartItems] = useState([])
  const [account, setAccount] = useState(null)
  const [signedIn, setSignedIn] = useState(false)

  const selectedProduct = products.find((product) => product.id === selectedProductId) || null

  useEffect(() => {
    function showRoute() {
      const route = readRoute()
      setView(route.view)
      if (route.productId) {
        setSelectedProductId(route.productId)
      }
      window.scrollTo(0, 0)
    }

    window.addEventListener('hashchange', showRoute)
    if (!window.location.hash) {
      window.location.hash = '#/'
    }
    return () => window.removeEventListener('hashchange', showRoute)
  }, [])

  function navigate(nextView) {
    window.location.hash = hrefFor(nextView, selectedProductId)
  }

  function addToCart(item) {
    const product = products.find((entry) => entry.id === item.productId)
    const result = addCartItem(cartItems, item, product.quantityInStock)
    if (!result.error) {
      setCartItems(result.cartItems)
    }
    return result.error
  }

  function increaseQuantity(item) {
    setCartItems((current) =>
      current.map((entry) => {
        if (!sameCartItem(entry, item)) {
          return entry
        }
        const product = products.find((entryProduct) => entryProduct.id === entry.productId)
        if (!product || quantityInCart(current, entry.productId) >= product.quantityInStock) {
          return entry
        }
        return { ...entry, quantity: entry.quantity + 1 }
      }),
    )
  }

  function decreaseQuantity(item) {
    setCartItems((current) =>
      current.map((entry) => {
        if (!sameCartItem(entry, item) || entry.quantity <= 1) {
          return entry
        }
        return { ...entry, quantity: entry.quantity - 1 }
      }),
    )
  }

  function removeItem(item) {
    setCartItems((current) => current.filter((entry) => !sameCartItem(entry, item)))
  }

  function createAccount(nextAccount) {
    setAccount(nextAccount)
    setSignedIn(true)
    navigate('account')
  }

  return (
    <div className="site d-flex flex-column min-vh-100">
      <Navigation view={view} cartItems={cartItems} />
      <main className="flex-grow-1">
        {view === 'home' && <HomeView products={products} />}
        {view === 'shop' && <ShopView products={products} />}
        {view === 'product' && (
          <ProductDetailView product={selectedProduct} onAddToCart={addToCart} />
        )}
        {view === 'account' && (
          <AccountView
            account={account}
            signedIn={signedIn}
            onSignIn={() => setSignedIn(true)}
            onSignOut={() => setSignedIn(false)}
          />
        )}
        {view === 'create' && <CreateAccountView onCreate={createAccount} />}
        {view === 'cart' && (
          <CartView
            cartItems={cartItems}
            products={products}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
            onRemove={removeItem}
          />
        )}
      </main>
      <Footer />
    </div>
  )
}
