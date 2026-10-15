import '../shared/base.css'
import './OnboardingSuccessScreen.css'
import StatusBar from '../shared/StatusBar'

export default function OnboardingSuccessScreen({ onExplore }) {
  return <div className="oss phone-screen">
    <header className="oss-header"><StatusBar /></header>
    <main className="oss-content">
      <div className="oss-brand">
        <h1 className="oss-title">Palatable</h1>
        <p className="oss-subtitle">Discover your next favourite meal</p>
      </div>
      <div className="oss-message">
        <div className="oss-check" aria-label="Onboarding complete">
          <svg viewBox="0 0 32 32" aria-hidden="true"><path d="m8 16.5 5.2 5.1L24.5 10.5" /></svg>
        </div>
        <h2>You're all set!</h2>
        <p>Your recommendations will keep<br />improving as you explore and review<br />more restaurants.</p>
      </div>
    </main>
    <button className="oss-explore" type="button" onClick={onExplore}>Explore the App</button>
    <div className="oss-home-indicator"><div className="oss-home-indicator__bar" /></div>
  </div>
}
