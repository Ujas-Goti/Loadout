import { useState } from 'react'

const EMPTY_FORM = {
  login: '',
  password: '',
  email: '',
  street: '',
  city: '',
  state: '',
  zip: '',
  phone: '',
}

function validateAccount(values) {
  const errors = {}
  const login = values.login.trim()
  const email = values.email.trim()
  const street = values.street.trim()
  const city = values.city.trim()
  const state = values.state.trim()
  const zip = values.zip.trim()
  const phone = values.phone.trim()
  const addressStarted = street || city || state || zip

  if (!login) {
    errors.login = 'Login is required.'
  } else if (!/^[A-Za-z][A-Za-z0-9]{2,19}$/.test(login)) {
    errors.login = 'Use 3–20 letters and numbers, starting with a letter.'
  }

  if (!values.password) {
    errors.password = 'Password is required.'
  } else if (values.password.length < 8 || !/[A-Za-z]/.test(values.password) || !/\d/.test(values.password)) {
    errors.password = 'Password must be at least 8 characters and include a letter and a number.'
  }

  if (!email) {
    errors.email = 'Email is required.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Enter an email address like name@school.edu.'
  }

  if (addressStarted) {
    if (street.length < 5) {
      errors.street = 'Enter a street address, or leave the whole address blank.'
    }
    if (!/^[A-Za-z .'-]{2,}$/.test(city)) {
      errors.city = 'Enter a city, or leave the whole address blank.'
    }
    if (!/^[A-Za-z]{2}$/.test(state)) {
      errors.state = 'Use a 2-letter state code, or leave the whole address blank.'
    }
    if (!/^\d{5}$/.test(zip)) {
      errors.zip = 'Use a 5-digit ZIP code, or leave the whole address blank.'
    }
  }

  if (phone) {
    const digits = phone.replace(/\D/g, '')
    if (digits.length !== 10) {
      errors.phone = 'Enter a 10-digit phone number, or leave it blank.'
    }
  }

  return errors
}

export default function CreateAccountView({ onCreate }) {
  const [values, setValues] = useState(EMPTY_FORM)
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateAccount(values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    const phoneDigits = values.phone.replace(/\D/g, '')
    onCreate({
      login: values.login.trim(),
      password: values.password,
      email: values.email.trim(),
      street: values.street.trim(),
      city: values.city.trim(),
      state: values.state.trim().toUpperCase(),
      zip: values.zip.trim(),
      phone: phoneDigits ? `${phoneDigits.slice(0, 3)}-${phoneDigits.slice(3, 6)}-${phoneDigits.slice(6)}` : '',
    })
  }

  return (
    <section className="container py-4">
      <a href="#/account" className="back-link">&larr; Back to sign in</a>
      <h1>Create account</h1>
      <p>Login, password, and email are required. Address and phone are optional.</p>
      <form className="form-card" onSubmit={handleSubmit} noValidate>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label" htmlFor="create-login">
              Login
            </label>
            <input
              id="create-login"
              name="login"
              className={`form-control ${errors.login ? 'is-invalid' : ''}`}
              value={values.login}
              onChange={handleChange}
              autoComplete="username"
            />
            {errors.login && <div className="invalid-feedback">{errors.login}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="create-password">
              Password
            </label>
            <input
              id="create-password"
              name="password"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              value={values.password}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.password && <div className="invalid-feedback">{errors.password}</div>}
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="create-email">
              Email
            </label>
            <input
              id="create-email"
              name="email"
              type="email"
              className={`form-control ${errors.email ? 'is-invalid' : ''}`}
              value={values.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <div className="invalid-feedback">{errors.email}</div>}
          </div>
          <div className="col-12">
            <label className="form-label" htmlFor="street">
              Street
            </label>
            <input
              id="street"
              name="street"
              className={`form-control ${errors.street ? 'is-invalid' : ''}`}
              value={values.street}
              onChange={handleChange}
              autoComplete="street-address"
            />
            {errors.street && <div className="invalid-feedback">{errors.street}</div>}
          </div>
          <div className="col-md-5">
            <label className="form-label" htmlFor="city">
              City
            </label>
            <input
              id="city"
              name="city"
              className={`form-control ${errors.city ? 'is-invalid' : ''}`}
              value={values.city}
              onChange={handleChange}
              autoComplete="address-level2"
            />
            {errors.city && <div className="invalid-feedback">{errors.city}</div>}
          </div>
          <div className="col-md-3">
            <label className="form-label" htmlFor="state">
              State
            </label>
            <input
              id="state"
              name="state"
              className={`form-control ${errors.state ? 'is-invalid' : ''}`}
              value={values.state}
              onChange={handleChange}
              autoComplete="address-level1"
            />
            {errors.state && <div className="invalid-feedback">{errors.state}</div>}
          </div>
          <div className="col-md-4">
            <label className="form-label" htmlFor="zip">
              ZIP
            </label>
            <input
              id="zip"
              name="zip"
              className={`form-control ${errors.zip ? 'is-invalid' : ''}`}
              value={values.zip}
              onChange={handleChange}
              autoComplete="postal-code"
            />
            {errors.zip && <div className="invalid-feedback">{errors.zip}</div>}
          </div>
          <div className="col-md-6">
            <label className="form-label" htmlFor="phone">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              className={`form-control ${errors.phone ? 'is-invalid' : ''}`}
              value={values.phone}
              onChange={handleChange}
              autoComplete="tel"
            />
            {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
          </div>
        </div>
        <div className="mt-4">
          <button type="submit" className="btn btn-accent">
            Create account
          </button>
        </div>
      </form>
    </section>
  )
}
