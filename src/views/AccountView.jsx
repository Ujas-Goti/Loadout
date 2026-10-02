import { useState } from 'react'

function validateLogin(values) {
  const errors = {}
  const login = values.login.trim()

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

  return errors
}

export default function AccountView({ account, signedIn, onSignIn, onSignOut, onNavigate }) {
  const [values, setValues] = useState({ login: '', password: '' })
  const [errors, setErrors] = useState({})

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = validateLogin(values)

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    if (!account) {
      setErrors({ form: 'Create an account before you sign in.' })
      return
    }

    if (values.login.trim() !== account.login || values.password !== account.password) {
      setErrors({ form: 'Login or password is wrong.' })
      return
    }

    setErrors({})
    onSignIn()
  }

  if (signedIn && account) {
    const address = [account.street, account.city, account.state, account.zip].filter(Boolean).join(', ')

    return (
      <section className="container py-4">
        <a href="#/" className="back-link">&larr; Home</a>
        <h1>Account</h1>
        <div className="form-card">
          <p>
            Signed in as <strong>{account.login}</strong>
          </p>
          <p>Email: {account.email}</p>
          {address && <p>Address: {address}</p>}
          {account.phone && <p>Phone: {account.phone}</p>}
          <button type="button" className="btn btn-main" onClick={onSignOut}>
            Sign out
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="container py-4">
      <a href="#/" className="back-link">&larr; Home</a>
      <h1>Account</h1>
      <p>Sign in, or create an account.</p>
      <form className="form-card" onSubmit={handleSubmit} noValidate>
        {errors.form && <p className="form-error">{errors.form}</p>}
        <div className="mb-3">
          <label className="form-label" htmlFor="login">
            Login
          </label>
          <input
            id="login"
            name="login"
            className={`form-control ${errors.login ? 'is-invalid' : ''}`}
            value={values.login}
            onChange={handleChange}
            autoComplete="username"
          />
          {errors.login && <div className="invalid-feedback">{errors.login}</div>}
        </div>
        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            value={values.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
        <button type="submit" className="btn btn-accent">
          Sign in
        </button>
        <button type="button" className="btn btn-link" onClick={() => onNavigate('create')}>
          Create an account
        </button>
      </form>
    </section>
  )
}
