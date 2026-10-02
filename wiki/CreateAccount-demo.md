# CreateAccount demo

**Video:** _upload the recording to YouTube (unlisted is fine) and paste the link here_

The form is `src/views/CreateAccountView.jsx`. Submit is handled in React. The form has `noValidate` so the browser's built-in bubbles do not hide my messages. Errors use Bootstrap `is-invalid` and `invalid-feedback`.

Required: login, password, email.  
Optional: street, city, state, ZIP, phone — but if you start the address, all four address fields must be valid, and if you type a phone it must be 10 digits.

## Record this (about 90 seconds)

Open `#/create-account`. Screen-record the browser. Do not skip the empty submit.

### 1) Submit with nothing typed

Click **Create account**.

You should see:

- Login is required.
- Password is required.
- Email is required.

Address and phone stay quiet because they are optional.

### 2) Partial information

Type only:

| Field | Value |
| --- | --- |
| Login | `ab` |
| Password | `short` |
| Email | `ujas@` |
| Street | `12` |
| City | _(leave empty)_ |
| State | `California` |
| ZIP | `945` |
| Phone | `555` |

Click **Create account**.

You should see errors like:

- Login: 3–20 letters and numbers, starting with a letter
- Password: at least 8 characters, with a letter and a number
- Email: must look like `name@school.edu`
- Street / city / state / ZIP: because street was started, the whole address is required and must match the rules (state is 2 letters, ZIP is 5 digits)
- Phone: 10 digits or leave it blank

### 3) Everything completed

Clear the form (refresh is fine) and enter:

| Field | Value |
| --- | --- |
| Login | `Ujas351` |
| Password | `Loadout99` |
| Email | `ujas@csueastbay.edu` |
| Street | `25800 Carlos Bee Blvd` |
| City | `Hayward` |
| State | `CA` |
| ZIP | `94542` |
| Phone | `5105550147` |

Click **Create account**. The app should move to Account, signed in as `Ujas351`, with the email, the formatted address, and phone `510-555-0147`.

## Where the checks live

`validateAccount` in `CreateAccountView.jsx`:

- Login: `/^[A-Za-z][A-Za-z0-9]{2,19}$/`
- Password: length ≥ 8, at least one letter and one digit
- Email: `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Address: only if any of street/city/state/ZIP is filled
- Phone: 10 digits after stripping non-digits, then stored as `xxx-xxx-xxxx`
