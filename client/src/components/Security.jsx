import './Security.css';

const pillars = [
  { icon: '🔐', title: 'Stateless JWT Auth',    desc: 'Tokens are signed server-side and verified on every request — no session storage required.' },
  { icon: '🛡️', title: 'Rate Limiting',          desc: 'Custom middleware throttles abuse attempts before they reach your poll data.' },
  { icon: '🔒', title: 'HTTPS Enforced',         desc: 'All traffic is encrypted in transit. No exceptions.' },
  { icon: '👁️', title: 'Audit Logging',          desc: 'Every vote and auth event is timestamped and traceable.' },
];

export default function Security() {
  return (
    <section className="security" id="security">
      <div className="security__inner">

        {/* Left — graphic */}
        <div className="security__left">
          <div className="security__shield">
            <div className="security__shield-glow" />
            <div className="security__shield-icon">🛡️</div>
            <div className="security__shield-label">SECURED</div>
            <div className="security__shield-ring security__shield-ring--1" />
            <div className="security__shield-ring security__shield-ring--2" />
          </div>
        </div>

        {/* Right — content */}
        <div className="security__right">
          <p className="security__label">🔐 &nbsp; Infrastructure</p>
          <h2 className="security__heading">
            BUILT ON A<br />
            <span className="security__heading--accent">SECURE</span><br />
            FOUNDATION
          </h2>
          <p className="security__desc">
            Mythos Polls uses a custom, stateless authentication pipeline.
            No third-party auth services — every token, every check, every
            guard is hand-crafted and auditable.
          </p>
          <div className="security__pillars">
            {pillars.map(p => (
              <div key={p.title} className="security__pillar">
                <span className="security__pillar-icon">{p.icon}</span>
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
