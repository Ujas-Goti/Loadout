export function formatMoney(amount) {
  return `$${amount.toFixed(2)}`
}

export function isOnSale(product) {
  return product.salePrice !== null && product.salePrice < product.price
}

export function getUnitPrice(product) {
  return isOnSale(product) ? product.salePrice : product.price
}

export function salePercent(product) {
  return Math.round((1 - product.salePrice / product.price) * 100)
}

export function cartCount(cartItems) {
  return cartItems.reduce((total, item) => total + item.quantity, 0)
}

export function cartSubtotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
}

export function sameCartItem(a, b) {
  return a.productId === b.productId && a.size === b.size && a.color === b.color
}

export function cartItemKey(item) {
  return `${item.productId}-${item.size}-${item.color}`
}

export function quantityInCart(cartItems, productId) {
  return cartItems.reduce((total, item) => (item.productId === productId ? total + item.quantity : total), 0)
}

export function addCartItem(cartItems, nextItem, stock) {
  if (!Number.isInteger(nextItem.quantity) || nextItem.quantity < 1) {
    return { cartItems, error: 'Quantity must be at least 1.' }
  }

  const alreadyInCart = quantityInCart(cartItems, nextItem.productId)
  if (alreadyInCart + nextItem.quantity > stock) {
    const left = stock - alreadyInCart
    if (left <= 0) {
      return { cartItems, error: `Only ${stock} are in stock, and they are already in your cart.` }
    }
    return { cartItems, error: `You can add ${left} more. ${stock} are in stock.` }
  }

  const existing = cartItems.find((item) => sameCartItem(item, nextItem))
  if (!existing) {
    return { cartItems: [...cartItems, nextItem], error: '' }
  }

  return {
    cartItems: cartItems.map((item) =>
      sameCartItem(item, nextItem)
        ? { ...item, quantity: item.quantity + nextItem.quantity }
        : item,
    ),
    error: '',
  }
}

export const COLOR_HEX = {
  Black: '#1c1c1c',
  White: '#f7f7f7',
  Gray: '#8e8e8e',
  Red: '#d23b2f',
  Blue: '#2f62d2',
  Green: '#2f8f5b',
  Purple: '#6b3fa0',
  Orange: '#e07a2f',
}
