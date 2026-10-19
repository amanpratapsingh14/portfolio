import { useCallback, useEffect, useRef, useState } from 'react';
import {
  profile, stats, highlights, roles, skillFilters, skills, education, certifications,
} from '../data.js';
import { prefersReducedMotion, useActiveSection, useCountUp, useScrollProgress } from '../hooks.js';
import { ArrowUp, ChevronDown, ChevronLeft, ChevronRight, Copy, SkillIcon } from './Icons.jsx';
import { HeroDiagram, slideVisuals } from './Visuals.jsx';
import Rich from './Rich.jsx';

const mailto = `mailto:${profile.email}`;
const NAV = [
  { id: 'work', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];
const NAV_IDS = NAV.map((n) => n.id);

export function Nav() {
  const active = useActiveSection(NAV_IDS);
  const { pct } = useScrollProgress();
  return (
    <>
      <nav>
        <div className="nav-inner">
          <a className="nav-mark" href="#top">{profile.name}</a>
          <ul className="nav-links">
            {NAV.map((n) => (
              <li key={n.id}>
                <a href={`#${n.id}`} className={active === n.id ? 'active' : undefined}>{n.label}</a>
              </li>
            ))}
            <li><a className="nav-cta" href={mailto}>Get in touch</a></li>
          </ul>
        </div>
      </nav>
      <div className="progress-track"><div className="progress-bar" style={{ width: `${pct}%` }} /></div>
    </>
  );
}

export function Hero() {
  const glowRef = useRef(null);
  const onMove = (e) => {
    if (prefersReducedMotion() || !glowRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    glowRef.current.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    glowRef.current.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  const onLeave = () => {
    glowRef.current?.style.setProperty('--mx', '50%');
    glowRef.current?.style.setProperty('--my', '-60px');
  };
  return (
    <section className="section section-dark hero" onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="hero-glow" ref={glowRef} />
      <div className="col hero-content">
        <div className="eyebrow">Portfolio · 2026</div>
        <h1 className="headline">Backend systems,<br /><span className="muted">engineered to hold under load.</span></h1>
        <p className="lede">
          I'm a Python developer with 3+ years building GST‑scale compliance platforms,
          AI‑driven recruitment tools, and financial infrastructure — owning everything
          from architecture to the 3am production incident.
        </p>
        <div className="btns">
          <a className="btn-pill" href={mailto}>Get in touch</a>
          <a className="btn-text" href="#work">View experience <span className="chev">›</span></a>
        </div>
        <div className="diagram-wrap reveal"><HeroDiagram /></div>
      </div>
    </section>
  );
}

function Stat({ prefix = '', suffix = '', text, count, caption }) {
  const [ref, value] = useCountUp(count);
  return (
    <div className="stat">
      <div className="stat-num" ref={ref}>
        {prefix}
        {text ?? <span className="count">{value.toLocaleString('en-US')}</span>}
        {suffix}
      </div>
      <div className="stat-cap">{caption}</div>
    </div>
  );
}

export function Stats() {
  return (
    <section className="section stat-section">
      <div className="col">
        <div className="reveal">
          <div className="eyebrow" style={{ textAlign: 'center' }}>By the numbers</div>
          <h2 className="headline">Ten months, in production.</h2>
        </div>
        <div className="stat-grid reveal">
          {stats.map((s) => <Stat key={s.caption} {...s} />)}
        </div>
      </div>
    </section>
  );
}

export function Highlights() {
  const [index, setIndex] = useState(0);
  const trackRef = useRef(null);
  const viewportRef = useRef(null);
  const drag = useRef({ active: false, x: 0, y: 0, dx: 0, axis: null });
  const n = highlights.length;

  const goTo = useCallback((i) => setIndex(((i % n) + n) % n), [n]);
  const setOffset = (extraPct = 0) => {
    if (trackRef.current) {
      trackRef.current.style.transform = `translateX(calc(-${index * 100}% + ${extraPct}%))`;
    }
  };
  useEffect(() => setOffset(0)); // re-sync after every render (index change or drag end)

  const onDown = (e) => {
    drag.current = { active: true, x: e.clientX, y: e.clientY, dx: 0, axis: null };
    trackRef.current.classList.add('dragging');
    try { viewportRef.current.setPointerCapture(e.pointerId); } catch { /* not capturable */ }
  };
  const onMove = (e) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (d.axis === null && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) d.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    if (d.axis !== 'x') return;
    e.preventDefault();
    d.dx = dx;
    setOffset((dx / (viewportRef.current.offsetWidth || 1)) * 100);
  };
  const onUp = () => {
    const d = drag.current;
    if (!d.active) return;
    d.active = false;
    trackRef.current.classList.remove('dragging');
    const ratio = d.dx / (viewportRef.current.offsetWidth || 1);
    if (d.axis === 'x' && Math.abs(ratio) > 0.15) goTo(index + (ratio < 0 ? 1 : -1));
    else setOffset(0);
  };
  const onKey = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1); }
  };

  return (
    <section className="section section-dark slider-section" id="highlights">
      <div className="col">
        <div className="slider-head reveal">
          <div className="eyebrow" style={{ textAlign: 'center' }}>Featured work</div>
          <h2 className="headline">Challenges, and what shipped.</h2>
        </div>
        <div className="slider reveal" tabIndex={0} role="region" aria-roledescription="carousel" aria-label="Featured work" onKeyDown={onKey}>
          <div
            className="slider-viewport"
            ref={viewportRef}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onPointerLeave={onUp}
          >
            <div className="slider-track" ref={trackRef}>
              {highlights.map((h, i) => {
                const Visual = slideVisuals[h.visual];
                return (
                  <div className="slide" key={h.title} aria-hidden={i !== index}>
                    <div className="feature-grid">
                      <div>
                        <div className="eyebrow">{h.eyebrow}</div>
                        <h3 className="headline">{h.title}</h3>
                        <p className="lede"><Rich text={h.body} /></p>
                        <div className="feature-chips">
                          {h.chips.map((c) => <span className="chip" key={c}>{c}</span>)}
                        </div>
                      </div>
                      <div className="feature-visual"><Visual /></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="slider-controls">
          <button className="slider-arrow" type="button" aria-label="Previous highlight" onClick={() => goTo(index - 1)}><ChevronLeft /></button>
          <div className="slider-dots">
            {highlights.map((h, i) => (
              <button
                key={h.title}
                type="button"
                className={`slider-dot${i === index ? ' active' : ''}`}
                aria-label={`Go to highlight ${i + 1} of ${n}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
          <button className="slider-arrow" type="button" aria-label="Next highlight" onClick={() => goTo(index + 1)}><ChevronRight /></button>
        </div>
      </div>
    </section>
  );
}

function Role({ role }) {
  const [open, setOpen] = useState(!!role.openByDefault);
  return (
    <div className="role-card reveal">
      <div className="role-meta">
        <div className="when">{role.when}</div>
        {role.current && <div className="badge">Current</div>}
      </div>
      <div>
        <div className="role-title">{role.title}</div>
        <div className="role-org">{role.org}</div>
        {role.context && <div className="role-context">{role.context}</div>}
        <ul>{role.summary.map((t) => <li key={t}><Rich text={t} /></li>)}</ul>
        <ul className={`role-more${open ? ' open' : ''}`}>
          {role.more.map((t) => <li key={t}><Rich text={t} /></li>)}
        </ul>
        <button className="role-toggle" type="button" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? 'Show less' : 'Show full role'}
          <ChevronDown className="arrow" />
        </button>
      </div>
    </div>
  );
}

export function Experience() {
  return (
    <section className="section work-section" id="work">
      <div className="col">
        <div className="work-head reveal">
          <div className="eyebrow" style={{ textAlign: 'center' }}>Career</div>
          <h2 className="headline">Five roles.<br />One thread: ownership.</h2>
        </div>
        {roles.map((r) => <Role key={r.when} role={r} />)}
      </div>
    </section>
  );
}

export function Skills() {
  const [filter, setFilter] = useState('all');
  return (
    <section className="section section-dark skills-section" id="skills">
      <div className="col">
        <div className="skills-head reveal">
          <div className="eyebrow" style={{ textAlign: 'center' }}>Toolbox</div>
          <h2 className="headline">Built with.</h2>
        </div>
        <div className="skill-filter reveal" role="group" aria-label="Filter skills by category">
          {skillFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`filter-chip${filter === f.id ? ' active' : ''}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className="skill-grid">
          {skills.map((s) => (
            <div className="skill-card reveal" key={s.title} hidden={filter !== 'all' && filter !== s.cat}>
              <div className="skill-icon"><SkillIcon name={s.icon} /></div>
              <h3>{s.title}</h3>
              <div className="skill-chips">{s.items.map((i) => <span key={i}>{i}</span>)}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Education() {
  return (
    <section className="section edu-section" id="education">
      <div className="col-narrow">
        <div className="edu-grid">
          <div className="edu-card reveal">
            <h3>Education</h3>
            <div className="edu-degree">{education.degree}</div>
            <div className="edu-school">{education.school}</div>
            <div className="edu-when">{education.when}</div>
          </div>
          <div className="edu-card reveal">
            <h3>Certifications &amp; awards</h3>
            <ul className="cert-list">
              {certifications.map((c) => (
                <li key={c.name}><span><b>{c.name}</b>{c.by && ` — ${c.by}`}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  const [toast, setToast] = useState(null);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  const copy = async () => {
    let msg = 'Copied!';
    try { await navigator.clipboard.writeText(profile.email); } catch { msg = 'Copy failed'; }
    setToast(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToast(null), 1800);
  };
  return (
    <section className="section section-dark closing" id="contact">
      <div className="col reveal">
        <div className="eyebrow" style={{ textAlign: 'center' }}>Get in touch</div>
        <h2 className="headline">Let's build something<br />that scales.</h2>
        <p className="lede">
          Open to Python / backend engineering roles — remote or based in Noida, Uttar
          Pradesh. Email is the fastest way to reach me.
        </p>
        <div className="btns email-row">
          <a className="btn-pill" href={mailto}>{profile.email}</a>
          <button className="copy-btn" type="button" aria-label="Copy email address" onClick={copy}>
            <Copy />
            <span className={`toast${toast ? ' show' : ''}`} role="status">{toast ?? 'Copied!'}</span>
          </button>
        </div>
        <div className="contact-row">
          <a className="contact-pill" href={`tel:${profile.phone.replace(/\s/g, '')}`}>{profile.phone}</a>
          <span className="contact-pill">{profile.location}</span>
          {profile.linkedin && <a className="contact-pill" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
          {profile.github && <a className="contact-pill" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>}
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="foot section-dark section">
      {profile.name} — {profile.title} · Last updated {profile.updated}
    </footer>
  );
}

export function ToTop() {
  const { top } = useScrollProgress();
  return (
    <button
      className={`to-top${top > 700 ? ' show' : ''}`}
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })}
    >
      <ArrowUp />
    </button>
  );
}
