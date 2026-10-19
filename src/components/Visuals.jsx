const font = '-apple-system,sans-serif';

export function HeroDiagram() {
  const spokes = [[120, 70], [120, 250], [520, 70], [520, 250], [320, 40], [320, 280]];
  const nodes = [
    { x: 320, y: 40, d: '', label: 'API', ly: 26 },
    { x: 320, y: 280, d: 'd2', label: 'Job status', ly: 304 },
    { x: 120, y: 70, d: 'd1', label: 'Kafka', ly: 52 },
    { x: 120, y: 250, d: 'd3', label: 'Redis', ly: 272 },
    { x: 520, y: 70, d: 'd2', label: 'MongoDB', ly: 52 },
    { x: 520, y: 250, d: 'd1', label: 'PostgreSQL', ly: 272 },
  ];
  return (
    <svg viewBox="0 0 640 320" fill="none" role="img" aria-label="Architecture: API, Kafka, Redis, MongoDB, PostgreSQL and job status around a core service">
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#2997FF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#2997FF" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g stroke="#3A3A3E" strokeWidth="1.4">
        {spokes.map(([x, y]) => <path key={`${x}-${y}`} d={`M320 160 L${x} ${y}`} />)}
      </g>
      <circle cx="320" cy="160" r="60" fill="url(#glow)" />
      <circle cx="320" cy="160" r="17" fill="#2997FF" />
      {nodes.map((n) => (
        <g key={n.label}>
          <circle cx={n.x} cy={n.y} r="7" fill="#5AB0FF" className={`node-pulse ${n.d}`} />
          <text x={n.x} y={n.ly} textAnchor="middle" fill="#8E8E93" fontSize="12" fontFamily={font}>{n.label}</text>
        </g>
      ))}
    </svg>
  );
}

function AsyncVisual() {
  return (
    <svg viewBox="0 0 220 220" fill="none" aria-hidden="true">
      <rect x="20" y="20" width="180" height="180" rx="18" stroke="#38383D" strokeWidth="1.4" />
      <rect x="40" y="46" width="60" height="22" rx="6" fill="#1D1D1F" stroke="#38383D" />
      <text x="70" y="60" textAnchor="middle" fill="#A1A1A6" fontSize="9" fontFamily={font}>Request</text>
      <path d="M100 57 H130" stroke="#2997FF" strokeWidth="2" />
      <rect x="130" y="46" width="52" height="22" rx="6" fill="#1D1D1F" stroke="#2997FF" />
      <text x="156" y="60" textAnchor="middle" fill="#5AB0FF" fontSize="9" fontFamily={font}>Job ID</text>
      <path d="M70 68 V100" stroke="#38383D" strokeWidth="1.4" />
      <rect x="34" y="100" width="152" height="26" rx="7" fill="#161618" stroke="#38383D" />
      <text x="110" y="117" textAnchor="middle" fill="#A1A1A6" fontSize="9" fontFamily={font}>Kafka — keyed by job_id</text>
      {[70, 110, 150].map((x) => <path key={x} d={`M${x} 126 V150`} stroke="#38383D" strokeWidth="1.4" />)}
      {[46, 90, 134].map((x) => (
        <g key={x}>
          <rect x={x} y="150" width="40" height="20" rx="5" fill="#1D1D1F" stroke="#38383D" />
          <text x={x + 20} y="163" textAnchor="middle" fill="#A1A1A6" fontSize="8" fontFamily={font}>chunk</text>
        </g>
      ))}
      <circle cx="110" cy="192" r="5" fill="#2997FF" className="node-pulse" />
      <text x="125" y="196" fill="#5AB0FF" fontSize="9" fontFamily={font}>status: in progress</text>
    </svg>
  );
}

function SheetVisual() {
  return (
    <svg viewBox="0 0 220 220" fill="none" aria-hidden="true">
      <rect x="30" y="24" width="160" height="172" rx="10" fill="#FFFFFF" stroke="#D2D2D7" strokeWidth="1.4" />
      {[52, 80, 108, 136, 164].map((y) => <line key={y} x1="30" y1={y} x2="190" y2={y} stroke="#D2D2D7" />)}
      {[86, 142].map((x) => <line key={x} x1={x} y1="24" x2={x} y2="196" stroke="#D2D2D7" />)}
      <rect x="30" y="24" width="160" height="28" fill="#F5F5F7" />
      {[[58, 'B2B'], [114, 'HSN'], [166, 'ECO']].map(([x, t]) => (
        <text key={t} x={x} y="42" textAnchor="middle" fill="#6E6E73" fontSize="9" fontFamily={font}>{t}</text>
      ))}
      <rect x="92" y="86" width="44" height="16" rx="3" fill="#FFE3E1" stroke="#E0483C" strokeWidth="1" />
      <rect x="36" y="142" width="44" height="16" rx="3" fill="#FFE3E1" stroke="#E0483C" strokeWidth="1" />
      <circle cx="166" cy="176" r="14" fill="#E8F3FF" />
      <path d="M160 176 l4 4 8 -8" stroke="#0071E3" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TraceVisual() {
  return (
    <svg viewBox="0 0 220 220" fill="none" aria-hidden="true">
      <path d="M40 170 L75 110 L105 140 L135 70 L180 120" stroke="#38383D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M40 170 L75 110 L105 140 L135 70" stroke="#2997FF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="135" cy="70" r="6" fill="#161618" stroke="#2997FF" strokeWidth="2" />
      <circle cx="135" cy="70" r="12" stroke="#2997FF" strokeWidth="1.4" opacity="0.5" className="node-pulse" />
      {[[40, 170], [75, 110], [105, 140]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="4" fill="#5AB0FF" />)}
      <circle cx="180" cy="120" r="4" fill="#3A3A3E" />
      <text x="140" y="54" fill="#F5F5F7" fontSize="10" fontFamily={font}>root cause found</text>
    </svg>
  );
}

export const slideVisuals = { async: AsyncVisual, sheet: SheetVisual, trace: TraceVisual };
