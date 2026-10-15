import '../shared/base.css'
import './LoginScreen.css'
import StatusBar from '../shared/StatusBar'
import { useState } from 'react'

function GoogleButton() {
  return (
    <button type="button" className="ls-google-button">
      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M16.8758 9.17493C16.8758 8.52743 16.8222 8.05493 16.7061 7.56494H9.1615V10.4874H13.59C13.5008 11.2137 13.0186 12.3074 11.9472 13.0424L11.9322 13.1402L14.3176 14.9513L14.4829 14.9674C16.0007 13.5937 16.8758 11.5724 16.8758 9.17493Z" fill="#4285F4" />
        <path d="M9.16098 16.875C11.3306 16.875 13.152 16.175 14.4824 14.9675L11.9467 13.0424C11.2681 13.5062 10.3574 13.8299 9.16098 13.8299C7.03601 13.8299 5.23246 12.4562 4.58954 10.5574L4.4953 10.5653L2.01486 12.4465L1.98242 12.5349C3.30383 15.1074 6.01811 16.875 9.16098 16.875Z" fill="#34A853" />
        <path d="M4.59004 10.5575C4.4204 10.0675 4.32223 9.54245 4.32223 8.99997C4.32223 8.45744 4.4204 7.93246 4.58112 7.44247L4.57662 7.33811L2.06509 5.42664L1.98291 5.46494C1.4383 6.53245 1.12579 7.73123 1.12579 8.99997C1.12579 10.2687 1.4383 11.4674 1.98291 12.5349L4.59004 10.5575Z" fill="#FBBC05" />
        <path d="M9.16103 4.16998C10.6699 4.16998 11.6878 4.80873 12.2682 5.34251L14.536 3.1725C13.1432 1.90375 11.3306 1.125 9.16103 1.125C6.01814 1.125 3.30384 2.89249 1.98242 5.46496L4.58063 7.44249C5.23248 5.54375 7.03604 4.16998 9.16103 4.16998Z" fill="#EB4335" />
      </svg>
      <span>Google</span>
    </button>
  )
}

export default function LoginScreen({ mode = 'login', onLogin, onGoSignup, onGoLogin }) {
  const isSignup = mode === 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handlePrimaryAction = (e) => {
    e.preventDefault()
    const normalizedEmail = email.trim().toLowerCase()
    if (!/^[^\s@]+@[^\s@]+\.com$/.test(normalizedEmail)) {
      setError('Enter a valid email ending in .com.')
      return
    }
    if (password.length < 8) {
      setError('Password must be at least 8 characters long.')
      return
    }
    if (isSignup && password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (isSignup && !/^[a-zA-Z0-9_]{3,20}$/.test(username.trim())) {
      setError('Username must be 3–20 letters, numbers, or underscores.')
      return
    }
    setError('')
    onLogin({ email: normalizedEmail, fullName: fullName.trim(), username: username.trim() })
  }

  return (
    <div className={`ls phone-screen ls--${mode}`}>
      <header className="ls-header">
        <StatusBar />
      </header>

      <main className="ls-content">
        {/* App Title */}
        <div className="ls-title-section">
          <h1 className="ls-title">Palatable</h1>
          <p className="ls-subtitle">Discover your next favourite meal</p>
        </div>

        {/* Login / Sign Up Sheet */}
        <div className={`ls-sheet ${isSignup ? 'ls-sheet--signup' : 'ls-sheet--login'}`}>
          {/* Fields */}
          <div className="ls-fields">
            {isSignup ? (
              <div className="ls-field">
                <label className="ls-label" htmlFor="full-name">
                  Full name
                </label>
                <input
                  id="full-name"
                  type="text"
                  placeholder="Full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="ls-input"
                />
              </div>
            ) : null}

            {isSignup ? (
              <div className="ls-field">
                <label className="ls-label" htmlFor="username">Username</label>
                <input id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="ls-input" />
              </div>
            ) : null}

            <div className="ls-field">
              <label className="ls-label" htmlFor="email">
                Email address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Email address"
                value={email}
                  onChange={(e) => setEmail(e.target.value)}
                className="ls-input"
              />
            </div>

            <div className="ls-field">
              <label className="ls-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="ls-input"
              />
            </div>

            {isSignup ? (
              <div className="ls-field">
                <label className="ls-label" htmlFor="confirm-password">
                  Confirm Password
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="ls-input"
                />
              </div>
            ) : (
              <button type="button" className="ls-forgot-password">
                Forgot Password?
              </button>
            )}
          </div>
          {error ? <p className="ls-error" role="alert">{error}</p> : null}

          {/* Primary Button */}
          <button type="button" className="ls-login-button" onClick={handlePrimaryAction}>
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>

          {/* Divider */}
          <div className="ls-divider">
            <div className="ls-divider__line" />
            <span className="ls-divider__text">or continue with</span>
            <div className="ls-divider__line" />
          </div>

          {/* Google Button */}
          <GoogleButton />

          {/* Bottom Text */}
          <div className="ls-signup">
            <span className="ls-signup__text">
              {isSignup ? 'Already have an account? ' : "Don't have an account? "}
              <button
                type="button"
                className="ls-signup__link"
                onClick={isSignup ? onGoLogin : onGoSignup}
              >
                {isSignup ? 'Log In' : 'Sign Up'}
              </button>
            </span>
          </div>
        </div>
      </main>

      {/* iPhone Home Indicator */}
      <div className="ls-home-indicator">
        <div className="ls-home-indicator__bar" />
      </div>
    </div>
  )
}
