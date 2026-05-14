import { useState } from 'react';
import './PollCarousel.css';

const POLLS = [
  {
    id: 1,
    category: 'Technology',
    question: 'Which JS framework will dominate 2025?',
    options: [
      { label: 'React',   votes: 48 },
      { label: 'Vue',     votes: 22 },
      { label: 'Svelte',  votes: 18 },
      { label: 'Angular', votes: 12 },
    ],
  },
  {
    id: 2,
    category: 'Gaming',
    question: 'Best open-world RPG of the decade?',
    options: [
      { label: 'Elden Ring',    votes: 55 },
      { label: 'Witcher 3',     votes: 30 },
      { label: 'Cyberpunk 2077',votes: 10 },
      { label: 'Skyrim',        votes: 5  },
    ],
  },
  {
    id: 3,
    category: 'Community',
    question: 'What feature should we build next?',
    options: [
      { label: 'Poll Reactions', votes: 40 },
      { label: 'Live Chat',      votes: 35 },
      { label: 'Leaderboards',   votes: 15 },
      { label: 'Dark Mode+',     votes: 10 },
    ],
  },
  {
    id: 4,
    category: 'Culture',
    question: 'Greatest anime arc of all time?',
    options: [
      { label: 'Marineford',    votes: 38 },
      { label: 'Chimera Ant',   votes: 32 },
      { label: 'Pain\'s Assault',votes: 20 },
      { label: 'Promised Neverland',votes: 10 },
    ],
  },
  {
    id: 5,
    category: 'Strategy',
    question: 'Best real-time strategy game ever?',
    options: [
      { label: 'StarCraft II', votes: 45 },
      { label: 'Age of Empires II', votes: 30 },
      { label: 'Warcraft III', votes: 15 },
      { label: 'Command & Conquer', votes: 10 },
    ],
  },
];

const total = (options) => options.reduce((s, o) => s + o.votes, 0);

function PollCard({ poll, position }) {
  const [flipped, setFlipped] = useState(false);
  const t = total(poll.options);

  // position: -2, -1, 0 (center), 1, 2
  const isCenter = position === 0;

  return (
    <div
      className={`card-wrapper card-wrapper--pos-${position < 0 ? 'n' : 'p'}${Math.abs(position)} ${isCenter ? 'card-wrapper--center' : ''}`}
      style={{ '--pos': position }}
    >
      {/*
        THE 3D FLIP MECHANISM:
        1. .card-scene  → sets perspective (the "camera distance")
        2. .card        → transform-style: preserve-3d so children live in 3D space
                          rotateY(180deg) when flipped
        3. .card__front / .card__back → both absolutely positioned, full size
                          backface-visibility: hidden hides the face pointing away
        4. .card__back  → pre-rotated rotateY(180deg) so it starts facing away
      */}
      <div className="card-scene" onClick={() => setFlipped(f => !f)}>
        <div className={`card ${flipped ? 'card--flipped' : ''}`}>

          {/* ── FRONT ── */}
          <div className="card__face card__front">
            <div className="card__category">{poll.category}</div>
            <div className="card__glyph">⛩</div>
            <h3 className="card__question">{poll.question}</h3>
            <p className="card__hint">Click to see results →</p>
          </div>

          {/* ── BACK ── */}
          <div className="card__face card__back">
            <div className="card__category card__category--back">Results</div>
            <ul className="card__results">
              {poll.options.map(opt => {
                const pct = Math.round((opt.votes / t) * 100);
                return (
                  <li key={opt.label} className="card__result-item">
                    <div className="card__result-header">
                      <span>{opt.label}</span>
                      <span className="card__result-pct">{pct}%</span>
                    </div>
                    <div className="card__bar-track">
                      <div
                        className="card__bar-fill"
                        style={{ '--pct': `${pct}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
            <p className="card__hint">{t} votes cast</p>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function PollCarousel() {
  const [center, setCenter] = useState(2); // index of center card
  const visible = [-2, -1, 0, 1, 2];

  const prev = () => setCenter(c => Math.max(0, c - 1));
  const next = () => setCenter(c => Math.min(POLLS.length - 1, c + 1));

  return (
    <section className="carousel-section" id="polls">
      <div className="carousel-section__header">
        <p className="carousel-section__label">🗳 &nbsp; Active Polls</p>
        <h2 className="carousel-section__title">CAST YOUR VOTE</h2>
        <p className="carousel-section__sub">Click any card to reveal live results</p>
      </div>

      <div className="carousel">
        {visible.map(offset => {
          const idx = center + offset;
          if (idx < 0 || idx >= POLLS.length) return <div key={offset} className="card-placeholder" />;
          return <PollCard key={POLLS[idx].id} poll={POLLS[idx]} position={offset} />;
        })}
      </div>

      <div className="carousel__controls">
        <button className="carousel__arrow" onClick={prev} disabled={center === 0}>
          &#8592;
        </button>
        <div className="carousel__dots">
          {POLLS.map((_, i) => (
            <button
              key={i}
              className={`carousel__dot ${i === center ? 'carousel__dot--active' : ''}`}
              onClick={() => setCenter(i)}
            />
          ))}
        </div>
        <button className="carousel__arrow" onClick={next} disabled={center === POLLS.length - 1}>
          &#8594;
        </button>
      </div>
    </section>
  );
}
