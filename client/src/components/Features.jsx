import './Features.css';

const features = [
  { icon: '⚡', title: 'Real-Time Results', desc: 'Watch votes update live via WebSocket — no refresh needed.' },
  { icon: '🗳️', title: 'Anonymous Voting', desc: 'Stateless JWT auth ensures your identity stays protected.' },
  { icon: '🌐', title: 'Community Driven', desc: 'Create, share, and debate polls with the entire realm.' },
];

export default function Features() {
  return (
    <section className="features" id="features">
      <div className="features__inner">
        {/* Left column */}
        <div className="features__left">
          <p className="features__label">⚔ &nbsp; The Platform</p>
          <h2 className="features__heading">
            REAL-TIME<br />
            <span className="features__heading--accent">STRATEGIC</span><br />
            POLLING
          </h2>
          <p className="features__desc">
            Mythos Polls is built for communities that demand speed, transparency, and immersion.
            Every vote is processed in milliseconds and broadcast to all participants simultaneously.
          </p>
          <ul className="features__list">
            {features.map(f => (
              <li key={f.title} className="features__item">
                <span className="features__icon">{f.icon}</span>
                <div>
                  <strong>{f.title}</strong>
                  <p>{f.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column — thematic graphic placeholder */}
        <div className="features__right">
          <div className="features__graphic">
            <div className="features__graphic-ring features__graphic-ring--1" />
            <div className="features__graphic-ring features__graphic-ring--2" />
            <div className="features__graphic-ring features__graphic-ring--3" />
            <div className="features__graphic-core">
              <span>⛩</span>
              <p>Character<br />Illustration</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
