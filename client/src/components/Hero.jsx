import './Hero.css';

export default function Hero({navigateTo}) {
  return (
    <section className="hero" id="hero">
      {/* Layered background orbs */}
      <div className="hero__orb hero__orb--1" />
      <div className="hero__orb hero__orb--2" />
      <div className="hero__orb hero__orb--3" />

      {/* Floating particles */}
      {Array.from({ length: 18 }).map((_, i) => (
        <span key={i} className="hero__particle" style={{ '--i': i }} />
      ))}

      <div className="hero__content">
        <p className="hero__eyebrow">⛩ &nbsp; The Oracle Awaits</p>
        <h1 className="hero__title">
          MYTHOS<br />
          <span className="hero__title--accent">POLLS</span>
        </h1>
        <p className="hero__subtitle">
          Cast your vote. Shape the realm. Real-time polling forged in the ancient digital arts.
        </p>
        <div className="hero__actions">
          <button className="btn btn--primary" onClick={() => navigateTo('login')}> Create a Poll</button>
          <a href="#features" className="btn btn--ghost">Explore</a>
        </div>
      </div>

      {/* Decorative bottom fade */}
      <div className="hero__fade" />
    </section>
  );
}
