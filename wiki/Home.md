# Home

**Student:** Ujas Goti  
**Course:** CS 351 — Project 1  
**App:** Loadout (gaming gear store)

**Deployed website:** _paste the Google Cloud static-site URL here after you finish hosting_

**GitHub:** https://github.com/Ujas-Goti/Loadout

## What the app is

Loadout is a client-side React single-page store. There is no backend. Products come from `src/data/products.json` (25 items, same schema). The cart and the account live in React state in `App.jsx`. Each screen has its own hash URL so the address bar changes:

| View | URL |
| --- | --- |
| Home | `#/` |
| Shop | `#/shop` |
| Product | `#/product/:id` |
| Account | `#/account` |
| Create account | `#/create-account` |
| Cart | `#/cart` |

I used hash routing instead of React Router because the assignment is a static SPA and Google Cloud static hosting does not need rewrite rules for `#/` URLs.

## Architecture

```
index.html
  └── main.jsx          Bootstrap CSS + JS, store.css, mount App
        └── App.jsx     useState for view, cart, account, signed-in
              ├── Navigation.jsx     logo, Home / Shop / Account / Cart, cart count
              ├── HomeView.jsx
              ├── ShopView.jsx       → ProductList.jsx → ProductCard.jsx
              ├── ProductDetailView  → ProductCard.jsx (detail layout)
              ├── AccountView.jsx
              ├── CreateAccountView.jsx
              ├── CartView.jsx       → Cart.jsx → CartItem.jsx
              └── Footer.jsx         name: Ujas Goti
```

`App.jsx` is the parent that owns the cart and the selected product. Child views get data and callbacks through props. That matches the assignment: state is lifted, and the required list components render children with `.map()`.

## React components I created

**Required for products**

- `ProductList` — walks the product array with `.map()`, keeps 10 items for the current page, and renders a `ProductCard` for each one.
- `ProductCard` — summary layout on Home/Shop, detail layout on the product page. The detail form will not add to the cart until size and color are chosen.

**Required for the cart**

- `Cart` — walks `cartItems` with `.map()` and renders a `CartItem` for each line. Also shows item count and subtotal.
- `CartItem` — product id, name, image, size, color, quantity, unit price, line total, increase / decrease / remove.

**Other UI**

- `Navigation` — Bootstrap navbar on every view. Cart count is a pill next to Cart.
- `Footer` — store name plus my name.

**Views**

- `HomeView` — hero, New arrivals, Featured
- `ShopView` — full catalog, pagination (10 per page)
- `ProductDetailView`
- `AccountView` — sign in / sign out
- `CreateAccountView` — validated form
- `CartView`

## JavaScript / React behavior that matters

- **`useState` in `App`:** `cartItems`, `account`, `signedIn`, and the current view from the hash.
- **`hashchange`:** `readRoute()` turns `#/shop` or `#/product/3` into a view name.
- **Add to cart:** `addCartItem` in `src/utils.js` blocks quantity below 1 and blocks adding more than `quantityInStock` across every line of the same product.
- **Options:** size and color are empty until the user picks them. The Add to cart button is replaced by View cart + Back to shop after a successful add.
- **Forms:** `CreateAccountView` and `AccountView` validate on submit with `noValidate` so the browser does not hide my messages. Bootstrap `is-invalid` / `invalid-feedback` show the errors.
- **Pagination:** `PAGE_SIZE = 10` in `ProductList.jsx`. Shop shows Previous / page numbers / Next.

## CSS

Custom CSS is `src/styles/store.css`. Colors are CSS variables (`--bg`, `--cyan`, `--sale`). Bootstrap 5 supplies the grid (`container`, `row`, `col-*`), navbar collapse, forms, and pagination. I did not copy a Bootstrap theme. I only overrode colors so text stays readable on the dark cards.
